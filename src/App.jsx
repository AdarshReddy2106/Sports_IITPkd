import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import MobileNav from './components/MobileNav';
import Home from './pages/Home';
import About from './pages/About/About';
import Gallery from './pages/Gallery/Gallery';
import Calendar from './pages/Calender/Calendar';
import Bookings from './pages/Bookings/Bookings';
import Contact from './pages/Contact/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/privacypolicy';
import BikePreloader from './components/bikePreloader';
import AdminDashboard from './pages/AdminDashboard';
import Events from './pages/Events';
import Clubs from './pages/Clubs/Clubs';
import SportPage from './components/SportsPage';
import Staff from './pages/People/Staff';
import CoreTeam from './pages/People/CoreTeam';
import WebTeam from './pages/People/WebTeam';

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Component to track current page and handle loading
const AppContent = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 886);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 886);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update current page based on route
  useEffect(() => {
    const path = location.pathname.substring(1);
    if (path === '') {
      setCurrentPage('home');
    } else if (path.startsWith('clubs')) {
      setCurrentPage('clubs'); // Keep parent active for sport pages
    } else {
      setCurrentPage(path);
    }
  }, [location]);

  // Handle preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <>
      <BikePreloader isVisible={isLoading} />
      
      <div 
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        {isMobile ? (
          <MobileNav 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
            isHomePage={isHomePage}
          />
        ) : (
          <Navigation 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
            isHomePage={isHomePage}
          />
        )}

        <main>
          <Routes>
            <Route path="/" element={<Home setCurrentPage={setCurrentPage} isLoaded={!isLoading} />} />
            <Route path="/about" element={<About setCurrentPage={setCurrentPage} isLoaded={!isLoading} />} />
            <Route path="/clubs" element={<Clubs setCurrentPage={setCurrentPage} isLoaded={!isLoading} />} />
            <Route path="/clubs/:sportName" element={<SportPage setCurrentPage={setCurrentPage} isLoaded={!isLoading} />} />
            <Route path="/staff" element={<Staff setCurrentPage={setCurrentPage} isLoaded={!isLoading} />} />
            <Route path="/core-team" element={<CoreTeam setCurrentPage={setCurrentPage} isLoaded={!isLoading} />} />
            <Route path="/web-team" element={<WebTeam setCurrentPage={setCurrentPage} isLoaded={!isLoading} />} />
            <Route path="/gallery" element={<Gallery setCurrentPage={setCurrentPage} isLoaded={!isLoading} />} />
            <Route path="/calendar" element={<Calendar setCurrentPage={setCurrentPage} isLoaded={!isLoading} />} />
            <Route path="/events" element={<Events setCurrentPage={setCurrentPage} isLoaded={!isLoading} />} />
            <Route path="/bookings" element={<Bookings setCurrentPage={setCurrentPage} isLoaded={!isLoading} />} />
            <Route path="/contact" element={<Contact setCurrentPage={setCurrentPage} isLoaded={!isLoading} />} />
            <Route path="/admindashboard" element={<AdminDashboard setCurrentPage={setCurrentPage} isLoaded={!isLoading} />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy setCurrentPage={setCurrentPage} isLoaded={!isLoading} />} />
            <Route path="*" element={<Home setCurrentPage={setCurrentPage} isLoaded={!isLoading} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
};

const SportsIITPkd = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default SportsIITPkd;
