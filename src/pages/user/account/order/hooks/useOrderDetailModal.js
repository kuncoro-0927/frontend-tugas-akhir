import { useState } from "react";
import { formatDate } from "../utils/formatDate";

export function useOrderDetailsModal() {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const showModal = (order) => {
    setModalData({
      totalAmount: order.total_amount,
      status: order.status,
      trackingNumber: order.tracking_number,
      orderDate: formatDate(order.created_at),
      courierService: order.shipping.courier,
      estimation: order.shipping.etd || "Tidak tersedia",
      steps: [
        { label: "Pesanan Dibayar", completed: order.status !== "unpaid" },
        {
          label: "Sedang Dikemas",
          completed: ["processed", "shipped", "completed"].includes(
            order.status,
          ),
        },
        {
          label: "Sedang Dikirim",
          completed: ["shipped", "delivered"].includes(order.status),
        },
        { label: "Pesanan Diterima", completed: order.status === "delivered" },
      ],
    });
    setOpenModal(true);
  };

  return { openModal, setOpenModal, modalData, showModal };
}
