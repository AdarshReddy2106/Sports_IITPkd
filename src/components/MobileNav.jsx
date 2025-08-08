import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../App';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
  useClerk,
} from '@clerk/clerk-react';
import './MobileNav.css';

const ClerkAuth = () => {
  const { openSignIn } = useClerk();

  const handleSignInClick = () => {
    openSignIn(); 
  };

  return (
    <>
      <SignedOut>
        <button onClick={handleSignInClick} className="mobile-navbar-auth">
          Sign In
        </button>
      </SignedOut>
      <SignedIn>
        <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--mobile-glass-border)' }}>
          <UserButton />
        </div>
      </SignedIn>
    </>
  );
};

const navLinks = [
  { name: 'Home', key: 'home' },
  { name: 'About', key: 'about' },
  { name: 'Clubs', key: 'clubs' },
  { name: 'Gallery', key: 'gallery' },
  { name: 'Calendar', key: 'calendar' },
  { name: 'Bookings', key: 'bookings' },
  { name: 'Contact', key: 'contact' },
];

const MobileNav = ({ currentPage, setCurrentPage, isHomePage }) => {
  const [open, setOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // Add scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (key) => {
    if (key === 'home') {
      navigate('/');
    } else {
      navigate(`/${key}`);
    }
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className={`mobile-navbar ${isHomePage ? 'transparent' : ''} ${scrolled ? 'scrolled' : ''}`}>
      <div className="mobile-navbar-header">
        {/* Brand Logo and Text - Enhanced */}
        <div className="mobile-brand" onClick={() => handleNav('home')} style={{cursor: 'pointer'}}>
          <div className="mobile-brand-logo">SC</div>
          <div className="mobile-brand-text">
            <div className="mobile-brand-title">Sports Council</div>
            <div className="mobile-brand-subtitle">Play. Lead. Excel.</div>
          </div>
        </div>

        <div className="mobile-controls">
          <button 
            onClick={toggleTheme}
            className="mobile-theme-toggle"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="mobile-navbar-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            type="button"
          >
            <span className={`hamburger ${open ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>
      
      <div className={`mobile-navbar-menu ${open ? 'show' : ''}`}>
        <ClerkAuth />
        {navLinks.map(link => (
          <button
            key={link.key}
            onClick={() => handleNav(link.key)}
            className={`mobile-navbar-link ${currentPage === link.key ? 'active' : ''}`}
          >
            {link.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;