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

export const createComment = async (postId, content) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${API_URL}/${postId}/comment`,
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
    throw error.response?.data?.message || "Failed to create comment";
  }
};

export const createReply = async (postId, commentId, content) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${API_URL}/${postId}/comment/${commentId}/reply`,
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
    throw error.response?.data?.message || "Failed to create reply";
  }
};

export const deleteComment = async (commentId) => {
  try {
    const token = getToken();
    const response = await axios.delete(
      `${API_URL}/comment/delete`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { comment_id: commentId },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete comment";
  }
};

export const createPost = async (postData) => {
  try {
    const token = getToken();
    const response = await axios.post(
      API_URL,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to create post";
  }
};

export const getPostsByCategory = async (categoryId) => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/category/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch posts for category";
  }
};

export const updatePostCategory = async (postId, categoryId) => {
  try {
    const token = getToken();
    const response = await axios.post(
      `${API_URL}/category/update`,
      { post_id: postId, category_id: categoryId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to update post category";
  }
};

export const updatePost = async (postId, postData) => {
  try {
    const token = getToken();
    const response = await axios.put(`${API_URL}/${postId}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to update post";
  }
};