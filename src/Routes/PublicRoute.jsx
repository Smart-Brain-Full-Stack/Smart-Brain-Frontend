import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ user, children }) => {
  if (user) {
    return <Navigate to="/mainpage" replace />;
  }
  return children;
};

export default PublicRoute;
