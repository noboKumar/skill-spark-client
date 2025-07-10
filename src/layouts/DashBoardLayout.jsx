import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, Outlet } from "react-router";
import ToggleTheme from "../components/UI/ToggleTheme";
import DashboardSideBar from "../components/Dashboard/DashboardSideBar";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";

const DashBoardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="responsive-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content Area */}
      <div className="drawer-content flex flex-col">
        <DashboardNavbar></DashboardNavbar>
        {/* Hamburger menu - only visible on medium/small screens */}
        <div className="p-4 md:hidden">
          <label
            htmlFor="responsive-drawer"
            className="btn btn-primary drawer-button"
          >
            <GiHamburgerMenu className="text-xl" />
          </label>
        </div>

        {/* Your page content here */}
        <div className="p-4 w-11/12 mx-auto">
          <Outlet />
        </div>
      </div>

      {/* Sidebar Drawer */}
      <DashboardSideBar></DashboardSideBar>
    </div>
  );
};

export default DashBoardLayout;
