import React, { useState, useEffect } from "react";
import LikeButton from "./LikeButton";
import TotalLikes from "./TotalLikes";
import { getOnePost } from "../services/post.service";

const PostByUser = ({ post }) => {
  const [likes, setLikes] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const data = await getOnePost();
        setLikes(data.total);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchLikes();
  }, [post.id]);

  const updateLikes = async () => {
    try {
      const data = await getOnePost();
      setLikes(data.total);
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
        <em>Đăng bởi: {post.user.username}</em>
      </p>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <TotalLikes likes={likes} />
      )}
      <LikeButton postId={post.id} onLikeToggle={updateLikes} />{" "}
      {/* callback */}
      <div>
        <h3>Bình luận:</h3>
        {post.comments.length > 0 ? (
          renderComments(post.comments)
        ) : (
          <p>Chưa có bình luận nào.</p>
        )}
      </div>
    </div>
  );
};

export default PostByUser;