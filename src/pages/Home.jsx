import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { instance } from "../utils/axios";
import Card from "../components/Card/Card";
import { RiPokerHeartsLine, RiPokerHeartsFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { PiAngleBold } from "react-icons/pi";
import { IconButton } from "@mui/material";
import AccordionTransition from "../components/Accordion";
import SwiperCardReview from "../components/SwiperCardReview";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../redux/wishlistSlice";
import { fetchWishlist } from "../redux/wishlistSlice";
import { showSnackbar } from "../components/CustomSnackbar";
import { addToCart } from "../redux/cartSlice";
import { fetchCartItemCount } from "../redux/cartSlice";
import { GiPaintBrush } from "react-icons/gi";
const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const fetchProducts = async () => {
    try {
      const response = await instance.get("/product");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
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
  return (
    <>
      <section className="mt-10 mx-14">
        <div className="flex justify-between gap-20">
          <div className=" w-full py-5 rounded-2xl">
            <h1 className="font-bold text-6xl max-w-lg">
              <span>
                Buat Sudut Rumah <PiAngleBold className="inline text-6xl " />{" "}
                Anda Lebih elegan
              </span>{" "}
            </h1>

            <p className="mt-7 font-medium">
              Hadirkan kesan rapi dan berkelas di ruangan Anda dengan berbagai
              pilihan figura yang sesuai untuk beragam gaya penataan interior.
            </p>

            <div className="flex items-center  mt-7">
              <button className="bg-black rounded-full text-sm text-white text-center px-4 py-2.5">
                Beli Sekarang
              </button>
              <button className="bg-black rounded-full text-white p-2.5 flex items-center justify-center">
                <GoArrowUpRight className="text-lg" />
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-b from-coklat to-birulaut w-full flex justify-center p-20 rounded-2xl">
            <img
              src="/public/images/bg-home-new3.png"
              className="w-[320px]"
              alt=""
            />
          </div>
        </div>
      </section>

      <section className="mt-20">
        <h1 className="flex justify-center  text-3xl font-extrabold">
          Keuntungan Kami
        </h1>
        <div className="flex  justify-center space-x-5 flex-wrap mx-14 mt-20">
          <div className="text-center w-[270px]">
            <div className="bg-birumuda inline-block p-8 rounded-full">
              {" "}
              <img className="w-12 h-12" src="/images/shipping.svg" alt="" />
            </div>

            <h2 className="text-base font-bold">Pengiriman Fleksibel</h2>
            <p className="text-sm">
              Bebas pilih mau ambil di tempat <br /> atau antar aja
            </p>
          </div>
          <div className="text-center  w-[270px]">
            <div className="bg-birumuda inline-block p-8 rounded-full">
              <img className="w-12 h-12" src="/images/ongkir.svg" alt="" />
            </div>

            <h2 className="text-base font-bold">
              Free Ongkir Area Kota Pacitan
            </h2>
            <p className="text-sm">
              Tanpa biaya kirim untuk semua pesanan di area Kota Pacitan.
            </p>
          </div>
          <div className="text-center w-[270px]">
            <div className="bg-birumuda inline-block p-8 rounded-full">
              <img className="w-12 h-12" src="/images/payment.svg" alt="" />
            </div>

            <h2 className="text-base font-bold">Pembayaran Aman</h2>
            <p className="text-sm">Pembayaran mudah dan aman via Midtrans.</p>
          </div>
          <div className="text-center  w-[270px]">
            <div className="bg-birumuda inline-block p-8 rounded-full">
              {" "}
              <img className="w-12 h-12" src="/images/tracking.svg" alt="" />
            </div>

            <h2 className="text-base font-bold">Tracking Real-Time</h2>
            <p className="text-sm">
              Lacak status pesananmu dengan mudah, kapan saja.
            </p>
          </div>
        </div>
      </section>
      <section className="mt-28 mx-14 ">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-extrabold text-3xl">Figura Terbaru</h1>
          </div>

          <button className="border border-gray-300 py-2 px-5 rounded-full text-sm hover:-translate-y-1 duration-300">
            Lihat semua
          </button>
        </div>
        <div className="grid mt-10 lg:grid-cols-3 gap-10">
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
      </section>

      <section className="mt-52 flex justify-center mx-14 gap-32">
        <div>
          <img
            src="/public/images/bg-4.jpg"
            className="w-[550px] h-[350px] object-cover rounded-2xl"
            alt=""
          />
        </div>
        <div className="">
          <h1 className="text-3xl font-bold">Kenapa Faza Frame?</h1>
          <p className="border-b pb-4 mt-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam,
            nam?
          </p>
          <div className="w-[500px]">
            <AccordionTransition />
          </div>
        </div>
      </section>

      <section className="mx-7 md:mx-6 lg:mx-14 bg-cover 2xl:mx-32 mt-10 justify-center lg:mt-20">
        <h1 className="text-xl sm:text-3xl font-bold md:text-4xl mb-7 md:mb-10 lg:mb-20 text-hitam">
          Apa kata pelanggan
        </h1>

        <SwiperCardReview />
      </section>

      <section className="mt-20 mx-14">
        <div className="text-center font-medium text-3xl">
          Berlangganan untuk mendapatkan{" "}
          <span className="font-bold">berita</span> dan <br /> penawaran{" "}
          <span className="font-bold">eksklusif.</span>
        </div>
        <div className="flex justify-center mt-6 gap-5">
          <img className="w-10" src="/public/images/mail.png" alt="" />
          <input
            type="text"
            placeholder="Masukkan email Anda"
            className="py-2 px-4 border rounded-full border-gray-300 w-96"
            id=""
          />
          <button className="py-2 px-4 rounded-full bg-black text-white text-sm">
            Berlangganan
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
