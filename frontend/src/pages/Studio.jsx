import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IconLotus, IconSparkle } from "../components/Icons";
import { useStudioImages } from "../hooks/useStudioImages";

function Studio() {
  const { studioSpaces, loading } = useStudioImages();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    if (selectedImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <main className="bg-ivory">
      {/* 1. Page Hero Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Physical Sanctuary</span>
          <h1 className="page-hero-title">The Studio</h1>
          <p className="page-hero-subtitle">
            A consecration of space, natural light, and quiet breathing designed to shelter the senses and nurture authentic yogic sadhana.
          </p>
        </div>
      </section>

      {/* 2. Philosophy of Space Intro */}
      <section className="section-spacing bg-white" style={{ paddingBottom: "48px" }}>
        <div className="container" style={{ maxWidth: "880px", textAlign: "center" }}>
          <span style={{ fontSize: "12px", letterSpacing: "2.5px", fontWeight: 700, textTransform: "uppercase", color: "var(--ojalis-gold-dark)", display: "inline-block", marginBottom: "12px" }}>
            Architecture of Stillness
          </span>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", color: "var(--ojalis-burgundy)", fontFamily: "var(--font-serif)", lineHeight: 1.3, marginBottom: "20px" }}>
            "A consecrated room where the breath settles, <br />and the mind remembers silence."
          </h2>
          <p style={{ fontSize: "16px", color: "var(--ojalis-text-muted)", lineHeight: 1.8, maxWidth: "720px", margin: "0 auto" }}>
            At Ojalis Yogic Kriya, the environment itself is an instructor. Free from harsh artificial glare, loud commercial music, and crowded distractions, our studio provides clean airflow, organic surfaces, and a grounded energetic resonance that invites effortless relaxation.
          </p>
        </div>
      </section>

      {/* 3. Refined Editorial Gallery Layout (Image areas ready for future studio photos) */}
      <section className="section-spacing-sm bg-white">
        <div className="container" style={{ maxWidth: "1160px" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "40px", marginBottom: "64px" }}>
            {studioSpaces.map((space, index) => (
              <div 
                key={space.id || index} 
                style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}
                onClick={() => { if(space.image) setSelectedImage(space); }}
              >
                <div 
                  style={{ 
                    borderRadius: "var(--radius-md)", 
                    overflow: "hidden", 
                    border: "1px solid var(--ojalis-border)",
                    background: space.image ? `url(${space.image}) center/cover no-repeat` : "linear-gradient(145deg, #f7f3ec 0%, #ede6db 100%)",
                    aspectRatio: "4 / 3",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px",
                    textAlign: "center",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {!space.image && (
                    <>
                      <div style={{ color: "var(--ojalis-gold)", marginBottom: "8px" }}>
                        <IconSparkle size={26} color="var(--ojalis-gold)" />
                      </div>
                      <span style={{ fontSize: "11px", letterSpacing: "1.5px", fontWeight: 700, textTransform: "uppercase", color: "var(--ojalis-gold-dark)", marginBottom: "6px" }}>
                        Photography Placeholder
                      </span>
                    </>
                  )}
                </div>
                <div style={{ marginTop: "16px", padding: "0 4px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  {space.subtitle && (
                    <span style={{ fontSize: "11px", letterSpacing: "1.5px", fontWeight: 700, textTransform: "uppercase", color: "var(--ojalis-gold-dark)", marginBottom: "4px" }}>
                      {space.subtitle}
                    </span>
                  )}
                  <h4 style={{ fontSize: "20px", color: "var(--ojalis-burgundy)", fontFamily: "var(--font-serif)", marginBottom: "8px", marginTop: 0 }}>
                    {space.title}
                  </h4>
                  <p style={{ fontSize: "13.5px", color: "var(--ojalis-text-muted)", lineHeight: 1.6, margin: 0 }}>
                    {space.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Sanctuary Features Strip */}
      <section className="section-spacing-sm bg-ivory" style={{ borderTop: "1px solid var(--ojalis-border)" }}>
        <div className="container" style={{ maxWidth: "1060px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "var(--radius-md)", border: "1px solid var(--ojalis-border)" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ojalis-gold-dark)", marginBottom: "8px" }}>
                Air & Prana
              </div>
              <h4 style={{ fontSize: "17px", color: "var(--ojalis-burgundy)", marginBottom: "8px", fontFamily: "var(--font-serif)" }}>
                Natural Cross-Ventilation
              </h4>
              <p style={{ fontSize: "13px", color: "var(--ojalis-text-muted)", lineHeight: 1.5, margin: 0 }}>
                Continuous fresh air circulation vital for high-volume pranayama and cleansing sadhana.
              </p>
            </div>

            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "var(--radius-md)", border: "1px solid var(--ojalis-border)" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ojalis-gold-dark)", marginBottom: "8px" }}>
                Purity
              </div>
              <h4 style={{ fontSize: "17px", color: "var(--ojalis-burgundy)", marginBottom: "8px", fontFamily: "var(--font-serif)" }}>
                Organic Cotton Props
              </h4>
              <p style={{ fontSize: "13px", color: "var(--ojalis-text-muted)", lineHeight: 1.5, margin: 0 }}>
                Carefully sanitized, non-toxic organic bolsters, cork blocks, and pure cotton straps.
              </p>
            </div>

            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "var(--radius-md)", border: "1px solid var(--ojalis-border)" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ojalis-gold-dark)", marginBottom: "8px" }}>
                Serenity
              </div>
              <h4 style={{ fontSize: "17px", color: "var(--ojalis-burgundy)", marginBottom: "8px", fontFamily: "var(--font-serif)" }}>
                Unhurried Atmosphere
              </h4>
              <p style={{ fontSize: "13px", color: "var(--ojalis-text-muted)", lineHeight: 1.5, margin: 0 }}>
                Generous buffer time between batches ensures zero rushed changeovers or hallway crowding.
              </p>
            </div>

            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "var(--radius-md)", border: "1px solid var(--ojalis-border)" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ojalis-gold-dark)", marginBottom: "8px" }}>
                Nourishment
              </div>
              <h4 style={{ fontSize: "17px", color: "var(--ojalis-burgundy)", marginBottom: "8px", fontFamily: "var(--font-serif)" }}>
                Herbal Post-Practice Tea
              </h4>
              <p style={{ fontSize: "13px", color: "var(--ojalis-text-muted)", lineHeight: 1.5, margin: 0 }}>
                Complimentary traditional Ayurvedic infusions to ground and warm the system post-practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Visit Sanctuary CTA */}
      <section style={{ background: "linear-gradient(135deg, var(--ojalis-burgundy-dark) 0%, var(--ojalis-burgundy) 100%)", color: "#ffffff", padding: "64px 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "680px" }}>
          <h3 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontFamily: "var(--font-serif)", color: "#ffffff", marginBottom: "14px" }}>
            Experience the Sanctuary in Person
          </h3>
          <p style={{ color: "#e5d8dc", fontSize: "15px", lineHeight: 1.7, marginBottom: "26px" }}>
            We welcome seekers for visits and consultations by appointment. Step inside, breathe deeply, and begin your journey.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link to="/book-session" className="btn btn-gold">
              Schedule a Studio Visit
            </Link>
            <Link to="/contact" className="btn btn-outline-white" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff" }}>
              Studio Location & Contact
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Image Modal */}
      {selectedImage && (
        <div 
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "40px",
              cursor: "pointer",
              zIndex: 10000,
              padding: "10px"
            }}
          >
            &times;
          </button>
          <img 
            src={selectedImage.image} 
            alt={selectedImage.title}
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
              borderRadius: "4px"
            }}
            onClick={(e) => e.stopPropagation()}
          />
          {selectedImage.title && (
            <div style={{ color: "#fff", marginTop: "16px", textAlign: "center", fontFamily: "var(--font-serif)", fontSize: "20px", letterSpacing: "0.5px" }}>
              {selectedImage.title}
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default Studio;
