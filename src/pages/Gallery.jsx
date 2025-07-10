import React, { useState } from 'react';
import './Gallery.css';

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

const Gallery = () => {
  const [openCard, setOpenCard] = useState(null);

  const closeModal = () => setOpenCard(null);

  return (
    <div className="gallery-container">
      <div className="gallery-wrapper">
        {/* -------- header -------- */}
        <div className="gallery-header">
          <h2 className="gallery-title">
            Photo <span className="accent">Gallery</span>
          </h2>
          <p className="gallery-description">
            Take a look at our world‑class facilities and exciting events through our photo gallery.
          </p>
        </div>

        {/* -------- card grid -------- */}
        <div className="gallery-grid">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              className={`gallery-item ${img.colorClass}`}
              onClick={() => setOpenCard(img)}
            >
              {/* fading slideshow inside card */}
              <div className="slideshow">
                {[1, 2, 3].map((n) => (
                  <img
                    key={n}
                    className="slide-image"
                    src={`/uploads/${img.title.replace(/\s/g, '').toLowerCase()}-${n}.jpg`}
                    alt={`${img.title} ${n}`}
                  />
                ))}
              </div>

              <div className="gallery-content">
                <h3 className="gallery-item-title">{img.title}</h3>
                <p className="gallery-item-category">{img.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* -------- popup modal -------- */}
      {openCard && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <div className="slideshow modal-slideshow">
              {[1, 2, 3].map((n) => (
                <img
                  key={n}
                  className="slide-image"
                  src={`/uploads/${openCard.title.replace(/\s/g, '').toLowerCase()}-${n}.jpg`}
                  alt={`${openCard.title} ${n}`}
                />
              ))}
            </div>

            <h3 className="modal-title">{openCard.title}</h3>
            <p className="modal-category">{openCard.category}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
