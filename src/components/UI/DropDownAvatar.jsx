import React from "react";
import useAuth from "../../hooks/useAuth";
import { FaChevronDown, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const DropDownAvatar = () => {
  const { user, logOutUser } = useAuth();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOutUser();
        queryClient.clear();
        toast.success("Successfully logged out!");
      }
    });
  };

  return (
    <div className="dropdown dropdown-end">
      {/* Trigger Button */}
      <div
        tabIndex={0}
        role="button"
        className="flex items-center gap-2 cursor-pointer p-2 border border-gray-300 rounded-full hover:shadow-md transition"
      >
        <img
          src={user?.photoURL}
          alt="profile"
          className="md:w-10 md:h-10 w-8 rounded-full"
        />
        <FaChevronDown className="text-sm" />
      </div>

      {/* Dropdown Menu */}
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-300 w-52 mt-3 p-2 shadow-md rounded-box border border-gray-300 z-[100]"
      >
        <li className="text-center font-semibold text-lg">
          {user?.displayName || "User"}
        </li>
        <div className="divider my-0"></div>
        <li>
          <Link to="/dashboard" className="flex items-center gap-2">
            <FaTachometerAlt />
            Dashboard
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-left"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DropDownAvatar;
