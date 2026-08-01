export const formatCurrency = (amount) =>
  `IDR ${Number(amount).toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const FAILED_STATUSES = ["cancel", "deny", "failure", "failed"];

export const getStatusBadgeClass = (status) => {
  if (status === "success") return "bg-green-100 text-green-800";
  if (status === "pending") return "bg-orange-100 text-orange-800";
  if (FAILED_STATUSES.includes(status)) return "bg-red-100 text-red-800";
  if (status === "expire") return "bg-gray-100 text-gray-800";
  return "bg-gray-100 text-gray-800";
};
