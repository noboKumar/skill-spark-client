import React from "react";
import { useEffect, useState } from "react";
import logo from "../../assets/skill-spark-logo.png";

const PageLoading = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Delay before fade-out animation
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 1500); // logo visible for 1.5s

    // Remove loader after fade-out
    const removeTimer = setTimeout(() => {
      document.getElementById("logo-loader").style.display = "none";
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div
      id="logo-loader"
      className={`fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999] transition-all duration-500 ${
        fadeOut ? "opacity-0 scale-125" : "opacity-100 scale-100"
      }`}
    >
      <div className="flex items-center md:gap-2 animate-blink">
        <img
          className="md:h-15 md:w-15 w-20 h-20 filter grayscale transition-all duration-500"
          src={logo}
          alt="Logo"
        />
        <h1 className="md:text-5xl text-2xl font-bold heading-font text-shadow-2xs">
          <span className="text-primary grayscale-100">Skill</span>{" "}
          <span className="text-[#d6a70d] grayscale-100">Spark</span>
        </h1>
      </div>
    </div>
  );
};

export default PageLoading;
