import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/components/Footer.css";

function Footer() {
  return (
    <footer>
      <div className="container-md">
        <div className="inner-content">
          <h6>Make strong community together</h6>
          <p>Insert some content here</p>
          <div className="row">
            <div className="col-md-3">
              <div className="list-item">
                <h6>About</h6>
                <Link to="#">Rules</Link>
                <Link to="#">Terms</Link>
                <Link to="#">Dev Team</Link>
              </div>
            </div>
            <div className="col-md-3">
              <div className="list-item">
                <h6>Guide</h6>
                <Link to="#">Handbook</Link>
                <Link to="#">API</Link>
                <Link to="#">Other</Link>
              </div>
            </div>
            <div className="col-md-3">
              <div className="list-item">
                <h6>Other Platform</h6>
                <Link to="#">Facebook</Link>
                <Link to="#">Discord</Link>
                <Link to="#">Lark</Link>
              </div>
            </div>
            <div className="col-md-3">
              <div className="list-item">
                <h6>Help</h6>
                <Link to="#">Support</Link>
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
