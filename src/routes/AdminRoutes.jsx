import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LoginAdmin from "../pages/admin/LoginAdmin";
import Dashboard from "../pages/admin/DashboardAdmin";
import DataUsers from "../pages/admin/Users/DataUsers";
import DataCategories from "../pages/admin/Products/DataCategories";
import DataProducts from "../pages/admin/Products/DataProducts";
import DataOrders from "../pages/admin/Orders/DataOrders";
import DataOrderItems from "../pages/admin/Orders/DataOrderItems";
import DataOrderShipping from "../pages/admin/Orders/DataOrderShipping";
import DataTransactions from "../pages/admin/Orders/DataTransactions";
import DataPromoCodes from "../pages/admin/Promo_Codes/DataPromoCodes";
import DataReview from "../pages/admin/Reviews/DataReview";
import socket from "../utils/socket";
import PrivateRoute from "./PrivateRoute";
import { setHasNewNotification } from "../redux/notificationSlice";
function AdminRoutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("newNotification", () => {
      dispatch(setHasNewNotification(true));
    });

    return () => {
      socket.off("newNotification");
    };
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginAdmin />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/data/users" element={<DataUsers />} />
          <Route path="/data/products" element={<DataProducts />} />
          <Route path="/data/categories" element={<DataCategories />} />
          <Route path="/data/orders" element={<DataOrders />} />
          <Route path="/data/order/items" element={<DataOrderItems />} />
          <Route path="/data/order/shipping" element={<DataOrderShipping />} />
          <Route path="/data/transactions" element={<DataTransactions />} />
          <Route path="/data/promo/codes" element={<DataPromoCodes />} />
          <Route path="/data/reviews" element={<DataReview />} />
        </Route>
      </Routes>
    </>
  );
}

export default AdminRoutes;
