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
    <div className="relative pb-20 overflow-hidden">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center my-12 heading-font gradient-text">
        Our Trusted Partners & Platforms
      </h1>
      
      {/* Left fade */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-base-100 to-transparent z-10 pointer-events-none"></div>

      {/* Right fade */}
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-base-100 to-transparent z-10 pointer-events-none"></div>

      {/* Marquee */}
      <Marquee speed={60} gradient={false} pauseOnHover={true}>
        <div className="flex gap-12 items-center px-6 py-4">
          {marqueeItems.map((icon, index) => (
            <div key={index} className="w-24 h-16 flex items-center justify-center p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-base-300/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
              <img
                src={icon}
                alt={`Partner ${index + 1}`}
                className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 scale-90 group-hover:scale-100"
              />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default PartnershipSection;
