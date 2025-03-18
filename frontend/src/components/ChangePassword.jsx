import { useState } from "react";
import "../styles/components/ChangePassword.css";

const ChangePassword = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage("Error: New passwords do not match");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch("http://localhost:3000/api/v1/user/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          currentPassword,
          password: newPassword
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update password");
      }

      setMessage("Password updated successfully!");
      
      // Close modal after successful update
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="password-modal-overlay">
      <div className="password-modal">
        <div className="password-modal-header">
          <h3>Change Password</h3>
          <button className="close-button" onClick={handleClose}>
            &times;
          </button>
        </div>
        
        <div className="password-modal-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="current-password">Current Password:</label>
              <input
                type="password"
                id="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="new-password">New Password:</label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                minLength="6"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm New Password:</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                minLength="6"
              />
            </div>
            
            <div className="form-buttons">
              <button 
                type="button" 
                className="cancel-button" 
                onClick={handleClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-button" 
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Password"}
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

export default ChangePassword;