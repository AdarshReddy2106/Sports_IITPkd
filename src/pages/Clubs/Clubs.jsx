import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Clubs.css';

// Importing icons from lucide-react
import { Zap, Target, Dribbble, Trophy, CircleDot, Gamepad2 } from 'lucide-react';

// Data for the sports programs
const sportsData = [
  {
    icon: <Zap />,
    title: 'Badminton',
    slug: 'badminton',
    description: 'Fast-paced racket sport emphasizing agility, precision, and strategic play.',
    color: '#3b82f6' // Blue
  },
  {
    icon: <Target />,
    title: 'Volleyball',
    slug: 'volleyball',
    description: 'Team sport promoting communication, coordination, and athletic excellence.',
    color: '#f59e0b' // Orange
  },
  {
    icon: <Dribbble />,
    title: 'Basketball',
    slug: 'basketball',
    description: 'Dynamic team sport combining strategy, skill, and competitive spirit.',
    color: '#ef4444' // Red
  },
  {
    icon: <Trophy />,
    title: 'Cricket',
    slug: 'cricket',
    description: 'Traditional sport requiring technique, patience, and mental strength.',
    color: '#10b981' // Green
  },
  {
    icon: <CircleDot />,
    title: 'Football',
    slug: 'football',
    description: 'The beautiful game that builds teamwork and athletic prowess.',
    color: '#8b5cf6' // Purple
  },
  {
    icon: <Gamepad2 />,
    title: 'Table Tennis',
    slug: 'table-tennis',
    description: 'Quick reflexes and precision in this fast-paced indoor sport.',
    color: '#06b6d4' // Cyan
  }
];

const Clubs = () => {
  const navigate = useNavigate();

  const handleSportClick = (slug) => {
    navigate(`/clubs/${slug}`);
  };

  return (
    <section className="sports-programs-container">
      <div className="sports-programs-header">
        <h2>Our Sports Programs</h2>
        <p>Explore our comprehensive range of sports facilities and programs designed to nurture athletic talent and promote physical excellence.</p>
      </div>
      <div className="sports-grid">
        {sportsData.map((sport, index) => (
          <article 
            key={index} 
            className="sport-card" 
            style={{ '--sport-color': sport.color }}
            onClick={() => handleSportClick(sport.slug)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSportClick(sport.slug);
              }
            }}
          >
            <div className="sport-image-container">
              <div className="sport-icon-wrapper">
                {sport.icon}
              </div>
            </div>
            <div className="sport-content">
              <h3>{sport.title}</h3>
              <p className="sport-description">{sport.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Clubs;