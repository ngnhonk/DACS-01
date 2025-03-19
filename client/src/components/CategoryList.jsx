
import React, { useState, useEffect } from "react";
import { getCategories } from "../services/category.service";
import { getPostsByCategory } from "../services/post.service";
import CreateCategory from "./CreateCategory";

const CategoryList = ({ onCategorySelect, allPosts }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = async (category) => {
    if (selectedCategory?.id === category.id) {
      setSelectedCategory(null);
      onCategorySelect(allPosts);
    } else {
      setLoading(true);
      try {
        const postsData = await getPostsByCategory(category.id);
        setSelectedCategory(category);
        onCategorySelect(postsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCategoryCreated = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
    setShowCreateForm(false);
  };

  const toggleCreateForm = () => {
    setShowCreateForm((prev) => !prev);
  };

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">Something went wrong: {error}</p>;

  return (
    <div className="category-list-container">
      <h4>Categories</h4>
      {categories.length > 0 ? (
        <ul className="category-list">
          {categories.map((category) => (
            <li>
              <button
                key={category.id}
                className={`category-item ${
                  selectedCategory?.id === category.id ? "selected" : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <span className="category-name">{category.name}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-categories-text">Categories is empty!.</p>
      )}
      <button className="btn" onClick={toggleCreateForm}>
        {showCreateForm ? "Hide" : `Create`}
      </button>
      {showCreateForm && (
        <CreateCategory onCategoryCreated={handleCategoryCreated} />
      )}
    </div>
  );
};

export default CategoryList;
