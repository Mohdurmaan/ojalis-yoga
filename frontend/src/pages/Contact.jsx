import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconLocation,
  IconPhone,
  IconChat,
  IconMail,
  IconClock,
  IconSuccessCheck
} from "../components/Icons";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "General Yoga",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-ivory">
      {/* Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">We Are Here For You</span>
          <h1 className="page-hero-title">Contact & Studio Information</h1>
          <p className="page-hero-subtitle">
            Have questions about our yoga sessions, timings, or therapeutic approach? Reach out to us directly or visit our peaceful studio.
          </p>
        </div>
      </section>

      {/* Main Contact Section: Contact Info & Form */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="contact-grid-wrap">
            {/* Contact Details Panel */}
            <div className="contact-info-panel">
              <span className="section-tag-text">Direct Channels</span>
              <h2 style={{ fontSize: "26px", color: "var(--ojalis-burgundy)", marginTop: "6px", marginBottom: "20px" }}>
                Get in Touch with Ojalis
              </h2>

              <div className="contact-detail-card">
                <div className="contact-icon-box">
                  <IconLocation size={20} color="var(--ojalis-burgundy)" />
                </div>
                <div>
                  <div className="contact-label">Studio Location</div>
                  <div className="contact-val">Ojalis Yogic Centre, Shanti Marg, Vasant Vihar, New Delhi - 110057</div>
                </div>
              </div>

              <div className="contact-detail-card">
                <div className="contact-icon-box">
                  <IconPhone size={20} color="var(--ojalis-burgundy)" />
                </div>
                <div>
                  <div className="contact-label">Direct Phone</div>
                  <div className="contact-val">
                    <a href="tel:+919876543210" style={{ color: "inherit" }}>+91 98765 43210</a>
                  </div>
                </div>
              </div>

              <div className="contact-detail-card">
                <div className="contact-icon-box">
                  <IconChat size={20} color="var(--ojalis-burgundy)" />
                </div>
                <div>
                  <div className="contact-label">Instant WhatsApp</div>
                  <div className="contact-val">
                    <a 
                      href="https://wa.me/919876543210?text=Hello%20Ojalis%20Yoga,%20I%20have%20an%20inquiry%20regarding%20classes." 
                      target="_blank" 
                      rel="noreferrer"
                      style={{ color: "#25D366", fontWeight: 700 }}
                    >
                      Click to Chat on WhatsApp →
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-detail-card">
                <div className="contact-icon-box">
                  <IconMail size={20} color="var(--ojalis-burgundy)" />
                </div>
                <div>
                  <div className="contact-label">Email Inquiries</div>
                  <div className="contact-val">
                    <a href="mailto:contact@ojalisyoga.com" style={{ color: "inherit" }}>contact@ojalisyoga.com</a>
                  </div>
                </div>
              </div>

              <div className="contact-detail-card">
                <div className="contact-icon-box">
                  <IconClock size={20} color="var(--ojalis-burgundy)" />
                </div>
                <div>
                  <div className="contact-label">Studio Practice Hours</div>
                  <div className="contact-val">
                    <strong>Monday – Saturday:</strong> 6:00 AM – 8:30 PM<br />
                    <strong>Sunday:</strong> 6:30 AM – 11:00 AM (Morning Sadhana Only)
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "28px", background: "var(--ojalis-ivory)", padding: "18px 20px", borderRadius: "var(--radius-sm)", border: "1px solid var(--ojalis-border)" }}>
                <strong style={{ color: "var(--ojalis-burgundy)", display: "block", marginBottom: "4px" }}>
                  Visiting the Studio?
                </strong>
                <p style={{ fontSize: "13.5px", color: "var(--ojalis-text-muted)", margin: 0 }}>
                  We encourage visiting 15 minutes prior to class times to experience the silence of the practice hall.
                </p>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="form-card-panel">
              <span className="section-tag-text">Send a Message</span>
              <h2 style={{ fontSize: "26px", color: "var(--ojalis-burgundy)", marginTop: "6px", marginBottom: "20px" }}>
                We Welcome Your Inquiries
              </h2>

              {submitted ? (
                <div style={{ background: "rgba(85, 212, 131, 0.12)", border: "1px solid #55d483", padding: "32px 24px", borderRadius: "var(--radius-md)", textAlign: "center" }}>
                  <div style={{ color: "#2e7d32", display: "inline-flex", marginBottom: "12px" }}>
                    <IconSuccessCheck size={44} color="#2e7d32" />
                  </div>
                  <h3 style={{ color: "var(--ojalis-burgundy)", fontSize: "20px", marginBottom: "8px" }}>
                    Message Received in Peace
                  </h3>
                  <p style={{ color: "var(--ojalis-text-muted)", fontSize: "14.5px", marginBottom: "16px" }}>
                    Thank you, {formData.name}. Our instructor or coordinator will reach out to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", interest: "General Yoga", message: "" }); }}
                    className="btn btn-outline-burgundy"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-field-group">
                    <label className="form-field-label">Your Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Ananya Sen" 
                      className="form-input-ctrl" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-grid-2col">
                    <div className="form-field-group">
                      <label className="form-field-label">Phone Number *</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+91 98765 00000" 
                        className="form-input-ctrl" 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-field-group">
                      <label className="form-field-label">Email Address *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="you@example.com" 
                        className="form-input-ctrl" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label className="form-field-label">Program of Interest</label>
                    <select 
                      className="form-select-ctrl"
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    >
                      <option value="General Yoga">General Classical Hatha Yoga</option>
                      <option value="Therapeutic Yoga">Therapeutic & Restorative Yoga</option>
                      <option value="Pranayama & Kriya">Pranayama & Yogic Kriyas</option>
                      <option value="Meditation">Meditation & Stillness</option>
                      <option value="Weight Management">Weight Management Yoga</option>
                      <option value="Personal 1-on-1">Personal 1-on-1 Mentorship</option>
                      <option value="General Inquiry">General Studio Inquiry</option>
                    </select>
                  </div>

                  <div className="form-field-group">
                    <label className="form-field-label">Your Message or Health Objectives</label>
                    <textarea 
                      rows="4" 
                      placeholder="Tell us about your previous yoga experience, any injuries or conditions, or what you hope to achieve..."
                      className="form-textarea-ctrl"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                    Send Message to Ojalis
                    <span className="btn-arrow">→</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section Immediately Above Footer */}
      <section className="section-spacing bg-ivory" style={{ paddingTop: "0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <span className="section-tag-text">Find Us in Vasant Vihar</span>
            <h2 style={{ fontSize: "28px", color: "var(--ojalis-burgundy)", marginTop: "6px" }}>
              Our Studio Location
            </h2>
            <p style={{ color: "var(--ojalis-text-muted)", fontSize: "15px", maxWidth: "560px", margin: "8px auto 0" }}>
              Located in the peaceful surroundings of Shanti Marg, Vasant Vihar, easily accessible from across South and Central Delhi.
            </p>
          </div>

          <div 
            style={{
              width: "100%",
              height: "400px",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              border: "1px solid var(--ojalis-border)",
              boxShadow: "var(--shadow-sm)",
              backgroundColor: "#eaeaea"
            }}
          >
            <iframe 
              title="Ojalis Yogic Centre Location Map"
              src="https://maps.google.com/maps?q=Vasant%20Vihar%2C%20New%20Delhi%2C%20India&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Quick Booking Callout Below Map */}
          <div style={{ marginTop: "40px", background: "#ffffff", borderRadius: "var(--radius-lg)", padding: "32px", border: "1px solid var(--ojalis-border)", textAlign: "center" }}>
            <h3 style={{ fontSize: "22px", color: "var(--ojalis-burgundy)", marginBottom: "8px" }}>
              Ready to Practice With Us?
            </h3>
            <p style={{ color: "var(--ojalis-text-muted)", fontSize: "15px", marginBottom: "20px" }}>
              You can directly pick your preferred date, time slot, and program on our booking page.
            </p>
            <Link to="/book-session" className="btn btn-gold">
              Go to Session Booking Form
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;