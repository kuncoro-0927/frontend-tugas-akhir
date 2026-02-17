/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { instanceAdmin } from "../../../../utils/axiosAdmin";
import CardImage from "../../../Card/CardImage";
import Rating from "@mui/material/Rating";
const DetailReview = ({ open, onClose, promoId }) => {
  const [promo, setPromo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPromoDetails = async () => {
    try {
      setLoading(true);
      const response = await instanceAdmin.get(`/get/review/${promoId}`);
      setPromo(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil detail produk:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && promoId) {
      fetchPromoDetails();
    }
  }, [open, promoId]);

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
        ) : promo ? (
          <>
            <div className="flex  items-center justify-between p-4 border-b">
              <div>
                <p className="font-bold text-base">#{promo.id}</p>
                <p className="text-sm font-semibold">Detail Ulasan</p>
              </div>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </div>

            <div className="p-4 text-sm text-graytext overflow-y-auto scrollbar-hide">
              <h1 className="mt-3 mb-3 font-bold">Ringkasan Ulasan</h1>
              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Tanggal ditambahkan</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{formatDate(promo.created_at)}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Nama</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{promo.user_name}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Email</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{promo.email}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Product</p>
                <div className="w-1/2 break-words">
                  <div className="flex items-center gap-3">
                    <div className="">
                      <CardImage
                        image={`${import.meta.env.VITE_BACKEND_URL}${
                          promo.image_url
                        }`}
                        width="w-[70px]"
                        height="h-[70px]"
                      />
                    </div>

                    <div className="">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        {promo.product_name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Rating</p>
                <div className="w-1/2 break-words">
                  <Rating
                    name="read-only"
                    value={promo.rating}
                    size="small"
                    precision={0.1}
                    readOnly
                  />
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Ulasan</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{promo.comment}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-4">
            <p className="text-red-600">Data Promo tidak ditemukan.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailReview;
