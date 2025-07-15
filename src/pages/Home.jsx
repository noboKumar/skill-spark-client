import React from "react";
import BannerSection from "../components/sections/Home/BannerSection";
import PartnershipSection from "../components/sections/Home/PartnershipSection";
import BecomeATeacher from "../components/sections/Home/BecomeATeacher";
import HighlightSection from "../components/sections/Home/HighlightSection";
import FeedBackSection from "../components/sections/Home/FeedBackSection";
import TotalUsersSection from "../components/sections/Home/TotalUsersSection";
import MeetOurTeachers from "../components/sections/Home/MeetOurTeachers";
import QnaSection from "../components/sections/Home/QnaSection";

const Home = () => {
  return (
    <div>
      <BannerSection></BannerSection>
      <PartnershipSection></PartnershipSection>
      <HighlightSection></HighlightSection>
      <FeedBackSection></FeedBackSection>
      <TotalUsersSection></TotalUsersSection>
      <BecomeATeacher></BecomeATeacher>
      <MeetOurTeachers></MeetOurTeachers>
      <QnaSection></QnaSection>
    </div>
  );
};

export default Home;
