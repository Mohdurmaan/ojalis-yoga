import React, { useState, useEffect, useRef, useCallback } from "react";
import { IconStar } from "./Icons";
import "./TestimonialSlider.css";

const testimonialsData = [
  {
    id: 1,
    name: "Rajesh Kulkarni",
    role: "Software Architect",
    organization: "Enterprise Tech • Age 38",
    program: "Pranayama & Yogic Kriya",
    duration: "14 Months of Sadhana",
    headline: "Authentic Pranayama & Profound Mental Clarity",
    quote: "The pranayama and meditation guidance here is authentic and profoundly calming. As an IT professional working 10-hour desk shifts, these sessions have revived my energy and mental clarity.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Priyanka Mehra",
    role: "Creative Director",
    organization: "Design Studio • Age 31",
    program: "Meditation & Stillness",
    duration: "9 Months of Practice",
    headline: "A Real Sanctuary of Stillness & Zero Pretentiousness",
    quote: "Warm, peaceful, and zero pretentiousness. Ojalis feels like a real sanctuary where you can truly slow down, breathe properly, and build genuine inner strength. Highly recommended.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Col. Harish Chandra (Retd.)",
    role: "Retired Veteran",
    organization: "Armed Forces • Age 68",
    program: "Gentle Senior Yoga",
    duration: "2 Years with Ojalis",
    headline: "Tailored Post-Surgery Recovery & Restored Mobility",
    quote: "After knee replacement surgery, my mobility and balance had become unsteady. Ojalis designed modified chair and wall postures tailored precisely to my doctor's rehabilitation guidelines.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 4,
    name: "Dr. Aarti Varma",
    role: "Senior Pediatrician",
    organization: "Consultant • Age 46",
    program: "Classical Hatha & Breathing",
    duration: "18 Months of Practice",
    headline: "Zero Ego, Pure Anatomical & Respiratory Synchronization",
    quote: "As a doctor, I observe firsthand how chronic stress manifests as somatic illness. Ojalis practices genuine classical yoga that respects biomechanics. Zero ego, pure breath synchronization.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 5,
    name: "Sunita Sharma",
    role: "School Teacher",
    organization: "Senior Faculty • Age 42",
    program: "Therapeutic Sessions",
    duration: "11 Months of Sadhana",
    headline: "Patient Guidance That Relieved Chronic Back Stiffness",
    quote: "Joining Ojalis was the best decision for my persistent lower back stiffness. The instructors watch every posture with genuine care and patience. I feel lighter and centered every morning.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 6,
    name: "Manish Singhal",
    role: "Business Owner",
    organization: "Logistics Enterprise • Age 51",
    program: "Asana Flow & Vitality",
    duration: "16 Months of Practice",
    headline: "Morning Breathwork That Brought Full-Day Energy",
    quote: "I struggled with erratic eating habits and sluggish energy for a decade. The morning breathwork and asana flow helped me feel light, clear, and energized throughout full working days.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  }
];

export default function TestimonialSlider({ items = testimonialsData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animating, setAnimating] = useState(false);

  const pillsBarRef = useRef(null);
  const pillRefs = useRef([]);
  const total = items.length;

  const handlePrev = useCallback(() => {
    setAnimating(true);
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setTimeout(() => setAnimating(false), 300);
  }, [total]);

  const handleNext = useCallback(() => {
    setAnimating(true);
    setActiveIndex((prev) => (prev + 1) % total);
    setTimeout(() => setAnimating(false), 300);
  }, [total]);

  const selectIndex = (idx) => {
    if (idx === activeIndex) return;
    setAnimating(true);
    setActiveIndex(idx);
    setIsPaused(true);
    setTimeout(() => setAnimating(false), 300);
  };

  // Scroll active pill into center view smoothly
  useEffect(() => {
    const pill = pillRefs.current[activeIndex];
    const bar = pillsBarRef.current;
    if (pill && bar) {
      const pillLeft = pill.offsetLeft;
      const pillWidth = pill.offsetWidth;
      const barWidth = bar.offsetWidth;
      bar.scrollTo({
        left: pillLeft - (barWidth / 2) + (pillWidth / 2),
        behavior: "smooth"
      });
    }
  }, [activeIndex]);

  // Auto-play interval (6s), pauses on hover or user touch
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Three visible nodes for the desktop arc
  const prevIdx = (activeIndex - 1 + total) % total;
  const currIdx = activeIndex;
  const nextIdx = (activeIndex + 1) % total;

  const prevItem = items[prevIdx];
  const currItem = items[currIdx];
  const nextItem = items[nextIdx];

  // Touch swipe support for mobile review card
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Scroll mobile pills bar manually
  const scrollPillsLeft = () => {
    if (pillsBarRef.current) {
      pillsBarRef.current.scrollBy({ left: -180, behavior: "smooth" });
    }
  };

  const scrollPillsRight = () => {
    if (pillsBarRef.current) {
      pillsBarRef.current.scrollBy({ left: 180, behavior: "smooth" });
    }
  };

  return (
    <div 
      className="nians-testi-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Header Section Matching nians.com with Long Line */}
      <div className="nians-header-wrap">
        <span className="nians-eyebrow">VOICES OF PRACTICE</span>
        <div className="nians-title-row">
          <h2 className="nians-main-title">
            Hear What Our Students Are Saying
          </h2>
          <div className="nians-divider-line" aria-hidden="true"></div>
        </div>
        <p className="nians-subtitle-primary">
          Listen to the quiet transformations and authentic journeys of our sadhakas.
        </p>
        <p className="nians-subtitle-secondary">
          Discover the stillness, breath synchronization, and restored wellbeing nurtured through authentic guidance.
        </p>
      </div>

      {/* 2. Mobile Avatar Slider Bar (Scrollable Pill Track with Arrow Controls) */}
      <div className="nians-mobile-pills-slider-container">
        <button 
          type="button"
          onClick={scrollPillsLeft}
          className="nians-pill-arrow-btn prev"
          aria-label="Scroll students left"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className="nians-mobile-pills-bar" ref={pillsBarRef}>
          {items.map((item, idx) => (
            <button
              key={item.id}
              ref={(el) => (pillRefs.current[idx] = el)}
              type="button"
              onClick={() => selectIndex(idx)}
              className={`nians-mobile-pill-btn ${idx === activeIndex ? "active" : ""}`}
              aria-label={`View review by ${item.name}`}
            >
              <img src={item.avatar} alt={item.name} className="nians-mobile-pill-avatar" />
              <span className="nians-mobile-pill-name">{item.name}</span>
            </button>
          ))}
        </div>

        <button 
          type="button"
          onClick={scrollPillsRight}
          className="nians-pill-arrow-btn next"
          aria-label="Scroll students right"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* 3. Main Dual-Column Interactive Section */}
      <div 
        className="nians-body-grid"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* LEFT COLUMN: The Curved Arc with Personas (Desktop) */}
        <div className="nians-arc-col" aria-label="Reviewers on arc">
          {/* Background SVG Curve */}
          <svg className="nians-arc-svg" viewBox="0 0 200 420" preserveAspectRatio="none">
            <path
              d="M 15 20 C 145 90, 145 330, 15 400"
              fill="none"
              stroke="rgba(79, 97, 68, 0.28)"
              strokeWidth="1.75"
            />
          </svg>

          {/* Top Reviewer Node (Previous) */}
          <div 
            className="nians-arc-node node-top"
            onClick={() => selectIndex(prevIdx)}
            title={`Previous: ${prevItem.name}`}
          >
            <div className="nians-node-avatar-box">
              <img src={prevItem.avatar} alt={prevItem.name} className="nians-node-avatar" />
            </div>
            <div className="nians-node-info">
              <div className="nians-node-name">{prevItem.name}</div>
              <div className="nians-node-role">{prevItem.role}</div>
              <div className="nians-node-org">{prevItem.organization}</div>
            </div>
          </div>

          {/* Middle Reviewer Node (Active Highlighted Capsule Pill) */}
          <div className="nians-arc-node node-center active">
            <div className="nians-active-pill">
              <div className="nians-node-avatar-box active-box">
                <img src={currItem.avatar} alt={currItem.name} className="nians-node-avatar active-avatar" />
              </div>
              <div className="nians-node-info active-info">
                <div className="nians-node-name active-name">{currItem.name}</div>
                <div className="nians-node-role active-role">{currItem.role}</div>
                <div className="nians-node-org active-org">{currItem.organization}</div>
              </div>
            </div>
          </div>

          {/* Bottom Reviewer Node (Next) */}
          <div 
            className="nians-arc-node node-bottom"
            onClick={() => selectIndex(nextIdx)}
            title={`Next: ${nextItem.name}`}
          >
            <div className="nians-node-avatar-box">
              <img src={nextItem.avatar} alt={nextItem.name} className="nians-node-avatar" />
            </div>
            <div className="nians-node-info">
              <div className="nians-node-name">{nextItem.name}</div>
              <div className="nians-node-role">{nextItem.role}</div>
              <div className="nians-node-org">{nextItem.organization}</div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Featured Testimonial Card */}
        <div className={`nians-card-col ${animating ? "fade-transition" : ""}`}>
          <div className="nians-card-frame">
            {/* Top Reviewer Meta Row */}
            <div className="nians-card-top-row">
              <div className="nians-card-author-left">
                <img 
                  src={currItem.avatar} 
                  alt={currItem.name} 
                  className="nians-card-author-img" 
                />
                <div className="nians-card-author-text">
                  <h3 className="nians-card-author-name">{currItem.name}</h3>
                  <p className="nians-card-author-subtitle">
                    {currItem.role} &bull; {currItem.program}
                  </p>
                </div>
              </div>

              {/* Decorative Quotation Mark Watermark */}
              <div className="nians-card-quote-watermark" aria-hidden="true">
                <svg width="44" height="36" viewBox="0 0 44 36" fill="currentColor">
                  <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 6.6 4.9 12.1 11.4 12.5C10.2 29.5 5.8 33.3 0.8 34.5L0 34.7V36c13.2 0 18-10.8 18-18V0h-5.5zM38.5 0C31.6 0 26 5.6 26 12.5c0 6.6 4.9 12.1 11.4 12.5-1.2 4.5-5.6 8.3-10.6 9.5l-0.8 0.2V36c13.2 0 18-10.8 18-18V0h-5.5z"/>
                </svg>
              </div>
            </div>

            {/* Headline */}
            <h4 className="nians-card-headline">
              {currItem.headline}
            </h4>

            {/* Body Quote */}
            <p className="nians-card-body">
              {currItem.quote}
            </p>

            {/* Bottom Row: Stars & Trust Badges */}
            <div className="nians-card-bottom-row">
              <div className="nians-stars-wrap">
                {[...Array(5)].map((_, i) => (
                  <IconStar key={i} size={17} color="#C59B4B" />
                ))}
                <span className="nians-rating-tag">5.0 Star Sadhana Reflection</span>
              </div>

              <div className="nians-badges-wrap">
                <span className="nians-badge-pill">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: "4px" }}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Verified Sadhaka
                </span>
                <span className="nians-badge-duration">
                  {currItem.duration}
                </span>
              </div>
            </div>

            {/* Mobile Card Slider Controls (Prev / Next & Dots on Mobile) */}
            <div className="nians-mobile-card-controls">
              <button 
                type="button"
                onClick={handlePrev}
                className="nians-mobile-card-nav-btn"
                aria-label="Previous testimonial"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <span>Prev</span>
              </button>

              <div className="nians-mobile-card-dots">
                {items.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => selectIndex(dotIdx)}
                    className={`nians-mobile-dot-indicator ${dotIdx === activeIndex ? "active" : ""}`}
                    aria-label={`Slide to review ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <button 
                type="button"
                onClick={handleNext}
                className="nians-mobile-card-nav-btn"
                aria-label="Next testimonial"
              >
                <span>Next</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
