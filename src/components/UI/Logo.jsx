import React from "react";
import logo from "../../assets/Skill-spark-logo.png";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img className="h-15 w-15" src={logo} alt="Logo" />
      <h1 className="text-2xl font-bold heading-font text-shadow-2xs">
        {/* TODO: add dual color text */}
        <span>Skill</span> <span>Spark</span>
      </h1>
    </div>
  );
};

export default Logo;
