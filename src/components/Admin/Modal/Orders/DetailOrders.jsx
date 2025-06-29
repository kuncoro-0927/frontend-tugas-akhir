/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { instanceAdmin } from "../../../../utils/axiosAdmin";
import CardImage from "../../../Card/CardImage";
const DetailOrders = ({ open, onClose, orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && orderId) {
      fetchOrderDetails();
    }
  }, [open, orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await instanceAdmin.get(`/get/order/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      console.error("Gagal mengambil detail order:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // disable scroll seluruh halaman
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    });
    return formatter.format(date);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 z-50 transition-opacity duration-300 ${
          open
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer kanan */}
      <div
        className={`fixed top-5 bottom-5 rounded-lg right-0 scrollbar-hide z-50  w-full max-w-[450px] bg-white shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0 right-5" : "translate-x-full"
        } flex flex-col`}
      >
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : order ? (
          <>
            <div className="flex  items-center justify-between p-4 border-b">
              <div>
                <p className="font-bold text-base">#{order.order_code}</p>
                <p className="text-sm font-semibold">Detail Pesanan</p>
                <p className="text-sm font-semibold">#{order.order_source}</p>
              </div>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </div>

            <div className="p-4 text-sm text-graytext overflow-y-auto scrollbar-hide">
              {/* <div className="flex justify-between  py-2 w-full">
                <p className="font-normal  w-1/2">ID pesanan:</p>
                <div className="w-1/2 break-words">
                  <p className="font-semibold">{order.order_id}</p>
                </div>
              </div> */}
              <p className="font-semibold">#{order.order_id}</p>
              <div className="flex justify-between py-2 w-full">
                <p className="font-normal w-1/2">Invoice:</p>
                <div className="w-1/2 break-words">
                  {order.invoice_url ? (
                    <a
                      href={`${import.meta.env.VITE_BACKEND_URL}${
                        order.invoice_url
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-600 underline"
                    >
                      Lihat Invoice
                    </a>
                  ) : (
                    <p className="text-gray-500 italic">Tidak tersedia</p>
                  )}
                </div>
              </div>

              <h1 className="mt-3 mb-3 font-bold">Items</h1>

              {order.items?.map((item) => (
                <div key={item.id} className="mb-2 py-1">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <CardImage
                        image={`${import.meta.env.VITE_BACKEND_URL}${
                          item.product_image
                        }`}
                        width="w-[50px]"
                        height="h-[50px]"
                        isCustom={item.is_custom}
                      />
                      <p className="flex gap-0.5 flex-col">
                        <span className="font-bold">
                          <span className="font-normal">{item.quantity} x</span>{" "}
                          {item.product_name}
                        </span>

                        <span className="text-xs">{item.category_name}</span>
                      </p>
                    </div>
                    <p className="text-sm font-bold">
                      IDR{" "}
                      {Number(
                        item.is_custom === 1 ? item.custom_price : item.price
                      ).toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  {/* Tambahan jika item custom */}
                  {item.is_custom === 1 && (
                    <div className="mt-2 ml-14 bg-gray-50 p-3 rounded-md border text-sm">
                      <p className="font-medium text-sm mb-1">
                        Ringkasan Custom:
                      </p>
                      <span className="text-xs">
                        {item.custom_width} x {item.custom_height}
                      </span>
                      <p className="mb-2 whitespace-pre-wrap">
                        {item.note || "-"}
                      </p>

                      {item.custom_image_url && (
                        <a
                          href={`${import.meta.env.VITE_BACKEND_URL}${
                            item.custom_image_url
                          }`}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Download Gambar Custom
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <h1 className="border-b mt-5 mb-5"></h1>

              <h1 className="mt-3 mb-3 font-bold">Status Pesanan</h1>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Tanggal pesanan</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{formatDate(order.created_at)}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Terakhir diperbarui</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{formatDate(order.updated_at)}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Layanan pengiriman</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{order.courier}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Estimasi</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{order.etd}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Status</p>
                <div className="w-1/2 break-words">
                  <p
                    className={`block w-fit px-2 py-0.5 rounded-md  text-sm  font-normal
      ${
        order.status === "pending"
          ? "text-orange-500 font-bold bg-orange-100"
          : order.status === "paid"
          ? "text-green-500 font-bold bg-green-100"
          : order.status === "shipped"
          ? "text-blue-500 font-bold bg-blue-100"
          : order.status === "completed"
          ? "text-yellow-500 font-bold bg-yellow-100"
          : "text-gray-500"
      }`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>

              <h1 className="border-b mt-5 mb-5"></h1>

              <h1 className="mt-3 mb-3 font-bold">Pembayaran</h1>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Subtotal</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold ">
                    {" "}
                    IDR{" "}
                    {Number(order.subtotal).toLocaleString("id-ID", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Biaya admin</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold ">
                    {" "}
                    IDR{" "}
                    {Number(order.admin_fee).toLocaleString("id-ID", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Biaya pengiriman</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">
                    {" "}
                    IDR{" "}
                    {Number(order.shipping_fee).toLocaleString("id-ID", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>

              {order.promo_code && (
                <div className="flex justify-between py-2 w-full">
                  <p className="font-normal w-1/2">Promo</p>
                  <div className="w-1/2 break-words mr-5">
                    <p className="text-green-600 font-bold">
                      - IDR{" "}
                      {Number(order.discount_amount).toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between  py-2 w-full">
                <p className="font-bold w-1/2">Total bayar</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">
                    {" "}
                    IDR{" "}
                    {Number(order.total_amount).toLocaleString("id-ID", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>

              <h1 className="border-b mt-5 mb-5"></h1>

              <h1 className="mt-3 mb-3 font-bold">Informasi Penagihan</h1>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Nama</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">
                    {order.user_firstname && order.user_lastname
                      ? `${order.user_firstname} ${order.user_lastname}`
                      : order.name}
                  </p>
                </div>
              </div>
              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Email</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold text-blue-600">{order.user_email}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Nomor telepon</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{order.user_phone}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Alamat</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{order.user_address}</p>
                </div>
              </div>

              <h1 className="border-b mt-5 mb-5"></h1>

              <h1 className="mt-3 mb-3 font-bold">Informasi Penerima</h1>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Nama</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">
                    {order.shipping_firstname} {order.shipping_lastname}
                  </p>
                </div>
              </div>
              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Email</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold text-blue-600">
                    {order.shipping_email}
                  </p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Nomor telepon</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{order.shipping_phone}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Alamat</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{order.shipping_address}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Provinsi</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{order.province}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Kota</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{order.city}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Kode Pos</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{order.postal_code}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-4">
            <p className="text-red-600">Data order tidak ditemukan.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailOrders;
