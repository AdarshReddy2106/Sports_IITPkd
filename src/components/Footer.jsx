import React from "react";
import { useTheme } from "../App";
import "./Footer.css";

const Footer = () => {
  const navTo = (page) => {
    if (window.setCurrentPage) window.setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-main">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Sports IIT Palakkad</h3>
          <p>We manage lead sports activities in IIT Palakkad</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <ul>
              <li><button onClick={() => navTo("home")}>Home</button></li>
              <li><button onClick={() => navTo("gallery")}>Gallery</button></li>
              <li><button onClick={() => navTo("calendar")}>Calendar</button></li>
              <li><button onClick={() => navTo("about")}>About</button></li>
              <li><button onClick={() => navTo("contact")}>Contact</button></li>
              <li><button onClick={() => navTo("bookings")}>Bookings</button></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>1489w Fluton ste, STE<br />2D Chicago, IL 63867.</li>
              <li>+91 9876543210</li>
              <li>info@elitesports.com</li>
            </ul>
          </div>
          <div>
            <h4>Social</h4>
            <ul>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy;2025 Transparent. All rights reserved</span>
        <span className="footer-bottom-links">
          <button onClick={() => navTo("privacypolicy")}>Privacy Policy</button>
          <span className="footer-bottom-divider" />
          <button onClick={() => navTo("terms")}>Terms & Conditions</button>
        </span>
      </div>
    </footer>
  );
};

export default Footer;