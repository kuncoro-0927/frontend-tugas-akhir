import { useEffect, useState } from "react";
import SidebarAccount from "../../components/SidebarforAccount";
import { instance } from "../../utils/axios";
import { CiCalendar } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import CardImage from "../../components/Card/CardImage";
import { FiDownload } from "react-icons/fi";
import StatusModal from "../../components/Modal/ModalStatus";
import { HiEye } from "react-icons/hi";
import FormInput from "../../components/TextField";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import TrackOrderModal from "../../components/Modal/ModalTracking";
const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrderId, setLoadingOrderId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("delivery");
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };
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
    <section className="flex mt-16 md:mt-0 min-h-screen 2xl:mx-32">
      <StatusModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        data={modalData}
      />
      <div className="hidden sm:block md:block lg:block ">
        <SidebarAccount />
      </div>
      <div className="mt-5 md:pt-8 lg:p-8 mx-7 w-full text-hitam">
        <h1 className="font-extrabold text-2xl md:text-3xl mb-5">
          Riwayat Pesanan
        </h1>
        <div className="flex items-end justify-between max-w-[800px]">
          <div className="flex items-center justify-between gap-10">
            <span
              className={`font-bold py-2 border-b-4 cursor-pointer ${
                activeTab === "delivery"
                  ? "border-blue-400"
                  : "border-transparent font-normal text-graytext"
              }`}
              onClick={() => setActiveTab("delivery")}
            >
              Pesanan Anda
            </span>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-5 hover:border-gray-400 px-4 py-2 border border-gray-300 text-sm text-gray-600 rounded-md hover:shadow-sm transition"
          >
            <span>Lacak Pesanan</span>
            <span className="text-gray-500">+</span>
          </button>
        </div>

        <TrackOrderModal open={open} onClose={() => setOpen(false)} />
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
              <div className="border  border-gray-200 w-full rounded-lg">
                {/* Header Order: ID, Status, Invoice Button */}
                <div className="border-b p-4">
                  <div className="flex  justify-between items-start md:items-center">
                    <div className="flex w-full lg:w-auto lg:gap-2 flex-col lg:flex-row md:items-center">
                      <div
                        className="text-sm hidden lg:flex lg:flex-col  space-y-1 cursor-pointer"
                        onClick={toggleDetails}
                      >
                        <p className="font-semibold">ID Pesanan</p>
                        <p className="text-gray-950/50 text-xs">
                          {order.order_code}
                        </p>
                      </div>
                      <div
                        className="text-sm lg:hidden flex gap-2 items-center lg:items-start w-full justify-between space-y-1 cursor-pointer"
                        onClick={toggleDetails}
                      >
                        <div>
                          <p className="font-semibold">ID Pesanan</p>
                          <p className="text-gray-950/50 text-xs">
                            {order.order_code}
                          </p>
                        </div>
                        <div>
                          {/* Ganti ikon berdasarkan kondisi isExpanded */}
                          {isExpanded ? (
                            <IoIosArrowUp className="text-base" />
                          ) : (
                            <IoIosArrowDown className="text-base" />
                          )}
                        </div>
                      </div>

                      {/* Detail hanya tampil di desktop */}
                      <div className="ml-4 hidden lg:block space-y-1">
                        <p className="font-semibold text-sm">Tanggal Pesanan</p>
                        <p className="text-gray-950/50 text-xs">
                          {formatDate(order.created_at)}
                        </p>
                      </div>

                      <div className="ml-4 hidden lg:block space-y-1">
                        <p className="font-semibold text-sm">
                          Total{" "}
                          <span className="text-xs font-normal">
                            (incl. biaya)
                          </span>
                        </p>
                        <p className="text-gray-950/50 text-xs font-semibold">
                          IDR{" "}
                          {Number(order.total_amount).toLocaleString("id-ID")}
                        </p>
                      </div>

                      <div
                        className={`ml-4 hidden lg:block font-bold space-y-1 text-sm ${
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
                        <p className="font-semibold text-sm text-black">
                          Status
                        </p>
                        <button
                          onClick={() => showModal(order)}
                          className="flex items-center gap-1 hover:underline hover:text-blue-600 transition"
                          title="Lihat status pengiriman"
                        >
                          {order.status === "paid" && "Sedang Dikemas"}
                          {order.status === "processed" && "Sedang Dikemas"}
                          {order.status === "shipped" && "Sedang Dikirim"}
                          {order.status === "completed" && "Pesanan Diterima"}
                          {order.status === "cancelled" && "Pesanan Dibatalkan"}
                          <HiEye className="inline-block text-lg text-gray-950/50" />
                        </button>
                      </div>
                    </div>

                    {/* Tombol Cetak Invoice */}
                    <button
                      onClick={() => handleDownloadInvoice(order.order_id)}
                      disabled={loadingOrderId === order.order_id}
                      className=" hidden lg:block items-center border border-gray-400 rounded-md px-3 py-2 hover:border-black hover:-translate-y-1 duration-300"
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

                  {/* Detail expand di mobile */}
                  {isExpanded && (
                    <div className="mt-4 space-y-3 lg:hidden text-sm border-t pt-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold">Tanggal Pesanan</p>
                          <p className="text-gray-950/50 text-xs">
                            {formatDate(order.created_at)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDownloadInvoice(order.order_id)}
                          disabled={loadingOrderId === order.order_id}
                          className=" lg:mt-0 flex items-center border border-gray-400 rounded-md px-3 py-2 hover:border-black hover:-translate-y-1 duration-300"
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
                      <div>
                        <p className="font-semibold">
                          Total{" "}
                          <span className="text-xs font-normal">
                            (incl. biaya)
                          </span>
                        </p>
                        <p className="text-gray-950/50 text-xs font-semibold">
                          IDR{" "}
                          {Number(order.total_amount).toLocaleString("id-ID")}
                        </p>
                      </div>
                      <div
                        className={` lg:hidden font-bold space-y-1 text-sm ${
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
                          {order.status === "paid" && "Sedang Dikemas"}
                          {order.status === "processed" && "Sedang Dikemas"}
                          {order.status === "shipped" && "Sedang Dikirim"}
                          {order.status === "completed" && "Pesanan Diterima"}
                          {order.status === "cancelled" && "Pesanan Dibatalkan"}
                          <HiEye className="inline-block text-lg text-gray-950/50" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                {/* Item List */}
                {order.items.map((ticket, i) => (
                  <div
                    key={`${order.order_id}-${i}`}
                    className="lg:flex border-b p-5 last:border-none"
                  >
                    <div className="flex items-center justify-start w-full">
                      <div className="lg:h-[150px] hidden p-2 md:w-[120px] h-[120px] lg:w-[150px] overflow-hidden md:flex items-center justify-center">
                        <CardImage
                          image={`${import.meta.env.VITE_BACKEND_URL}${
                            ticket.image_url
                          }`}
                          isCustom={ticket.is_custom}
                        />
                      </div>
                      {/* mobile */}
                      <div className="flex md:hidden items-center gap-x-4">
                        <div className=" h-[120px] w-[120px]">
                          <CardImage
                            image={`${import.meta.env.VITE_BACKEND_URL}${
                              ticket.image_url
                            }`}
                            isCustom={ticket.is_custom}
                          />
                        </div>
                        <div>
                          <h1 className="font-bold text-xs text-black/60">
                            {" "}
                            {ticket.category_name}
                          </h1>
                          <h1 className="font-bold  w-fit max-w-[100px] text-sm ">
                            {ticket.quantity} x {ticket.product_name}{" "}
                          </h1>
                          <p className="text-xs  flex items-center">
                            <span className="mr-1">
                              {" "}
                              {ticket.is_custom
                                ? `${ticket.custom_width} x ${ticket.custom_height}`
                                : `${ticket.width} x ${ticket.height}`}
                            </span>{" "}
                          </p>

                          <div className="mt-2">
                            <Link
                              to={`/product/detail/${ticket.product_id}`}
                              className="bg-black rounded-md text-white px-3 py-1.5 text-xs hover:bg-gray-800"
                            >
                              Pesan Lagi
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* desktop */}
                      <div className="pl-4 max-w-[350px] hidden md:flex flex-col">
                        <span className="font-bold text-black/60 text-xs">
                          {ticket.category_name}
                        </span>
                        <h1 className="font-bold text-base md:max-w-[170px] lg:max-w-max lg:text-lg ">
                          {ticket.product_name}{" "}
                        </h1>
                        <p className="text-sm mt-4 flex items-center">
                          <span className="mr-1">
                            {ticket.is_custom
                              ? `${ticket.custom_width} x ${ticket.custom_height}`
                              : `${ticket.width} x ${ticket.height}`}
                          </span>
                        </p>

                        <p className="text-sm mt-1 flex items-center">
                          <span className="mr-1">Jumlah item:</span>{" "}
                          <span>{ticket.quantity}</span>
                        </p>
                      </div>
                      <div className="ml-auto hidden  md:flex md:flex-col md:gap-y-10  justify-between items-end h-full">
                        <div className="text-base font-bold">
                          IDR {Number(ticket.price).toLocaleString("id-ID")}
                        </div>
                        <Link
                          to={`/product/detail/${ticket.product_id}`}
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
