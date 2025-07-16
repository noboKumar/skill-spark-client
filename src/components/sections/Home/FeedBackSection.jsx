import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { Rating } from "react-simple-star-rating";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import HeadingText from "../../UI/HeadingText";
import LoadingSpinner from "../../UI/LoadingSpinner";

const FeedBackSection = () => {
  const { data: feedbackData } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/feedback");
      return data;
    },
  });
  if (!feedbackData || feedbackData.length === 0) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div className="mb-20">
      <HeadingText>Students FeedBack</HeadingText>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        navigation={true}
        className="mySwiper"
      >
        {feedbackData.map((slider, index) => (
          <SwiperSlide key={index}>
            <div className="p-5 bg-base-200 rounded-2xl border-2 border-gray-300 flex flex-col justify-center mx-auto text-center space-y-5 h-[500px]">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-36 rounded-full ring-2 ring-offset-2 mx-auto">
                  <img src={slider.student_image} alt="" />
                </div>
              </div>
              <div className="space-y-2 flex flex-col justify-between items-center">
                <h1 className="text-xl font-semibold">{slider.student_name}</h1>
                <p className="text-lg w-1/2 mx-auto line-clamp-4">
                  "{slider.description}"
                </p>
                <Rating
                  initialValue={slider.rating}
                  readonly
                  size="30"
                  SVGstyle={{ display: "inline" }}
                ></Rating>
                <h3 className="text-lg font-semibold text-primary">
                  {slider.class_name}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeedBackSection;
