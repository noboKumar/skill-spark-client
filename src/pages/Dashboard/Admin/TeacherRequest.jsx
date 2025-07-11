import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const TeacherRequest = () => {
  const { user } = useAuth();
  const {
    data: teacherRequestData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-teacher-request"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teacher-requests");
      return res.data;
    },
    enabled: !!user,
  });
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-center mb-6 text-error">
          Try Again Later
        </h1>
        <p className="text-center mb-10 text-error">{error.message}</p>
      </div>
    );
  }
  console.log(teacherRequestData);
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Experience</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teacherRequestData.map((data, index) => (
            <tr>
              {/* # */}
              <td>{index + 1}</td>
              <td>
                <img className="w-44 rounded-2xl" src={data.image} alt="" />
              </td>
              <td>{data.name}</td>
              <td>{data.experience}</td>
              <td>{data.title}</td>
              <td>{data.category}</td>
              <td>
                {data.status === "pending" ? (
                  <>
                    <div className="badge badge-secondary text-[var(--color-text)] font-semibold">
                      <div className="inline-grid *:[grid-area:1/1]">
                        <div className="status status-error animate-ping"></div>
                        <div className="status status-error"></div>
                      </div>{" "}
                      {data.status}
                    </div>
                  </>
                ) : (
                  "Approved"
                )}
              </td>
              <td className="flex flex-col gap-3">
                <button className="btn btn-sm btn-success text-white flex items-center gap-2">
                  <FaCheckCircle className="text-lg" />
                  Approve
                </button>
                <button className="btn btn-sm btn-error text-white flex items-center gap-2">
                  <FaTimesCircle className="text-lg" />
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherRequest;
