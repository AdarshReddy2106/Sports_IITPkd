import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Clubs.css';

// Importing icons from lucide-react
import { Zap, Target, Dribbble, Trophy, CircleDot, Gamepad2, Crown, Dumbbell, Activity } from 'lucide-react';

// Data for the sports programs - now alphabetically sorted by title
const sportsData = [
  {
    icon: <Activity />,
    title: 'Athletics',
    slug: 'athletics',
    description: 'Track and field events testing speed, endurance, and athletic prowess.',
    color: '#f97316' // Orange-red
  },
  {
    icon: <Zap />,
    title: 'Badminton',
    slug: 'badminton',
    description: 'Fast-paced racket sport emphasizing agility, precision, and strategic play.',
    color: '#3b82f6' // Blue
  },
  {
    icon: <Dribbble />,
    title: 'Basketball',
    slug: 'basketball',
    description: 'Dynamic team sport combining strategy, skill, and competitive spirit.',
    color: '#ef4444' // Red
  },
  {
    icon: <Crown />,
    title: 'Chess',
    slug: 'chess',
    description: 'Strategic board game developing critical thinking and mental fortitude.',
    color: '#6366f1' // Indigo
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
    icon: <Dumbbell />,
    title: 'Gym',
    slug: 'gym',
    description: 'Modern fitness facilities for strength training and physical conditioning.',
    color: '#ec4899' // Pink
  },
  {
    icon: <Gamepad2 />,
    title: 'Table Tennis',
    slug: 'table-tennis',
    description: 'Quick reflexes and precision in this fast-paced indoor sport.',
    color: '#06b6d4' // Cyan
  },
  {
    icon: <Target />,
    title: 'Volleyball',
    slug: 'volleyball',
    description: 'Team sport promoting communication, coordination, and athletic excellence.',
    color: '#f59e0b' // Orange
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