import { Modal, Box, Button } from "@mui/material";
import { IoClose, IoWarningOutline } from "react-icons/io5";
import { instanceAdmin } from "../../../../utils/axiosAdmin";
import { showSnackbar } from "../../../CustomSnackbar";
import { TiWarningOutline } from "react-icons/ti";
const ModalDeleteReview = ({ open, handleClose, promoId, onUpdate }) => {
  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await instanceAdmin.delete(`/delete/review/${promoId}`);
      console.log("Respon berhasil:", res.data);

      showSnackbar("Ulasan berhasil dihapus", "success");
      handleClose();
      onUpdate();
    } catch (err) {
      // Log detail error
      console.error("Gagal menghapus Ulasan. Detail error:");

      if (err.response) {
        // Server merespon dengan status kode di luar 2xx
        console.error("Response data:", err.response.data);
        console.error("Status code:", err.response.status);
        console.error("Headers:", err.response.headers);
      } else if (err.request) {
        // Request terkirim tapi tidak ada respon
        console.error("No response received:", err.request);
      } else {
        // Error saat setup request
        console.error("Error message:", err.message);
      }

      showSnackbar("Gagal menghapus promo", "error");
    }
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
          width: { xs: "350px", sm: "500px" },
        }}
      >
        <div>
          <div
            className="bg-red-400/10"
            style={{
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            <button
              onClick={handleClose}
              className="text-2xl flex pt-4 pr-4 justify-end ml-auto"
            >
              <IoClose />
            </button>
            <div className="px-5 pb-2">
              <h2 className="text-2xl font-bold ">Hapus Ulasan</h2>
            </div>
          </div>

          <div className="px-6 mt-5 flex flex-col justify-center items-center pb-6">
            <div className="bg-red-400/20 p-2 rounded-full w-fit">
              <TiWarningOutline className="text-red-500 text-4xl" />
            </div>
            <h1 className="text-xl mt-5 font-bold">Apakah Anda yakin?</h1>
            <p className="text-center mx-14 text-sm text-graytext">
              Ulasan yang dihapus tidak dapat dipulihkan. Pastikan Anda telah
              memeriksa kembali sebelum melanjutkan.
            </p>
          </div>

          <div className="flex justify-between mt-5 px-6 pb-4">
            <button
              onClick={handleClose}
              className="bg-black px-4 py-2 rounded-md text-white hover:bg-black/80"
            >
              Batal
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-500/80"
            >
              Hapus
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalDeleteReview;
