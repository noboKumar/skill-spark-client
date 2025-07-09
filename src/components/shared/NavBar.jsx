import React from "react";
import Container from "../UI/Container";
import Logo from "../UI/Logo";
import ToggleTheme from "../UI/ToggleTheme";
import { Link } from "react-router";
import { FiLogIn } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { FaSignOutAlt } from "react-icons/fa";
import DropDownAvatar from "../UI/DropDownAvatar";
import { AiOutlineMenu } from "react-icons/ai";

const NavBar = () => {
  const { user } = useAuth();
  const navLinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/all-classes">All Classes</Link>
      </li>
      <li>
        <Link to="/teach-on-skill-spark">Teach on Skill Spark</Link>
      </li>
    </>
  );
  return (
    <div className="bg-base-200 shadow-sm py-2 z-50 sticky top-0">
      <Container className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <AiOutlineMenu size={20} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          {/* logo */}
          <div>
            <Logo />
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-xl gap-2 text-[var(--color-text)] font-semibold">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end gap-5">
          {/* Toggle Theme */}
          <ToggleTheme />
          {user ? (
            <DropDownAvatar />
          ) : (
            <Link to="/login" className="btn btn-primary text-white gap-2">
              <FiLogIn size={18} />
              Sign in
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
