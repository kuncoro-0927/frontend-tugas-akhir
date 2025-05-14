import { IoClose } from "react-icons/io5";
import CircularProgress from "@mui/material/CircularProgress";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { MuiTelInput } from "mui-tel-input";
import { TextField } from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { instance } from "../../utils/axios";
const ModalRegister = ({ handleSwitch, handleClose }) => {
  const [step, setStep] = useState(1);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    if (typeof e === "string") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        phone: e,
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingVerify(true);
    setEmailError(null); // Reset error state sebelumnya
    setPasswordError(null);
    setPhoneError(null); // Jika kamu juga ingin menangani error phone

    try {
      const response = await instance.post("/register", {
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      });

      const { token } = response.data;
      handleSwitch("verifyemail", token);
    } catch (error) {
      // Cek apakah error memiliki field spesifik seperti email atau password
      const errorData = error.response?.data;

      if (errorData?.field === "email") {
        setEmailError(errorData.message || "Email salah, coba lagi.");
      } else if (errorData?.field === "password") {
        setPasswordError(errorData.message || "Password salah, coba lagi.");
      } else if (errorData?.field === "phone") {
        setPhoneError(errorData.message || "Nomor telepon salah, coba lagi.");
      }
    } finally {
      setLoadingVerify(false); // Sembunyikan loading indikator
    }
  };

  const handleNextStep = () => {
    setStep(2);
  };

  const handleBackStep = () => {
    setStep(1);
  };

  return (
    <>
      <div>
        {step === 1 ? (
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
                <h2 className="text-2xl font-bold text-hitam2 mb-2">Daftar</h2>
                <p>
                  Yuk, Gabung sekarang untuk kemudahan belanja di Faza Frame!
                </p>
              </div>
            </div>
            <div className="flex justify-center mx-5 items-center pt-7">
              <button className="border flex items-center hover:border-hitam2 duration-300 justify-between hover:border-black border-gray-400 rounded-xl px-6 py-4 w-full">
                Lanjutkan dengan Google
                <img className="w-[25px]" src="/images/google.svg" alt="" />
              </button>
            </div>
            <div className="flex justify-center mx-5 items-center pb-7 mt-5">
              <button
                onClick={handleNextStep}
                className="border flex items-center hover:border-hitam2 duration-300 justify-between hover:border-black border-gray-400 rounded-xl px-6 py-4 w-full"
              >
                Lanjutkan dengan email
                <MdOutlineEmail className="text-2xl" />
              </button>
            </div>
          </div>
        ) : (
          <div className={`modal ${loadingVerify ? "modal-loading" : ""}`}>
            <div
              className="p-5 bg-blue-300/10 pb-2  "
              style={{
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
              }}
            >
              <div className="flex pb-3">
                <button onClick={handleBackStep} className="text-xl">
                  <IoIosArrowBack />
                </button>
                <button
                  onClick={handleClose}
                  className="text-2xl flex  justify-end ml-auto"
                >
                  <IoClose />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-hitam2 mb-2">Daftar</h2>
              <p>Daftar dulu yuk!</p>
            </div>

            <div className="px-5 py-7">
              <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                <MuiTelInput
                  value={formData.phone}
                  onChange={(value) => handleChange(value)}
                  fullWidth
                  label="Nomor Telepon"
                  size="small"
                  helperText={phoneError}
                  error={Boolean(phoneError)}
                  defaultCountry="ID"
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
                <TextField
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  label="Email"
                  variant="outlined"
                  name="email"
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

                <TextField
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  label="Kata Sandi"
                  variant="outlined"
                  helperText={passwordError}
                  error={Boolean(passwordError)}
                  name="password"
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

                <div className="mt-10">
                  <button className="py-2 w-full bg-black text-white rounded-md hover:-translate-y-1 hover:opacity-85 duration-200">
                    {loadingVerify ? (
                      <CircularProgress size={17} color="inherit" />
                    ) : (
                      "Daftar"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="px-5 pb-9 justify-center flex">
          <p className="font-medium text-sm">Sudah ada akun?</p>
          <button
            onClick={() => handleSwitch("login")}
            className="underline ml-1 font-medium text-sm"
          >
            Masuk
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalRegister;
