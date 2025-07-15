import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router";

const MyEnrollClass = () => {
  const { user } = useAuth();

  const { data: myEnrollments, isLoading } = useQuery({
    queryKey: ["myEnrollments"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/enrollments/${user.email}`);
      return data;
    },
  });
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-10 divider">
        My Enroll Class
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {myEnrollments.map((enrollmentData) => (
          <div
            key={enrollmentData._id}
            className="bg-base-200 rounded-xl shadow-lg border border-gray-300 overflow-hidden"
          >
            <img
              src={enrollmentData.image}
              alt={enrollmentData.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-5 flex flex-col">
              <div className="flex-grow space-y-4">
                <h2 className="text-2xl font-bold text-primary">
                  {enrollmentData.title}
                </h2>
                <p className="flex items-center gap-2 text-gray-600">
                  <FaChalkboardTeacher className="text-lg text-primary" />
                  <span className="font-medium">Instructor:</span>{" "}
                  {enrollmentData.name}
                </p>
              </div>

              <div className="pt-3 flex justify-end">
                <Link to={`/dashboard/my-enroll-class/${enrollmentData._id}`}>
                  <button className="btn btn-primary btn-sm rounded-full">
                    Continue Class
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

export default MyEnrollClass;
