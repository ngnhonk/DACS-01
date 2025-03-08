import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth.service";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      setMessage("Đăng ký thành công! Hãy đăng nhập.");
      navigate("/login");
    } catch (error) {
      setMessage("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div>
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Đăng ký</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
