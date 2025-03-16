
import React, { useState } from "react";
import { createCategory } from "../services/category.service";

const CreateCategory = ({ onCategoryCreated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name must be filled");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const newCategory = await createCategory(name, description);
      setName("");
      setDescription("");
      onCategoryCreated(newCategory);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-category-container mt-3">
      <h5>Create new Category</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Đang tạo..." : "Tạo danh mục"}
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;