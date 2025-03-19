
import React from "react";
import PostItem from "./PostItem";
import "../styles/components/PostList.css";

const PostList = ({ posts }) => {
  return (
    <div className="post-item">
      {posts.length > 0 ? (
        posts.map((post) => <PostItem key={post.id} post={post} />)
      ) : (
        <p className="text-center text-muted mt-3">Empty!</p>
      )}
    </div>
  );
};

export default PostList;