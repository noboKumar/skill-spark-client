import { useMutation } from "@tanstack/react-query";
import React from "react";
import { uploadImage } from "../API/utils";

const useUploadImage = () => { 
  return useMutation({
    mutationKey: ["uploadImage"],
    mutationFn: uploadImage,
  });
};

export default useUploadImage;
