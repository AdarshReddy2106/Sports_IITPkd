import React, { useState, createContext, useContext, useEffect } from 'react';
import Navigation from './components/Navigation';
import MobileNav from './components/MobileNav';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Calendar from './pages/Calendar';
import Bookings from './pages/Bookings';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/privacypolicy';
import BikePreloader from './components/bikePreloader';
import AdminDashboard from './pages/AdminDashboard';

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

const SportsIITPkd = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust loading time as needed

    return () => clearTimeout(timer);
  }, []);

  window.setCurrentPage = setCurrentPage;

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'about':
        return <About setCurrentPage={setCurrentPage} />;
      case 'gallery':
        return <Gallery setCurrentPage={setCurrentPage} />;
      case 'calendar':
        return <Calendar setCurrentPage={setCurrentPage} />;
      case 'bookings':
        return <Bookings setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <Contact setCurrentPage={setCurrentPage} />;
      case 'privacypolicy':
        return <PrivacyPolicy setCurrentPage={setCurrentPage} />;
      case 'admindashboard':
        return <AdminDashboard setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider>
      {/* Pass the isLoading state as the isVisible prop */}
      <BikePreloader isVisible={isLoading} />
      
      {/* Use a key to re-mount the main content, ensuring transitions run correctly */}
      <div 
        key={isLoading ? 'loading' : 'loaded'}
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        <Navigation 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          isHomePage={currentPage === 'home'}
        />
        <MobileNav 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          isHomePage={currentPage === 'home'}
        />
        {renderPage()}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default SportsIITPkd;