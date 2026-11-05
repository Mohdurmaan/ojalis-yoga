import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pranayama-emergent.css";

const PRACTICES = [
  {
    name: "Jala Neti (नेति · Nasal Cleansing)",
    desc: "A gentle rinse of the nasal passages with lukewarm salt water using a sterile neti pot; clears mucus, soot, pollen, and restores effortless nasal respiration.",
  },
  {
    name: "Kapalabhati (कपालभाति · Frontal Brain Cleansing)",
    desc: "An active rhythmic exhalation and passive inhalation practice that clears the bronchial tree, dispels sluggish carbon dioxide, and invigorates mental alertness.",
  },
  {
    name: "Trataka (त्राटक · Steady Candle Gazing)",
    desc: "Steadfast gazing at a ghee flame or concentrated focal point until eyes gently moisten; cleanses tear ducts, relieves screen fatigue, and stills wandering thoughts.",
  },
  {
    name: "Dhauti (धौति · Internal & Digestive Cleansing)",
    desc: "Classical upper-tract purification techniques that remove excess phlegm, acidity, and bile, restoring optimal digestive lightness and mucosal balance.",
  },
  {
    name: "Nauli (नौलि · Abdominal Visceral Churning)",
    desc: "Isolation and cyclic rolling of the rectus abdominis muscles that massages visceral abdominal organs, regulates digestion, and kindles the internal fire (jatharagni).",
  },
  {
    name: "Basti (बस्ति · Lower Colon Cleansing)",
    desc: "The classical yogic irrigation of the lower bowel, expelling deep-seated metabolic impurities and establishing systemic tranquility throughout the pelvis.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "One technique at a time",
    text: "Introduced gradually and intentionally, once your Breath Signature assessment and health declaration confirm personal readiness.",
  },
  {
    n: "02",
    title: "Demonstration & clear purpose",
    text: "Your teacher first demonstrates the technique, explains its physiological and energetic purpose, and answers every question before you begin.",
  },
  {
    n: "03",
    title: "Precise method & saline comfort",
    text: "Your teacher checks your posture, water temperature, saline proportions, and comfort step by step to guarantee effortless safety.",
  },
  {
    n: "04",
    title: "Confidence for safe home practice",
    text: "We guide you until the method feels natural, safe, and instinctive, empowering you to maintain these grounding rituals in daily life.",
  },
  {
    n: "05",
    title: "Preparation for deeper yoga",
    text: "Cleansing is never treated as an isolated gymnastic chore, but as the sacred foundation that unlocks deeper pranayama and meditation.",
  },
];

const FAQS = [
  {
    q: "Are Shatkarma practices safe for beginners?",
    a: "Yes, when introduced properly. At OJALIS, beginners start with gentle, accessible practices such as Jala Neti, Kapalabhati, and Trataka. Each technique is taught step by step with precise supervision, only after reviewing your Breath Signature and health history.",
  },
  {
    q: "How does Jala Neti feel, and does water get into the throat?",
    a: "When performed with lukewarm water and the correct pinch of non-iodised salt at physiological isotonicity, water flows smoothly through one nostril and exits the other without any stinging or sensation of drowning. Your teacher guides head tilt and open-mouth breathing to keep water entirely out of the throat.",
  },
  {
    q: "Are all six classical Shatkarmas taught to everyone?",
    a: "No. Classical texts prescribe cleansing according to individual constitution (dosha) and need. While Neti, Kapalabhati, and Trataka benefit almost all modern practitioners, advanced practices like Dhauti, Basti, and Nauli are reserved for advanced students under close individual mentorship.",
  },
  {
    q: "How does Trataka help with modern screen time and eye fatigue?",
    a: "Modern eyes spend hours locked in close-range scanning on blue-lit screens, creating chronic eye-muscle strain and a restless mind. Trataka trains steady focal convergence on a soothing natural flame, stimulating tear production, relaxing the optic nerve, and naturally calming overstimulated beta brainwaves.",
  },
  {
    q: "Can Shatkarma be learned online or is in-person guidance required?",
    a: "Preparatory practices and Trataka are taught seamlessly both online and in person. For first-time Jala Neti and physical cleansing, we offer dedicated in-person sessions at our Gurugram studio as well as live interactive 1-on-1 virtual sessions with close teacher observation.",
  },
];

export default function ShatkarmaLanding() {
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
            षट्कर्म
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
                    षट्कर्म · Ṣaṭkarma
                  </span>
                </p>

                <h1 className="em-hero-title">
                  What OJALIS Teaches — <span className="italic-gold">Shatkarma</span>
                </h1>

                <p className="em-hero-desc">
                  The classical cleansing practices of Hatha Yoga.
                </p>

                <div className="em-hero-ctas">
                  <Link
                    data-testid="hero-book-session-button"
                    to="/book-session?program=Shatkarma"
                    className="em-btn"
                  >
                    Book a Session in Shatkarma
                  </Link>
                </div>
              </div>

              {/* Right Column: Framed Photo + Floating Badge */}
              <div style={{ position: "relative" }}>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85"
                    alt="Shatkarma — classical cleansing practices of Hatha Yoga"
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
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
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
                      CLASSICAL PURIFICATION
                    </span>
                    <span style={{ display: "block", fontSize: "14px", color: "#6b6164" }}>
                      Preparing the Ground for Breath & Mind
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
                धौतिर्बस्तिस्तथा नेतिस्त्राटकं नौलिकं तथा ।
                <br />
                कपालभातिश्चैतानि षट्कर्माणि प्रचक्षते ॥
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
                “Dhauti, Basti, Neti, Trataka, Nauli and Kapalabhati — these are known as the six cleansing actions, Shatkarma.”
              </blockquote>

              <figcaption className="em-eyebrow" style={{ marginTop: "28px" }}>
                — Haṭha Yoga Pradīpikā 2.22
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
              Shatkarma are the classical cleansing practices of Hatha Yoga. They gently cleanse and prepare the body for deeper pranayama and meditation.
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
                  The Six Classical Cleansing Actions
                </h2>

                <p className="em-body-p1">
                  The word Shatkarma comes from <em>shat</em>, meaning six, and <em>karma</em>, meaning action. The Hatha Yoga Pradipika describes these cleansing actions as preparation for the deeper practices of yoga. The yogis understood that a clear body supports a clear breath, and a clear breath supports a clear mind.
                </p>

                <p className="em-body-p2">
                  When physical channels are purified of stagnant waste and congestion, energy flows freely and the inner faculties become luminous. At OJALIS, the practices best suited to regular students are taught, such as Jala Neti, a gentle rinse of the nasal passages with lukewarm salt water using a neti pot; Kapalabhati, an active breathing practice that cleanses and energises; and Trataka, steady gazing at a candle flame, which refreshes the eyes and focuses the mind. The more advanced cleansing practices are taught in suitable situations, with close personal guidance.
                </p>
              </div>

              <div>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85"
                    alt="Shatkarma classical cleansing"
                    className="em-framed-img"
                    style={{ height: "360px" }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: "56px" }}>
              <p className="em-practices-title">
                The Six Classical Actions:
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
              <h2 className="em-section-heading">Personal Care & Precision</h2>
              <div className="em-guided-intro-grid">
                <p style={{ color: "#2c2426", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  Shatkarma calls for care and the correct method. At OJALIS, each technique is introduced one at a time, once your Breath Signature and health declaration show that you are ready.
                </p>
                <p style={{ color: "#6b6164", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  Your teacher first demonstrates the technique, explains its purpose, and then guides you through it step by step. Your teacher checks your method, the water and salt, your posture and your comfort, and helps you build the confidence to practise safely at home. Every technique is offered as preparation for pranayama and meditation, so it becomes part of a complete, balanced practice rather than a separate exercise.
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
            शुद्धि
          </span>

          <div className="em-container" style={{ maxWidth: "896px", textAlign: "center" }}>
            <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
              The OJALIS Perspective
            </p>

            <blockquote
              data-testid="perspective-quote"
              className="em-perspective-quote"
            >
              “We see cleansing as a way of preparing the ground — just as a farmer prepares the soil before planting, these practices prepare the body and breath for the deeper work of pranayama and meditation.”
            </blockquote>

            <p className="em-perspective-body">
              At OJALIS, we honour Shatkarma as a living part of the classical tradition. We teach it with respect for its depth and with clear, modern explanations, so each student understands both the method and its purpose. Our approach is careful and personal: the right practice, at the right time, for the right person.
            </p>

            <p className="em-perspective-body" style={{ marginTop: "16px" }}>
              Practised with guidance and patience, Shatkarma brings a sense of clarity and freshness that supports every other part of your yoga journey. It also teaches discipline and gentle attention to the body’s daily needs.
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
                <p className="em-eyebrow">The Cleansing Fruits</p>
                <h2 className="em-font-display em-gains-title">
                  What you gain with OJALIS
                </h2>
                <p className="em-gains-sub">
                  Cleanse the passages, clarify the vision, and discover the natural lightness that ancient masters considered essential for deep yoga.
                </p>

                <div data-testid="who-it-is-for-card" className="em-who-card">
                  <p className="em-who-tag">WHO IT IS FOR</p>
                  <p className="em-who-text">
                    Students who are ready to deepen their practice under the personal guidance of their teacher.
                  </p>
                </div>
              </div>

              {/* Right Column: 5 Gains List */}
              <div>
                <ul className="em-gains-list">
                  {[
                    "Clearer, freer breathing passages",
                    "Better readiness for pranayama",
                    "A feeling of lightness and freshness",
                    "Sharper focus and steadier eyes through Trataka",
                    "A deeper connection to the classical yoga tradition",
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
                शुद्धि
              </span>

              <div style={{ position: "relative", zIndex: 10 }}>
                <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
                  Begin Your Cleansing Journey
                </p>

                <h2 className="em-cta-title">
                  Ready to Experience the Clarity of Classical Cleansing?
                </h2>

                <p className="em-cta-subtitle">
                  Discover your Breath Signature or consult your teacher to begin your personal introduction to Shatkarma.
                </p>

                <div className="em-cta-btn-wrap">
                  <Link
                    data-testid="final-cta-book-button"
                    to="/book-session?program=Shatkarma"
                    className="em-btn em-btn-light"
                  >
                    Book a Session in Shatkarma
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

