import { useState } from "react";
import { Modal, Box, TextField, Rating, useTheme } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { instance } from "../../utils/axios";
import { showSnackbar } from "../CustomSnackbar";
import CircularProgress from "@mui/material/CircularProgress";
import { CustomSnackbar } from "../CustomSnackbar";

const MAX_REVIEW_LENGTH = 500; // Maksimum 300 karakter

const ModalReview = ({ open, handleClose, productId }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleReviewSubmit = async () => {
    if (!reviewText.trim()) {
      showSnackbar("Mohon isi ulasan terlebih dahulu!", "error");
      return;
    }

    try {
      setLoading(true);
      await instance.post("/add/review", {
        product_id: productId,
        rating: rating,
        comment: reviewText,
      });
      showSnackbar("Ulasan berhasil dikirim!", "success");
      setReviewText("");
      setRating(0);
      handleClose();
    } catch (error) {
      console.error("Gagal mengirim ulasan", error);
      showSnackbar("Gagal mengirim ulasan. Coba lagi.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomSnackbar />
      <Modal open={open} onClose={handleClose}>
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
            padding: 2,
            width: { xs: "350px", sm: "450px" },
            maxWidth: "100%",
            maxHeight: "90vh",
          }}
        >
          <button
            onClick={handleClose}
            className="text-2xl flex text-hitam2 mb-3 justify-end ml-auto"
          >
            <IoClose />
          </button>
          <div className="px-5 pb-2 text-center rounded-t-lg border-b">
            <h2 className="text-xl mb-2 font-bold text-hitam2">
              Beritahu kami kesan Anda terhadap produk ini!
            </h2>
            <Rating
              name="rating"
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              size="large"
              sx={{ fontSize: "2.7rem" }}
            />
          </div>

          <TextField
            fullWidth
            label="Tulis ulasan"
            multiline
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            inputProps={{ maxLength: MAX_REVIEW_LENGTH }}
            InputLabelProps={{
              sx: {
                color: reviewText ? "black" : theme.palette.main,
                fontSize: { xs: "0.875rem", md: "0.9rem" },
                "&.Mui-focused": {
                  color: "black !important",
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "black !important",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "black !important",
              },
            }}
          />

          <div className="text-right text-gray-500 text-xs">
            {reviewText.length}/{MAX_REVIEW_LENGTH} karakter
          </div>

          <div className="mt-4 flex justify-between">
            <button
              onClick={handleReviewSubmit}
              className="bg-black hover:bg-black/80 duration-200 text-white px-4 py-2 rounded-md w-full"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={17} color="inherit" />
              ) : (
                "Kirim Ulasan"
              )}
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ModalReview;
