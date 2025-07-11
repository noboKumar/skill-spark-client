import axios from "axios";

// set user role in DB
export const saveUserInDb = async (user) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/user`,
    user
  );
  return data;
};

// upload image in imgbb
export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  return data.data.url;
};

// axios public req
export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
