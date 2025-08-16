import React, { useEffect, useState } from "react";
import NavBar from "../components/shared/NavBar";
import { Outlet } from "react-router";
import Footer from "../components/shared/Footer";
import { Toaster } from "react-hot-toast";
import PageLoading from "../components/UI/PageLoading";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  if (loading) {
    return <PageLoading></PageLoading>;
  }
  return (
    <div className="body-font">
      <NavBar />
      <div className="min-h-[calc(100vh-300px)] w-11/12 mx-auto py-10">
        <Outlet />
      </div>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default MainLayout;
