/* eslint-disable react-refresh/only-export-components */

import { useState, useRef, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

let showSnackbar; // Agar fungsi bisa dipanggil di luar

const CustomSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const snackbarRef = useRef(null);

  // Fungsi untuk menampilkan snackbar
  showSnackbar = (msg, type = "success") => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  useEffect(() => {
    snackbarRef.current = { showSnackbar };
  }, []);

  const getSeverityStyles = (type) => {
    switch (type) {
      case "error":
        return {
          backgroundColor: "#f8d7da",
          color: "#721c24",
          borderLeft: "8px solid #dc3545", // merah
        };
      case "info":
        return {
          backgroundColor: "#cce5ff",
          color: "#004085",
          borderLeft: "8px solid #17a2b8", // biru
        };
      case "success":
        return {
          backgroundColor: "#e6f4ea",
          color: "#1e4620",
          borderLeft: "8px solid #34a853", // hijau
        };
      case "warning":
        return {
          backgroundColor: "#fff3cd",
          color: "#856404",
          borderLeft: "8px solid #ffc107", // kuning
        };
      default:
        return {
          backgroundColor: "#e6f4ea",
          color: "#1e4620",
          borderLeft: "8px solid #34a853", // default hijau
        };
    }
  };

  const styles = getSeverityStyles(severity);

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} // Pusat atas seperti di screenshot
    >
      <Alert
        icon={<CheckCircleIcon fontSize="inherit" />}
        onClose={handleClose}
        severity={severity}
        sx={{
          ...styles,
          boxShadow: "none",
          pl: 2,
          border: "none", // Pastikan border utama dihilangkan agar garis kiri bisa terlihat
          fontWeight: 500,
          width: "100%",
          display: "flex",
          alignItems: "center",
          "& .MuiAlert-icon": {
            color: styles.borderLeft, // Icon sewarna garis
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export { CustomSnackbar, showSnackbar };
