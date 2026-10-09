import { useParams, Link, Navigate } from "react-router-dom";
import { whatWeTeachData } from "../data/whatWeTeachData";
import { IconLotus, IconSparkle, IconCheckmark } from "../components/Icons";

function WhatWeTeachDetail() {
  const { slug } = useParams();
  const practice = whatWeTeachData[slug];

  // If slug is not found in data, redirect to programs
  if (!practice) {
    return <Navigate to="/programs" replace />;
  }

  // Get other offerings for exploration
  const otherOfferings = Object.values(whatWeTeachData)
    .filter(item => item.slug !== slug)
    .slice(0, 3);

  return (
    <main className="bg-ivory">
      {/* 1. Page Hero Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">{practice.tag}</span>
          <h1 className="page-hero-title">{practice.title}</h1>
          <p className="page-hero-subtitle">
            {practice.lead}
          </p>
        </div>
      </section>

      {/* 2. Introduction & Visual Two-Col */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="intro-two-col" style={{ alignItems: "center" }}>
            {/* Visual Column */}
            <div className="intro-visual-side">
              <div 
                className="intro-image-container"
                style={{
                  height: "440px",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-md)",
                  border: "1px solid var(--ojalis-border)"
                }}
              >
                <img 
                  src={practice.image} 
                  alt={practice.title} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div className="intro-stat-badge-float">
                <div className="badge-float-icon">
                  <IconLotus size={24} color="var(--ojalis-gold)" />
                </div>
                <div>
                  <span className="badge-float-title">Classical Tradition</span>
                  <span className="badge-float-sub">Taught with Care & Precision</span>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div>
              <div className="section-tag-wrapper">
                <span className="section-tag-line"></span>
                <span className="section-tag-text">Foundational Practice</span>
              </div>
              <h2 className="section-title-main" style={{ fontSize: "clamp(26px, 3.5vw, 36px)", marginBottom: "16px" }}>
                {practice.headline}
              </h2>
              <p className="section-desc-main" style={{ marginBottom: "20px" }}>
                {practice.introText}
              </p>
              
              <div style={{ background: "var(--ojalis-ivory)", borderRadius: "var(--radius-md)", padding: "20px 24px", border: "1px solid var(--ojalis-border)", marginTop: "24px" }}>
                <h4 style={{ fontSize: "15px", fontWeight: 700, color: "var(--ojalis-burgundy)", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <IconSparkle size={16} color="var(--ojalis-gold)" />
                  Who This Practice Is For
                </h4>
                <p style={{ fontSize: "14px", color: "var(--ojalis-text-muted)", lineHeight: 1.6, margin: 0 }}>
                  {practice.suitableFor}
                </p>
              </div>

              <div style={{ marginTop: "28px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Link to="/book-session" className="btn btn-primary">
                  Book a Session
                  <span className="btn-arrow">→</span>
                </Link>
                <Link to="/online-classes" className="btn btn-gold">
                  Explore Online Classes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Principles */}
      <section className="section-spacing bg-ivory">
        <div className="container">
          <div className="text-center" style={{ maxWidth: "700px", margin: "0 auto 48px" }}>
            <span className="section-tag-text" style={{ color: "var(--ojalis-gold-dark)", letterSpacing: "2px", fontWeight: 700, textTransform: "uppercase", fontSize: "12px" }}>
              Core Principles & Methodology
            </span>
            <h2 className="section-title-main" style={{ marginTop: "8px" }}>
              How We Approach <span>{practice.title}</span>
            </h2>
            <p className="section-desc-main">
              Every practice at Ojalis is anchored in anatomical safety, classical lineage, and personalized pacing.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {practice.principles.map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  background: "#ffffff", 
                  borderRadius: "var(--radius-md)", 
                  padding: "30px 24px", 
                  border: "1px solid var(--ojalis-border)",
                  boxShadow: "var(--shadow-sm)",
                  position: "relative"
                }}
              >
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--ojalis-gold)", letterSpacing: "1px", marginBottom: "8px" }}>
                  0{idx + 1}
                </div>
                <h3 style={{ fontSize: "18px", color: "var(--ojalis-burgundy)", marginBottom: "12px", fontFamily: "var(--font-serif)", fontWeight: 700 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "14px", color: "var(--ojalis-text-muted)", lineHeight: 1.6, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Curriculum & Techniques Covered */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div className="text-center" style={{ marginBottom: "36px" }}>
              <span className="section-tag-text" style={{ color: "var(--ojalis-gold-dark)", letterSpacing: "2px", fontWeight: 700, textTransform: "uppercase", fontSize: "12px" }}>
                Curriculum Components
              </span>
              <h2 className="section-title-main" style={{ marginTop: "8px" }}>
                Key Practices & Techniques Included
              </h2>
            </div>

            <div style={{ background: "var(--ojalis-ivory)", borderRadius: "var(--radius-lg)", border: "1px solid var(--ojalis-border)", padding: "36px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px" }}>
                {practice.practices.map((tech, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div style={{ marginTop: "2px", color: "var(--ojalis-gold)", flexShrink: 0 }}>
                      <IconCheckmark size={18} />
                    </div>
                    <span style={{ fontSize: "14.5px", color: "var(--ojalis-text-main)", fontWeight: 500, lineHeight: 1.5 }}>
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Explore Other Practices */}
      <section className="section-spacing bg-ivory">
        <div className="container">
          <div className="text-center" style={{ maxWidth: "600px", margin: "0 auto 40px" }}>
            <span className="section-tag-text" style={{ color: "var(--ojalis-gold-dark)", letterSpacing: "2px", fontWeight: 700, textTransform: "uppercase", fontSize: "12px" }}>
              Continuous Journey
            </span>
            <h3 style={{ fontSize: "28px", color: "var(--ojalis-burgundy)", fontFamily: "var(--font-serif)", marginTop: "6px" }}>
              Explore Other What We Teach Offerings
            </h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            {otherOfferings.map((item) => (
              <Link 
                key={item.slug} 
                to={`/what-we-teach/${item.slug}`}
                style={{ 
                  background: "#ffffff", 
                  borderRadius: "var(--radius-md)", 
                  padding: "24px", 
                  border: "1px solid var(--ojalis-border)",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease"
                }}
                className="program-card-hover"
              >
                <span style={{ fontSize: "12px", color: "var(--ojalis-gold-dark)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>
                  {item.tag}
                </span>
                <h4 style={{ fontSize: "20px", color: "var(--ojalis-burgundy)", fontFamily: "var(--font-serif)", marginBottom: "8px" }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: "13.5px", color: "var(--ojalis-text-muted)", lineHeight: 1.5, marginBottom: "16px", flex: 1 }}>
                  {item.headline}
                </p>
                <div style={{ color: "var(--ojalis-burgundy)", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>View Details</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Dedicated Bottom Inquire Strip */}
      <section style={{ background: "linear-gradient(135deg, var(--ojalis-burgundy-dark) 0%, var(--ojalis-burgundy) 100%)", color: "#ffffff", padding: "64px 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <h3 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontFamily: "var(--font-serif)", color: "#ffffff", marginBottom: "14px" }}>
            Ready to Deepen Your Practice in {practice.title}?
          </h3>
          <p style={{ color: "#e5d8dc", fontSize: "15.5px", lineHeight: 1.7, marginBottom: "28px" }}>
            Whether in our studio hall or in an intimate live virtual cohort, our acharyas offer patient, individualized mentoring.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link to="/book-session" className="btn btn-gold">
              Reserve a Private Session
            </Link>
            <Link to="/contact" className="btn btn-outline-white" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff" }}>
              Contact Our Teachers
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default WhatWeTeachDetail;
