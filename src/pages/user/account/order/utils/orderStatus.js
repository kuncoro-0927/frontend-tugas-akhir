export const ORDER_STATUS_CONFIG = {
  paid: { label: "Sedang Dikemas", colorClass: "text-green-500" },
  processed: { label: "Sedang Dikemas", colorClass: "text-orange-500" },
  shipped: { label: "Sedang Dikirim", colorClass: "text-blue-500" },
  completed: { label: "Pesanan Diterima", colorClass: "text-green-600" },
  cancelled: { label: "Pesanan Dibatalkan", colorClass: "text-red-500" },
};

export const getOrderStatus = (status) =>
  ORDER_STATUS_CONFIG[status] || { label: status, colorClass: "text-gray-600" };
