import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosSecure } from "../hooks/useAxiosSecure";
import { useParams } from "react-router";
import { FaChalkboardTeacher, FaEnvelope, FaDollarSign } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { HiOutlineInformationCircle } from "react-icons/hi";

const ClassDetails = () => {
  const { id } = useParams();
  const { data: classDetails } = useQuery({
    queryKey: ["classDetails"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/accepted-classes/${id}`);
      return data;
    },
  });
  console.log(classDetails);
  const { title, description, image, name, email, price } = classDetails;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-base-200 shadow-lg rounded-xl overflow-hidden border-2 border-gray-400">
        <img src={image} alt={title} className="w-full h-96 object-cover" />
        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
            {title}
          </h1>

          <div className="space-y-1">
            <p className="flex items-center gap-2 text-xl">
              <FaChalkboardTeacher className="text-xl text-primary" />
              <span>Teacher:</span> {name}
            </p>
            <p className="flex items-center gap-2 text-xl">
              <FaEnvelope className="text-xl text-primary" />
              <span>Email:</span> {email}
            </p>
            <p className="flex items-center gap-2 text-xl">
              <FaDollarSign className="text-xl text-primary" />
              <span>Price:</span> ${price}
            </p>
          </div>

          <div className="divider"></div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Class Description:</h2>
            <p className="leading-relaxed text-justify">{description}</p>
          </div>
          <div className="divider"></div>

          <div className="pt-4 flex justify-end">
            <button className="btn btn-primary btn-lg flex items-center gap-2">
              <MdOutlinePayment className="text-xl" />
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
