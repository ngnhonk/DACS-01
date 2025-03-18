import { useState } from "react";
import "../styles/components/ChangeAvatar.css"

const ChangeAvatar = ({ isOpen, onClose, currentAvatar, onAvatarChange }) => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch("http://localhost:3000/api/v1/user/avatar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ avatar_url: avatarUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to update avatar");
      }

      const data = await response.json();
      setMessage("Avatar updated successfully!");

      onAvatarChange(avatarUrl);

      setTimeout(() => {
        onClose();
        setAvatarUrl("");
      }, 2000);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="avatar-modal-overlay">
      <div className="avatar-modal">
        <div className="avatar-modal-header">
          <h3>Change Avatar</h3>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        
        <div className="avatar-modal-content">
          <div className="current-avatar">
            <p>Current Avatar:</p>
            <img src={currentAvatar} alt="Current Avatar" />
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="avatar-url">New Avatar URL:</label>
              <input
                type="text"
                id="avatar-url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="Enter image URL"
                required
              />
            </div>
            
            <div className="form-buttons">
              <button 
                type="button" 
                className="cancel-button" 
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-button" 
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Avatar"}
              </button>
            </div>
            
            {message && (
              <div className={`message ${message.includes("Error") ? "error" : "success"}`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeAvatar;