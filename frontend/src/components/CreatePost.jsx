import React, { useState } from "react";
import { createPost } from "../services/post.service"; // Giả sử file API của bạn là api.js
import "../styles/components/CreatePost.css"; // Import file CSS
    
const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_url: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await createPost({
        title: formData.title,
        content: formData.content,
        image_url: formData.image_url || null,
      });
      
      setSuccess("Post created successfully!");
      setFormData({
        title: "",
        content: "",
        image_url: "",
      });
    } catch (err) {
      setError(err.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container" id="createPost">
      <h2>Create New Post</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter post title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="Write your post content here"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image_url">Image URL (optional):</label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default CreatePost;