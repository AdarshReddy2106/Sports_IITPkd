import React, { useState, useEffect } from 'react';
import { Sun, Moon, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && user) {
      const email = user?.primaryEmailAddress?.emailAddress || '';
      if (!email.endsWith('iitpkd.ac.in')) {
        alert('Access restricted to iitpkd.ac.in emails only');
        signOut().then(() => {
          navigate('/');
        });
      }
    }
  }, [isLoaded, user, signOut, navigate]);

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
  {
    name: 'People',
    key: 'people',
    subLinks: [
      { name: 'Staff', key: 'staff' },
      { name: 'Core Team', key: 'core-team' },
    ],
  },
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
  const [openDropdown, setOpenDropdown] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
    setOpenDropdown('');
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDropdownToggle = (key) => {
    setOpenDropdown(openDropdown === key ? '' : key);
  };

  return (
    <nav className={`mobile-navbar ${isHomePage && !scrolled ? 'transparent' : ''} ${scrolled ? 'scrolled' : ''}`}>
      <div className="mobile-navbar-header">
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
        {navLinks.map(link => {
          if (link.subLinks) {
            const isDropdownActive = link.subLinks.some(sub => sub.key === currentPage);
            return (
              <div key={link.key} className="mobile-dropdown-container">
                <button
                  onClick={() => handleDropdownToggle(link.key)}
                  className={`mobile-navbar-link dropdown-toggle ${isDropdownActive ? 'active' : ''}`}
                >
                  {link.name}
                  {openDropdown === link.key ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openDropdown === link.key && (
                  <div className="mobile-submenu">
                    {link.subLinks.map(subLink => (
                      <button
                        key={subLink.key}
                        onClick={() => handleNav(subLink.key)}
                        className={`mobile-navbar-link sub-link ${currentPage === subLink.key ? 'active' : ''}`}
                      >
                        {subLink.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return (
            <button
              key={link.key}
              onClick={() => handleNav(link.key)}
              className={`mobile-navbar-link ${currentPage === link.key ? 'active' : ''}`}
            >
              {link.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
