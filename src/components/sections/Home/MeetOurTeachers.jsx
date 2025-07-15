import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosPublic } from "../../../API/utils";
import LoadingSpinner from "../../UI/LoadingSpinner";
import HeadingText from "../../UI/HeadingText";
import { FaEnvelope } from "react-icons/fa";

const MeetOurTeachers = () => {
  const { data: teacherData, isLoading } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/teachers");
      return res.data;
    },
  });
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  console.log(teacherData);
  return (
    <div className="mb-20 px-4">
      <HeadingText>Meet Our Teachers</HeadingText>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {teacherData.map((teacher, index) => (
          <div
            key={index}
            className="bg-base-200 rounded-xl shadow-lg border-2 border-gray-300 p-6 text-center space-y-4"
          >
            {/* Avatar */}
            <div className="avatar mx-auto">
              <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={teacher.photoURL} alt={teacher.name} />
              </div>
            </div>

            {/* Name */}
            <h2 className="text-xl font-semibold text-primary">
              {teacher.displayName}
            </h2>

            {/* Email */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <FaEnvelope />
              <span className="break-all">{teacher.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetOurTeachers;
