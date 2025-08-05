import React, {useState} from 'react';

import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import './Contact.css';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  // Dynamic API URL based on environment
  const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://contactapi-iit.vercel.app/api/contact'  // Your deployed backend URL
    : 'http://localhost:2030/api/contact';

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('Message sent!');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus(data.error || 'Failed to send.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setStatus('Failed to send.');
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <div className="contact-header">
          <h2 className="contact-title">
            Get In <span className="accent">Touch</span>
          </h2>
          <p className="contact-description">
            Have questions or need more information? Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-form-section">
            <h3 className="form-title">Send us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Your Name"
                  className="form-input"
                  required
                />
                <input
                  name="email"
                  value={form.email} 
                  onChange={handleChange} 
                  type="email"
                  placeholder="Email Address"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  name="subject"
                  value={form.subject || ''}
                  onChange={handleChange}
                  type="text"
                  placeholder="Subject"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Message"
                  className="form-textarea"
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Send Message
              </button>
              {status && <div className="status-message">{status}</div>}
            </form>
          </div>

          <div className="contact-info-section">
            <div className="contact-info-card">
              <h3 className="info-title">Contact Information</h3>
              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon address">
                    <MapPin size={20} />
                  </div>
                  <div className="info-content">
                    <h4>Address</h4>
                    <p>Indian Institute of Technology Palakkad, Kerala 678623</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon phone">
                    <Phone size={20} />
                  </div>
                  <div className="info-content">
                    <h4>Phone</h4>
                    <p>+91 8977276836</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon email">
                    <Mail size={20} />
                  </div>
                  <div className="info-content">
                    <h4>Email</h4>
                    <p>sec_sports@smail.iitpkd.ac.in</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="social-section">
              <h3 className="social-title">Follow Us</h3>
              <div className="social-icons">
                <button className="social-btn facebook">
                  <a href="https://www.instagram.com/sports_iit_pkd/" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
                </button>
                <button className="social-btn instagram">
                  <a href="https://www.instagram.com/sports_iit_pkd/" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
                </button>
                <button className="social-btn youtube">
                  <a href="https://www.youtube.com/@SportsIITPKD" target="_blank" rel="noopener noreferrer"><Youtube size={20} /></a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;