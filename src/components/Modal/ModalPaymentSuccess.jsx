import { Modal, Box } from "@mui/material";

const PaymentSuccessModal = ({ open, onClose, onViewSummary }) => {
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
          width: { xs: "300px", sm: "400px" },
          maxWidth: "100%",
          padding: 4,
          textAlign: "center",
        }}
      >
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2">Pembayaran Berhasil!</h2>
          <p className="text-gray-600 mb-6">
            Terima kasih, pembayaran Anda sudah berhasil.
          </p>
          <button
            onClick={onViewSummary}
            className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
          >
            Lihat Ringkasan Pesanan
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default PaymentSuccessModal;
