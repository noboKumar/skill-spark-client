import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import Pagination from "../../../components/UI/Pagination";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const AllClassesRequest = () => {
  const QueryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { data: allClasses, isLoading } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/class-requests");
      return res.data;
    },
  });

  const { mutate: approveClassRequest } = useMutation({
    mutationKey: ["approve-class-request"],
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/class-requests/approve/${id}`);
      return data;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries(["allClasses"]);
    },
    onError: () => {
      console.log("error");
    },
  });

  const { mutate: rejectClassRequest } = useMutation({
    mutationKey: ["reject-class-request"],
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/class-requests/reject/${id}`);
      return data;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries(["allClasses"]);
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleApproved = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Accept this class request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Accept it!",
    }).then((result) => {
      if (result.isConfirmed) {
        approveClassRequest(id);
      }
    });
  };
  const handleRejected = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Reject this class request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectClassRequest(id);
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allClasses?.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Email</th>
              <th>Description</th>
              <th>Status</th>
              <th className="text-center">Action</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data, index) => (
              <tr key={data._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    className="w-44 object-cover object-top rounded-2xl"
                    src={data.image}
                    alt=""
                  />
                </td>
                <td className="font-semibold">{data.title}</td>
                <td>{data.email}</td>
                <td className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                  {data.description}
                </td>
                <td>
                  <span
                    className={`badge font-semibold rounded-full text-white px-5 py-4 ${
                      data.status === "pending"
                        ? "bg-yellow-500"
                        : data.status === "approved"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {data.status}
                  </span>
                </td>
                <td className="text-center flex">
                  <button
                    disabled={data.status !== "pending"}
                    onClick={() => handleApproved(data._id)}
                    className="btn btn-sm btn-success text-white"
                  >
                    <FaCheckCircle className="text-lg" />
                    Approve
                  </button>
                  <button
                    disabled={data.status !== "pending"}
                    onClick={() => handleRejected(data._id)}
                    className="btn btn-sm btn-error text-white ml-2"
                  >
                    <FaTimesCircle className="text-lg" />
                    Reject
                  </button>
                </td>
                <td>
                  <button className="btn">Progress</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={allClasses?.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></Pagination>
    </div>
  );
};
export default AllClassesRequest;
