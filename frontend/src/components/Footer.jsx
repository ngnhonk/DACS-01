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
                <h6>Title</h6>
                <Link to="#">Join Now</Link>
                <Link to="#">Join Now</Link>
                <Link to="#">Join Now</Link>
              </div>
            </div>
            <div className="col-md-3">
              <div className="list-item">
                <h6>Title</h6>
                <Link to="#">Join Now</Link>
                <Link to="#">Join Now</Link>
                <Link to="#">Join Now</Link>
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

            <h6>© ngnhonk</h6>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
