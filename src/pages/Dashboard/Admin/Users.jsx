import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import Pagination from "../../../components/UI/Pagination";
import { FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const Users = () => {
  const QueryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-users");
      return data;
    },
  });

  const { mutate: makeAdmin } = useMutation({
    mutationKey: ["make-admin"],
    mutationFn: async (email) => {
      const res = await axiosSecure.patch(`/user/make-admin/${email}`);
      return res.data;
    },
    onSuccess: () => {
      QueryClient.invalidateQueries(["users"]);
    },
    onError: () => {
      console.log("error");
    },
  });

  const handleMakeAdmin = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Make this user an admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdmin(email);
      }
    });
  };

  const isArray = Array.isArray(users);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = isArray
    ? users.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  if (!users || users.length === 0 || isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {(currentItems || []).map((data, index) => (
              <tr key={data._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    className="w-36 h-36 object-cover object-top rounded-2xl"
                    src={data.photoURL}
                    alt=""
                  />
                </td>
                <td className="font-semibold">{data.displayName}</td>
                <td>{data.email}</td>
                <td>
                  <span
                    className={`badge font-semibold rounded-full text-white px-5 py-4 ${
                      data.role === "admin"
                        ? "bg-red-600"
                        : data.role === "teacher"
                        ? "bg-yellow-500"
                        : "bg-green-600"
                    }`}
                  >
                    {data.role}
                  </span>
                </td>
                <td className="text-center">
                  <button
                    disabled={data.role === "admin"}
                    onClick={() => handleMakeAdmin(data.email)}
                    className="btn bg-indigo-500 text-white rounded-full"
                  >
                    <FaUserShield className="text-lg" />
                    Make Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalItems={users?.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></Pagination>
    </div>
  );
};

export default Users;
