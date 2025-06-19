import React, { useState, createContext, useContext, useEffect } from 'react';
import Navigation from './components/Navigation';
import MobileNav from './components/MobileNav';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Calendar from './pages/Calendar';``
import Bookings from './pages/Bookings';
import Contact from './pages/Contact';

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
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-all duration-300">
        <div className="md:hidden">
          <MobileNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
        <div className="hidden md:block">
          <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
        <main className="fade-in">
          {renderPage()}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default EliteSportsCouncil;