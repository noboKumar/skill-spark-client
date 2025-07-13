import { useQuery } from "@tanstack/react-query";
import React from "react";
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

const MyClass = () => {
  const { user } = useAuth();
  const { data: myClasses } = useQuery({
    queryKey: ["my-classes"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-class/${user?.email}`);
      return data;
    },
  });

  if (!myClasses || myClasses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 bg-base-200 rounded-xl shadow-md">
        <FaRegSadTear className="text-6xl text-warning mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">
          No Classes Added Yet
        </h2>
        <p className="text-gray-500 mt-2 max-w-md">
          You haven't added any classes. Click on{" "}
          <Link to="/dashboard/add-class" className="font-semibold text-primary">"Add Class"</Link> to
          start sharing your knowledge!
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
                className="w-full h-52 object-cover"
              />
            </figure>
            <div className="card-body space-y-2">
              <h2 className="card-title text-xl">{data.title}</h2>
              <p className="text-sm">{data.description}</p>
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
              <div className="card-actions justify-between pt-4">
                <button className="btn btn-sm btn-warning flex items-center gap-1 rounded-full">
                  <FaEdit />
                  Update
                </button>
                <button className="btn btn-sm btn-error text-white flex items-center gap-1 rounded-full">
                  <FaTrashAlt />
                  Delete
                </button>
                <button className="btn btn-sm btn-primary flex items-center gap-1 rounded-full">
                  <FaInfoCircle />
                  See Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClass;
