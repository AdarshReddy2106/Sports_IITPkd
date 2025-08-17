import React, { useEffect, useState } from 'react';
import { Sun, Moon, ChevronDown } from 'lucide-react';
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
import './Navbar.css';

const Navigation = ({ currentPage, setCurrentPage, isHomePage }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [isAuthorizedAdmin, setIsAuthorizedAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // REMOVED: JavaScript dropdown state - using pure CSS now

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      const superAdminEmails = ["102301018@smail.iitpkd.ac.in", "122301042@smail.iitpkd.ac.in"];
      const eventAdminEmails = ["ace@iitpkd.ac.in"];
      
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

  const isPeopleActive = currentPage === 'staff' || currentPage === 'core-team' || currentPage === 'web-team';

  return (
    <nav className={`navbar ${isHomePage && !scrolled ? 'transparent' : ''} ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-glass">
        <div className="navbar-brand" onClick={() => handleNavigation('home')} style={{cursor: 'pointer'}}>
          <div className="brand-logo">SC</div>
          <div className="brand-text">
            <div className="brand-title">Sports Council</div>
            <div className="brand-subtitle">Play. Lead. Excel.</div>
          </div>
        </div>

        <div className="navbar-links">
          {['Home', 'About', 'Clubs'].map((item) => (
            <button
              key={item}
              onClick={() => handleNavigation(item.toLowerCase())}
              className={`nav-link ${currentPage === item.toLowerCase() ? 'active' : ''}`}
            >
              {item}
            </button>
          ))}
          
          {/* SIMPLIFIED: Removed JavaScript event handlers, using pure CSS hover */}
          <div className="nav-link-dropdown">
            <button className={`nav-link ${isPeopleActive ? 'active' : ''}`}>
              People <ChevronDown size={16} style={{ marginLeft: '4px' }} />
            </button>
            {/* SIMPLIFIED: Removed conditional class, using pure CSS */}
            <div className="dropdown-menu">
              <button 
                onClick={() => handleNavigation('staff')} 
                className={`dropdown-item ${currentPage === 'staff' ? 'active' : ''}`}
              >
                Staff
              </button>
              <button 
                onClick={() => handleNavigation('core-team')} 
                className={`dropdown-item ${currentPage === 'core-team' ? 'active' : ''}`}
              >
                Core Team
              </button>
              <button 
                onClick={() => handleNavigation('web-team')} 
                className={`dropdown-item ${currentPage === 'web-team' ? 'active' : ''}`}
              >
                Web Team
              </button>
            </div>
          </div>

          {['Gallery', 'Calendar', 'Bookings', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => handleNavigation(item.toLowerCase())}
              className={`nav-link ${currentPage === item.toLowerCase() ? 'active' : ''}`}
            >
              {item}
            </button>
          ))}
          
          {isLoaded && isAuthorizedAdmin && (
            <button
              onClick={() => handleNavigation('admindashboard')}
              className={`nav-link ${currentPage === 'admindashboard' ? 'active' : ''}`}
            >
              Admin Dashboard
            </button>
          )}
          
          <SignedOut>
            <SignInButton mode="modal">
              <button className="nav-link">Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div style={{ marginLeft: '0.5rem' }}>
              <UserButton />
            </div>
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