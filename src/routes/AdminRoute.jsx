import React from "react";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole(user?.email);
  
  if (loading || isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (role === "admin") {
    return children;
  } else {
    return <Navigate to="/unauthorized" replace />;
  }
};

export default AdminRoute;
