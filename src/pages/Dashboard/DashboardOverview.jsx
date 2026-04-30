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
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold heading-font gradient-text">Dashboard Overview</h2>
          <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "Total Users", value: allUsersData.totalUsers, color: "bg-blue-500", icon: "👥" },
          { label: "Total Classes", value: allUsersData.totalClasses, color: "bg-amber-500", icon: "📚" },
          { label: "Total Enrollments", value: allUsersData.totalEnrollments, color: "bg-emerald-500", icon: "✅" },
        ].map((stat, i) => (
          <div key={i} className="glass-effect p-6 rounded-2xl shadow-sm border flex items-center gap-4 hover:shadow-md transform hover:-translate-y-1 transition-all">
            <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl text-white shadow-lg`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="glass-effect p-10 rounded-3xl shadow-lg border mt-10">
        <h3 className="text-xl font-semibold mb-6">Activity Summary</h3>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartArray} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
              />
              <Bar dataKey="value" fill="url(#colorValue)" radius={[8, 8, 0, 0]} barSize={60}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={1}/>
                  </linearGradient>
                </defs>
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
