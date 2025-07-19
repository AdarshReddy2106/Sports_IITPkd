import React, { useEffect } from 'react';
import { CheckCircle, Sun, Moon } from 'lucide-react';
import { useTheme } from '../App';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
  useClerk,
} from '@clerk/clerk-react';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    if (isLoaded && user) {
      const email = user?.primaryEmailAddress?.emailAddress || '';
      if (!email.endsWith('iitpkd.ac.in')) {
        alert('Access restricted to iitpkd.ac.in emails only');
        signOut().then(() => {
          window.location.href = '/';
        });
      }
    }
  }, [isLoaded, user, signOut]);

  return (
    <nav className="hidden md:block">
      <div className="container">
        <div className="navbar-content">
          <div className="logo">
            <img src="/Logos/council.jpg" alt="" className="logo-icon" />
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

            {user?.primaryEmailAddress?.emailAddress === '102301018@smail.iitpkd.ac.in' && (
              <button
                onClick={() => setCurrentPage('admindashboard')}
                className={`nav-link ${currentPage === 'admindashboard' ? 'active' : ''}`}
              >
                Admin Dashboard
              </button>
            )}

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
