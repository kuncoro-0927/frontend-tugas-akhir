/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { setCheckoutItems } from "../redux/checkoutSlice";
import { useParams, useNavigate } from "react-router-dom";
import { instance } from "../utils/axios";
import CardImage from "../components/Card/CardImage";
import debounce from "lodash.debounce";
import FormInput from "../components/TextField";
import CheckoutStepper from "../components/Stepper";
const ShippingForm = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const passedOrderId = location.state?.orderId || orderId;
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [filteredProvinces, setFilteredProvinces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [destinationResults, setDestinationResults] = useState([]);
  const [loadingOngkir, setLoadingOngkir] = useState(false);
  const originCityId = 40561; // Pacitan
  const courier = "jne";
  const [formErrors, setFormErrors] = useState({});
  const [promo, setPromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  const shippingMethod = useSelector((state) => state.checkout.shippingMethod);

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
    shippingMethod: shippingMethod,
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

  const debouncedSearchCity = debounce(async (keyword) => {
    if (!keyword) return;
    try {
      const res = await instance.get(`/cities`, {
        params: { search: keyword },
      });
      setDestinationResults(res.data.data || []);
    } catch (err) {
      console.error("Gagal cari kota:", err);
    }
  }, 500);

  useEffect(() => {
    debouncedSearchCity(formData.city);
  }, [formData.city]);

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
    else {
      const cleanedPhone = formData.phone.replace(/[^\d]/g, "");
      const phoneWithCountryCode = `+62${cleanedPhone}`;
      const phoneRegex = /^\+62\d{9,11}$/;
      if (!phoneRegex.test(phoneWithCountryCode)) {
        errors.phone =
          "Nomor telepon tidak valid, format harus +62 diikuti 9-11 digit angka.";
      }
    }

    // Jika shipping method adalah 'delivery', tambahkan validasi alamat lengkap
    const isPickup = orderDetails.shipping_method === "pickup";

    if (!isPickup) {
      if (!formData.address) errors.address = "Alamat wajib diisi";
      if (!formData.province) errors.province = "Provinsi wajib diisi";
      if (!formData.city) errors.city = "Kota wajib diisi";
      if (!formData.postalCode) errors.postalCode = "Kode pos wajib diisi";
    }

    // Jika ada error, hentikan
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({}); // clear errors

    // Jika pickup, langsung lanjut ke payment tanpa menghitung ongkir
    if (isPickup) {
      dispatch(
        setCheckoutItems({
          shippingMethod: orderDetails.shipping_method,
          admin_fee: orderDetails.admin_fee,
          items: orderItems,
          orderDetails: orderDetails,
          formData: formData,
          promo: promo,
          shippingOptions: [],
        })
      );

      navigate(`/tes/payment/${orderId}`);
      return;
    }

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
          shippingMethod: orderDetails.shipping_method,
          admin_fee: orderDetails.admin_fee,
          orderDetails: orderDetails,
          items: orderItems,
          formData: formData,
          promo: promo,
          shippingOptions: shippingOptions,
        })
      );

      navigate(`/tes/payment/${orderId}`);
    } catch (err) {
      console.error("Gagal menghitung ongkir:", err);
      alert("Gagal menghitung ongkir. Silakan coba lagi.");
    } finally {
      setLoadingOngkir(false);
    }
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await instance.get("/provinces");
        setProvinces(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil provinsi:", error);
      }
    };

    fetchProvinces();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = provinces.filter((province) =>
      province.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProvinces(filtered);
  };

  const handleSelectProvince = (provinceCode) => {
    setFormData({
      ...formData,
      province: provinceCode,
    });
    setSearchQuery("");
    setFilteredProvinces([]);
  };

  const handleClearSelection = () => {
    setFormData({
      ...formData,
      province: "",
    });
    setSearchQuery("");
    setFilteredProvinces([]);
  };

  const selectedProvince = provinces.find(
    (province) => province.code === formData.province
  );

  return (
    <section className="mx-[75px] h-screen space-y-6">
      <div className="flex  justify-between items-start gap-6">
        {/* Kiri: Info User + Form */}
        <div className="max-w-[600px] h-full my-10 overflow-y-auto w-full">
          <h1 className="font-extrabold text-3xl">
            {orderDetails?.shipping_method === "pickup"
              ? "Formulir Penjemputan"
              : "Lengkapi Alamat Penerima"}
          </h1>
          <p className="mt-2">
            {orderDetails?.shipping_method === "pickup"
              ? "Mohon isi data kontak agar kami bisa menginformasikan waktu penjemputan."
              : "Mohon isi alamat lengkap untuk pengiriman barang ke tempat yang tepat. Pastikan data yang dimasukkan benar dan sesuai."}
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
            {orderDetails?.shipping_method === "delivery" && (
              <>
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
                        value={
                          selectedProvince
                            ? selectedProvince.name
                            : searchQuery || ""
                        }
                        onChange={handleSearchChange}
                        label="Provinsi"
                        error={!!formErrors.province}
                        helperText={formErrors.province}
                      />
                      {selectedProvince && (
                        <button
                          type="button"
                          onClick={handleClearSelection}
                          className="absolute right-4 top-[13px] text-black"
                        >
                          &#10005; {/* Ikon X untuk menghapus */}
                        </button>
                      )}
                    </div>

                    {filteredProvinces.length > 0 && searchQuery && (
                      <ul className="border rounded-md max-h-60 overflow-y-auto mt-1">
                        {filteredProvinces.map((province) => (
                          <li
                            key={province.code}
                            onClick={() => handleSelectProvince(province.code)}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                          >
                            {province.name}
                          </li>
                        ))}
                      </ul>
                    )}
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
              </>
            )}
            <div>
              <FormInput
                type="tel"
                name="phone"
                label="Nomor Telepon"
                value={formData.phone || ""}
                onChange={handleChange}
                error={!!formErrors.phone}
                helperText={formErrors.phone}
              />
            </div>
            <button
              disabled={loadingOngkir}
              onClick={handleSubmit}
              className="border mt-5 py-2 rounded-lg bg-black text-white px-3 w-full"
            >
              Bayar
            </button>
          </form>
        </div>
        <div className="border-r border-gray-300 h-[115vh] mx-4 self-stretch"></div>
        {/* Kanan: Produk dan Ringkasan */}
        <div className="space-y-3 mt-10 sticky top-28 self-start max-w-[380px] w-full">
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
              <div className="max-w-[380px] w-full">
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
              className="bg-black text-white py-3 px-4 rounded-md"
            >
              Klaim
            </button>
          </div>

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

              {orderDetails?.shipping_method === "delivery" && (
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

                  <div className="flex mt-2 justify-between">
                    <p>Biaya pengiriman</p>
                    <span>
                      {orderDetails?.shipping_cost != null
                        ? `IDR ${Number(
                            orderDetails.shipping_cost
                          ).toLocaleString("id-ID", {
                            minimumFractionDigits: 2,
                          })}`
                        : "IDR 0"}
                    </span>
                  </div>
                </>
              )}
              {promoError && (
                <p className="text-red-500 text-sm mt-1">{promoError}</p>
              )}
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

              <div className="border-b mt-5"></div>

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
