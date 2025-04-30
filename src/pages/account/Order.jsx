import { useEffect, useState } from "react";
import SidebarAccount from "../../components/SidebarforAccount";
import { instance } from "../../utils/axios";
import { CiCalendar } from "react-icons/ci";
import { IoTicketOutline } from "react-icons/io5";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import CardImage from "../../components/Card/CardImage";
import { FiDownload } from "react-icons/fi";
import StatusModal from "../../components/Modal/ModalStatus";
import { HiEye } from "react-icons/hi";
const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrderId, setLoadingOrderId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const showModal = (order) => {
    setModalData({
      totalAmount: order.total_amount,
      status: order.status,
      orderDate: formatDate(order.created_at),
      courierService: order.shipping.courier,
      estimation: order.shipping.etd || "Tidak tersedia",
      steps: [
        { label: "Pesanan Dibayar", completed: order.status !== "unpaid" },
        {
          label: "Sedang Dikemas",
          completed:
            order.status === "processed" ||
            order.status === "shipped" ||
            order.status === "completed",
        },
        {
          label: "Sedang Dikirim",
          completed: order.status === "shipped" || order.status === "delivered",
        },
        { label: "Pesanan Diterima", completed: order.status === "delivered" },
      ],
    });
    setOpenModal(true);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await instance.get("/orders/user/full");
        setOrders(res.data);
      } catch (err) {
        console.error("Gagal mengambil pesanan:", err);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  const handleDownloadInvoice = async (orderId) => {
    setLoadingOrderId(orderId);
    try {
      const res = await instance.get(`/invoice/${orderId}`);
      const invoiceUrl = res.data.invoiceUrl;
      window.open(`http://localhost:5000${invoiceUrl}`, "_blank");
    } catch (err) {
      console.error("Gagal mengambil invoice:", err);
      alert("Gagal mengunduh invoice.");
    } finally {
      setLoadingOrderId(null);
    }
  };

  return (
    <section className="flex 2xl:mx-32">
      <StatusModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        data={modalData}
      />
      <div className="hidden sm:block md:block lg:block">
        <SidebarAccount />
      </div>

      <div className="mt-5 md:p-8 mx-4 w-full text-hitam">
        <h1 className="font-extrabold text-2xl md:text-3xl mb-5">
          Riwayat Pesanan
        </h1>
        <span className="font-bold border-b-4 py-2 border-blue-400">
          Pesanan Anda
        </span>

        {orders.length === 0 ? (
          <div className="mt-10 w-full flex flex-col items-center">
            <p className="text-hitam text-xl lg:text-2xl font-extrabold">
              Anda belum memiliki pesanan
            </p>
            <img
              className="w-64 mt-7"
              src="/images/noproduct.svg"
              alt="Agenda"
            />
            <p className="text-center mt-5 font-medium">
              Yuk, mulai perjalanan belanjamu!
              <br /> Temukan produk menarik di toko kami
            </p>
            <Link
              to="/product"
              className="bg-black text-sm text-white px-6 mt-10 py-1.5 hover:bg-black/80 hover:-translate-y-1 duration-500 rounded-md"
            >
              Eksplor
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.order_id}
              className="ticket-card max-w-[800px] mb-8 mt-10"
            >
              <div className="border shadow-md border-gray-200 w-full rounded-lg">
                {/* Header Order: ID, Status, Invoice Button */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b">
                  <div className="flex">
                    <div className="text-sm space-y-1 grid ">
                      <p className="font-semibold">ID Pesanan</p>{" "}
                      <p className="text-gray-950/50 text-xs">
                        {" "}
                        {order.order_code}
                      </p>
                    </div>
                    <div className="ml-4 space-y-1">
                      {" "}
                      <p className="font-semibold">Tanggal Pesanan</p>{" "}
                      <p className="text-gray-950/50 text-xs">
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                    <div className="ml-4 space-y-1">
                      {" "}
                      <p className="font-semibold">
                        Total{" "}
                        <span className="text-xs font-normal">
                          (incl. biaya)
                        </span>
                      </p>{" "}
                      <p className="text-gray-950/50 text-xs font-semibold">
                        IDR {Number(order.total_amount).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div
                      className={`font-bold space-y-1 ml-4 text-sm ${
                        order.status === "paid"
                          ? "text-green-500"
                          : order.status === "processed"
                          ? "text-orange-500"
                          : order.status === "shipped"
                          ? "text-blue-500"
                          : order.status === "completed"
                          ? "text-green-600"
                          : order.status === "cancelled"
                          ? "text-red-500"
                          : "text-gray-600"
                      }`}
                    >
                      <p className="font-semibold text-black">Status</p>
                      <button
                        onClick={() => showModal(order)}
                        className="flex items-center gap-1 hover:underline hover:text-blue-600 transition"
                        title="Lihat status pengiriman"
                      >
                        {/* Teks status */}
                        {order.status === "paid" && "Lunas"}
                        {order.status === "processed" && "Sedang Dikemas"}
                        {order.status === "shipped" && "Sedang Dikirim"}
                        {order.status === "completed" && "Pesanan Diterima"}
                        {order.status === "cancelled" && "Pesanan Dibatalkan"}

                        {/* Icon */}
                        <HiEye className="inline-block text-lg text-gray-950/50" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownloadInvoice(order.order_id)}
                    disabled={loadingOrderId === order.order_id}
                    className="mt-2 md:mt-0 flex items-center border border-gray-400 rounded-md px-3 py-2 hover:border-black hover:-translate-y-1 duration-300"
                  >
                    {loadingOrderId === order.order_id ? (
                      <CircularProgress size={15} color="inherit" />
                    ) : (
                      <span className="flex items-center text-sm font-medium">
                        Cetak Invoice <FiDownload className="ml-2" />
                      </span>
                    )}
                  </button>
                </div>

                {/* Item List */}
                {order.items.map((ticket, i) => (
                  <div
                    key={`${order.order_id}-${i}`}
                    className="lg:flex border-b p-5 last:border-none"
                  >
                    <div className="flex items-start justify-start w-full">
                      <div className="lg:h-[150px] h-[120px] lg:w-[150px] overflow-hidden flex items-center justify-center">
                        <CardImage
                          image={`${import.meta.env.VITE_BACKEND_URL}${
                            ticket.image_url
                          }`}
                        />
                      </div>

                      <div className="pl-4 max-w-[350px]  flex flex-col">
                        <h1 className="font-bold text-lg ">
                          {ticket.product_name}{" "}
                          <span className="font-normal">-</span>{" "}
                          <span className="font-normal text-sm">
                            {ticket.category_name}
                          </span>
                        </h1>
                        <p className="text-sm mt-4 flex items-center">
                          <span className="mr-1"> {ticket.size}</span>{" "}
                        </p>
                        <p className="text-sm mt-1 flex items-center">
                          <span className="mr-1">Jumlah item:</span>{" "}
                          <span>{ticket.quantity}</span>
                        </p>
                        <p className="mt-1 text-sm flex items-center">
                          <CiCalendar className="text-lg mr-1" />
                          <span className="mr-1">Tanggal Pesanan:</span>{" "}
                          <span>{formatDate(order.created_at)}</span>
                        </p>
                      </div>
                      <div className="ml-auto flex flex-col justify-between items-end h-full">
                        <div className="text-base font-bold">
                          IDR {Number(ticket.price).toLocaleString("id-ID")}
                        </div>
                        <Link
                          to={`/product/details/${ticket.product_id}`}
                          className="bg-black rounded-md text-white px-3 py-1.5 text-sm hover:bg-gray-800"
                        >
                          Pesan Lagi
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Order;
