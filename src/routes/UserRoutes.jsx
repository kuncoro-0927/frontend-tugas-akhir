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
import Review from "../pages/user/account/review";
import Profile from "../pages/user/account/profile";
import PaymentStatus from "../pages/user/PaymentStatus";
import Cart from "../components/Cart";
import Notfound from "../pages/user/404";
import ResetPassword from "../pages/auth/ResetPassword";
import AuthModal from "../pages/auth/AuthModal";
import FloatingButton from "../components/ui/FloatingButton";
import ModalSearch from "../components/modal/ModalSearch";

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
