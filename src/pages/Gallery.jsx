import React, { useState, useEffect } from 'react';
import { supabase } from '../../Js/supabase';
import './Gallery.css';

const Gallery = () => {
  const [openCard, setOpenCard] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching gallery images:', error);
        // Fallback to static images if database fails
        setGalleryImages(getStaticImages());
      } else {
        // If no database images, use static ones
        if (!data || data.length === 0) {
          setGalleryImages(getStaticImages());
        } else {
          setGalleryImages(data);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setGalleryImages(getStaticImages());
    } finally {
      setLoading(false);
    }
  };

  // Fallback static images
  const getStaticImages = () => [
    { id: 1, title: 'Cricket Ground', category: 'Facilities', colorClass: 'teal' },  
    { id: 2, title: 'Basketball Court', category: 'Facilities', colorClass: 'blue' },
    { id: 3, title: 'Fitness Center', category: 'Facilities', colorClass: 'red' },
    { id: 4, title: 'Table Tennis', category: 'Facilities', colorClass: 'teal' },      
    { id: 5, title: 'Athletic Track', category: 'Facilities', colorClass: 'blue' },
    { id: 6, title: 'Badminton Courts', category: 'Facilities', colorClass: 'red' },   
    { id: 7, title: 'Championship Event', category: 'Events', colorClass: 'teal' },
    { id: 8, title: 'Training Session', category: 'Training', colorClass: 'blue' },
  ];

  const closeModal = () => setOpenCard(null);

  const getImageUrl = (img, index) => {
    // If database image with URLs
    if (img.imageUrl1 && index === 1) return img.imageUrl1;
    if (img.imageUrl2 && index === 2) return img.imageUrl2;
    if (img.imageUrl3 && index === 3) return img.imageUrl3;
    
    // Fallback to local images
    return `/uploads/${img.title.replace(/\s/g, '').toLowerCase()}-${index}.jpg`;
  };

  const renderSlideshow = (img, isModal = false) => (
    <div className={`slideshow ${isModal ? 'modal-slideshow' : ''}`}>
      {[1, 2, 3].map((n) => (
        <img
          key={n}
          className="slide-image"
          src={getImageUrl(img, n)}
          alt={`${img.title} ${n}`}
          onError={(e) => {
            // Fallback if image fails to load
            e.target.src = `/uploads/placeholder-${n}.jpg`;
          }}
        />
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="gallery-container">
        <div className="gallery-wrapper">
          <div className="gallery-header">
            <h2 className="gallery-title">
              Photo <span className="accent">Gallery</span>
            </h2>
            <p className="gallery-description">Loading gallery images...</p>
          </div>
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

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
              {renderSlideshow(img)}

              <div className="gallery-content">
                <h3 className="gallery-item-title">{img.title}</h3>
                <p className="gallery-item-category">{img.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ----- popup modal ----- */}
      {openCard && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {renderSlideshow(openCard, true)}

            <h3 className="modal-title">{openCard.title}</h3>
            <p className="modal-category">{openCard.category}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;