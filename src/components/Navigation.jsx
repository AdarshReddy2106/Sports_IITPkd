import React from 'react';
import { CheckCircle, Sun, Moon } from 'lucide-react';
import { useTheme } from '../App';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

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
            <span>Sports Council IIT Palakkad</span>
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
            
            {/* Clerk Auth UI */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="nav-link">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            
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