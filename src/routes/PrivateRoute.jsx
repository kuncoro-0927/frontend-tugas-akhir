import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return isAdminLoggedIn ? (
      <Outlet />
    ) : (
      <Navigate to="/admin/login" replace />
    );
  }

  return isUserLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
