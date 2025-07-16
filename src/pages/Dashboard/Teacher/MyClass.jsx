import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  FaChalkboardTeacher,
  FaEdit,
  FaInfoCircle,
  FaRegSadTear,
  FaTrashAlt,
} from "react-icons/fa";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import UpdateMyClassModal from "./UpdateMyClassModal";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const MyClass = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [classId, setClassId] = useState(null);
  const queryClient = useQueryClient();

  const { data: myClasses } = useQuery({
    queryKey: ["my-classes"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-class/${user?.email}`);
      return data;
    },
  });

  const { mutate: deleteClass } = useMutation({
    mutationKey: ["delete-class"],
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/my-class/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-classes"]);
      toast.success("Class deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting class:", error);
      toast.error("Failed to delete class.");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this class?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteClass(id);
      }
    });
  };

  if (!myClasses || myClasses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 bg-base-200 rounded-xl shadow-md">
        <FaRegSadTear className="text-6xl text-warning mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">
          No Classes Added Yet
        </h2>
        <p className="text-gray-500 mt-2 max-w-md">
          You haven't added any classes. Click on{" "}
          <Link
            to="/dashboard/add-class"
            className="font-semibold text-primary"
          >
            "Add Class"
          </Link>{" "}
          to start sharing your knowledge!
        </p>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-primary flex items-center justify-center gap-2">
        <FaChalkboardTeacher className="text-4xl text-primary" />
        My Added Classes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(myClasses || []).map((data) => (
          <div
            key={data._id}
            className="card bg-base-100 shadow-md border border-gray-200"
          >
            <figure>
              <img
                src={data.image}
                alt={data.title}
                className="w-full md:h-52 object-cover"
              />
            </figure>
            <div className="card-body space-y-2">
              <h2 className="card-title text-xl">{data.title}</h2>
              <p className="text-sm line-clamp-4">{data.description}</p>
              <p>
                <span className="font-semibold">Name:</span> {data.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {data.email}
              </p>
              <p>
                <span className="font-semibold">Price:</span> ${data.price}
              </p>
              <div className="flex items-center gap-2">
                <span
                  className={`badge px-3 py-1 text-white font-semibold rounded-full ${
                    data.status === "pending"
                      ? "bg-yellow-500"
                      : data.status === "approved"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {data.status}
                </span>
              </div>
              <div className="card-actions lg:justify-between pt-4">
                <button
                  onClick={() => {
                    setIsOpen(true);
                    setClassId(data._id);
                  }}
                  className="btn btn-sm btn-warning flex items-center gap-1 rounded-full"
                >
                  <FaEdit />
                  Update
                </button>
                <button
                  onClick={() => handleDelete(data._id)}
                  className="btn btn-sm btn-error text-white flex items-center gap-1 rounded-full"
                >
                  <FaTrashAlt />
                  Delete
                </button>
                {data.status === "approved" ? (
                  <Link to={`/dashboard/my-class/${data._id}`}>
                    <button
                      disabled={data.status !== "approved"}
                      className="btn btn-sm btn-primary flex items-center gap-1 rounded-full"
                    >
                      <FaInfoCircle />
                      See Details
                    </button>
                  </Link>
                ) : (
                  <button
                    disabled={data.status !== "approved"}
                    className="btn btn-sm btn-primary flex items-center gap-1 rounded-full"
                  >
                    <FaInfoCircle />
                    See Details
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <UpdateMyClassModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        classId={classId}
      ></UpdateMyClassModal>
    </div>
  );
};

export default MyClass;
