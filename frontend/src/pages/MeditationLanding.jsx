import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pranayama-emergent.css";

const PRACTICES = [
  { name: "Breath awareness (Anapana)", desc: "simply resting your attention on the natural, unforced flow of breath" },
  { name: "Counted breathing", desc: "giving a busy, racing mind an anchor to count and steady itself" },
  { name: "So-Hum mantra meditation", desc: "joining a gentle, ancient breath mantra (Inhale 'So', Exhale 'Hum')" },
  { name: "Pranayama transition", desc: "calming the breath first so seated stillness arrives effortlessly" },
  { name: "Body-scan grounding", desc: "releasing unconscious muscular holding in the shoulders, jaw and abdomen" },
  { name: "Kind attention training", desc: "learning to notice wandering thoughts and bring the mind back without frustration" },
  { name: "Quiet sitting (Dhyana)", desc: "resting in unbroken, spacious inner stillness as your practice matures" },
];

const STEPS = [
  { n: "01", title: "Short, comfortable sittings", text: "You begin with approachable durations that grow gradually as sitting becomes completely natural." },
  { n: "02", title: "Supported posture", text: "Guided posture on a cushion, floor, or chair so your body effortlessly supports the mind." },
  { n: "03", title: "Breath-led stillness", text: "Meditation follows gentle pranayama in class, because a calm breath makes sitting easy." },
  { n: "04", title: "Meeting real obstacles", text: "Your teacher answers questions about wandering thoughts, restlessness, or afternoon fatigue." },
  { n: "05", title: "Everyday calm", text: "Quiet poise that begins to appear naturally in conversations, at work, and at home." },
];

const GAINS = [
  "A clearer, quieter mind",
  "Calmer responses to everyday situations",
  "Stronger concentration and focus",
  "A deeper understanding of yourself",
  "Moments of peace you can return to any time",
];

const FAQS = [
  {
    q: "My mind never stops thinking — can I really learn to meditate?",
    a: "Yes, absolutely. A wandering mind is a normal, human mind. At OJALIS, we do not expect you to empty your mind or force thoughts to stop. Meditation is simply noticing when the mind has drifted and kindly returning to your anchor. Each gentle return is a success that strengthens your focus.",
  },
  {
    q: "Do I have to sit cross-legged on the floor?",
    a: "Not at all. You can sit comfortably on a sturdy chair, on a meditation cushion, or against a wall. The only requirement is a steady, upright and relaxed spine so your breath flows freely without physical strain.",
  },
  {
    q: "Why does OJALIS always teach breathwork (pranayama) before meditation?",
    a: "Trying to meditate with an agitated or hurried breath is like trying to still troubled waters with your hands. When you guide the breath into a slow, smooth rhythm first, the nervous system naturally shifts into calm. The mind follows the breath, and stillness arrives on its own.",
  },
  {
    q: "How much daily sitting is recommended for noticeable results?",
    a: "Even 10 to 15 minutes of regular, daily practice creates a noticeable difference in mental clarity, emotional reactivity, and sleep quality. Consistency matters far more than sitting for hours.",
  },
  {
    q: "Are sessions offered online or in person?",
    a: "Sessions are conducted both in person at our Gurugram sanctuary and online in live, interactive classes for practitioners across India and worldwide.",
  },
];

export default function MeditationLanding() {
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
            ध्यान
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
                    ध्यान · Dhyāna
                  </span>
                </p>

                <h1 className="em-hero-title">
                  What OJALIS Teaches — <span className="italic-gold">Meditation</span>
                </h1>

                <p className="em-hero-desc">
                  A gentle anchor for a busy mind.
                </p>

                <div className="em-hero-ctas">
                  <Link
                    data-testid="hero-book-session-button"
                    to="/book-session?program=Meditation"
                    className="em-btn"
                  >
                    Book a Session in Meditation
                  </Link>
                </div>
              </div>

              {/* Right Column: Framed Photo + Floating Badge */}
              <div style={{ position: "relative" }}>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85"
                    alt="Meditation — gentle training of attention at OJALIS"
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
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="4" />
                      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
                      <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
                      <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
                      <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
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
                      TRAINING OF ATTENTION
                    </span>
                    <span style={{ display: "block", fontSize: "14px", color: "#6b6164" }}>
                      A Gentle Anchor for a Busy Mind
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. CLASSICAL DEFINITION (FROM PDF PAGE 1)
            ========================================================================= */}
        <section id="definition" className="em-sec-definition">
          <div className="em-container" style={{ maxWidth: "896px", textAlign: "center" }}>
            <p className="em-eyebrow">Classical Foundation</p>

            <figure data-testid="sutra-centerpiece-card" className="em-sutra-card">
              <p className="em-sutra-verse">
                तत्र प्रत्ययैकतानता ध्यानम् ॥
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
                “Dhyana (meditation) is the steady, unbroken flow of awareness towards that one object of attention.”
              </blockquote>

              <figcaption className="em-eyebrow" style={{ marginTop: "28px" }}>
                — Patañjali Yoga Sūtra 3.2
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
              Meditation is the gentle training of attention. At OJALIS, the breath is your anchor: you rest your attention on it and kindly return whenever the mind wanders.
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
                  Noticing where the mind has gone, and gently bringing it back
                </h2>

                <div className="em-what-paragraphs">
                  <p>
                    Many people believe meditation means emptying the mind. At OJALIS, we see it more simply. The mind naturally wanders — to plans, memories and worries. Meditation is the practice of noticing where the mind has gone and gently bringing it back. Each return is a small moment of training, like lifting a weight to strengthen the attention.
                  </p>
                  <p>
                    The breath makes a perfect anchor because it is always with you, always in the present moment. Practices at OJALIS include breath awareness, where you simply watch the natural breath; counted breathing, which gives a busy mind something steady to hold; So-Hum, a gentle mantra joined to the breath; and quiet sitting, where you rest in stillness for longer as your practice matures.
                  </p>
                </div>
              </div>

              {/* Right Column: Visual Photo */}
              <div>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=85"
                    alt="Peaceful meditation in natural light"
                    className="em-framed-img"
                    style={{ height: "360px" }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: "56px" }}>
              <p className="em-practices-title">
                Core Meditation Practices:
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
            5. HOW OJALIS GUIDES YOU (FROM PDF PAGE 1 & 2)
            ========================================================================= */}
        <section className="em-sec-guided">
          <div className="em-container">
            <div>
              <p className="em-eyebrow">How OJALIS Guides You</p>
              <h2 className="em-section-heading" style={{ maxWidth: "768px" }}>
                Meeting you exactly where you are, with posture that feels easy
              </h2>
            </div>

            <div className="em-guided-intro-grid">
              <div>
                <p style={{ color: "#2c2426", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  OJALIS meets you exactly where you are. You begin with short, comfortable sittings that grow gradually as the practice becomes natural. Your teacher helps you find a steady, relaxed posture — on the floor, on a cushion or on a chair — so the body supports the mind and the sitting feels easy.
                </p>
              </div>

              <div>
                <p style={{ color: "#6b6164", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  Meditation often follows pranayama in class, because a calm breath makes sitting so much easier. Your teacher also answers the real questions that arise along the way, such as a wandering mind, sleepiness or restlessness, and adjusts the method to suit you. Over time, the calm you build in practice begins to appear quietly in everyday life: in conversations, at work and at home.
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
            शान्ति
          </span>

          <div className="em-container" style={{ maxWidth: "896px", position: "relative" }}>
            <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
              The OJALIS Perspective
            </p>

            <blockquote className="em-perspective-quote">
              “A wandering mind is a normal, human mind, and every gentle return is a success. When the breath settles, the mind follows, and stillness arrives on its own.”
            </blockquote>

            <p className="em-perspective-body">
              The OJALIS perspective on meditation is warm and practical. We encourage students to approach meditation with curiosity and kindness, letting go of any idea of a perfect sitting. Our aim is to help you build a quiet inner space that you can visit any time — before a decision, after a long day, or simply whenever you wish to feel at peace.
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
                  A quiet inner space you can visit any time
                </h2>

                <div className="em-who-card">
                  <p className="em-who-tag">Who it is for</p>
                  <p className="em-who-text">
                    <span style={{ fontWeight: 600 }}>Beginners with busy minds, experienced practitioners who want to go deeper</span>, and anyone looking for inner quiet.
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
                ध्यान
              </span>

              <div style={{ position: "relative" }}>
                <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
                  Begin Today
                </p>

                <h2 className="em-cta-title">
                  Build your quiet inner sanctuary, breath by breath
                </h2>

                <p className="em-cta-subtitle">
                  A warm, welcoming practice where you learn to rest your attention and kindly return whenever the mind wanders.
                </p>

                <div className="em-cta-btn-wrap">
                  <Link
                    data-testid="final-cta-book-button"
                    to="/book-session?program=Meditation"
                    className="em-btn em-btn-light"
                  >
                    Book a Session in Meditation
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

