import { Link } from "react-router-dom";
import { IconCheckmark } from "../components/Icons";

function Meditation() {
  const kriyasData = [
    {
      title: "Trataka & Third-Eye Focusing",
      subtitle: "Jyoti Sadhana for Mental Focus",
      desc: "An ancient foundational practice of unblinking gazing upon a sacred flame or point of light. Calms fluctuating neural patterns, sharpens memory, activates the Ajna (third eye) chakra, and dissolves brain fog.",
      timing: "Early Morning & Twilight Sessions",
      level: "All Levels"
    },
    {
      title: "Nadi Shodhana Pranayama",
      subtitle: "Channel Purification & Nervous System Balancing",
      desc: "Alternate nostril breathing with gentle retention (Kumbhaka). Harmonizes the left and right cerebral hemispheres, pacifies mental anxiety, and balances Ida and Pingala energy channels.",
      timing: "Daily Morning Sadhana",
      level: "Beginner to Intermediate"
    },
    {
      title: "Bhramari & Nada Yoga",
      subtitle: "Vibrational Sound Therapy",
      desc: "The resonant humming of the bee creating harmonic acoustic vibrations within the cranium. Scientifically proven to increase nitric oxide production, calm heart rate, and induce tranquility.",
      timing: "Daily Evening Batches",
      level: "All Levels"
    },
    {
      title: "Omkar Japa & Inner Stillness",
      subtitle: "Cosmic Resonance & Spontaneous Silence",
      desc: "Systematic chanting of A-U-M resonating from the lower belly to the crown of the head, followed by deep sustained silence. Leaves the practitioner centered in peaceful witness consciousness.",
      timing: "Weekend Meditation Circles",
      level: "All Levels"
    }
  ];

  return (
    <main className="bg-ivory">
      {/* Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Sacred Inward Journey</span>
          <h1 className="page-hero-title">Meditation & Yogic Kriya</h1>
          <p className="page-hero-subtitle">
            Awaken the quiet strength within. Discover classical breathwork, sensory withdrawal, and meditative stillness to soothe the modern mind.
          </p>
        </div>
      </section>

      {/* Introduction Section with Full HD Authentic Indian Meditation Image */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="intro-two-col" style={{ alignItems: "center" }}>
            <div className="intro-visual-side">
              <div 
                className="intro-image-container"
                style={{
                  height: "460px",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-md)",
                  border: "1px solid var(--ojalis-border)"
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1920&q=85" 
                  alt="Full HD Indian meditation practitioner in peaceful dawn sadhana" 
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>

            <div>
              <div className="section-tag-wrapper">
                <span className="section-tag-line"></span>
                <span className="section-tag-text">The Art of Stillness</span>
              </div>
              <h2 className="section-title-main">
                Why Meditation is <span>Vital Today</span>
              </h2>
              <p className="section-desc-main" style={{ marginBottom: "18px" }}>
                In a world overflowing with screens, notifications, and unrelenting mental deadlines, your brain rarely experiences true rest. Even sleep is often restless because the nervous system remains stuck in a fight-or-flight cycle.
              </p>
              <p className="section-desc-main" style={{ marginBottom: "22px" }}>
                Yogic meditation is not about forcefully stopping your thoughts—it is about learning to step back and become the calm, undisturbed observer. Through systematic breath regulation (Pranayama) and conscious relaxation, the turbulence of thought settles naturally, like silt resting in clear mountain water.
              </p>
              <div className="intro-feature-check-list">
                <div className="intro-check-item">
                  <span style={{ color: "var(--ojalis-gold-dark)", display: "inline-flex", marginTop: "2px" }}>
                    <IconCheckmark size={18} color="var(--ojalis-gold-dark)" />
                  </span>
                  <span><strong>Zero Mental Force:</strong> We teach gentle awareness methods that feel restful rather than straining.</span>
                </div>
                <div className="intro-check-item">
                  <span style={{ color: "var(--ojalis-gold-dark)", display: "inline-flex", marginTop: "2px" }}>
                    <IconCheckmark size={18} color="var(--ojalis-gold-dark)" />
                  </span>
                  <span><strong>Breath-Guided:</strong> Using physical breath as the effortless anchor for attention.</span>
                </div>
                <div className="intro-check-item">
                  <span style={{ color: "var(--ojalis-gold-dark)", display: "inline-flex", marginTop: "2px" }}>
                    <IconCheckmark size={18} color="var(--ojalis-gold-dark)" />
                  </span>
                  <span><strong>Lasting Calm:</strong> Carry the peaceful silence into your work meetings and family life.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Kriyas Overview */}
      <section className="section-spacing bg-ivory">
        <div className="container">
          <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
            <div className="section-tag-wrapper">
              <span className="section-tag-line"></span>
              <span className="section-tag-text">Classical Practices</span>
              <span className="section-tag-line"></span>
            </div>
            <h2 className="section-title-main">
              The Four Sacred <span>Yogic Kriyas</span>
            </h2>
            <p className="section-desc-main mx-auto">
              Each practice is taught step-by-step with individualized supervision to ensure safe respiratory rhythm and meditative grounding.
            </p>
          </div>

          <div className="programs-card-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", marginTop: "44px" }}>
            {kriyasData.map((item, idx) => (
              <div key={idx} className="why-card-item" style={{ padding: "34px" }}>
                <span style={{ color: "var(--ojalis-gold-dark)", fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                  {item.subtitle}
                </span>
                <h3 style={{ fontSize: "22px", color: "var(--ojalis-burgundy)", marginTop: "8px", marginBottom: "12px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "14.5px", color: "var(--ojalis-text-muted)", lineHeight: 1.7, marginBottom: "20px" }}>
                  {item.desc}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--ojalis-border)", paddingTop: "14px", fontSize: "13px" }}>
                  <span style={{ color: "var(--ojalis-burgundy)", fontWeight: 600 }}>{item.timing}</span>
                  <span style={{ color: "var(--ojalis-gold-dark)", fontWeight: 600 }}>{item.level}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: "44px" }}>
            <Link to="/book-session" className="btn btn-primary">
              Join Our Next Guided Meditation Batch
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Sanctuary Atmosphere (Balanced Two-Column Section) */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="intro-two-col" style={{ alignItems: "center" }}>
            <div>
              <div className="section-tag-wrapper">
                <span className="section-tag-line"></span>
                <span className="section-tag-text">Sanctuary Design</span>
              </div>
              <h2 className="section-title-main">
                Crafted for Undisturbed <span>Quietude</span>
              </h2>
              <p className="section-desc-main" style={{ marginBottom: "20px" }}>
                Deep meditation is challenging when fighting uncomfortable postures or intrusive urban noise. We intentionally engineered our practice hall to remove external sensory friction so your awareness settles effortlessly.
              </p>

              <div className="timeline-phase-list">
                <div className="timeline-phase-item">
                  <div className="timeline-phase-badge">Acoustics</div>
                  <div className="timeline-phase-content">
                    <h4>Sound-Dampened Practice Hall</h4>
                    <p>Insulated architectural design that filters out Delhi traffic noise, allowing you to settle into unbroken silence.</p>
                  </div>
                </div>

                <div className="timeline-phase-item">
                  <div className="timeline-phase-badge">Ergonomics</div>
                  <div className="timeline-phase-content">
                    <h4>Organic Buckwheat Zafus & Bolsters</h4>
                    <p>Ergonomic cushions and supportive blocks that maintain a natural upright spine without hip or knee strain.</p>
                  </div>
                </div>

                <div className="timeline-phase-item">
                  <div className="timeline-phase-badge">Ambiance</div>
                  <div className="timeline-phase-content">
                    <h4>Gentle Light & Natural Aromatics</h4>
                    <p>Soft diffused lighting and traditional brass Jyoti lamps for Trataka focusing without artificial fluorescent glare.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="intro-visual-side">
              <div 
                className="intro-image-container" 
                style={{ 
                  height: "440px", 
                  borderRadius: "var(--radius-lg)", 
                  overflow: "hidden", 
                  border: "1px solid var(--ojalis-border)",
                  boxShadow: "var(--shadow-md)"
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=900&q=85" 
                  alt="Quiet dawn sadhana and traditional study in serene studio setting" 
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-card-box">
            <h2 className="final-cta-title">
              Experience the <span>Power of Silence</span>
            </h2>
            <p className="final-cta-desc">
              Come join our early morning or evening meditation circle. All cushions, blankets, and guided supervision provided.
            </p>
            <div className="final-cta-btn-group">
              <Link to="/book-session" className="btn btn-gold">
                Book a Meditation Class
                <span className="btn-arrow">→</span>
              </Link>
              <Link to="/contact" className="btn btn-white">
                Contact Studio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Meditation;