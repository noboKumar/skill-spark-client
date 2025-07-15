import React from "react";
import HeadingText from "../../UI/HeadingText";
import { useQuery } from "@tanstack/react-query";
import { FaUsers } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import { Link } from "react-router";
import { axiosPublic } from "../../../API/utils";
import LoadingSpinner from "../../UI/LoadingSpinner";

const HighlightSection = () => {
  const { data: highlightClass, isLoading } = useQuery({
    queryKey: ["highlightClass"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/highlight-classes");
      return data;
    },
  });
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div className="mb-20">
      <HeadingText>Highlight Classes</HeadingText>

      <div>
        {highlightClass?.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            loop={highlightClass.length > 3}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            navigation={true}
            className="mySwiper"
          >
            {(highlightClass || []).map((slider, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col md:flex-row bg-base-100 rounded-2xl shadow-md overflow-hidden border border-gray-200 p-5">
                  {/* Class Image */}
                  <img
                    src={slider.image}
                    alt={slider.title}
                    className="w-full h-60 rounded-2xl md:w-1/2 md:h-80 object-cover object-center"
                  />

                  <div className="p-6 flex flex-col justify-around space-y-2 md:w-1/2 bg-base-200 rounded-r-2xl">
                    {/* Title & Description */}
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold text-primary leading-snug">
                        {slider.title}
                      </h2>
                      <p className="text-gray-600 text-sm md:text-base line-clamp-4">
                        {slider.description}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-3 items-center">
                      {/* Enrollments */}
                      <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-lg font-medium">
                        <FaUsers className="text-base" />
                        {slider.total_enrollment} Enrolled
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 bg-primary text-white px-4 py-1 rounded-full font-semibold text-lg">
                        <IoIosPricetags className="text-base" />${slider.price}
                      </div>
                    </div>

                    {/* Button */}
                    <div className="pt-2">
                      <Link to={`/classes/${slider._id}`}>
                        <button className="btn btn-primary btn-wide rounded-full">
                          {slider.buttonText || "Join Class"}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default HighlightSection;
