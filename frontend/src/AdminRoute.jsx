// AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role;
  //   const role = localStorage.getItem("role"); // or from context/state


  if (role !== "ADMIN") {
    // Redirect non-admins
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
