import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { axiosPublic } from "../../API/utils";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const DashboardOverview = () => {
  const { data: allUsersData, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("all-users-stats");
      return data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  const chartArray = [
    { name: "Users", value: allUsersData.totalUsers },
    { name: "Classes", value: allUsersData.totalClasses },
    { name: "Enrollments", value: allUsersData.totalEnrollments },
  ];
  return (
    <div className="bg-base-200 p-8 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-3xl font-bold mb-6">Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartArray}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardOverview;
