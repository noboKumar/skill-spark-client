import React from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const { data: roleData, isLoading } = useQuery({
    queryKey: ["role"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/role/${user?.email}`);
      return data;
    },
    enabled: !!user,
  });

  return { role: roleData?.role, isLoading };
};

export default useRole;
