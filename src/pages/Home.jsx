import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { CheckCircle, MapPin, Users, Calendar, Clock, ExternalLink, ArrowRight } from 'lucide-react';
import { supabase } from '../../Js/supabase';
import './UpcomingEvents.css';

// Build image URLs exactly like in Gallery.jsx (strip spaces, lowercase)
const makeImages = (title) => {
  if (!title) return [];
  const slug = title.replace(/\s/g, '').toLowerCase();
  return [1, 2, 3].map((n) => `/uploads/${slug}-${n}.jpg`);
};

// Counter Hook for animated counting
const useCounter = (end, duration = 2000, delay = 0) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * end);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [end, duration, delay, isVisible]);

  return [count, countRef, isVisible];
};

const Home = ({ isLoaded }) => { // Removed setCurrentPage from props
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [animationClass, setAnimationClass] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedHome');
    if (isLoaded) {
      if (hasVisited) {
        setAnimationClass('instant');
      } else {
        const timer = setTimeout(() => {
          setAnimationClass('animate');
          sessionStorage.setItem('hasVisitedHome', 'true');
        }, 50);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoaded]);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      // FIXED: Create a timezone-safe date string for today
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const todayDateString = `${year}-${month}-${day}`;

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('date', todayDateString) // Use the corrected date string
        .order('date', { ascending: true })
        .limit(3);

      if (!error && data) {
        setUpcomingEvents(data);
      }
    };
    fetchUpcomingEvents();
  }, []);

  const facilities = [
    {
      id: 'cricket',
      name: 'Cricket Ground',
      description: 'Full-sized cricket ground (placeholder photos).',
      icon: '🏏',
      color: '#0d9488',
    },
    {
      id: 'basketball',
      name: 'Basketball Court',
      description: 'Professional-grade courts for training and matches.',
      icon: '🏀',
      color: '#1e40af',
    },
    {
      id: 'fitness',
      name: 'Fitness Center',
      description: 'Modern equipment for strength and conditioning.',
      icon: '🏋️',
      color: '#ef4444',
    },
    {
      id: 'tabletennis',
      name: 'Table Tennis',
      description: 'Indoor tables for practice and tournaments.',
      icon: '🏓',
      color: '#0d9488',
    },
    {
      id: 'track',
      name: 'Athletic Track',
      description: 'Professional running track for training and events.',
      icon: '🏃',
      color: '#1e40af',
    },
    {
      id: 'badminton',
      name: 'Badminton Courts',
      description: 'Indoor courts with proper flooring & lighting.',
      icon: '🏸',
      color: '#ef4444',
    },
  ];

  const Hero = () => {
    const title = "Sports IIT Palakkad";
    let letterCount = 0;
  
    return (
      <div className="hero-with-bg">
        <div className="hero-overlay">
          <div className={`hero-content ${animationClass}`}>
            <h1 className="hero-main-title">
              {title.split(' ').map((word, wordIndex) => (
                <div key={wordIndex} className="hero-word">
                  {word.split('').map((letter, letterIndex) => {
                    letterCount++;
                    return (
                      <span
                        key={letterIndex}
                        className="hero-letter"
                        style={{ animationDelay: `${(letterCount - 1) * 0.07}s` }}
                      >
                        {letter}
                      </span>
                    );
                  })}
                </div>
              ))}
            </h1>
            <div className="hero-buttons">
              {/* FIXED: Use navigate for routing */}
              <button onClick={() => navigate('/bookings')} className="btn btn-secondary">
                Book Now
              </button>
              <button onClick={() => navigate('/about')} className="btn btn-outline">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StatCard = ({ number, text, delay = 0 }) => {
    const [count, countRef, isVisible] = useCounter(number, 2000, delay);
    const [isCounting, setIsCounting] = useState(false);

    useEffect(() => {
      if (isVisible && count < number) {
        setIsCounting(true);
        const timer = setTimeout(() => setIsCounting(false), 100);
        return () => clearTimeout(timer);
      }
    }, [count, number, isVisible]);

    return (
      <div ref={countRef} className="stat-card">
        <div className={`stat-num ${isCounting ? 'counting' : ''}`}>{count}</div>
        <div className="stat-text">{text}</div>
      </div>
    );
  };

  const Details = () => (
    <div className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <div className="home-stats">
          <StatCard number={20} text="Events Conducted" delay={0} />
          <StatCard number={150} text="Matches Played" delay={0} />
          <StatCard number={1000} text="No. of Participants" delay={0} />
        </div>
      </div>
    </div>
  );

  const WhyChooseUs = () => (
    <div className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <h2 className="section-title">Why Choose <span className="text-gradient">Us</span></h2>
        <div className="grid grid-3">
          <div className="card">
            <div
              style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'white',
              }}
            >
              <CheckCircle size={24} />
            </div>
            <h3>Expert Coaching</h3>
            <p>
              Our certified coaches bring years of experience to help you
              improve your skills and performance.
            </p>
          </div>
          <div className="card">
            <div
              style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #0d9488, #059669)',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'white',
              }}
            >
              <MapPin size={24} />
            </div>
            <h3>Modern Facilities</h3>
            <p>
              State-of-the-art equipment and facilities designed to enhance your
              training and competition experience.
            </p>
          </div>
          <div className="card">
            <div
              style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'white',
              }}
            >
              <Users size={24} />
            </div>
            <h3>Community Focus</h3>
            <p>
              Join a supportive community of athletes and enthusiasts who share
              your passion for sports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const FacilitiesGrid = () => (
    <div className="section">
      <div className="container">
        <h2 className="section-title">
          Our <span className="text-gradient">Facilities</span>
        </h2>
        <div className="grid grid-3">
          {facilities.map((facility) => {
            const imgs = makeImages(facility.name);
            return (
              <div key={facility.id} className="card facility-card">
                {imgs.length ? (
                 <img
                    src={imgs[0]} 
                    alt={facility.name}
                    className="facility-image"
                  />
                ) : (
                  <div className="facility-image-placeholder"
                    style={{
                      background: `linear-gradient(135deg, ${facility.color}, ${facility.color}dd)`,
                    }}
                  >
                    <span>{facility.icon}</span>
                  </div>
                )}
                <h3>{facility.name}</h3>
                <p>{facility.description}</p>
              </div>
            );
          })}
        </div>
        <div className="text-center" style={{ marginTop: '3rem' }}>
          {/* FIXED: Use navigate for routing */}
          <button onClick={() => navigate('/gallery')} className="btn btn-secondary">
            View More Photos
          </button>
        </div>
      </div>
    </div>
  );
  
const UpcomingEvents = () => (
  <section className="upcoming-events-section">
    <div className="container">
      <div className="upcoming-events-header">
        <h2>
          Upcoming <span className="text-gradient">Events</span>
        </h2>
        <p className="upcoming-events-subtitle">
          Don't miss out on our exciting upcoming events and competitions
        </p>
      </div>
      <div className="upcoming-events-grid">
        {upcomingEvents.length === 0 ? (
          <div className="no-events">
            <Calendar size={64} />
            <h3>No Upcoming Events</h3>
            <p>Stay tuned for exciting events and competitions!</p>
          </div>
        ) : (
          upcomingEvents.map((event) => {
            const eventDate = new Date(event.date);
            const monthNames = [
              'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
              'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
            ];

            return (
              <div key={event.id} className="upcoming-event-card">
                <div className={`event-date-badge ${event.color?.includes('red') ? 'red' : event.color?.includes('teal') ? 'teal' : 'blue'}`}>
                  <span className="event-month">
                    {monthNames[eventDate.getMonth()]}
                  </span>
                  <span className="event-day">
                    {eventDate.getDate()}
                  </span>
                </div>
                <div className="event_content">
                  <h3 className="event_title">{event.title}</h3>
                  
                  {(event.startTime && event.endTime) && (
                    <div className="event_time">
                      <Clock size={16} />
                      {event.startTime} - {event.endTime}
                    </div>
                  )}

                  {event.description && (
                    <p className="event-description">{event.description}</p>
                  )}
                  
                  {event.eventLink && (
                    <div className="event-actions">
                      <a
                        href={event.eventLink}
                        target="_blank"                
                        rel="noopener noreferrer"
                        className="event-action-btn"
                      >
                        <ExternalLink size={16} />
                        {event.linkText || "View Details"}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="events-footer">
        {/* FIXED: Use navigate for routing */}
        <button className="view-all-events-btn" onClick={() => navigate('/calendar')}>
          View All Events
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  </section>
);

  return (
    <>
      <Hero />
      <Details />
      <UpcomingEvents />
      <WhyChooseUs />
      <FacilitiesGrid />
    </>
  );
};

export default Home;