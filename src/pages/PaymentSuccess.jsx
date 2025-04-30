import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { instance } from "../utils/axios";
const PaymentStatus = () => {
  const { order_id } = useParams();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function untuk fetch status pembayaran menggunakan axios
    const fetchPaymentStatus = async () => {
      try {
        const response = await instance.get(`/payment/status/${order_id}`);
        setPaymentStatus(response.data.status.transaction_status);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment status:", error);
        setPaymentStatus("failed");
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [order_id]);

  if (loading) {
    return (
      <section className="mx-14 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p>Memeriksa status pembayaran...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-14 flex justify-center items-center min-h-screen">
      <div className="text-center">
        {paymentStatus === "settlement" ? (
          <>
            <img
              className="w-[300px] mx-auto"
              src="/images/welldone.svg"
              alt=""
            />
            <img className="w-12 mt-6 mx-auto" src="/images/check.svg" alt="" />
            <h1 className="mt-5 text-3xl font-extrabold">
              Pembayaran Anda berhasil!
            </h1>
            <p className="mt-4 mb-7 text-lg text-gray-600">
              Pembayaran Anda telah berhasil. Terima kasih atas kepercayaan
              Anda!
            </p>
          </>
        ) : paymentStatus === "failed" ? (
          <>
            <img className="w-[300px] mx-auto" src="/images/error.svg" alt="" />
            <img
              className="w-12 mt-6 mx-auto"
              src="/images/erroricon.svg"
              alt=""
            />
            <h1 className="mt-5 text-3xl font-extrabold">Pembayaran Gagal!</h1>
            <p className="mt-4 mb-7 text-lg text-gray-600">
              Pembayaran Anda gagal. Silakan coba lagi atau hubungi dukungan
              kami untuk bantuan.
            </p>
          </>
        ) : paymentStatus === "pending" ? (
          <>
            <img
              className="w-[300px] mx-auto"
              src="/images/pending.svg"
              alt=""
            />
            <img className="w-12 mt-6 mx-auto" src="/images/clock.svg" alt="" />
            <h1 className="mt-5 text-3xl font-extrabold">
              Pembayaran Menunggu Konfirmasi
            </h1>
            <p className="mt-4 mb-7 text-lg text-gray-600">
              Mohon selesaikan pembayaran Anda agar kami dapat <br /> memproses
              pesanan Anda lebih lanjut.
            </p>
          </>
        ) : (
          <p className="text-lg text-gray-600">
            Terjadi kesalahan, status pembayaran tidak ditemukan.
          </p>
        )}

        <Link
          className="bg-black py-3 px-4 rounded-lg text-white hover:bg-black/80 hover:-translate-y-1 duration-200"
          to="/"
        >
          Kembali ke beranda
        </Link>
      </div>
    </section>
  );
};

export default PaymentStatus;
