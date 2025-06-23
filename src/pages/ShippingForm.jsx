/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MuiTelInput } from "mui-tel-input";
import { useDispatch } from "react-redux";
import { CiShoppingCart } from "react-icons/ci";
import { setCheckoutItems } from "../redux/checkoutSlice";
import { useParams, useNavigate } from "react-router-dom";
import { instance } from "../utils/axios";
import CardImage from "../components/Card/CardImage";
import debounce from "lodash.debounce";
import FormInput from "../components/TextField";
import { openDrawer } from "../redux/cartDrawer";
const ShippingForm = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const passedOrderId = location.state?.orderId || orderId;
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  const [destinationResults, setDestinationResults] = useState([]);
  const [loadingOngkir, setLoadingOngkir] = useState(false);
  const originCityId = 40561; // Pacitan
  const courier = "jne";
  const [formErrors, setFormErrors] = useState({});
  const [promo, setPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  console.log("orderdetails", orderDetails);
  const [formData, setFormData] = useState({
    firstName: "",
    lastname: "",
    phone: "",
    address: "",
    province: "",
    promoCode: "",
    city: "",
    postalCode: "",
    note: "",
  });

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await instance.get(`/detail/order/${passedOrderId}`);
        setOrderDetails(response.data.order);
        setOrderItems(response.data.items);
        console.log("setOrderDetails:", response.data.order);
        console.log("setOrderItems:", response.data.items);
      } catch (error) {
        console.error("Gagal mengambil detail pesanan:", error);
      }
    };

    fetchOrderDetails();
  }, [passedOrderId]);

  const handleApplyPromo = async () => {
    if (!formData.promoCode) {
      setFormErrors((prev) => ({
        ...prev,
        promoCode: "Silakan masukkan kode promo",
      }));
      return;
    }

    try {
      const response = await instance.post("/promo/check", {
        code: formData.promoCode,
        total: orderDetails.total_amount, // atau orderDetails.subtotal jika diskon hanya dari subtotal
      });
      setPromo(response.data); // { valid, code, discount, total_after_discount }
      setPromoError("");
      setFormErrors((prev) => ({ ...prev, promoCode: "" }));
    } catch (error) {
      setPromo(null);
      setPromoError(error.response?.data?.error || "Kode promo tidak valid");
    }
  };

  // const debouncedSearchCity = debounce(async (keyword) => {
  //   const trimmed = keyword.trim();
  //   if (trimmed.length < 3) return; // <= Ini penting

  //   try {
  //     const res = await instance.get("/cities", {
  //       params: { search: trimmed },
  //     });
  //     setDestinationResults(res.data.data || []);
  //   } catch (err) {
  //     console.error("Error fetching cities:", err);
  //   }
  // }, 500);

  // useEffect(() => {
  //   if (formData.city.trim().length >= 3) {
  //     debouncedSearchCity(formData.city);
  //   }
  // }, [formData.city]);

  const handleSearchCity = async (search) => {
    const keyword = search.trim();

    if (keyword.length < 3) return;

    try {
      const res = await instance.get("/cities", {
        params: { search: keyword },
      });

      setDestinationResults(res.data.data || []);
      console.log("Hasil pencarian kota:", res.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error.message);
      setDestinationResults([]);
    }
  };

  const handleSelectCity = (city) => {
    const formattedCity =
      city.city_name.charAt(0).toUpperCase() +
      city.city_name.slice(1).toLowerCase();
    setFormData((prev) => ({
      ...prev,
      city: formattedCity,
      city_id: city.id,
      province: city.province_name,
    }));
    setDestinationResults([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const totalWeight = orderItems.reduce((acc, item) => {
    return acc + (item.weight_gram || 0) * item.quantity;
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    // Validasi dasar (selalu dibutuhkan)
    if (!formData.firstName) errors.firstName = "Nama depan wajib diisi";
    if (!formData.lastname) errors.lastname = "Nama belakang wajib diisi";

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) errors.email = "Email wajib diisi";
    else if (!emailRegex.test(formData.email))
      errors.email = "Email tidak valid";

    // Validasi nomor telepon Indonesia
    if (!formData.phone) errors.phone = "Nomor telepon wajib diisi";

    // Jika ada error, hentikan
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({}); // clear errors

    // Jika delivery, pastikan city_id tersedia
    if (!formData.city_id) {
      alert("Pilih kota tujuan terlebih dahulu!");
      return;
    }

    setLoadingOngkir(true);

    try {
      const response = await instance.post("/calculate-shipping", {
        origin: originCityId,
        destination: parseInt(formData.city_id),
        weight: totalWeight,
        courier,
      });

      const shippingOptions = response.data.data;

      if (!shippingOptions || shippingOptions.length === 0) {
        alert("Tidak ada layanan pengiriman yang tersedia.");
        return;
      }

      dispatch(
        setCheckoutItems({
          admin_fee: orderDetails.admin_fee,
          orderDetails: orderDetails,
          items: orderItems,
          formData: formData,
          promo: promo,
          shippingOptions: shippingOptions,
        })
      );

      navigate(`/checkouts/payment/${orderId}`);
    } catch (err) {
      console.error("Gagal menghitung ongkir:", err);
      alert("Gagal menghitung ongkir. Silakan coba lagi.");
    } finally {
      setLoadingOngkir(false);
    }
  };

  return (
    <section className=" h-screen ">
      <div className="border-b  flex items-center justify-between px-7 md:px-32 lg:px-[75px] py-4">
        <Link to="/">
          <img className="w-10" src="/logoindex.svg" alt="" />
        </Link>
        <button
          onClick={() => dispatch(openDrawer())}
          className="relative   rounded-full hover:bg-gray-200/15 "
        >
          <CiShoppingCart className="text-3xl" />
        </button>
      </div>
      <div className="flex flex-col-reverse lg:flex-row mx-7 md:mx-32 lg:mx-[75px] justify-between items-start gap-6">
        {/* Kiri: Info User + Form */}
        <div className="max-w-[600px] h-full mb-10 lg:my-10 overflow-y-auto w-full">
          <h1 className="font-extrabold text-2xl md:text-3xl">
            Lengkapi Alamat Penerima
          </h1>
          <p className="mt-2">
            Mohon isi alamat lengkap untuk pengiriman barang ke tempat yang
            tepat. Pastikan data yang dimasukkan benar dan sesuai.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5  w-full mt-6">
            {" "}
            <h1></h1>
            <div>
              <FormInput
                type="email"
                error={!!formErrors.email}
                helperText={formErrors.email}
                name="email"
                label="Email"
                value={formData.email || ""}
                onChange={handleChange}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <FormInput
                  type="text"
                  name="firstName"
                  label="Nama Depan"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                />
              </div>
              <div>
                <FormInput
                  type="text"
                  name="lastname"
                  label="Nama Belakang"
                  value={formData.lastname || ""}
                  onChange={handleChange}
                  error={!!formErrors.lastname}
                  helperText={formErrors.lastname}
                />
              </div>
            </div>
            <div>
              <FormInput
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                label="Alamat Lengkap"
                error={!!formErrors.address}
                helperText={formErrors.address}
              />
            </div>
            <div>
              <FormInput
                type="text"
                name="city"
                value={formData.city || ""}
                onChange={handleChange}
                onBlur={() => handleSearchCity(formData.city)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchCity(formData.city);
                  }
                }}
                label="Kota/Kabupaten"
                error={!!formErrors.city}
                helperText={formErrors.city}
              />

              {[
                ...new Map(
                  destinationResults
                    .filter((city) =>
                      city.city_name
                        .toLowerCase()
                        .startsWith(formData.city.toLowerCase())
                    )
                    .map((item) => [item.city_name, item])
                ).values(),
              ].map((city) => {
                const formattedCity =
                  city.city_name.charAt(0).toUpperCase() +
                  city.city_name.slice(1).toLowerCase();

                return (
                  <p
                    key={city.id}
                    onClick={() => handleSelectCity(city)}
                    className="px-4 py-2 hover:bg-gray-200/40  cursor-pointer border border-gray-400 rounded-sm max-h-60 overflow-y-auto mt-1"
                  >
                    {formattedCity}
                  </p>
                );
              })}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="relative">
                  <FormInput
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    label="Provinsi"
                    error={!!formErrors.province}
                    helperText={formErrors.province}
                  />
                </div>
              </div>

              <div>
                <FormInput
                  type="text"
                  label="Kode Pos"
                  name="postalCode"
                  value={formData.postalCode || ""}
                  onChange={handleChange}
                  error={!!formErrors.postalCode}
                  helperText={formErrors.postalCode}
                />
              </div>
            </div>
            <div>
              {/* <FormInput
                type="tel"
                name="phone"
                label="Nomor Telepon"
                value={formData.phone || ""}
                onChange={handleChange}
                error={!!formErrors.phone}
                helperText={formErrors.phone}
              /> */}
              <MuiTelInput
                value={formData.phone}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, phone: value }))
                }
                fullWidth
                label="Nomor Telepon"
                size="small"
                helperText={formErrors.phone}
                error={!!formErrors.phone}
                defaultCountry="ID"
                InputLabelProps={{
                  sx: {
                    fontSize: "0.78rem",
                    pointerEvents: "none",
                  },
                }}
                InputProps={{
                  sx: {
                    "& input": {
                      fontSize: "0.87rem",
                      lineHeight: "2.2",
                      transition: "transform 0.2s ease",
                    },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "49px",
                    fontSize: "1rem",
                    color: "black !important",
                    "& fieldset": {
                      borderWidth: "0.3px !important",
                      borderColor: "gray !important",
                    },
                    "&:hover fieldset": {
                      borderWidth: "0.5px !important",
                      borderColor: "black !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderWidth: "1.5px !important",
                      borderColor: "black !important",
                    },
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black !important",
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray !important",
                  },
                  "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                    fontSize: "1rem",
                    color: "black !important",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    fontSize: "1rem",
                    color: "black !important",
                  },
                  "& .MuiOutlinedInput-input": {
                    marginTop: 0,
                  },
                }}
              />
            </div>
            <button
              disabled={loadingOngkir}
              onClick={handleSubmit}
              className="border mt-5 py-3 hover:bg-black/80 rounded-lg bg-black text-white px-3 w-full"
            >
              Bayar
            </button>
          </form>
        </div>

        <div className="lg:border-r border-b my-5 md:my-0 border-gray-300 lg:h-[115vh] lg:mx-4 block self-stretch"></div>
        {/* Kanan: Produk dan Ringkasan */}
        <div className="space-y-3 mt-10 lg:sticky lg:top-28 lg:self-start lg:max-w-[380px] w-full">
          <h1 className="text-xl font-bold mb-5">Ringkasan Pesanan</h1>
          {orderItems.map((item, index) => (
            <div
              className={`flex items-center gap-5 pb-3 ${
                index !== orderItems.length - 1 ? "border-b" : ""
              }`}
              key={item.product_id}
            >
              <CardImage
                image={`${import.meta.env.VITE_BACKEND_URL}${item.image_url}`}
                width="w-[76px]"
                height="h-[64px]"
                quantity={item.quantity}
              />
              <div className="lg:max-w-[380px] w-full">
                <div className="flex justify-between items-center">
                  {" "}
                  <p className="text-base font-bold ">{item.product_name}</p>
                  <p className="font-semibold text-sm">
                    IDR{" "}
                    {Number(item.price).toLocaleString("id-ID", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                  </p>
                </div>
                <p className="text-xs">{item.size}</p>
              </div>
            </div>
          ))}

          <div className="flex w-full gap-5 items-center">
            {" "}
            <FormInput
              type="text"
              label="Kode Promo"
              name="promoCode"
              value={formData.promoCode || ""}
              onChange={handleChange}
              error={!!formErrors.promoCode}
              helperText={formErrors.promoCode}
            />
            <button
              onClick={handleApplyPromo}
              className="bg-black hover:bg-black/80 text-white py-3 px-4 rounded-md"
            >
              Klaim
            </button>
          </div>

          {promoError && (
            <p className="text-red-500 text-sm mt-1">{promoError}</p>
          )}

          <div className="w-full pt-3 text-sm h-fit">
            <div className="">
              <div className="flex justify-between">
                <p className="text-sm">Subtotal</p>
                <span>
                  {orderDetails && orderDetails.subtotal != null
                    ? `IDR ${Number(orderDetails.subtotal).toLocaleString(
                        "id-ID",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}`
                    : "Loading..."}
                </span>
              </div>

              <>
                <div className="flex mt-2 justify-between">
                  <p>Biaya admin</p>
                  <span>
                    {orderDetails?.admin_fee != null
                      ? `IDR ${Number(orderDetails.admin_fee).toLocaleString(
                          "id-ID",
                          {
                            minimumFractionDigits: 2,
                          }
                        )}`
                      : "Loading..."}
                  </span>
                </div>
              </>

              {promo && (
                <p className="text-green-600 flex items-center justify-between text-sm mt-1">
                  <span>
                    Promo <strong>{promo.code}</strong>
                  </span>
                  <strong>
                    - IDR{" "}
                    {Number(promo.discount).toLocaleString("id-ID", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </strong>
                </p>
              )}

              <div className="border-b hidden md:block mt-5"></div>

              <div className="flex mt-5 justify-between font-semibold text-lg">
                <p>Total</p>
                <span>
                  IDR{" "}
                  {promo
                    ? Number(promo.total_after_discount).toLocaleString(
                        "id-ID",
                        {
                          minimumFractionDigits: 2,
                        }
                      )
                    : orderDetails?.total_amount != null
                    ? Number(orderDetails.total_amount).toLocaleString(
                        "id-ID",
                        {
                          minimumFractionDigits: 2,
                        }
                      )
                    : "Loading..."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingForm;
