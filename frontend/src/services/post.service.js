import axios from "axios";
const getToken = () => sessionStorage.getItem("token");

const API_URL = "http://localhost:3000/api/v1/post";

export const getPosts = async () => {
  try {
    const token = getToken();
    // const response = await axios.get(`${API_URL}/${postId}`, {
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

export const getOnePost = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/byUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch posts";
  }
};

export const likePost = async (postId) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${API_URL}/like`,
      { post_id: postId }, // Dữ liệu gửi trong body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to like post";
  }
};

export const checkLikeStatus = async (postId) => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/${postId}/like-status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch like status";
  }
};

export const getPostLikes = async (postId) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${API_URL}/likes`,
      { post_id: postId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong";
  }
};