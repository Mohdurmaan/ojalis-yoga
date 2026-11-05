import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pranayama-emergent.css";

const PRACTICES = [
  { name: "Slow, lengthened exhales", desc: "releasing physical tension in under a minute" },
  { name: "Softly counted breathing", desc: "restoring mental focus and slowing the heart rate" },
  { name: "Quiet humming breaths", desc: "calming the nervous system with subtle vibration" },
  { name: "Discreet desk breathing", desc: "practiced with eyes open during meetings or work" },
  { name: "Shoulder & jaw release breath", desc: "easing unconscious posture clenching" },
  { name: "Pre-conversation centering", desc: "anchoring steadiness before high-stakes talks" },
  { name: "Transition resets", desc: "clearing residual stress between busy appointments" },
];

const STEPS = [
  { n: "01", title: "Breath Signature", text: "We observe your personal pattern under pressure before choosing any technique." },
  { n: "02", title: "Learned in calm", text: "Practiced slowly in a peaceful setting until each breath feels completely natural." },
  { n: "03", title: "Everyday moments", text: "Brought into small daily cues like deadlines, traffic, and important meetings." },
  { n: "04", title: "Remembered habit", text: "Over time, the calm breath arrives on its own whenever the day gets busy." },
  { n: "05", title: "Refined with you", text: "As your life and needs evolve, your teacher refines and adapts the practice." },
];

const GAINS = [
  "A calm, steady response to pressure, wherever you are",
  "Clearer thinking before important moments",
  "A quicker return to balance after a stressful event",
  "Simple tools that need only your own breath",
  "Quiet confidence that you can steady yourself at any time",
];

const FAQS = [
  {
    q: "Can I really practice these techniques without anyone noticing?",
    a: "Yes, absolutely. Each technique is designed to be simple and discreet. You can do it sitting at a desk, standing in a corridor, waiting in a queue, or in traffic with your eyes open. The people around you will simply see someone calm, grounded, and attentive.",
  },
  {
    q: "How quickly do I feel the calming effect of a Real-Time breath?",
    a: "A single slow, lengthened exhale or softly counted breath engages the parasympathetic 'rest-and-digest' mechanism in 30 to 60 seconds, easing muscular tension in the jaw and shoulders while steadying the heart rate.",
  },
  {
    q: "Do I need any previous yoga or breathwork experience?",
    a: "No prior experience is required. The practice begins with an observation of how you naturally breathe under pressure. Your teacher selects techniques that fit your body and daily schedule rather than giving you a generic routine.",
  },
  {
    q: "Where in my daily life can I use The Real-Time Practice?",
    a: "Right in the middle of the moment itself — while a deadline is pressing, before you walk into an important meeting, during a tense phone call, or when thoughts keep circling in your mind.",
  },
  {
    q: "How does the practice become an effortless, automatic reflex?",
    a: "You learn each technique slowly in a calm setting first. Your teacher helps you anchor it to everyday triggers. Over time, the breath you practiced in calm becomes the breath that arrives automatically when your day gets busy.",
  },
];

export default function RealTimePracticeLanding() {
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
            वर्तमान
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
                    वर्तमान साधना · The Real-Time Practice
                  </span>
                </p>

                <h1 className="em-hero-title">
                  What OJALIS Teaches — <span className="italic-gold">The Real-Time Practice</span>
                </h1>

                <p className="em-hero-desc">
                  Calm that travels with you, ready in the very moment you need it.
                </p>

                <div className="em-hero-ctas">
                  <Link
                    data-testid="hero-book-session-button"
                    to="/book-session?program=The%20Real-Time%20Practice"
                    className="em-btn"
                  >
                    Book a Session in The Real-Time Practice
                  </Link>
                </div>
              </div>

              {/* Right Column: Framed Photo + Floating Badge */}
              <div style={{ position: "relative" }}>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=85"
                    alt="The Real-Time Practice — calm breathing ready when you need it"
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
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
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
                      CALM IN THE MOMENT
                    </span>
                    <span style={{ display: "block", fontSize: "14px", color: "#6b6164" }}>
                      Ready Whenever You Need It
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
                चले वाते चलं चित्तं निश्चले निश्चलं भवेत् ॥
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
                “When the breath is unsteady, the mind is unsteady. When the breath is steady, the mind becomes calm and composed.”
              </blockquote>

              <figcaption className="em-eyebrow" style={{ marginTop: "28px" }}>
                — Haṭha Yoga Pradīpikā 2.2
              </figcaption>
            </figure>
          </div>
        </section>

        {/* =========================================================================
            3. IN SIMPLE WORDS (FROM PDF PAGE 1)
            ========================================================================= */}
        <section className="em-sec-simple">
          <div className="em-container" style={{ maxWidth: "768px", textAlign: "center" }}>
            <p className="em-eyebrow">In Simple Words</p>

            <p className="em-simple-statement" data-testid="in-simple-words">
              Quick, quiet breathing techniques you can use in the very moment you feel pressure — at your desk, in traffic, or just before an important conversation.
            </p>
          </div>
        </section>

        {/* =========================================================================
            4. WHAT IT IS (FROM PDF PAGE 1)
            ========================================================================= */}
        <section className="em-sec-what">
          <div className="em-container">
            <div className="em-what-grid">
              <div>
                <p className="em-eyebrow">What It Is</p>
                <h2 className="em-section-heading">
                  A small set of calm, reliable breaths
                </h2>

                <p className="em-body-p1">
                  Most of us are taught to relax after a difficult moment is over: in the evening, on a mat, once the day has finished. The Real-Time Practice works the other way around. It gives you a small set of calm, reliable breaths that you can use right in the middle of the moment itself — while a deadline is pressing, before you walk into an important meeting, during a tense phone call, or when a thought keeps circling in your mind.
                </p>

                <p className="em-body-p2">
                  Each technique is simple and discreet. You can do it sitting at a desk, standing in a corridor or waiting in a queue, with your eyes open. The people around you will simply see someone calm. Slow, lengthened exhales, softly counted breathing and quiet humming breaths form the heart of this practice. Together they help the body settle, the shoulders soften and the mind return to what matters right now.
                </p>
              </div>

              <div>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85"
                    alt="Discreet in-the-moment breath practice"
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
            5. HOW OJALIS GUIDES YOU (FROM PDF PAGE 1 & 2)
            ========================================================================= */}
        <section className="em-sec-guided">
          <div className="em-container">
            <div>
              <p className="em-eyebrow">How OJALIS Guides You</p>
              <h2 className="em-section-heading" style={{ maxWidth: "768px" }}>
                A practice made for you, rather than a general list
              </h2>
            </div>

            <div className="em-guided-intro-grid">
              <div>
                <p style={{ color: "#2c2426", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  At OJALIS, this practice begins with your Breath Signature. Every person responds to pressure in their own way. Some people hold the breath, some breathe fast and high in the chest, others tighten the jaw or the stomach. Your teacher first observes your personal pattern, then chooses the techniques that suit you best, so you receive a practice made for you rather than a general list.
                </p>
              </div>

              <div>
                <p style={{ color: "#6b6164", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  You learn each technique slowly in class, in a calm setting, until it feels natural. Your teacher then helps you bring it into small everyday moments, so it becomes a habit your body remembers by itself. Over time, the breath you have practised in calm becomes the breath that arrives on its own when the day gets busy. As your life and needs change, your teacher refines the practice with you.
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
            शांत
          </span>

          <div className="em-container" style={{ maxWidth: "896px", position: "relative" }}>
            <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
              The OJALIS Perspective
            </p>

            <blockquote className="em-perspective-quote">
              “At OJALIS, we believe you can meet each moment with a steadier breath, right where you stand. When the breath is guided, the mind follows.”
            </blockquote>

            <p className="em-perspective-body">
              The OJALIS perspective is simple: calm is a skill, and like any skill it grows with practice. Many people wait for stress to pass. By learning to guide your breath, the whole day begins to feel lighter and more manageable.
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
                  Calm that stays with you all day
                </h2>

                <div className="em-who-card">
                  <p className="em-who-tag">Who it is for</p>
                  <p className="em-who-text">
                    Anyone whose day moves quickly — <span style={{ fontWeight: 600 }}>working professionals, students, parents</span>, and everyone who wants calm to be available exactly when it is needed.
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
                वर्तमान
              </span>

              <div style={{ position: "relative" }}>
                <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
                  Begin Today
                </p>

                <h2 className="em-cta-title">
                  Begin with your Breath Signature
                </h2>

                <p className="em-cta-subtitle">
                  A calm, personal session where we observe how your breath responds to daily pressure — and your practice grows from there.
                </p>

                <div className="em-cta-btn-wrap">
                  <Link
                    data-testid="final-cta-book-button"
                    to="/book-session?program=The%20Real-Time%20Practice"
                    className="em-btn em-btn-light"
                  >
                    Book a Session in The Real-Time Practice
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

