import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Building, Trophy, Phone } from 'lucide-react';
import '../components/SportsPage.css'; 

// Sports data with detailed information
const sportsData = {
  badminton: {
    title: 'Badminton',
    subtitle: 'Excellence in Sports',
    about: {
      description: 'Our badminton program fosters athletic excellence and strategic thinking. With state-of-the-art courts and expert coaching, we develop players from beginners to competitive athletes. The sport emphasizes agility, precision, and mental toughness, making it one of our most popular programs.',
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
    rules: [
      {
        title: 'Court Dimensions & Equipment',
        year: '',
        description: 'Standard court size is 13.4m x 5.18m with a net height of 1.55m. Rackets and shuttlecocks must meet BWF standards.',
        level: 'General'
      },
      {
        title: 'Scoring System',
        year: '',
        description: 'Games are played to 21 points with rally scoring. A match is best of 3 games. At 20-all, a side must win by 2 clear points.',
        level: 'Competition'
      },
      {
        title: 'Service & Play Rules',
        year: '',
        description: 'Service must be underhand and below waist height. The shuttle must land diagonally opposite court. Let calls apply for service interruptions.',
        level: 'General'
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
    ]
  },
  volleyball: {
    title: 'Volleyball',
    subtitle: 'Excellence in Sports',
    about: {
      description: 'Our volleyball program promotes communication, coordination, and athletic excellence. With dedicated courts and experienced coaching staff, we build strong teams that compete at various levels.',
    },
    facilities: [
      {
        name: 'Outdoor Volleyball Court',
        description: 'Full-size court with professional net and lighting',
        location: 'Sports Complex - Outdoor Area',
        features: ['Sand flooring', 'Professional nets', 'Floodlights', 'Spectator seating']
      }
    ],
    rules: [
      {
        title: 'Court and Ball Specifications',
        year: '',
        description: 'The volleyball court measures 18m x 9m, divided by a net. The ball must be spherical, made of leather or synthetic material, and have a circumference of 65-67cm.',
        level: 'General'
      },
      {
        title: 'Scoring System',
        year: '',
        description: 'Matches are played best of 5 sets. A set is won by the first team to reach 25 points with a 2-point lead.',
        level: 'Competition'
      },
      {
        title: 'Service Rules',
        year: '',
        description: 'The server must hit the ball behind the end line and within the sidelines. The ball must go over the net and land in the opponent\'s court.',
        level: 'General'
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
    ]
  },
  basketball: {
    title: 'Basketball',
    subtitle: 'Excellence in Sports',
    about: {
      description: 'Dynamic team sport combining strategy, skill, and competitive spirit. Our basketball program develops both individual skills and team coordination.',
    },
    facilities: [
      {
        name: 'Indoor Basketball Court',
        description: 'Full-size court with professional hoops and flooring',
        location: 'Sports Complex - First Floor',
        features: ['Wooden flooring', 'Professional hoops', 'LED lighting', 'Sound system']
      }
    ],
    rules: [
      {
        title: 'Court and Ball Specifications',
        year: '',
        description: 'A basketball court is 28m x 15m, with a hoop at each end. The ball should be spherical, made of leather or synthetic material, with a circumference of 74.9-76.2cm for men and 72.4-73.7cm for women.',
        level: 'General'
      },
      {
        title: 'Scoring System',
        year: '',
        description: 'A field goal is worth two points, or three points if taken beyond the three-point line. Free throws are worth one point.',
        level: 'Competition'
      },
      {
        title: 'Dribbling and Passing Rules',
        year: '',
        description: 'Players must dribble the ball while moving. Passing the ball to teammates is essential for advancing towards the basket.',
        level: 'General'
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
    ]
  },
  cricket: {
    title: 'Cricket',
    subtitle: 'Excellence in Sports',
    about: {
      description: 'Traditional sport requiring technique, patience, and mental strength. Our cricket program focuses on developing all aspects of the game.',
    },
    facilities: [
      {
        name: 'Cricket Ground',
        description: 'Full-size ground with turf wicket and practice nets',
        location: 'Sports Complex - Main Field',
        features: ['Turf wicket', 'Practice nets', 'Pavilion', 'Scoreboard']
      }
    ],
    rules: [
      {
        title: 'Field and Equipment',
        year: '',
        description: 'A cricket field is typically 450-500ft long and 400-450ft wide, with a 22-yard long pitch in the center. The game requires a cricket ball, bats, and protective gear.',
        level: 'General'
      },
      {
        title: 'Scoring System',
        year: '',
        description: 'Runs are scored by batting pairs running between the wickets after hitting the ball. Boundaries score four (if the ball hits the ground first) or six runs (if the ball is hit over the boundary on the full).',
        level: 'Competition'
      },
      {
        title: 'Bowling and Batting Rules',
        year: '',
        description: 'The bowler must deliver the ball with one foot behind the popping crease. Batters must not obstruct the fielders and should hit the ball within the 15-degree arc in front of the wicket.',
        level: 'General'
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
    ]
  },
  football: {
    title: 'Football',
    subtitle: 'Excellence in Sports',
    about: {
      description: 'The beautiful game that builds teamwork and athletic prowess. Our football program emphasizes skill development and tactical understanding.',
    },
    facilities: [
      {
        name: 'Football Field',
        description: 'Full-size grass field with goals and lighting',
        location: 'Sports Complex - Main Field',
        features: ['Natural grass', 'Professional goals', 'Floodlights', 'Dugouts']
      }
    ],
    rules: [
      {
        title: 'Field and Ball Specifications',
        year: '',
        description: 'A standard football field is 100-110m long and 64-75m wide, with a goal at each end. The ball must be spherical, made of leather or another suitable material, with a circumference of 68-70cm.',
        level: 'General'
      },
      {
        title: 'Scoring System',
        year: '',
        description: 'A goal is scored when the entire ball crosses the goal line between the goalposts and under the crossbar.',
        level: 'Competition'
      },
      {
        title: 'Offside Rule',
        year: '',
        description: 'Players are in an offside position if they are nearer to the opponent\'s goal line than both the ball and the second-last opponent when the ball is played to them, unless they are in their own half of the field.',
        level: 'General'
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
    ]
  },
  'table-tennis': {
    title: 'Table Tennis',
    subtitle: 'Excellence in Sports',
    about: {
      description: 'Quick reflexes and precision in this fast-paced indoor sport. Our table tennis program develops hand-eye coordination and strategic thinking.',
    },
    facilities: [
      {
        name: 'Table Tennis Hall',
        description: 'Multiple tables with professional lighting',
        location: 'Sports Complex - Ground Floor',
        features: ['Professional tables', 'LED lighting', 'Air conditioning', 'Equipment storage']
      }
    ],
    rules: [
      {
        title: 'Table and Equipment Specifications',
        year: '',
        description: 'A table tennis table is 2.74m long, 1.525m wide, and 76cm high. The ball must be 40mm in diameter and weigh 2.7g.',
        level: 'General'
      },
      {
        title: 'Scoring System',
        year: '',
        description: 'Games are played to 11 points, and a match is typically best of 5 or 7 games. Players switch serves every 2 points and switch sides after each game.',
        level: 'Competition'
      },
      {
        title: 'Service and Return Rules',
        year: '',
        description: 'The server must toss the ball vertically upwards at least 16cm and strike it behind the end line. The ball must be returned after one bounce on the receiver\'s side.',
        level: 'General'
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
    ]
  },
  chess: {
    title: 'Chess',
    subtitle: 'Excellence in Mind Sports',
    about: {
      description: 'Our chess program focuses on strategic thinking, mental fortitude, and analytical skills. Whether you\'re a beginner or an experienced player, our program offers opportunities for intellectual growth and competitive play in a supportive environment.',
    },
    facilities: [
      {
        name: 'Chess Training Center',
        description: 'Dedicated space for chess practice, training, and tournaments',
        location: 'Academic Block - First Floor',
        features: ['Digital chess boards', 'Chess clocks', 'Analysis software', 'Reference library']
      },
      {
        name: 'Chess Club Room',
        description: 'Casual space for friendly matches and chess discussions',
        location: 'Student Center - Ground Floor',
        features: ['Multiple chess sets', 'Comfortable seating', 'Strategy boards', 'Chess literature']
      }
    ],
    achievements: [
      {
        title: 'Inter-University Chess Championship',
        year: '2024',
        description: 'First place in team category and individual board prizes',
        level: 'State'
      },
      {
        title: 'FIDE Rated Tournament',
        year: '2023',
        description: 'Three players achieved national ratings',
        level: 'National'
      },
      {
        title: 'College Chess League',
        year: '2023',
        description: 'Champions in the regional division',
        level: 'Regional'
      }
    ],
    contact: [
      {
        name: 'Prof. Ramesh Kumar',
        role: 'Chess Coach',
        email: 'ramesh.kumar@institute.edu',
        phone: '+91 98765 43220',
        location: 'Academic Block - Room 104'
      },
      {
        name: 'Shreesh Amit',
        role: 'Chess Secretary',
        email: '112301046@smail.iitpkd.ac.in',
        phone: '+91 98765 43221'
      }
    ]
  },
  gym: {
    title: 'Gym',
    subtitle: 'Strength and Conditioning Excellence',
    about: {
      description: 'Our state-of-the-art gym facility offers comprehensive strength training and conditioning programs for all fitness levels. With modern equipment and expert guidance, we focus on proper technique, sustainable progress, and overall physical development.',
    },
    facilities: [
      {
        name: 'Main Fitness Center',
        description: 'Comprehensive fitness facility with strength and cardio equipment',
        location: 'Sports Complex - First Floor',
        features: ['Free weights section', 'Machine training area', 'Cardio zone', 'Functional training space']
      },
      {
        name: 'Cross-Training Zone',
        description: 'Dedicated space for functional fitness and high-intensity workouts',
        location: 'Sports Complex - Ground Floor',
        features: ['Olympic lifting platform', 'Pull-up stations', 'Battle ropes', 'Box jump platforms']
      }
    ],
    achievements: [
      {
        title: 'University Strength Competition',
        year: '2024',
        description: 'Multiple medals across weight categories',
        level: 'State'
      },
      {
        title: 'Fitness Challenge Series',
        year: '2023',
        description: 'Overall champions in inter-college fitness challenge',
        level: 'Regional'
      }
    ],
    contact: [
      {
        name: 'Mr. Raj Singh',
        role: 'Head Fitness Trainer',
        email: 'raj.singh@institute.edu',
        phone: '+91 98765 43222',
        location: 'Sports Complex - Gym Office'
      },
      {
        name: 'Siddharth Bharti',
        role: 'Gym Secretary',
        email: '132301033@smail.iitpkd.ac.in',
        phone: '+91 98765 43223'
      }
    ]
  },
  athletics: {
    title: 'Athletics',
    subtitle: 'Track and Field Excellence',
    about: {
      description: 'Our athletics program covers track events, field events, and long-distance running, fostering speed, endurance, and athletic prowess. We train athletes for individual excellence and team competitions at various levels.',
    },
    facilities: [
      {
        name: 'Athletic Track',
        description: 'Standard 400m track with proper lane markings',
        location: 'Sports Complex - Outdoor',
        features: ['Synthetic track surface', 'Long jump pit', 'High jump area', 'Javelin/shot put field']
      },
      {
        name: 'Indoor Training Facility',
        description: 'All-weather facility for continuous training',
        location: 'Sports Complex - First Floor',
        features: ['Sprint track', 'Plyometric area', 'Technique training zone', 'Video analysis setup']
      }
    ],
    achievements: [
      {
        title: 'University Athletics Championships',
        year: '2024',
        description: 'Gold medals in 400m, long jump, and 4x100m relay',
        level: 'State'
      },
      {
        title: 'National Inter-University Games',
        year: '2023',
        description: 'Silver medal in men\'s 800m and bronze in women\'s javelin',
        level: 'National'
      },
      {
        title: 'Cross Country Meet',
        year: '2023',
        description: 'Overall team championship',
        level: 'Regional'
      }
    ],
    rules: [
      {
        title: 'Table and Equipment Specifications',
        year: '',
        description: 'A table tennis table is 2.74m long, 1.525m wide, and 76cm high. The ball must be 40mm in diameter and weigh 2.7g.',
        level: 'General'
      }
    ],
    contact: [
      {
        name: 'Coach Anand Kumar',
        role: 'Head Athletics Coach',
        email: 'anand.kumar@institute.edu',
        phone: '+91 98765 43224',
        location: 'Sports Complex - Track Office'
      },
      {
        name: 'M Kishore',
        role: 'Athletics Secretary',
        email: '112201035@smail.iitpkd.ac.in',
        phone: '+91 98765 43225'
      }
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
    { id: sportName === 'athletics' ? 'achievements' : 'rules', label: sportName === 'athletics' ? 'Achievements' : 'Rules', icon: Trophy },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="sport-content-card">
            <div className="sport-section-header">
              <User />
              <h3>About {sport.title}</h3>
            </div>
            <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '2rem' }}>
              {sport.about.description}
            </p>
          </div>
        );
      
      case 'facilities':
        return (
          <div className="sport-facilities-grid">
            {sport.facilities.map((facility, index) => (
              <div key={index} className="sport-facility-card">
                <div className="sport-section-header">
                  <Building />
                  <h3>{facility.name}</h3>
                </div>
                <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '1rem' }}>
                  {facility.description}
                </p>
                <div className="sport-facility-location">
                  <span>📍</span>
                  {facility.location}
                </div>
                <div className="sport-features-list">
                  {facility.features.map((feature, idx) => (
                    <span key={idx} className="sport-feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'achievements':
        return (
          <div className="sport-achievements-grid">
            {sport.achievements.map((achievement, index) => (
              <div key={index} className="sport-achievement-card">
                <div className="sport-achievement-header">
                  <div className="sport-achievement-title-section">
                    <Trophy />
                    <h3 className="sport-achievement-title">{achievement.title}</h3>
                  </div>
                  <span className="sport-achievement-year">{achievement.year}</span>
                </div>
                <p className="sport-achievement-description">{achievement.description}</p>
                <span className={`sport-level-badge ${achievement.level.toLowerCase()}`}>
                  {achievement.level}
                </span>
              </div>
            ))}
          </div>
        );
      
      case 'rules':
        return (
          <div className="sport-achievements-grid">
            {sport.rules.map((rule, index) => (
              <div key={index} className="sport-achievement-card">
                <div className="sport-achievement-header">
                  <div className="sport-achievement-title-section">
                    <Trophy />
                    <h3 className="sport-achievement-title">{rule.title}</h3>
                  </div>
                  {rule.year && (
                    <span className="sport-achievement-year">{rule.year}</span>
                  )}
                </div>
                <p className="sport-achievement-description">{rule.description}</p>
                <span className={`sport-level-badge ${rule.level.toLowerCase()}`}>
                  {rule.level}
                </span>
              </div>
            ))}
          </div>
        );
      
      case 'contact':
        return (
          <div className="sport-contact-grid">
            {sport.contact.map((contact, index) => (
              <div key={index} className="sport-contact-card">
                <div className="sport-contact-header">
                  <User />
                  <div className="sport-contact-info">
                    <h3 className="sport-contact-name">{contact.name}</h3>
                    <p className="sport-contact-role">{contact.role}</p>
                  </div>
                </div>
                <div className="sport-contact-details">
                  <div className="sport-contact-item">
                    <span>✉️</span>
                    <a href={`mailto:${contact.email}`}>
                      {contact.email}
                    </a>
                  </div>
                  <div className="sport-contact-item">
                    <span>📞</span>
                    <a href={`tel:${contact.phone}`}>
                      {contact.phone}
                    </a>
                  </div>
                  {contact.location && (
                    <div className="sport-contact-item">
                      <span>📍</span>
                      <span style={{ color: '#64748b' }}>{contact.location}</span>
                    </div>
                  )}
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
      <div className="sport-back-button-container">
        <button
          onClick={() => navigate('/clubs')}
          className="sport-back-button"
        >
          <ArrowLeft size={20} />
          Back to Sports
        </button>
      </div>

      {/* Navigation tabs */}
      <div className="sport-tabs-container">
        <div className="sport-tabs-wrapper">
          <nav className="sport-tabs-nav">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`sport-tab-button ${activeTab === tab.id ? 'active' : ''}`}
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
      <div className="sport-content-container">
        {renderContent()}
      </div>
    </div>
  );
};

export default SportPage;