import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const token = localStorage.getItem("userToken");
  if (!token) return <Navigate to="/auth/login" />;
  else return children;
}

export default ProtectedRoutes;
