import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { Rating } from "react-simple-star-rating";
import { FaQuoteLeft } from "react-icons/fa";
import Marquee from "react-fast-marquee";
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
    <div className="my-24 overflow-hidden">
      <HeadingText>Student Success Stories</HeadingText>
      
      <div className="relative mt-12">
        {/* Decorative background elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-32 h-full bg-gradient-to-r from-base-100 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-32 h-full bg-gradient-to-l from-base-100 to-transparent z-10 pointer-events-none"></div>

        <Marquee speed={40} gradient={false} pauseOnHover={true}>
          <div className="flex gap-8 py-10 px-4">
            {feedbackData.map((feedback, index) => (
              <div 
                key={index} 
                className="w-[350px] md:w-[400px] glass-effect p-8 rounded-3xl border border-base-300/50 shadow-sm hover:shadow-xl hover:scale-110 transition-all duration-500 group relative flex flex-col items-center text-center space-y-6"
              >
                {/* Semiclone/Quote Icon */}
                <div className="absolute -top-5 left-8 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <FaQuoteLeft size={20} />
                </div>

                <div className="avatar">
                  <div className="w-24 rounded-full ring-4 ring-primary/20 ring-offset-base-100 ring-offset-2 mx-auto overflow-hidden group-hover:ring-primary/40 transition-all duration-500">
                    <img src={feedback.student_image} alt={feedback.student_name} className="object-cover" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold heading-font">{feedback.student_name}</h3>
                    <p className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
                      {feedback.class_name}
                    </p>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                    "{feedback.description}"
                  </p>
                  
                  <div className="pt-2 border-t border-base-300/30">
                    <Rating
                      initialValue={feedback.rating}
                      readonly
                      size={24}
                      SVGstyle={{ display: "inline" }}
                      fillColor="#f59e0b"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default FeedBackSection;
