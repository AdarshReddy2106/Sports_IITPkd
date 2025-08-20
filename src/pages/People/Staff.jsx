import React from 'react';
import PersonCard from '../../components/PersonCard';
import './Staff.css';

const staffData = [
  {
    name: 'Mr.Renchu T',
    title: 'Sports Officer',
    imageUrl: '/public/Staff/renchu.png',
  },
  {
    name: 'Deepak Rajendraprasad',
    title: 'Dean Students',
    imageUrl: '/public/Staff/rajendra.png',
  },
  {
    name: 'Padmesh A',
    title: 'Sports FA',
    imageUrl: '/public/Staff/padmesh.png',
  },
  // Add more staff members here
];

const Staff = () => {
  return (
    <div className="staff-page">
      <div className="page-header">
        <h1>Our <span className="text-gradient">Staff</span></h1>
        <p>The guiding force behind the Sports Council.</p>
      </div>
      <div className="staff-grid">
        {staffData.map((staff, index) => (
          <PersonCard
            key={index}
            name={staff.name}
            title={staff.title}
            email={staff.email}
            imageUrl={staff.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Staff;