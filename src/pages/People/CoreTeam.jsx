import React from 'react';
import PersonCard from '../../components/PersonCard';
import './CoreTeam.css';

const secretaries = [
    { name: 'John Doe', title: 'General Secretary', imageUrl: '' },
    { name: 'Jane Smith', title: 'Sports Secretary', imageUrl: '' },
];
const designTeam = [
    { name: 'Alice Johnson', title: 'Design Head', imageUrl: '' },
];
const mediaTeam = [
    { name: 'Bob Brown', title: 'Media Lead', imageUrl: '' },
];
const webDevTeam = [
    { name: 'Charlie Davis', title: 'Web Admin', imageUrl: '' },
];

const CoreTeam = () => {
  return (
    <div className="core-team-page">
      <div className="page-header">
        <h1>Core Team</h1>
        <p>The dedicated student-led team driving our sports initiatives.</p>
      </div>

      <section className="team-section">
        <h2 className="section-title">Secretaries</h2>
        <div className="team-grid">
          {secretaries.map((person, index) => <PersonCard key={index} {...person} />)}
        </div>
      </section>

      <section className="team-section">
        <h2 className="section-title">Design Team</h2>
        <div className="team-grid">
          {designTeam.map((person, index) => <PersonCard key={index} {...person} />)}
        </div>
      </section>

      <section className="team-section">
        <h2 className="section-title">Media Team</h2>
        <div className="team-grid">
          {mediaTeam.map((person, index) => <PersonCard key={index} {...person} />)}
        </div>
      </section>
      
      <section className="team-section">
        <h2 className="section-title">Web Dev Team</h2>
        <div className="team-grid">
          {webDevTeam.map((person, index) => <PersonCard key={index} {...person} />)}
        </div>
      </section>
    </div>
  );
};

export default CoreTeam;