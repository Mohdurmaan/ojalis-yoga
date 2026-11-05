import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pranayama-emergent.css";

const PRACTICES = [
  { name: "Diaphragmatic breathing", desc: "" },
  { name: "Nadi Shodhana", desc: "alternate nostril breathing for balance" },
  { name: "Ujjayi", desc: "a soft, ocean-like breath for focus" },
  { name: "Bhramari", desc: "a soothing humming breath" },
  { name: "Kapalabhati", desc: "an energising, cleansing breath" },
  { name: "Sheetali", desc: "a cooling breath" },
  { name: "Gentle breath retention", desc: "introduced in later stages" },
];

const STEPS = [
  { n: "01", title: "Breath Signature", text: "Your journey begins here — we observe exactly how you breathe." },
  { n: "02", title: "Step by step", text: "Gentle, calming breaths first; stronger techniques when you are ready." },
  { n: "03", title: "In class", text: "Posture and pace watched closely, adapted to your health and comfort." },
  { n: "04", title: "At home", text: "Simple guidance for your own daily practice." },
  { n: "05", title: "As you grow", text: "Your Breath Signature is revisited, so practice grows with you." },
];

const GAINS = [
  "A calmer, clearer mind",
  "Steady energy through the day",
  "Fuller, smoother breathing",
  "Better focus and concentration",
  "A lasting sense of inner balance",
];

const FAQS = [
  {
    q: "Is prior yoga or physical flexibility required to practice Pranayama?",
    a: "No prior yoga experience, physical fitness or flexibility is required. Pranayama is purely breath awareness, and it can be practised comfortably on a mat with cushions or seated upright on a sturdy chair. Every posture is adapted to your body's comfort.",
  },
  {
    q: "What is the best time of day to practice Pranayama?",
    a: "Traditionally, early morning around sunrise is considered ideal, when the air and the mind are fresh and peaceful. But calming practices like gentle belly breathing or slow Nadi Shodhana can also be practised in the evening, before dinner or right before bed.",
  },
  {
    q: "Can I practice Pranayama if I have high blood pressure, asthma, or anxiety?",
    a: "Yes — with a gentle, adapted practice. Your teacher selects soft, calming breaths, avoids strong techniques such as Kapalabhati or long breath retention, and adjusts the pace to how you feel each day. If you live with a medical condition, we also encourage you to keep your doctor informed as your practice grows.",
  },
  {
    q: "How is authentic Pranayama different from simple deep breathing?",
    a: "Simple deep breathing is one useful exercise. Classical pranayama is a complete discipline: the breath is guided in precise patterns of inhalation, exhalation and gentle retention, chosen for how you breathe and built up step by step. Taught this way, a few calm breaths grow into a steady, lasting change in energy, focus and mind.",
  },
  {
    q: "How long does a typical Pranayama session take?",
    a: "A guided session fits comfortably into your day — most of it is practice, with a little time for posture preparation and a short rest afterwards. At home, even ten to fifteen minutes of daily practice is enough to feel a real difference.",
  },
];

export default function PranayamaLanding() {
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
            प्राणायाम
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
                    प्राणायाम · Prānāyāma
                  </span>
                </p>

                <h1 className="em-hero-title">
                  What OJALIS Teaches — <span className="italic-gold">Pranayama</span>
                </h1>

                <p className="em-hero-desc">
                  The art of guiding your breath — the heart of every OJALIS practice.
                </p>

                <div className="em-hero-ctas">
                  <Link
                    data-testid="hero-book-session-button"
                    to="/book-session?program=Pranayama"
                    className="em-btn"
                  >
                    Book a Session in Pranayama
                  </Link>
                </div>
              </div>

              {/* Right Column: Framed Photo + Floating Badge */}
              <div style={{ position: "relative" }}>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85"
                    alt="Pranayama — calm, guided breathing practice at OJALIS"
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
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
                      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
                      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
                    </svg>
                  </span>
                  <span>
                    <span
                      style={{
                        display: "block",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        color: "#4f6144",
                      }}
                    >
                      BREATHE WITH ATTENTION
                    </span>
                    <span style={{ display: "block", fontSize: "14px", color: "#6b6164" }}>
                      The Art of Guiding Your Breath
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
            <p className="em-eyebrow">Classical Definition</p>

            <figure data-testid="sutra-centerpiece-card" className="em-sutra-card">
              <p className="em-sutra-verse">
                तस्मिन् सति श्वासप्रश्वासयोर्गतिविच्छेदः प्राणायामः ॥
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
                “Once a steady posture is established, the regulation of the flow of inhalation and exhalation is pranayama.”
              </blockquote>

              <figcaption className="em-eyebrow" style={{ marginTop: "28px" }}>
                — Patañjali Yoga Sūtra 2.49
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
              Pranayama is the yogic art of guiding the breath. By learning to breathe in a calm, conscious way, you gently guide your energy and your mind.
            </p>
          </div>
        </section>

        {/* =========================================================================
            4. WHAT IT IS (A BRIDGE BETWEEN BODY AND MIND)
            ========================================================================= */}
        <section className="em-sec-what">
          <div className="em-container">
            <div className="em-what-grid">
              <div>
                <p className="em-eyebrow">What It Is</p>
                <h2 className="em-section-heading">
                  A bridge between body and mind
                </h2>

                <p className="em-body-p1">
                  Pranayama is one of the oldest and most important practices of yoga. The word comes from Sanskrit: prana means life energy, the vital force that keeps us alive, and ayama means to extend or to guide. Together, pranayama means learning to guide your life energy through the breath.
                </p>

                <p className="em-body-p2">
                  The breath is special. It happens by itself all day and all night, yet you can also choose to guide it. This makes it a bridge between body and mind. The classical texts say that when the breath moves, the mind moves, and when the breath becomes still, the mind becomes still. Pranayama uses this beautiful connection to bring calm, clarity and steady energy.
                </p>
              </div>

              <div>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85"
                    alt="Practitioner seated in calm, breath-led yoga"
                    className="em-framed-img"
                    style={{ height: "360px" }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: "56px" }}>
              <p className="em-practices-title">
                At OJALIS you may learn:
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
            5. HOW OJALIS GUIDES YOU
            ========================================================================= */}
        <section className="em-sec-guided">
          <div className="em-container">
            <div>
              <p className="em-eyebrow">How OJALIS Guides You</p>
              <h2 className="em-section-heading" style={{ maxWidth: "768px" }}>
                Pranayama is the heart of OJALIS
              </h2>
            </div>

            <div className="em-guided-intro-grid">
              <div>
                <p style={{ color: "#2c2426", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  Your journey begins with the Breath Signature, so your teacher knows exactly how you breathe before choosing any technique. Practices are introduced step by step: gentle, calming breaths first, then stronger techniques once your body and breath are ready for them.
                </p>
              </div>

              <div>
                <p style={{ color: "#6b6164", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  In class, your teacher watches each breath closely, corrects your posture and pace, and adapts every practice to your health and comfort. You also receive simple guidance for home practice, and your Breath Signature is revisited as you grow, so your pranayama always matches the person you are becoming.
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
            6. THE OJALIS PERSPECTIVE (GREEN QUOTE BANNER)
            ========================================================================= */}
        <section data-testid="quote-perspective-banner" className="em-sec-perspective">
          <span aria-hidden="true" className="em-perspective-watermark">
            प्राण
          </span>

          <div className="em-container" style={{ maxWidth: "896px", position: "relative" }}>
            <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
              The OJALIS Perspective
            </p>

            <blockquote className="em-perspective-quote">
              “The breath tells the true story of how a person lives. A hurried life shows up as a hurried breath; a peaceful life shows up as a slow, smooth one.”
            </blockquote>

            <p className="em-perspective-body">
              That is why we begin with the breath. When you learn to guide your breath, you gain a gentle tool that stays with you everywhere – in class, at home, at work and in every challenging moment. Pranayama at OJALIS is taught with patience and precision, honouring the classical tradition while explaining each step in clear, simple language. Our aim is to help you feel the change for yourself, breath by breath, until calm becomes your natural state.
            </p>
          </div>
        </section>

        {/* =========================================================================
            7. WHAT YOU GAIN WITH OJALIS
            ========================================================================= */}
        <section className="em-sec-gains">
          <div className="em-container">
            <div className="em-gains-grid">
              <div>
                <p className="em-eyebrow">What You Gain with OJALIS</p>
                <h2 className="em-section-heading">
                  Quiet changes, felt breath by breath
                </h2>

                <div className="em-who-card">
                  <p className="em-who-tag">Who it is for</p>
                  <p className="em-who-text">
                    <span style={{ fontWeight: 600 }}>Everyone.</span> Pranayama can be adapted for beginners, experienced practitioners, students and elders alike.
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
            8. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)
            ========================================================================= */}
        <section className="em-sec-faq">
          <div className="em-container">
            <div className="em-faq-container">
              <p className="em-eyebrow" style={{ textAlign: "center" }}>
                Before You Begin
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
                प्राणायाम
              </span>

              <div style={{ position: "relative" }}>
                <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
                  Begin Today
                </p>

                <h2 className="em-cta-title">
                  Begin with your Breath Signature
                </h2>

                <p className="em-cta-subtitle">
                  A calm, personal session where we observe how you truly breathe — and every practice grows from there.
                </p>

                <div className="em-cta-btn-wrap">
                  <Link
                    data-testid="final-cta-book-button"
                    to="/book-session?program=Pranayama"
                    className="em-btn em-btn-light"
                  >
                    Book a Session in Pranayama
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
