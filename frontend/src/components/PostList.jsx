import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import { getPosts } from "../services/post.service";
import "../styles/components/PostList.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center mt-3">Đang tải...</p>;
  if (error) return <p className="text-center text-danger mt-3">Lỗi: {error}</p>;

  return (
    <div className="container-md my-4">
      {posts.length > 0 ? (
        posts.map((post) => <PostItem key={post.id} post={post} />)
      ) : (
        <p className="text-center text-muted mt-3">Chưa có bài viết nào.</p>
      )}
    </div>
  );
};

export default PostList;