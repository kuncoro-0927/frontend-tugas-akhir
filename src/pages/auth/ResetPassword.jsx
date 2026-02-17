import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { instance } from "../../utils/axios"; // sesuaikan path axios kamu

import { showSnackbar } from "../../components/CustomSnackbar";
const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await instance.post("/reset-password", {
        token,
        newPassword: password,
      });

      showSnackbar(res.data.message || "Password berhasil direset", "success");
      navigate("/");
    } catch (err) {
      const errMsg = err.response?.data?.message || "Terjadi kesalahan";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Atur Ulang Kata Sandi
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Kata Sandi Baru"
            fullWidth
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            helperText={error || "Minimal 8 karakter"}
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
          <button
            type="submit"
            className="bg-black text-white w-full py-2 rounded hover:bg-opacity-90 transition"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
