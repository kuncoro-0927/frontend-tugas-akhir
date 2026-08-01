import { useState } from "react";
import SidebarAccount from "../../../../components/SidebarforAccount";
import StatusModal from "../../../../components/Modal/ModalStatus";
import TrackOrderModal from "../../../../components/Modal/ModalTracking";
import OrderEmptyState from "./components/OrderEmptyState";
import OrderCard from "./components/OrderCard";
import { useOrders } from "./hooks/useOrders";
import { useExpandedOrder } from "./hooks/useExpandedOrder";
import { useOrderDetailsModal } from "./hooks/useOrderDetailModal";
import { useInvoiceDownload } from "./hooks/useInvoiceDownload";

const Order = () => {
  const { orders } = useOrders();
  const { expandedOrderId, toggleExpand } = useExpandedOrder();
  const { openModal, setOpenModal, modalData, showModal } =
    useOrderDetailsModal();
  const { loadingOrderId, handleDownloadInvoice } = useInvoiceDownload();
  const [isTrackOpen, setIsTrackOpen] = useState(false);

  return (
    <section className="flex mt-16 md:mt-0 min-h-screen 2xl:mx-32">
      <StatusModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        data={modalData}
      />

      <div className="hidden sm:block md:block lg:block">
        <SidebarAccount />
      </div>

      <div className="mt-5 md:pt-8 lg:p-8 mx-7 w-full text-hitam">
        <h1 className="font-extrabold text-2xl md:text-3xl mb-5">
          Riwayat Pesanan
        </h1>

        <div className="flex items-end justify-between max-w-[800px]">
          <span className="font-bold py-2 border-b-4 border-blue-400 cursor-pointer">
            Pesanan Anda
          </span>
          <button
            onClick={() => setIsTrackOpen(true)}
            className="flex items-center gap-5 hover:border-gray-400 px-4 py-2 border border-gray-300 text-sm text-gray-600 rounded-md hover:shadow-sm transition"
          >
            <span>Lacak Pesanan</span>
            <span className="text-gray-500">+</span>
          </button>
        </div>

        <TrackOrderModal
          open={isTrackOpen}
          onClose={() => setIsTrackOpen(false)}
        />

        {orders.length === 0 ? (
          <OrderEmptyState />
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.order_id}
              order={order}
              isExpanded={expandedOrderId === order.order_id}
              onToggleExpand={() => toggleExpand(order.order_id)}
              onShowModal={showModal}
              isDownloading={loadingOrderId === order.order_id}
              onDownloadInvoice={handleDownloadInvoice}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Order;
