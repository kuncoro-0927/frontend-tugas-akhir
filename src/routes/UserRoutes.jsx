import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import { useState } from "react";
import NavBar from "../components/Navbar";
import AuthModal from "../pages/auth/AuthModal";
import Footer from "../components/Footer";
import Product from "../pages/Product";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Profile from "../pages/account/Profile";
import ShippingForm from "../pages/ShippingForm";
import OngkirChecker from "../pages/TesOngkir";
import PaymentPage from "../pages/Payment";
import Order from "../pages/account/Order";
import Wishlist from "../pages/account/Wishlist";
import Review from "../pages/account/Review";
import PaymentSuccess from "../pages/PaymentSuccess";
function UserRoutes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("login");

  const handleOpenModal = (content) => {
    setModalContent(content); // Mengubah konten modal
    setIsModalOpen(true); // Membuka modal
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/email/verify" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password";

  const isAccountPage = location.pathname.startsWith("/account");

  const shouldShowNavBar = !isAuthPage;
  const isShippingOrPayment =
    location.pathname.startsWith("/shipping/form") ||
    location.pathname.startsWith("/tes/payment");
  location.pathname.startsWith("/payment/success/:orderId");

  const shouldShowFooter =
    !isAuthPage && !isAccountPage && !isShippingOrPayment;

  return (
    <>
      {/* <NavBar handleOpenModal={handleOpenModal} /> */}
      {shouldShowNavBar && <NavBar handleOpenModal={handleOpenModal} />}

      <AuthModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        initialContent={modalContent}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/details/:id" element={<ProductDetails />} />
        <Route path="/account/profile" element={<Profile />} />
        <Route path="/account/order" element={<Order />} />
        <Route path="/account/wishlist" element={<Wishlist />} />
        <Route path="/account/review" element={<Review />} />
        <Route path="/payment/success/:order_id" element={<PaymentSuccess />} />
        <Route path="/checkout/cart" element={<Cart />} />
        <Route path="/shipping/form/:orderId" element={<ShippingForm />} />
        <Route path="/tes/ongkir" element={<OngkirChecker />} />
        <Route path="/tes/payment/:orderId" element={<PaymentPage />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </>
  );
}

export default UserRoutes;
