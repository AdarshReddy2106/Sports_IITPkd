import React from 'react';
import PersonCard from '../../components/PersonCard';
import './Staff.css';

const staffData = [
  {
    name: 'name',
    title: 'title',
    email: 'email',
    imageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg',
  },
  // Add more staff members here
];

const Staff = () => {
  return (
    <div className="staff-page">
      <div className="page-header">
        <h1>Our Staff</h1>
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