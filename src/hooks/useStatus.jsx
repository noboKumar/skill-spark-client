import React from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "./useAxiosSecure";

const useStatus = () => {
  const { user } = useAuth();
  const {
    data: requestStatus,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-teacher-request"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher-requests/${user?.email}`);
      return res.data;
    },
    enabled: !!user,
  });
  return { requestStatus, isLoading, error };
};

export default useStatus;
