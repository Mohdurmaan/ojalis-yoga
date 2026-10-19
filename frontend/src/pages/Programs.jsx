import { useState } from "react";
import { Link } from "react-router-dom";
import { whatWeTeachData } from "../data/whatWeTeachData";
import "../what-we-teach.css";

function Programs() {
  const [filter, setFilter] = useState("all");
  const programsList = Object.values(whatWeTeachData);

  const filteredPrograms = programsList.filter((item) => {
    if (filter === "foundational") {
      return !item.isCadence && item.category !== "Part 2 · Cadences";
    }
    if (filter === "cadences") {
      return item.isCadence || item.category === "Part 2 · Cadences";
    }
    return true;
  });

  return (
    <main className="wwt-page" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
      {/* 1. HERO BANNER */}
      <section className="wwt-container" style={{ marginBottom: "56px" }}>
        <div className="text-center" style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div className="wwt-eyebrow" style={{ justifyContent: "center" }}>
            <span className="wwt-eyebrow-line"></span>
            <span>TRANSFORMATIVE CURRICULUM</span>
            <span className="wwt-eyebrow-line"></span>
          </div>

          <h1 className="wwt-section-title" style={{ fontSize: "clamp(34px, 4.5vw, 50px)" }}>
            What We Teach at <span>OJALIS</span>
          </h1>

          <p className="wwt-section-desc" style={{ margin: "0 auto 36px" }}>
            Authentic, thoughtfully structured sessions honoring your unique body constitution, schedule, and personal wellness aspirations.
          </p>

          {/* Filter Pills */}
          <div className="wwt-filter-pills-row" style={{ justifyContent: "center" }}>
            <button
              className={`wwt-filter-pill ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All Teachings ({programsList.length})
            </button>
            <button
              className={`wwt-filter-pill ${filter === "foundational" ? "active" : ""}`}
              onClick={() => setFilter("foundational")}
            >
              Foundational Practices
            </button>
            <button
              className={`wwt-filter-pill ${filter === "cadences" ? "active" : ""}`}
              onClick={() => setFilter("cadences")}
            >
              Cadences (Guided Programmes)
            </button>
          </div>
        </div>
      </section>

      {/* 2. PROGRAM CARDS GRID */}
      <section className="wwt-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "28px"
          }}
        >
          {filteredPrograms.map((item) => (
            <div
              key={item.slug}
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid var(--ojalis-border, #E8E0D5)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.03)"
              }}
              className="program-card-item-hover"
            >
              {/* Card Image Banner */}
              <div style={{ height: "230px", position: "relative", overflow: "hidden" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block"
                  }}
                  loading="lazy"
                />
                <span
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    background: "rgba(255, 255, 255, 0.94)",
                    color: "var(--site-heading-color, #4F6144)",
                    fontSize: "10.5px",
                    fontWeight: 700,
                    letterSpacing: "1.2px",
                    padding: "5px 12px",
                    borderRadius: "9999px",
                    textTransform: "uppercase",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    border: "1px solid var(--ojalis-border, #E8E0D5)"
                  }}
                >
                  {item.tag || "Foundational Practice"}
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: "28px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h2
                  style={{
                    fontFamily: "var(--site-heading-font, var(--font-display, 'Forum', serif))",
                    fontSize: "23px",
                    color: "var(--site-heading-color, #4F6144)",
                    margin: "0 0 10px 0",
                    fontWeight: 600
                  }}
                >
                  {item.title}
                </h2>

                <p
                  style={{
                    fontFamily: "'Noto Sans', sans-serif",
                    fontSize: "14.5px",
                    color: "var(--ojalis-text-muted, #6B6164)",
                    lineHeight: 1.65,
                    marginBottom: "18px",
                    flex: 1
                  }}
                >
                  {item.lead || item.simpleWords}
                </p>

                {item.bestFor && (
                  <div
                    style={{
                      background: "#faf7f2",
                      border: "1px solid var(--ojalis-border, #E8E0D5)",
                      borderRadius: "10px",
                      padding: "8px 12px",
                      fontSize: "13px",
                      color: "var(--ojalis-text-muted, #6B6164)",
                      marginBottom: "20px"
                    }}
                  >
                    <strong style={{ color: "var(--site-heading-color, #4F6144)", marginRight: "6px" }}>Best for:</strong>
                    {item.bestFor}
                  </div>
                )}

                {/* Actions */}
                <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", marginTop: "auto" }}>
                  <Link
                    to={`/what-we-teach/${item.slug}`}
                    className="wwt-btn-primary"
                    style={{ padding: "10px 20px", fontSize: "13.5px" }}
                  >
                    <span>Explore Practice</span>
                    <span>→</span>
                  </Link>

                  <Link
                    to={`/book-session?program=${encodeURIComponent(item.title)}`}
                    style={{
                      fontFamily: "var(--font-sans, 'Plus Jakarta Sans', sans-serif)",
                      fontSize: "13.5px",
                      fontWeight: 600,
                      color: "var(--site-heading-color, #4F6144)",
                      textDecoration: "none",
                      padding: "10px 16px"
                    }}
                  >
                    Book Session
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CONSULTATION BANNER */}
      <section className="wwt-container" style={{ marginTop: "72px" }}>
        <div className="wwt-cta-banner-box">
          <div className="wwt-eyebrow wwt-eyebrow-light" style={{ justifyContent: "center" }}>
            <span className="wwt-eyebrow-line wwt-eyebrow-line-light"></span>
            <span>PERSONAL GUIDANCE</span>
            <span className="wwt-eyebrow-line wwt-eyebrow-line-light"></span>
          </div>

          <h2 className="wwt-cta-title">
            Not Sure Which Practice <span>Suits You Best?</span>
          </h2>

          <p className="wwt-cta-subtitle">
            Every journey at OJALIS begins with your Breath Signature — a calm personal session to understand your unique breath pattern before beginning any practice.
          </p>

          <div className="wwt-cta-actions-group">
            <Link to="/book-session" className="wwt-btn-gold">
              <span>Book Breath Signature</span>
              <span>→</span>
            </Link>
            <Link to="/contact" className="wwt-btn-outline-white">
              <span>Contact Teachers</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Programs;
