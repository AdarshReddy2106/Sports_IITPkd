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
        <button onClick={handleSignInClick} className="mobile-navbar-auth">
          Sign In
        </button>
      </SignedOut>
      <SignedIn>
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-primary)' }}>
          <UserButton />
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

const MobileNav = ({ currentPage, setCurrentPage, isHomePage }) => {
  const [open, setOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleNav = (key) => {
    setCurrentPage(key);
    setOpen(false);
  };

  return (
    <nav className={`mobile-navbar ${isHomePage ? 'transparent' : ''}`}>
      <div className="mobile-navbar-header">
        {/* The title has been removed to create a cleaner look */}
        <div style={{ flex: 1 }}></div> {/* This div pushes the buttons to the right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
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