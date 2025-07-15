import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { MdAssignmentLate } from "react-icons/md";
import Pagination from "../../../components/UI/Pagination";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyEnrollClassDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: myAssignments } = useQuery({
    queryKey: ["myAssignments"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-assignments/${id}`);
      return data;
    },
  });

  const { mutate: submitAssignment, isPending } = useMutation({
    mutationKey: ["submit-assignment"],
    mutationFn: async () => {
      const { data } = await axiosSecure.patch(`/assignment-submit/${id}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Assignment submitted successfully!");
      setIsSubmitted(true);
    },
    onError: () => {
      toast.error("Assignment submission failed.");
    },
  });

  const handleSubmit = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Confirm assignment submission?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        submitAssignment();
      }
    });
  };

  if (myAssignments?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <MdAssignmentLate className="text-6xl text-primary" />
        <h2 className="text-2xl font-semibold">No Assignments Found</h2>
        <p className="md:max-w-md">
          You haven't received any assignments for this class yet. Please check
          back later!
        </p>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline btn-primary flex items-center gap-2"
        >
          <FaArrowLeft />
          Back
        </button>
      </div>
    );
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = myAssignments?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-10 divider">
        Class Assignment
      </h1>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(currentItems || []).map((data, index) => (
              <tr key={data._id}>
                <td>{index + 1}</td>
                <td className="font-semibold">{data.title}</td>
                <td className="max-w-sm">{data.description}</td>
                <td className="text-red-500 font-semibold">{data.deadline}</td>
                <td>
                  <button
                    onClick={handleSubmit}
                    disabled={isPending || isSubmitted}
                    className="btn btn-primary btn-sm flex items-center gap-2"
                  >
                    <FaCheckCircle className="text-lg" />
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={myAssignments?.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></Pagination>
    </div>
  );
};

export default MyEnrollClassDetails;
