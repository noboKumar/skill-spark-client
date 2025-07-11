import { useMutation } from "@tanstack/react-query";
import React from "react";
import { saveUserInDb } from "../API/utils";

const useSaveUser = () => {
  return useMutation({
    mutationKey: ["saveUser"],
    mutationFn: saveUserInDb,
  });
};

export default useSaveUser;