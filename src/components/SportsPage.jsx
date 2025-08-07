import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Building, Trophy, Phone, Camera } from 'lucide-react';
import '../components/SportsPage.css'; 

// Sports data with detailed information
const sportsData = {
  badminton: {
    title: 'Badminton',
    subtitle: 'Excellence in Sports',
    about: {
      description: 'Our badminton program fosters athletic excellence and strategic thinking. With state-of-the-art courts and expert coaching, we develop players from beginners to competitive athletes. The sport emphasizes agility, precision, and mental toughness, making it one of our most popular programs.',
      stats: [
        { number: '45', label: 'Active Players', color: '#667eea' },
        { number: '6', label: 'Teams', color: '#f59e0b' },
        { number: '12', label: 'Tournaments Won', color: '#10b981' }
      ]
    },
    facilities: [
      {
        name: 'Indoor Badminton Court A',
        description: 'Professional-grade court with competition lighting and ventilation',
        location: 'Sports Complex - Ground Floor',
        features: ['Wooden flooring', 'Professional nets', 'LED lighting', 'Air conditioning']
      },
      {
        name: 'Indoor Badminton Court B',
        description: 'Training court perfect for practice sessions and skill development',
        location: 'Sports Complex - Ground Floor',
        features: ['Synthetic flooring', 'Standard nets', 'Natural lighting', 'Equipment storage']
      }
    ],
    Rules: [
      {
        title: 'Inter-College Badminton Championship',
        year: '2024',
        description: 'First place in both men\'s and women\'s doubles categories',
        level: 'State'
      },
      {
        title: 'Regional Youth Tournament',
        year: '2023',
        description: 'Multiple medals in singles and doubles events',
        level: 'Regional'
      },
      {
        title: 'National University Games',
        year: '2023',
        description: 'Qualified for quarter-finals in team events',
        level: 'National'
      }
    ],
    contact: [
      {
        name: 'Dr. Priya Sharma',
        role: 'Head Coach',
        email: 'priya.sharma@institute.edu',
        phone: '+91 98765 43210',
        location: 'Sports Complex - Room 101'
      },
      {
        name: 'Arjun Kumar',
        role: 'Assistant Coach',
        email: 'arjun.kumar@institute.edu',
        phone: '+91 98765 43211'
      }
    ],
    gallery: [
      { title: 'Championship Victory 2024', description: 'Team celebrating state championship win', date: 'March 2024' },
      { title: 'Training Session Highlights', description: 'Intensive training session with new recruits', date: 'February 2024' },
      { title: 'Tournament Action', description: 'Intense match moments from regional tournament', date: 'January 2024' }
    ]
  },
  volleyball: {
    title: 'Volleyball',
    subtitle: 'Excellence in Sports',
    about: {
      description: 'Our volleyball program promotes communication, coordination, and athletic excellence. With dedicated courts and experienced coaching staff, we build strong teams that compete at various levels.',
      stats: [
        { number: '32', label: 'Active Players', color: '#667eea' },
        { number: '4', label: 'Teams', color: '#f59e0b' },
        { number: '8', label: 'Tournaments Won', color: '#10b981' }
      ]
    },
    facilities: [
      {
        name: 'Outdoor Volleyball Court',
        description: 'Full-size court with professional net and lighting',
        location: 'Sports Complex - Outdoor Area',
        features: ['Sand flooring', 'Professional nets', 'Floodlights', 'Spectator seating']
      }
    ],
    Rules: [
      {
        title: 'State Volleyball Championship',
        year: '2024',
        description: 'Second place in men\'s category',
        level: 'State'
      }
    ],
    contact: [
      {
        name: 'Coach Rajesh Kumar',
        role: 'Head Coach',
        email: 'rajesh.kumar@institute.edu',
        phone: '+91 98765 43212',
        location: 'Sports Complex - Room 102'
      }
    ],
    gallery: [
      { title: 'Team Training', description: 'Daily practice session', date: 'March 2024' }
    ]
  },
  basketball: {
    title: 'Basketball',
    subtitle: 'Excellence in Sports',
    about: {
      description: 'Dynamic team sport combining strategy, skill, and competitive spirit. Our basketball program develops both individual skills and team coordination.',
      stats: [
        { number: '28', label: 'Active Players', color: '#667eea' },
        { number: '3', label: 'Teams', color: '#f59e0b' },
        { number: '6', label: 'Tournaments Won', color: '#10b981' }
      ]
    },
    facilities: [
      {
        name: 'Indoor Basketball Court',
        description: 'Full-size court with professional hoops and flooring',
        location: 'Sports Complex - First Floor',
        features: ['Wooden flooring', 'Professional hoops', 'LED lighting', 'Sound system']
      }
    ],
    Rules: [
      {
        title: 'Regional Basketball Tournament',
        year: '2024',
        description: 'Champions in inter-college category',
        level: 'Regional'
      }
    ],
    contact: [
      {
        name: 'Coach Michael Johnson',
        role: 'Head Coach',
        email: 'michael.johnson@institute.edu',
        phone: '+91 98765 43213',
        location: 'Sports Complex - Room 103'
      }
    ],
    gallery: [
      { title: 'Championship Game', description: 'Final moments of regional championship', date: 'February 2024' }
    ]
  },
  cricket: {
    title: 'Cricket',
    subtitle: 'Excellence in Sports',
    about: {
      description: 'Traditional sport requiring technique, patience, and mental strength. Our cricket program focuses on developing all aspects of the game.',
      stats: [
        { number: '55', label: 'Active Players', color: '#667eea' },
        { number: '5', label: 'Teams', color: '#f59e0b' },
        { number: '15', label: 'Tournaments Won', color: '#10b981' }
      ]
    },
    facilities: [
      {
        name: 'Cricket Ground',
        description: 'Full-size ground with turf wicket and practice nets',
        location: 'Sports Complex - Main Field',
        features: ['Turf wicket', 'Practice nets', 'Pavilion', 'Scoreboard']
      }
    ],
    Rules: [
      {
        title: 'Inter-University Cricket Championship',
        year: '2024',
        description: 'Winners in T20 format',
        level: 'National'
      }
    ],
    contact: [
      {
        name: 'Coach Suresh Raina',
        role: 'Head Coach',
        email: 'suresh.raina@institute.edu',
        phone: '+91 98765 43214',
        location: 'Sports Complex - Room 104'
      }
    ],
    gallery: [
      { title: 'Victory Celebration', description: 'Team celebrating championship win', date: 'March 2024' }
    ]
  },
  football: {
    title: 'Football',
    subtitle: 'Excellence in Sports',
    about: {
      description: 'The beautiful game that builds teamwork and athletic prowess. Our football program emphasizes skill development and tactical understanding.',
      stats: [
        { number: '42', label: 'Active Players', color: '#667eea' },
        { number: '4', label: 'Teams', color: '#f59e0b' },
        { number: '10', label: 'Tournaments Won', color: '#10b981' }
      ]
    },
    facilities: [
      {
        name: 'Football Field',
        description: 'Full-size grass field with goals and lighting',
        location: 'Sports Complex - Main Field',
        features: ['Natural grass', 'Professional goals', 'Floodlights', 'Dugouts']
      }
    ],
    Rules: [
      {
        title: 'State Football League',
        year: '2024',
        description: 'Runners-up in division A',
        level: 'State'
      }
    ],
    contact: [
      {
        name: 'Coach Diego Martinez',
        role: 'Head Coach',
        email: 'diego.martinez@institute.edu',
        phone: '+91 98765 43215',
        location: 'Sports Complex - Room 105'
      }
    ],
    gallery: [
      { title: 'League Match', description: 'Action from state league final', date: 'April 2024' }
    ]
  },
  'table-tennis': {
    title: 'Table Tennis',
    subtitle: 'Excellence in Sports',
    about: {
      description: 'Quick reflexes and precision in this fast-paced indoor sport. Our table tennis program develops hand-eye coordination and strategic thinking.',
      stats: [
        { number: '25', label: 'Active Players', color: '#667eea' },
        { number: '3', label: 'Teams', color: '#f59e0b' },
        { number: '7', label: 'Tournaments Won', color: '#10b981' }
      ]
    },
    facilities: [
      {
        name: 'Table Tennis Hall',
        description: 'Multiple tables with professional lighting',
        location: 'Sports Complex - Ground Floor',
        features: ['Professional tables', 'LED lighting', 'Air conditioning', 'Equipment storage']
      }
    ],
    Rules: [
      {
        title: 'Inter-College Table Tennis Championship',
        year: '2024',
        description: 'Gold in singles and doubles',
        level: 'State'
      }
    ],
    contact: [
      {
        name: 'Coach Li Wei',
        role: 'Head Coach',
        email: 'li.wei@institute.edu',
        phone: '+91 98765 43216',
        location: 'Sports Complex - Room 106'
      }
    ],
    gallery: [
      { title: 'Tournament Action', description: 'Intense rally during championship', date: 'March 2024' }
    ]
  }
};

const SportPage = () => {
  const { sportName } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  
  const sport = sportsData[sportName];
  
  if (!sport) {
    return <div>Sport not found</div>;
  }

  const tabs = [
    { id: 'about', label: 'About', icon: User },
    { id: 'facilities', label: 'Facilities', icon: Building },
    { id: 'Rules', label: 'Rules', icon: Trophy },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'gallery', label: 'Gallery', icon: Camera }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="content-card">
            <div className="section-header">
              <User />
              <h3>About {sport.title}</h3>
            </div>
            <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '2rem' }}>
              {sport.about.description}
            </p>
            
            <div className="stats-grid">
              {sport.about.stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-number" style={{ color: stat.color }}>
                    {stat.number}
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'facilities':
        return (
          <div className="facilities-grid">
            {sport.facilities.map((facility, index) => (
              <div key={index} className="facility-card">
                <div className="section-header">
                  <Building />
                  <h3>{facility.name}</h3>
                </div>
                <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '1rem' }}>
                  {facility.description}
                </p>
                <div className="facility-location">
                  <span>📍</span>
                  {facility.location}
                </div>
                <div className="features-list">
                  {facility.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'Rules':
        return (
          <div className="Rules-grid">
            {sport.Rules.map((Rules, index) => (
              <div key={index} className="Rules-card">
                <div className="Rules-header">
                  <div className="Rules-title-section">
                    <Trophy />
                    <h3 className="Rules-title">{Rules.title}</h3>
                  </div>
                  <span className="Rules-year">{Rules.year}</span>
                </div>
                <p className="Rules-description">{Rules.description}</p>
                <span className={`level-badge ${Rules.level.toLowerCase()}`}>
                  {Rules.level}
                </span>
              </div>
            ))}
          </div>
        );
      
      case 'contact':
        return (
          <div className="contact-grid">
            {sport.contact.map((contact, index) => (
              <div key={index} className="contact-card">
                <div className="contact-header">
                  <User />
                  <div className="contact-info">
                    <h3 className="contact-name">{contact.name}</h3>
                    <p className="contact-role">{contact.role}</p>
                  </div>
                </div>
                <div className="contact-details">
                  <div className="contact-item">
                    <span>📧</span>
                    <a href={`mailto:${contact.email}`}>
                      {contact.email}
                    </a>
                  </div>
                  <div className="contact-item">
                    <span>📞</span>
                    <a href={`tel:${contact.phone}`}>
                      {contact.phone}
                    </a>
                  </div>
                  {contact.location && (
                    <div className="contact-item">
                      <span>📍</span>
                      <span style={{ color: '#64748b' }}>{contact.location}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'gallery':
        return (
          <div className="gallery-grid">
            {sport.gallery.map((item, index) => (
              <div key={index} className="gallery-card">
                <div className="gallery-image-placeholder">
                  <Camera />
                </div>
                <div className="gallery-content">
                  <h3 className="gallery-title">{item.title}</h3>
                  <p className="gallery-description">{item.description}</p>
                  <span className="gallery-date">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="sport-page">
      {/* Header */}
      <div className="sport-header">
        <div className="sport-header-content">
          <h1>{sport.title}</h1>
          <p>{sport.subtitle}</p>
        </div>
      </div>

      {/* Back button */}
      <div className="back-button-container">
        <button
          onClick={() => navigate('/clubs')}
          className="back-button"
        >
          <ArrowLeft size={20} />
          Back to Sports
        </button>
      </div>

      {/* Navigation tabs */}
      <div className="tabs-container">
        <div className="tabs-wrapper">
          <nav className="tabs-nav">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <Icon />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="content-container">
        {renderContent()}
      </div>
    </div>
  );
};

export default SportPage;