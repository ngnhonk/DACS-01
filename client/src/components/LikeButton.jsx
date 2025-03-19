import React, { useState, useEffect } from "react";
import { likePost, checkLikeStatus } from "../services/post.service";

const LikeButton = ({ postId, onLikeToggle }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const status = await checkLikeStatus(postId);
        setLiked(status.liked);
      } catch (err) {
        setError(err.message || "Can not load this");
      }
    };
    fetchLikeStatus();
  }, [postId]);

  const handleLikeToggle = async () => {
    setLoading(true);
    setError(null);
    try {
      await likePost(postId);
      setLiked(!liked);
      if (onLikeToggle) {
        await onLikeToggle();
      }
    } catch (err) {
      setError(err.message || "Can not do this yet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleLikeToggle}
        disabled={loading}
        style={{
          padding: "5px 10px",
          backgroundColor: liked ? "#ccc" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Pending..." : liked ? "Liked" : "Like"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LikeButton;