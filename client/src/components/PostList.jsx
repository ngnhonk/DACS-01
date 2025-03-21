import React from "react";
import PostItem from "./PostItem";
import "../styles/components/PostList.css";
import { Link } from "react-router-dom";

const PostList = ({ posts }) => {
  return (
    <div className="post-item">
      {posts.length > 0 ? (
        posts.map((post) => <PostItem key={post.id} post={post} />)
      ) : (
        <div className="else-condition">
          <p className="text-center text-muted mt-3">Nothing to display!</p>
        </div>
      )}
    </div>
  );
};

export default PostList;
