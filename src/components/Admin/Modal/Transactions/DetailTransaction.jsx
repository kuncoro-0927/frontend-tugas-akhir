/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { instanceAdmin } from "../../../../utils/axiosAdmin";
import CardImage from "../../../Card/CardImage";
const DetailTransaction = ({ open, onClose, transactionId }) => {
  const [promo, setPromo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPromoDetails = async () => {
    try {
      setLoading(true);
      const response = await instanceAdmin.get(
        `/get/transaction/${transactionId}`
      );
      setPromo(response.data);
      console.log("data", response.data);
    } catch (error) {
      console.error("Gagal mengambil detail produk:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && transactionId) {
      fetchPromoDetails();
    }
  }, [open, transactionId]);

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
                <p className="font-bold text-base">#{promo.order_id}</p>
                <p className="text-sm font-semibold">Detail Transaksi</p>
              </div>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </div>

            <div className="p-4 text-sm text-graytext overflow-y-auto scrollbar-hide">
              <h1 className="mt-3 mb-3 font-bold">Ringkasan Transaksi</h1>
              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Tanggal ditambahkan</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{formatDate(promo.created_at)}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Tanggal diperbarui</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{formatDate(promo.updated_at)}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Kode Pesanan</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{promo.order_code}</p>
                </div>
              </div>
              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Payment Token</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{promo.payment_token}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">ID Transaksi</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{promo.transaction_id}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Status</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{promo.transaction_status}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Tipe Pembayaran</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{promo.payment_type}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Nama bank</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{promo.bank}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Total Pembayaran</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold ">
                    {" "}
                    IDR{" "}
                    {Number(promo.gross_amount).toLocaleString("id-ID", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Tanggal pembayaran</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">
                    {formatDate(promo.transaction_time)}
                  </p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Tanggal pelunasan</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">
                    {formatDate(promo.settlement_time)}
                  </p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Tanggal kadaluwarsa</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{formatDate(promo.expiry_time)}</p>
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

export default DetailTransaction;
