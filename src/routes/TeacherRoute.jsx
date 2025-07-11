import React from "react";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { Navigate } from "react-router";

const TeacherRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole(user?.email);

  if (loading || isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (role === "teacher") {
    return children;
  } else {
    return <Navigate to="/unauthorized" replace />;
  }
};

export default TeacherRoute;
