import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/components/Footer.css";

function Footer() {
  return (
    <footer>
      <div className="container-md">
        <div className="inner-content">
          <h6>Make strong community together</h6>
          <p>Community platform by Team 01 | DACS-1-2-24(N02)</p>
          <div className="row">
            <div className="col-md-3">
              <div className="list-item">
                <h6>About</h6>
                <Link to="/guide">Rules</Link>
                <Link to="/guide">Terms</Link>
                <Link to="https://github.com/ngnhonk/DACS-01" target="_blank">Project</Link>
              </div>
            </div>
            <div className="col-md-3">
              <div className="list-item">
                <h6>Guide</h6>
                <Link to="/guide">Handbook</Link>
                <Link to="http://localhost:3000/api/v1/auth">API</Link>
                <Link to="/guide">Other</Link>
              </div>
            </div>
            <div className="col-md-3">
              <div className="list-item">
                <h6>Other Platform</h6>
                <Link to="https://facebook.com" target="_blank">Facebook</Link>
                <Link to="https://discord.com" target="_blank">Discord</Link>
                <Link to="https://www.larksuite.com" target="_blank">Lark</Link>
              </div>
            </div>
            <div className="col-md-3">
              <div className="list-item">
                <h6>Help</h6>
                <Link to="/guide">Support</Link>
                <Link to="#">Troubleshooting</Link>
                <Link to="/about#contactUs">Contact Us</Link>
              </div>
            </div>

            <h6>© DACS - 01</h6>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
