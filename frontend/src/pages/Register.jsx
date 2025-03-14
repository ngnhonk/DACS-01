import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth.service";
import { Link } from "react-router-dom";
import "../styles/pages/Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, username, password);
      setMessage("Đăng ký thành công! Hãy đăng nhập.");
      navigate("/login");
    } catch (error) {
      setMessage("email hoặc username không hợp lệ!");
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
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Đăng ký</button>
            <Link to="/login" className="login-link">Đăng Nhập</Link>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Register;
