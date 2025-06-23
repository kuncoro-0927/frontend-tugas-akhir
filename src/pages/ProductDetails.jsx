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
import FormInput from "../components/TextField";
const ProductDetails = () => {
  const { id } = useParams(); // ambil id dari URL
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const from = location.state?.from;
  const [averageRating, setAverageRating] = useState(0);
  const [file, setFile] = useState(null);
  const [custom_width, setWidth] = useState("");
  const [custom_height, setHeight] = useState("");
  const [custom_notes, setNotes] = useState("");

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

  const [customPrice, setCustomPrice] = useState(0);

  useEffect(() => {
    if (
      custom_width &&
      custom_height &&
      product?.width &&
      product?.height &&
      product?.price
    ) {
      const baseWidth = Number(product.width);
      const baseHeight = Number(product.height);
      const basePrice = Number(product.price);

      const baseArea = baseWidth * baseHeight;
      const pricePerCm2 = basePrice / baseArea;

      const customArea = Number(custom_width) * Number(custom_height);
      const newPriceRaw = pricePerCm2 * customArea;

      // Pembulatan ke 1.000 terdekat
      const newPrice = Math.round(newPriceRaw / 1000) * 1000;

      setCustomPrice(newPrice);
    } else if (product?.price) {
      setCustomPrice(Number(product.price));
    }
  }, [custom_width, custom_height, product]);

  const addCart = async (product, quantity) => {
    try {
      const formData = new FormData();
      formData.append("product_id", product.id);
      formData.append("quantity", quantity);
      if (file) formData.append("image", file);
      if (custom_width) formData.append("custom_width", custom_width);
      if (custom_height) formData.append("custom_height", custom_height);
      if (custom_notes) formData.append("custom_notes", custom_notes);
      formData.append("custom_price", customPrice);

      await instance.post("/add/to/cart", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(
        addToCart({
          product_id: product.id,
          name: product.name,
          weight: product.weight,
          quantity,
          image: file ? URL.createObjectURL(file) : null,
          custom_width,
          custom_height,
          custom_notes,
          custom_price: customPrice,
        })
      );

      dispatch(fetchCartItemCount(user.id));
      showSnackbar("Produk berhasil ditambahkan ke keranjang!", "success");
    } catch (err) {
      console.error("Gagal menambahkan produk ke cart:", err.message);
      showSnackbar("Gagal menambahkan produk ke keranjang", "error");
    }
  };

  const handleAddToCart = () => {
    addCart(product, 1);
  };

  // function formattedPrice(price) {
  //   return price.toLocaleString("id-ID", {
  //     style: "currency",
  //     currency: "IDR",
  //   });
  // }

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
            <Link to="/products/list">
              <span className="text-sm font-normal text-gray-600">Produk</span>
            </Link>
          )}

          <div className="text-sm font-medium text-black">{product?.name}</div>
        </Breadcrumbs>

        <div className="md:mt-10 mt-5 md:flex md:gap-10 lg:gap-20">
          <div className="md:w-1/2 lg:h-[550px] w-full h-[300px]">
            <CardImage
              image={`${import.meta.env.VITE_BACKEND_URL}${product?.image_url}`}
            />
          </div>
          <div className="flex flex-col md:w-1/2">
            <div className="flex mt-5 items-center justify-between">
              <div className="text-black/60 font-bold  py-1 w-fit">
                {product?.category}
              </div>
              <div className="text-sm">
                {" "}
                {product?.status === "sold" ? (
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
                <h1 className="text-2xl font-extrabold max-w-[250px]">
                  {product?.name}
                </h1>
                <GoShareAndroid className="md:text-xl text-2xl" />
              </div>
              <p className="text-2xl mt-2 md:mt-0 ml-auto">
                <span className="font-bold">
                  IDR{" "}
                  {Number(customPrice).toLocaleString("id-ID", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
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
                  {product?.width} x {product?.height}
                </p>
              </div>

              <div className="mt-5 space-y-3">
                <p className="font-bold text-base">Deskripsi Produk</p>
                <span className="text-sm font-medium text-black/60">
                  {" "}
                  {product?.description}
                </span>
              </div>

              {[3, 4, 5].includes(product?.category_id) && (
                <>
                  <h1 className="font-bold text-base">Mau Custom?</h1>
                  <span className="text-sm font-medium text-black/60">
                    Sesuaikan desain bingkai sesuai keinginanmu.
                  </span>

                  <div className="mt-4 max-w-md space-y-4 border p-4 rounded-lg bg-gray-50">
                    <div>
                      <label className="block font-semibold mb-1">
                        Upload Foto
                      </label>

                      {/* Hidden input file */}
                      <input
                        type="file"
                        id="fileUpload"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="hidden"
                      />

                      {/* Custom button */}
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("fileUpload").click()
                        }
                        className="px-4 py-2 bg-black text-sm text-white rounded hover:bg-black/80"
                      >
                        Pilih Gambar
                      </button>

                      {file && (
                        <p className="mt-2 text-sm text-gray-700">
                          {file.name}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <FormInput
                        type="number"
                        label="Lebar"
                        value={custom_width}
                        onChange={(e) => setWidth(e.target.value)}
                      />
                      <FormInput
                        type="number"
                        label="Tinggi"
                        value={custom_height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </div>

                    <div>
                      <FormInput
                        type="textarea"
                        label="Catatan"
                        value={custom_notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex mt-10 items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product?.status === "sold"}
                  className={`w-full rounded-lg py-2  ${
                    product?.status === "sold"
                      ? "bg-gray-200 text-gray-500 opacity-50 cursor-not-allowed"
                      : "bg-black text-white hover:bg-black/85 transition"
                  }`}
                >
                  {product?.status === "sold" ? "Sudah terjual" : "Pesan"}
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

        <div className="lg:flex items-start justify-start md:gap-10">
          {/* Bagian kiri: Ringkasan rating */}
          <div className="mt-3 lg:flex-col md:flex-row md:flex md:gap-20  lg:gap-10 lg:flex items-start justify-between text-hitam2 w-fit p-5 rounded-md">
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
          <div className="w-full  mt-5">
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
