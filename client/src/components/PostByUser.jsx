import React, { useState, useEffect } from "react";
import {
  getOnePost,
  updatePostCategory,
  updatePost,
} from "../services/post.service";
import { getCategories } from "../services/category.service";
import "../styles/components/PostItemByUser.css";

const PostByUser = ({ post }) => {
  const [likes, setLikes] = useState(0);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    post.categoryId || ""
  );
  // Add new state for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: post.title,
    content: post.content,
  });

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const data = await getOnePost();
        setLikes(data.total);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLikes();
    fetchCategories();
  }, [post.id]);

  const updateLikes = async () => {
    try {
      const data = await getOnePost();
      setLikes(data.total);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategoryId) return;

    try {
      await updatePostCategory(post.id, selectedCategoryId);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  // Add new function to handle edit form input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  // Add new function to handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(post.id, editData);
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  const renderComments = (comments) => {
    return comments.map((comment) => (
      <div key={comment.id} style={{ marginLeft: "20px" }}>
        <p>
          <strong>{comment.user.username}</strong>: {comment.content}
        </p>
        {comment.replies.length > 0 && (
          <div>{renderComments(comment.replies)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="post-card">
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={editData.title}
              onChange={handleEditChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              value={editData.content}
              onChange={handleEditChange}
              required
              className="form-control"
              rows="5"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="title">
            <h3>{post.title}</h3>
            <div>
              <button
                onClick={() => setIsEditing(true)}
                className="action-buttons"
              >
                <i class="fa-regular fa-pen-to-square"></i>
              </button>
            </div>
          </div>
          <p>{post.content}</p>

          <div className="category-section">
            <form
              onSubmit={handleCategorySubmit}
              style={{ display: "flex", alignItems: "center" }}
            >
              <label htmlFor="categorySelect" style={{ marginRight: "10px" }}>
                Categories:
              </label>
              <select
                id="categorySelect"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                style={{ padding: "5px", marginRight: "10px" }}
              >
                <option value="">Choose categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <button type="submit" style={{ padding: "5px 10px" }}>
                Add
              </button>
            </form>
          </div>
        </>
      )}

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default PostByUser;
