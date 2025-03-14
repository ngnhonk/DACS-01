import React, { useState, useEffect } from "react";
import LikeButton from "./LikeButton";
import TotalLikes from "./TotalLikes";
import { getPostLikes } from "../services/post.service";
import "../styles/PostItem.components.css";

const PostItem = ({ post }) => {
  const [likes, setLikes] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const data = await getPostLikes(post.id);
        setLikes(data.total);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchLikes();
  }, [post.id]);

  const updateLikes = async () => {
    try {
      const data = await getPostLikes(post.id);
      setLikes(data.total);
    } catch (err) {
      setError(err.message);
    }
  };

  const renderComments = (comments, depth = 0) => {
    return comments.map((comment) => (
      <div key={comment.id} className={`comment depth-${depth} ms-${depth * 2}`}>
        <p className="mb-0">
          <strong>{comment.user.username}</strong>: {comment.content}
        </p>
        {comment.replies.length > 0 && (
          <div>{renderComments(comment.replies, depth + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p className="card-text">{post.content}</p>
        <p className="card-subtitle text-muted">Đăng bởi: {post.user.username}</p>
        {error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <TotalLikes likes={likes} />
        )}
        <div className="mt-2">
          <LikeButton postId={post.id} onLikeToggle={updateLikes} />
        </div>
        <div className="mt-3 border-top pt-3">
          <h3 className="h5">Bình luận:</h3>
          {post.comments.length > 0 ? (
            renderComments(post.comments)
          ) : (
            <p className="text-muted">Chưa có bình luận nào.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostItem;