import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth.service";
import { Link } from "react-router-dom";
import "../styles/pages/Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    try {
      await register(email, username, password);
      setMessage("Register successfully! Please login.");
      navigate("/login");
    } catch (error) {
      setMessage("Wrong email or username!");
    }
  };

  return (
    <div>
      <div className="register-form">
        <div className="inner-content">
          <form onSubmit={handleSubmit}>
            <h3>Welcome!</h3>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Register</button>
            <Link to="/login" className="login-link">Login</Link>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Register;