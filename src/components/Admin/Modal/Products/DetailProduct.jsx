/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { instanceAdmin } from "../../../../utils/axiosAdmin";
import CardImage from "../../../Card/CardImage";
const DetailProduct = ({ open, onClose, productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && productId) {
      fetchProductDetails();
    }
  }, [open, productId]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await instanceAdmin.get(`/product/${productId}`);
      setProduct(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil detail produk:", error);
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
        ) : product ? (
          <>
            <div className="flex  items-center justify-between p-4 border-b">
              <div>
                <p className="font-bold text-base">#{product.id}</p>
                <p className="text-sm font-semibold">Detail Product</p>
              </div>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </div>

            <div className="p-4 text-sm text-graytext overflow-y-auto scrollbar-hide">
              <h1 className="font-bold flex items-center justify-between text-base">
                {" "}
                <span>{product.name}</span>
                <span
                  className={`font-normal text-xs px-4 py-1 ${
                    product.status === "available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  } px-2 py-1 rounded-full`}
                >
                  {product.status === "available" ? "Tersedia" : "Terjual"}
                </span>
              </h1>
              <p className="font-normal mt-3">{product.description}</p>

              <h1 className="border-b mt-5 mb-5"></h1>

              <h1 className="mt-3 mb-3 font-bold">Ringkasan Produk</h1>
              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Tanggal ditambahkan</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{formatDate(product.created_at)}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Tanggal diperbarui</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{formatDate(product.updated_at)}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Ukuran/cm</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{product.size}</p>
                </div>
              </div>
              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Berat/gram</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{product.weight_gram}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Harga</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">
                    {" "}
                    IDR{" "}
                    {Number(product.price).toLocaleString("id-ID", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
              <h1 className="border-b mt-5 mb-5"></h1>
              <h1 className="mt-3 mb-3 font-bold">Gambar Produk</h1>
              <CardImage
                image={`${import.meta.env.VITE_BACKEND_URL}${
                  product.image_url
                }`}
                width="w-[150px]"
                height="h-[150px]"
              />
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

export default DetailProduct;
