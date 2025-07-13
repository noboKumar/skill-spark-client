import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { axiosSecure } from "../hooks/useAxiosSecure";
import Pagination from "../components/UI/Pagination";

const AllClasses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { data: allClasses } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/accepted-classes");
      return data;
    },
  });
  console.log(allClasses);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allClasses?.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-10 text-primary">
        All Classes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(currentItems || []).map((data) => (
          <div
            key={data._id}
            className=" bg-base-200 rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
          >
            <figure>
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-60 object-cover"
              />
            </figure>

            <div className="p-5 space-y-3">
              <h2 className="text-xl font-bold">{data.title}</h2>

              <p className="text-lg font-bold text-primary badge badge-secondary border-b-2 border-gray-400">
                ${data.price}
              </p>

              <p className=" text-sm line-clamp-3">{data.description}</p>

              <div className="text-sm  space-y-1">
                <p>
                  <span className="font-medium">Instructor:</span> {data.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {data.email}
                </p>
                <p>
                  <span className="font-medium">Enrollment:</span> 0
                </p>
              </div>

              <div className="pt-4">
                <button className="w-full btn btn-primary rounded-md">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
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

export default AllClasses;
