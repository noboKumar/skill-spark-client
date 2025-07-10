import React from "react";
import logo from "../../assets/Skill-spark-logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="flex items-center gap-2">
        <img className="h-15 w-15" src={logo} alt="Logo" />
        <h1 className="text-2xl font-bold heading-font text-shadow-2xs">
          {/* TODO: add dual color text */}
          <span className="text-primary">Skill</span>{" "}
          <span className="text-[#d6a70d]">Spark</span>
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
