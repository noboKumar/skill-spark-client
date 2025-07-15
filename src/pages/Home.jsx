import React from "react";
import BannerSection from "../components/sections/Home/BannerSection";
import PartnershipSection from "../components/sections/Home/PartnershipSection";
import BecomeATeacher from "../components/sections/Home/BecomeATeacher";
import HighlightSection from "../components/sections/Home/HighlightSection";

const Home = () => {
  return (
    <div>
      <BannerSection></BannerSection>
      <PartnershipSection></PartnershipSection>
      <HighlightSection></HighlightSection>
      {/* feedback section */}
      {/* Total users section */}
      <BecomeATeacher></BecomeATeacher>
      {/* extra 2 section */}
    </div>
  );
};

export default Home;
