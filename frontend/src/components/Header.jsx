import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Header.css";

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
        <div className="left"></div>
        <div className="mid">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/dashboard">Profile</Link>
            </li>
          </ul>
        </div>
        <div className="right"></div>
      </div>
    </header>
  );
}

export default Header;
