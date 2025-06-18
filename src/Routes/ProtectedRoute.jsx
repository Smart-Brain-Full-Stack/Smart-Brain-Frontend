import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  } else if (user) {
    return <Navigate to="/mainpage" replace />;
  }
  return children;
};

export default ProtectedRoute;
