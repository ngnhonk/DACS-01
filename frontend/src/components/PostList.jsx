import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  return (
    <div>
      <h1>All Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => <PostItem key={post.id} post={post} />)
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default PostList;
