import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchPublic, getImageUrl } from "../utils/api";

function Trainers() {
  const [trainersList, setTrainersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublic("/teachers")
      .then((data) => {
        if (Array.isArray(data)) {
          const mapped = data.map((item) => ({
            id: item.id || item._id,
            name: item.name || "Teacher",
            role: item.specializations || "Yoga Faculty",
            photo: getImageUrl(item.profileImage || item.image) || "/logo.png",
            qualification: item.qualifications,
            experience: item.experience,
            specialization: item.specializations,
            quote: item.shortBio,
            bio: item.biography,
          }));
          setTrainersList(mapped);
        } else {
          setTrainersList([]);
        }
      })
      .catch((err) => {
        console.error("Failed to load teachers:", err);
        setTrainersList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="bg-ivory">
      {/* Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Dedicated Faculty</span>
          <h1 className="page-hero-title">Meet Our Experienced Mentors</h1>
          <p className="page-hero-subtitle">
            Humble, certified, and deeply grounded teachers who embody the authentic spirit, precision, and compassion of traditional yoga.
          </p>
        </div>
      </section>

      {/* Balanced Trainers Profile Layout */}
      <section className="section-spacing bg-white">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: "center", padding: "64px 0", color: "var(--ojalis-text-muted)" }}>
              Loading mentors...
            </div>
          ) : trainersList.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "64px 24px",
                maxWidth: "680px",
                margin: "0 auto",
                backgroundColor: "var(--ojalis-ivory)",
                border: "1px dashed var(--ojalis-gold-border)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--ojalis-burgundy)", marginBottom: "12px", fontSize: "22px" }}>
                Faculty Profiles Updating
              </h3>
              <p style={{ color: "var(--ojalis-text-muted)", fontSize: "15px", lineHeight: 1.7, marginBottom: "24px" }}>
                Our teacher profiles are currently being updated in our sanctuary registry. Please check back shortly or book an orientation session with our faculty directly.
              </p>
              <Link to="/book-session" className="btn btn-primary">
                Book a Session
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "36px", maxWidth: "980px", margin: "0 auto" }}>
              {trainersList.map((trainer, idx) => (
                <div 
                  key={trainer.id || idx} 
                  className="trainer-balanced-card"
                  style={{
                    backgroundColor: "var(--ojalis-ivory)",
                    border: "1px solid var(--ojalis-border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "32px",
                    display: "flex",
                    gap: "32px",
                    alignItems: "flex-start",
                    boxShadow: "var(--shadow-sm)"
                  }}
                >
                  {/* Balanced Photo Container */}
                  <div 
                    className="trainer-avatar-box"
                    style={{
                      width: "210px",
                      height: "240px",
                      minWidth: "210px",
                      borderRadius: "var(--radius-md)",
                      overflow: "hidden",
                      border: "1.5px solid var(--ojalis-gold-border)",
                      boxShadow: "var(--shadow-sm)",
                      backgroundColor: "#ffffff",
                      flexShrink: 0
                    }}
                  >
                    <img 
                      src={trainer.photo} 
                      alt={trainer.name} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/logo.png";
                      }}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
                    />
                  </div>

                  {/* Trainer Content & Credentials */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px", marginBottom: "4px" }}>
                      <h2 style={{ fontSize: "24px", color: "var(--ojalis-burgundy)", margin: 0 }}>
                        {trainer.name}
                      </h2>
                      {trainer.role && (
                        <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--ojalis-gold-dark)" }}>
                          {trainer.role}
                        </span>
                      )}
                    </div>

                    {trainer.qualification && (
                      <div style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--ojalis-burgundy-light)", marginBottom: "10px" }}>
                        {trainer.qualification}
                      </div>
                    )}

                    {(trainer.experience || trainer.specialization) && (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", background: "#ffffff", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--ojalis-border)", fontSize: "12.5px", marginBottom: "14px" }}>
                        {trainer.experience && (
                          <div>
                            <strong style={{ color: "var(--ojalis-burgundy)" }}>Experience: </strong>
                            <span style={{ color: "var(--ojalis-text-muted)" }}>{trainer.experience}</span>
                          </div>
                        )}
                        {trainer.specialization && (
                          <div>
                            <strong style={{ color: "var(--ojalis-burgundy)" }}>Specialization: </strong>
                            <span style={{ color: "var(--ojalis-text-muted)" }}>{trainer.specialization}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {trainer.quote && (
                      <blockquote style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: "15.5px",
                        color: "var(--ojalis-burgundy)",
                        borderLeft: "2.5px solid var(--ojalis-gold)",
                        paddingLeft: "14px",
                        marginBottom: "12px",
                        lineHeight: 1.6
                      }}>
                        "{trainer.quote}"
                      </blockquote>
                    )}

                    {trainer.bio && (
                      <p style={{ fontSize: "14px", color: "var(--ojalis-text-muted)", lineHeight: 1.65, marginBottom: "18px" }}>
                        {trainer.bio}
                      </p>
                    )}

                    <Link to={`/book-session?trainer=${encodeURIComponent(trainer.name)}`} className="btn btn-primary" style={{ padding: "9px 20px", fontSize: "13.5px" }}>
                      Book a Session with {trainer.name ? trainer.name.trim().split(" ")[0] : "Mentor"}
                      <span className="btn-arrow">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-card-box">
            <h2 className="final-cta-title">
              Experience Personal Guidance <span>Firsthand</span>
            </h2>
            <p className="final-cta-desc">
              Schedule a friendly orientation session with our faculty to assess your current flexibility and discuss your personal wellness goals.
            </p>
            <div className="final-cta-btn-group">
              <Link to="/book-session" className="btn btn-gold">
                Schedule Orientation Session
                <span className="btn-arrow">→</span>
              </Link>
              <Link to="/contact" className="btn btn-white">
                Contact the Teachers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Trainers;
