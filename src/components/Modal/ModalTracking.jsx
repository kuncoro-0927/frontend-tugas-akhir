import { useState } from "react";
import { instance } from "../../utils/axios";
import { Modal, Box } from "@mui/material";
import { IoClose } from "react-icons/io5";
import FormInput from "../TextField";

const TrackOrderModal = ({ open, onClose }) => {
  const [orderCode, setOrderCode] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [statusData, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log("Order Status: ", statusData);
  const handleTrack = async () => {
    if (!orderCode) return;

    setLoading(true);
    setError("");
    setTrackingData(null);

    try {
      const res = await instance.post("/track/waybill", {
        order_code: orderCode,
      });
      setTrackingData(res.data.tracking_data);
      setOrderStatus(res.data.order_status);

      console.log("Order Status: ", statusData);
    } catch {
      setError("Gagal melacak pesanan. Pastikan kode benar.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOrderCode("");
    setTrackingData(null);
    setError("");
    onClose();
  };

  return (
    <Modal open={open}>
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
          paddingBottom: 3,
          overflowY: "auto",
          height: { md: "130vh" },
          maxHeight: "90vh",
          // hide scrollbar
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome/Safari/Edge
          },
        }}
      >
        <div
          className="bg-blue-400/10"
          style={{
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
        >
          <button
            onClick={handleClose}
            className="text-2xl flex px-4 pt-4 pb-1 justify-end ml-auto"
          >
            <IoClose />
          </button>
          <div className="px-5 pb-2">
            <h2 className="text-2xl font-bold text-hitam2 mb-2">
              Lacak Pengiriman
            </h2>
          </div>
        </div>
        <div className="mx-5 mt-5">
          <div className="flex items-start gap-5">
            <div className="w-full">
              <FormInput
                label="ID Pesanan"
                helperText="Masukkan ID pesanan Anda"
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value)}
              />
            </div>
            <button
              onClick={handleTrack}
              className="bg-black px-6 py-3 text-white rounded-md"
              disabled={loading}
            >
              {loading ? "Melacak..." : "Lacak"}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {!trackingData && statusData === "paid" ? (
            <div className="mt-10">
              <img
                src="/images/packed.svg"
                alt="Pesanan Dikemas"
                className="w-60 h-auto mx-auto"
              />
              <p className="text-center mt-5 text-sm text-gray-600">
                Pesanan sudah dibayar dan sedang dikemas.
              </p>
            </div>
          ) : !trackingData && !loading ? (
            <div className="flex justify-center mt-10">
              <img
                src="/images/trackingmodal.svg"
                alt="Ilustrasi Lacak Pengiriman"
                className="w-60 h-auto"
              />
            </div>
          ) : null}

          {trackingData && (
            <div className="mt-7 space-y-2">
              <div className="flex items-center gap-4 my-4">
                <span className="text-sm font-semibold text-gray-500">
                  Ringkasan Pesanan
                </span>
              </div>
              <div className="text-sm space-y-1">
                <p className="flex items-center justify-between">
                  <span>Status</span> <span>{trackingData.summary.status}</span>
                </p>

                <p className="flex items-center justify-between">
                  <span>Kurir</span>{" "}
                  <span>{trackingData.summary.courier_name}</span>
                </p>

                <p className="flex items-center justify-between">
                  <span>No Resi</span>
                  <span> {trackingData.summary.waybill_number}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Pengirim</span>
                  <span>{trackingData.summary.shipper_name}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Penerima</span>{" "}
                  <span> {trackingData.summary.receiver_name}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Asal</span> <span>{trackingData.summary.origin}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Tujuan</span>{" "}
                  <span>{trackingData.summary.destination}</span>
                </p>
              </div>
              <div className="flex pt-5 items-center gap-4 my-4">
                <span className="text-sm font-semibold text-gray-500">
                  Riwayat Pengiriman
                </span>
              </div>
              <div className="container w-full py-3 ">
                <div className="grid w-full gap-4  ">
                  <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
                    <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-gray-200">
                      {trackingData.manifest.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-primary"
                        >
                          <h1 className="text-xs font-semibold tracking-wide">
                            {item.manifest_date} {item.manifest_time}
                          </h1>
                          <h1 className="text-xs w-full tracking-wide uppercase dark:text-gray-600">
                            {item.manifest_description}
                          </h1>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default TrackOrderModal;
