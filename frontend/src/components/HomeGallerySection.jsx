import React, { useState, useEffect, useRef, useCallback } from "react";
import { useStudioImages } from "../hooks/useStudioImages";
import "./NiansGallery.css";

export default function HomeGallerySection() {
  const { images: studioImages, loading } = useStudioImages();
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

  // Duplicate images so that slider can loop seamlessly on all viewports
  const repeatCount = Math.max(3, Math.ceil(12 / (baseImages.length || 1)));
  const displayImages = Array.from({ length: repeatCount }, () => baseImages).flat();
  const totalSlides = displayImages.length;

  // On mobile start at index 1 so slide 0 is on left (30%), slide 1 is in center (100%), slide 2 is on right (30%)
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      return 1;
    }
    return 0;
  });

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
  const maxDesktopIndex = Math.max(0, totalSlides - 3);

  useEffect(() => {
    const updateOffset = () => {
      if (trackRef.current && trackRef.current.children[currentIndex]) {
        const slide = trackRef.current.children[currentIndex];
        const container = trackRef.current.parentElement;
        const isMobile = window.innerWidth <= 768;

        if (isMobile && container) {
          // Center the active slide in mobile viewport:
          // Left slide shows ~30%, active middle slide shows 100%, right slide shows ~30%
          const centerOffset = (slide.offsetLeft + slide.offsetWidth / 2) - (container.offsetWidth / 2);
          setOffsetPx(centerOffset);
        } else {
          // Desktop: standard left-aligned 3-card sliding
          setOffsetPx(slide.offsetLeft);
        }
      }
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    if (isMobile) {
      setCurrentIndex((prev) => (prev >= totalSlides - 2 ? 1 : prev + 1));
    } else {
      setCurrentIndex((prev) => (prev >= maxDesktopIndex ? 0 : prev + 1));
    }
  }, [totalSlides, maxDesktopIndex]);

  const prevSlide = useCallback(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    if (isMobile) {
      setCurrentIndex((prev) => (prev <= 1 ? totalSlides - 2 : prev - 1));
    } else {
      setCurrentIndex((prev) => (prev <= 0 ? maxDesktopIndex : prev - 1));
    }
  }, [totalSlides, maxDesktopIndex]);

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
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    touchStartX.current = x;
    touchEndX.current = x;
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
