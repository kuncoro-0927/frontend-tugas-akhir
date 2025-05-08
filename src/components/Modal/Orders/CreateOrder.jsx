/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import CardImage from "../../Card/CardImage";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  Radio,
  Modal,
  Box,
  Button,
  RadioGroup,
  FormControl,
} from "@mui/material";
import FormInput from "../../TextField";
import debounce from "lodash.debounce";
import { instanceAdmin } from "../../../utils/axiosAdmin";
import { showSnackbar } from "../../CustomSnackbar";
const steps = [
  "Informasi Pelanggan",
  "Pilih Produk",
  "Pengiriman",
  "Pembayaran",
];

const ModalCreateOrder = ({ open, handleClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const originCityId = 40561; // Pacitan
  const courier = "jne";
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [destinationResults, setDestinationResults] = useState([]);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [orderResponse, setOrderResponse] = useState(null);
  const adminFee = 2000;
  const [promo, setPromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  const debouncedSearchCity = debounce(async (keyword) => {
    if (!keyword) return;
    try {
      const res = await instanceAdmin.get(`/cities`, {
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

  const handleApplyPromo = async () => {
    const promoCode = formData.promoCode?.trim();

    if (!promoCode) {
      setFormErrors((prev) => ({
        ...prev,
        promoCode: "Silakan masukkan kode promo",
      }));
      setPromoError(""); // clear promoError
      return;
    }

    // Menghitung subtotal, admin_fee, dan shippingCost
    const subtotal = calculateSubtotal(); // Menghitung subtotal dari item yang dipilih
    const shippingCost = parseInt(selectedShippingOption?.cost || 0); // Biaya pengiriman
    const admin_fee = orderResponse?.data?.admin_fee || 0; // Admin fee yang diambil dari respons order

    const total_amount = subtotal + admin_fee + shippingCost; // Total biaya sebelum diskon

    try {
      const response = await instanceAdmin.post("/promo/check", {
        code: promoCode,
        total: total_amount, // Kirim total_amount yang sudah dihitung
      });

      setPromo(response.data); // { valid, code, discount, total_after_discount }
      setPromoError("");
      setFormErrors((prev) => ({ ...prev, promoCode: "" }));
    } catch (error) {
      setPromo(null);
      setPromoError(error.response?.data?.error || "Kode promo tidak valid");
      setFormErrors((prev) => ({ ...prev, promoCode: "" }));
    }
  };

  useEffect(() => {
    if (selectedUserId) {
      setFormData((prev) => ({
        ...prev,
        selectedUserId: selectedUserId,
      }));
    }
  }, [selectedUserId]);

  const handleSubmit = async () => {
    const subtotal = calculateSubtotal();
    const shippingCost = parseInt(selectedShippingOption?.cost || 0);
    const orderData = {
      user_id: selectedUserId,
      products: selectedItems.map((item) => ({
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        total: item.quantity * item.product.price,
      })),
      address: formData.address,
      city: formData.city,
      postal: formData.postal,
      shippingMethod: formData.shippingMethod,
      paymentMethod: formData.paymentMethod,
      paymentStatus: formData.paymentStatus,
      subtotal: subtotal,
      promo_code: promo?.code || null,
      discount_amount: promo?.discount || 0,
      shipping_fee: shippingCost,
      shipping_service: selectedShippingOption?.service,
      shipping_details: {
        shipping_firstname: formData.firstname,
        shipping_lastname: formData.lastname,
        shipping_phone: formData.phone,
        shipping_address: formData.address,
        province: formData.province,
        city: formData.city,
        postal_code: formData.postal,
        shipping_method: formData.shippingMethod,
        courier: selectedShippingOption?.name || "JNE",
        etd: selectedShippingOption?.etd,
        shipping_cost: shippingCost,
      },
    };

    try {
      // 1. Buat pesanan dulu
      const orderResponse = await instanceAdmin.post(
        "/create/admin/orders",
        orderData
      );

      if (orderResponse.data && orderResponse.data.order_id) {
        // Menyimpan orderResponse ke dalam state
        setOrderResponse(orderResponse.data);

        const { order_id, admin_fee } = orderResponse.data;
        // 2. Kirim request ke backend untuk buat transaksi Midtrans
        const paymentPayload = {
          order_id, // Pastikan order_id ada
          formData,
          selectedService: selectedShippingOption,
          admin_fee,
          promoCode: promo?.valid ? promo : null, // hanya jika promo valid
          total_amount:
            subtotal + admin_fee + shippingCost - (promo?.discount || 0),
          shipping_cost: shippingCost,
          customer: {
            firstName: formData.firstname,
            email: formData.email,
            phone: formData.phone,
            cartItems: selectedItems.map((item) => ({
              productId: item.product.id,
              productName: item.product.name,
              price: item.product.price,
              quantity: item.quantity,
            })),
          },
        };

        console.log("💳 Payload ke /payment:", paymentPayload);

        // 2. Kirim request ke backend untuk buat transaksi Midtrans
        const paymentResponse = await instanceAdmin.post(
          "/create/admin/payment",
          paymentPayload
        );
        console.log("✅ Payment response:", paymentResponse.data);

        const { redirectUrl } = paymentResponse.data;
        if (!redirectUrl) throw new Error("Redirect URL tidak tersedia");

        // 3. Redirect ke Midtrans
        window.location.href = redirectUrl;
      } else {
        throw new Error("order_id tidak tersedia");
      }
    } catch (error) {
      console.error("❌ Gagal submit dan bayar via Midtrans:", error);
      if (error.response) {
        console.error("🧾 Server response error:", error.response.data);
      }
      showSnackbar(
        "Terjadi kesalahan saat membuat pesanan atau pembayaran",
        "error"
      );
    }
  };

  const handleShippingFee = async () => {
    const data = {
      origin: originCityId, // City ID asal (misal Pacitan)
      destination: parseInt(formData.city_id), // City ID tujuan
      courier: courier, // Pilih kurir, bisa diambil dari pilihan pengguna
      weight: totalWeight, // Berat total produk
    };

    try {
      const response = await instanceAdmin.post("/calculate-shipping", data);
      if (response.data && response.data.data) {
        setShippingOptions(response.data.data);
      }
    } catch (error) {
      console.error("Error calculating shipping cost:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await instanceAdmin.get("/all/products");

        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await instanceAdmin.get("/all/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const user = users.find((u) => u.id === selectedUserId);
    setSelectedUser(user);
  }, [selectedUserId, users]);

  useEffect(() => {
    if (open) {
      setActiveStep(0);
    }
  }, [open]);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateSubtotal = () => {
    return selectedItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const totalWeight = selectedItems.reduce((acc, item) => {
    const weight = item.product?.weight_gram || 0;
    const quantity = item?.quantity || 0;
    return acc + weight * quantity;
  }, 0);

  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") handleClose();
      }}
    >
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 5,
          width: { xs: "350px", sm: "550px" },
          maxHeight: "90vh",
          overflowY: "auto",
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome/Safari/Edge
          },
        }}
      >
        <div>
          <div
            className="bg-blue-400/10"
            style={{
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            <button
              onClick={handleClose}
              className="text-2xl flex pt-4 pr-4 justify-end ml-auto"
            >
              <IoClose />
            </button>
            <div className="px-5">
              <h2 className="text-2xl font-bold text-hitam2">Buat Pesanan</h2>
            </div>
          </div>

          <div className="flex text-xs items-start justify-between gap-2 mt-10 mb-7 mx-5">
            <div
              className={`w-full pt-1.5 border-t-2 ${
                activeStep === 0
                  ? "border-blue-500 text-blue-500"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              Penagihan
            </div>
            <div
              className={`w-full pt-1.5 border-t-2 ${
                activeStep === 1
                  ? "border-blue-500 text-blue-500"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              Pilih Produk
            </div>
            <div
              className={`w-full pt-1.5 border-t-2 ${
                activeStep === 2
                  ? "border-blue-500 text-blue-500"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              Pengiriman
            </div>
            <div
              className={`w-full pt-1.5 border-t-2 ${
                activeStep === 3
                  ? "border-blue-500 text-blue-500"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              Pembayaran
            </div>
          </div>

          <form className="px-6 pb-6">
            {activeStep === 0 && (
              <div className="grid ">
                <div className="mb-7">
                  <h1 className="font-bold text-lg">Pengguna untuk Pesanan</h1>
                  <p className="text-sm">
                    Pilih pengguna untuk informasi penagihan
                  </p>
                </div>

                <FormInput
                  select
                  label="Pilih Pengguna"
                  fullWidth
                  value={selectedUserId}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    console.log("Selected User ID:", selectedId); // Debugging
                    setSelectedUserId(selectedId);
                  }}
                >
                  {users.map((user) => (
                    <button
                      className="flex flex-col  p-3 hover:bg-gray-200 w-full text-left"
                      key={user.id}
                      value={user.id}
                    >
                      {user.email}
                    </button>
                  ))}
                </FormInput>

                {selectedUser && (
                  <div className="mt-2 text-sm">
                    <h1 className="font-bold mb-2 text-base">
                      Informasi Pengguna:
                    </h1>

                    <p className="font-semibold flex justify-between">
                      Nama:{" "}
                      <span className="font-bold"> {selectedUser.name}</span>
                    </p>
                    <p className="font-semibold flex justify-between">
                      Email:{" "}
                      <span className="font-bold"> {selectedUser.email}</span>
                    </p>
                    <p className="font-semibold flex justify-between">
                      Nomor Telepon:{" "}
                      <span className="font-bold"> {selectedUser.phone}</span>
                    </p>
                    <p className="font-semibold flex justify-between">
                      Alamat:{" "}
                      <span className="font-bold"> {selectedUser.address}</span>
                    </p>
                  </div>
                )}
                <div className="mt-7 mb-5">
                  <h1 className="font-bold text-lg">Pilih Metode Pengiriman</h1>
                  <p className="text-sm">
                    Pilih apakah pesanan akan dikirim ke alamat pelanggan atau
                    diambil langsung di toko.
                  </p>
                </div>

                <FormControl component="fieldset" className="w-full ">
                  <RadioGroup
                    name="shippingMethod"
                    value={formData.shippingMethod}
                    onChange={handleChange}
                  >
                    <div className="flex justify-center  items-center">
                      <div
                        className={`flex items-center border rounded-lg px-6 py-2 w-full justify-between cursor-pointer ${
                          formData.shippingMethod === "delivery"
                            ? "border-black"
                            : "border-gray-400 hover:border-black"
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            shippingMethod: "delivery",
                          }))
                        }
                      >
                        <img
                          className="w-7 h-7 mr-4"
                          src="/images/shipping.svg"
                          alt="Delivery"
                        />
                        <div className="flex-1">
                          <p className="text-xs sm:text-sm">
                            Pengiriman ke Alamat -{" "}
                            <span className="font-bold">Delivery</span>
                          </p>
                        </div>
                        <Radio
                          value="delivery"
                          checked={formData.shippingMethod === "delivery"}
                          sx={{
                            color: "black",
                            "&.Mui-checked": { color: "black" },
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-center items-center mt-5">
                      <div
                        className={`flex items-center border rounded-lg px-6 py-2 w-full justify-between cursor-pointer ${
                          formData.shippingMethod === "pickup"
                            ? "border-black"
                            : "border-gray-400 hover:border-black"
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            shippingMethod: "pickup",
                          }))
                        }
                      >
                        <img
                          className="w-7 h-7 mr-4"
                          src="/images/ongkir.svg"
                          alt="Pick Up"
                        />
                        <div className="flex-1">
                          <p className="text-xs sm:text-sm">
                            Pengambilan di Toko -{" "}
                            <span className="font-bold">Pick Up</span>
                          </p>
                        </div>
                        <Radio
                          value="pickup"
                          checked={formData.shippingMethod === "pickup"}
                          sx={{
                            color: "black",
                            "&.Mui-checked": { color: "black" },
                          }}
                        />
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
              </div>
            )}

            {activeStep === 1 && (
              <div className="grid gap-4">
                <div className="mb-4">
                  <div className="mb-5">
                    <h1 className="text-lg font-semibold ">Pilih Produk</h1>
                    <p className="text-sm">
                      Silakan pilih produk yang ingin Anda beli dari daftar
                      berikut.
                    </p>
                  </div>
                  <FormInput
                    type="text"
                    label="Cari Produk"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <div className="border rounded mt-1 max-h-48 overflow-y-auto bg-white z-10 relative">
                      {products
                        .filter(
                          (p) =>
                            p.name
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) &&
                            !selectedItems.some((i) => i.product.id === p.id)
                        )
                        .map((product) => (
                          <div
                            key={product.id}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setSelectedItems([
                                ...selectedItems,
                                { product, quantity: 1 },
                              ]);
                              setSearchQuery("");
                            }}
                          >
                            <div className="flex gap-5">
                              <div className="h-[60px] w-[60px]">
                                <CardImage
                                  image={`${import.meta.env.VITE_BACKEND_URL}${
                                    product.image_url
                                  }`}
                                  alt={product.name}
                                />{" "}
                              </div>
                              <p className="flex-col flex">
                                <span className="font-semibold">
                                  {product.name}
                                </span>
                                <span className="text-xs">{product.size}</span>
                                <span className="text-sm mt-auto">
                                  IDR{" "}
                                  {Number(product.price).toLocaleString(
                                    "id-ID"
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      {products.filter(
                        (p) =>
                          p.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) &&
                          !selectedItems.some((i) => i.product.id === p.id)
                      ).length === 0 && (
                        <div className="px-3 py-2 text-sm text-gray-500">
                          Tidak ada produk
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {selectedItems.length > 0 && (
                  <div className="space-y-4 mt-4">
                    <h1 className="text-lg font-semibold">
                      Produk yang dipilih
                    </h1>
                    {selectedItems.map((item, index) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between border-b pb-4 "
                      >
                        <div className="flex gap-5">
                          <div className="h-[60px] w-[60px]">
                            <CardImage
                              image={`${import.meta.env.VITE_BACKEND_URL}${
                                item.product.image_url
                              }`}
                              alt={item.product.name}
                            />{" "}
                          </div>
                          <p className="flex-col flex">
                            <span className="font-semibold">
                              {item.product.name}
                            </span>
                            <span className="text-xs">{item.product.size}</span>
                            <span className="text-sm mt-auto">
                              IDR{" "}
                              {Number(item.product.price).toLocaleString(
                                "id-ID"
                              )}
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center gap-10">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                if (item.quantity > 1) {
                                  setSelectedItems((prev) =>
                                    prev.map((val, i) =>
                                      i === index
                                        ? { ...val, quantity: val.quantity - 1 }
                                        : val
                                    )
                                  );
                                }
                              }}
                              className="py-0.5 px-2 border border-gray-400 rounded-md"
                            >
                              −
                            </button>
                            <span className="w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedItems((prev) =>
                                  prev.map((val, i) =>
                                    i === index
                                      ? { ...val, quantity: val.quantity + 1 }
                                      : val
                                  )
                                )
                              }
                              className="py-0.5 px-2 border border-gray-400 rounded-md"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedItems((prev) =>
                                prev.filter((_, i) => i !== index)
                              );
                            }}
                            className="bg-red-600 px-3 py-2 rounded-md text-white text-sm hover:underline"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeStep === 2 && (
              <div className="grid gap-4">
                {/* <div className="mt-4">
                  <h3 className="font-bold">Subtotal:</h3>
                  <p>Rp {calculateSubtotal().toLocaleString()}</p>
                </div> */}

                <div>
                  <h1 className="font-semibold text-lg">Informasi Penerima</h1>
                  <p className="text-sm">
                    Masukkan data penerima untuk pengiriman pesanan.
                  </p>
                </div>
                <FormInput
                  name="email"
                  type="email"
                  label="Email"
                  onChange={handleChange}
                />
                <div className="flex gap-5">
                  <FormInput
                    name="firstname"
                    type="text"
                    label="Nama Depan"
                    onChange={handleChange}
                  />
                  <FormInput
                    name="lastname"
                    type="text"
                    value={formData.lastname || ""}
                    label="Nama Belakang"
                    onChange={handleChange}
                  />
                </div>
                <FormInput
                  name="address"
                  label="Alamat"
                  value={formData.address || ""}
                  onChange={handleChange}
                />
                <FormInput
                  name="province"
                  type="text"
                  value={formData.province || ""}
                  label="Provinsi"
                  onChange={handleChange}
                />
                <div className="flex gap-5">
                  {" "}
                  <div className="w-full">
                    <FormInput
                      type="text"
                      name="city"
                      value={formData.city || ""}
                      onChange={handleChange}
                      label="Kota/Kabupaten"
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
                  </div>{" "}
                  <FormInput
                    name="postal"
                    label="Kode Pos"
                    value={formData.postal || ""}
                    onChange={handleChange}
                  />
                </div>
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
            )}

            {activeStep === 3 && (
              <div className="grid gap-4">
                {shippingOptions.length > 0 ? (
                  <div className="mb-5">
                    <h1 className="text-lg font-semibold">
                      Pilih Layanan / Kurir
                    </h1>
                    <p className="text-sm mb-2">
                      Silakan pilih layanan pengiriman yang paling sesuai dengan
                      kebutuhan kamu.
                    </p>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                        className="w-full border border-gray-400 px-3 py-3.5 rounded-md text-sm flex justify-between items-center shadow-sm bg-white hover:border-black transition-all"
                      >
                        {selectedShippingOption
                          ? `${selectedShippingOption.name} - ${selectedShippingOption.service}  `
                          : "Pilih layanan pengiriman"}
                        <MdKeyboardArrowDown />
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                          {shippingOptions.map((option, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => {
                                setSelectedShippingOption(option);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                                selectedShippingOption?.service ===
                                option.service
                                  ? "bg-gray-100 font-semibold"
                                  : ""
                              }`}
                            >
                              {option.name} - {option.service} ({option.etd}) -
                              Rp {option.cost.toLocaleString()}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    Belum ada opsi pengiriman tersedia.
                  </p>
                )}
                <div className="flex gap-6">
                  <div className="flex-1">
                    <FormInput
                      type="text"
                      label="Kode Promo"
                      name="promoCode"
                      value={formData.promoCode || ""}
                      onChange={handleChange}
                      error={!!formErrors.promoCode || !!promoError}
                      helperText={formErrors.promoCode || promoError}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="bg-black text-white py-3 px-4 rounded-md"
                  >
                    Klaim
                  </button>
                </div>
                {promo && (
                  <p className="text-green-600 text-sm">
                    Promo <strong>{promo.code}</strong> berhasil! Diskon Rp
                    {promo.discount.toLocaleString()}
                  </p>
                )}
                <h1 className="text-lg font-bold">Rincian Pesanan</h1>
                <div className="space-y-1 text-sm">
                  <p className="flex  justify-between items-center ">
                    <span>Produk</span>
                    <span className="font-semibold text-sm  ">
                      {selectedItems
                        .map(
                          (item) => `${item.product.name} x ${item.quantity}`
                        )
                        .join(", ")}
                    </span>
                  </p>
                  <p className="flex justify-between items-center">
                    Subtotal{" "}
                    <span className="font-semibold">
                      Rp {calculateSubtotal()?.toLocaleString() || 0}
                    </span>
                  </p>
                  <p className="flex justify-between items-center">
                    Biaya Admin{" "}
                    <span className="font-semibold">
                      Rp {(adminFee ?? 0).toLocaleString()}
                    </span>
                  </p>
                  <p className="flex justify-between items-center">
                    Biaya Layanan / Kurir{" "}
                    <span className="font-semibold">
                      Rp {(selectedShippingOption?.cost ?? 0).toLocaleString()}
                    </span>
                  </p>
                  <p className="flex text-green-600 justify-between items-center">
                    <span className="text-black">Diskon</span>
                    <span className="font-semibold">
                      - Rp {(promo?.discount ?? 0).toLocaleString()}
                    </span>
                  </p>
                  <div className="border-b py-1"></div>
                  <p className="flex justify-between pt-2 items-center">
                    <span className="font-semibold text-base">Total</span>
                    <span className="font-semibold text-base">
                      IDR{" "}
                      {(
                        (calculateSubtotal?.() || 0) +
                        (adminFee ?? 0) +
                        (selectedShippingOption?.cost ?? 0) -
                        (promo?.discount ?? 0)
                      ) // Mengurangi diskon promo
                        .toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </form>

          <div className="flex justify-between px-6 pb-4">
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Kembali
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit} // handleSubmit di sini
              >
                Submit
              </Button>
            ) : (
              <button
                className="bg-black px-4 py-2 rounded-md text-white hover:bg-black/80"
                onClick={() => {
                  // Validasi setiap langkah
                  console.log("User yang dipilih:", selectedUser); //
                  if (activeStep === 0 && !formData.selectedUserId) {
                    console.log(
                      "Step 1: Penerima belum dipilih",
                      formData.selectedUserId
                    );
                    alert("Silakan pilih penerima terlebih dahulu");
                    return;
                  }
                  if (activeStep === 0 && !formData.shippingMethod) {
                    console.log(
                      "Step 2: Metode pengiriman belum dipilih",
                      formData.shippingMethod
                    );
                    alert("Silakan pilih metode pengiriman terlebih dahulu");
                    return;
                  }
                  if (activeStep === 1 && selectedItems.length === 0) {
                    console.log("Step 2: Produk belum dipilih", selectedItems);
                    alert("Silakan pilih produk terlebih dahulu");
                    return;
                  }
                  if (activeStep === 2) {
                    // Memastikan semua informasi penerima terisi
                    const requiredFields = [
                      "email",
                      "firstname",
                      "lastname",
                      "address",
                      "province",
                      "city",
                      "postal",
                      "phone",
                    ];

                    for (const field of requiredFields) {
                      if (!formData[field]) {
                        console.log(
                          `Step 3: ${field} belum diisi`,
                          formData[field]
                        );
                        alert(
                          `Silakan lengkapi field ${field} terlebih dahulu`
                        );
                        return;
                      }
                    }
                  }
                  // Lanjutkan ke step berikutnya jika semua validasi terpenuhi
                  console.log("Lanjut ke step berikutnya");
                  if (
                    (activeStep === 0 && formData.selectedUserId) || // Cek pada step 0
                    (activeStep === 1 && selectedItems.length > 0) || // Cek pada step 1
                    (activeStep === 2 && formData.shippingMethod) // Cek pada step 2
                  ) {
                    if (
                      activeStep === 2 &&
                      formData.shippingMethod === "delivery"
                    ) {
                      handleShippingFee(); // Hanya hitung ongkir jika metode delivery
                    }
                    console.log("Melanjutkan ke step berikutnya...");
                    handleNext(); // Lanjutkan ke step berikutnya
                  }
                }}
              >
                Lanjut
              </button>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalCreateOrder;
