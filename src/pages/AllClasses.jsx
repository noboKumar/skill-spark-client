import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Pagination from "../components/UI/Pagination";
import { Link } from "react-router";
import { axiosPublic } from "../API/utils";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { Helmet } from "react-helmet";

import CourseCard from "../components/UI/CourseCard";

const AllClasses = () => {
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Adjusted for better grid layout

  const { data: allClasses } = useQuery({
    queryKey: ["allClasses", sortOption],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/accepted-classes", {
        params: { sort: sortOption },
      });
      return data;
    },
  });

  // handle sorting
  const handleSorting = (e) => {
    const value = e.target.value;
    setSortOption(value);
  };

  if (!allClasses || allClasses.length === 0) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const searchClass = allClasses.filter(
    (cls) =>
      cls.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchClass?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="pb-20">
      <Helmet>
        <title>Skill Spark | All Classes</title>
      </Helmet>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold heading-font gradient-text mb-4">
          Explore All Classes
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Discover a wide range of expert-led courses designed to help you master new skills and advance your career.
        </p>
      </div>

      {/* Filtering & Sorting */}
      <div className="glass-effect p-6 rounded-3xl mb-12 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm border border-base-300/50">
        {/* search */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search by class title or instructor..."
            className="input input-bordered w-full rounded-2xl bg-base-100 pl-12 shadow-sm focus:ring-2 focus:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <span className="text-sm font-semibold text-gray-500 whitespace-nowrap">Sort By:</span>
          <select
            onChange={handleSorting}
            defaultValue="Sort By"
            className="select select-bordered rounded-2xl bg-base-100 shadow-sm min-w-[180px] focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option disabled={true}>Sort By</option>
            <option value={"high-low"}>Price: High to Low</option>
            <option value={"low-high"}>Price: Low to High</option>
            <option value={"reset"}>Default Order</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {(currentItems || []).map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>

      {searchClass?.length > itemsPerPage && (
        <div className="mt-16">
          <Pagination
            totalItems={searchClass?.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default AllClasses;
