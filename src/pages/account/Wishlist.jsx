/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { instance } from "../../utils/axios";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Card from "../../components/Card/Card";
import CardImage from "../../components/Card/CardImage";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { showSnackbar } from "../../components/CustomSnackbar";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist, fetchWishlist } from "../../redux/wishlistSlice";
import SidebarAccount from "../../components/SidebarforAccount";

const Wishlist = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [setWishlist] = useState([]); // Initial state as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const wishlist = useSelector((state) => state.wishlist.wishlist);

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

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await instance.get("/get/all/wishlist");

        console.log("Full Response:", response); // Log the full response to inspect all properties
        console.log("Response Data:", response.data);
        // If response is an object, wrap it into an array to handle it
        if (response.data && !Array.isArray(response.data)) {
          setWishlist([response.data]); // Wrap the object into an array
        } else {
          setWishlist(response.data || []);
        }
      } catch (err) {
        setError("Failed to fetch wishlist");
        console.error("Error fetching wishlist:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const truncateDescriptionByChar = (description, charLimit) => {
    if (description.length <= charLimit) {
      return description;
    } else {
      return description.slice(0, charLimit) + "...";
    }
  };

  if (loading) return <p>Loading wishlist...</p>;

  return (
    <>
      <section className="flex 2xl:mx-32">
        <div className="hidden sm:block md:block lg:block">
          <SidebarAccount />
        </div>
        <div className="mt-5 md:p-8 mx-4 w-full text-hitam">
          <h1 className="font-extrabold text-2xl md:text-3xl  mb-5">
            Favorit wisata Anda
          </h1>

          {wishlist.length === 0 ? (
            <div className="mt-10 w-full flex flex-col items-center">
              <p className=" text-xl lg:text-2xl font-semibold">
                Anda belum menyukai figura apa pun
              </p>
              <img
                className="w-64 mt-7"
                src="/images/nolike.svg"
                alt="Agenda"
              />
              <p className="text-center mt-5 font-medium">
                Temukan figura favorit Anda dan tekan ikon hati untuk <br />
                menambahkannya ke daftar favorit!
              </p>
              <Link
                to="/product"
                className="bg-black text-sm text-white px-6 mt-10 py-1.5 hover:bg-black/80 hover:-translate-y-1 duration-500 rounded-md"
              >
                Eksplor
              </Link>
            </div>
          ) : (
            <div className="mt-7 md:mt-14 lg:mt-14 grid grid-cols-2 md:flex lg:justify-start lg:p-1 xl:mt-14">
              <div className="hidden md:hidden lg:flex lg:justify-start lg:gap-7 lg:w-full">
                {Array.isArray(wishlist) &&
                  wishlist.map((product) => (
                    <div key={product.id} className="relative">
                      <Link to={`/wisata/detail/${product.id}`}>
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
          )}

          <div className="lg:hidden md:carousel md:carousel-center md:space-x-3 md:px-8 md:py-3  md:max-w-full ">
            <div className="md:carousel-item justify-between grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.isArray(wishlist) &&
                wishlist.map((product) => (
                  <div key={product.id} className="relative">
                    <Link to={`/wisata/detail/${product.id}`}>
                      <CardImage
                        title={product.name}
                        image={`${import.meta.env.VITE_BACKEND_URL}${
                          product.image_url
                        }`}
                        price={Number(product.price).toLocaleString("id-ID")}
                        average_rating={product.rating || "0.0"}
                      />
                    </Link>
                    <div className="absolute top-2 right-2">
                      <IconButton className="p-2">
                        <FavoriteIcon
                          className=""
                          sx={{ width: 28, height: 28 }}
                        />
                      </IconButton>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
