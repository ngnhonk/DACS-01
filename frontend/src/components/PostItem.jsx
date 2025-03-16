import React, { useState, useEffect } from "react";
import LikeButton from "./LikeButton";
import TotalLikes from "./TotalLikes";
import {
  getPostLikes,
  createComment,
  createReply,
} from "../services/post.service";
import { getCategories } from "../services/category.service";
import "../styles/components/PostItem.css";

const PostItem = ({ post }) => {
  const [likes, setLikes] = useState(0);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState({});
  const [categories, setCategories] = useState([]); 

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const data = await getPostLikes(post.id);
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
      const data = await getPostLikes(post.id);
      setLikes(data.total);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await createComment(post.id, newComment);
      setNewComment("");
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    const content = replyContent[commentId]?.trim();
    if (!content) return;

    try {
      await createReply(post.id, commentId, content);
      setReplyContent((prev) => ({ ...prev, [commentId]: "" }));
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  const renderComments = (comments, depth = 0) => {
    return comments.map((comment) => (
      <div
        key={comment.id}
        className={`comment depth-${depth} ms-${depth * 2}`}
      >
        <p className="mb-0">
          <strong>{comment.user.username}</strong>: {comment.content}
        </p>
        <button
          className="btn btn-link btn-sm"
          onClick={() =>
            setReplyContent((prev) => ({
              ...prev,
              [comment.id]: prev[comment.id] || "",
            }))
          }
        >
          Reply
        </button>
        {replyContent[comment.id] !== undefined && (
          <form
            onSubmit={(e) => handleReplySubmit(e, comment.id)}
            className="mt-2"
          >
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Your Reply..."
                value={replyContent[comment.id] || ""}
                onChange={(e) =>
                  setReplyContent((prev) => ({
                    ...prev,
                    [comment.id]: e.target.value,
                  }))
                }
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Post
              </button>
            </div>
          </form>
        )}
        {comment.replies.length > 0 && (
          <div>{renderComments(comment.replies, depth + 1)}</div>
        )}
      </div>
    ));
  };

  const categoryName = categories.find((cat) => cat.id === post.categoryId)?.name || "Loading...";

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="title">
          <h2 className="card-title">{post.title}</h2>
          <p className="card-subtitle text-muted">by: {post.user.username}</p>
          <div className="category-name text-muted">
            Category: {categoryName}
          </div>
        </div>
        <p className="card-text">{post.content}</p>
        {error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <TotalLikes likes={likes} />
        )}
        <div className="mt-2">
          <LikeButton postId={post.id} onLikeToggle={updateLikes} />
        </div>
        <div className="mt-3 border-top pt-3">
          <h3 className="h5">Comments:</h3>
          {comments.length > 0 ? (
            renderComments(comments)
          ) : (
            <p className="text-muted">Have no comment yet.</p>
          )}
          <form onSubmit={handleCommentSubmit} className="mt-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Your comments..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostItem;