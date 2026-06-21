import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./User/Login/AuthContext";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, user } = useAuth(); // Get login state and user details

  // Redirect to login if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Redirect to admin panel if the user is an admin and this is an admin-only route
  if (adminOnly && user?.is_admin) {
    return <Navigate to="/admin-panel" />;
  }
  

  // Redirect to map if the user is not an admin and the route is admin-only
  if (adminOnly && user?.is_admin) {
    return <Navigate to="/" />;
  }

  // Render the child component if checks pass
  return children;
};

export default PrivateRoute;
