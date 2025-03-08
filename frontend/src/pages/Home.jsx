import React from "react";
import { Link } from "react-router-dom";

function Home () {
  return (
    <div>
      <h1>Trang chủ</h1>
      <p>Chào mừng đến với ứng dụng!</p>
      <Link to="/login">Đăng nhập</Link> |<Link to="/register">Đăng ký</Link>
    </div>
  );
}

export default Home;
