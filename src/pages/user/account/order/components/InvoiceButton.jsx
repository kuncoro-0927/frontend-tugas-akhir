import CircularProgress from "@mui/material/CircularProgress";
import { FiDownload } from "react-icons/fi";

const InvoiceButton = ({ isLoading, onClick, className = "" }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className={`flex items-center border border-gray-400 rounded-md px-3 py-2 hover:border-black hover:-translate-y-1 duration-300 ${className}`}
  >
    {isLoading ? (
      <CircularProgress size={15} color="inherit" />
    ) : (
      <span className="flex items-center text-sm font-medium">
        Cetak Invoice <FiDownload className="ml-2" />
      </span>
    )}
  </button>
);

export default InvoiceButton;