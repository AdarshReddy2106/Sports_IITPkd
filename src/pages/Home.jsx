import React, { useState, useEffect, useRef } from 'react';
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
        
        // Easing function for smooth animation
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

const Home = ({ setCurrentPage }) => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('date', today)
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
      icon: '💪',
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

  const Hero = () => (
    <div className="hero">
      <div className="container">
        <h1>Empowering Athletes, Building Champions</h1>
        <p>
          Your journey to excellence starts here with Sports Council's
          world-class facilities and expert coaching.
        </p>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => setCurrentPage('bookings')}
            className="btn btn-secondary"
          >
            Book Now
          </button>
          <button
            onClick={() => setCurrentPage('about')}
            className="btn"
            style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );

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
        <div className={`stat-num ${isCounting ? 'counting' : ''}`}>
          {count}
        </div>
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

  const formatEventDate = (dateString) => {
    const eventDate = new Date(dateString);
    const month = eventDate.toLocaleDateString('en-US', { month: 'short' });
    const day = eventDate.getDate();
    return { month, day };
  };

  const getEventColorClass = (color) => {
    if (color?.includes('teal')) return 'teal';
    if (color?.includes('red')) return 'red';
    return 'blue';
  };

  const handleEventClick = (event) => {
    if (event.registrationLink) {
      window.open(event.registrationLink, '_blank');
    } else if (event.posterUrl) {
      window.open(event.posterUrl, '_blank');
    }
  };

  const WhyChooseUs = () => (
    <div className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <h2 className="section-title">
          Why Choose <span className="text-gradient">Us</span>
        </h2>
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
            const imgs = makeImages(facility.name); // match Gallery titles
            return (
              <div key={facility.id} className="card facility-card">
                {imgs.length ? (
                 <img
                    src={imgs[0]} 
                    alt={facility.name}
                    className="facility-image"
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '1rem',
                      marginBottom: '1rem',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: '200px',
                      background: `linear-gradient(135deg, ${facility.color}, ${facility.color}dd)`,
                      borderRadius: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                      color: 'white',
                    }}
                  >
                    <span className="facility-icon">{facility.icon}</span>
                  </div>
                )}
                <h3>{facility.name}</h3>
                <p>{facility.description}</p>
              </div>
            );
          })}
        </div>
        <div className="text-center" style={{ marginTop: '3rem' }}>
          <button
            onClick={() => setCurrentPage('gallery')}
            className="btn btn-secondary"
          >
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

                  {/* FIXED: Updated event link logic */}
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
        <button 
          className="view-all-events-btn"
          onClick={() => setCurrentPage('calendar')}
        >
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