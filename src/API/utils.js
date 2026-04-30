import axios from "axios";
import { axiosSecure } from "../hooks/useAxiosSecure";

// axios public req
export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// set user role in DB
export const saveUserInDb = async (user) => {
  try {
    const { data } = await axiosPublic.post("/user", user);
    return data;
  } catch (error) {
    console.error("Error saving user to DB:", error);
    throw error;
  }
};

// upload image in imgbb
export const uploadImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      formData
    );
    return data.data.url;
  } catch (error) {
    console.error("Error uploading image to ImgBB:", error);
    throw error;
  }
};

// post teacher data
export const postTeacherRequest = async (teacherData) => {
  const { data } = await axiosSecure.post("/teacher-requests", teacherData);
  return data;
};
