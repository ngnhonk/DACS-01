import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/components/Header.css";
import logo from "../assets/images/logo-dark.png";

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="inner-header">
        <div className="left">
        <Link to="/about"><img src={logo} alt="" /></Link>
        </div>
        <div className="mid">
          <ul>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/guide">Guide</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
          </ul>
        </div>
        <div className="right">
          <ul>
            <li className="create-post">
              <Link to="/dashboard#createPost">
                {" "}
                <i className="fa-solid fa-plus"></i>
              </Link>
            </li>
            <li className="notification">
              <i className="fa-solid fa-bell"></i>
            </li>
            <li className="user">
              <Link to="/dashboard">
                <i className="fa-regular fa-user"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
