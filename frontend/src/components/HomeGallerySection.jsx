import React, { useState, useEffect, useRef, useCallback } from "react";
import { useStudioImages } from "../hooks/useStudioImages";
import "./NiansGallery.css";

export default function HomeGallerySection() {
  const { images: studioImages, loading } = useStudioImages();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);

  const trackRef = useRef(null);
  const [slidePx, setSlidePx] = useState(0);

  // If studio images exist from backend, use them; otherwise show fallback placeholder images
  const baseImages = studioImages && studioImages.length > 0 
    ? studioImages 
    : [
        { image: "/images/culture-1.jpg", text: "Team Harmony" },
        { image: "/images/culture-2.jpg", text: "Sacred Sadhana" },
        { image: "/images/culture-3.jpg", text: "Celebration of Life" }
      ];

  // Duplicate images so that slider can loop seamlessly
  const displayImages = baseImages.length < 5 
    ? [...baseImages, ...baseImages, ...baseImages, ...baseImages] 
    : [...baseImages, ...baseImages];

  const totalSlides = displayImages.length;

  // Measure dynamic slide pixel width
  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current && trackRef.current.children.length > 0) {
        setSlidePx(trackRef.current.children[0].offsetWidth);
      }
    };
    updateWidth();
    // Allow images to load and re-measure
    const timer = setTimeout(updateWidth, 400);
    window.addEventListener("resize", updateWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateWidth);
    };
  }, [displayImages.length]);

  const [offsetPx, setOffsetPx] = useState(0);
  const maxIndex = Math.max(0, totalSlides - 3);

  useEffect(() => {
    const updateOffset = () => {
      if (trackRef.current && trackRef.current.children[currentIndex]) {
        setOffsetPx(trackRef.current.children[currentIndex].offsetLeft);
      }
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay slider effect (pauses on mouse hover or touch)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch and drag handlers for mobile swipe & mouse drag
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    touchEndX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  if (loading && (!studioImages || studioImages.length === 0)) return null;

  return (
    <section className="culture-section" id="our-culture-slider">
      {/* 1. HEADING */}
      <div className="culture-heading">
        <span className="culture-label">EVERYTHING IN</span>
        <h2>Our Culture is</h2>
        <h3>Focused on Your Success</h3>
        <p>
          We are young at heart, dynamic, proactive, and professional.
          And we work together so you may win!
        </p>
      </div>

      {/* 2. NIANS PANORAMIC CURVED SLIDER CONTAINER */}
      <div 
        id="culture-swiper"
        className="culture-slider-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
      >
        {/* Navigation Buttons (Sleek blue pill tabs matching nians.com) */}
        <button 
          className="culture-nav-btn prev-btn" 
          onClick={prevSlide}
          aria-label="Previous image"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button 
          className="culture-nav-btn next-btn" 
          onClick={nextSlide}
          aria-label="Next image"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Sliding Track */}
        <div 
          ref={trackRef}
          className="culture-slider-track"
          style={{
            transform: `translateX(-${offsetPx}px)`,
            transition: isDragging.current ? "none" : "transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)"
          }}
        >
          {displayImages.map((image, index) => (
            <div 
              className="culture-slide" 
              key={index}
              onClick={() => setSelectedImage(image)}
              title="Click to view full image"
            >
              <img 
                src={image.image} 
                alt={image.text || image.title || `Culture image ${index + 1}`}
                loading="lazy" 
              />
              <div className="slide-overlay-hint">
                <span>View Full</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. FULL IMAGE LIGHTBOX MODAL (To see 100% full uncropped image) */}
      {selectedImage && (
        <div className="culture-lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)} aria-label="Close">
              ✕
            </button>
            <img src={selectedImage.image} alt={selectedImage.text || "Full preview"} className="lightbox-img" />
            {selectedImage.text && <p className="lightbox-caption">{selectedImage.text}</p>}
          </div>
        </div>
      )}
    </section>
  );
}
