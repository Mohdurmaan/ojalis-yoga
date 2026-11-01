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
        <div className="wwt-programs-grid">
          {filteredPrograms.map((item) => (
            <div
              key={item.slug}
              className="program-card-item-hover wwt-program-card"
            >
              {/* Card Image Banner */}
              <div className="wwt-program-card-thumb">
                <img
                  src={item.image}
                  alt={item.title}
                  className="wwt-program-card-img"
                  loading="lazy"
                />
                <span className="wwt-program-card-badge">
                  {item.tag || "Foundational Practice"}
                </span>
              </div>

              {/* Card Body */}
              <div className="wwt-program-card-body">
                <h2 className="wwt-program-card-title">
                  {item.title}
                </h2>

                <p className="wwt-program-card-text">
                  {item.lead || item.simpleWords}
                </p>

                {item.bestFor && (
                  <div className="wwt-program-card-bestfor">
                    <strong style={{ color: "var(--site-heading-color, #4F6144)", marginRight: "6px" }}>Best for:</strong>
                    {item.bestFor}
                  </div>
                )}

                {/* Actions */}
                <div className="wwt-program-card-actions">
                  <Link
                    to={`/what-we-teach/${item.slug}`}
                    className="wwt-btn-primary wwt-card-explore-btn"
                  >
                    <span>Explore Practice</span>
                    <span>→</span>
                  </Link>

                  <Link
                    to={`/book-session?program=${encodeURIComponent(item.title)}`}
                    className="wwt-card-book-btn"
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
            Every journey at OJALIS begins with your Breath Signature - a calm personal session to understand your unique breath pattern before beginning any practice.
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
