import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField } from "@mui/material";

import { showSnackbar } from "../../components/CustomSnackbar";
import { instance } from "../../utils/axios";

const ModalForgotPassword = ({ handleClose, handleSwitch }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(null);
    setLoading(true);

    try {
      const res = await instance.post("/forgot-password", { email });
      showSnackbar(
        res.data.message || "Link reset dikirim ke email",
        "success"
      );
      handleClose();
    } catch (error) {
      const errorData = error.response?.data;
      if (errorData?.field === "email") {
        setEmailError(errorData.message || "Email tidak valid");
      } else {
        showSnackbar("Terjadi kesalahan. Coba lagi nanti.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className=" bg-blue-400/10  "
        style={{
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        <div className="flex p-4 pb-2">
          <button onClick={() => handleSwitch("login")} className="text-xl">
            <IoIosArrowBack />
          </button>
          <button onClick={handleClose} className="text-2xl ml-auto">
            <IoClose />
          </button>
        </div>
        <div className="px-5 pb-4">
          <h2 className="text-2xl font-bold text-hitam2 mb-2">
            Lupa Kata Sandi
          </h2>
          <p className="text-sm text-gray-600">
            Masukkan email yang terdaftar untuk menerima link reset kata sandi.
          </p>
        </div>
      </div>

      <div className="px-5 py-7">
        <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            label="Email"
            variant="outlined"
            helperText={emailError}
            error={Boolean(emailError)}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "black !important",
                "& fieldset": {
                  borderWidth: "0.3px !important",
                  borderColor: "gray !important",
                },
                "&:hover fieldset": {
                  borderWidth: "0.5px !important",
                  borderColor: "black !important",
                },
                "&.Mui-focused fieldset": {
                  borderWidth: "1.2px !important",
                  borderColor: "black !important",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "black !important",
              },
              "& .MuiInputLabel-root": {
                color: "gray !important",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "black !important",
              },
            }}
          />

          <div className="mt-8">
            <button
              type="submit"
              className="py-2 w-full bg-black text-white rounded-md hover:-translate-y-1 hover:opacity-85 duration-200"
            >
              {loading ? (
                <CircularProgress size={17} color="inherit" />
              ) : (
                "Kirim Link Reset"
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="px-5 pb-7 justify-center flex">
        <p className="font-medium text-sm">Sudah ingat sandi?</p>
        <button
          onClick={() => handleSwitch("login")}
          className="underline ml-1 font-medium text-sm"
        >
          Masuk
        </button>
      </div>
    </div>
  );
};

export default ModalForgotPassword;
