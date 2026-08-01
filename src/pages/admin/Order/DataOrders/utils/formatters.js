export const getInitials = (firstName, lastName) => {
  if (!firstName && !lastName) return "NN";
  const first = firstName?.[0] || "";
  const last = lastName?.[0] || "";
  return (first + last).toUpperCase();
};

// Fungsi hash sederhana untuk warna dari string unik
export const getColorFromString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 60%)`; // warna pastel-ish
};

export const formatCurrency = (amount) =>
  `IDR ${Number(amount).toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const STATUS_STYLES = {
  pending: "text-orange-500 font-bold bg-orange-100",
  paid: "text-green-500 font-bold bg-green-100",
  shipped: "text-blue-500 font-bold bg-blue-100",
  completed: "text-yellow-500 font-bold bg-yellow-100",
};
