/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import SidebarProduct from "../components/SidebarProduct";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";
import Card from "../components/Card/Card";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../components/CustomSnackbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { instance } from "../utils/axios";
import { toggleWishlist } from "../redux/wishlistSlice";
import { fetchWishlist } from "../redux/wishlistSlice";
const Product = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [dropdownStates, setDropdownStates] = useState([false]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [products, setProducts] = useState([]);
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const toggleDropdown = (index) => {
    setDropdownStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  const handleToggleWishlist = (productId) => {
    if (!isLoggedIn) {
      showSnackbar("Silakan login terlebih dahulu", "warning");
      return;
    }

    console.log("Toggle wishlist:", { productId, user_id: user.id });

    dispatch(toggleWishlist({ productId, user_id: user.id }))
      .unwrap()
      .then((res) => {
        console.log("Wishlist updated:", res);
        showSnackbar(res.message || "Berhasil ubah wishlist", "success");

        // ✅ Refresh wishlist lengkap
        dispatch(fetchWishlist(user.id));
      })
      .catch((err) => {
        console.error("Toggle wishlist error:", err);
        showSnackbar(err?.message || err || "Gagal mengubah wishlist", "error");
      });
  };

  const isProductInWishlist = (productId) => {
    return (
      Array.isArray(wishlist) &&
      wishlist.some((item) => item && item.id === productId)
    );
  };

  const handleFilterChange = ({ category, price, size }) => {
    setSelectedCategory(category);
    setSelectedPrice(price);
    setSelectedSize(size);
  };

  const fetchProducts = async () => {
    try {
      const res = await instance.get("/filtered/product", {
        params: {
          category: selectedCategory,
          size: selectedSize,
          min_price: selectedPrice?.min ?? null,
          max_price: selectedPrice?.max ?? null,
        },
      });
      console.log("Data filter:", {
        category: selectedCategory,
        size: selectedSize,
        min_price: selectedPrice?.min,
        max_price: selectedPrice?.max,
      });

      setProducts(res.data.data);
    } catch (err) {
      console.error("Gagal fetch produk:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedPrice, selectedSize]);

  return (
    <section className="mx-14 mt-10 pb-20">
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<GoChevronRight style={{ fontSize: "small" }} />}
      >
        <Link to="/">
          <span className="text-sm font-normal text-gray-600">Beranda</span>
        </Link>
        <div className="text-sm font-medium text-black">Produk</div>
      </Breadcrumbs>

      <div className="flex mt-10 gap-10">
        <div className="hidden sm:block md:block lg:block">
          <div className="sticky top-24">
            <SidebarProduct onFilterChange={handleFilterChange} />
          </div>
        </div>

        <div className="w-full">
          <h1 className="text-3xl font-bold">Produk dari Faza Frame</h1>

          <div className="flex items-center justify-between mt-5 mb-5">
            <p>Menampilkan {products.length} produk sesuai filter</p>

            <div className="relative inline-block">
              <div className="flex items-center gap-2">
                <p>Urutkan</p>
                <button
                  onClick={() => toggleDropdown(0)}
                  className="border px-3 py-2 rounded-full border-gray-400 flex items-center gap-1"
                >
                  Terbaru
                  {dropdownStates[0] ? (
                    <MdKeyboardArrowDown />
                  ) : (
                    <MdKeyboardArrowRight />
                  )}
                </button>
              </div>

              {dropdownStates[0] && (
                <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Terlaris
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Termurah
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Termahal
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {selectedCategory || selectedPrice || selectedSize ? (
            <div className="flex items-center mb-6">
              <span className="mr-3">Yang dipilih:</span>
              {selectedCategory && (
                <div className="border flex items-center border-gray-400 pl-3 pr-2 py-2 rounded-full mr-2">
                  <span className="mr-1">{selectedCategory}</span>
                  <IoIosClose
                    className="cursor-pointer text-xl"
                    onClick={() => setSelectedCategory("")}
                  />
                </div>
              )}
              {selectedPrice && (
                <div className="border flex items-center border-gray-400 pl-3 pr-2 py-2 rounded-full  mr-2">
                  <span className="mr-1">{selectedPrice.label}</span>
                  <IoIosClose
                    className="cursor-pointer text-xl"
                    onClick={() => setSelectedPrice(null)}
                  />
                </div>
              )}

              {selectedSize && (
                <div className="border flex items-center border-gray-400 pl-3 pr-2 py-2 rounded-full mr-2">
                  <span className="mr-1">{selectedSize}</span>
                  <IoIosClose
                    className="cursor-pointer text-xl"
                    onClick={() => setSelectedSize("")}
                  />
                </div>
              )}
            </div>
          ) : null}

          <div className="grid lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <div key={product.id} className="relative">
                <Link
                  to={`/product/details/${product.id}`}
                  state={{ from: "produk" }}
                >
                  <Card
                    title={product.name}
                    image={`${import.meta.env.VITE_BACKEND_URL}${
                      product.image_url
                    }`}
                    price={Number(product.price).toLocaleString("id-ID")}
                    average_rating={product.rating || "0.0"}
                  />
                </Link>
                <div className="absolute top-2 right-2">
                  <IconButton
                    onClick={() => handleToggleWishlist(product.id)}
                    className="p-2"
                  >
                    {" "}
                    {isProductInWishlist(product.id) ? (
                      <FavoriteIcon
                        className="text-red-500"
                        sx={{ width: 28, height: 28 }}
                      />
                    ) : (
                      <FavoriteIcon
                        className=""
                        sx={{ width: 28, height: 28 }}
                      />
                    )}
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
