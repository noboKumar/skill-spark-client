import React from "react";
import { NavLink } from "react-router";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaListAlt,
  FaUserCheck,
  FaUsers,
  FaRegUser,
  FaSignOutAlt,
  FaRegClipboard,
} from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import Logo from "../UI/Logo";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useRole from "../../hooks/useRole";

const DashboardSideBar = () => {
  const { user, logOutUser } = useAuth();
  const { role } = useRole(user?.email);

  const handleLogout = () => {
    Swal.fire({
      title: "Confirm Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOutUser();
        toast.success("Successfully logged out!");
      }
    });
  };

  return (
    <div className="drawer-side z-50 border-r-2 border-gray-300">
      <label htmlFor="responsive-drawer" className="drawer-overlay"></label>
      <div className="flex flex-col justify-between bg-base-200 min-h-full p-4">
        {/* Top Section */}
        <ul className="menu text-lg font-semibold gap-2 lg:w-80">
          <Logo />
          <div className="divider my-0"></div>

          {/* Student Menu */}
          {role === "student" && (
            <>
              <li>
                <NavLink to="/dashboard/my-enroll-class" end>
                  <FaBookOpen /> My Enroll Class
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-request" end>
                  <FaRegClipboard /> My Request
                </NavLink>
              </li>
            </>
          )}

          {/* Teacher Menu */}
          {role === "teacher" && (
            <>
              <li>
                <NavLink to="/dashboard/add-class" end>
                  <FaChalkboardTeacher /> Add Class
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-class" end>
                  <MdLibraryBooks /> My Class
                </NavLink>
              </li>
            </>
          )}

          {/* Admin Menu */}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/teacher-request" end>
                  <FaUserCheck /> Teacher Request
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users" end>
                  <FaUsers /> Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-classes-request" end>
                  <FaListAlt /> All Classes
                </NavLink>
              </li>
            </>
          )}

          {/* Shared Menu */}
          <li>
            <NavLink to="/dashboard" end>
              <FaRegUser /> Profile
            </NavLink>
          </li>
        </ul>

        {/* Logout Button */}
        {user && (
          <button
            onClick={handleLogout}
            className="btn btn-outline border-red-700 text-red-700 mt-4 flex items-center gap-2 justify-center"
          >
            <FaSignOutAlt /> Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardSideBar;
