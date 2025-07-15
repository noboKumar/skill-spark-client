import React from "react";
import ToggleTheme from "../UI/ToggleTheme";
import useAuth from "../../hooks/useAuth";
import { GiHamburgerMenu } from "react-icons/gi";

const DashboardNavbar = () => {
  const { user } = useAuth();
  return (
    <div className="bg-base-100 shadow-sm border-b-2 border-gray-300 sticky top-0 z-40">
      <div className="flex justify-between items-center p-4 w-11/12 mx-auto">
        {/* Hamburger menu - only visible on medium/small screens */}
        <div className="md:hidden">
          <label
            htmlFor="responsive-drawer"
            className="btn btn-ghost drawer-button"
          >
            <GiHamburgerMenu className="text-xl" />
          </label>
        </div>
        <h1 className="text-3xl font-bold my-4">Dashboard</h1>
        <div className="flex items-center gap-4">
          <ToggleTheme />
          {user && (
            <div className="avatar">
              <div className="w-15 rounded-full border-2 border-gray-400">
                <img src={user?.photoURL} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
