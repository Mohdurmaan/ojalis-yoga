import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pranayama-emergent.css";

const PRACTICES = [
  { name: "Eye & facial releases (Netra Vyayama)", desc: "soothing digital eye strain, optic nerve fatigue, and temple tension" },
  { name: "Neck & cervical loosening (Griva Shakti)", desc: "gentle head turns and tilts to ease stiffness in the neck and upper spine" },
  { name: "Shoulder & chest rotations (Skandha)", desc: "opening the rib cage, lubricating rotator cuffs, and correcting rounded posture" },
  { name: "Wrists, elbows & finger articulations", desc: "releasing tightness from mouse work, keyboard typing, and hand gripping" },
  { name: "Waist & trunk movements (Kati Shakti)", desc: "gently warming the lower back, obliques, and awakening the spinal column" },
  { name: "Knee & hip rotations (Janu Vikasaka)", desc: "nourishing cartilage, stimulating synovial fluid, and releasing pelvis tightness" },
  { name: "Ankles & toe flexions (Pada Vikasaka)", desc: "restoring plantar circulation, foot flexibility, and grounded balance" },
];

const STEPS = [
  { n: "01", title: "Opens most classes", text: "Sukshma Vyayama begins our sessions, warming the body and preparing the breath for deeper practice." },
  { n: "02", title: "Adapted for every body", text: "Slower and smaller for elders, playful for children, fuller for regular practitioners." },
  { n: "03", title: "Breath-led movement", text: "Each small motion is paired with an inhale or exhale, teaching breath and body to move as one." },
  { n: "04", title: "Chair-friendly options", text: "Most movements can be done seated upright on a chair, making it accessible with zero floor strain." },
  { n: "05", title: "Desk & home routines", text: "You receive a short 5 to 10-minute routine to practice at your desk or home between classes." },
];

const GAINS = [
  "Freer, more comfortable joints",
  "Warmth and lightness in the whole body",
  "Better circulation and mobility",
  "A gentle, energising start to the day",
  "Greater awareness of body and breath together",
];

const FAQS = [
  {
    q: "Can I practice Sukshma Vyayama if I have severe arthritis, joint pain, or cannot sit on the floor?",
    a: "Yes, absolutely. Sukshma Vyayama is specifically designed to be gentle and non-weight-bearing. There is no jumping, forced stretching, or pressure on knees. Every single movement can be done comfortably sitting in a sturdy chair or standing with wall support.",
  },
  {
    q: "How does Sukshma Vyayama differ from ordinary gym warm-ups or stretching?",
    a: "Gym warm-ups often involve fast, mechanical calisthenics designed to spike the heart rate. Sukshma Vyayama is subtle and breath-led. Each micro-movement is done slowly with full awareness, synchronised with an in-breath or out-breath to stimulate circulation and calm the nervous system simultaneously.",
  },
  {
    q: "Why is each movement joined to an inhalation or exhalation?",
    a: "Moving with the breath transforms simple physical motion into neuro-respiratory training. It prevents muscle clenching, stimulates the parasympathetic nervous system, and cultivates the habit of mindful noticing that sits at the core of your Breath Signature.",
  },
  {
    q: "Can office workers practice these movements during a busy workday?",
    a: "Yes! Sukshma Vyayama is one of the best tools for desk workers. A 5-minute series of neck rolls, wrist rotations, and shoulder circles right at your office chair releases postural fatigue, reverses slouching, and refreshes mental focus.",
  },
  {
    q: "Are sessions offered online or in person?",
    a: "Classes are offered both in person at our Gurugram studio and online via live interactive video, welcoming practitioners of all ages across India and worldwide.",
  },
];

export default function SukshmaVyayamaLanding() {
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
            सूक्ष्म
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
                    सूक्ष्म व्यायाम · Sūkṣma Vyāyāma
                  </span>
                </p>

                <h1 className="em-hero-title">
                  What OJALIS Teaches — <span className="italic-gold">Sukshma Vyayama</span>
                </h1>

                <p className="em-hero-desc">
                  Gentle joint-by-joint movement — a beautiful beginning for every body.
                </p>

                <div className="em-hero-ctas">
                  <Link
                    data-testid="hero-book-session-button"
                    to="/book-session?program=Sukshma%20Vyayama"
                    className="em-btn"
                  >
                    Book a Session in Sukshma Vyayama
                  </Link>
                </div>
              </div>

              {/* Right Column: Framed Photo + Floating Badge */}
              <div style={{ position: "relative" }}>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85"
                    alt="Sukshma Vyayama — gentle joint-by-joint movement at OJALIS"
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
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
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
                      GENTLE JOINT AWAKENING
                    </span>
                    <span style={{ display: "block", fontSize: "14px", color: "#6b6164" }}>
                      A Beautiful Beginning for Every Body
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
                शरीरमाद्यं खलु धर्मसाधनम् ॥
                <br />
                सूक्ष्मव्यायामेन सर्वसन्धिविशोधनं भवति ॥
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
                “The body is the primary instrument of life’s purpose; through subtle, breath-led movement, every joint is purified and set free.”
              </blockquote>

              <figcaption className="em-eyebrow" style={{ marginTop: "28px" }}>
                — Traditional Yogic & Ayurvedic Wisdom
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
              Sukshma Vyayama is a series of gentle movements for every joint of the body, from the eyes to the toes, each one joined to the breath.
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
                  Loosening and awakening each joint from head to toe
                </h2>

                <p className="em-body-p1">
                  Sukshma means subtle or fine, and vyayama means exercise. Sukshma Vyayama is a traditional Indian system of gentle movements that loosen and awaken each joint of the body. It moves from head to toe: eyes, neck, shoulders, elbows, wrists, fingers, waist, hips, knees, ankles and toes.
                </p>
                <p className="em-body-p2">
                  Each movement is small, slow and easy, and each one is joined to an inhale or an exhale. This simple practice warms the body, improves circulation, and gently increases the natural range of movement in the joints. It is also wonderful preparation for asana, pranayama and meditation, because a body that feels free makes deeper practice comfortable.
                </p>
                <p className="em-body-p2" style={{ marginTop: "16px" }}>
                  Because it is so gentle, Sukshma Vyayama welcomes everyone: children, elders, beginners, people returning to movement after a break, and anyone who spends long hours sitting. Most movements can also be done seated on a chair.
                </p>
              </div>

              {/* Right Column: Visual Photo */}
              <div>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=85"
                    alt="Gentle mindful joint movement practice"
                    className="em-framed-img"
                    style={{ height: "360px" }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: "56px" }}>
              <p className="em-practices-title">
                The Head-to-Toe Joint Sequences:
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
                A welcoming practice adapted for children, elders, and beginners
              </h2>
            </div>

            <div className="em-guided-intro-grid">
              <div>
                <p style={{ color: "#2c2426", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  At OJALIS, Sukshma Vyayama opens most classes. Your teacher adapts each movement to your body — slower and smaller for elders, playful for children, fuller for regular practitioners — so everyone feels comfortable and included from the very first minute of class.
                </p>
              </div>

              <div>
                <p style={{ color: "#6b6164", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  Because every movement is joined to the breath, Sukshma Vyayama also becomes breath training. Your teacher helps you notice how breath and body move together. You also receive a short routine you can do at home or at work, so the benefits continue between classes.
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
              “Every journey deserves a gentle beginning. When each joint moves freely and each movement follows the breath, the body feels ready, the mind feels present, and deeper practice unfolds with ease.”
            </blockquote>

            <p className="em-perspective-body">
              At OJALIS, we believe yoga is open to every body, at every age, from the very first day. Small movements, done with attention, build the habit of noticing — the same habit that sits at the heart of the Breath Signature. It is simple, traditional and quietly powerful.
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
                  Warmth, lightness and freedom in every joint
                </h2>

                <div className="em-who-card">
                  <p className="em-who-tag">Who it is for</p>
                  <p className="em-who-text">
                    <span style={{ fontWeight: 600 }}>Every age and every fitness level</span> — especially beginners, elders, and anyone who sits for long hours.
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
                सूक्ष्म
              </span>

              <div style={{ position: "relative" }}>
                <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
                  Begin Today
                </p>

                <h2 className="em-cta-title">
                  Awaken your body with the gentlest of beginnings
                </h2>

                <p className="em-cta-subtitle">
                  A simple, traditional joint-by-joint movement practice that makes every body feel light, warm, and ready.
                </p>

                <div className="em-cta-btn-wrap">
                  <Link
                    data-testid="final-cta-book-button"
                    to="/book-session?program=Sukshma%20Vyayama"
                    className="em-btn em-btn-light"
                  >
                    Book a Session in Sukshma Vyayama
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

