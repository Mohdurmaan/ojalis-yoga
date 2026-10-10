import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cadenceFlyoutOpen, setCadenceFlyoutOpen] = useState(false);
  const [mobileTeachOpen, setMobileTeachOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // Header becomes white approximately around 200px scroll
      setIsScrolled(window.scrollY >= 180);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer and dropdown on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setDropdownOpen(false);
    setCadenceFlyoutOpen(false);
    setMobileTeachOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;
  const isTeachActive = location.pathname.startsWith("/what-we-teach") || location.pathname === "/meditation";
  const isCadenceActive = location.pathname.includes("cadence") || location.pathname.includes("desk-breath") || location.pathname.includes("yoga-nidra-evening");
  const isJournalActive = location.pathname === "/journal" || location.pathname.startsWith("/blog");
  const isStudioActive = location.pathname === "/studio" || location.pathname === "/gallery";
  const isClassesActive = location.pathname === "/online-classes";

  const teachItems = [
    {
      title: "Cadences",
      type: "submenu",
      children: [
        { title: "The Real Time Practice", path: "/what-we-teach/real-time-practice" },
        { title: "The Study Breath", path: "/what-we-teach/study-breath" },
        { title: "The Quiet Breathing", path: "/what-we-teach/quiet-breathing" },
        { title: "The Wakeful Hours", path: "/what-we-teach/wakeful-hours" }
      ]
    },
    { title: "Pranayama", path: "/what-we-teach/pranayama" },
    { title: "Hatha Yoga", path: "/what-we-teach/hatha-yoga" },
    { title: "Yoga Nidra", path: "/what-we-teach/yoga-nidra" },
    { title: "Meditation", path: "/what-we-teach/meditation" },
    { title: "Sukshma Vyayama", path: "/what-we-teach/sukshma-vyayama" },
    { title: "Shatkarma", path: "/what-we-teach/shatkarma" },
    { title: "Ayurvedic Lifestyle Guidance", path: "/what-we-teach/ayurvedic-lifestyle-guidance" },
    { title: "Postnatal Recovery", path: "/what-we-teach/postnatal-recovery" },
    { title: "Cycle Practice", path: "/what-we-teach/cycle-practice" },
    { title: "First Breath / Surya Namaskar for Children", path: "/what-we-teach/first-breath" }
  ];

  return (
    <>
      {/* ================= MAIN NAVBAR ================= */}
      <header className={`ojalis-navbar ${isScrolled ? "scrolled" : "transparent"} ${isHome ? "on-home" : "on-inner"}`}>
        <div className="container navbar-content">
          {/* Logo & Brand Mark (No duplicate text, aspect ratio preserved) */}
          <Link to="/" className="brand-identity-link" aria-label="Ojalis The Breath Signature Home">
            <img 
              src="/logo.png" 
              alt="Ojalis - The Breath Signature Logo" 
              className="brand-logo-img" 
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-links-desktop" aria-label="Primary Navigation">
            {/* 1. The Breath Signature (links to /) */}
            <Link to="/" className={`nav-link-item ${isActive("/") ? "active" : ""}`}>
              The Breath Signature
            </Link>

            {/* 2. What We Teach (Dropdown) */}
            <div 
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div 
                className={`nav-dropdown-trigger ${isTeachActive ? "active" : ""}`}
                role="button"
                tabIndex={0}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setDropdownOpen(!dropdownOpen);
                  }
                }}
              >
                <span>What We Teach</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              <div 
                className={`nav-dropdown-menu what-we-teach-menu ${dropdownOpen ? "open" : ""}`}
                style={{ display: dropdownOpen ? "flex" : undefined }}
              >
                {teachItems.map((item, idx) => {
                  if (item.type === "submenu") {
                    return (
                      <div 
                        key={idx} 
                        style={{ position: "relative" }}
                        onMouseEnter={() => setCadenceFlyoutOpen(true)}
                        onMouseLeave={() => setCadenceFlyoutOpen(false)}
                      >
                        <div 
                          className="nav-dropdown-item" 
                          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", backgroundColor: cadenceFlyoutOpen ? "var(--ojalis-ivory)" : "transparent", color: cadenceFlyoutOpen ? "var(--ojalis-burgundy)" : "" }}
                        >
                          {item.title}
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: cadenceFlyoutOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease", opacity: 0.7 }}>
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                        
                        {cadenceFlyoutOpen && (
                          <div 
                            style={{ 
                              display: "flex",
                              flexDirection: "column",
                              padding: "8px 16px",
                              backgroundColor: "var(--ojalis-cream)",
                              borderLeft: "2px solid var(--ojalis-gold-border)",
                              marginLeft: "20px",
                              marginRight: "8px",
                              marginTop: "4px",
                              marginBottom: "8px",
                              borderRadius: "0 4px 4px 0"
                            }}
                          >
                            <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--ojalis-gold-dark)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px", borderBottom: "1px solid var(--ojalis-border)", paddingBottom: "4px" }}>
                              {item.title}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                              {item.children.map(child => (
                                <Link 
                                  key={child.path}
                                  to={child.path} 
                                  className={`nav-dropdown-item ${isActive(child.path) ? "active" : ""}`}
                                  style={{ padding: "6px 8px", fontSize: "13.5px", margin: "1px 0" }}
                                  onClick={() => {
                                    setDropdownOpen(false);
                                    setCadenceFlyoutOpen(false);
                                  }}
                                >
                                  {child.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <Link 
                      key={item.path}
                      to={item.path} 
                      className={`nav-dropdown-item ${isActive(item.path) ? "active" : ""}`}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 3. Online Classes */}
            <Link to="/online-classes" className={`nav-link-item ${isClassesActive ? "active" : ""}`}>
              Online Classes
            </Link>

            {/* 4. Studio */}
            <Link to="/studio" className={`nav-link-item ${isStudioActive ? "active" : ""}`}>
              Studio
            </Link>

            {/* 5. Journal */}
            <Link to="/journal" className={`nav-link-item ${isJournalActive ? "active" : ""}`}>
              Journal
            </Link>

            {/* 6. About */}
            <Link to="/about" className={`nav-link-item ${isActive("/about") ? "active" : ""}`}>
              About
            </Link>

            {/* 7. Contact */}
            <Link to="/contact" className={`nav-link-item ${isActive("/contact") ? "active" : ""}`}>
              Contact
            </Link>
          </nav>

          {/* Right Action: Book a Session CTA & Mobile Hamburger */}
          <div className="navbar-actions">
            <Link to="/book-session" className="btn-nav-book">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Book a Session</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button 
              className={`btn-mobile-hamburger ${isMenuOpen ? "open" : ""}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE NAVIGATION DRAWER ================= */}
      <div 
        className={`mobile-drawer-overlay ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      <div className={`mobile-nav-drawer ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-drawer-header">
          <Link to="/" className="brand-identity-link" onClick={() => setIsMenuOpen(false)}>
            <img 
              src="/logo.png" 
              alt="Ojalis Logo" 
              className="brand-logo-img" 
              style={{ maxHeight: 72, width: "auto" }} 
            />
          </Link>
          <button 
            className="mobile-nav-close" 
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close Navigation"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="mobile-links-list">
          {/* 1. The Breath Signature */}
          <Link to="/" className={`mobile-link-item ${isActive("/") ? "active" : ""}`}>
            The Breath Signature
          </Link>

          {/* 2. What We Teach (Accordion Dropdown) */}
          <div className="mobile-accordion-group">
            <button 
              className={`mobile-link-item mobile-accordion-trigger ${isTeachActive ? "active" : ""}`}
              onClick={() => setMobileTeachOpen(!mobileTeachOpen)}
              aria-expanded={mobileTeachOpen}
              style={{ width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer" }}
            >
              <span>What We Teach</span>
              <svg 
                width="15" 
                height="15" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5"
                style={{ 
                  transform: mobileTeachOpen ? "rotate(180deg)" : "rotate(0deg)", 
                  transition: "transform 0.25s ease" 
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            
            {mobileTeachOpen && (
              <div className="mobile-submenu-list" style={{ paddingLeft: "14px", borderLeft: "2px solid var(--ojalis-gold-border)", margin: "4px 0 12px 6px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {teachItems.map((item, idx) => {
                  if (item.type === "submenu") {
                    return (
                      <div key={idx} style={{ marginTop: "8px", marginBottom: "4px" }}>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--ojalis-gold-dark)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>
                          {item.title}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px", paddingLeft: "10px", borderLeft: "1px solid var(--ojalis-border)" }}>
                          {item.children.map(child => (
                            <Link 
                              key={child.path}
                              to={child.path} 
                              className={`mobile-sublink-item ${isActive(child.path) ? "active" : ""}`}
                              style={{
                                fontSize: "13.5px",
                                color: isActive(child.path) ? "var(--ojalis-burgundy)" : "var(--ojalis-text-muted)",
                                fontWeight: isActive(child.path) ? 700 : 500,
                                textDecoration: "none",
                                display: "block"
                              }}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <Link 
                      key={item.path}
                      to={item.path} 
                      className={`mobile-sublink-item ${isActive(item.path) ? "active" : ""}`}
                      style={{
                        fontSize: "14px",
                        color: isActive(item.path) ? "var(--ojalis-burgundy)" : "var(--ojalis-text-muted)",
                        fontWeight: isActive(item.path) ? 700 : 500,
                        padding: "6px 0",
                        textDecoration: "none",
                        display: "block"
                      }}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Online Classes */}
          <Link to="/online-classes" className={`mobile-link-item ${isClassesActive ? "active" : ""}`}>
            Online Classes
          </Link>

          {/* 4. Studio */}
          <Link to="/studio" className={`mobile-link-item ${isStudioActive ? "active" : ""}`}>
            Studio
          </Link>

          {/* 5. Journal */}
          <Link to="/journal" className={`mobile-link-item ${isJournalActive ? "active" : ""}`}>
            Journal
          </Link>

          {/* 6. About */}
          <Link to="/about" className={`mobile-link-item ${isActive("/about") ? "active" : ""}`}>
            About
          </Link>

          {/* 7. Contact */}
          <Link to="/contact" className={`mobile-link-item ${isActive("/contact") ? "active" : ""}`}>
            Contact
          </Link>
        </nav>

        <div style={{ marginTop: "auto", paddingTop: "24px" }}>
          <Link to="/book-session" className="btn btn-primary" style={{ width: "100%", textAlign: "center" }}>
            Book a Session →
          </Link>
          <div style={{ marginTop: "16px", textAlign: "center", fontSize: "13px", color: "var(--ojalis-text-muted)" }}>
            <p>Direct Call: <a href="tel:+919876543210" style={{ fontWeight: 600, color: "var(--ojalis-burgundy)" }}>+91 98765 43210</a></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;