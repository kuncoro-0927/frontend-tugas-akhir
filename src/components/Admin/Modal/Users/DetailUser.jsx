/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { instanceAdmin } from "../../../../utils/axiosAdmin";
import CardImage from "../../../Card/CardImage";
const DetailUsers = ({ open, onClose, userId }) => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await instanceAdmin.get(`/get/users/${userId}`);
      setUsers(response.data);
    } catch (error) {
      console.error("Gagal mengambil detail user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && userId) {
      fetchUserDetails();
    }
  }, [open, userId]);

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
        ) : users ? (
          <>
            <div className="flex  items-center justify-between p-4 border-b">
              <div>
                <p className="font-bold text-base">#{users.id}</p>
                <p className="text-sm font-semibold">Detail Pengguna</p>
              </div>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </div>

            <div className="p-4 text-sm text-graytext overflow-y-auto scrollbar-hide">
              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Status</p>
                <div className="w-1/2 break-words">
                  <p
                    className={`font-bold ${
                      users.isverified === 1
                        ? " text-green-600"
                        : " text-red-600"
                    } text-xs rounded-md`}
                  >
                    {" "}
                    {users.isverified === 1
                      ? "Terverifikasi"
                      : "Belum Verifikasi"}
                  </p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Tanggal ditambahkan</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{formatDate(users.created_at)}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Tanggal diperbarui</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{formatDate(users.updated_at)}</p>
                </div>
              </div>
              <h1 className="mt-5 mb-3 font-bold">Ringkasan Informasi</h1>
              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Nama</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{users.name}</p>
                </div>
              </div>
              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Nama depan</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{users.firstname}</p>
                </div>
              </div>
              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Nama belakang</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{users.lastname}</p>
                </div>
              </div>
              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Email</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{users.email}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Nomor telepon</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{users.phone}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Alamat</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{users.address}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Provinsi</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{users.province}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Kota</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{users.city}</p>
                </div>
              </div>

              <div className="flex justify-between  py-2 w-full">
                <p className="font-normal w-1/2">Kode Pos</p>
                <div className="w-1/2 break-words">
                  <p className="font-bold">{users.postal_code}</p>
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

export default DetailUsers;
