import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { instance } from "../../utils/axios";
import { resetCart } from "../../redux/cartSlice";

const STATUS_CONTENT = {
  settlement: {
    illustration: "/images/welldone.svg",
    icon: "/images/check.svg",
    title: "Pembayaran Anda berhasil!",
    description: "Pembayaran Anda telah berhasil. Terima kasih atas kepercayaan Anda!",
  },
  failed: {
    illustration: "/images/error.svg",
    icon: "/images/erroricon.svg",
    title: "Pembayaran Gagal!",
    description:
      "Pembayaran Anda gagal. Silakan coba lagi atau hubungi dukungan kami untuk bantuan.",
  },
  pending: {
    illustration: "/images/pending.svg",
    icon: "/images/clock.svg",
    title: "Pembayaran Menunggu Konfirmasi",
    description: (
      <>
        Mohon selesaikan pembayaran Anda agar kami dapat <br /> memproses pesanan Anda lebih lanjut.
      </>
    ),
  },
  cod: {
    illustration: "/images/welldone.svg",
    icon: "/images/check.svg",
    title: "Pesanan Anda berhasil!",
    description: "Silakan ambil pesanan Anda di toko dan lakukan pembayaran di tempat.",
  },
};

function usePaymentStatus(orderId) {
  const dispatch = useDispatch();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await instance.get(`/payment/status/${orderId}`);
        const status = response.data.status.transaction_status;
        setPaymentStatus(status);

        if (status === "settlement") {
          dispatch(resetCart());
        }
      } catch (error) {
        console.error("Error fetching payment status:", error);
        setPaymentStatus("failed");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [orderId, dispatch]);

  return { paymentStatus, loading };
}

const PaymentStatus = () => {
  const { order_id } = useParams();
  const { paymentStatus, loading } = usePaymentStatus(order_id);

  if (loading) {
    return (
      <section className="mx-14 flex justify-center items-center min-h-screen">
        <p>Memeriksa status pembayaran...</p>
      </section>
    );
  }

  const content = STATUS_CONTENT[paymentStatus];

  return (
    <section className="mx-14 mt-14 md:mt-0 flex justify-center items-center min-h-screen">
      <div className="text-center">
        {content ? (
          <>
            <img className="md:w-[300px] w-[250px] mx-auto" src={content.illustration} alt="" />
            <img className="w-12 mt-6 mx-auto" src={content.icon} alt="" />
            <h1 className="mt-5 text-2xl md:text-3xl font-extrabold">{content.title}</h1>
            <p className="mt-4 mb-7 text-sm md:text-lg text-gray-600">{content.description}</p>
          </>
        ) : (
          <p className="text-sm md:text-lg text-gray-600">
            Terjadi kesalahan, status pembayaran tidak ditemukan.
          </p>
        )}

        <Link
          className="bg-black py-3 px-4 text-sm md:text-base rounded-lg text-white hover:bg-black/80 hover:-translate-y-1 duration-200"
          to="/"
        >
          Kembali ke beranda
        </Link>
      </div>
    </section>
  );
};

export default PaymentStatus;