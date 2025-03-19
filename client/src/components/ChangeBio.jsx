import React, { useState, useEffect } from "react";
import { changeBio } from "../services/user.service";
import "../styles/components/ChangeBio.css";

function ChangeBio({ isOpen, onClose, onBioChange, initialBio = "" }) {
  const [bio, setBio] = useState(initialBio);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialBio) {
      setBio(initialBio);
    }
  }, [initialBio]);

  useEffect(() => {
    if (isOpen) {
      setMessage("");
    }
  }, [isOpen]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await changeBio(bio);
      setMessage("Bio updated successfully!");

      if (onBioChange) {
        onBioChange(bio);
      }

      setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 1500);
    } catch (error) {
      console.error("Error updating bio:", error);
      setMessage(error.response?.data?.message || "Failed to update bio!");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="edit-bio-overlay">
      <div className="edit-bio-container">
        <div className="edit-bio-header">
          <h3>Edit Your Bio</h3>
          <button type="button" className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter your new bio..."
            rows="4"
            cols="50"
            disabled={loading}
          />
          <div className="edit-bio-actions">
            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? "Updating..." : "Update Bio"}
            </button>
          </div>
        </form>
        {message && (
          <p
            className={`message ${
              message.includes("success") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ChangeBio;
