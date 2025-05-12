/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setCheckoutItems } from "../redux/checkoutSlice";
import { Radio, FormControlLabel } from "@mui/material";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { IoInformation } from "react-icons/io5";
import FormInput from "../components/TextField";
import { showSnackbar } from "../components/CustomSnackbar";
import { instance } from "../utils/axios";
import { clearPromo } from "../redux/checkoutSlice";
import CardImage from "../components/Card/CardImage";

const Payment = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedService, setSelectedService] = useState(null);
  const [promocode, setPromocode] = useState(null);
  const [promoError, setPromoError] = useState("");
  const {
    shippingMethod,
    orderDetails,
    setOrderDetails,
    orderItems,
    items,
    admin_fee,
    promo,
    formData,
    shippingOptions,
  } = useSelector((state) => state.checkout);
  console.log("orderdetails", orderDetails);
  console.log("setorderdetails", setOrderDetails);
  const isPickup = shippingMethod && shippingMethod === "pickup";
  const [promoCodeInput, setPromoCodeInput] = useState("");

  const handleServiceChange = (service) => {
    // Pastikan data dipassing ke Redux dengan benar
    dispatch(
      setCheckoutItems({
        shippingMethod,
        items,
        orderDetails,
        formData,
        shippingOptions: shippingOptions.map((option) =>
          option.service === service.service
            ? { ...option, selected: true }
            : { ...option, selected: false }
        ),
        admin_fee,
        promo,
        selectedService: service, // Pilihan layanan pengiriman yang dipilih
      })
    );
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = promo?.discount || promocode?.discount || 0;
  const admin = Number(admin_fee) || 0;
  const shipping = selectedService ? parseInt(selectedService.cost) : 0;

  const finalTotal = subtotal - discount + admin + shipping;

  const handleApplyPromo = async () => {
    console.log("Promo code:", promoCodeInput); // Log kode promo yang dimasukkan
    console.log("Total:", finalTotal); // Log total harga untuk promo

    try {
      // Kirim request untuk mengecek promo ke backend
      const response = await instance.post("/promo/check", {
        code: promoCodeInput, // Gunakan input kode promo yang dimasukkan oleh pengguna
        total: finalTotal, // Total harga yang diperhitungkan dengan promo
      });

      // Jika promo valid, simpan hasilnya ke state
      setPromocode(response.data);
      console.log("Promo response:", response.data);
      setPromoError(""); // Reset error jika promo valid
    } catch (error) {
      // Jika terjadi error atau promo tidak valid
      setPromoError(error.response?.data?.error || "Kode promo tidak valid");
    }
  };

  const handleCancelPromo = () => {
    dispatch(clearPromo(null));
    setPromocode(null); // reset promo
    setPromoCodeInput(""); // reset input kode promo
    setPromoError(""); // reset error
  };

  const handlePayment = async () => {
    try {
      // Siapkan default service jika metode pickup
      const service = isPickup
        ? {
            name: "Ambil di tempat",
            etd: "-",
            cost: 0,
          }
        : selectedService;

      // 1. Simpan data pengiriman ke DB (pickup tetap disimpan juga)
      await instance.post("/shipping/details", {
        order_id: orderId,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastname,
        phone: formData.phone,
        address: formData.address || "-",
        province: formData.province || "-",
        city: formData.city || "-",
        postal_code: formData.postalCode || "-",
        shipping_method: shippingMethod,
        courier: service.name,
        etd: service.etd,
        shipping_cost: parseInt(service.cost),
      });

      // 2. Proses pembayaran ke Midtrans
      const response = await instance.post("/payment", {
        order_id: orderId,
        formData,
        selectedService: service,
        admin_fee: admin_fee,
        promo: promo,
        promocode: promocode,
        total_amount: finalTotal,
        shipping_cost: parseInt(service.cost),
        customer: {
          firstName: formData.firstName,
          email: formData.email,
          phone: formData.phone,
          cartItems: items.map((item) => ({
            productId: item.product_id,
            productName: item.product_name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      });

      const { redirectUrl } = response.data;
      if (!redirectUrl) {
        throw new Error("Redirect URL tidak diterima dari backend.");
      }

      // 3. Update status order menjadi pending
      await instance.patch(`/order/${orderId}/status`, {
        status: "paid",
        shipping_fee: parseInt(service.cost),
        total_amount: response.data.grossAmount,
      });

      // 4. Redirect ke halaman pembayaran Midtrans
      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Gagal memproses pembayaran:", error);
      showSnackbar("Terjadi kesalahan. Silakan coba lagi.", "error");
    }
  };

  return (
    <>
      <section className=" space-x-20 flex justify-between mx-20">
        <div className="max-w-[700px] mt-10  w-full">
          <div className="border-b pb-2 flex items-start justify-between border-gray-400 max-w-[700px]">
            <div>
              <h1 className="font-bold text-2xl ">
                {" "}
                {isPickup ? "Informasi Pengambilan" : "Layanan/Kurir"}
              </h1>
              <div>
                <p className="text-sm mt-3">
                  <span className="font-bold text-sm">
                    {isPickup ? "Nama Pemesan: " : "Pengiriman ke: "}
                  </span>
                  {formData?.firstName} / {formData?.lastname} /{" "}
                  {formData?.phone}
                </p>

                {isPickup ? (
                  <p className=" text-sm ">
                    <span className="font-bold">
                      Metode: <span className="font-normal">Pickup</span>
                    </span>{" "}
                    <br />
                    <span>Silakan ambil pesanan di </span>{" "}
                    <span className="font-semibold">
                      Jl. Contoh No.123, Pacitan, Jawa Timur
                    </span>
                  </p>
                ) : selectedService ? (
                  <p className="text-sm mt-3">
                    <span className="mt-2 font-bold">Layanan:</span>{" "}
                    {selectedService.name} - {selectedService.service} /
                    Estimasi:{" "}
                    <span className="font-extrabold">
                      {selectedService.etd}
                    </span>{" "}
                    / Biaya:{" "}
                    <span className="font-bold">
                      IDR {parseInt(selectedService.cost).toLocaleString()}
                    </span>
                  </p>
                ) : (
                  <p className="mt-3 text-sm text-gray-500">
                    Silahkan pilih layanan terlebih dahulu
                  </p>
                )}
              </div>
            </div>
            {!isPickup && (
              <button
                onClick={handleOpen}
                className="bg-black hover:-translate-y-1 duration-300 p-0.5 rounded-full w-fit"
              >
                <IoInformation className="text-white text-base" />
              </button>
            )}
          </div>

          <div className="mt-10">
            <h1 className="text-2xl font-bold">Pembayaran</h1>
            <p className="text-gray-950/50 mt-1 text-sm mb-5">
              Semua transaksi diproses melalui Midtrans dan dienkripsi secara
              aman.
            </p>

            <div className="rounded-xl border border-gray-300 bg-gray-100/50">
              <div className="rounded-t-xl px-3 py-4 border border-black/50 items-center justify-between flex">
                <h1>Pembayaran via Midtrans</h1>
                <div className="flex items-center gap-3">
                  <img className="w-12" src="/images/bni.svg" alt="" />
                  <img className="w-14" src="/images/bri.svg" alt="" />
                  <img className="w-14" src="/images/mandiri.svg" alt="" />
                </div>
              </div>

              <img
                className="w-40 mt-5 text-center mx-auto"
                src="/images/creditcard2.svg"
                alt=""
              />
              <p className="text-sm max-w-sm mb-5 text-center mx-auto mt-7">
                Setelah klik 'Bayar Sekarang', Anda akan diarahkan ke halaman
                pembayaran Midtrans untuk menyelesaikan transaksi dengan aman.
              </p>
            </div>
          </div>
          <Modal open={open}>
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
                maxWidth: "100%",
                maxHeight: { xs: "70vh", md: "90vh" },
              }}
            >
              <div>
                <div
                  className=" bg-blue-400/10 mb-3  "
                  style={{
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                  }}
                >
                  <button
                    onClick={handleClose}
                    className="text-2xl flex p-4 justify-end ml-auto"
                  >
                    <IoClose />
                  </button>
                  <div className="px-5 pb-2">
                    <h2 className="text-2xl font-bold text-hitam2 mb-2">
                      Pilih Layanan / Kurir
                    </h2>
                    <p className="text-sm">
                      Untuk pengiriman, kami menggunakan layanan{" "}
                      <span className="font-medium">JNE</span>.
                    </p>
                  </div>
                </div>
                <div className="flex  justify-center mx-5 items-center">
                  <div className=" overflow-y-auto max-h-[40vh] text-black w-full">
                    {[...shippingOptions]
                      .sort((a, b) => a.cost - b.cost)
                      .map((service, index) => (
                        <div
                          className={`py-2 flex justify-start items-start px-5 mt-2 rounded-lg cursor-pointer ${
                            selectedService?.service === service.service
                              ? "border bg-gray-100 border-gray-500" // Pastikan border terlihat lebih jelas dengan warna yang lebih gelap
                              : "bg-white border border-gray-300" // Border normal untuk yang tidak dipilih
                          }`}
                          key={index}
                          onClick={() => {
                            setSelectedService(service);
                            handleServiceChange(service);
                          }}
                        >
                          <FormControlLabel
                            value={service.service}
                            sx={{
                              p: 0,
                            }}
                            control={
                              <Radio
                                checked={
                                  selectedService?.service === service.service
                                }
                                size="small"
                                sx={{
                                  color: "black",
                                  "&.Mui-checked": {
                                    color: "black",
                                  },

                                  paddingTop: 0.4,
                                }}
                              />
                            }
                          />

                          <div className="w-full  items-center justify-between">
                            <div className="flex items-center justify-between">
                              <h1 className="font-semibold">
                                {service.name} - {service.service}
                              </h1>{" "}
                              <p className="text-sm ml-auto font-semibold">
                                {" "}
                                IDR {parseInt(service.cost).toLocaleString()}
                              </p>
                            </div>
                            <div className="text-gray-950/60 mt-1 font-medium text-sm">
                              <p className="">
                                Estimasi:{" "}
                                <span className="">{service.etd}</span>
                              </p>
                              <p className=" text-sm">
                                {service.description} - {service.name} -{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex justify-center mx-5 items-center pb-7 mt-5"></div>
              </div>
            </Box>
          </Modal>

          <button
            className="py-3 w-full bg-black text-white mt-10 rounded-lg"
            onClick={handlePayment}
          >
            Bayar Sekarang
          </button>
        </div>

        <div className="border-r border-gray-300 h-[130vh] mx-4 self-stretch"></div>
        <div className="space-y-3 sticky top-28 self-start max-w-[380px] w-full">
          <h1 className="text-xl font-bold mb-5">Ringkasan Pesanan</h1>
          {items.map((item, index) => (
            <div
              className={`flex items-center gap-5 pb-3 ${
                index !== items.length - 1 ? "border-b" : ""
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
            <FormInput
              type="text"
              label="Kode Promo"
              name="promoCode"
              value={
                promo ? promo.code : promocode ? promocode.code : promoCodeInput
              }
              onChange={(e) => setPromoCodeInput(e.target.value)}
              disabled={promo || promocode} // tidak bisa diubah jika sudah klaim
            />

            <button
              onClick={() => {
                if (promo || promocode) {
                  handleCancelPromo(); // batalkan keduanya
                } else {
                  handleApplyPromo(); // klaim
                }
              }}
              className="bg-black text-white py-3 px-4 rounded-md"
            >
              {promo || promocode ? "Batalkan" : "Klaim"}
            </button>
          </div>

          <div className="w-full pt-3 text-sm h-fit">
            <div className="">
              <div className="flex justify-between">
                <p className="text-sm">Subtotal</p>
                <span>
                  {subtotal && subtotal != null
                    ? `IDR ${Number(subtotal).toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : "Loading..."}
                </span>
              </div>
              {!isPickup && (
                <div className="flex mt-2 justify-between">
                  <p className="text-sm">Biaya admin</p>
                  <span>
                    {admin_fee && admin_fee != null
                      ? `IDR ${Number(admin_fee).toLocaleString("id-ID", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`
                      : "Loading..."}
                  </span>
                </div>
              )}
              {!isPickup && (
                <div className="flex mt-2 justify-between">
                  <p className="text-sm">Biaya pengiriman</p>
                  <span>
                    {selectedService
                      ? `IDR ${Number(shipping).toLocaleString("id-ID", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`
                      : "Belum dipilih"}
                  </span>
                </div>
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
              {promoError && (
                <p className="text-red-500 text-sm mt-1">{promoError}</p>
              )}
              {promocode && (
                <p className="text-green-600 flex items-center justify-between text-sm mt-1">
                  <span>
                    Promo <strong>{promocode.code}</strong>
                  </span>
                  <strong>
                    - IDR{" "}
                    {Number(promocode.discount).toLocaleString("id-ID", {
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
                  {Number(finalTotal).toLocaleString("id-ID", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Payment;
