import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material/styles";
import { matchPath, useLocation } from "react-router-dom";
// Menyesuaikan warna Stepper dengan custom styles
const CustomStepper = styled(Stepper)(() => ({
  "& .MuiStepIcon-root.Mui-active": {
    color: "#76a9fa", // Warna aktif (misalnya oranye)
  },
  "& .MuiStepIcon-root.Mui-completed": {
    color: "#76a9fa", // Warna completed (misalnya hijau)
  },
  "& .MuiStepIcon-root": {
    color: "#bdbdbd", // Warna default untuk langkah lainnya
  },
}));

const steps = ["Keranjang", "Pengisian form", "Pengiriman", "Pembayaran"];

const getActiveStep = (path) => {
  // Menangani URL dengan parameter dinamis
  if (matchPath("/shipping/form/:orderId", path)) {
    return 1; // Halaman Form
  }
  if (matchPath("/checkouts/payment/:orderId", path)) {
    return 2; // Halaman Pengiriman
  }
  if (path.includes("/payment")) {
    return 3; // Halaman Pembayaran
  }
  return 0; // Default ke Keranjang
};

export default function CheckoutStepper() {
  const location = useLocation(); // Mengambil lokasi halaman dari React Router
  const activeStep = getActiveStep(location.pathname); // Menentukan activeStep berdasarkan path

  return (
    <Box>
      <CustomStepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </CustomStepper>
    </Box>
  );
}
