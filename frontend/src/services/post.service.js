import axios from "axios";
const getToken = () => sessionStorage.getItem("token");

const API_URL = "http://localhost:3000/api/v1/post";

export const getPosts = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch profile";
  }
};
