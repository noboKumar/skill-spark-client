import React from "react";
import logo from "../../assets/Skill-spark-logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="flex items-center md:gap-2">
        <img className="md:h-15 md:w-15 w-10 h-10" src={logo} alt="Logo" />
        <h1 className="md:text-2xl text-lg font-bold heading-font text-shadow-2xs">
          {/* TODO: add dual color text */}
          <span className="text-primary">Skill</span>{" "}
          <span className="text-[#d6a70d]">Spark</span>
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
