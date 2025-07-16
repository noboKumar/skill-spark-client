import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Pagination from "../components/UI/Pagination";
import { Link } from "react-router";
import { axiosPublic } from "../API/utils";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { Helmet } from "react-helmet";

const AllClasses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { data: allClasses } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/accepted-classes");
      return data;
    },
  });
  if (!allClasses || allClasses.length === 0) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allClasses?.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div>
      <Helmet>
        <title>Skill Spark | all classes</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-10 text-primary divider heading-font">
        All Classes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(currentItems || []).map((data) => (
          <div
            key={data._id}
            className="bg-base-200 rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-transform duration-300 hover:scale-[1.02] flex flex-col"
          >
            <figure>
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-60 object-cover"
              />
            </figure>

            <div className="p-5 space-y-3 flex flex-col justify-between h-full">
              <div className="flex-grow space-y-3">
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
                    <span className="font-medium">Enrollment:</span>{" "}
                    {data.total_enrollment}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <Link to={`/classes/${data._id}`}>
                  <button className="w-full btn btn-primary rounded-full">
                    Enroll Now
                  </button>
                </Link>
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
