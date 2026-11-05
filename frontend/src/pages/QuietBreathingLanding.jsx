import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pranayama-emergent.css";

const PRACTICES = [
  { name: "Breath awareness", desc: "rediscovering how you naturally breathe without effort or judgment" },
  { name: "Diaphragmatic (belly) breathing", desc: "restoring deep abdominal respiration to calm the nervous system" },
  { name: "Full yogic breath", desc: "a smooth, three-part breath filling belly, ribs and chest" },
  { name: "Lengthening the exhale", desc: "triggering the parasympathetic 'rest-and-digest' response" },
  { name: "Nadi Shodhana", desc: "gentle alternate nostril breathing for balance and clarity" },
  { name: "Bhramari", desc: "a soothing humming breath that dissolves mental chatter and tension" },
  { name: "Daily life integration", desc: "carrying this calm breath into work, home and stressful moments" },
];

const STEPS = [
  { n: "01", title: "Breath Signature", text: "Your cadence begins with careful observation of your natural breathing pattern and rhythm." },
  { n: "02", title: "Foundations first", text: "Rediscovering belly breathing and the full yogic breath slowly until each feels natural." },
  { n: "03", title: "Gentle refinement", text: "Adding the lengthening exhale, Nadi Shodhana, and soothing Bhramari step by step." },
  { n: "04", title: "Home integration", text: "A realistic 5 to 10 minute daily home practice that fits comfortably into your day." },
  { n: "05", title: "Revisit & expand", text: "Your teacher revisits your Breath Signature as calm breathing becomes your natural default." },
];

const GAINS = [
  "Calm, natural breathing as your everyday default",
  "A strong foundation for all yoga practice",
  "A steadier mind and easier rest",
  "Simple tools for everyday stress",
  "Visible change in your own Breath Signature",
];

const FAQS = [
  {
    q: "Why does OJALIS recommend The Quiet Breathing Cadence as the foundation for almost everyone?",
    a: "Instead of rushing through dozens of advanced techniques, The Quiet Breathing Cadence focuses on learning one calm, full, natural breath deeply and beautifully. This foundational breath steadies the nervous system and becomes the essential ground for all deeper pranayama, Hatha Yoga, and meditation.",
  },
  {
    q: "How long does the cadence typically take to complete?",
    a: "The length is tailored after your initial Breath Signature session, typically spanning 6 to 10 weeks with one guided session per week. This unhurried timeline ensures your body and mind build a lasting, effortless habit rather than a temporary exercise.",
  },
  {
    q: "How much daily practice is expected at home?",
    a: "Your home practice is kept simple and realistic — just 5 to 10 minutes a day. Your teacher gives you clear, gentle cues so you can practice comfortably without feeling overwhelmed.",
  },
  {
    q: "Do I need any previous experience with yoga or breathwork?",
    a: "No prior experience is necessary. The cadence is designed for everyone: complete beginners, busy professionals with high stress, students, and even experienced yoga practitioners who wish to refine their fundamental breath mechanics.",
  },
  {
    q: "Are sessions offered online or in person?",
    a: "Sessions are conducted both in person at our Gurugram sanctuary and online via live, interactive one-to-one or small group video sessions for students across India and worldwide.",
  },
];

export default function QuietBreathingLanding() {
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
            शान्ति
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
                    शान्ति साधना · The Quiet Breathing Cadence
                  </span>
                </p>

                <h1 className="em-hero-title">
                  What OJALIS Teaches — <span className="italic-gold">The Quiet Breathing Cadence</span>
                </h1>

                <p className="em-hero-desc">
                  The foundation — one breath, learned beautifully.
                </p>

                <div className="em-hero-ctas">
                  <Link
                    data-testid="hero-book-session-button"
                    to="/book-session?program=The%20Quiet%20Breathing%20Cadence"
                    className="em-btn"
                  >
                    Book a Session in The Quiet Breathing Cadence
                  </Link>
                </div>
              </div>

              {/* Right Column: Framed Photo + Floating Badge */}
              <div style={{ position: "relative" }}>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85"
                    alt="The Quiet Breathing Cadence — foundation breath practice at OJALIS"
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
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                      <path d="M12 6a6 6 0 0 0-6 6c0 3.3 2.7 6 6 6a6 6 0 0 0 6-6c0-3.3-2.7-6-6-6z" />
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
                      FOUNDATION CADENCE
                    </span>
                    <span style={{ display: "block", fontSize: "14px", color: "#6b6164" }}>
                      One Breath, Learned Beautifully
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
                “When a steady stillness is attained, pranayama is the unhurried regulation of the incoming and outgoing breath.”
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
              The foundation cadence at OJALIS: a guided journey to learn one calm, full, natural breath deeply, so it becomes your everyday way of breathing.
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
                  One calm breath that steadies your whole system
                </h2>

                <div className="em-what-paragraphs">
                  <p>
                    A Cadence is OJALIS’s word for a guided programme with its own rhythm. The Quiet Breathing Cadence is the foundation, recommended for almost everyone who comes to OJALIS. Instead of learning many techniques quickly, you learn one calm breath deeply and beautifully — the kind of breath that steadies your whole system.
                  </p>
                  <p>
                    The journey moves in gentle stages. It begins with simple awareness of how you breathe. Then you rediscover belly breathing, learn the full yogic breath that fills the belly, ribs and chest, and practise lengthening the exhale. Gentle pranayama such as Nadi Shodhana and Bhramari follows. Finally, you learn to carry this calm breath into daily life — at work, at home and in challenging moments.
                  </p>
                  <p style={{ marginTop: "16px" }}>
                    The cadence combines regular sessions with your teacher and a short, easy home practice each day. Its length is set after your Breath Signature, according to how your breathing responds.
                  </p>
                </div>
              </div>

              {/* Right Column: Visual Photo */}
              <div>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=85"
                    alt="Quiet, guided breathing journey at OJALIS"
                    className="em-framed-img"
                    style={{ height: "360px" }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: "56px" }}>
              <p className="em-practices-title">
                The Journey of Practices:
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
                Every step is personal, unhurried and paced for you
              </h2>
            </div>

            <div className="em-guided-intro-grid">
              <div>
                <p style={{ color: "#2c2426", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  Every step is personal. Your teacher follows your progress closely, adjusts the pace to suit you, and revisits your Breath Signature to see how your breathing has changed. Your home practice is kept simple and realistic, so it fits easily into your day.
                </p>
              </div>

              <div>
                <p style={{ color: "#6b6164", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  By the end, the calm breath becomes your natural breath. It also becomes the foundation for every other OJALIS practice — Hatha Yoga, meditation and deeper pranayama.
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
            सहज
          </span>

          <div className="em-container" style={{ maxWidth: "896px", position: "relative" }}>
            <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
              The OJALIS Perspective
            </p>

            <blockquote className="em-perspective-quote">
              “The simplest things, learned deeply, create the greatest change. The breath is with you every moment of your life, so improving it improves everything it touches.”
            </blockquote>

            <p className="em-perspective-body">
              At OJALIS, The Quiet Breathing Cadence comes first because it is unhurried by design. Rather than collecting techniques, you build a true foundation with your teacher beside you. The result is a breath that feels like home — calm, natural and entirely your own. It is the quiet beginning from which every other OJALIS path grows.
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
                  A breath that feels like home
                </h2>

                <div className="em-who-card">
                  <p className="em-who-tag">Who it is for</p>
                  <p className="em-who-text">
                    <span style={{ fontWeight: 600 }}>Almost everyone</span> — beginners, busy professionals, students, and experienced practitioners who want to strengthen their foundation.
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
                शान्ति
              </span>

              <div style={{ position: "relative" }}>
                <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
                  Begin Today
                </p>

                <h2 className="em-cta-title">
                  Begin your journey to a calm, natural everyday breath
                </h2>

                <p className="em-cta-subtitle">
                  Start with your personal Breath Signature — the quiet foundation from which every practice grows.
                </p>

                <div className="em-cta-btn-wrap">
                  <Link
                    data-testid="final-cta-book-button"
                    to="/book-session?program=The%20Quiet%20Breathing%20Cadence"
                    className="em-btn em-btn-light"
                  >
                    Book a Session in The Quiet Breathing Cadence
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

