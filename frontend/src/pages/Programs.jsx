import { Link } from "react-router-dom";
import { whatWeTeachData } from "../data/whatWeTeachData";

function Programs() {
  const programsList = Object.values(whatWeTeachData);

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

      {/* Program Cards */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
            {programsList.map((item) => (
              <div 
                key={item.slug} 
                className="program-detail-card-row"
              >
                <div style={{ height: "100%", minHeight: "300px", position: "relative" }}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
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
                    {item.tag || "Foundational Practice"}
                  </div>
                </div>

                <div style={{ padding: "32px 30px" }}>
                  <h3 style={{ fontSize: "24px", color: "var(--ojalis-burgundy)", marginBottom: "12px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "15px", color: "var(--ojalis-text-muted)", lineHeight: 1.7, marginBottom: "18px" }}>
                    {item.lead}
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "24px", fontSize: "13.5px" }}>
                    <div style={{ background: "#ffffff", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--ojalis-border)" }}>
                      <strong style={{ color: "var(--ojalis-burgundy)", display: "block", marginBottom: "3px" }}>Who It's For:</strong>
                      <span style={{ color: "var(--ojalis-text-muted)" }}>{item.suitableFor}</span>
                    </div>
                    <div style={{ background: "#ffffff", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--ojalis-border)" }}>
                      <strong style={{ color: "var(--ojalis-burgundy)", display: "block", marginBottom: "3px" }}>Schedule & Batches:</strong>
                      <span style={{ color: "var(--ojalis-text-muted)" }}>Flexible Batch Timings Available</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
                    <Link to={`/what-we-teach/${item.slug}`} className="btn btn-primary">
                      Learn More
                      <span className="btn-arrow">→</span>
                    </Link>
                    <Link to={`/book-session?program=${encodeURIComponent(item.title)}`} className="btn btn-outline-burgundy">
                      Book a Session
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
