import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pranayama-emergent.css";

const PRACTICES = [
  {
    name: "Nadi Shodhana (Alternate Nostril Breathing)",
    desc: "Balancing the sympathetic and parasympathetic branches of the nervous system, steadying emotional swings and smoothing energy dips.",
  },
  {
    name: "Bhramari (The Calming Humming Breath)",
    desc: "Gentle cranial resonance and vibrational humming that immediately soothes nervous tension, relieves irritability, and settles the mind.",
  },
  {
    name: "Cooling Breaths (Sheetali & Sheetkari)",
    desc: "Refreshing, cooling inhalations that lower internal metabolic heat, ease emotional restlessness, and cultivate tranquil inner balance.",
  },
  {
    name: "Gentle Hatha for Hips & Lower Back",
    desc: "Nourishing, unhurried postures that gently release sacral congestion, open the pelvic basin, and soothe cramping and muscular tightness.",
  },
  {
    name: "Restful Yoga Nidra & Deep Savasana",
    desc: "Profound guided yogic rest that replenishes accumulated sleep debt, calms cortisol, and offers the deep renewal your body naturally craves.",
  },
  {
    name: "Ayurvedic Rhythm & Nourishment (Ritucharya)",
    desc: "Practical guidance on warm, comforting meals, steady sleep schedules, and mindful daily pacing aligned with each phase of your cycle.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Begins by listening",
    text: "Your Breath Signature and personal health details help your teacher understand your rhythm, energy curves, and monthly experiences.",
  },
  {
    n: "02",
    title: "Shaped to your current phase",
    text: "Dynamic and active when internal vitality is high; softer, deeply restorative and unhurried when your body asks for quiet rest.",
  },
  {
    n: "03",
    title: "Extra care during menstruation",
    text: "Practice becomes especially gentle; heating techniques such as Kapalabhati and abdominal locks are reserved for later phases.",
  },
  {
    n: "04",
    title: "Supports your doctor's care",
    text: "Works hand in hand with your gynaecologist or healthcare provider, gently supporting any medical care or treatment you are following.",
  },
  {
    n: "05",
    title: "Safe, open & comfortable space",
    text: "Offered one-to-one or in intimate small groups, in person or live online, where women can speak openly and every question is welcomed.",
  },
];

const FAQS = [
  {
    q: "Can I practice yoga while on my period?",
    a: "Yes, but the nature of the practice must shift. During menstruation, our practice becomes deeply grounding and gentle. We focus on soft belly breathing, supported hip openers, and restorative relaxation. Inversions, strong core compressions, Kapalabhati, and abdominal locks are avoided to respect the natural downward flow (Apana Vayu).",
  },
  {
    q: "How does breathwork help with hormonal mood swings and PMS?",
    a: "Breath and emotions are directly linked through the vagus nerve. Calming practices like Nadi Shodhana and Bhramari reduce sympathetic nervous arousal, lower stress hormones (cortisol and adrenaline), and stimulate the release of calming neurotransmitters, helping you feel centered and emotionally grounded.",
  },
  {
    q: "Does this practice help with irregular cycles, PCOS, or endometriosis?",
    a: "While yoga is not a medical cure, steadying the breath and reducing chronic pelvic tension significantly supports hormonal equilibrium. The Cycle Practice lowers systemic inflammation, improves pelvic circulation, and provides therapeutic comfort alongside your doctor's clinical treatment plan.",
  },
  {
    q: "What if my cycle is unpredictable or varies from month to month?",
    a: "That is completely normal and why we begin by listening. Rather than forcing your body into a rigid calendar, your teacher helps you tune into your daily bodily cues — noticing whether today calls for movement or stillness — so practice adapts to you, not the other way around.",
  },
  {
    q: "Are classes available online or only in person?",
    a: "Classes are offered both in person at our Gurugram studio and live online in one-to-one or small group settings, allowing you to practice in the comfort and privacy of your own home.",
  },
];

export default function CyclePracticeLanding() {
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
            ऋतु
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
                    ऋतुचर्या · Ṛtucaryā
                  </span>
                </p>

                <h1 className="em-hero-title">
                  What OJALIS Teaches — <span className="italic-gold">The Cycle Practice</span>
                </h1>

                <p className="em-hero-desc">
                  Breath and movement in harmony with your monthly rhythm.
                </p>

                <div className="em-hero-ctas">
                  <Link
                    data-testid="hero-book-session-button"
                    to="/book-session?program=The%20Cycle%20Practice"
                    className="em-btn"
                  >
                    Book a Session in The Cycle Practice
                  </Link>
                </div>
              </div>

              {/* Right Column: Framed Photo + Floating Badge */}
              <div style={{ position: "relative" }}>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85"
                    alt="The Cycle Practice — breath and movement in harmony with your monthly rhythm"
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
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
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
                      MONTHLY HARMONY
                    </span>
                    <span style={{ display: "block", fontSize: "14px", color: "#6b6164" }}>
                      Moving in Rhythm With Nature
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
                यथा नद्यः समुद्राभिसम्मुखी भवन्ति ॥
                <br />
                तथा नारी स्वकीयेन ऋतुचक्रेण प्रकृतिं भजते ॥
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
                “Just as rivers flow in sacred cadence with the ocean, so does a woman naturally honour the seasons of nature through her monthly cycle.”
              </blockquote>

              <figcaption className="em-eyebrow" style={{ marginTop: "28px" }}>
                — Āyurveda Śārīrasthāna, Ṛtucaryā
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
              Gentle breath and movement that support a woman’s monthly rhythm, helping her find steadier energy, calmer moods and restful sleep through every phase of the cycle.
            </p>
          </div>
        </section>

        {/* =========================================================================
            4. WHAT IT IS
            ========================================================================= */}
        <section className="em-sec-what">
          <div className="em-container">
            <div className="em-what-grid">
              <div>
                <p className="em-eyebrow">What It Is</p>
                <h2 className="em-section-heading">
                  The Seasons Within
                </h2>

                <p className="em-body-p1">
                  Every woman’s body moves through a monthly rhythm. Energy rises and dips, moods shift, sleep and appetite change, and some weeks feel lighter than others. At times this rhythm can also feel unpredictable: cycles that keep their own calendar, tiredness that arrives suddenly, or a mood that turns quickly.
                </p>

                <p className="em-body-p2">
                  The Cycle Practice brings together calming pranayama such as Nadi Shodhana, the humming Bhramari breath, cooling Sheetali, and gentle hatha postures that open the hips and lower back. Restful Yoga Nidra and simple Ayurvedic daily pacing steady the breath at the heart of the practice.
                </p>
              </div>

              <div>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85"
                    alt="The Cycle Practice — breath and movement in harmony with your monthly rhythm"
                    className="em-framed-img"
                    style={{ height: "360px" }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: "56px" }}>
              <p className="em-practices-title">
                Pillars of Cyclical Practice:
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
              <h2 className="em-section-heading">Attuned & Caring Guidance</h2>
              <div className="em-guided-intro-grid">
                <p style={{ color: "#2c2426", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  OJALIS begins by listening. Your Breath Signature and health details help your teacher understand your rhythm, energy curves, and monthly experiences.
                </p>
                <p style={{ color: "#6b6164", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  Practice is shaped to your phase: active when energy is high; softer when the body asks for rest. During menstruation, practice turns gentle, safely supporting any medical care you follow.
                </p>
              </div>
            </div>

            <ol data-testid="steps-list" className="em-steps-5-grid">
              {STEPS.map((s) => (
                <li key={s.n} className="em-step-card">
                  <span className="em-step-num">{s.n}</span>
                  <h3 className="em-step-title">{s.title}</h3>
                  <p className="em-step-text">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* =========================================================================
            6. THE OJALIS PERSPECTIVE (GREEN QUOTE BANNER)
            ========================================================================= */}
        <section className="em-sec-perspective">
          <span aria-hidden="true" className="em-perspective-watermark">
            ऋतु
          </span>

          <div className="em-container" style={{ maxWidth: "896px", textAlign: "center" }}>
            <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
              The OJALIS Perspective
            </p>

            <blockquote
              data-testid="perspective-quote"
              className="em-perspective-quote"
            >
              “Modern life often asks women to feel the same every day, yet the body moves in seasons, much like nature. When practice follows this rhythm, it feels supportive and kind.”
            </blockquote>

            <p className="em-perspective-body">
              At OJALIS, we see the monthly cycle as a natural rhythm to be understood and respected. We create a calm, comfortable space where women can speak openly about how they feel, and where every question is welcome.
            </p>

            <p className="em-perspective-body" style={{ marginTop: "16px" }}>
              Our aim is to help each woman feel more at home in her body, more aware of her own patterns, and more confident in caring for herself through every phase of the month.
            </p>
          </div>
        </section>

        {/* =========================================================================
            7. WHAT YOU GAIN WITH OJALIS
            ========================================================================= */}
        <section id="what-you-gain" className="em-sec-gains">
          <div className="em-container">
            <div className="em-gains-grid">
              {/* Left Column: Title & Audience */}
              <div>
                <p className="em-eyebrow">The Nurturing Fruits</p>
                <h2 className="em-font-display em-gains-title">
                  What you gain with OJALIS
                </h2>
                <p className="em-gains-sub">
                  Honour your body’s natural tides and experience steadier energy, physical ease, and emotional clarity through every week of the month.
                </p>

                <div data-testid="who-it-is-for-card" className="em-who-card">
                  <p className="em-who-tag">WHO IT IS FOR</p>
                  <p className="em-who-text">
                    Women and girls who wish to support their monthly rhythm gently, alongside their doctor’s care.
                  </p>
                </div>
              </div>

              {/* Right Column: 5 Gains List */}
              <div>
                <ul className="em-gains-list">
                  {[
                    "Steadier energy through the month",
                    "Calmer, more balanced moods",
                    "More restful sleep",
                    "Comfort in the hips and lower back",
                    "A deeper understanding of your own rhythm",
                  ].map((gain, index) => (
                    <li
                      key={index}
                      data-testid={`gain-item-${index}`}
                      className="em-gain-item"
                    >
                      <span className="em-gain-check">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="em-gain-text">{gain}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. FAQ ACCORDION
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
              {FAQS.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div key={index} className="em-faq-item">
                    <button
                      type="button"
                      data-testid={`faq-question-${index + 1}`}
                      onClick={() => toggleFaq(index)}
                      className="em-faq-trigger"
                    >
                      <span style={{ paddingRight: "16px" }}>{faq.q}</span>
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
                        {faq.a}
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
            9. BEGIN TODAY CTA BAND
            ========================================================================= */}
        <section className="em-sec-cta-band">
          <div className="em-container">
            <div className="em-cta-box">
              <span aria-hidden="true" className="em-cta-watermark">
                ऋतु
              </span>

              <div style={{ position: "relative", zIndex: 10 }}>
                <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
                  Begin Your Monthly Harmony
                </p>

                <h2 className="em-cta-title">
                  Ready to Move in Harmony With Your Natural Rhythm?
                </h2>

                <p className="em-cta-subtitle">
                  Discover your Breath Signature or consult your teacher to begin shaping a practice tailored lovingly to every phase of your month.
                </p>

                <div className="em-cta-btn-wrap">
                  <Link
                    data-testid="final-cta-book-button"
                    to="/book-session?program=The%20Cycle%20Practice"
                    className="em-btn em-btn-light"
                  >
                    Book a Session in The Cycle Practice
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

