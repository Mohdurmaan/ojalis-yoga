import React, { useState, useEffect, useRef, useCallback } from "react";
import { IconStar } from "./Icons";
import "./TestimonialSlider.css";

const defaultTestimonials = [
  {
    quote: "Joining Ojalis was the best decision for my persistent lower back stiffness. The instructors watch every posture with genuine care and patience. I feel lighter and centered every morning.",
    name: "Sunita Sharma",
    program: "General Yoga & Therapeutic Sessions",
    role: "School Teacher, Age 42",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "The pranayama and meditation guidance here is authentic and profoundly calming. As an IT professional working 10-hour desk shifts, these sessions have revived my energy and mental clarity.",
    name: "Rajesh Kulkarni",
    program: "Pranayama & Yogic Kriya",
    role: "Software Architect, Age 38",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "Warm, peaceful, and zero pretentiousness. Ojalis feels like a real sanctuary where you can truly slow down, breathe properly, and build genuine inner strength. Highly recommended.",
    name: "Priyanka Mehra",
    program: "Meditation & Stillness",
    role: "Creative Director, Age 31",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "After knee replacement surgery, my mobility and balance had become unsteady. Ojalis designed modified chair and wall postures tailored precisely to my doctor's rehabilitation guidelines.",
    name: "Col. Harish Chandra (Retd.)",
    program: "Gentle Senior Yoga",
    role: "Retired Veteran, Age 68",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "As a doctor, I observe firsthand how chronic stress manifests as somatic illness. Ojalis practices genuine classical yoga that respects biomechanics. Zero ego, pure breath synchronization.",
    name: "Dr. Aarti Varma",
    program: "Classical Hatha & Breathing",
    role: "Senior Pediatrician, Age 46",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "I struggled with erratic eating habits and sluggish energy for a decade. The morning breathwork and asana flow helped me feel light, clear, and energized throughout full working days.",
    name: "Manish Singhal",
    program: "Asana Flow & Vitality",
    role: "Business Owner, Age 51",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  }
];

export default function TestimonialSlider({ items = defaultTestimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [offsetPx, setOffsetPx] = useState(0);

  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);

  // Responsive itemsPerView
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1024) {
        setItemsPerView(3);
      } else if (width > 640) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, items.length - itemsPerView);

  // Keep currentIndex within valid bounds on window resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  // Compute exact pixel offset for transform
  const updateOffset = useCallback(() => {
    if (trackRef.current && trackRef.current.children[currentIndex]) {
      const targetChild = trackRef.current.children[currentIndex];
      setOffsetPx(targetChild.offsetLeft);
    }
  }, [currentIndex]);

  useEffect(() => {
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [updateOffset]);

  // Slide navigation
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4200);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch & Swipe handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    isDragging.current = true;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    touchEndX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsPaused(false);
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  const gap = itemsPerView === 1 ? 16 : 24;

  return (
    <div
      className="testimonial-slider-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Student testimonials slider"
    >
      {/* Navigation Buttons (Desktop & Laptop) */}
      {items.length > itemsPerView && (
        <>
          <button
            type="button"
            className="testimonial-nav-btn testimonial-nav-prev"
            onClick={prevSlide}
            aria-label="Previous testimonial"
            id="testimonial-prev-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            className="testimonial-nav-btn testimonial-nav-next"
            onClick={nextSlide}
            aria-label="Next testimonial"
            id="testimonial-next-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {/* Viewport & Sliding Track */}
      <div
        className="testimonial-slider-viewport"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className="testimonial-slider-track"
          style={{
            transform: `translateX(-${offsetPx}px)`,
            gap: `${gap}px`
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="testimonial-slide-item"
              style={{
                width: `calc((100% - ${(itemsPerView - 1) * gap}px) / ${itemsPerView})`
              }}
            >
              <div className="testimonial-slide-card">
                <div>
                  <div className="testimonial-slide-stars">
                    {[...Array(5)].map((_, starIdx) => (
                      <IconStar key={starIdx} size={15} color="#F5A623" />
                    ))}
                  </div>
                  <p className="testimonial-slide-quote">"{item.quote}"</p>
                </div>

                <div className="testimonial-slide-student-meta">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="testimonial-slide-avatar"
                    loading="lazy"
                  />
                  <div>
                    <div className="testimonial-slide-name">{item.name}</div>
                    <div className="testimonial-slide-program">{item.program}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      {items.length > itemsPerView && (
        <div className="testimonial-dots-row">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              className={`testimonial-dot ${currentIndex === dotIdx ? "active" : ""}`}
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
