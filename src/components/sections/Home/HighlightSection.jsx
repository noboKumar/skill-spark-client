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
      <HeadingText>Highlighted Classes</HeadingText>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {(highlightClass || []).map((slider, index) => (
          <div
            key={index}
            className="bg-base-100 rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            {/* Image */}
            <img
              src={slider.image}
              alt={slider.title}
              className="w-full h-56 object-cover object-center"
            />

            {/* Content */}
            <div className="p-6 space-y-3 flex flex-col flex-1 bg-base-200">
              {/* Title & Description */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-primary leading-snug">
                  {slider.title}
                </h2>
                <p className="text-gray-600 text-sm md:text-base line-clamp-2">
                  {slider.description}
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  <FaUsers className="text-base" />
                  {slider.total_enrollment} Enrolled
                </div>
                <div className="flex items-center gap-2 bg-primary text-white px-4 py-1 rounded-full font-semibold text-sm">
                  <IoIosPricetags className="text-base" />${slider.price}
                </div>
              </div>

              {/* Button at the bottom */}
              <div className="pt-2 mt-auto">
                <Link to={`/classes/${slider._id}`}>
                  <button className="btn btn-primary btn-block rounded-full">
                    {slider.buttonText || "Join Class"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighlightSection;
