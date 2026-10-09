import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FullScreenIntro() {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Animation timing - adjust as needed
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1500); // 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Full Screen Intro Overlay */}
      <div className={`fullscreen-intro ${isAnimating ? 'active' : 'fade-out'}`}>
        <div className="intro-content">
          <div className="intro-logo">
            <span className="intro-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg></span>
            <h1 className="intro-title">
              INNER
              <span className="intro-dot">.</span>
            </h1>
          </div>
          <div className="intro-subtitle">
            Find Stillness. Discover Yourself.
          </div>
          <div className="intro-loader">
            <div className="loader-bar"></div>
          </div>
        </div>
      </div>

      {/* Main Content - initially hidden, fades in after intro */}
      <div className={`main-content ${!isAnimating ? 'visible' : ''}`}>
        {/* Your existing content goes here */}
        {/* This is where Navbar, Home, Footer etc. will render */}
      </div>
    </>
  );
}

export default FullScreenIntro;