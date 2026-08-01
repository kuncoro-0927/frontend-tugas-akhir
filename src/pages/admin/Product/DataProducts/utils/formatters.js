export const formatCurrency = (amount) =>
  `IDR ${Number(amount).toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const isAvailable = (status) =>
  status?.toLowerCase().trim() === "available";
