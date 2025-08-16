import React from "react";
import slider1 from "../../../assets/slider-1.webp";
import slider2 from "../../../assets/slider-2.webp";
import slider3 from "../../../assets/slider-3.webp";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import { Link } from "react-router";

const bannerData = [
  {
    image: slider1,
    title: "Empower Your Learning Journey",
    paragraph:
      "Master real-world skills from the comfort of your home with Skill Spark. Whether you're just starting or looking to upgrade, our expert-led courses have you covered. Enroll today and get up to 40% off on premium plans!",
    buttonText: "Explore Courses",
  },
  {
    image: slider2,
    title: "Flexible Learning, Your Way",
    paragraph:
      "Learn on your own terms — anytime, anywhere — using your tablet or mobile. With over 100+ interactive courses, you're in control of your growth. Sign up now and enjoy an exclusive 30% discount for new users!",
    buttonText: "Start Learning",
  },
  {
    image: slider3,
    title: "Connect. Learn. Grow.",
    paragraph:
      "Join engaging live classes, connect with top mentors, and become part of a vibrant learning community. Plus, don’t miss our limited-time offer: get lifetime access to all courses at 50% off!",
    buttonText: "Join Now",
  },
];

const BannerSection = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      loop={bannerData.length > 3}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="mySwiper"
    >
      {bannerData.map((slider, index) => (
        <SwiperSlide key={index}>
          <div className="relative">
            {/* slider image */}
            <img
              className="w-full h-[300px] md:h-[600px] rounded-2xl object-cover"
              src={slider.image}
              alt="slider images"
            />
            {/* black overlay */}
            <div className="absolute inset-0  bg-black/60 rounded-2xl"></div>

            {/* animation div */}
            <div className="absolute inset-0 flex items-center justify-center z-10 text-white px-4 text-center">
              {/* text and buttons */}
              <div className="w-full md:w-2/3 lg:w-1/2 space-y-2 md:space-y-5">
                <h1 className="lg:text-7xl md:text-5xl text-2xl marcellus heading-font">
                  {slider.title}
                </h1>
                <p className="md:text-xl line-clamp-3 md:line-clamp-5">
                  {slider.paragraph}
                </p>
                <Link
                  to={"/all-classes"}
                  className="btn bg-primary rounded-full border-none shadow text-white"
                >
                  {slider.buttonText}
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSection;
