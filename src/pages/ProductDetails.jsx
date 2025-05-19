import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { GoChevronRight, GoShareAndroid } from "react-icons/go";
import { instance } from "../utils/axios";
import Rating from "@mui/material/Rating";
import CardImage from "../components/Card/CardImage";
import AccordionProduct from "../components/AccordionProduct";
import LinearProgress from "@mui/material/LinearProgress";
import { useParams, useLocation, Link } from "react-router-dom";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { addToCart } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../components/CustomSnackbar";
import { fetchCartItemCount } from "../redux/cartSlice";
//import { setCheckoutItems } from "../redux/checkoutSlice";

const ProductDetails = () => {
  const { id } = useParams(); // ambil id dari URL
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const from = location.state?.from;
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await instance.get(`/review/product/${id}`);
        setReviews(res.data.reviews);
        const total = res.data.reviews.reduce((sum, r) => sum + r.rating, 0);
        const avg =
          res.data.reviews.length > 0 ? total / res.data.reviews.length : 0;
        setAverageRating(avg);
      } catch (error) {
        console.error("Gagal mengambil review produk:", error);
      }
    };

    if (id) fetchReviews();
  }, [id]);
  // Metode yang dipilih (default Delivery)

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await instance.get(`/product/${id}`);
        setProduct(res.data.data); // sesuaikan dengan struktur response backend kamu
      } catch (err) {
        console.error("Gagal ambil detail produk:", err);
      }
    };

    fetchDetail();
  }, [id]);

  if (!product) return <p className="mx-14 mt-24">Loading...</p>;

  const addCart = async (product, quantity) => {
    try {
      await instance.post("/add/to/cart", {
        product_id: product.id,
        quantity,
      });

      dispatch(
        addToCart({
          product_id: product.id,
          name: product.name,
          weight: product.weight,
          quantity,
        })
      );

      dispatch(fetchCartItemCount(user.id)); // 🔥 langsung update icon cart
      showSnackbar("Produk berhasil ditambahkan ke keranjang!", "success"); // 🔔 notif manis
    } catch (err) {
      console.error("Gagal menambahkan produk ke cart:", err.message);
      showSnackbar("Gagal menambahkan produk ke keranjang", "error");
    }
  };

  const handleAddToCart = () => {
    addCart(product, 1);
  };

  return (
    <>
      <section className="md:mx-[75px] mx-7 mt-10">
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<GoChevronRight style={{ fontSize: "small" }} />}
        >
          <Link to="/">
            <span className="text-sm font-normal text-gray-600">Beranda</span>
          </Link>

          {from === "produk" && (
            <Link to="/product">
              <span className="text-sm font-normal text-gray-600">Produk</span>
            </Link>
          )}

          <div className="text-sm font-medium text-black">{product.name}</div>
        </Breadcrumbs>

        <div className="md:mt-10 mt-5 md:flex gap-20">
          <div className="md:w-1/2 md:h-[550px] w-full h-[300px]">
            <CardImage
              image={`${import.meta.env.VITE_BACKEND_URL}${product.image_url}`}
            />
          </div>
          <div className="flex flex-col md:w-1/2">
            <div className="flex mt-5 items-center justify-between">
              <div className="text-black/60 font-bold  py-1 w-fit">
                {product.category}
              </div>
              <div className="text-sm">
                {" "}
                {product.status === "sold" ? (
                  <p className="bg-red-100 rounded-full px-5 py-1.5 text-red-500">
                    Terjual
                  </p>
                ) : (
                  <p className="bg-green-100 rounded-full px-5 py-1.5 text-green-600">
                    Tersedia
                  </p>
                )}
              </div>
            </div>
            <div className="md:flex mt-3 items-center gap-3">
              <div className="flex items-start md:items-center gap-2">
                <h1 className="text-2xl font-extrabold">{product.name}</h1>
                <GoShareAndroid className="md:text-xl text-2xl" />
              </div>
              <p className="text-2xl mt-2 md:mt-0 ml-auto">
                <span className="font-bold">
                  IDR {Number(product.price).toLocaleString("id-ID")}
                </span>
              </p>
            </div>
            <p className="flex mt-2 items-center gap-2 text-gray-700">
              <Rating
                name="read-only"
                value={averageRating}
                size="small"
                precision={0.1}
                readOnly
              />
              <span>
                {averageRating.toFixed(1)} rating & {reviews.length} ulasan
              </span>
            </p>

            <p className=" mt-5 font-bold">Ukuran</p>
            <div className="flex flex-col gap-2 mt-3">
              {/* Baris 2 */}
              {/* <div className="flex gap-2">
                {row2.map((size, index) => (
                  <p
                    key={index}
                    className={`rounded-full px-3 py-1 border text-sm ${
                      size === product.size
                        ? "bg-black text-white"
                        : "border-gray-300 text-gray-300"
                    }`}
                  >
                    {size}
                  </p>
                ))}
              </div>
            </div> */}

              <div className="flex gap-2">
                <p className="rounded-md px-3 py-1 border border-gray-400 text-sm">
                  {product.size}
                </p>
              </div>

              <div className="mt-5 space-y-3">
                <p className="font-bold text-base">Deskripsi Produk</p>
                <span className="text-sm font-medium text-black/60">
                  {" "}
                  {product.description}
                </span>
              </div>

              <div className="flex mt-10 items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.status === "sold"}
                  className={`w-full rounded-lg py-2  ${
                    product.status === "sold"
                      ? "bg-gray-200 text-gray-500 opacity-50 cursor-not-allowed"
                      : "bg-black text-white hover:bg-gray-800 transition"
                  }`}
                >
                  {product.status === "sold" ? "Sudah terjual" : "Pesan"}
                </button>

                <button className="w-full border border-gray-400 py-2 rounded-lg">
                  Tambah ke favorit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t mt-10 md:pb-10"></div>
      </section>

      <section className="md:mx-[75px] mx-7 pb-20">
        <div className="mt-7">
          <h2 className="text-2xl text-hitam2 font-extrabold">
            Ulasan Pengguna
          </h2>
        </div>

        <div className="md:flex items-start justify-start md:gap-10">
          {/* Bagian kiri: Ringkasan rating */}
          <div className="mt-3 flex-col md:gap-10 flex items-start justify-between text-hitam2 w-fit p-5 rounded-md">
            <div className="items-end gap-3">
              <h1 className="flex items-center text-3xl md:text-5xl font-extrabold text-hitam2">
                <Rating
                  readOnly
                  max={1}
                  value={1}
                  sx={{ fontSize: "4rem" }}
                  className="mr-2"
                />
                {(
                  reviews.reduce((sum, r) => sum + r.rating, 0) /
                    reviews.length || 0
                ).toFixed(1)}
              </h1>
              <p className="mt-2">{reviews.length} ulasan terverifikasi</p>
            </div>

            {/* Grafik distribusi rating */}
            <div className="">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter((r) => r.rating === star).length;
                const percentage = (count / reviews.length) * 100 || 0;

                return (
                  <div key={star} className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-semibold text-hitam2">
                      {star}
                    </span>
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      color="inherit"
                      sx={{
                        width: "270px",
                        borderRadius: 5,
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 5,
                        },
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bagian kanan: List review */}
          <div className="w-full mt-5">
            {reviews.length === 0 ? (
              <p className="text-gray-600">
                Belum ada ulasan untuk produk ini.
              </p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="mb-6">
                  <Rating name="read-only" value={review.rating} readOnly />
                  <h1 className="text-xs font-semibold mt-1">
                    {review.user_name || "Anonymous"}
                  </h1>
                  <div className="text-base w-full border-b pb-5 mt-2 rounded-md max-w-full break-words">
                    {review.comment || "Tidak ada komentar."}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
