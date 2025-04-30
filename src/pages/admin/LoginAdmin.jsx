import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../redux/adminSlice";
import FormInput from "../../components/TextField";
import { IconButton, Tooltip, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(loginAdmin({ email, password }));

      if (loginAdmin.fulfilled.match(resultAction)) {
        navigate("/admin/dashboard"); // kalau berhasil login
      } else {
        console.error(resultAction.payload || "Login gagal");
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <section className="lg:mx-10  2xl:mx-32 lg:my-10 rounded-2xl lg:p-0 min-h-screen flex flex-col items-center justify-center relative">
        {/* Logo */}
        <Link to="/" className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-1">
            <img src="/logoindex.svg" className="w-11 2xl:w-36" alt="Logo" />
          </div>
        </Link>

        {/* Form Login dengan backdrop blur */}
        <div className="flex flex-col items-center w-full max-w-md p-6 bg-white  border rounded-lg shadow-lg z-10 relative">
          <h1 className="text-hitam text-center text-xl lg:text-4xl font-extrabold">
            Login Admin
          </h1>
          <p className="text-center mt-3 text-xs md:text-sm text-gray-500">
            Masukkan kredensial Anda untuk mengakses <br />
            dashboard admin dan mengelola sistem.
          </p>

          <div className="grid-1 grid mt-10 w-full">
            <form
              onSubmit={handleLogin}
              className="flex flex-col space-y-5 w-full"
            >
              <FormInput
                fullWidth
                type="email"
                label="Email"
                variant="outlined"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormInput
                fullWidth
                label="Password"
                variant="outlined"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <VisibilityOff /> : <Visibility />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="hover:text-blue-500 text-sm"
                >
                  Lupa kata sandi?
                </Link>
              </div>
              <button
                type="submit"
                className="p-2 bg-black mt-10 hover:bg-hover text-white text-sm rounded-md"
              >
                "Masuk"
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginAdmin;
