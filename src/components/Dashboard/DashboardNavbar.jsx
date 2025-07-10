import React from "react";
import ToggleTheme from "../UI/ToggleTheme";

const DashboardNavbar = () => {
  return (
    <div className="bg-base-100 shadow-sm border-b-2 border-gray-300">
      <div className="flex justify-between items-center p-4 w-11/12 mx-auto">
        <h1 className="text-3xl font-bold my-4">Dashboard</h1>
        <ToggleTheme />
      </div>
    </div>
  );
};

export default DashboardNavbar;
