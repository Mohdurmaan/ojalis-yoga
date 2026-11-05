import { useState, useEffect } from "react";
import { useParams, Link, Navigate, useLocation } from "react-router-dom";
import { whatWeTeachData } from "../data/whatWeTeachData";
import { IconLotus } from "../components/Icons";
import PranayamaLanding from "./PranayamaLanding";
import "../what-we-teach.css";

function WhatWeTeachDetail() {
  const { slug } = useParams();
  const location = useLocation();

  // If on /meditation, handle slug as meditation
  const currentSlug = slug || (location.pathname.includes("meditation") ? "meditation" : "pranayama");
  const practice = whatWeTeachData[currentSlug];

  const [selectedStage, setSelectedStage] = useState("All Stages");
  const [openFaqs, setOpenFaqs] = useState({ 0: true, 1: true });

  const toggleFaq = (index) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedStage("All Stages");
    setOpenFaqs({ 0: true, 1: true });
  }, [currentSlug]);

  if (currentSlug === "pranayama") {
    return <PranayamaLanding />;
  }

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
          1. HERO SECTION
          ========================================================================= */}
      <section className="wwt-hero-section">
        <div className="wwt-container">
          <div className="wwt-hero-grid">
            
            {/* Left Column: Heading and Paragraph/Content together in 1 parent div */}
            <div className="wwt-hero-left-col">
              {/* 1. Header / Title Block */}
              <div className="wwt-hero-header-block">
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
              </div>

              {/* 3. Content Block (Paragraph, Best for, Mantra, Actions, Cadence ribbon) */}
              <div className="wwt-hero-content-block">
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
            </div>

            {/* 2. Visual / Image Block (Styled like Image 2: rounded rectangle with floating badge) */}
            <div className="wwt-hero-visual-wrap">
              <div className="wwt-hero-rect-frame">
                <img
                  src={practice.image}
                  alt={practice.title}
                  className="wwt-hero-rect-img"
                  loading="eager"
                />

                <div className="wwt-hero-stat-badge">
                  <div className="wwt-stat-badge-icon">
                    <IconLotus size={24} color="var(--ojalis-gold, #c59b4b)" />
                  </div>
                  <div>
                    <span className="wwt-stat-badge-title">
                      {practice.heroBadgeText || "Classical Yogic Tradition"}
                    </span>
                    <span className="wwt-stat-badge-sub">
                      {practice.subtitle || "Grounding Body, Breath & Spirit"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. SECTION 01: UNDERSTAND THE PRACTICE
          ========================================================================= */}
      <section id="section-understand" className="wwt-sec-understand">
        <div className="wwt-container">
          <div className="wwt-understand-layout">
            {/* Centered Main Content: Title, Narrative, Highlights Card & Quotes */}
            <div className="wwt-understand-main">
              <h2 className="wwt-understand-title">
                {practice.title}
                {practice.simpleWords && (
                  <span className="wwt-understand-title-sub">
                    {" "}- in simple words:{" "}
                    <span className="wwt-italic wwt-accent-text">{practice.simpleWords}</span>
                  </span>
                )}
              </h2>

              <p className="wwt-understand-desc">{practice.leadNarrative}</p>

              {/* Information Highlights Card (Clean, warm, grounded editorial note) */}
              {(practice.recommendedFor || practice.bestFor || practice.whereYouUseIt || practice.whatYouNeed || practice.howItGrowsText || practice.format || practice.targetAudience || practice.howItIsTaught || practice.whatMakesItSpecial) && (
                <div className="wwt-meta-summary-card">
                  {practice.recommendedFor && (
                    <div className="wwt-meta-item">
                      <span className="wwt-meta-label">Recommended for:</span>
                      <span className="wwt-meta-value">{practice.recommendedFor}</span>
                    </div>
                  )}
                  {practice.bestFor && (
                    <div className="wwt-meta-item">
                      <span className="wwt-meta-label">Best for:</span>
                      <span className="wwt-meta-value">{practice.bestFor}</span>
                    </div>
                  )}
                  {practice.whereYouUseIt && (
                    <div className="wwt-meta-item">
                      <span className="wwt-meta-label">Where you use it:</span>
                      <span className="wwt-meta-value">{practice.whereYouUseIt}</span>
                    </div>
                  )}
                  {practice.whatYouNeed && (
                    <div className="wwt-meta-item">
                      <span className="wwt-meta-label">What you need:</span>
                      <span className="wwt-meta-value">{practice.whatYouNeed}</span>
                    </div>
                  )}
                  {practice.howItGrowsText && (
                    <div className="wwt-meta-item">
                      <span className="wwt-meta-label">How it grows:</span>
                      <span className="wwt-meta-value">{practice.howItGrowsText}</span>
                    </div>
                  )}
                  {practice.format && (
                    <div className="wwt-meta-item">
                      <span className="wwt-meta-label">Format:</span>
                      <span className="wwt-meta-value">{practice.format}</span>
                    </div>
                  )}
                  {practice.howItIsTaught && (
                    <div className="wwt-meta-item">
                      <span className="wwt-meta-label">How it is taught:</span>
                      <span className="wwt-meta-value">{practice.howItIsTaught}</span>
                    </div>
                  )}
                  {practice.targetAudience && (
                    <div className="wwt-meta-item">
                      <span className="wwt-meta-label">Ideal For:</span>
                      <span className="wwt-meta-value">{practice.targetAudience}</span>
                    </div>
                  )}
                  {practice.whatMakesItSpecial && (
                    <div className="wwt-meta-item">
                      <span className="wwt-meta-label">What makes it special:</span>
                      {Array.isArray(practice.whatMakesItSpecial) ? (
                        <ul className="wwt-meta-list">
                          {practice.whatMakesItSpecial.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="wwt-meta-value">{practice.whatMakesItSpecial}</span>
                      )}
                    </div>
                  )}
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
          4. SECTION 03: CONTENT / ARTICLE LAYOUT OR STANDARD SYLLABUS TABLE
          ========================================================================= */}
      {practice.hasCustomArticle ? (
        <>
          {/* 1. In-depth Narrative Article Sections (3 to 4 Headings with Paragraphs) */}
          {practice.contentSections && practice.contentSections.length > 0 && (
            <section className="wwt-sec-article-content">
              <div className="wwt-container">
                <div className="wwt-article-layout">
                  <h2 className="wwt-section-title">
                    Understanding Pranayama: The Art of Breath Mastery
                  </h2>

                  <p className="wwt-section-desc">
                    Explore the classical philosophy, physiology, and individual approach that define authentic yogic breathwork.
                  </p>

                  <div className="wwt-article-blocks-list">
                    {practice.contentSections.map((sec, idx) => (
                      <article key={sec.id || idx} className="wwt-article-block">
                        <h3 className="wwt-article-heading">{sec.heading}</h3>
                        {sec.paragraphs.map((p, pIdx) => (
                          <p key={pIdx} className="wwt-article-paragraph">
                            {p}
                          </p>
                        ))}
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 2. Key Benefits Section */}
          {practice.benefits && practice.benefits.length > 0 && (
            <section className="wwt-sec-benefits">
              <div className="wwt-container">
                <div className="wwt-benefits-layout">
                  <h2 className="wwt-section-title">
                    Key Benefits of Authentic Pranayama
                  </h2>

                  <p className="wwt-section-desc">
                    When practiced with precise alignment and patient progression, conscious breathwork transforms physical vitality and mental poise from within.
                  </p>

                  <ul className="wwt-benefits-list">
                    {practice.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="wwt-benefit-list-item">
                        <div className="wwt-benefit-list-marker" aria-hidden="true">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <div className="wwt-benefit-list-body">
                          <h3 className="wwt-benefit-list-title">{benefit.title}</h3>
                          <p className="wwt-benefit-list-desc">{benefit.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* 3. Frequently Asked Questions (FAQ Accordion matching reference) */}
          {practice.faqs && practice.faqs.length > 0 && (
            <section className="wwt-sec-faq">
              <div className="wwt-container">
                <div className="wwt-faq-layout">
                  <h2 className="wwt-section-title">
                    Frequently Asked Questions
                  </h2>

                  <p className="wwt-section-desc">
                    Clear answers to common questions about beginning, practicing, and benefiting from classical Pranayama.
                  </p>

                  <div className="wwt-faq-list">
                    {practice.faqs.map((faq, fIdx) => {
                      const isOpen = !!openFaqs[fIdx];
                      return (
                        <div
                          key={fIdx}
                          className={`wwt-faq-item ${isOpen ? "open" : ""}`}
                        >
                          <button
                            type="button"
                            className="wwt-faq-question-btn"
                            onClick={() => toggleFaq(fIdx)}
                            aria-expanded={isOpen}
                          >
                            <span className="wwt-faq-question-text">
                              {faq.question}
                            </span>
                            <span className="wwt-faq-chevron" aria-hidden="true">
                              {isOpen ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="18 15 12 9 6 15"></polyline>
                                </svg>
                              ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                              )}
                            </span>
                          </button>

                          {isOpen && (
                            <div className="wwt-faq-active-bar" aria-hidden="true"></div>
                          )}

                          {isOpen && (
                            <div className="wwt-faq-answer">
                              <p className="wwt-faq-answer-text">
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Action button to book a session */}
                  <div className="wwt-table-cta-wrap" style={{ marginTop: "44px" }}>
                    <Link
                      to={`/book-session?program=${encodeURIComponent(practice.title)}`}
                      className="wwt-btn-primary"
                      id={`custom-book-btn-${practice.slug}`}
                    >
                      <span>Book a Session in {practice.title}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        /* Standard techniques table for other pages */
        practice.techniques && practice.techniques.length > 0 && (
          <section className="wwt-sec-learning-path">
            <div className="wwt-container">
              <div className="wwt-curriculum-layout">
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

                {/* Clean, Normal Syllabus Table */}
                <div className="wwt-table-card">
                  <div
                    className="wwt-table-header-row"
                    style={practice.tableHideFeeling ? { gridTemplateColumns: "70px 1.4fr 2.6fr" } : { gridTemplateColumns: "60px 1.4fr 2fr 1.2fr" }}
                  >
                    <span className="wwt-col-no">{practice.tableHeaderNo || "NO."}</span>
                    <span className="wwt-col-technique">{practice.tableHeaderTechnique || "TECHNIQUE"}</span>
                    <span className="wwt-col-words">{practice.tableHeaderWords || "IN SIMPLE WORDS"}</span>
                    {!practice.tableHideFeeling && (
                      <span className="wwt-col-feeling">{practice.tableHeaderFeeling || "THE FEELING"}</span>
                    )}
                  </div>

                  {filteredTechniques.map((tech, index) => (
                    <div
                      key={tech.no || index}
                      className="wwt-table-item-row"
                      style={practice.tableHideFeeling ? { gridTemplateColumns: "70px 1.4fr 2.6fr" } : { gridTemplateColumns: "60px 1.4fr 2fr 1.2fr" }}
                    >
                      <span className="wwt-col-no">{tech.no}</span>
                      <span className="wwt-col-technique">
                        <span className="wwt-tech-name">{tech.name}</span>
                        {tech.stage && (
                          <span className="wwt-tech-stage">{tech.stage}</span>
                        )}
                      </span>
                      <span className="wwt-col-words">
                        <span>{tech.words}</span>
                        {tech.details && tech.details !== tech.words && !tech.details.startsWith(tech.name) && (
                          <span className="wwt-tech-subdetail">{tech.details}</span>
                        )}
                      </span>
                      {!practice.tableHideFeeling && (
                        <span className="wwt-col-feeling">{tech.feeling}</span>
                      )}
                    </div>
                  ))}
                </div>

                {practice.whatYouTakeHome && (
                  <div className="wwt-takehome-card">
                    <span className="wwt-takehome-label">What you take home</span>
                    <p className="wwt-takehome-text">"{practice.whatYouTakeHome}"</p>
                  </div>
                )}

                {practice.advancedPostures && (
                  <div className="wwt-takehome-card" style={{ marginTop: "18px" }}>
                    <span className="wwt-takehome-label">Advanced postures on request</span>
                    <p className="wwt-takehome-text">{practice.advancedPostures}</p>
                  </div>
                )}

                {practice.medicalNote && (
                  <div className="wwt-takehome-card wwt-medical-note-card" style={{ marginTop: "18px" }}>
                    <span className="wwt-takehome-label">Medical Note</span>
                    <p className="wwt-takehome-text">{practice.medicalNote}</p>
                  </div>
                )}

                {/* Action button to book a session */}
                <div className="wwt-table-cta-wrap">
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
            </div>
          </section>
        )
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
