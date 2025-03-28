import axios from "axios";

const getToken = () => sessionStorage.getItem("token");

const API_URL = "http://localhost:3000/api/v1/comments";

export const getCommentsByUser = async () => {
  try {
    const token = getToken();
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch comments";
  }
};

export const updateComment = async (commentId, content) => {
  try {
    const token = getToken();
    const response = await axios.put(
      `${API_URL}/${commentId}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to update comment";
  }
};

export const deleteComment = async (commentId) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete comment";
  }
};