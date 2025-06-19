import React from 'react';
import { CheckCircle, MapPin, Users } from 'lucide-react';

const Home = ({ setCurrentPage }) => {
  const facilities = [
    {
      id: 'swimming',
      name: 'Olympic Swimming Pool',
      description: 'Our state-of-the-art swimming facility',
      icon: '🏊',
      color: '#0d9488'
    },
    {
      id: 'basketball',
      name: 'Indoor Basketball Court',
      description: 'Professional-grade courts for training and matches',
      icon: '🏀',
      color: '#1e40af'
    },
    {
      id: 'fitness',
      name: 'Fitness Center',
      description: 'Modern equipment for strength and conditioning',
      icon: '💪',
      color: '#ef4444'
    },
    {
      id: 'tennis',
      name: 'Tennis Courts',
      description: 'All-weather courts for year-round play',
      icon: '🎾',
      color: '#0d9488'
    },
    {
      id: 'track',
      name: 'Athletic Track',
      description: 'Professional running track for training and events',
      icon: '🏃',
      color: '#1e40af'
    },
    {
      id: 'hall',
      name: 'Multi-purpose Hall',
      description: 'Versatile space for various sporting activities',
      icon: '⚽',
      color: '#ef4444'
    }
  ];

  const Hero = () => (
    <div className="hero">
      <div className="container">
        <h1>Empowering Athletes, Building Champions</h1>
        <p>Your journey to excellence starts here with Elite Sports Council's world-class facilities and expert coaching.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setCurrentPage('bookings')} className="btn btn-secondary">
            Book Now
          </button>
          <button onClick={() => setCurrentPage('about')} className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );

  const WhyChooseUs = () => (
    <div className="section" style={{ background: 'var(--light-card)' }}>
      <div className="container">
        <h2 className="section-title">
          Why Choose <span className="text-gradient">Us</span>
        </h2>
        <div className="grid grid-3">
          <div className="card">
            <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #ef4444, #dc2626)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'white' }}>
              <CheckCircle size={24} />
            </div>
            <h3>Expert Coaching</h3>
            <p>Our certified coaches bring years of experience to help you improve your skills and performance.</p>
          </div>
          <div className="card">
            <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #0d9488, #059669)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'white' }}>
              <MapPin size={24} />
            </div>
            <h3>Modern Facilities</h3>
            <p>State-of-the-art equipment and facilities designed to enhance your training and competition experience.</p>
          </div>
          <div className="card">
            <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'white' }}>
              <Users size={24} />
            </div>
            <h3>Community Focus</h3>
            <p>Join a supportive community of athletes and enthusiasts who share your passion for sports.</p>
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
          {facilities.map((facility) => (
            <div key={facility.id} className="card facility-card">
              <div style={{ 
                height: '200px', 
                background: `linear-gradient(135deg, ${facility.color}, ${facility.color}dd)`, 
                borderRadius: '1rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '1rem',
                color: 'white'
              }}>
                <span className="facility-icon">{facility.icon}</span>
              </div>
              <h3>{facility.name}</h3>
              <p>{facility.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: '3rem' }}>
          <button onClick={() => setCurrentPage('gallery')} className="btn btn-secondary">
            View More Photos
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Hero />
      <WhyChooseUs />
      <FacilitiesGrid />
    </>
  );
};

export default Home;
