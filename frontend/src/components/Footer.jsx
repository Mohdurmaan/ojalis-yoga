import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="ojalis-footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Column 1: Brand & Philosophy */}
          <div className="footer-brand-summary">
            <Link to="/" className="footer-logo-wrap">
              <img src="/logo.png" alt="Ojalis Yogic Kriya" className="footer-logo-img" />
            </Link>
            <p className="footer-bio-text">
              Dedicated to authentic classical yoga, sacred kriyas, and mindful meditation. Guiding seekers toward holistic health, spiritual harmony, and inner awakening.
            </p>
            <div className="footer-social-links">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="Instagram"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17" cy="7" r="1" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="YouTube"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="WhatsApp"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-nav-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/programs">Yoga Programs</Link></li>
              <li><Link to="/meditation">Meditation & Kriya</Link></li>
              <li><Link to="/trainers">Our Trainers</Link></li>
              <li><Link to="/benefits">Benefits of Yoga</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/testimonials">Testimonials</Link></li>
              <li><Link to="/books">Books & Literature</Link></li>
              <li><Link to="/blog">Blog & Articles</Link></li>
            </ul>
          </div>

          {/* Column 3: Yoga Programs */}
          <div>
            <h4 className="footer-heading">Yoga Programs</h4>
            <ul className="footer-nav-list">
              <li><Link to="/programs">General Hatha Yoga</Link></li>
              <li><Link to="/programs">Therapeutic Yoga</Link></li>
              <li><Link to="/programs">Yogic Kriya & Sadhana</Link></li>
              <li><Link to="/programs">Pranayama Breathwork</Link></li>
              <li><Link to="/programs">Weight Management</Link></li>
              <li><Link to="/programs">Meditation & Stillness</Link></li>
              <li><Link to="/programs">1-on-1 Personal Sessions</Link></li>
              <li><Link to="/book-session" style={{ color: "var(--ojalis-gold)", fontWeight: 600 }}>Book Trial Class →</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div>
            <h4 className="footer-heading">Contact & Studio</h4>
            <div className="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Ojalis Yogic Centre, Shanti Marg, Vasant Vihar, New Delhi - 110057</span>
            </div>

            <div className="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <a href="tel:+8881443000">+91 88814 43000</a>
            </div>

            <div className="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href="mailto:hello@ojalis.com">hello@ojalis.com</a>
            </div>

            <div className="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Mon – Sat: 6:00 AM – 8:30 PM<br />Sunday: Morning Sadhana only</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-inner">
            <p>&copy; {new Date().getFullYear()} OJALIS — Yogic Kriya. All rights reserved.</p>
            <div className="footer-legal-links">
              <Link to="/contact">Privacy Policy</Link>
              <Link to="/contact">Terms of Practice</Link>
              <Link to="/contact">Contact Support</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;