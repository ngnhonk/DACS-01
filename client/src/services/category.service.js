import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/category";

const getToken = () => sessionStorage.getItem("token");

export const getCategories = async () => {
  try {
    const token = getToken();
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch categories";
  }
};

export const createCategory = async (name, description) => {
    try {
      const token = getToken();
      const response = await axios.post(
        API_URL,
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to create category";
    }
  };