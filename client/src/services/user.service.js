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

export const changeAvatar = async (avatar_url) => {
  const token = getToken();

  const response = await axios.post(
    `${API_URL}/avatar`,
    { avatar_url },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.message;
};

export const changePassword = async (password) => {
  const token = getToken();

  const response = await axios.put(
    `${API_URL}/change-password`,
    { password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.message;
};


export const changeBio = async (bio) => {
  const token = getToken();

  const response = await axios.put(
    `${API_URL}/bio`,
    { bio },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
};

export const getUsername = async (bio) => {
  const token = getToken();

  const response = await axios.put(
    `${API_URL}/username`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
};
