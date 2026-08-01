import { HiEye } from "react-icons/hi";
import { getOrderStatus } from "../utils/orderStatus";

const StatusBadge = ({ status, onClick, className = "" }) => {
  const { label, colorClass } = getOrderStatus(status);

  return (
    <div className={`font-bold space-y-1 text-sm ${colorClass} ${className}`}>
      <p className="font-semibold text-black">Status</p>
      <button
        onClick={onClick}
        className="flex items-center gap-1 hover:underline hover:text-blue-600 transition"
        title="Lihat status pengiriman"
      >
        {label}
        <HiEye className="inline-block text-lg text-gray-950/50" />
      </button>
    </div>
  );
};

export default StatusBadge;