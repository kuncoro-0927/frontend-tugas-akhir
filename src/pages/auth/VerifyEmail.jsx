/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { showSnackbar } from "../../components/CustomSnackbar";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { instance } from "../../utils/axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { verifyOtpAndLogin } from "../../redux/userSlice";
function OTP({ separator, length, value, onChange }) {
  const inputRefs = React.useRef(new Array(length).fill(null));

  const focusInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const handleChange = (event, currentIndex) => {
    const currentValue = event.target.value;
    let indexToEnter = 0;

    while (indexToEnter <= currentIndex) {
      if (
        inputRefs.current[indexToEnter].value &&
        indexToEnter < currentIndex
      ) {
        indexToEnter += 1;
      } else {
        break;
      }
    }

    onChange((prev) => {
      const otpArray = prev.split("");
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray.join("");
    });

    if (currentValue !== "") {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handlePaste = (event, currentIndex) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    if (clipboardData.types.includes("text/plain")) {
      let pastedText = clipboardData.getData("text/plain");
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
        if (
          inputRefs.current[indexToEnter].value &&
          indexToEnter < currentIndex
        ) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const otpArray = value.split("");

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? " ";
        otpArray[i] = lastValue;
      }

      onChange(otpArray.join(""));
    }
  };

  const handleKeyDown = (event, currentIndex) => {
    if (event.key === "Backspace") {
      let otpArray = value.split("");

      if (otpArray[currentIndex]) {
        // Hapus karakter pada posisi saat ini
        otpArray[currentIndex] = "";
      } else if (currentIndex > 0) {
        // Jika kosong, pindah ke input sebelumnya dan hapus
        otpArray[currentIndex - 1] = "";
        focusInput(currentIndex - 1);
      }

      onChange(otpArray.join(""));
    }
  };
  return (
    <Box sx={{ display: "flex", gap: 0, alignItems: "center" }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <input
            ref={(ele) => {
              inputRefs.current[index] = ele;
            }}
            value={value[index] ?? ""}
            onChange={(event) => handleChange(event, index)}
            onPaste={(event) => handlePaste(event, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            type="text"
            maxLength={1}
            style={{
              width: "40px",
              textAlign: "center",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              margin: "0 5px",
            }}
          />
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  );
}

OTP.propTypes = {
  length: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  separator: PropTypes.node,
  value: PropTypes.string.isRequired,
};

const ModalVerifyEmail = ({ otpToken, handleSwitch, handleClose }) => {
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(300);
  const [otpExpired, setOtpExpired] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loadingVerify, setLoadingVerify] = useState(false);

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location]);
  useEffect(() => {
    let interval;
    if (timer > 0 && !otpExpired) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setOtpExpired(true);
    }

    return () => clearInterval(interval);
  }, [timer, otpExpired]);

  const handleVerify = async (e) => {
    e.preventDefault();

    // Validasi untuk memastikan OTP terisi dengan benar
    if (otp.length !== 6 || !otp.match(/^\d{6}$/)) {
      setError("OTP yang Anda masukkan tidak valid.");
      return; // Hentikan eksekusi jika OTP tidak valid
    }

    setError(null);
    setLoadingVerify(true);

    try {
      console.log("Token yang dikirim saat verifikasi:", otpToken);
      await dispatch(verifyOtpAndLogin({ otp, otpToken }));
      showSnackbar("Verifikasi sukses!", "success");
      handleClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingVerify(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setError(null);
      const response = await instance.post("/resend-otp", { email });

      showSnackbar("Kode OTP dikirim ke Email Anda", "success");

      setTimer(300);
      setOtpExpired(false);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Gagal mengirim ulang OTP");
    }
  };

  const maskEmail = (email) => {
    const [localPart, domainPart] = email.split("@");
    if (!localPart || localPart.length < 2) return email; // Handle edge cases like empty or single-character local part
    const maskedLocalPart = localPart[0] + "*".repeat(localPart.length - 1);
    return `${maskedLocalPart}@${domainPart}`;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="pb-14 px-4 ">
      <button
        onClick={handleClose}
        className="text-2xl flex py-4 justify-end ml-auto"
      >
        <IoClose />
      </button>
      <div className="flex justify-center ">
        <div className="">
          <h1 className="text-black text-center text-2xl font-semibold">
            {" "}
            Verifikasi kode OTP
          </h1>
          <div className="text-normal mt-5">
            Silakan masukkan kode yang kami kirim ke email Anda
            <p className="mr-1 text-blue-400">{maskEmail(email)}</p>
          </div>

          <div className="grid-1 grid mt-5">
            <div className="">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <OTP
                  separator={<span>-</span>}
                  value={otp}
                  onChange={setOtp}
                  length={6}
                />
              </div>

              <button
                className="p-2 w-full bg-black mt-10 hover:bg-hover text-white rounded-md"
                onClick={handleVerify}
                disabled={loadingVerify}
              >
                {loadingVerify ? (
                  <CircularProgress size={17} color="inherit" /> // Show spinner when loading
                ) : (
                  "Verifikasi"
                )}
              </button>
              {error && (
                <div className="text-red-500 mt-3 text-sm">{error}</div>
              )}
            </div>
            <div className="md:mt-3 mt-10 text-sm flex justify-center">
              Belum terima kode OTP?
              <Tooltip
                title={!otpExpired ? "Kirim ulang saat kode kadaluwarsa" : ""}
              >
                <span>
                  <button
                    onClick={handleResendOtp}
                    disabled={!otpExpired}
                    className={`ml-1 hover:underline ${
                      otpExpired
                        ? "text-blue-400"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Kirim ulang
                  </button>
                </span>
              </Tooltip>
            </div>
            <div className="mt-2 text-sm flex justify-center">
              <p>
                {otpExpired
                  ? "Kode OTP kadaluwarsa"
                  : `Kode OTP akan kadaluwarsa dalam: ${formatTime(timer)}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalVerifyEmail;
