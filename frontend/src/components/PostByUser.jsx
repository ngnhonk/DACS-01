import React, { useState, useEffect } from "react";
import LikeButton from "./LikeButton";
import TotalLikes from "./TotalLikes";
import { getOnePost, updatePostCategory } from "../services/post.service"; 
import { getCategories } from "../services/category.service";

const PostByUser = ({ post }) => {
  const [likes, setLikes] = useState(0);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]); 
  const [selectedCategoryId, setSelectedCategoryId] = useState(post.categoryId || "");

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
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "20px",
      }}
    >
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>
        <em>Author: {post.user.username}</em>
      </p>

      <div style={{ marginTop: "10px" }}>
        <form onSubmit={handleCategorySubmit} style={{ display: "flex", alignItems: "center" }}>
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
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <TotalLikes likes={likes} />
      )}
      <LikeButton postId={post.id} onLikeToggle={updateLikes} />
      <div>
        <h3>Comments:</h3>
        {post.comments.length > 0 ? (
          renderComments(post.comments)
        ) : (
          <p>Empty!</p>
        )}
      </div>
    </div>
  );
};

export default PostByUser;