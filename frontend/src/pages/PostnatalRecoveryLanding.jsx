import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pranayama-emergent.css";

const PRACTICES = [
  {
    name: "Deep Belly Breathing (Centre Reconnection)",
    desc: "Calming the diaphragm, lowering the breath back into the belly, and softly soothing the postpartum nervous system after months of high chest breathing.",
  },
  {
    name: "Gentle Pelvic Floor Awareness",
    desc: "Subtle upward engagement drawn gently on each exhalation, restoring muscle tone, sensation, and support without downward intra-abdominal pressure.",
  },
  {
    name: "Neck, Shoulder & Upper Back Relief",
    desc: "Easy joint movements and restorative openings to release the chronic tightness caused by long hours of feeding, holding, and carrying your baby.",
  },
  {
    name: "Gentle Core Rebuilding & Diastasis Care",
    desc: "Simple, safe postures that protect the linea alba, support gradual healing of abdominal separation, and stabilize the lumbopelvic cylinder.",
  },
  {
    name: "Pelvic Stability & Postural Rebalancing",
    desc: "Foundational alignment exercises that re-centre the pelvis, stabilize the sacroiliac joints, and rebuild posture as carrying weight changes.",
  },
  {
    name: "Restful Yoga Nidra & Sleep Replenishment",
    desc: "Profound guided relaxation that helps replenish broken sleep, reduces maternal exhaustion, and restores calm, centered vitality.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Doctor's clearance first",
    text: "We begin once your doctor confirms readiness for gentle exercise, respecting individual natural or caesarean healing timelines.",
  },
  {
    n: "02",
    title: "Shaped around your birth experience",
    text: "Your Breath Signature and health history help your teacher adapt every movement to your birth journey, energy, and comfort.",
  },
  {
    n: "03",
    title: "Introduced step by step",
    text: "The journey unfolds in three mindful stages: first rest and reconnection, then gentle rebuilding, and finally foundational strengthening.",
  },
  {
    n: "04",
    title: "Vulnerable areas protected",
    text: "Stronger practices such as Kapalabhati and abdominal locks are carefully kept for later, once your core and pelvic floor are ready.",
  },
  {
    n: "05",
    title: "Fits around your baby's routine",
    text: "Offered one-to-one or in intimate small groups, in person or live online, so your practice adapts flexibly around feeding and sleep.",
  },
];

const FAQS = [
  {
    q: "When can I begin Postnatal Recovery sessions?",
    a: "We begin once your doctor gives you clinical clearance for gentle exercise — typically around 6 weeks following a natural vaginal birth, and 8 to 12 weeks following a caesarean birth. In the earliest weeks, gentle breath awareness and resting Yoga Nidra can be enjoyed at home.",
  },
  {
    q: "How is the practice adapted after a Caesarean birth?",
    a: "After a caesarean, the healing timeline is longer and more gradual. We avoid any strain across the surgical scar, avoid early abdominal extension, and begin purely with gentle diaphragmatic breathing, shoulder releases, and gradual pelvic floor connection, strictly honoring your doctor's timeline.",
  },
  {
    q: "Can I bring my baby or feed during the session?",
    a: "Absolutely. Our postnatal sessions are designed with total compassion for the realities of new motherhood. If your baby needs to feed, be soothed, or be changed, you can pause at any moment without hesitation.",
  },
  {
    q: "How does this practice address Diastasis Recti (abdominal separation)?",
    a: "We avoid traditional crunches and twisting planks that worsen abdominal separation by forcing the linea alba outward. Instead, we teach breath-led deep transverse abdominis engagement on exhalations, which draws the abdominal muscles toward the midline safely.",
  },
  {
    q: "Are sessions offered online or in person?",
    a: "Sessions are available both at our peaceful Gurugram studio and via live interactive video. Many new mothers choose online sessions so they can practice comfortably in the sanctuary of their own home without travel stress.",
  },
];

export default function PostnatalRecoveryLanding() {
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
            सूतिका
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
                    सूतिका परिचर्या · Sūtikā Paricaryā
                  </span>
                </p>

                <h1 className="em-hero-title">
                  What OJALIS Teaches — <span className="italic-gold">Postnatal Recovery</span>
                </h1>

                <p className="em-hero-desc">
                  Gentle rebuilding after childbirth, at the pace your body sets.
                </p>

                <div className="em-hero-ctas">
                  <Link
                    data-testid="hero-book-session-button"
                    to="/book-session?program=Postnatal%20Recovery"
                    className="em-btn"
                  >
                    Book a Session in Postnatal Recovery
                  </Link>
                </div>
              </div>

              {/* Right Column: Framed Photo + Floating Badge */}
              <div style={{ position: "relative" }}>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85"
                    alt="Postnatal Recovery — gentle rebuilding after childbirth"
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
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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
                      MATERNAL RESTORATION
                    </span>
                    <span style={{ display: "block", fontSize: "14px", color: "#6b6164" }}>
                      At the Pace Your Own Body Sets
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
                मातृस्वास्थ्यं मूलं सर्वजीवनस्य ॥
                <br />
                विश्रामेण प्राणेन च पुनर्नवा भवति नारी ॥
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
                “The mother’s restoration is the sacred foundation of all life; through gentle rest and breath, she is renewed.”
              </blockquote>

              <figcaption className="em-eyebrow" style={{ marginTop: "28px" }}>
                — Kāśyapa Saṃhitā, Sūtikā Paricaryā
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
              Gentle breathing and movement that help a new mother rebuild strength, posture and energy after childbirth — always at the pace her own body sets.
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
                  Kindness & Careful Rebuilding After Childbirth
                </h2>

                <p className="em-body-p1">
                  Pregnancy and childbirth are among the most remarkable journeys a body can make. Over many months the body changes shape, the breath moves higher into the chest, the deep core and pelvic floor stretch to make room, and posture adjusts to carry new weight.
                </p>

                <p className="em-body-p2">
                  After the birth come new rhythms: feeding, carrying, broken sleep and a whole new life to care for. Postnatal Recovery at OJALIS begins with the breath: deep, calm belly breathing that reconnects you with your centre, and soft awareness of the pelvic floor drawn gently upward on each exhale.
                </p>
              </div>

              <div>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85"
                    alt="Postnatal recovery and gentle rebuilding"
                    className="em-framed-img"
                    style={{ height: "360px" }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: "56px" }}>
              <p className="em-practices-title">
                Core Elements of Recovery:
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
              <h2 className="em-section-heading">Gentle Progression</h2>
              <div className="em-guided-intro-grid">
                <p style={{ color: "#2c2426", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  OJALIS begins Postnatal Recovery once your doctor confirms you are ready for gentle exercise. Your Breath Signature and health details help shape the practice around your birth experience, energy, and comfort.
                </p>
                <p style={{ color: "#6b6164", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  Your teacher introduces each stage step by step: first rest and reconnection, then gentle rebuilding, then strengthening. Stronger practices such as Kapalabhati are kept for later, once your body is fully ready.
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
            मातृ
          </span>

          <div className="em-container" style={{ maxWidth: "896px", textAlign: "center" }}>
            <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
              The OJALIS Perspective
            </p>

            <blockquote
              data-testid="perspective-quote"
              className="em-perspective-quote"
            >
              “At OJALIS, we see the postnatal months as a time for gentle rebuilding, guided by patience. Every mother’s journey is unique, and every body recovers in its own time.”
            </blockquote>

            <p className="em-perspective-body">
              We encourage mothers to let go of comparison and outside timelines, and to listen closely to what their own body is asking for. The breath is the perfect guide for this: it shows when to move, when to rest and when to go a little further.
            </p>

            <p className="em-perspective-body" style={{ marginTop: "16px" }}>
              Our hope is that each session offers a quiet moment for the mother herself — a time to breathe, recover and feel strong again, so she can care for her baby with renewed energy and calm.
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
                <p className="em-eyebrow">The Healing Gifts</p>
                <h2 className="em-font-display em-gains-title">
                  What you gain with OJALIS
                </h2>
                <p className="em-gains-sub">
                  Restoring physical integrity, calming postpartum exhaustion, and creating quiet moments of replenishment for you.
                </p>

                <div data-testid="who-it-is-for-card" className="em-who-card">
                  <p className="em-who-tag">WHO IT IS FOR</p>
                  <p className="em-who-text">
                    New mothers who have received their doctor’s clearance for gentle exercise, after a natural or caesarean birth.
                  </p>
                </div>
              </div>

              {/* Right Column: 5 Gains List */}
              <div>
                <ul className="em-gains-list">
                  {[
                    "Renewed core strength and posture",
                    "Gentle reconnection with the pelvic floor",
                    "Relief for the shoulders and upper back",
                    "Deeper rest and steadier energy",
                    "Quiet, restoring time for yourself",
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
                मातृ
              </span>

              <div style={{ position: "relative", zIndex: 10 }}>
                <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
                  Begin Your Maternal Renewal
                </p>

                <h2 className="em-cta-title">
                  Ready to Rebuild at the Pace Your Body Sets?
                </h2>

                <p className="em-cta-subtitle">
                  Connect with our gentle teachers once you have doctor's clearance to shape a recovery practice centered entirely around you and your baby.
                </p>

                <div className="em-cta-btn-wrap">
                  <Link
                    data-testid="final-cta-book-button"
                    to="/book-session?program=Postnatal%20Recovery"
                    className="em-btn em-btn-light"
                  >
                    Book a Session in Postnatal Recovery
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

