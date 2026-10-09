import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { IconSuccessCheck, IconClock, IconCalendar, IconSparkle } from "../components/Icons";
import { API_URL } from "../utils/api";

function BookSession() {
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    program: "General Classical Hatha Yoga",
    date: "",
    timeSlot: "Morning: 6:00 AM – 7:15 AM",
    message: ""
  });

  const [isBooked, setIsBooked] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill program if present in query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const programParam = params.get("program");
    if (programParam) {
      setFormData((prev) => ({ ...prev, program: programParam }));
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/book-sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to book session');
      }
      
      setIsBooked(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-ivory">
      {/* Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Enrollment & Admissions</span>
          <h1 className="page-hero-title">Book a Practice Session</h1>
          <p className="page-hero-subtitle">
            Reserve your mat for an introductory trial session or schedule a private consultation with our experienced faculty.
          </p>
        </div>
      </section>

      {/* Balanced Two-Column Booking Layout */}
      <section className="section-spacing bg-white">
        <div className="container">
          {isBooked ? (
            <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center", backgroundColor: "var(--ojalis-ivory)", borderRadius: "var(--radius-lg)", border: "1px solid var(--ojalis-border)", padding: "48px 36px" }}>
              <div style={{ color: "#2e7d32", display: "inline-flex", marginBottom: "16px" }}>
                <IconSuccessCheck size={56} color="#2e7d32" />
              </div>
              <div className="section-tag-text" style={{ color: "var(--ojalis-gold-dark)" }}>
                Reservation Request Received
              </div>
              <h2 style={{ fontSize: "28px", color: "var(--ojalis-burgundy)", marginTop: "10px", marginBottom: "16px" }}>
                Namaste, {formData.name}
              </h2>
              <p style={{ fontSize: "16px", color: "var(--ojalis-text-muted)", lineHeight: 1.7, margin: "0 auto 24px" }}>
                Your booking request for <strong>{formData.program}</strong> on <strong>{formData.date || "your selected date"}</strong> ({formData.timeSlot}) has been received. Our coordinator will contact you at <strong>{formData.phone}</strong> to confirm your slot.
              </p>

              <div style={{ background: "#ffffff", border: "1px solid var(--ojalis-border)", borderRadius: "var(--radius-md)", padding: "22px", textAlign: "left", fontSize: "14px", marginBottom: "28px" }}>
                <strong style={{ color: "var(--ojalis-burgundy)", display: "block", marginBottom: "8px" }}>
                  First Visit Guidelines:
                </strong>
                <ul style={{ paddingLeft: "20px", color: "var(--ojalis-text-muted)", lineHeight: 1.75 }}>
                  <li>Please arrive 10 to 15 minutes before class time to settle in.</li>
                  <li>Wear comfortable, loose-fitting or stretchable cotton attire.</li>
                  <li>Avoid heavy meals for 2.5 hours prior to practice.</li>
                  <li>Sanitized organic cotton mats and alignment props are provided at the studio.</li>
                </ul>
              </div>

              <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
                <button 
                  onClick={() => setIsBooked(false)}
                  className="btn btn-outline-burgundy"
                >
                  Book Another Session
                </button>
                <Link to="/" className="btn btn-primary">
                  Return to Home Page
                </Link>
              </div>
            </div>
          ) : (
            <div className="booking-two-column-layout" style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "48px", alignItems: "flex-start" }}>
              {/* Left Column: Guidance & Indian Yoga Image */}
              <div className="booking-info-col" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ background: "var(--ojalis-ivory)", border: "1px solid var(--ojalis-border)", borderRadius: "var(--radius-lg)", padding: "32px" }}>
                  <span className="section-tag-text">What to Expect</span>
                  <h2 style={{ fontSize: "24px", color: "var(--ojalis-burgundy)", marginTop: "6px", marginBottom: "16px" }}>
                    Practicing at Ojalis
                  </h2>
                  <p style={{ fontSize: "14.5px", color: "var(--ojalis-text-muted)", lineHeight: 1.7, marginBottom: "20px" }}>
                    Every session is guided by senior, certified teachers in a calm and spacious hall. We limit batch sizes to ensure every practitioner receives personalized attention.
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "13.5px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <div style={{ color: "var(--ojalis-gold-dark)", marginTop: "2px" }}>
                        <IconSparkle size={15} color="var(--ojalis-gold-dark)" />
                      </div>
                      <span style={{ color: "var(--ojalis-text-main)" }}>
                        <strong>Beginner Assessment:</strong> 15-minute posture assessment prior to your first class.
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <div style={{ color: "var(--ojalis-gold-dark)", marginTop: "2px" }}>
                        <IconSparkle size={15} color="var(--ojalis-gold-dark)" />
                      </div>
                      <span style={{ color: "var(--ojalis-text-main)" }}>
                        <strong>Organic Equipment:</strong> High-density mats, organic cotton bolsters, and belts provided.
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <div style={{ color: "var(--ojalis-gold-dark)", marginTop: "2px" }}>
                        <IconSparkle size={15} color="var(--ojalis-gold-dark)" />
                      </div>
                      <span style={{ color: "var(--ojalis-text-main)" }}>
                        <strong>Quiet Atmosphere:</strong> A peaceful sanctuary free from loud music or performance pressure.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Authentic Indian Yoga Photograph */}
                <div 
                  style={{ 
                    height: "320px", 
                    borderRadius: "var(--radius-lg)", 
                    overflow: "hidden", 
                    boxShadow: "var(--shadow-sm)", 
                    border: "1px solid var(--ojalis-border)" 
                  }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=85" 
                    alt="Authentic Indian yoga practitioner seated in meditation posture" 
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
                  />
                </div>
              </div>

              {/* Right Column: Clean Booking Form */}
              <div 
                className="booking-form-col"
                style={{
                  background: "#ffffff",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--ojalis-border)",
                  padding: "38px 34px",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                <div style={{ marginBottom: "24px" }}>
                  <span className="section-tag-text">Personal Details</span>
                  <h2 style={{ fontSize: "24px", color: "var(--ojalis-burgundy)", marginTop: "4px" }}>
                    Select Your Session
                  </h2>
                </div>

                <form onSubmit={handleSubmit}>
                  {error && <div style={{ color: 'red', marginBottom: '16px', padding: '10px', background: '#ffebee', borderRadius: '4px' }}>{error}</div>}
                  {/* Full Name */}
                  <div className="form-field-group">
                    <label className="form-field-label">Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Rahul Verma"
                      className="form-input-ctrl"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  {/* Phone & Email */}
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

                  {/* Program Selection */}
                  <div className="form-field-group">
                    <label className="form-field-label">Select Yoga Program *</label>
                    <select 
                      className="form-select-ctrl"
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    >
                      <option value="General Classical Hatha Yoga">General Classical Hatha Yoga</option>
                      <option value="Therapeutic & Restorative Yoga">Therapeutic & Restorative Yoga</option>
                      <option value="Pranayama & Yogic Kriyas">Pranayama & Yogic Kriyas</option>
                      <option value="Meditation & Inner Awakening">Meditation & Inner Awakening</option>
                      <option value="Weight Management & Metabolic Yoga">Weight Management & Metabolic Yoga</option>
                      <option value="Personal 1-on-1 Mentorship">Personal 1-on-1 Mentorship</option>
                    </select>
                  </div>

                  {/* Preferred Date & Preferred Time */}
                  <div className="form-grid-2col">
                    <div className="form-field-group">
                      <label className="form-field-label">Preferred Date *</label>
                      <input 
                        type="date" 
                        required 
                        className="form-input-ctrl"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                    <div className="form-field-group">
                      <label className="form-field-label">Preferred Time *</label>
                      <select 
                        className="form-select-ctrl"
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      >
                        <option value="Morning: 6:00 AM – 7:15 AM">Morning: 6:00 AM – 7:15 AM</option>
                        <option value="Morning: 7:30 AM – 8:45 AM">Morning: 7:30 AM – 8:45 AM</option>
                        <option value="Morning: 9:00 AM – 10:15 AM (Therapeutic)">Morning: 9:00 AM – 10:15 AM (Therapeutic)</option>
                        <option value="Evening: 4:30 PM – 5:45 PM">Evening: 4:30 PM – 5:45 PM</option>
                        <option value="Evening: 6:00 PM – 7:15 PM">Evening: 6:00 PM – 7:15 PM</option>
                        <option value="Evening: 7:30 PM – 8:30 PM (Meditation)">Evening: 7:30 PM – 8:30 PM (Meditation)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-field-group">
                    <label className="form-field-label">Message (Optional)</label>
                    <textarea 
                      rows="3" 
                      placeholder="Any past injuries, specific health objectives or notes for the instructor..."
                      className="form-textarea-ctrl"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: "100%", padding: "14px", fontSize: "15.5px", opacity: isSubmitting ? 0.7 : 1 }}>
                    {isSubmitting ? 'Booking...' : 'Book a Session'}
                    {!isSubmitting && <span className="btn-arrow">→</span>}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default BookSession;

