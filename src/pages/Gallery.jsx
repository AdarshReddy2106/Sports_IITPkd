import React, { useState, useEffect } from 'react';
import { supabase } from '../../Js/supabase';
import './Gallery.css';

// --- Static Fallback Data ---
// This provides the initial 8 cards and serves as a fallback.
const getStaticImages = () => [
  { id: 'static-1', title: 'Cricket Ground', category: 'Facilities', colorClass: 'teal' },
  { id: 'static-2', title: 'Basketball Court', category: 'Facilities', colorClass: 'blue' },
  { id: 'static-3', title: 'Fitness Center', category: 'Facilities', colorClass: 'red' },
  { id: 'static-4', title: 'Table Tennis', category: 'Facilities', colorClass: 'teal' },
  { id: 'static-5', title: 'Athletic Track', category: 'Facilities', colorClass: 'blue' },
  { id: 'static-6', title: 'Badminton Courts', category: 'Facilities', colorClass: 'red' },
  { id: 'static-7', title: 'Championship Event', category: 'Events', colorClass: 'teal' },
  { id: 'static-8', title: 'Training Session', category: 'Training', colorClass: 'blue' },
];

const Gallery = () => {
  const [openCard, setOpenCard] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndCombineImages = async () => {
      setLoading(true);
      const staticImages = getStaticImages(); // Get the default static images

      try {
        // Fetch new items from the database
        const { data: dbImages, error } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false }); //

        if (error) {
          console.error('Error fetching gallery images:', error.message);
          setGalleryImages(staticImages); // On error, just use the static images
        } else {
          // Combine static and database images, removing duplicates
          const combined = new Map();
          // Add static images first
          staticImages.forEach(item => combined.set(item.title, item));
          // Add/overwrite with database images (newest ones come first)
          (dbImages || []).forEach(item => combined.set(item.title, item));

          setGalleryImages(Array.from(combined.values()));
        }
      } catch (error) {
        console.error('A critical error occurred:', error.message);
        setGalleryImages(staticImages); // Fallback in case of a critical failure
      } finally {
        setLoading(false);
      }
    };

    fetchAndCombineImages();
  }, []);

  // --- Helper Functions (from the more robust version) ---

  const closeModal = () => setOpenCard(null);

  /**
   * Gets all valid image URLs from a gallery item.
   * Handles both database items (with imageUrl properties) and static items.
   */
  const getAvailableImages = (item) => {
    if (!item) return [];

    // If it's a database item with uploaded URLs, use them
    if (item.imageUrl1) {
      return [item.imageUrl1, item.imageUrl2, item.imageUrl3].filter(Boolean); //
    }

    // Otherwise, it's a static item; generate placeholder URLs
    const slug = item.title.replace(/\s/g, '').toLowerCase();
    return [1, 2, 3].map(n => `/uploads/${slug}-${n}.jpg`); //
  };

  /**
   * Renders the slideshow for a card or a placeholder if no images are found.
   */
  const renderSlideshow = (item) => {
    const availableImages = getAvailableImages(item);

    if (availableImages.length === 0) {
      return (
        <div className="slideshow">
          <div className="placeholder-image">
            <span>🖼️</span>
            <p>No Image Available</p>
          </div>
        </div>
      );
    }

    // Uses CSS animation to cycle through images
    return (
      <div className="slideshow">
        {availableImages.map((url, index) => (
          <img
            key={url}
            className="slide-image"
            src={url}
            alt={`${item.title} ${index + 1}`}
            style={{ animationDelay: `${index * 5}s` }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ))}
      </div>
    );
  };

  // --- JSX Rendering ---

  if (loading) {
    return (
      <div className="gallery-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <div className="gallery-wrapper">
        <div className="gallery-header">
          <h2 className="gallery-title">
            Photo <span className="accent">Gallery</span>
          </h2>
          <p className="gallery-description">
            A glimpse into our world-class facilities and exciting campus events.
          </p>
        </div>

        {galleryImages.length > 0 ? (
          <div className="gallery-grid">
            {galleryImages.map((item) => {
              const imageCount = getAvailableImages(item).length;
              return (
                <div
                  key={item.id}
                  className={`gallery-item ${item.colorClass || 'teal'}`}
                  onClick={() => setOpenCard(item)}
                >
                  {renderSlideshow(item)}
                  <div className="gallery-content">
                    <h3 className="gallery-item-title">{item.title}</h3>
                    <p className="gallery-item-category">{item.category}</p>
                    {imageCount > 1}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
            <h3>🖼️ No Gallery Items Found</h3>
            <p>The gallery is currently empty. Check back later!</p>
          </div>
        )}
      </div>

      {openCard && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            {renderSlideshow(openCard)}
            <div className="modal-info">
              <h3 className="modal-title">{openCard.title}</h3>
              <p className="modal-category">{openCard.category}</p>
            </div>
            <button className="modal-close" onClick={closeModal}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;