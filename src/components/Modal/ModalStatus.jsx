import { Modal, Box, Typography, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { IoClose } from "react-icons/io5";
import { ImPriceTags } from "react-icons/im";
import TimelinePengiriman from "../Timeline";
const StatusModal = ({ open, onClose, data }) => {
  const {
    status,
    totalAmount,
    orderDate,
    courierService,
    trackingNumber,
    estimation,
  } = data || {};

  const statusColors = {
    paid: { text: "#16a34a", bg: "#dcfce7" }, // hijau
    shipped: { text: "#2563eb", bg: "#dbeafe" }, // biru
    completed: { text: "#0e9f6e", bg: "#def7ec" }, // hijau muda
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 5,
          width: { xs: "350px", sm: "450px" },
          maxWidth: "100%",
          height: { md: "130vh" },
          maxHeight: "90vh",
        }}
      >
        <div
          className=" bg-blue-400/10  "
          style={{
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
        >
          <button
            onClick={onClose}
            className="text-2xl flex px-4 pt-4 pb-1 justify-end ml-auto"
          >
            <IoClose />
          </button>
          <div className="px-5 pb-2">
            <h2 className="text-2xl font-bold text-hitam2 mb-2">
              Status Pengiriman
            </h2>
          </div>
        </div>
        <div className="flex items-center px-5 py-2 space-x-3">
          <div className="p-3 flex bg-gray-200/40 rounded-full w-fit">
            {" "}
            <ImPriceTags className="text-blue-500 text-2xl" />
          </div>
          <div>
            <span className="text-xs text-gray-950/50">Total harga</span>
            <p className="text-base font-semibold">
              IDR {Number(totalAmount).toLocaleString("id-ID")}
            </p>
          </div>
        </div>
        <div className="border-b mx-5"></div>
        <div className="px-5 pt-5 text-xs flex justify-between">
          <span className="text-gray-950/50 text-xs">Status</span>{" "}
          <span
            style={{
              color: statusColors[status]?.text,
              backgroundColor: statusColors[status]?.bg,
              padding: "2px 8px",
              borderRadius: "5px",
              fontWeight: "normal",
            }}
            className="text-xs"
          >
            {status}
          </span>
        </div>

        <div className="px-5 mt-2 flex justify-between ">
          <span className="text-gray-950/50 text-xs">Tanggal Pesanan</span>{" "}
          <span className="text-xs">{orderDate}</span>
        </div>

        <div className="px-5 mt-2 flex justify-between">
          <span className="text-gray-950/50 text-xs">Layanan Pengiriman</span>{" "}
          <span className="text-xs">{courierService}</span>
        </div>

        <div className="px-5 mt-2 flex justify-between">
          <span className="text-gray-950/50 text-xs">Nomor Resi</span>
          <span className="text-xs">
            {trackingNumber ? trackingNumber : "Belum tersedia"}
          </span>
        </div>

        <div className="px-5 mt-2 flex justify-between">
          <span className="text-gray-950/50 text-xs">Estimasi</span>{" "}
          <span className="text-xs">{estimation}</span>
        </div>

        <div className="border-b pt-3 mx-5"></div>

        {courierService !== "pickup" && (
          <>
            <div className="px-5 pt-4 text-xs font-medium">
              Kemajuan Pengiriman:
            </div>
            <TimelinePengiriman
              status={status}
              createdAt={orderDate}
              estimation={estimation}
            />
          </>
        )}
      </Box>
    </Modal>
  );
};

export default StatusModal;
