import axios from "axios";
const getToken = () => sessionStorage.getItem("token");

const API_URL = "http://localhost:3000/api/v1/user";

export const getProfile = async () => {
  const token = getToken();

  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default getProfile;
