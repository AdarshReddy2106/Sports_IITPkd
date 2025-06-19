import React from 'react';
import './Gallery.css';

const Gallery = () => {
  const galleryImages = [
    { id: 1, title: 'Swimming Pool', category: 'Facilities', colorClass: 'teal' },
    { id: 2, title: 'Basketball Court', category: 'Facilities', colorClass: 'blue' },
    { id: 3, title: 'Fitness Center', category: 'Facilities', colorClass: 'red' },
    { id: 4, title: 'Tennis Courts', category: 'Facilities', colorClass: 'teal' },
    { id: 5, title: 'Athletic Track', category: 'Facilities', colorClass: 'blue' },
    { id: 6, title: 'Multi-purpose Hall', category: 'Facilities', colorClass: 'red' },
    { id: 7, title: 'Championship Event', category: 'Events', colorClass: 'teal' },
    { id: 8, title: 'Training Session', category: 'Training', colorClass: 'blue' },
  ];

  return (
    <div className="gallery-container">
      <div className="gallery-wrapper">
        <div className="gallery-header">
          <h2 className="gallery-title">
            Photo <span className="accent">Gallery</span>
          </h2>
          <p className="gallery-description">
            Take a look at our world-class facilities and exciting events through our photo gallery.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <div key={image.id} className={`gallery-item ${image.colorClass}`}>
              <div className="gallery-content">
                <span className="gallery-icon">📸</span>
                <h3 className="gallery-item-title">{image.title}</h3>
                <p className="gallery-item-category">{image.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
