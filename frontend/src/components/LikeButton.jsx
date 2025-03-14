import React, { useState, useEffect } from "react";
import { likePost, checkLikeStatus } from "../services/post.service";

const LikeButton = ({ postId, onLikeToggle }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);

  // Fetch trạng thái like ban đầu
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const status = await checkLikeStatus(postId);
        setLiked(status.liked);
      } catch (err) {
        setError(err.message || "Không thể tải trạng thái thích");
      }
    };
    fetchLikeStatus();
  }, [postId]);

  const handleLikeToggle = async () => {
    setLoading(true);
    setError(null);
    try {
      await likePost(postId); // Gọi API toggle like/unlike
      setLiked(!liked); // Đổi trạng thái
      if (onLikeToggle) {
        await onLikeToggle(); // Gọi callback để cập nhật số lượt thích
      }
    } catch (err) {
      setError(err.message || "Không thể thực hiện hành động");
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
        {loading ? "Đang xử lý..." : liked ? "Đã thích" : "Thích"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LikeButton;