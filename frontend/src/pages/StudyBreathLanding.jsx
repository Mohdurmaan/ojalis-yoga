import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pranayama-emergent.css";

const PRACTICES = [
  { name: "Calming breath before study", desc: "settling restlessness before opening your books" },
  { name: "Focusing breath (Nadi Shodhana)", desc: "sustaining clear concentration through long study hours" },
  { name: "Settling breath before exams (Bhramari)", desc: "releasing nervous jitters and performance anxiety" },
  { name: "Gentle end-of-day reset", desc: "clearing residual mental fatigue after demanding classes" },
  { name: "Postures for study comfort", desc: "supporting a straight, strain-free back while seated at a desk" },
  { name: "Short concentration meditation", desc: "gathering scattered attention when thoughts begin to drift" },
  { name: "5-minute pre-test routine", desc: "a discreet centering habit right at the examination desk" },
];

const STEPS = [
  { n: "01", title: "Friendly & age-appropriate", text: "Explained in simple, relatable words so students understand why each breath works and enjoy it." },
  { n: "02", title: "Learned in calm", text: "Practiced slowly in relaxed sessions first until each technique feels completely natural." },
  { n: "03", title: "Daily study routines", text: "Gradually brought into real homework routines, revision hours, and exam mornings." },
  { n: "04", title: "Small groups or 1-to-1", text: "Offered in intimate groups of six or personal sessions, in Gurugram and online worldwide." },
  { n: "05", title: "A healthy habit for life", text: "Parents are kept informed, and the practice stays with students long after exams are over." },
];

const GAINS = [
  "Calmer, more confident exam days",
  "Stronger concentration during study",
  "Emotional steadiness through changing moods",
  "Better posture for long study hours",
  "A healthy habit for life",
];

const FAQS = [
  {
    q: "Is The Study Breath suitable for students preparing for Board exams or competitive tests like JEE/NEET?",
    a: "Yes, absolutely. It is especially beneficial during Class 10/12 board exams, college finals, and competitive entrance preparations when pressure and mental fatigue peak. The techniques help clear brain fog and keep anxiety from interfering with what the student has revised.",
  },
  {
    q: "Can these techniques be practiced quietly inside an examination hall without attracting attention?",
    a: "Yes, completely. Practices like the gentle lengthened exhale and softly counted breath are quiet, subtle, and done sitting upright with eyes open. Fellow students and invigilators will simply see a calm, focused, and composed student.",
  },
  {
    q: "How much daily practice is required at home?",
    a: "Just 5 to 10 minutes a day is enough. It is designed to fit naturally into a student's daily routine — for instance, a 3-minute centering breath before opening books, and a 5-minute restorative breath before sleep.",
  },
  {
    q: "How are parents kept informed about what their child is learning?",
    a: "Your teacher regularly updates parents on what is taught in each class. We also share simple guidelines on how parents can help nurture a quiet, supportive study environment at home.",
  },
  {
    q: "Are classes available online if we do not live in Gurugram?",
    a: "Yes. Classes are conducted both in person at our Gurugram studio and live online in one-to-one or small interactive groups for students across India and worldwide.",
  },
];

export default function StudyBreathLanding() {
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  return (
    <div className="em-landing">
      <main>
        {/* =========================================================================
            1. HERO SECTION
            ========================================================================= */}
        <section className="em-hero-section">
          {/* Subtle Ambient Orbs */}
          <div
            aria-hidden="true"
            style={{
              pointerEvents: "none",
              position: "absolute",
              top: "-120px",
              right: 0,
              width: "460px",
              height: "460px",
              borderRadius: "50%",
              backgroundColor: "rgba(197, 155, 75, 0.1)",
              filter: "blur(70px)",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              pointerEvents: "none",
              position: "absolute",
              bottom: "-160px",
              left: "-100px",
              width: "420px",
              height: "420px",
              borderRadius: "50%",
              backgroundColor: "rgba(79, 97, 68, 0.1)",
              filter: "blur(70px)",
            }}
          />

          {/* Sanskrit Watermark */}
          <span aria-hidden="true" className="em-watermark">
            विद्या
          </span>

          <div className="em-container">
            <div className="em-hero-grid">
              {/* Left Column: Headings & CTA */}
              <div>
                <p style={{ display: "flex", alignItems: "center", gap: "16px", margin: 0 }}>
                  <span className="em-rule" />
                  <span
                    className="em-font-deva"
                    style={{ fontSize: "19px", color: "#9b7328", letterSpacing: "0.5px" }}
                  >
                    विद्या साधना · The Study Breath
                  </span>
                </p>

                <h1 className="em-hero-title">
                  What OJALIS Teaches — <span className="italic-gold">The Study Breath</span>
                </h1>

                <p className="em-hero-desc">
                  A steady anchor for students, from Class 6 to college.
                </p>

                <div className="em-hero-ctas">
                  <Link
                    data-testid="hero-book-session-button"
                    to="/book-session?program=The%20Study%20Breath"
                    className="em-btn"
                  >
                    Book a Session in The Study Breath
                  </Link>
                </div>
              </div>

              {/* Right Column: Framed Photo + Floating Badge */}
              <div style={{ position: "relative" }}>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=85"
                    alt="The Study Breath — calm, focused learning for students"
                    className="em-framed-img"
                    loading="eager"
                  />
                </div>

                <div className="em-floating-badge">
                  <span className="em-floating-badge-icon">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  </span>
                  <span>
                    <span
                      style={{
                        display: "block",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        color: "#4f6144",
                      }}
                    >
                      AN ANCHOR FOR STUDENTS
                    </span>
                    <span style={{ display: "block", fontSize: "14px", color: "#6b6164" }}>
                      Class 6 to College & Beyond
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. CLASSICAL DEFINITION (SUTRA CENTERPIECE)
            ========================================================================= */}
        <section id="definition" className="em-sec-definition">
          <div className="em-container" style={{ maxWidth: "896px", textAlign: "center" }}>
            <p className="em-eyebrow">Classical Foundation</p>

            <figure data-testid="sutra-centerpiece-card" className="em-sutra-card">
              <p className="em-sutra-verse">
                चले वाते चलं चित्तं निश्चले निश्चलं भवेत् ।<br />
                योगी स्थाणुत्वमाप्नोति ततो वायुं निरोधयेत् ॥
              </p>

              <span
                style={{
                  marginTop: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                }}
                aria-hidden="true"
              >
                <span className="em-rule" />
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    transform: "rotate(45deg)",
                    backgroundColor: "#c59b4b",
                    display: "inline-block",
                  }}
                />
                <span className="em-rule" />
              </span>

              <blockquote className="em-sutra-quote">
                “When the breath is unsteady, the mind is unsteady. When the breath is still, the mind becomes still, clear, and steady for learning.”
              </blockquote>

              <figcaption className="em-eyebrow" style={{ marginTop: "28px" }}>
                — Haṭha Yoga Pradīpikā 2.2
              </figcaption>
            </figure>
          </div>
        </section>

        {/* =========================================================================
            3. IN SIMPLE WORDS
            ========================================================================= */}
        <section className="em-sec-simple">
          <div className="em-container" style={{ maxWidth: "768px", textAlign: "center" }}>
            <p className="em-eyebrow">In Simple Words</p>

            <p className="em-simple-statement" data-testid="in-simple-words">
              Simple breathing and focus practices that help students stay calm, focused and steady through every year of study.
            </p>
          </div>
        </section>

        {/* =========================================================================
            4. WHAT IT IS (FROM PDF PAGE 1)
            ========================================================================= */}
        <section className="em-sec-what">
          <div className="em-container">
            <div className="em-what-grid">
              {/* Left Column: Text */}
              <div>
                <p className="em-eyebrow">What It Is</p>
                <h2 className="em-section-heading">
                  Meeting the years of growth with steadiness
                </h2>

                <div className="em-what-paragraphs">
                  <p>
                    Student years are years of tremendous growth. The syllabus grows, exams arrive, friendships change, and feelings can arrive faster than words. A mood may shift suddenly, the mind may race before an exam, or concentration may drift during long hours of study. These experiences are a natural part of growing up, and the breath can help students meet them with steadiness.
                  </p>
                  <p>
                    The Study Breath gives students a small set of practices they can carry everywhere: a calming breath before sitting down to study, a focusing breath for long study sessions, a settling breath before an exam or presentation, and a gentle reset at the end of a demanding day. Simple postures for a straight, comfortable back, and short meditation for concentration, complete the practice.
                  </p>
                </div>
              </div>

              {/* Right Column: Visual Photo */}
              <div>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85"
                    alt="Calm, focused study environment"
                    className="em-framed-img"
                    style={{ height: "360px" }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: "56px" }}>
              <p className="em-practices-title">
                At OJALIS students learn:
              </p>

              <ul data-testid="practices-list" className="em-practices-grid">
                {PRACTICES.map((p, i) => (
                  <li key={p.name} className="em-practice-item">
                    <span className="em-practice-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ color: "#2c2426", fontSize: "15.5px" }}>
                      <span style={{ fontWeight: 600 }}>{p.name}</span>
                      {p.desc && <span style={{ color: "#6b6164" }}> — {p.desc}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. HOW OJALIS GUIDES YOU (FROM PDF PAGE 1)
            ========================================================================= */}
        <section className="em-sec-guided">
          <div className="em-container">
            <div>
              <p className="em-eyebrow">How OJALIS Guides You</p>
              <h2 className="em-section-heading" style={{ maxWidth: "768px" }}>
                A friendly, age-appropriate practice that lasts for life
              </h2>
            </div>

            <div className="em-guided-intro-grid">
              <div>
                <p style={{ color: "#2c2426", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  OJALIS teaches The Study Breath in a friendly, age-appropriate way. Your teacher explains in simple words why each practice works, so students understand it and enjoy it. Practices are learned in calm sessions first, then gradually brought into real study routines and exam days.
                </p>
              </div>

              <div>
                <p style={{ color: "#6b6164", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  Classes are offered in small groups or one-to-one, in person in Gurugram and online across India and around the world. Parents are kept informed about what their child is learning, and the practice is designed to become a healthy habit that stays with students long after their exams are over.
                </p>
              </div>
            </div>

            <ol data-testid="guidance-steps-visual" className="em-steps-5-grid">
              {STEPS.map((s) => (
                <li key={s.n} className="em-step-card">
                  <span className="em-step-num">{s.n}</span>
                  <h3 className="em-step-title">{s.title}</h3>
                  <p className="em-step-desc">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* =========================================================================
            6. THE OJALIS PERSPECTIVE (FROM PDF PAGE 2)
            ========================================================================= */}
        <section data-testid="quote-perspective-banner" className="em-sec-perspective">
          <span aria-hidden="true" className="em-perspective-watermark">
            ज्ञान
          </span>

          <div className="em-container" style={{ maxWidth: "896px", position: "relative" }}>
            <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
              The OJALIS Perspective
            </p>

            <blockquote className="em-perspective-quote">
              “Knowledge grows best in a calm mind, and a calm mind can be trained. When a student learns to steady the breath, they learn to steady their attention, their emotions and their confidence.”
            </blockquote>

            <p className="em-perspective-body">
              At OJALIS, we believe students deserve tools for the inner side of learning, alongside books and coaching. We teach these skills gently, with respect for each student’s pace and personality. Our hope is that every student leaves with a simple practice they trust — one that helps them in exams today, and in interviews, careers and life tomorrow.
            </p>
          </div>
        </section>

        {/* =========================================================================
            7. WHAT YOU GAIN WITH OJALIS (FROM PDF PAGE 2)
            ========================================================================= */}
        <section className="em-sec-gains">
          <div className="em-container">
            <div className="em-gains-grid">
              <div>
                <p className="em-eyebrow">What You Gain with OJALIS</p>
                <h2 className="em-section-heading">
                  Tools for the inner side of learning
                </h2>

                <div className="em-who-card">
                  <p className="em-who-tag">Who it is for</p>
                  <p className="em-who-text">
                    <span style={{ fontWeight: 600 }}>Students from Class 6 to their final year of college</span>, and parents who want calm, focused learning for their children.
                  </p>
                </div>
              </div>

              <div>
                <ul data-testid="gains-checkmark-list" className="em-gains-list">
                  {GAINS.map((g) => (
                    <li key={g} className="em-gain-item">
                      <span className="em-gain-check">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="em-gain-text">{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. FREQUENTLY ASKED QUESTIONS
            ========================================================================= */}
        <section className="em-sec-faq">
          <div className="em-container">
            <div className="em-faq-container">
              <p className="em-eyebrow" style={{ textAlign: "center" }}>
                Questions & Answers
              </p>
              <h2 className="em-section-heading" style={{ textAlign: "center" }}>
                Frequently Asked Questions
              </h2>

              <div style={{ marginTop: "40px" }} data-testid="faq-accordion">
                {FAQS.map((f, i) => {
                  const isOpen = activeFaq === i;
                  return (
                    <div key={i} className="em-faq-item">
                      <button
                        type="button"
                        data-testid={`faq-question-${i + 1}`}
                        onClick={() => toggleFaq(i)}
                        className="em-faq-trigger"
                      >
                        <span style={{ paddingRight: "16px" }}>{f.q}</span>
                        <span className={`em-faq-chevron ${isOpen ? "open" : ""}`}>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </span>
                      </button>
                      {isOpen && (
                        <div className="em-faq-answer">
                          {f.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            9. BEGIN TODAY (CTA BAND)
            ========================================================================= */}
        <section className="em-sec-cta-band">
          <div className="em-container">
            <div className="em-cta-box">
              <span aria-hidden="true" className="em-cta-watermark">
                विद्या
              </span>

              <div style={{ position: "relative" }}>
                <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
                  Begin Today
                </p>

                <h2 className="em-cta-title">
                  Give your child a steady anchor for learning and life
                </h2>

                <p className="em-cta-subtitle">
                  A calm, friendly personal session where students learn simple breathing tools they can trust through every exam.
                </p>

                <div className="em-cta-btn-wrap">
                  <Link
                    data-testid="final-cta-book-button"
                    to="/book-session?program=The%20Study%20Breath"
                    className="em-btn em-btn-light"
                  >
                    Book a Session in The Study Breath
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

