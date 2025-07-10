import React from "react";
import { NavLink } from "react-router";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaListAlt,
  FaUserCheck,
  FaUsers,
  FaRegUser,
  FaUser,
} from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";

const DashboardSideBar = () => {
  return (
    <div className="drawer-side z-50 border-r-2 border-gray-300">
      <label htmlFor="responsive-drawer" className="drawer-overlay"></label>
      <ul className="menu bg-base-200 min-h-full w-80 p-4 text-lg font-semibold">
        {/* Student Menu */}
        <li>
          <NavLink to="/my-class" end>
            <FaBookOpen /> My Enroll Class
          </NavLink>
        </li>

        {/* Teacher Menu */}
        <li>
          <NavLink to="/add-class" end>
            <FaChalkboardTeacher /> Add Class
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-class" end>
            <MdLibraryBooks /> My Class
          </NavLink>
        </li>

        {/* Admin Menu */}
        <li>
          <NavLink to="/teacher-request" end>
            <FaUserCheck /> Teacher Request
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" end>
            <FaUsers /> Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/all-classes" end>
            <FaListAlt /> All Classes
          </NavLink>
        </li>

        {/* Shared Menu */}
        <li>
          <NavLink to="/dashboard" end>
            <FaRegUser /> Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default DashboardSideBar;
