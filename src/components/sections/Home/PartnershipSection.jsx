import React from "react";
import coursera from "../../../assets/Coursera.png";
import edx from "../../../assets/edx.png";
import udemy from "../../../assets/udemy.png";
import freeCodeCamp from "../../../assets/freeCodeCamp.jpeg";
import khanAcademy from "../../../assets/khanAcademy.png";
import skillshare from "../../../assets/skill-share.png";
import Marquee from "react-fast-marquee";

const partnerIcons = [
  coursera,
  edx,
  udemy,
  freeCodeCamp,
  khanAcademy,
  skillshare,
];
const marqueeItems = [
  ...partnerIcons,
  ...partnerIcons,
  ...partnerIcons,
  ...partnerIcons,
];

const PartnershipSection = () => {
  return (
    <div className="relative py-10">
      <h1 className="text-3xl font-semibold text-center my-10">
        Our Trusted Partners & Platforms
      </h1>
      {/* Left fade */}
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white dark:from-base-100 to-transparent z-10 pointer-events-none"></div>

      {/* Right fade */}
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white dark:from-base-100 to-transparent z-10 pointer-events-none"></div>

      {/* Marquee */}
      <Marquee speed={50} gradient={false}>
        <div className="flex gap-10 items-center px-5">
          {marqueeItems.map((icon, index) => (
            <img
              key={index}
              src={icon}
              alt={`Partner ${index + 1}`}
              className="w-20 rounded-xl grayscale hover:grayscale-0 transition duration-300 ease-in-out cursor-pointer"
            />
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default PartnershipSection;
