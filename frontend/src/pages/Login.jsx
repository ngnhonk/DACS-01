import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";
import { Link } from "react-router-dom";
import "../styles/pages/Login.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      setError("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div>
      <div className="login-form">
        <div className="inner-content">
          <form onSubmit={handleSubmit}>
          <h3>Hello!</h3>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Đăng nhập</button>
            <Link to="/register" className="register-link">Đăng Ký</Link>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
