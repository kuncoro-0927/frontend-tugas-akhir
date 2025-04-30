import { IoClose } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { TextField } from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { showSnackbar } from "../../components/CustomSnackbar";
import { setCartItems } from "../../redux/cartSlice";
const ModalLogin = ({ handleSwitch, handleClose }) => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const dispatch = useDispatch();

  const handleNextStep = () => {
    setStep(2);
  };

  const handleBackStep = () => {
    setStep(1);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/v1/auth/google`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    setLoadingVerify(true);

    try {
      // Dispatch loginUser dan unwrap hasilnya
      const resultAction = await dispatch(
        loginUser({ email, password })
      ).unwrap();
      const savedCartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];

      // Update Redux dengan data keranjang yang ada
      dispatch(setCartItems(savedCartItems));
      // Ambil token dan status verifikasi dari resultAction
      const { otpToken, isverified } = resultAction;

      if (!isverified) {
        // Jika belum verifikasi, switch ke modal verifikasi
        console.log("OTP Token yang diterima:", otpToken);
        handleSwitch("verifyemail", otpToken); // Kirim token ke modal verifikasi
      } else {
        // Jika sudah verifikasi, tampilkan pesan sukses dan tutup modal
        showSnackbar("Login berhasil!", "success");
        handleClose();
      }
    } catch (error) {
      // Jika terjadi error saat login
      console.error("Login error:", error);

      // Jika user belum diverifikasi, tampilkan modal verifikasi
      if (error.isverified === false && error.otpToken) {
        console.log("OTP Token dari error:", error.otpToken);
        handleSwitch("verifyemail", error.otpToken); // Kirim token ke modal verifikasi
      }

      // Tampilkan error spesifik berdasarkan field yang dikembalikan dari backend
      if (error.field === "email") {
        setEmailError(error.message || "Email salah, coba lagi.");
      } else if (error.field === "password") {
        setPasswordError(error.message || "Password salah, coba lagi.");
      } else {
        setError(error.message || "Login gagal, coba lagi.");
      }
    } finally {
      setLoadingVerify(false); // Sembunyikan loading indikator
    }
  };

  return (
    <>
      <div>
        {step === 1 ? (
          // Step 1: Pilihan metode login
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
              <div className="px-5 pb-2">
                <h2 className="text-2xl font-bold text-hitam2 mb-2">Masuk</h2>
                <p>Siap buat bikin ruang makin keren? Yuk, masuk dulu!</p>
              </div>
            </div>
            <div className="flex justify-center mx-5 items-center pt-7">
              <button
                onClick={handleGoogleLogin}
                className="border flex items-center hover:border-hitam2 duration-300 justify-between hover:border-black border-gray-400 rounded-xl px-6 py-4 w-full"
              >
                Lanjutkan dengan Google
                <img className="w-[25px]" src="/images/google.svg" alt="" />
              </button>
            </div>
            <div className="flex justify-center mx-5 items-center pb-7 mt-5">
              <button
                onClick={handleNextStep} // Pindah ke step 2 saat klik tombol email
                className="border flex items-center hover:border-hitam2 duration-300 justify-between hover:border-black border-gray-400 rounded-xl px-6 py-4 w-full"
              >
                Lanjutkan dengan email
                <MdOutlineEmail className="text-2xl" />
              </button>
            </div>
          </div>
        ) : (
          // Step 2: Input email dan password
          <div className="">
            <div
              className="p-5 bg-blue-300/10 pb-2  "
              style={{
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
              }}
            >
              <div className="flex pb-3">
                <button
                  onClick={handleBackStep} // Kembali ke step 1 saat tombol "Back" diklik
                  className="text-xl"
                >
                  <IoIosArrowBack />
                </button>
                <button
                  onClick={handleClose}
                  className="text-2xl flex  justify-end ml-auto"
                >
                  <IoClose />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-hitam2 mb-2">Masuk</h2>
              <p>Siap buat bikin ruang makin keren? Yuk, masuk dulu!</p>
            </div>
            <div className="mx-5 py-7">
              <form onSubmit={handleLogin} className="flex flex-col space-y-5">
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={email}
                  size="small"
                  error={Boolean(emailError)}
                  helperText={emailError}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "black !important",
                      "& fieldset": {
                        borderWidth: "0.3px !important", // Border tipis saat tidak aktif
                        borderColor: "gray !important",
                      },
                      "&:hover fieldset": {
                        borderWidth: "0.5px !important", // Border sedikit lebih tebal saat hover
                        borderColor: "black !important",
                      },
                      "&.Mui-focused fieldset": {
                        borderWidth: "1.2px !important", // Border lebih tebal saat aktif/di-klik
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
                      color: "black !important", // Warna label saat aktif
                    },
                  }}
                />

                <TextField
                  fullWidth
                  type={showPassword ? "text" : "password"} // Ubah tipe input
                  label="Kata sandi"
                  variant="outlined"
                  name="password"
                  size="small"
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "black !important",
                      "& fieldset": {
                        borderWidth: "0.3px !important", // Border tipis saat tidak aktif
                        borderColor: "gray !important",
                      },
                      "&:hover fieldset": {
                        borderWidth: "0.5px !important", // Border sedikit lebih tebal saat hover
                        borderColor: "black !important",
                      },
                      "&.Mui-focused fieldset": {
                        borderWidth: "1.2px !important", // Border lebih tebal saat aktif/di-klik
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
                      color: "black !important", // Warna label saat aktif
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {error && (
                  <p className="text-red-500 text-sm">{error}</p> // Tampilkan pesan error jika ada
                )}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleSwitch("resetPassword")}
                    className="text-blue-500 text-sm hover:underline duration-300"
                  >
                    Lupa kata sandi?
                  </button>
                </div>

                <div className="mt-10">
                  <button
                    className="py-2 w-full bg-black text-white rounded-md hover:-translate-y-1 hover:opacity-85 duration-200"
                    disabled={loadingVerify}
                  >
                    {loadingVerify ? (
                      <CircularProgress size={17} color="inherit" /> // Show spinner when loading
                    ) : (
                      "Masuk"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="px-5 pb-9 justify-center flex">
          <p className="font-medium text-sm">Belum ada akun?</p>
          <button
            onClick={() => handleSwitch("register")}
            className="underline ml-1 font-medium text-sm"
          >
            Daftar dulu
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalLogin;
