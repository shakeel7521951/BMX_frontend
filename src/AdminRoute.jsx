import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { profile } = useSelector((state) => state.user);

  if (!profile) {
    return <div>Loading...</div>;
  }

  if (profile.userRole !== "Admin" && profile.userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
