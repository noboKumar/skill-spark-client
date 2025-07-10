import React from "react";
import useAuth from "../../hooks/useAuth";
import { FaChevronDown } from "react-icons/fa";
import { FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";

const DropDownAvatar = () => {
  const { user, logOutUser } = useAuth();
  //!   TODO: Add Confirm Swal before logging out
  return (
    <>
      {/* Trigger Button */}
      <button
        className="flex items-center gap-2 cursor-pointer p-2 border border-gray-300 rounded-full hover:shadow-md transition"
        popoverTarget="user-dropdown-popover"
        style={{ anchorName: "--user-dropdown-anchor" }}
      >
        <img
          src={user?.photoURL}
          alt="profile"
          className="w-10 h-10 rounded-full"
        />
        <FaChevronDown className="text-sm" />
      </button>

      {/* Dropdown Menu */}
      <ul
        className="dropdown menu w-40 rounded-box bg-base-300 shadow-sm z-10 font-semibold text-[var(--color-text)] border border-gray-300"
        popover="auto"
        id="user-dropdown-popover"
        style={{ positionAnchor: "--user-dropdown-anchor" }}
      >
        <p className="font-semibold text-lg text-center">
          {user?.displayName || "User"}
        </p>
        <div className="divider my-0"></div>
        <li>
          <a className="flex items-center gap-2">
            <FaTachometerAlt />
            Dashboard
          </a>
        </li>
        <li>
          <button
            onClick={logOutUser}
            className="flex items-center gap-2 w-full text-left"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </li>
      </ul>
    </>
  );
};

export default DropDownAvatar;
