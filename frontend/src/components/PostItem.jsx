import React from "react";
import "../styles/PostItem.css";

const PostItem = ({ post }) => {
  return (
    <div className="post-item">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.image_url && <img src={post.image_url} alt="Post" width="200" />}
      <p><strong>Views:</strong> {post.views}</p>
      <p><strong>Created At:</strong> {new Date(post.created_at).toLocaleDateString()}</p>
    </div>
  );
};

export default PostItem;
