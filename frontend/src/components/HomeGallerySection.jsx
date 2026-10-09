import React, { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import CircularGallery from "./CircularGallery/CircularGallery";
import { IconSparkle, IconLotus } from "./Icons";
import { useStudioImages } from "../hooks/useStudioImages";

function HomeGallerySection() {
  const galleryRef = useRef(null);
  const { images: studioImages, loading } = useStudioImages();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  let items = studioImages ? [...studioImages] : [];
  while (items.length > 0 && items.length < 6) {
    items = [...items, ...(studioImages || [])];
  }

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const goToPrev = useCallback((e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (items.length > 0 && prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const goToNext = useCallback((e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (items.length > 0 && prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  useEffect(() => {
    if (!isModalOpen) return;
    
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, closeModal, goToPrev, goToNext]);

  if (loading) return null;
  if (!studioImages || studioImages.length === 0) return null;

  const handlePrev = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy(-12);
    }
  };

  const handleNext = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy(12);
    }
  };

  return (
    <section className="home-circular-gallery-section" aria-label="Visual Gallery">
      {/* Decorative Dawn Light Atmosphere Background */}
      <div className="gallery-dawn-glow-top" aria-hidden="true"></div>
      <div className="gallery-mist-overlay" aria-hidden="true"></div>

      <div className="container">
        {/* Section Header */}
        <div className="text-center mx-auto" style={{ maxWidth: 760 }}>
          <div className="gallery-pill-badge">
            <IconSparkle size={13} color="var(--ojalis-gold-dark, #9B7328)" />
            <span>SACRED SADHANA &bull; HIMALAYAN DAWN</span>
            <IconSparkle size={13} color="var(--ojalis-gold-dark, #9B7328)" />
          </div>

          <h2 className="section-title-main" style={{ color: "var(--gallery-heading, #1F2A2E)" }}>
            Moments of Stillness, <span>Sacred Practice</span>
          </h2>

          <p className="section-desc-main mx-auto" style={{ color: "var(--gallery-desc, #4A5B53)" }}>
            Immerse yourself in the tranquil rhythm of dawn meditation, classical postures, and conscious breathwork inspired by the timeless silence of the mountains.
          </p>
        </div>

        {/* Circular Gallery Interaction Container */}
        <div className="circular-gallery-stage-wrapper">
          {/* Subtle Navigation Arrow Buttons */}
          <button 
            type="button" 
            className="gallery-nav-btn gallery-nav-prev" 
            onClick={handlePrev}
            aria-label="Previous gallery image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button 
            type="button" 
            className="gallery-nav-btn gallery-nav-next" 
            onClick={handleNext}
            aria-label="Next gallery image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* WebGL 3D Circular Gallery */}
          <div className="circular-gallery-canvas-holder">
            <CircularGallery
              ref={galleryRef}
              items={items}
              bend={2.5}
              textColor="#1C2D24"
              borderRadius={0.045}
              font='600 22px "Plus Jakarta Sans", sans-serif'
              scrollSpeed={1.8}
              scrollEase={0.075}
              onItemClick={(imageUrl, index) => {
                setCurrentImageIndex(index);
                setIsModalOpen(true);
              }}
            />
          </div>

          {/* Interactive Hint */}
          <div className="gallery-interaction-hint">
            <span className="gallery-hint-dot"></span>
            <span>Drag horizontally or use arrow buttons to explore</span>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="gallery-bottom-cta-row">
          <p className="gallery-bottom-quote">
            <IconLotus size={16} color="var(--ojalis-gold, #C59B4B)" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "8px" }} />
            Every moment of practice is an effortless return to inner peace.
          </p>
          <Link to="/gallery" className="btn btn-gallery-dawn">
            Explore Full Gallery Archive
            <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isModalOpen && items.length > 0 && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            zIndex: 99999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          onClick={closeModal}
        >
          <button 
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "40px",
              cursor: "pointer",
              zIndex: 100000,
              padding: "10px",
              lineHeight: 1
            }}
            aria-label="Close modal"
          >
            &times;
          </button>

          <button 
            onClick={goToPrev}
            style={{
              position: "absolute",
              left: "20px",
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "50px",
              cursor: "pointer",
              zIndex: 100000,
              padding: "20px"
            }}
            aria-label="Previous image"
          >
            &#8249;
          </button>

          <img 
            src={items[currentImageIndex].image} 
            alt={items[currentImageIndex].text || "Gallery full image"} 
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
              userSelect: "none"
            }}
            onClick={(e) => e.stopPropagation()}
          />

          <button 
            onClick={goToNext}
            style={{
              position: "absolute",
              right: "20px",
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "50px",
              cursor: "pointer",
              zIndex: 100000,
              padding: "20px"
            }}
            aria-label="Next image"
          >
            &#8250;
          </button>
        </div>
      )}
    </section>
  );
}

export default HomeGallerySection;
