import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Posts from "../pages/Posts";
import { Fragment } from "react";
import Header from "../components/Header";
import AboutPage from "../pages/About";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/App.css";

// Component Layout với Header
function Layout({ children }) {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/login" element={<Login />} /> {/* Không có Header */}
      <Route path="/register" element={<Register />} /> {/* Không có Header */}
      <Route path="/posts" element={<Layout><Posts /></Layout>} />
      <Route path="/about" element={<Layout><AboutPage /></Layout>} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
    </Routes>
  );
}