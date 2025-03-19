import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/auth";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    if (response.data.token) {
      sessionStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};
export const register = async (email, username, password) => {
  const response = await axios.post(`${API_URL}/register`, { email, username, password });
  return response.data;
};
