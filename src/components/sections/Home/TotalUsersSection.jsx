import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosPublic } from "../../../API/utils";
import LoadingSpinner from "../../UI/LoadingSpinner";
import illustrator from "../../../assets/Webinar-bro.svg";

const TotalUsersSection = () => {
  const { data: allUsersData, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("all-users-stats");
      return data;
    },
  });
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  console.log(allUsersData);
  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 mb-20">
        {/* Stats Card */}
        <div className="bg-base-200 p-8 rounded-4xl w-full md:w-1/2 space-y-5 shadow-inner border border-gray-200">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Total Users
          </h2>

          <div className="flex flex-col items-center justify-between bg-white p-4 rounded-full shadow">
            <span className="text-lg font-medium text-gray-600">
              Total Users
            </span>
            <span className="text-4xl font-bold text-primary">
              {allUsersData.totalUsers}
            </span>
          </div>

          <div className="flex flex-col items-center justify-between bg-white p-4 rounded-full shadow">
            <span className="text-lg font-medium text-gray-600">
              Total Classes
            </span>
            <span className="text-4xl font-bold text-primary">
              {allUsersData.totalClasses}
            </span>
          </div>

          <div className="flex flex-col items-center justify-between bg-white p-4 rounded-full shadow">
            <span className="text-lg font-medium text-gray-600">
              Total Students
            </span>
            <span className="text-4xl font-bold text-primary">
              {allUsersData.totalEnrollments}
            </span>
          </div>
        </div>

        {/* Right Side Illustration */}
        <div className="w-full md:w-1/2">
          <img
            src={illustrator}
            alt="Statistics Illustration"
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default TotalUsersSection;
