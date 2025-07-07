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
// Theme Context (keep your existing code)
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
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Apply theme to document
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

const EliteSportsCouncil = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true); // ADD THIS LINE

  // ADD THIS useEffect FOR LOADING TIMER
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  // Make setCurrentPage available globally for Footer
  window.setCurrentPage = setCurrentPage;

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'gallery':
        return <Gallery />;
      case 'calendar':
        return <Calendar />;
      case 'bookings':
        return <Bookings />;
      case 'contact':
        return <Contact />;
      case 'privacypolicy':  
        return <PrivacyPolicy />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-all duration-300">
        {/* ADD THIS LINE - Animated Bike Preloader */}
        <BikePreloader isVisible={isLoading} />
        
        {/* WRAP YOUR EXISTING CONTENT IN THIS DIV WITH OPACITY TRANSITION */}
        <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease-in' }}>
          <div className="md:hidden">
            <MobileNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
          <div className="hidden md:block">
            <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
          <main className="fade-in">
            {renderPage()}
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default EliteSportsCouncil;