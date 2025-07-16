import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../App';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
  useClerk,
} from '@clerk/clerk-react';

const ClerkAuth = () => {
  const { openSignIn } = useClerk();
  
  const handleSignInClick = () => {
    openSignIn(); // Open Clerk sign in modal
  };

  return (
    <>
      <SignedOut>
        <button 
          className="mobile-navbar-link"
          onClick={handleSignInClick}
          style={{ 
            width: '100%', 
            display: 'block',
            textAlign: 'left',
            border: 'none',
            font: 'inherit',
            cursor: 'pointer'
          }}
        >
          Sign In
        </button>
      </SignedOut>
      <SignedIn>
        <div className="mobile-navbar-link" style={{ display: 'flex', alignItems: 'center' }}>
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>
    </>
  );
};

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
          <span className="logo-name">Sports Council IIT Palakkad</span>
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
        
        <div className="mobile-navbar-auth">
          <ClerkAuth />
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;