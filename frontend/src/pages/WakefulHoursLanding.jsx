import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pranayama-emergent.css";

const PRACTICES = [
  { name: "Soothing evening stretches", desc: "unwinding physical tension and spinal tightness before bed" },
  { name: "Long, gentle exhales", desc: "triggering the parasympathetic 'rest-and-digest' response" },
  { name: "Humming Bhramari breath", desc: "quieting racing thoughts, anxiety, and inner mental chatter" },
  { name: "Guided Yoga Nidra", desc: "effortless conscious relaxation guiding your whole body into deep rest" },
  { name: "In-bed dark practices", desc: "subtle, calming breaths you can do lying down if you wake during the night" },
  { name: "Ayurvedic evening rhythms", desc: "practical wisdom on dinner timing, warm hydration, and room lighting" },
  { name: "Digital sunset boundaries", desc: "gentle transitions away from screens to support natural melatonin release" },
];

const STEPS = [
  { n: "01", title: "Evening observation", text: "We begin by understanding your evenings, sleep patterns, and natural Breath Signature." },
  { n: "02", title: "Personal 1-to-1 routine", text: "Your teacher crafts a custom bedtime sequence that fits your home, bedroom, and schedule." },
  { n: "03", title: "Day-to-rest transition", text: "You learn how breath and body shift smoothly from active alertness into deep restoration." },
  { n: "04", title: "Midnight tools", text: "Simple, discreet breath practices you can use lying in bed in the dark if you wake up." },
  { n: "05", title: "Adjusted with you", text: "Your routine is refined as your nights become quieter, calmer, and consistently restful." },
];

const GAINS = [
  "Falling asleep with more ease",
  "Calmer, more peaceful nights",
  "Fresher, more rested mornings",
  "A bedtime routine you can trust",
  "Gentle tools for the waking hours",
];

const FAQS = [
  {
    q: "How is The Wakeful Hours Cadence different from generic sleep apps or recorded meditations?",
    a: "Unlike pre-recorded audio tracks, this is a completely personalized, one-to-one programme. Your teacher observes your specific Breath Signature, bedtime environment, and stress patterns, building a sequence tailored to why your mind stays awake. We teach you self-reliance so you don't need a screen to fall asleep.",
  },
  {
    q: "What should I do if I wake up in the middle of the night and cannot fall back asleep?",
    a: "The cadence includes dedicated 'in-bed practices' specifically designed for mid-night awakenings. You will learn subtle, quiet breath counts and mental settling cues that you can do lying in the dark without getting out of bed or checking the clock.",
  },
  {
    q: "Can I practice this cadence if I am taking sleep medication or seeing a doctor?",
    a: "Yes, absolutely. The Wakeful Hours Cadence is a gentle, natural breath and nervous system practice that works harmoniously alongside your physician's advice. We always encourage students to keep their doctor informed as their sleep quality improves.",
  },
  {
    q: "How long is the cadence and how are sessions scheduled?",
    a: "The cadence typically spans 8 weeks of personalized one-to-one sessions, meeting once a week with your teacher, combined with a short, enjoyable 10-minute bedtime routine every evening at home.",
  },
  {
    q: "Are sessions offered online or in person?",
    a: "Sessions are conducted both in person at our Gurugram sanctuary and online via live, interactive video calls. For bedtime practices, many students find online sessions in their own home setting especially comfortable.",
  },
];

export default function WakefulHoursLanding() {
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
            निद्रा
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
                    निद्रा साधना · The Wakeful Hours Cadence
                  </span>
                </p>

                <h1 className="em-hero-title">
                  What OJALIS Teaches — <span className="italic-gold">The Wakeful Hours Cadence</span>
                </h1>

                <p className="em-hero-desc">
                  For peaceful nights and restful sleep.
                </p>

                <div className="em-hero-ctas">
                  <Link
                    data-testid="hero-book-session-button"
                    to="/book-session?program=The%20Wakeful%20Hours%20Cadence"
                    className="em-btn"
                  >
                    Book a Session in The Wakeful Hours Cadence
                  </Link>
                </div>
              </div>

              {/* Right Column: Framed Photo + Floating Badge */}
              <div style={{ position: "relative" }}>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=1200&q=85"
                    alt="The Wakeful Hours Cadence — peaceful nights and restful sleep"
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
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
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
                      ONE-TO-ONE CADENCE
                    </span>
                    <span style={{ display: "block", fontSize: "14px", color: "#6b6164" }}>
                      For Peaceful Nights & Restful Sleep
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
                अभावप्रत्ययालम्बना वृत्तिर्निद्रा ॥
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
                “Deep restful sleep is supported by the calm cessation of mental agitation. When the breath softens, the mind naturally surrenders into restorative repose.”
              </blockquote>

              <figcaption className="em-eyebrow" style={{ marginTop: "28px" }}>
                — Patañjali Yoga Sūtra 1.10
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
              A personal, one-to-one cadence for restful nights: an evening routine, Yoga Nidra, and gentle breathing you can use in bed whenever sleep feels far away.
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
                  Bringing peace back to the quiet hours of the night
                </h2>

                <div className="em-what-paragraphs">
                  <p>
                    Some nights the body is tired but the mind stays busy. Thoughts keep playing, sleep takes a long time to arrive, or you wake in the middle of the night and lie awake. Morning then arrives before you feel rested. The Wakeful Hours Cadence is designed to bring peace back to these hours.
                  </p>
                  <p>
                    This one-to-one cadence brings together several gentle practices. A soothing evening sequence of slow stretches and calming breath prepares the body for rest. Long, gentle exhales and the humming Bhramari breath settle the mind. Yoga Nidra guides you into deep relaxation. You also learn simple practices you can do lying in bed, in the dark, if you wake during the night. Ayurvedic evening guidance on dinner time, screens and light completes the routine.
                  </p>
                </div>
              </div>

              {/* Right Column: Visual Photo */}
              <div>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=85"
                    alt="Restful evening sanctuary with warm ambient light"
                    className="em-framed-img"
                    style={{ height: "360px" }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: "56px" }}>
              <p className="em-practices-title">
                The Restorative Evening Sequence:
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
                A personal bedtime routine that fits your home and life
              </h2>
            </div>

            <div className="em-guided-intro-grid">
              <div>
                <p style={{ color: "#2c2426", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  OJALIS begins by understanding your evenings and nights, alongside your Breath Signature. Your teacher then builds a personal bedtime routine that fits your home and your schedule, and adjusts it as you practise and share how your nights are changing.
                </p>
              </div>

              <div>
                <p style={{ color: "#6b6164", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  Your teacher also helps you understand how breath and body move from the busy day into rest, so the routine makes sense and feels natural. This cadence is a gentle, supportive practice, and it works alongside your doctor’s care whenever that is needed.
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
            विश्राम
          </span>

          <div className="em-container" style={{ maxWidth: "896px", position: "relative" }}>
            <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
              The OJALIS Perspective
            </p>

            <blockquote className="em-perspective-quote">
              “Sleep is something to invite, gently and patiently. Trying hard to sleep keeps the mind awake; when you soften the breath and quiet the mind, sleep arrives in its own time.”
            </blockquote>

            <p className="em-perspective-body">
              At OJALIS, we believe a good night begins long before you lie down, in the rhythm of your evening. By shaping that rhythm with care, this cadence helps you build a calm transition from the busy day into rest. Bedtime becomes a peaceful ritual you look forward to, and waking hours, when they come, feel calm and easy.
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
                  Fresher mornings born from peaceful nights
                </h2>

                <div className="em-who-card">
                  <p className="em-who-tag">Who it is for</p>
                  <p className="em-who-text">
                    <span style={{ fontWeight: 600 }}>Anyone whose mind stays busy at night</span>, and anyone who wants deeper, more restful sleep.
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
                निद्रा
              </span>

              <div style={{ position: "relative" }}>
                <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
                  Begin Today
                </p>

                <h2 className="em-cta-title">
                  Invite peaceful, restful sleep back into your nights
                </h2>

                <p className="em-cta-subtitle">
                  A personal, one-to-one cadence designed to give you a bedtime routine you trust and deeply restorative mornings.
                </p>

                <div className="em-cta-btn-wrap">
                  <Link
                    data-testid="final-cta-book-button"
                    to="/book-session?program=The%20Wakeful%20Hours%20Cadence"
                    className="em-btn em-btn-light"
                  >
                    Book a Session in The Wakeful Hours Cadence
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

