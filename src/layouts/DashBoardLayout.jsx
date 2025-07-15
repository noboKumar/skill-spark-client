import React from "react";
import { Outlet } from "react-router";
import DashboardSideBar from "../components/Dashboard/DashboardSideBar";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import { Toaster } from "react-hot-toast";

const DashBoardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="responsive-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content Area */}
      <div className="drawer-content flex flex-col">
        <DashboardNavbar></DashboardNavbar>


        {/* Your page content here */}
        <div className="p-4 w-11/12 mx-auto">
          <Outlet />
        </div>
      </div>

      {/* Sidebar Drawer */}
      <DashboardSideBar></DashboardSideBar>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default DashBoardLayout;
