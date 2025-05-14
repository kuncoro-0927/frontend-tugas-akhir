import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Modal, Box, Button, Stack, TextField } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { instanceAdmin } from "../utils/axiosAdmin";
import { showSnackbar } from "./CustomSnackbar";
import { IoPrintSharp } from "react-icons/io5";
const blackTheme = createTheme({
  palette: {
    primary: {
      main: "#000000", // warna hitam
    },
  },
});
export default function ExportOrdersModal({ open, onClose }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (!startDate || !endDate) {
      showSnackbar("Pilih rentang tanggal terlebih dahulu.", "error");
      return;
    }

    const start = format(startDate, "yyyy-MM-dd");
    const end = format(endDate, "yyyy-MM-dd");

    try {
      setLoading(true);
      const res = await instanceAdmin.get(`/export?start=${start}&end=${end}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `orders-${start}_to_${end}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      onClose(); // Tutup modal setelah export
    } catch (error) {
      console.error("Gagal download:", error);
      showSnackbar("Gagal mengunduh data pesanan.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} fullWidth maxWidth="sm">
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
          width: { xs: "350px", sm: "550px" },
          maxHeight: "90vh",
          overflowY: "auto",
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome/Safari/Edge
          },
        }}
      >
        <div>
          <div
            className="bg-blue-400/10"
            style={{
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            <button
              onClick={onClose}
              className="text-2xl flex pt-4 pr-4 justify-end ml-auto"
            >
              <IoClose />
            </button>
            <div className="px-5 pb-2">
              <h2 className="text-2xl font-bold text-hitam2">Export Pesanan</h2>
            </div>
          </div>
          <div className="mx-5 mt-5 mb-7">
            <h1 className="font-bold text-lg">Export Data Pesanan</h1>
            <p className="text-sm text-graytext">
              Cetak data pesanan sesuai rentan tanggal yang Anda masukkan.
            </p>
          </div>

          <div className="flex items-center justify-between mx-5 gap-5">
            <ThemeProvider theme={blackTheme}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Dari Tanggal"
                  value={startDate}
                  onChange={(newDate) => setStartDate(newDate)}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />{" "}
              </LocalizationProvider>
            </ThemeProvider>
            <ThemeProvider theme={blackTheme}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Sampai Tanggal"
                  value={endDate}
                  onChange={(newDate) => setEndDate(newDate)}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </LocalizationProvider>
            </ThemeProvider>
          </div>

          <button
            onClick={handleExport}
            className="mx-5 my-8 py-2 px-4 rounded-md hover:bg-black/80 duration-300 bg-black text-white "
            disabled={loading}
          >
            {loading ? (
              "Memproses..."
            ) : (
              <>
                <div className="flex gap-2 items-center">
                  <IoPrintSharp className="text-md" />
                  Print
                </div>
              </>
            )}
          </button>
        </div>
      </Box>
    </Modal>
  );
}
