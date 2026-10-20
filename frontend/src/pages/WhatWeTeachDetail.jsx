import { useState, useEffect } from "react";
import { useParams, Link, Navigate, useLocation } from "react-router-dom";
import { whatWeTeachData } from "../data/whatWeTeachData";
import "../what-we-teach.css";

function WhatWeTeachDetail() {
  const { slug } = useParams();
  const location = useLocation();

  // If on /meditation, handle slug as meditation
  const currentSlug = slug || (location.pathname.includes("meditation") ? "meditation" : "pranayama");
  const practice = whatWeTeachData[currentSlug];

  const [selectedStage, setSelectedStage] = useState("All Stages");
  const [expandedRow, setExpandedRow] = useState(null);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedStage("All Stages");
    setExpandedRow(null);
  }, [currentSlug]);

  if (!practice) {
    return <Navigate to="/what-we-teach" replace />;
  }

  // Filter techniques based on selected stage
  const filteredTechniques = practice.techniques?.filter((tech) => {
    if (selectedStage === "All Stages") return true;
    return tech.stage?.toLowerCase() === selectedStage.toLowerCase();
  }) || [];

  // Get other offerings for the bottom exploration bar
  const otherOfferings = Object.values(whatWeTeachData)
    .filter((item) => item.slug !== currentSlug)
    .slice(0, 4);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleScrollToExplore = (e) => {
    e.preventDefault();
    const target = document.getElementById("section-understand");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="wwt-page">
      {/* =========================================================================
          1. HERO SECTION (Matching Reference: web-layout-16)
          ========================================================================= */}
      <section className="wwt-hero-section">
        <div className="wwt-container">
          <div className="wwt-hero-grid">
            {/* Left Column: Heading, Subtitle, Om Mantra & Actions */}
            <div>
              <div className="wwt-eyebrow">
                <span className="wwt-eyebrow-line"></span>
                <span>{practice.tag || "THE PRACTICE OF BREATH"}</span>
              </div>

              {practice.cadenceIntroNote && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 18px", borderRadius: "12px", background: "rgba(79, 97, 68, 0.08)", border: "1px solid rgba(79, 97, 68, 0.18)", marginBottom: "16px", maxWidth: "600px" }}>
                  <span style={{ fontSize: "13px", color: "var(--site-heading-color, #4F6144)", fontStyle: "italic", lineHeight: 1.5 }}>
                    {practice.cadenceIntroNote}
                  </span>
                </div>
              )}

              <h1 className="wwt-hero-title">
                {practice.headline?.replace(practice.headlineItalic || "", "") || practice.title}
                {practice.headlineItalic && (
                  <span className="wwt-italic wwt-forest-text">
                    {" "}{practice.headlineItalic}
                  </span>
                )}
              </h1>

              <p className="wwt-hero-lead">{practice.lead}</p>

              {practice.bestFor && (
                <div className="wwt-best-for-pill">
                  <span className="wwt-best-for-label">Best for:</span>
                  <span className="wwt-best-for-text">{practice.bestFor}</span>
                </div>
              )}

              {practice.mantraText && (
                <div className="wwt-hero-mantra-box">
                  <div className="wwt-om-symbol" aria-hidden="true">ॐ</div>
                  <div className="wwt-mantra-text">
                    "{practice.mantraText}"
                  </div>
                </div>
              )}

              <div className="wwt-hero-actions">
                <Link
                  to={`/book-session?program=${encodeURIComponent(practice.title)}`}
                  className="wwt-btn-primary"
                  id={`hero-book-btn-${practice.slug}`}
                >
                  <span>Book a Session</span>
                  <span>→</span>
                </Link>

                <a
                  href="#section-understand"
                  onClick={handleScrollToExplore}
                  className="wwt-scroll-explore"
                >
                  <span>Scroll to explore</span>
                  <span>↓</span>
                </a>
              </div>

              {/* Cadence Specific Ribbon if Cadence */}
              {practice.cadenceMeta && (
                <div className="wwt-cadence-ribbon">
                  {practice.cadenceMeta.length && (
                    <div className="wwt-cadence-meta-item">
                      <span className="wwt-cadence-meta-label">Length</span>
                      <span className="wwt-cadence-meta-val">{practice.cadenceMeta.length}</span>
                    </div>
                  )}
                  {practice.cadenceMeta.classes && (
                    <div className="wwt-cadence-meta-item">
                      <span className="wwt-cadence-meta-label">Classes</span>
                      <span className="wwt-cadence-meta-val">{practice.cadenceMeta.classes}</span>
                    </div>
                  )}
                  {practice.cadenceMeta.format && (
                    <div className="wwt-cadence-meta-item">
                      <span className="wwt-cadence-meta-label">Format</span>
                      <span className="wwt-cadence-meta-val">{practice.cadenceMeta.format}</span>
                    </div>
                  )}
                  {practice.cadenceMeta.homePractice && (
                    <div className="wwt-cadence-meta-item">
                      <span className="wwt-cadence-meta-label">Home Practice</span>
                      <span className="wwt-cadence-meta-val">{practice.cadenceMeta.homePractice}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Arched Image with Floating Pill & Circular Badges */}
            <div className="wwt-hero-visual-wrap">
              <div className="wwt-hero-arch-frame">
                <img
                  src={practice.image}
                  alt={practice.title}
                  className="wwt-hero-arch-img"
                  loading="eager"
                />
              </div>

              {/* Floating Pill Badge (Top Right) */}
              <div className="wwt-badge-floating-pill">
                <span className="wwt-badge-dot"></span>
                <span>{practice.heroBadgeText || "BREATHE WITH AWARENESS"}</span>
              </div>

              {/* Floating Circular Badge (Bottom Left) */}
              <div className="wwt-badge-floating-circle">
                <span className="wwt-circle-tag">
                  {practice.heroCircleTag || "INHALE"}
                </span>
                <span className="wwt-circle-main">
                  {practice.heroCircleWord || "slowly"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. SECTION 01: UNDERSTAND THE PRACTICE (Matching Reference: web-layout-16)
          ========================================================================= */}
      <section id="section-understand" className="wwt-sec-understand">
        <div className="wwt-container">
          <div className="wwt-understand-layout">
            {/* Left Column: Eyebrow + Gold Accent Line (Just like reference web-layout-16) */}
            <div className="wwt-understand-sidebar">
              <div className="wwt-eyebrow">
                <span>01 / UNDERSTAND THE PRACTICE</span>
              </div>
              <div className="wwt-understand-accent-line"></div>
            </div>

            {/* Right Column: Title, Narrative, Cards Grid & Pullquote */}
            <div className="wwt-understand-main">
              <h2 className="wwt-understand-title">
                {practice.title} - in simple words:{" "}
                <span className="wwt-italic wwt-accent-text">
                  {practice.simpleWords}
                </span>
              </h2>

              <p className="wwt-understand-desc">{practice.leadNarrative}</p>

              {practice.whereYouUseIt && (
                <div className="wwt-where-use-box">
                  <strong className="wwt-where-use-label">Where you use it:</strong>
                  <span className="wwt-where-use-text">{practice.whereYouUseIt}</span>
                </div>
              )}

              {practice.bestFor && (
                <div className="wwt-where-use-box" style={{ marginTop: "12px" }}>
                  <strong className="wwt-where-use-label">Best for:</strong>
                  <span className="wwt-where-use-text">{practice.bestFor}</span>
                </div>
              )}

              {practice.whatYouNeed && (
                <div className="wwt-where-use-box" style={{ marginTop: "12px" }}>
                  <strong className="wwt-where-use-label">What you need:</strong>
                  <span className="wwt-where-use-text">{practice.whatYouNeed}</span>
                </div>
              )}

              {practice.howItGrowsText && (
                <div className="wwt-where-use-box" style={{ marginTop: "12px" }}>
                  <strong className="wwt-where-use-label">How it grows:</strong>
                  <span className="wwt-where-use-text">{practice.howItGrowsText}</span>
                </div>
              )}

              {practice.whatMakesItSpecial && (
                <div className="wwt-where-use-box" style={{ marginTop: "12px" }}>
                  <strong className="wwt-where-use-label">What makes it special:</strong>
                  {Array.isArray(practice.whatMakesItSpecial) ? (
                    <ul style={{ margin: "6px 0 0 0", paddingLeft: "18px", color: "var(--ojalis-text-muted)" }}>
                      {practice.whatMakesItSpecial.map((item, i) => (
                        <li key={i} style={{ marginBottom: "4px" }}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="wwt-where-use-text">{practice.whatMakesItSpecial}</span>
                  )}
                </div>
              )}

              {practice.howItIsTaught && (
                <div className="wwt-where-use-box" style={{ marginTop: "12px" }}>
                  <strong className="wwt-where-use-label">How it is taught:</strong>
                  <span className="wwt-where-use-text">{practice.howItIsTaught}</span>
                </div>
              )}

              {practice.format && (
                <div className="wwt-where-use-box" style={{ marginTop: "12px" }}>
                  <strong className="wwt-where-use-label">Format:</strong>
                  <span className="wwt-where-use-text">{practice.format}</span>
                </div>
              )}

              {practice.recommendedFor && (
                <div className="wwt-where-use-box" style={{ marginTop: "12px" }}>
                  <strong className="wwt-where-use-label">Recommended for:</strong>
                  <span className="wwt-where-use-text">{practice.recommendedFor}</span>
                </div>
              )}

              {practice.targetAudience && (
                <div className="wwt-where-use-box" style={{ marginTop: "12px" }}>
                  <strong className="wwt-where-use-label">Ideal For:</strong>
                  <span className="wwt-where-use-text">{practice.targetAudience}</span>
                </div>
              )}

              {/* Definition / Etymology Cards in Horizontal 2-Column Grid */}
              {practice.etymologyCards && practice.etymologyCards.length > 0 && (
                <div className="wwt-definition-cards-grid">
                  {practice.etymologyCards.map((card, idx) => (
                    <div key={idx} className="wwt-definition-card">
                      <div
                        className="wwt-def-word"
                        style={{ color: card.color || "var(--site-heading-accent-color, #C59B4B)" }}
                      >
                        {card.word}
                      </div>
                      <div className="wwt-def-meaning">{card.meaning}</div>
                    </div>
                  ))}
                </div>
              )}

              {practice.pullQuote && (
                <div className="wwt-pullquote-callout">
                  "{practice.pullQuote}"
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SECTION 02: OUR APPROACH / THE BREATH SIGNATURE (DEEP GREEN)
          ========================================================================= */}
      {practice.approachSteps && practice.approachSteps.length > 0 && (
        <section className="wwt-sec-approach">
        <div className="wwt-container">
          <div className="wwt-approach-box">
            {/* Concentric Decorative Rings */}
            <div className="wwt-approach-ring wwt-approach-ring-1" aria-hidden="true"></div>
            <div className="wwt-approach-ring wwt-approach-ring-2" aria-hidden="true"></div>

            <div className="wwt-approach-grid">
              {/* Left Column: Image with Round Badge */}
              <div className="wwt-approach-visual">
                <div className="wwt-approach-img-frame">
                  <img
                    src={practice.image}
                    alt={`${practice.title} practice immersion`}
                    className="wwt-approach-img"
                  />
                </div>
                <div className="wwt-approach-badge-circle">
                  <span className="wwt-circle-tag">ONE BREATH</span>
                  <span className="wwt-circle-main">at a time</span>
                </div>
              </div>

              {/* Right Column: Philosophy & 3 Step Progression */}
              <div>
                <div className="wwt-eyebrow wwt-eyebrow-light">
                  <span className="wwt-eyebrow-line wwt-eyebrow-line-light"></span>
                  <span>02 / OUR APPROACH</span>
                </div>

                <h2 className="wwt-approach-heading">
                  The OJALIS{" "}
                  <span className="wwt-italic" style={{ color: "#DFBD74" }}>
                    Breath Signature.
                  </span>
                </h2>

                <p className="wwt-approach-desc">{practice.approachSubtitle}</p>

                <div className="wwt-steps-list">
                  {practice.approachSteps?.map((step) => (
                    <div key={step.num} className="wwt-step-item">
                      <div className="wwt-step-num">{step.num}</div>
                      <div>
                        <h4 className="wwt-step-title">{step.title}</h4>
                        <p className="wwt-step-text">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* =========================================================================
          4. SECTION 03: THE LEARNING PATH (INTERACTIVE TABLE)
          ========================================================================= */}
      {practice.techniques && practice.techniques.length > 0 && (
        <section className="wwt-sec-learning-path">
          <div className="wwt-container">
            <div className="wwt-eyebrow">
              <span className="wwt-eyebrow-line"></span>
              <span>{practice.learningPathEyebrow || "03 / THE LEARNING PATH"}</span>
            </div>

            <h2 className="wwt-section-title">
              {practice.learningPathTitle || "A practice that unfolds slowly."}
            </h2>

            <p className="wwt-section-desc">
              {practice.learningPathSubtitle || "These are the breath practices we explore together. There is no rush to master them all - each one has its own season."}
            </p>

            {/* Stage Filter Buttons */}
            {practice.stages && practice.stages.length > 1 && (
              <div className="wwt-filter-pills-row">
                {practice.stages.map((stage) => (
                  <button
                    key={stage}
                    className={`wwt-filter-pill ${selectedStage === stage ? "active" : ""}`}
                    onClick={() => setSelectedStage(stage)}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            )}

            {/* Interactive Technique Table */}
            <div className="wwt-table-card">
              <div
                className="wwt-table-header-row"
                style={practice.tableHideFeeling ? { gridTemplateColumns: "70px 1.5fr 2.5fr 44px" } : {}}
              >
                <span className="wwt-col-no">{practice.tableHeaderNo || "NO."}</span>
                <span className="wwt-col-technique">{practice.tableHeaderTechnique || "TECHNIQUE"}</span>
                <span className="wwt-col-words">{practice.tableHeaderWords || "IN SIMPLE WORDS"}</span>
                {!practice.tableHideFeeling && (
                  <span className="wwt-col-feeling">{practice.tableHeaderFeeling || "THE FEELING"}</span>
                )}
                <span className="wwt-col-toggle"></span>
              </div>

              {filteredTechniques.map((tech, index) => {
                const isExpanded = expandedRow === index;
                return (
                  <div key={tech.no || index}>
                    <div
                      className={`wwt-table-item-row ${isExpanded ? "expanded" : ""}`}
                      style={practice.tableHideFeeling ? { gridTemplateColumns: "70px 1.5fr 2.5fr 44px" } : {}}
                      onClick={() => toggleRow(index)}
                      tabIndex={0}
                      role="button"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleRow(index);
                        }
                      }}
                      aria-expanded={isExpanded}
                    >
                      <span className="wwt-col-no">{tech.no}</span>
                      <span className="wwt-col-technique">
                        {tech.name}
                        {tech.stage && (
                          <span style={{ display: "block", fontSize: "11px", color: "var(--ojalis-gold-dark, #9B7328)", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginTop: "4px" }}>
                            {tech.stage}
                          </span>
                        )}
                      </span>
                      <span className="wwt-col-words">{tech.words}</span>
                      {!practice.tableHideFeeling && (
                        <span className="wwt-col-feeling">{tech.feeling}</span>
                      )}
                      <span className="wwt-col-toggle">
                        <span style={{ fontSize: "11px", color: "var(--ojalis-gold-dark)", transform: isExpanded ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform 0.2s" }}>
                          ▼
                        </span>
                      </span>
                    </div>

                    {isExpanded && tech.details && (
                      <div className="wwt-table-item-details">
                        <p className="wwt-table-item-details-text">
                          {tech.details}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {practice.advancedPostures && (
              <div className="wwt-pullquote-callout" style={{ marginTop: "24px" }}>
                <strong style={{ display: "block", marginBottom: "4px", fontStyle: "normal", color: "var(--site-heading-color, #4F6144)", textTransform: "uppercase", fontSize: "12px", letterSpacing: "1px" }}>Advanced postures on request:</strong>
                <span>{practice.advancedPostures}</span>
              </div>
            )}

            {practice.whatYouTakeHome && (
              <div className="wwt-pullquote-callout" style={{ marginTop: "24px" }}>
                <strong style={{ display: "block", marginBottom: "4px", fontStyle: "normal", color: "var(--site-heading-color, #4F6144)", textTransform: "uppercase", fontSize: "12px", letterSpacing: "1px" }}>What you take home:</strong>
                <span>{practice.whatYouTakeHome}</span>
              </div>
            )}

            {practice.medicalNote && (
              <div className="wwt-where-use-box" style={{ marginTop: "24px", borderLeft: "3px solid var(--ojalis-gold, #C59B4B)" }}>
                <strong className="wwt-where-use-label">Medical Note:</strong>
                <span className="wwt-where-use-text">{practice.medicalNote}</span>
              </div>
            )}

            {/* Action button to book a session */}
            <div style={{ marginTop: "36px", display: "flex", justifyContent: "center" }}>
              <Link
                to={`/book-session?program=${encodeURIComponent(practice.title)}`}
                className="wwt-btn-primary"
                id={`table-book-btn-${practice.slug}`}
              >
                <span>Book a Session</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          5. SECTION 04: HOW IT GROWS (TIMELINE PROGRESSION)
          ========================================================================= */}
      {practice.howItGrows && (
        <section className="wwt-sec-how-it-grows">
          <div className="wwt-container">
            <div className="wwt-growth-grid wwt-grows-grid">
              {/* Left Column: Heading & Description */}
              <div>
                <div className="wwt-eyebrow">
                  <span className="wwt-eyebrow-line"></span>
                  <span>04 / HOW IT GROWS</span>
                </div>

                <h2 className="wwt-section-title">
                  {practice.howItGrows.title}
                </h2>

                <p className="wwt-section-desc">
                  {practice.howItGrows.desc}
                </p>

                <div style={{ marginTop: "32px" }}>
                  <Link
                    to={`/book-session?program=${encodeURIComponent(practice.title)}`}
                    className="wwt-btn-primary"
                  >
                    <span>Begin your foundation</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: 3 Timeline Steps */}
              <div className="wwt-timeline-list">
                <div className="wwt-timeline-track" aria-hidden="true"></div>

                {practice.howItGrows.nodes.map((node, idx) => (
                  <div
                    key={node.num}
                    className={`wwt-timeline-item ${idx === 0 ? "active" : ""}`}
                  >
                    <div className="wwt-timeline-node">{node.num}</div>
                    <div>
                      <h4 className="wwt-timeline-title">{node.title}</h4>
                      <p className="wwt-timeline-text">{node.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          6. SECTION 05: A PRACTICE FOR LIFE (4 AUDIENCE CARDS)
          ========================================================================= */}
      {practice.lifeCards && practice.lifeCards.length > 0 && (
        <section className="wwt-sec-for-life">
          <div className="wwt-container">
            <div className="text-center" style={{ maxWidth: "680px", margin: "0 auto" }}>
              <div className="wwt-eyebrow" style={{ justifyContent: "center" }}>
                <span className="wwt-eyebrow-line"></span>
                <span>05 / A PRACTICE FOR LIFE</span>
                <span className="wwt-eyebrow-line"></span>
              </div>

              <h2 className="wwt-section-title">
                Who this practice <span>is for.</span>
              </h2>

              <p className="wwt-section-desc" style={{ margin: "0 auto" }}>
                Breath work meets you wherever you are in life. We shape the pace to support your daily rhythm.
              </p>
            </div>

            <div className="wwt-cards-4-grid">
              {practice.lifeCards.map((card) => (
                <div key={card.num} className="wwt-life-card">
                  <div className="wwt-card-num">{card.num}</div>
                  <h3 className="wwt-card-title">{card.title}</h3>
                  <p className="wwt-card-desc">{card.desc}</p>
                  <div className="wwt-card-arrow">→</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          7. SECTION 06: THE GUIDE (TEACHER PROFILE)
          ========================================================================= */}
      {practice.guide && (
        <section className="wwt-sec-guide">
          <div className="wwt-container">
            <div className="wwt-guide-grid">
              {/* Left Column: Teacher Arched Photo with Floating Badge */}
              <div className="wwt-guide-arch-visual">
                <div className="wwt-guide-arch-frame">
                  <img
                    src={practice.guide.image || "/new_instructor.png"}
                    alt={practice.guide.name}
                    className="wwt-guide-img"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                </div>

                <div className="wwt-guide-floating-badge">
                  <span className="wwt-guide-badge-tag">{practice.guide.tagline || "CLASSICAL YOGA Rooted in tradition"}</span>
                </div>
              </div>

              {/* Right Column: Teacher Bio & Lineage */}
              <div>
                <div className="wwt-eyebrow">
                  <span className="wwt-eyebrow-line"></span>
                  <span>06 / THE GUIDE</span>
                </div>

                <h2 className="wwt-guide-name">{practice.guide.name}</h2>

                {practice.guide.quote && (
                  <div className="wwt-guide-quote">
                    {practice.guide.quote.startsWith("“") || practice.guide.quote.startsWith('"')
                      ? practice.guide.quote
                      : `"${practice.guide.quote}"`}
                  </div>
                )}

                <p className="wwt-guide-bio">{practice.guide.bio}</p>

                <div className="wwt-guide-badges-row">
                  {practice.guide.badges?.map((badge, idx) => (
                    <span key={idx} className="wwt-guide-pill-badge">
                      {badge}
                    </span>
                  ))}
                </div>

                <div style={{ marginTop: "32px" }}>
                  <Link
                    to={`/book-session?program=${encodeURIComponent(practice.title)}`}
                    className="wwt-btn-primary"
                  >
                    <span>Practice with {practice.guide.name}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          8. SECTION 07: BEGIN HERE (SANCTUARY BOOKING BANNER)
          ========================================================================= */}
      {!practice.hideCtaBanner && (
        <section className="wwt-sec-cta-banner">
          <div className="wwt-container">
            <div className="wwt-cta-banner-box">
              <div className="wwt-eyebrow wwt-eyebrow-light" style={{ justifyContent: "center" }}>
                <span className="wwt-eyebrow-line wwt-eyebrow-line-light"></span>
                <span>BEGIN YOUR PRACTICE</span>
                <span className="wwt-eyebrow-line wwt-eyebrow-line-light"></span>
              </div>

              <h2 className="wwt-cta-title">
                Ready to begin your journey in <span>{practice.title}?</span>
              </h2>

              <p className="wwt-cta-subtitle">
                {practice.lead || "Every practice at OJALIS starts with your Breath Signature - a personal assessment of your current breath pattern."}
              </p>

              <div className="wwt-cta-actions-group">
                <Link
                  to={`/book-session?program=${encodeURIComponent(practice.title)}`}
                  className="wwt-btn-gold"
                >
                  <span>Book a Session</span>
                  <span>→</span>
                </Link>

                <Link
                  to="/what-we-teach"
                  className="wwt-btn-outline-white"
                >
                  <span>View All Teachings</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          9. EXPLORE OTHER PRACTICES
          ========================================================================= */}
      {!practice.hideOtherOfferings && otherOfferings.length > 0 && (
        <section className="wwt-sec-other-offerings">
          <div className="wwt-container">
            <div className="text-center" style={{ maxWidth: "600px", margin: "0 auto 36px" }}>
              <div className="wwt-eyebrow" style={{ justifyContent: "center" }}>
                <span className="wwt-eyebrow-line"></span>
                <span>CONTINUOUS JOURNEY</span>
                <span className="wwt-eyebrow-line"></span>
              </div>
              <h3 className="wwt-section-title" style={{ fontSize: "clamp(24px, 2.6vw, 34px)" }}>
                Explore other <span>teachings &amp; cadences</span>
              </h3>
            </div>

            <div className="wwt-other-grid">
              {otherOfferings.map((item) => (
                <Link
                  key={item.slug}
                  to={`/what-we-teach/${item.slug}`}
                  className="wwt-other-card"
                >
                  {item.image && (
                    <div className="wwt-other-card-img-wrap">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="wwt-other-card-img"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="wwt-other-card-body">
                    <span className="wwt-other-tag">{item.tag || "PRACTICE"}</span>
                    <h4 className="wwt-other-title">{item.title}</h4>
                    <p className="wwt-other-desc">{item.lead}</p>
                    <div className="wwt-other-link">
                      <span>Explore practice</span>
                      <span className="wwt-other-arrow">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default WhatWeTeachDetail;
