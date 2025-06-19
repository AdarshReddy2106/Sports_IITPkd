import React from 'react';
import { CheckCircle, Sun, Moon } from 'lucide-react';
import { useTheme } from '../App';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="hidden md:block">
      <div className="container">
        <div className="navbar-content">
          <div className="logo">
            <div className="logo-icon">
              <CheckCircle size={20} />
            </div>
            <span>Elite Sports Council</span>
          </div>
          <div className="nav-links">
            {['Home', 'About', 'Gallery', 'Calendar', 'Bookings', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item.toLowerCase())}
                className={`nav-link ${currentPage === item.toLowerCase() ? 'active' : ''}`}
              >
                {item}
              </button>
            ))}
            <button onClick={toggleTheme} className="theme-toggle">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
