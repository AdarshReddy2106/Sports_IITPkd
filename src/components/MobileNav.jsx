import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../App';

const navLinks = [
  { name: 'Home', key: 'home' },
  { name: 'About', key: 'about' },
  { name: 'Gallery', key: 'gallery' },
  { name: 'Calendar', key: 'calendar' },
  { name: 'Bookings', key: 'bookings' },
  { name: 'Contact', key: 'contact' },
];

const MobileNav = ({ currentPage, setCurrentPage }) => {
  const [open, setOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleNav = (key) => {
    setCurrentPage(key);
    setOpen(false);
  };

  return (
    <nav className="mobile-navbar">
      <div className="mobile-navbar-header">
        <div className="logo">
          <div className="logo-icon">
            <span className="logo-text">ESC</span>
          </div>
          <span className="logo-name">Elite Sports Council</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            type="button"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="mobile-navbar-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            type="button"
          >
            <span className={`hamburger${open ? ' open' : ''}`}></span>
          </button>
        </div>
      </div>
      <div className={`mobile-navbar-menu${open ? ' show' : ''}`}>
        {navLinks.map(link => (
          <button
            key={link.key}
            className={`mobile-navbar-link${currentPage === link.key ? ' active' : ''}`}
            onClick={() => handleNav(link.key)}
          >
            {link.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;