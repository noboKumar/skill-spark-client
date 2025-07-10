import React from "react";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { Navigate } from "react-router";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRouter;
