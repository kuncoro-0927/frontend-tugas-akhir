import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "../../utils/axios";
import { CiCalendar } from "react-icons/ci";
import SidebarAccount from "../../components/SidebarforAccount";
import Rating from "@mui/material/Rating";
import CardImage from "../../components/Card/CardImage";
import ModalReview from "../../components/Modal/ModalReview";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Review = () => {
  const [products, setProducts] = useState([]); // Ganti "tickets" menjadi "products"
  const [reviews, setReviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [activeTab, setActiveTab] = useState("products");
  const handleOpenReviewModal = (productId) => {
    setSelectedProductId(productId);
    setModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setSelectedProductId(null);
    setModalOpen(false);
  };

  // Update endpoint API untuk mengambil produk yang telah dipesan
  const fetchProducts = async () => {
    try {
      const response = await instance.get("/product/review/user"); // Ganti dengan endpoint baru
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Gagal memuat produk yang telah dipesan.", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await instance.get("/review/user");
      setReviews(response.data.reviews); // Sesuaikan jika struktur data berbeda
    } catch (error) {
      console.error("Gagal memuat ulasan.", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Memanggil fungsi untuk mendapatkan produk yang dipesan
    fetchReviews(); // Memanggil fungsi untuk mendapatkan ulasan
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  const hasReviewedProduct = (product) => {
    return reviews.some((review) => review.product_id === product.id); // Ganti ticket_code menjadi product_code
  };

  return (
    <>
      <section className="flex h-screen  2xl:mx-32">
        <ModalReview
          open={modalOpen}
          handleClose={handleCloseReviewModal}
          productId={selectedProductId} // asumsinya ticketId sekarang dipakai untuk productId
        />

        <div className="hidden sm:block md:block lg:block">
          <SidebarAccount />
        </div>
        <div className="mt-5 md:p-8 mx-4 w-full text-hitam">
          <h1 className="font-extrabold text-2xl md:text-3xl ">Ulasan</h1>
          <p className="text-sm mb-5 flex items-center gap-1">
            Hanya produk yang sudah diterima yang bisa diulas.
            <Tooltip title="Produk yang ditampilkan adalah produk yang telah diterima. Jika Anda membeli lebih dari satu item yang sama, hanya satu yang ditampilkan.">
              <InfoOutlinedIcon
                style={{ fontSize: "17px" }}
                className="text-blue-500 cursor-pointer"
              />
            </Tooltip>
          </p>

          <div className="flex">
            <button
              onClick={() => setActiveTab("products")}
              className={`font-bold py-2 px-4 ${
                activeTab === "products" ? "border-blue-400  border-b-4 " : ""
              }`}
            >
              Produk Anda
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`font-bold py-2 px-4 ml-5 ${
                activeTab === "reviews" ? "border-blue-400 border-b-4" : ""
              }`}
            >
              Ulasan Anda
            </button>
          </div>

          {activeTab === "products" ? (
            products.length === 0 ? (
              <div className="mt-10 w-full flex flex-col items-center">
                <p className="text-hitam text-xl lg:text-2xl font-extrabold">
                  Anda belum memiliki produk
                </p>
                <img
                  className="w-64 mt-7"
                  src="/images/noreview.svg"
                  alt="Agenda"
                />
                <p className="text-center mt-5 font-medium">
                  Petualangan Anda berikutnya menanti. Temukan bersama kami!
                </p>
                <Link
                  to="/seluruhproduk" // Ganti dari seluruhwisata ke seluruhproduk
                  className="bg-hitam text-lg text-white px-6 mt-10 py-2 lg:py-2 hover:bg-hover hover:-translate-y-2 duration-300 rounded-md"
                >
                  Eksplor
                </Link>
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className=" max-w-[800px] md:h-[200px] h-[150px]  mb-4 mt-10 border flex border-gray-200 w-full rounded-lg shadow-sm"
                >
                  <div className="lg:h-[200px]  h-[120px] lg:w-[300px] ">
                    <CardImage
                      image={`${import.meta.env.VITE_BACKEND_URL}${
                        product.image_url
                      }`}
                    />
                  </div>
                  <div className="p-4 w-full md:p-4 flex flex-col justify-start">
                    <h1 className="font-bold text-xl">{product.name}</h1>
                    <p className="mt-3 text-sm flex items-center">
                      <CiCalendar className="text-lg mr-1" />
                      <span className="mr-1">Tanggal Pesanan:</span>{" "}
                      <span>{formatDate(product.ordered_at)}</span>
                    </p>
                    <h1 className="mt-1 text-sm">{product.size}</h1>

                    <p className="mt-auto">Beri ulasan untuk produk ini</p>
                    <div className="mt-auto flex justify-between items-end">
                      <button
                        onClick={() => handleOpenReviewModal(product.id)}
                        disabled={hasReviewedProduct(product)}
                        className={`${
                          hasReviewedProduct(product)
                            ? "bg-gray-100/70 text-gray-500/50 cursor-not-allowed"
                            : "bg-black text-white"
                        } px-4 w-fit py-2 rounded-md  text-xs md:text-sm`}
                      >
                        {hasReviewedProduct(product)
                          ? "Selesai"
                          : "Beri Ulasan"}
                      </button>
                      <button className="underline">Lihat produk</button>
                    </div>
                  </div>
                </div>
              ))
            )
          ) : reviews.length === 0 ? (
            <p className="mt-10 text-center text-hitam font-bold">
              Anda belum memberikan ulasan.
            </p>
          ) : (
            reviews.map((review) => (
              <div key={`review-${review.id}`}>
                <div
                  key={`review-content-${review.id}`}
                  className="max-w-[800px] md:h-[180px] h-[120px] mt-10 border flex border-gray-200 w-full rounded-t-lg shadow-sm"
                >
                  <div className=" w-[150px] md:w-[230px] flex items-center justify-center overflow-hidden">
                    <CardImage
                      image={`${import.meta.env.VITE_BACKEND_URL}${
                        review.image_url
                      }`}
                    />
                  </div>
                  <div className="p-4 md:p-4 w-full flex flex-col justify-start">
                    <h1 className="font-bold text-sm md:text-xl">
                      {review.product_name}
                    </h1>
                    <p className="mt-3 text-xs md:text-sm flex items-center text-hitam2 font-semibold ">
                      {review.size}
                    </p>
                    <p className="font-extrabold text-xs md:text-base flex items-center">
                      IDR {Number(review.price).toLocaleString("id-ID")}
                    </p>

                    <div className="flex mt-auto justify-between items-end">
                      {" "}
                      <p className="mt-2 text-xs hidden md:flex md:text-sm items-center text-hitam2 font-semibold ">
                        Diberikan pada: {formatDate(review.created_at)}
                      </p>
                      <button className="underline">Lihat produk</button>
                    </div>
                  </div>
                </div>
                {/* Bagian detail tambahan ulasan */}
                <div
                  key={`review-details-${review.id}`}
                  className="product-card p-2 max-w-[800px] mb-4 border border-gray-200 w-full rounded-b-lg shadow-sm"
                >
                  <p className="mt-2 text-xs md:hidden md:text-sm items-center text-hitam2 font-semibold ">
                    Diberikan pada: {formatDate(review.created_at)}
                  </p>
                  <Rating
                    name="read-only"
                    value={review.rating}
                    readOnly
                    sx={{ fontSize: "1.7rem" }}
                  />
                  <p className="text-sm md:text-base mt-1 md:mt-0 text-hitam2">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Review;
