import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { Navigate } from "react-router";

const StudentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole(user?.email);

  if (loading || isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (role === "student") {
    return children;
  } else {
    return <Navigate to="/unauthorized" replace></Navigate>;
  }
};

export default StudentRoute;
