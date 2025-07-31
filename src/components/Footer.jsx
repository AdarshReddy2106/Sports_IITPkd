import React from "react";
import "./Footer.css";

const Footer = ({ setCurrentPage }) => {
  const navTo = (page) => {
    // In a real SPA, you'd use a router's navigation function
    // For this project, we use the method passed from App.jsx
    if (window.setCurrentPage) window.setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-main">
      <div className="footer-content container">
        <div className="footer-brand">
          <h3>Sports Council IIT Palakkad</h3>
          <p>Indian Institute of Technology Palakkad</p>
        </div>

        <div className="footer-links-container">
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><button onClick={() => navTo("home")}>Home</button></li>
              <li><button onClick={() => navTo("gallery")}>Gallery</button></li>
              <li><button onClick={() => navTo("calendar")}>Calendar</button></li>
              <li><button onClick={() => navTo("about")}>About</button></li>
              <li><button onClick={() => navTo("contact")}>Contact</button></li>
              <li><button onClick={() => navTo("bookings")}>Bookings</button></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Contact</h4>
            <ul>
              <li>Indian Institute of Technology Palakkad, Kerala | Pin: 678623</li>
              <li>+91 9876543210</li>
              <li>sec_sports@smail.iitpkd.ac.in</li>
            </ul>
          </div>

          <div className="footer-links">
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
      <div className="footer-bottom container">
        <span>©2025 Sports IIT PKD. All rights reserved.</span>
        <div className="footer-bottom-links">
          <button onClick={() => navTo("privacypolicy")}>Privacy Policy</button>
          <span className="footer-bottom-divider">|</span>
          <button onClick={() => navTo("terms")}>Terms & Conditions</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;