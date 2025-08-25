import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../Js/supabase';
import './Gallery.css';

// Enhanced static fallback data with better variety
const getStaticImages = () => [
  { id: 'static-1', title: 'Cricket Ground', colorClass: 'teal' },
  { id: 'static-2', title: 'Basketball Court', colorClass: 'blue' },
  { id: 'static-3', title: 'Fitness Center', colorClass: 'red' },
  { id: 'static-4', title: 'Table Tennis', colorClass: 'purple' },
  { id: 'static-5', title: 'Athletic Track', colorClass: 'green' },
  { id: 'static-6', title: 'Badminton Courts', colorClass: 'blue' },
  { id: 'static-7', title: 'Championship Event', colorClass: 'red' },
  { id: 'static-8', title: 'Training Session', colorClass: 'teal' },
];

const Gallery = () => {
  const [openCard, setOpenCard] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndCombineImages = async () => {
      setLoading(true);
      const staticImages = getStaticImages();

      try {
        const { data: dbImages, error } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching gallery images:', error.message);
          setGalleryImages(staticImages);
        } else {
          const combined = new Map();
          staticImages.forEach(item => combined.set(item.title, item));
          (dbImages || []).forEach(item => combined.set(item.title, item));
          setGalleryImages(Array.from(combined.values()));
        }
      } catch (error) {
        console.error('A critical error occurred:', error.message);
        setGalleryImages(staticImages);
      } finally {
        setLoading(false);
      }
    };

    fetchAndCombineImages();
  }, []);

  // Enhanced image handling with better error management
  const getAvailableImages = (item) => {
    if (!item) return [];
    if (item.imageUrl1) {
      // Collect all potential image URLs and filter out any null/empty ones
      return [item.imageUrl1, item.imageUrl2, item.imageUrl3, item.imageUrl4, item.imageUrl5].filter(Boolean);
    }
    const slug = item.title.replace(/\s/g, '').toLowerCase();
    return [1, 2, 3].map(n => `/uploads/${slug}-${n}.jpg`);
  };

  const openModal = (item) => {
    setOpenCard(item);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setOpenCard(null);
  };

  const handleNextImage = useCallback(() => {
    if (!openCard) return;
    const images = getAvailableImages(openCard);
    if (images.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  }, [openCard, getAvailableImages]);

  const handlePrevImage = useCallback(() => {
    if (!openCard) return;
    const images = getAvailableImages(openCard);
    if (images.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  }, [openCard, getAvailableImages]);

  // Modern image stack renderer for the card grid
  const renderImageStack = (item) => {
    const availableImages = getAvailableImages(item);
    if (availableImages.length === 0) {
      return (
        <div className="slideshow">
          <div className="placeholder-image"><span>🖼️</span><p>No Image Available</p></div>
        </div>
      );
    }
    return (
      <div className="slideshow">
        <div className="image-stack">
          {availableImages.slice(0, 3).map((url, index) => (
            <img key={`${url}-${index}`} className="slide-image" src={url} alt={`${item.title} ${index + 1}`} loading="lazy" onError={(e) => { e.target.style.display = 'none'; console.warn(`Failed to load image: ${url}`); }} />
          ))}
        </div>
      </div>
    );
  };

  // Handle keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!openCard) return;
      if (event.key === 'Escape') closeModal();
      if (event.key === 'ArrowRight') handleNextImage();
      if (event.key === 'ArrowLeft') handlePrevImage();
    };

    if (openCard) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [openCard, handleNextImage, handlePrevImage]);

  if (loading) {
    return (
      <div className="gallery-container"><div className="gallery-wrapper"><div className="loading-spinner"><div className="spinner"></div></div></div></div>
    );
  }

  return (
    <div className="gallery-container">
      <div className="gallery-wrapper">
        <div className="gallery-header">
          <h2 className="gallery-title">Photo <span className="accent">Gallery</span></h2>
          <p className="gallery-description">Explore our world-class facilities, exciting events, and vibrant campus life through our visual journey.</p>
        </div>

        {galleryImages.length > 0 ? (
          <div className="gallery-grid">
            {galleryImages.map((item) => {
              const imageCount = getAvailableImages(item).length;
              return (
                <div key={item.id} className="gallery-item-wrapper" onClick={() => openModal(item)} role="button" tabIndex={0} aria-label={`View ${item.title} gallery`} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(item); } }}>
                  <div className={`gallery-item ${item.colorClass || 'teal'}`}>
                    {renderImageStack(item)}
                    <div className="gallery-content">
                      <h3 className="gallery-item-title">{item.title}</h3>
                      <p className="gallery-item-category">{item.category}{imageCount > 1 && (<span style={{ opacity: 0.7, marginLeft: '0.5rem' }}>• {imageCount} photos</span>)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', borderRadius: '2rem', border: '2px dashed var(--border-primary)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>🖼️</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Gallery Items Found</h3>
            <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>The gallery is currently empty. Check back later for amazing content!</p>
          </div>
        )}
      </div>

      {/* Enhanced Modal with Image Slider */}
      {openCard && (
        <div className="modal-overlay" onClick={closeModal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-slider">
              {getAvailableImages(openCard).map((url, index) => (
                <img
                  key={url}
                  src={url}
                  alt={`${openCard.title} ${index + 1}`}
                  className={`modal-slide-image ${index === currentImageIndex ? 'active' : ''}`}
                />
              ))}
              
              {getAvailableImages(openCard).length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); handlePrevImage(); }} className="slider-btn prev" aria-label="Previous image">‹</button>
                  <button onClick={(e) => { e.stopPropagation(); handleNextImage(); }} className="slider-btn next" aria-label="Next image">›</button>
                  <div className="slider-counter">{currentImageIndex + 1} / {getAvailableImages(openCard).length}</div>
                </>
              )}
            </div>
            <div className="modal-info">
              <h3 id="modal-title" className="modal-title">{openCard.title}</h3>
              <p className="modal-category">{openCard.category}</p>
              {openCard.description && (<p style={{ marginTop: '1rem', opacity: 0.8, lineHeight: 1.6, fontSize: '1rem' }}>{openCard.description}</p>)}
            </div>
            <button className="modal-close" onClick={closeModal} aria-label="Close gallery modal">×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;