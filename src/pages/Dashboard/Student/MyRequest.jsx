import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import Pagination from "../../../components/UI/Pagination";
import { FaRegPaperPlane } from "react-icons/fa";
import { Helmet } from "react-helmet";

const MyRequest = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: myRequest } = useQuery({
    queryKey: ["get-my-request"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-requests/${user?.email}`);
      return res.data;
    },
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = myRequest?.slice(indexOfFirstItem, indexOfLastItem);

  if (!myRequest || myRequest.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-10 bg-base-200 rounded-xl mt-10 shadow">
        <FaRegPaperPlane className="text-6xl text-primary mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold text-primary mb-2">
          No Requests Yet
        </h2>
        <p className="text-gray-600 max-w-md">
          You haven’t submitted a request to become a teacher on{" "}
          <span className="font-semibold">SkillSpark</span> yet.
          <br />
          Start your journey by filling out the teaching application form!
        </p>
      </div>
    );
  }
  return (
    <div>
      <Helmet>
        <title>Skill Spark | my request</title>
      </Helmet>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Experience</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map?.((data, index) => (
              <tr key={data._id}>
                <td>{index + 1}</td>
                <td>{data.title}</td>
                <td>{data.category}</td>
                <td>{data.experience}</td>
                <td>{data.created_at}</td>
                <td>{data.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={myRequest?.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></Pagination>
    </div>
  );
};

export default MyRequest;
