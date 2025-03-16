
import React, { useState, useEffect } from "react";

const SearchPosts = ({ allPosts, onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!searchTerm.trim()) {
      onSearchResults(allPosts);
    } else {
      const filtered = allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      onSearchResults(filtered);
    }
  }, [searchTerm, allPosts, onSearchResults]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-posts-container">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search something..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default SearchPosts;