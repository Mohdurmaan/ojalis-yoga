import { useState } from "react";
import { Link } from "react-router-dom";

function Programs() {
  const [activeFilter, setActiveFilter] = useState("all");

  const fullPrograms = [
    {
      id: "general-hatha",
      category: "daily",
      name: "General Classical Hatha Yoga",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
      description: "Our hallmark daily program focusing on classical postures held with steady awareness. Designed to build functional flexibility, muscle tone, spinal elasticity, and deep diaphragmatic breath coordination.",
      suitableFor: "Beginners, working adults, and continuing practitioners wanting a balanced daily practice.",
      schedule: "Mon - Sat: 6:00 AM, 7:30 AM, 5:30 PM & 7:00 PM (60 Mins)",
      intensity: "Gentle to Moderate",
      batchSize: "Max 12 Students per cohort"
    },
    {
      id: "therapeutic",
      category: "therapeutic",
      name: "Therapeutic & Restorative Yoga",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80",
      description: "Carefully designed gentle sequences incorporating yoga props (bolsters, belts, chairs) to relieve persistent lower back strain, neck and shoulder stiffness, knee tightness, and postural misalignment.",
      suitableFor: "Individuals with chronic physical fatigue, desk workers with postural strain, and seniors seeking gentle mobility.",
      schedule: "Daily: 9:00 AM – 10:15 AM & 4:00 PM – 5:15 PM (75 Mins)",
      intensity: "Low / Restorative",
      batchSize: "Max 8 Students (High Individual Attention)"
    },
    {
      id: "pranayama-kriya",
      category: "meditation",
      name: "Pranayama & Yogic Kriyas",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
      description: "The deeper dimensions of breath control. Includes traditional preparatory kriyas (Jala Neti, Kapalabhati) followed by systematic breath expansion (Anulom Vilom, Bhramari, Sheetali, Ujjayi) to balance the solar and lunar nadis.",
      suitableFor: "Anyone seeking stress relief, improved lung capacity, deeper emotional stability, and mental clarity.",
      schedule: "Early Mornings: 6:00 AM – 7:00 AM (Mon, Wed, Fri)",
      intensity: "Meditative & Cleansing",
      batchSize: "Max 15 Students"
    },
    {
      id: "meditation-stillness",
      category: "meditation",
      name: "Meditation & Inner Awakening",
      image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80",
      description: "Progressive guidance through Dharana (concentration methods) into spontaneous Dhyana (deep meditation). Features Omkar resonance, silent observation of thought waves, and deep inner stillness.",
      suitableFor: "Seekers wanting to cultivate inner quietude, conquer racing thoughts, and build a lasting personal meditation practice.",
      schedule: "Daily: 7:30 PM – 8:30 PM (Evening Tranquility Slot)",
      intensity: "Quiet Contemplative",
      batchSize: "Max 15 Students"
    },
    {
      id: "weight-management",
      category: "daily",
      name: "Weight Management & Metabolic Yoga",
      image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80",
      description: "A dynamic, breath-paced practice incorporating Surya Namaskar variations, core stabilizing postures, and twisting asanas to stimulate digestion, activate metabolic efficiency, and trim stubborn visceral weight.",
      suitableFor: "Those aiming to shed unhealthy weight, build lean endurance, tone the abdomen, and activate vitality naturally.",
      schedule: "Tue, Thu, Sat: 6:30 AM & 6:00 PM (60 Mins)",
      intensity: "Dynamic / Active Flow",
      batchSize: "Max 12 Students"
    },
    {
      id: "personal-sessions",
      category: "therapeutic",
      name: "Personal 1-on-1 Mentorship",
      image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=800&q=80",
      description: "Dedicated private sessions with our senior Acharya. Ideal for individuals requiring bespoke therapeutic adjustments, pre-natal care, or deep spiritual guidance at convenient personalized timings.",
      suitableFor: "Executives with irregular hours, individuals with specialized rehabilitation requirements, and serious spiritual sadhakas.",
      schedule: "By Appointment: Weekday & Weekend Slots Available",
      intensity: "100% Customized",
      batchSize: "Private 1-on-1"
    }
  ];

  const filteredPrograms = activeFilter === "all" 
    ? fullPrograms 
    : fullPrograms.filter(p => p.category === activeFilter);

  return (
    <main className="bg-ivory">
      {/* Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Transformative Curriculum</span>
          <h1 className="page-hero-title">Our Yoga & Sadhana Programs</h1>
          <p className="page-hero-subtitle">
            Authentic, thoughtfully structured sessions honoring your unique body constitution, schedule, and personal wellness aspirations.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Program Cards */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="filter-tabs-row">
            <button 
              className={`filter-tab-btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              All Programs ({fullPrograms.length})
            </button>
            <button 
              className={`filter-tab-btn ${activeFilter === "daily" ? "active" : ""}`}
              onClick={() => setActiveFilter("daily")}
            >
              Daily Asana Batches
            </button>
            <button 
              className={`filter-tab-btn ${activeFilter === "therapeutic" ? "active" : ""}`}
              onClick={() => setActiveFilter("therapeutic")}
            >
              Therapeutic & Private
            </button>
            <button 
              className={`filter-tab-btn ${activeFilter === "meditation" ? "active" : ""}`}
              onClick={() => setActiveFilter("meditation")}
            >
              Pranayama & Meditation
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
            {filteredPrograms.map((item) => (
              <div 
                key={item.id} 
                className="program-detail-card-row"
              >
                <div style={{ height: "100%", minHeight: "300px", position: "relative" }}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
                  />
                  <div 
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      backgroundColor: "var(--ojalis-burgundy)",
                      color: "#ffffff",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: "var(--radius-full)",
                      textTransform: "uppercase",
                      letterSpacing: "1px"
                    }}
                  >
                    {item.intensity}
                  </div>
                </div>

                <div style={{ padding: "32px 30px" }}>
                  <h3 style={{ fontSize: "24px", color: "var(--ojalis-burgundy)", marginBottom: "12px" }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: "15px", color: "var(--ojalis-text-muted)", lineHeight: 1.7, marginBottom: "18px" }}>
                    {item.description}
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "24px", fontSize: "13.5px" }}>
                    <div style={{ background: "#ffffff", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--ojalis-border)" }}>
                      <strong style={{ color: "var(--ojalis-burgundy)", display: "block", marginBottom: "3px" }}>Who It's For:</strong>
                      <span style={{ color: "var(--ojalis-text-muted)" }}>{item.suitableFor}</span>
                    </div>
                    <div style={{ background: "#ffffff", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--ojalis-border)" }}>
                      <strong style={{ color: "var(--ojalis-burgundy)", display: "block", marginBottom: "3px" }}>Schedule & Batches:</strong>
                      <span style={{ color: "var(--ojalis-text-muted)" }}>{item.schedule} ({item.batchSize})</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
                    <Link to={`/book-session?program=${encodeURIComponent(item.name)}`} className="btn btn-primary">
                      Book This Program
                      <span className="btn-arrow">→</span>
                    </Link>
                    <Link to="/contact" className="btn btn-outline-burgundy">
                      Ask a Question
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-card-box">
            <h2 className="final-cta-title">
              Not Sure Which Program <span>Suits You Best?</span>
            </h2>
            <p className="final-cta-desc">
              Speak with our lead instructor for a free 10-minute personal consultation to evaluate your fitness level and recommend the right batch.
            </p>
            <div className="final-cta-btn-group">
              <Link to="/book-session" className="btn btn-gold">
                Schedule Free Consultation
                <span className="btn-arrow">→</span>
              </Link>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="btn btn-white">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Programs;
