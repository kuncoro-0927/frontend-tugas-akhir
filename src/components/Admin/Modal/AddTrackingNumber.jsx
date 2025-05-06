import React, { useState } from "react";
import { Box, Modal, TextField, Button } from "@mui/material";
import { IoClose } from "react-icons/io5";
import FormInput from "../../TextField";
const AddResiModal = ({ orderId, onClose, onSubmit }) => {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleSubmit = () => {
    if (!trackingNumber.trim()) return alert("Nomor resi tidak boleh kosong");
    onSubmit(orderId, trackingNumber);
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
          height: { md: "35vh" },
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
            onClick={onClose}
            className="text-2xl flex px-4 pt-4 pb-1 justify-end ml-auto"
          >
            <IoClose />
          </button>
          <div className="px-5 pb-2">
            <h2 className="text-2xl font-bold text-hitam2 mb-2">
              Tambah Nomor Resi
            </h2>
          </div>
        </div>
        <div className="mx-5 mt-7">
          <div className="flex items-start gap-5">
            <div className="w-full">
              <FormInput
                label="Nomor Resi"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-black px-6 py-3 text-white rounded-md"
            >
              Simpan
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default AddResiModal;
