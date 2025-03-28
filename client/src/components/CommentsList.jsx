import React, { useState, useEffect } from "react";
import {
  getCommentsByUser,
  updateComment,
  deleteComment,
} from "../services/comment.service";
import "../styles/components/CommentsList.css";

const CommentsList = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const fetchedComments = await getCommentsByUser();
        setComments(fetchedComments);
        setLoading(false);
      } catch (err) {
        setError(err.toString());
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleUpdateComment = async () => {
    try {
      const updatedComment = await updateComment(editingCommentId, editContent);
      setComments(
        comments.map((comment) =>
          comment.id === editingCommentId ? updatedComment : comment
        )
      );
      setEditingCommentId(null);
      window.location.reload();
    } catch (err) {
      setError("Cannot update comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
      window.location.reload();
    } catch (err) {
      setError("Cannot delete comment");
    }
  };

  if (loading)
    return (
      <div className="text-center p-4">
        <p>Comments is loading..</p>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-100 p-4 rounded">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );

  return (
    <div className="container">
      <h2 className="main-title text-center">Comments List</h2>

      {comments.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Have no comments..</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              {/* Post Title */}
              <div className="mb-2">
                <h5 className="text-lg font-semibold text-gray-800">
                  Post: {comment.post_title}
                </h5>
              </div>

              {/* Parent comment if exists */}
              {comment.parent_content &&
                comment.parent_content.trim() !== "" && (
                  <div className="bg-gray-100 p-2 rounded mb-2">
                    <p className="text-sm text-gray-600">
                      Reply for: {comment.parent_content}
                    </p>
                  </div>
                )}

              {editingCommentId === comment.id ? (
                <div>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                    rows="3"
                  />
                  <div className="button-section">
                    <button onClick={handleUpdateComment}>Save</button>
                    <button onClick={() => setEditingCommentId(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="mb-2">{comment.content}</p>
                  <div className="button-section">
                    <button onClick={() => handleEditClick(comment)}>
                      Edit
                    </button>
                    <button
                      className="color-red"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;
