import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  const navTo = (page) => {
    if (page === "home") {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
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
              <li><button onClick={() => navTo("events")}>Events</button></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Contact</h4>
            <ul>
              <li>Indian Institute of Technology Palakkad,</li>
              <li>Kerala | Pin: 678623</li>
              <li>+91 8977276836</li>
              <li>sec_sports@smail.iitpkd.ac.in</li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Social</h4>
            <ul>
              <li><a href="https://www.instagram.com/sports_iit_pkd/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.youtube.com/@SportsIITPKD" target="_blank" rel="noopener noreferrer">YouTube</a></li>
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