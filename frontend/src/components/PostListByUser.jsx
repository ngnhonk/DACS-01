import React, { useState, useEffect } from "react";
import PostByUser from "./PostByUser";
import { getOnePost } from "../services/post.service";

const PostListByUser = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const postsData = await getOnePost();
        setPosts(postsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error}</p>;

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => <PostByUser key={post.id} post={post} />)
      ) : (
        <p>Empty!</p>
      )}
    </div>
  );
};

export default PostListByUser;