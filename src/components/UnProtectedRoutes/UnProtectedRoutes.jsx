import React from "react";
import { Navigate } from "react-router-dom";

function UnProtectedRoutes({ children }) {
  const token = localStorage.getItem("userToken");
  if (token) return <Navigate to="/" />;
  else return children;
}

export default UnProtectedRoutes;
