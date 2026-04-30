import React from "react";
import HeadingText from "../../UI/HeadingText";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../../API/utils";
import LoadingSpinner from "../../UI/LoadingSpinner";
import CourseCard from "../../UI/CourseCard";

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
    <div className="my-24">
      <HeadingText>Highlighted Classes</HeadingText>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {(highlightClass || []).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default HighlightSection;
