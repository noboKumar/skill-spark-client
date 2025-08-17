import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosPublic } from "../../../API/utils";
import LoadingSpinner from "../../UI/LoadingSpinner";
import illustrator from "../../../assets/Webinar-bro.svg";
import CountUp from "react-countup";
import { FaUsers, FaChalkboardTeacher, FaBook } from "react-icons/fa";

const TotalUsersSection = () => {
  const { data: allUsersData, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("all-users-stats");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const stats = [
    {
      id: 1,
      label: "Total Users",
      value: allUsersData.totalUsers,
      icon: <FaUsers className="text-primary text-4xl" />,
    },
    {
      id: 2,
      label: "Total Classes",
      value: allUsersData.totalClasses,
      icon: <FaChalkboardTeacher className="text-primary text-4xl" />,
    },
    {
      id: 3,
      label: "Total Enrollments",
      value: allUsersData.totalEnrollments,
      icon: <FaBook className="text-primary text-4xl" />,
    },
  ];

  return (
    <div className="my-20 px-4 md:px-10">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6 w-full md:w-1/2">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex items-center gap-5 p-6 rounded-4xl bg-base-200 border border-gray-200 shadow-inner"
            >
              <div className="p-4 bg-primary/10 rounded-full">{stat.icon}</div>
              <div className="flex flex-col">
                <h3 className="text-4xl font-bold text-primary">
                  <CountUp enableScrollSpy={true} end={stat.value} duration={3} suffix="+" />
                </h3>
                <p className="text-lg font-medium text-gray-600">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Illustration */}
        <div className="w-full md:w-2/5">
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
