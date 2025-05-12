/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { instance } from "../../utils/axios";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { RiPokerHeartsLine, RiPokerHeartsFill } from "react-icons/ri";
import Card from "../../components/Card/Card";
import CardImage from "../../components/Card/CardImage";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { showSnackbar } from "../../components/CustomSnackbar";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist, fetchWishlist } from "../../redux/wishlistSlice";
import SidebarAccount from "../../components/SidebarforAccount";
import { addToCart } from "../../redux/cartSlice";
import { fetchCartItemCount } from "../../redux/cartSlice";
const Wishlist = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [setWishlist] = useState([]); // Initial state as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingProductId, setLoadingProductId] = useState(null);
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
    <>
      <section className="flex h-screen 2xl:mx-32">
        <div className="hidden sm:block md:block lg:block">
          <SidebarAccount />
        </div>
        <div className="mt-5 md:p-8 mx-4 w-full text-hitam">
          <h1 className="font-extrabold text-2xl md:text-3xl  mb-5">
            Produk yang Anda sukai
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
            <div className="grid lg:grid-cols-3 gap-10">
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
                        className="border duration-300 border-black font-medium flex items-center justify-center gap-2 text-sm  px-5  py-2 rounded-full"
                        onClick={() => addCart(product, 1)}
                        disabled={loadingProductId === product.id}
                      >
                        {loadingProductId === product.id ? (
                          <span className="animate-pulse">Menambahkan...</span>
                        ) : (
                          "Tambah Item"
                        )}
                      </button>
                    </div>
                  </div>
                ))}
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
