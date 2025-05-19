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
import { RiPokerHeartsLine, RiPokerHeartsFill } from "react-icons/ri";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { instance } from "../utils/axios";
import { toggleWishlist } from "../redux/wishlistSlice";
import { fetchWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import { fetchCartItemCount } from "../redux/cartSlice";
import DrawerProduct from "../components/DrawerProduct";
import { IoFilterOutline } from "react-icons/io5";

const Product = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [products, setProducts] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Hitung index awal dan akhir
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Ambil produk yang akan ditampilkan saat ini
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  // Total halaman
  const totalPages = Math.ceil(products.length / itemsPerPage);

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

  const handleFilterChange = ({ category, price, size, keyword }) => {
    setSelectedCategory(category);
    setSelectedPrice(price);
    setSelectedSize(size);
    setSearchKeyword(keyword); // tambahkan ini
  };

  const filterApplied = selectedCategory || selectedPrice || selectedSize;

  const fetchProducts = async () => {
    try {
      const res = await instance.get("/filtered/product", {
        params: {
          category: selectedCategory,
          size: selectedSize,
          min_price: selectedPrice?.[0] ?? null,
          max_price: selectedPrice?.[1] ?? null,
          keyword: searchKeyword || null, // tambahkan ini
        },
      });

      console.log("Data filter:", {
        category: selectedCategory,
        size: selectedSize,
        min_price: selectedPrice?.min,
        max_price: selectedPrice?.max,
        keyword: searchKeyword,
      });

      setProducts(res.data.data);
    } catch (err) {
      console.error("Gagal fetch produk:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedPrice, selectedSize, searchKeyword]);

  const addCart = async (product, quantity) => {
    try {
      setLoadingProductId(product.id); // Mulai loading

      // Simulasi loading 2 detik
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await instance.post("/add/to/cart", {
        product_id: product.id,
        quantity,
      });

      dispatch(
        addToCart({
          product_id: product.id,
          name: product.name,
          weight: product.weight_gram,
          quantity,
        })
      );

      dispatch(fetchCartItemCount(user.id)); // 🔥 langsung update icon cart
      showSnackbar("Produk berhasil ditambahkan ke keranjang!", "success"); // 🔔 notif manis
    } catch (err) {
      console.error("Gagal menambahkan produk ke cart:", err.message);
      showSnackbar("Gagal menambahkan produk ke keranjang", "error");
    } finally {
      setLoadingProductId(null); // ✅ Hentikan loading
    }
  };

  return (
    <section className="md:mx-14 mx-7 mt-10 md:pb-10">
      <DrawerProduct
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onFilterChange={handleFilterChange}
      />
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<GoChevronRight style={{ fontSize: "small" }} />}
      >
        <Link to="/">
          <span className="text-sm font-normal text-gray-600">Beranda</span>
        </Link>
        <div className="text-sm font-medium text-black">Produk</div>
      </Breadcrumbs>

      <div className="flex mt-3 md:mt-10 md:gap-10">
        <div className="hidden sm:block md:block lg:block">
          <div className="sticky top-24">
            <SidebarProduct onFilterChange={handleFilterChange} />
          </div>
        </div>

        <div className="w-full">
          <h1 className="text-4xl font-extrabold">List Produk</h1>

          <div className="md:flex items-center justify-between mt-2 md:mt-5 mb-5">
            <p>
              {filterApplied
                ? `Menampilkan ${products.length} produk sesuai filter`
                : "Menampilkan semua produk"}
            </p>

            <div className="relative md:inline-block">
              <div className="flex md:hidden mt-3 items-center justify-between">
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="py-2 font-semibold gap-2 flex items-center justify-between border px-5 rounded-lg "
                >
                  <span>Filter</span>
                  <IoFilterOutline />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:grid grid lg:grid-cols-3 gap-10">
            {currentProducts.map((product) => (
              <div key={product.id} className="relative">
                <Link
                  to={`/product/detail/${product.id}`}
                  state={{ from: "produk" }}
                >
                  <Card
                    title={product.name}
                    image={`${import.meta.env.VITE_BACKEND_URL}${
                      product.image_url
                    }`}
                    price={Number(product.price).toLocaleString("id-ID")}
                    average_rating={product.rating || "0.0"}
                    status={product.status}
                    stock={product.stock}
                  />
                </Link>

                <div className="absolute top-1 right-1">
                  <IconButton
                    onClick={() => handleToggleWishlist(product.id)}
                    className="p-2"
                  >
                    {" "}
                    {isProductInWishlist(product.id) ? (
                      <div className="bg-white pt-2 pb-2 px-2 rounded-full">
                        <RiPokerHeartsFill className="text-red-500 text-xl" />
                      </div>
                    ) : (
                      <div className="bg-white pt-2 pb-2 px-2 rounded-full">
                        <RiPokerHeartsLine className="text-xl" />
                      </div>
                    )}
                  </IconButton>
                </div>

                <div className="">
                  <button
                    className={`border duration-300 border-gray-400 font-medium flex items-center justify-center gap-2 text-sm px-5 py-2 rounded-full
    ${
      product.status === "sold"
        ? " text-black/50 cursor-not-allowed"
        : "bg-white text-black hover:bg-gray-100"
    }
  `}
                    onClick={() => addCart(product, 1)}
                    disabled={
                      loadingProductId === product.id ||
                      product.status === "sold"
                    }
                  >
                    {product.status === "sold" ? (
                      <span>Sudah Terjual</span>
                    ) : loadingProductId === product.id ? (
                      <span className="animate-pulse">Menambahkan...</span>
                    ) : (
                      "Tambah Item"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center md:justify-end mt-10 gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === index + 1 ? "bg-black text-white" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Product;
