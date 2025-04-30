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

  const [value, setValue] = React.useState(2);
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const from = location.state?.from;

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
  const sizeOptions = [
    "20 x 30",
    "30 x 40",
    "40 x 50",
    "40 x 60",
    "50 x 60",
    "60 x 70",
    "70 x 80",
  ];
  const row1 = sizeOptions.slice(0, 4); // ambil 4 ukuran pertama
  const row2 = sizeOptions.slice(4); // sisanya

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
    addCart(product, quantity);
  };

  return (
    <>
      <section className="mx-[75px] mt-10">
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

        <div className="mt-10 flex gap-20">
          <div className="w-1/2 h-[550px]">
            <CardImage
              image={`${import.meta.env.VITE_BACKEND_URL}${product.image_url}`}
            />
          </div>
          <div className="flex flex-col md:w-1/2">
            <div className="border rounded-full px-8 border-gray-400 py-1 w-fit">
              {product.category}
            </div>

            <div className="flex mt-4 items-center gap-3">
              <h1 className="text-xl font-medium">{product.name}</h1>
              <GoShareAndroid className="text-xl" />
              <p className="text-lg ml-auto">
                <span className="font-semibold">
                  IDR {Number(product.price).toLocaleString("id-ID")}
                </span>
              </p>
            </div>
            <p className="flex mt-2 items-center gap-2 text-gray-700">
              <Rating
                name="simple-controlled"
                value={value}
                size="small"
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              <span>4.5 rating & 3 ulasan</span>
            </p>

            <p className=" mt-5 text-gray-700">Metode:</p>

            <p className=" mt-5 text-gray-700">Ukuran:</p>
            <div className="flex flex-col gap-2 mt-3">
              {/* Baris 1 */}
              <div className="flex gap-2">
                {row1.map((size, index) => (
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

              {/* Baris 2 */}
              <div className="flex gap-2">
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
            </div>

            <p className=" mt-5 text-gray-700">Jumlah:</p>
            <div className="flex mt-2 items-center gap-2">
              <button
                className="px-2.5 py-0.5 border border-gray-400 rounded-lg"
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="px-2.5 py-0.5 border border-gray-400 rounded-lg"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            <div className="flex mt-10 items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="bg-black w-full rounded-lg text-white py-2"
              >
                Pesan
              </button>
              <button className="w-full border border-gray-400 py-2 rounded-lg">
                Tambah ke favorit
              </button>
            </div>
            <div className="mt-10 space-y-3">
              <AccordionProduct
                title="Deskripsi Produk"
                content={product.description}
                defaultExpanded={true} // auto buka
              />
              <AccordionProduct
                title="Spesifikasi Produk"
                content={product.specification}
                defaultExpanded={false} // tertutup
              />
            </div>
          </div>
        </div>

        <div className="border-t mt-10 pb-10"></div>
      </section>

      <section className="mx-[75px]  pb-20">
        <div className="mt-7 ">
          <h2 className="text-2xl text-hitam2 font-bold">Ulasan Pengguna</h2>
        </div>
        <div className="mt-3 md:flex items-start justify-between text-hitam2 lg:max-w-3xl ">
          <div className=" items-end gap-3">
            <h1 className="flex items-center text-3xl md:text-4xl font-extrabold text-hitam2">
              <Rating
                readOnly
                max={1}
                defaultValue={1}
                sx={{ fontSize: "2rem" }}
                className="mr-2"
              />{" "}
              {"0.0"}
            </h1>
            {/* <p>{reviews[0].total_reviews} ulasan terverifikasi</p> */}
            <p className="mt-2">{3} ulasan terverifikasi</p>
          </div>

          <div className="">
            {[5, 4, 3, 2, 1].map((number, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm font-semibold text-hitam2">
                  {number}
                </span>

                <LinearProgress
                  variant="determinate"
                  value={[4 - index]}
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
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-4">
            <Rating name="read-only" readOnly />

            <div className="">
              <h1 className="text-xs font-semibold">"Anonymous"</h1>
              <div
                className="text-base w-full  border-b pb-5 mt-2 rounded-md 
                    max-w-full 
                    break-words"
              >
                "No review text available."
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
