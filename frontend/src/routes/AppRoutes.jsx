import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Posts from "../pages/Posts";
import { Fragment } from "react";
import Header from "../components/Header";
import AboutPage from "../pages/About";
import Footer from "../components/Footer";
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
      <Route path="/" element={<Layout><Home /><Footer/></Layout>} />
      <Route path="/login" element={<Login />} /> {/* Không có Header */}
      <Route path="/register" element={<Register />} /> {/* Không có Header */}
      <Route path="/posts" element={<Layout><Posts /><Footer/></Layout>} />
      <Route path="/about" element={<Layout><AboutPage /><Footer/></Layout>} />
      <Route path="/dashboard" element={<Layout><Dashboard /><Footer/></Layout>} />
    </Routes>
  );
}