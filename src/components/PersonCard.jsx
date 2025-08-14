import React from 'react';
import './PersonCard.css';

const PersonCard = ({ name, title, email, imageUrl }) => {
  return (
    <div className="person-card">
      <div className="person-image-container">
        <img src={imageUrl || 'https://via.placeholder.com/150'} alt={name} className="person-image" />
      </div>
      <div className="person-details">
        <h3 className="person-name">{name}</h3>
        <p className="person-title">{title}</p>
        {email && <a href={`mailto:${email}`} className="person-email">{email}</a>}
      </div>
    </div>
  );
};

export default PersonCard;