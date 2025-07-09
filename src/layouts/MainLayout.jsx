import React from "react";
import NavBar from "../components/shared/NavBar";
import { Outlet } from "react-router";
import Footer from "../components/shared/Footer";

const MainLayout = () => {
  return (
    <div className="body-font">
      <NavBar />
      <div className="min-h-[calc(100vh-300px)] w-11/12 mx-auto py-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
