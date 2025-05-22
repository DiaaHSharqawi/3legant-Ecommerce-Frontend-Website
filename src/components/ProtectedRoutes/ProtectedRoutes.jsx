import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const token = localStorage.getItem("userToken");
  if (!token) return <Navigate to="/auth/login" />;
  else return children;
}

ProtectedRoutes.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoutes;
