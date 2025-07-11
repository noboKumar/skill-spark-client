import axios from "axios";

export const fetchAndStoreJWT = async (email) => {
  const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
    email,
  });
  localStorage.setItem("access-token", data.token);
};
