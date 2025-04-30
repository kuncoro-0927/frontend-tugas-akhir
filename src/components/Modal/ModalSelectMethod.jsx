import React from "react";
import { IoClose } from "react-icons/io5";
import { Modal, Box } from "@mui/material";
import { CiDeliveryTruck } from "react-icons/ci";
import { PiShippingContainerThin } from "react-icons/pi";
const ModalSelectMethod = ({ open, handleClose, onSelectMethod }) => {
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
        {" "}
        <div>
          <div
            className=" bg-blue-400/10  "
            style={{
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            <button
              onClick={handleClose}
              className="text-2xl flex p-4 justify-end ml-auto"
            >
              <IoClose />
            </button>
            <div className="px-5 pb-4 ">
              <h2 className="text-2xl font-bold text-hitam2 mb-2">
                Metode Pengiriman
              </h2>
              <p className="text-gray-600">
                Pilih metode pengiriman yang sesuai untuk menerima pesananmu.
              </p>
            </div>
          </div>
          <div className="flex justify-center mx-5 items-center pt-7">
            <button
              onClick={() => {
                onSelectMethod("delivery");
              }}
              className="border text-sm flex items-center hover:border-hitam2 duration-300 justify-between hover:border-black border-gray-400 rounded-xl px-6 py-4 w-full"
            >
              <p>
                Pengiriman ke Alamat -{" "}
                <span className="font-bold">Delivery</span>
              </p>
              <img className="w-7 h-7" src="/images/shipping.svg" alt="" />
            </button>
          </div>
          <div className="flex text-sm justify-center mx-5 items-center pb-7 mt-5">
            <button
              onClick={() => {
                onSelectMethod("pickup");
              }}
              className="border flex items-center hover:border-hitam2 duration-300 justify-between hover:border-black border-gray-400 rounded-xl px-6 py-4 w-full"
            >
              <p>
                {" "}
                Pengambilan di Toko - <span className="font-bold">Pick Up</span>
              </p>
              <img className="w-7 h-7" src="/images/ongkir.svg" alt="" />
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalSelectMethod;
