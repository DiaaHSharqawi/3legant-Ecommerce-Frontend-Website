import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

function UnProtectedRoutes({ children }) {
  const token = localStorage.getItem("userToken");
  if (token) return <Navigate to="/" />;
  else return children;
}

UnProtectedRoutes.propTypes = {
  children: PropTypes.node,
};

export default UnProtectedRoutes;
