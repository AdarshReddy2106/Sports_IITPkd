import React, { useEffect, useState } from 'react';
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

const Navigation = ({ currentPage, setCurrentPage, isHomePage }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [isAuthorizedAdmin, setIsAuthorizedAdmin] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      const email = user?.primaryEmailAddress?.emailAddress || '';
      if (!email.endsWith('iitpkd.ac.in')) {
        alert('Access restricted to iitpkd.ac.in emails only');
        signOut().then(() => {
          navigate('/');
        });
        return;
      }

      // Check admin authorization
      const superAdminEmails = [
        "102301018@smail.iitpkd.ac.in",
        "122301042@smail.iitpkd.ac.in",
      ];
      const eventAdminEmails = [
        "ace@iitpkd.ac.in",
      ];
      
      const isAuthorized = superAdminEmails.includes(email) || eventAdminEmails.includes(email);
      setIsAuthorizedAdmin(isAuthorized);
    }
  }, [isLoaded, user, signOut, navigate]);

  const handleNavigation = (page) => {
    if (page === 'home') {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className={`navbar ${isHomePage ? 'transparent' : ''}`}>
      <div className="container navbar-content">
        <div className="nav-links">
          {['Home', 'About', 'Clubs', 'Gallery', 'Calendar', 'Bookings', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => handleNavigation(item.toLowerCase())}
              className={`nav-link ${currentPage === item.toLowerCase() ? 'active' : ''}`}
            >
              {item}
            </button>
          ))}
          
          {/* Show Admin Dashboard for authorized users */}
          {isLoaded && isAuthorizedAdmin && (
            <button
              onClick={() => handleNavigation('admindashboard')}
              className={`nav-link ${currentPage === 'admindashboard' ? 'active' : ''}`}
            >
              Admin Dashboard
            </button>
          )}
          
          {/* Clerk Auth UI */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="nav-link">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          
          <button 
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;