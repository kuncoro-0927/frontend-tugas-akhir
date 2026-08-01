// import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import PrivateRoute from "./PrivateRoute";
// import Home from "../pages/Home";
// import NavBar from "../components/Navbar";
// import AuthModal from "../pages/auth/AuthModal";
// import Footer from "../components/Footer";
// import Product from "../pages/Product";
// import Faqs from "../pages/Faqs";
// import Contact from "../pages/Contact";
// import ProductDetails from "../pages/ProductDetails";
// import Profile from "../pages/account/Profile";
// import ShippingForm from "../pages/ShippingForm";
// import OngkirChecker from "../pages/TesOngkir";
// import PaymentPage from "../pages/Payment";
// import Order from "../pages/account/Order";
// import Wishlist from "../pages/account/Wishlist";
// import Review from "../pages/account/Review";
// import PaymentSuccess from "../pages/PaymentSuccess";
// import Cart from "../pages/Cart";
// import FloatingButton from "../components/FloatingButton";
// import ModalSearch from "../components/Modal/ModalSearch";
// import Notfound from "../pages/404";
// import ResetPassword from "../pages/auth/ResetPassword";
// function UserRoutes() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalContent, setModalContent] = useState("login");
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const isCartDrawerOpen = useSelector((state) => state.cart.isDrawerOpen);

//   const isAuthPage =
//     location.pathname === "/login" ||
//     location.pathname === "/register" ||
//     location.pathname === "/email/verify" ||
//     location.pathname === "/forgot-password" ||
//     location.pathname === "/reset-password";

//   const isAccountPage = location.pathname.startsWith("/account");

//   const isShippingOrPayment =
//     location.pathname.startsWith("/shipping/form") ||
//     location.pathname.startsWith("/checkouts/payment");

//   const isPaymentSuccess = location.pathname.startsWith("/payment/success");
//   // const isNotFoundPage = location.pathname === "/*";

//   const shouldShowNavBar = !isAuthPage && !isShippingOrPayment;
//   const shouldShowFooter =
//     !isAuthPage &&
//     !isAccountPage &&
//     !isShippingOrPayment &&
//     !isPaymentSuccess &&
//     !location.pathname.match(/404|not-found/) &&
//     !location.pathname.match(/\/[^/]+/); // URL aneh

//   const handleOpenModal = (content) => {
//     setModalContent(content);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => setIsModalOpen(false);

//   const handleSearchOpen = () => setIsSearchOpen(true);
//   const handleSearchClose = () => setIsSearchOpen(false);

//   const handleItemSelect = (item) => {
//     navigate(`/product/detail/${item.id}`);
//     handleSearchClose();
//   };

//   return (
//     <>
//       {!isShippingOrPayment && !isCartDrawerOpen && (
//         <FloatingButton onClick={handleSearchOpen} />
//       )}

//       <Cart />

//       {shouldShowNavBar && (
//         <NavBar
//           handleOpenModal={handleOpenModal}
//           handleSearchOpen={handleSearchOpen}
//         />
//       )}

//       <AuthModal
//         open={isModalOpen}
//         handleClose={handleCloseModal}
//         initialContent={modalContent}
//       />

//       <ModalSearch
//         isOpen={isSearchOpen}
//         handleClose={handleSearchClose}
//         onSelect={handleItemSelect}
//       />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/products/list" element={<Product />} />
//         <Route path="/help/center" element={<Faqs />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/product/detail/:id" element={<ProductDetails />} />
//         <Route path="/tes/ongkir" element={<OngkirChecker />} />
//         <Route path="/shipping/form/:orderId" element={<ShippingForm />} />
//         <Route path="/checkouts/payment/:orderId" element={<PaymentPage />} />
//         <Route path="/payment/success/:order_id" element={<PaymentSuccess />} />
//         <Route path="/reset-password" element={<ResetPassword />} />

//         {/* PROTECTED ROUTES */}
//         <Route element={<PrivateRoute />}>
//           <Route path="/account/profile" element={<Profile />} />
//           <Route path="/account/order" element={<Order />} />
//           <Route path="/account/wishlist" element={<Wishlist />} />
//           <Route path="/account/review" element={<Review />} />
//         </Route>

//         <Route path="/404/not-found" element={<Notfound />} />
//         <Route path="*" element={<Notfound />} />
//       </Routes>

//       {shouldShowFooter && <Footer />}
//     </>
//   );
// }

// export default UserRoutes;

import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "../layouts/MainLayout";
import NavOnlyLayout from "../layouts/NavOnlyLayout";
import BareLayout from "../layouts/BareLayout";

import Home from "../pages/user/home";
import Product from "../pages/user/product";
import Faqs from "../pages/user/Faqs";
import Contact from "../pages/user/contact";
import ProductDetails from "../pages/user/product_detail";
import ShippingForm from "../pages/user/ShippingForm";
import Payment from "../pages/user/payment";
import Order from "../pages/user/account/order";
import Wishlist from "../pages/user/account/wishlist";
import Review from "../pages/user/account/review"
import Profile from "../pages/user/account/profile"
import PaymentStatus from "../pages/user/PaymentStatus";
import Cart from "../components/cart";
import Notfound from "../pages/user/404";
import ResetPassword from "../pages/auth/ResetPassword";
import AuthModal from "../pages/auth/AuthModal";
import FloatingButton from "../components/FloatingButton";
import ModalSearch from "../components/Modal/ModalSearch";

function UserRoutes() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("login");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isCartDrawerOpen = useSelector((state) => state.cart.isDrawerOpen);

  const handleOpenModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSearchOpen = () => setIsSearchOpen(true);
  const handleSearchClose = () => setIsSearchOpen(false);
  const handleItemSelect = (item) => {
    navigate(`/product/detail/${item.id}`);
    handleSearchClose();
  };

  return (
    <>
      {!isCartDrawerOpen && <FloatingButton onClick={handleSearchOpen} />}
      <Cart />
      <AuthModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        initialContent={modalContent}
      />
      <ModalSearch
        isOpen={isSearchOpen}
        handleClose={handleSearchClose}
        onSelect={handleItemSelect}
      />

      <Routes>
        <Route
          element={
            <MainLayout
              handleOpenModal={handleOpenModal}
              handleSearchOpen={handleSearchOpen}
            />
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/products/list" element={<Product />} />
          <Route path="/help/center" element={<Faqs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/detail/:id" element={<ProductDetails />} />
        </Route>

        <Route
          element={
            <NavOnlyLayout
              handleOpenModal={handleOpenModal}
              handleSearchOpen={handleSearchOpen}
            />
          }
        >
          <Route
            path="/payment/success/:order_id"
            element={<PaymentStatus />}
          />
          <Route path="/404/not-found" element={<Notfound />} />
          <Route path="*" element={<Notfound />} />

          <Route element={<PrivateRoute />}>
            <Route path="/account/profile" element={<Profile />} />
            <Route path="/account/order" element={<Order />} />
            <Route path="/account/wishlist" element={<Wishlist />} />
            <Route path="/account/review" element={<Review />} />
          </Route>
        </Route>

        <Route element={<BareLayout />}>
          <Route path="/shipping/form/:orderId" element={<ShippingForm />} />
          <Route path="/checkouts/payment/:orderId" element={<Payment />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </>
  );
}

export default UserRoutes;
