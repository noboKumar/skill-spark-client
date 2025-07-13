import { useMutation } from "@tanstack/react-query";
import React from "react";
import { uploadImage } from "../API/utils";

const useUploadImage = () => {
  return useMutation({
    mutationKey: ["uploadImage"],
    mutationFn: (imageFile) => uploadImage(imageFile),
  });
};

export default useUploadImage;
