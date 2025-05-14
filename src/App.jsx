import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CustomSnackbar } from "./components/CustomSnackbar";
import UserRoutes from "./routes/UserRoutes";
import { fetchUser } from "./redux/userSlice";
import { fetchAdmin } from "./redux/adminSlice";
import { useDispatch } from "react-redux";
import AdminRoutes from "./routes/AdminRoutes";
import FloatingButton from "./components/FloatingButton";
import Cart from "./pages/Cart";
function App() {
  const dispatch = useDispatch();
  const location = useLocation(); // untuk cek path saat ini

  useEffect(() => {
    const isAdminPath = location.pathname.startsWith("/admin");
    if (isAdminPath) {
      dispatch(fetchAdmin());
    } else {
      dispatch(fetchUser());
    }
  }, [dispatch, location.pathname]); // perhatikan: depend on location.pathname

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    );
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <CustomSnackbar />
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </>
  );
}

export default App;
