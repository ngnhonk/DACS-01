import React from "react";
import usePosts from "../hooks/usePosts";
import PostList from "../components/PostList";

const PostsPage = () => {
  const { posts, loading, error } = usePosts();

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return <PostList posts={posts} />;
};

export default PostsPage;
