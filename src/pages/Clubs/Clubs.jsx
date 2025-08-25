import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Clubs.css';

// Import all logo images
import athletics from '/Logos/1.png';
import badminton from '/Logos/8.png';
import basketball from '/Logos/2.png';
import chess from '/Logos/9.png';
import cricket from '/Logos/3.png';
import football from '/Logos/4.png';
import gym from '/Logos/6.png';
import tableTennis from '/Logos/7.png';
import volleyball from '/Logos/10.png';

// Importing icons from lucide-react for fallback
import { Zap, Target, Dribbble, Trophy, CircleDot, Gamepad2, Crown, Dumbbell, Activity } from 'lucide-react';

// Data for the sports programs - now alphabetically sorted by title
const sportsData = [
  {
    icon: <Activity />,
    title: 'Athletics',
    slug: 'athletics',
    color: '#f97316', // Orange-red
    logoImg: athletics
  },
  {
    icon: <Zap />,
    title: 'Badminton',
    slug: 'badminton',
    color: '#3b82f6', // Blue
    logoImg: badminton
  },
  {
    icon: <Dribbble />,
    title: 'Basketball',
    slug: 'basketball',
    color: '#ef4444', // Red
    logoImg: basketball
  },
  {
    icon: <Crown />,
    title: 'Chess',
    slug: 'chess',
    color: '#6366f1', // Indigo
    logoImg: chess
  },
  {
    icon: <Trophy />,
    title: 'Cricket',
    slug: 'cricket',
    color: '#10b981', // Green
    logoImg: cricket
  },
  {
    icon: <CircleDot />,
    title: 'Football',
    slug: 'football',
    color: '#8b5cf6', // Purple
    logoImg: football
  },
  {
    icon: <Dumbbell />,
    title: 'Gym',
    slug: 'gym',
    color: '#ec4899', // Pink
    logoImg: gym
  },
  {
    icon: <Gamepad2 />,
    title: 'Table Tennis',
    slug: 'table-tennis',
    color: '#06b6d4', // Cyan
    logoImg: tableTennis
  },
  {
    icon: <Target />,
    title: 'Volleyball',
    slug: 'volleyball',
    color: '#f59e0b', // Orange
    logoImg: volleyball
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
        <h2>Our Sports <span className="text-gradient">Programs</span></h2>
        <p>Explore our comprehensive range of sports facilities and programs designed to nurture athletic talent and promote physical excellence.</p>
      </div>
      <div className="sports-grid">
        {sportsData.map((sport, index) => (
          <article 
            key={index} 
            className="sport-card" 
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
              {sport.logoImg ? (
                <img 
                  src={sport.logoImg} 
                  alt={`${sport.title}`} 
                  className="sport-logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : (
                <div className="sport-icon-wrapper">
                  {sport.icon}
                </div>
              )}
            </div>
            <div className="sport-content">
              <h3>{sport.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Clubs;