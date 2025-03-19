import React from "react";

const PostDetail = ({ post }) => {
  return (
    <div className="post-detail-container">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-content">{post.content}</p>
      <p className="post-author">Author: {post.user.username}</p>
    </div>
  );
};

export default PostDetail;