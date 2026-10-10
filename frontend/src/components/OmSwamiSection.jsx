import React from 'react';

const IconYoutube = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="2">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const IconInstagram = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="url(#instagramGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="instagramGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const IconFacebook = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const IconLinkedin = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0A66C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const IconExternalLink = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const SocialConnectSection = () => {
  return (
    <section className="om-swami-section">
      <div className="container">
        <div className="om-swami-layout">
          {/* Left Text Side */}
          <div className="om-swami-text-content">
            <div className="section-tag-wrapper">
              <span className="section-tag-line"></span>
              <span className="section-tag-text">Connect With Us</span>
            </div>
            <h2 className="section-title-main">
              Join Our <span>Community</span>
            </h2>
            <p className="section-desc-main" style={{ marginBottom: "18px" }}>
              Follow us across our social media platforms to stay connected. We share daily yogic insights, updates on upcoming sessions, and glimpses of our peaceful sanctuary.
            </p>
            <p className="section-desc-main">
              Be part of a growing family dedicated to authentic practice and mindful living.
            </p>
          </div>

          {/* Right Cards Grid */}
          <div className="om-swami-cards">
            {/* Card 1: Instagram */}
            <a href="https://www.instagram.com/_the_ojalis/" target="_blank" rel="noreferrer" className="om-swami-card">
              <div className="om-swami-card-header">
                <IconInstagram size={42} />
                <div className="om-swami-link-icon">
                  <IconExternalLink size={14} />
                </div>
              </div>
              <div className="om-swami-card-body">
                <h3 className="om-swami-card-title">Instagram</h3>
                <p className="om-swami-card-text">Daily updates & glimpses</p>
              </div>
            </a>

            {/* Card 2: Facebook */}
            <a href="https://www.facebook.com/ojalis.in" target="_blank" rel="noreferrer" className="om-swami-card">
              <div className="om-swami-card-header">
                <IconFacebook size={42} />
                <div className="om-swami-link-icon">
                  <IconExternalLink size={14} />
                </div>
              </div>
              <div className="om-swami-card-body">
                <h3 className="om-swami-card-title">Facebook</h3>
                <p className="om-swami-card-text">Join our Facebook community</p>
              </div>
            </a>

            {/* Card 3: YouTube */}
            <a href="#" target="_blank" rel="noreferrer" className="om-swami-card">
              <div className="om-swami-card-header">
                <IconYoutube size={44} />
                <div className="om-swami-link-icon">
                  <IconExternalLink size={14} />
                </div>
              </div>
              <div className="om-swami-card-body">
                <h3 className="om-swami-card-title">YouTube</h3>
                <p className="om-swami-card-text">Practice videos & discourses</p>
              </div>
            </a>

            {/* Card 4: LinkedIn */}
            <a href="https://www.linkedin.com/in/kuldeep-dubey-584628426/" target="_blank" rel="noreferrer" className="om-swami-card">
              <div className="om-swami-card-header">
                <IconLinkedin size={42} />
                <div className="om-swami-link-icon">
                  <IconExternalLink size={14} />
                </div>
              </div>
              <div className="om-swami-card-body">
                <h3 className="om-swami-card-title">LinkedIn</h3>
                <p className="om-swami-card-text">Professional network & news</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialConnectSection;
