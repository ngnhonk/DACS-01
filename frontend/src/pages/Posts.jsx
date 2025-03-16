// pages/Posts.jsx
import React, { useState, useEffect, useCallback } from "react";
import PostList from "../components/PostList";
import SearchPosts from "../components/SearchPosts";
import CategoryList from "../components/CategoryList";
import { getPosts } from "../services/post.service";
import "../styles/pages/Posts.css";

function PostPage() {
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const postsData = await getPosts();
        setPosts(postsData);
        setDisplayedPosts(postsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSearchResults = useCallback((filteredPosts) => {
    setDisplayedPosts(filteredPosts);
  }, []); 

  const handleCategorySelect = useCallback((categoryPosts) => {
    setDisplayedPosts(categoryPosts);
  }, []);

  return (
    <div className="posts">
      <div className="row">
        <div className="col-lg-2">
          <CategoryList onCategorySelect={handleCategorySelect} allPosts={posts} />
        </div>
        <div className="col-lg-10">
          <SearchPosts onSearchResults={handleSearchResults} allPosts={posts} />
          {loading ? (
            <p className="text-center mt-3">Loading...</p>
          ) : error ? (
            <p className="text-center text-danger mt-3">Wrong: {error}</p>
          ) : (
            <PostList posts={displayedPosts} />
          )}
        </div>
      </div>
    </div>
  );
}

export default PostPage;