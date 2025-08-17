import React from 'react';
import PersonCard from '../../components/PersonCard';
import './WebTeam.css';

const webDevTeam = [
  { 
    name: 'K Adarsh Reddy', 
    title: 'Web Development Lead', 
    email: '102301018@smail.iitpkd.ac.in', 
    imageUrl: '/WebTeam/lead.jpg' 
  },
  { 
    name: 'Sri Harsha', 
    title: 'Frontend Developer', 
    email: '122001042@smail.iitpkd.ac.in', 
    imageUrl: '/WebTeam/dev2.jpg' 
  },
  { 
    name: 'TVS Chaitanya', 
    title: 'UI/UX Designer', 
    email: '102301035@smail.iitpkd.ac.in', 
    imageUrl: '/WebTeam/design1.jpg' 
  }
];

const WebTeam = () => {
  return (
    <div className="web-team-page">
      <div className="page-header">
        <h1>Web Development <span className="text-gradient">Team</span> </h1>
        <p>The talented developers behind our digital presence.</p>
      </div>
      
      <section className="team-section">
        <h2 className="section-title">Our Team</h2>
        <div className="team-grid three-items">
          {webDevTeam.map((member, index) => (
            <PersonCard 
              key={index}
              name={member.name}
              title={member.title}
              email={member.email}
              imageUrl={member.imageUrl}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default WebTeam;