import React from 'react';
import PersonCard from '../../components/PersonCard';
import './CoreTeam.css';

// Core Leadership Team
const leadership = [
  { name: 'Amuluru Pavan Sai', title: 'Sports Affairs Secretary', email: 'sec_sports@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/Amuluru_Pavan_Sai.jpg' },
  { name: 'Mori Yashwanth Vardhan', title: 'Mentor', email: '132201039@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/Yashwanth Mori.jpg' },
  { name: 'Narayanapulakshmi Prasanna', title: 'Female Secretary – Sports Affairs', email: '142301027@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/prasanna.jpg' },
  { name: 'Tipparthi Shashank Reddy', title: 'Deputy Secretary – Sports Affairs', email: '132201024@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/Tipparthi_Shashank_Reddy.jpg' },
  { name: 'Trilochan Babu Gandi', title: 'Deputy Secretary – Sports Affairs', email: '132301036@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/trilochan.jpg' }
];

// GC Coordinators
const gcCoordinators = [
  { name: 'Chennareddy Monish', title: 'GC Coordinator', email: '122301007@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/monish.jpg' },
  { name: 'Siddarth Muraharisetty', title: 'Assistant GC Coordinator', email: '132401034@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/siddarth.jpg' }
];

// Media Team
const mediaTeam = [
  { name: 'Soma Siri', title: 'Media Coordinator', email: '122401034@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/siri.JPG' },
  { name: 'Rudrakshala Likhith Chandra', title: 'Media Coordinator', email: '112301028@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/Rudrakshala_Likhith_Chandra.jpg' },
  { name: 'Ashvand Sathyajith M', title: 'Media Coordinator', email: '132401008@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/Ashvand.JPG' },
  { name: 'P Santosh', title: 'Video Editor and PR Head', email: '112401025@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/P_Santosh.jpg' }
];

// Design Team
const designTeam = [
  { name: 'Abhirami R Iyer', title: 'Design Head', email: '112201001@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/Abhirami_R_Iyer.jpg' },
  { name: 'Tullibilli Venkata Satyasai Chaitanyateja', title: 'Design Head', email: '102301035@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/Tullibilli_Venkata_Satyasai_Chaitanyateja.jpg' },
  { name: 'Surisetti Tarun', title: 'Design Team', email: '102401033@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/Tarun.JPG' },
  { name: 'Basireddy Lakshmi Sai Hasini', title: 'Design Team', email: '102401007@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/hasini.jpg' }
];

// Sport Secretaries
const sportSecretaries = [
  { name: 'M Kishore', title: 'Athletics Secretary', email: '112201035@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/M Kishore.PNG' },
  { name: 'CH Akshay', title: 'Assistant Athletics Secretary', email: '112401008@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/CH_AKSHAY.jpg' },
  { name: 'Jugdeep Roy', title: 'Badminton Secretary', email: '122301017@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/Jugdeep .jpg' },
  { name: 'Harsh Gangrade', title: 'Assistant Badminton Secretary', email: '112401015@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/Harsh.jpg' },
  { name: 'Haneesh Roshan', title: 'Basketball Secretary', email: '132301031@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/Haneesh_Roshan.jpg' },
  { name: 'Sagar Kumar', title: 'Assistant Basketball Secretary', email: '132401029@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/Sagar_Kumar.jpeg' },
  { name: 'Shreesh Amit', title: 'Chess Secretary', email: '112301046@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/Shreesh.jpg' },
  { name: 'U Sai Vignesh', title: 'Assistant Chess Secretary', email: '112301034@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/Vignesh.jpg' },
  { name: 'Gowtham Gogineni', title: 'Cricket Secretary', email: '122301013@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/gowtham.jpg' },
  { name: 'Abhay Vaidya', title: 'Assistant Cricket Secretary', email: '142401005@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/abhay.webp' },
  { name: 'Kevin Jim Roy', title: 'Football Secretary', email: '122301021@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/Kev_pic.JPG' },
  { name: 'Punit Yadav', title: 'Assistant Football Secretary', email: '142401030@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/Punit_pic.jpg' },
  { name: 'Siddharth Bharti', title: 'Gym Secretary', email: '132301033@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/siddharth.jpg' },
  { name: 'Ritesh Kumar', title: 'Assistant Gym Secretary', email: '122401031@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/ritesh.jpg' },
  { name: 'Pasupuleti Sanjay', title: 'Table Tennis Secretary', email: '112201028@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/Pasupuleti_Sanjay.jpg' },
  { name: 'Tarun Surisetti', title: 'Assistant Table Tennis Secretary', email: '102401033@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/Tarun.JPG' },
  { name: 'M Bharath Kumar Reddy', title: 'Volleyball Secretary', email: '122201024@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/Bharath Reddy.jpg' },
  { name: 'Rakesh', title: 'Assistant Volleyball Secretary', email: '142401032@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/Rakesh.jpg' }
];

// Female Representatives
const femaleRepresentatives = [
  { name: 'Isha', title: 'Athletics Representative', email: '132401016@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/isha.PNG' },
  { name: 'Srinidi SM', title: 'Badminton Representative', email: '122401035@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/srinidhi.jpg' },
  { name: 'Savula Vaishnavi', title: 'Basketball Representative', email: '102301031@smail.iitpkd.com', imageUrl: '/CoreTeam25-26/vaishnavi.jpg' },
  { name: 'Kiran Jyothi', title: 'Table Tennis Representative', email: '102301022@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/jyothi.jpg' },
  { name: 'Komaram Bhavana Sri', title: 'Volleyball Representative', email: '102301017@smail.iitpkd.ac.in', imageUrl: '/CoreTeam25-26/bhavana.jpg' }
];

const CoreTeam = () => {
  // Helper function to add appropriate grid class based on number of items
  const getGridClass = (items) => {
    const count = items.length;
    if (count === 1) return 'team-grid single-item';
    if (count === 2) return 'team-grid two-items';
    if (count === 3) return 'team-grid three-items';
    return 'team-grid';
  };

  return (
    <div className="core-team-page">
      <div className="page-header">
        <h1>Core Team</h1>
        <p>The dedicated student-led team driving our sports initiatives.</p>
      </div>

      <section className="team-section">
        <h2 className="section-title">Leadership</h2>
        <div className={getGridClass(leadership)}>
          {leadership.map((person, index) => <PersonCard key={index} {...person} />)}
        </div>
      </section>

      <section className="team-section">
        <h2 className="section-title">GC Coordinators</h2>
        <div className={getGridClass(gcCoordinators)}>
          {gcCoordinators.map((person, index) => <PersonCard key={index} {...person} />)}
        </div>
      </section>

      <section className="team-section">
        <h2 className="section-title">Media Team</h2>
        <div className={getGridClass(mediaTeam)}>
          {mediaTeam.map((person, index) => <PersonCard key={index} {...person} />)}
        </div>
      </section>
      
      <section className="team-section">
        <h2 className="section-title">Design Team</h2>
        <div className={getGridClass(designTeam)}>
          {designTeam.map((person, index) => <PersonCard key={index} {...person} />)}
        </div>
      </section>

      <section className="team-section">
        <h2 className="section-title">Sport Secretaries</h2>
        <div className={getGridClass(sportSecretaries)}>
          {sportSecretaries.map((person, index) => <PersonCard key={index} {...person} />)}
        </div>
      </section>

      <section className="team-section">
        <h2 className="section-title">Female Representatives</h2>
        <div className={getGridClass(femaleRepresentatives)}>
          {femaleRepresentatives.map((person, index) => <PersonCard key={index} {...person} />)}
        </div>
      </section>
    </div>
  );
};

export default CoreTeam;