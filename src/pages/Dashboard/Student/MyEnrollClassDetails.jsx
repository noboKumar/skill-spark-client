import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import { FaCheckCircle } from "react-icons/fa";
import Pagination from "../../../components/UI/Pagination";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaClipboardList } from "react-icons/fa";
import FeedBackModal from "./FeedBackModal";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet";

const MyEnrollClassDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const itemsPerPage = 10;
  const { id } = useParams();

  const { data: myAssignments } = useQuery({
    queryKey: ["myAssignments", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-assignments/${id}`);
      return data;
    },
  });

  const { mutate: submitAssignment } = useMutation({
    mutationKey: ["submit-assignment"],
    mutationFn: async () => {
      const { data } = await axiosSecure.patch(`/assignment-submit/${id}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Assignment submitted successfully!");
    },
    onError: () => {
      toast.error("Assignment submission failed.");
    },
  });

  const { data: myEnrollments } = useQuery({
    queryKey: ["myEnrollments"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/enrollments/${user?.email}`);
      return data;
    },
  });
  const classInfo = myEnrollments?.find((data) => data._id === id);

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

  const isArray = Array.isArray(myAssignments);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = isArray
    ? myAssignments.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  return (
    <div>
      <Helmet>
        <title>Skill Spark | my class details</title>
      </Helmet>
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-outline btn-primary rounded-full gap-2 shadow-sm hover:shadow-md transition-all"
        >
          <FaClipboardList className="text-lg" />
          Teaching Evaluation Report
        </button>
      </div>
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
      <FeedBackModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        classInfo={classInfo}
      ></FeedBackModal>
    </div>
  );
};

export default MyEnrollClassDetails;
