import React from "react";
import ModalLogin from "./Login";
import ModalRegister from "./Register";
import ModalVerifyEmail from "./VerifyEmail";
import { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
const AuthModal = ({ open, handleClose, initialContent }) => {
  const [activeContent, setActiveContent] = useState(initialContent); // Menggunakan initialContent sebagai konten awal
  const [otpToken, setOtpToken] = useState(null);
  useEffect(() => {
    if (open) {
      // Setel ulang konten modal ke initialContent setiap kali modal dibuka
      setActiveContent(initialContent);
    }
  }, [open, initialContent]);

  const handleSwitch = (content, token = null) => {
    if (token) {
      setOtpToken(token); // Set otpToken ketika menerima dari Register
    }
    setActiveContent(content);
  };

  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") handleClose();
      }}
    >
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
          maxHeight: "90vh",
        }}
      >
        {activeContent === "login" && (
          <ModalLogin handleSwitch={handleSwitch} handleClose={handleClose} />
        )}
        {activeContent === "register" && (
          <ModalRegister
            handleSwitch={handleSwitch}
            handleClose={handleClose}
          />
        )}
        {activeContent === "verifyemail" && (
          <ModalVerifyEmail
            otpToken={otpToken}
            handleSwitch={handleSwitch}
            handleClose={handleClose}
          />
        )}
      </Box>
    </Modal>
  );
};

export default AuthModal;
