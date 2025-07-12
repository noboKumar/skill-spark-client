import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const TeacherRequest = () => {
  const { user } = useAuth();
  const QueryClient = useQueryClient();

  //   approve teacher request
  const { mutate: approveTeacherRequest } = useMutation({
    mutationKey: ["approve-teacher-request"],
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/teacher-requests/approve/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Approved successfully!");
      QueryClient.invalidateQueries(["get-teacher-request"]);
    },
    onError: () => {
      toast.error("Approval failed.");
    },
  });
  // promote to teacher
  const { mutate: promoteToTeacher } = useMutation({
    mutationKey: ["update-role-teacher"],
    mutationFn: async (email) => {
      const res = await axiosSecure.patch(`/user/role/${email}`);
      return res.data;
    },
  });
  //   reject teacher request
  const { mutate: rejectTeacherRequest } = useMutation({
    mutationKey: ["approve-teacher-request"],
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/teacher-requests/reject/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Rejected successfully!");
      QueryClient.invalidateQueries(["get-teacher-request"]);
    },
    onError: () => {
      toast.error("Rejection failed.");
    },
  });
  //   get teacher request
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

  const handleApprove = (id, email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Approve this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Approve!",
    }).then((result) => {
      if (result.isConfirmed) {
        approveTeacherRequest(id);
        promoteToTeacher(email);
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Reject this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reject!",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectTeacherRequest(id);
      }
    });
  };

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
          {teacherRequestData?.map?.((data, index) => (
            <tr key={data._id}>
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
                    <div className="badge badge-secondary text-[var(--color-text)] font-semibold rounded-full">
                      <div className="inline-grid *:[grid-area:1/1]">
                        <div className="status status-error animate-ping"></div>
                        <div className="status status-error"></div>
                      </div>{" "}
                      {data.status}
                    </div>
                  </>
                ) : (
                  <p
                    className={`badge ${
                      data.status === "approved"
                        ? "badge-success"
                        : "badge-error"
                    } text-white font-semibold rounded-full`}
                  >
                    {data.status}
                  </p>
                )}
              </td>
              <td className="flex flex-col gap-3">
                <button
                  disabled={data.status === "rejected"}
                  onClick={() => handleApprove(data._id, data.email)}
                  className="btn btn-sm btn-success rounded-full text-white flex items-center gap-2"
                >
                  <FaCheckCircle className="text-lg" />
                  Approve
                </button>
                <button
                  disabled={data.status === "rejected"}
                  onClick={() => handleReject(data._id)}
                  className="btn btn-sm btn-error rounded-full text-white flex items-center gap-2"
                >
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
