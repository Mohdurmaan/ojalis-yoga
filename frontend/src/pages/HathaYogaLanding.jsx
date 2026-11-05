import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pranayama-emergent.css";

const PRACTICES = [
  { name: "Standing alignment (Tadasana)", desc: "grounding through the feet, balancing posture and lengthening the spine" },
  { name: "Gentle forward bends (Paschimottanasana)", desc: "releasing the lower back and hamstrings while calming the heart" },
  { name: "Heart-opening backbends (Bhujangasana)", desc: "strengthening spinal extensors and expanding respiratory capacity" },
  { name: "Gentle spinal twists (Vakrasana)", desc: "massaging abdominal organs, releasing spinal tension, and easing stiffness" },
  { name: "Balancing postures (Vrikshasana)", desc: "anchoring mental focus and cultivating quiet physical equilibrium" },
  { name: "Breath-synchronised transitions", desc: "moving smoothly into and out of postures led entirely by inhalation and exhalation" },
  { name: "Deep conscious relaxation (Shavasana)", desc: "allowing muscles to integrate the benefits of practice in complete stillness" },
];

const STEPS = [
  { n: "01", title: "Breath Signature", text: "Your practice begins with understanding where your breath restricts and where tension gathers." },
  { n: "02", title: "Breath-led movement", text: "You learn to move into each posture with the breath, stay with awareness, and release with ease." },
  { n: "03", title: "Personal adaptations", text: "Every posture is adapted with props, a wall, or a chair so you practice safely and comfortably." },
  { n: "04", title: "Small group care", text: "Your teacher watches each student closely, explains the purpose of each pose, and offers gentle cues." },
  { n: "05", title: "Step-by-step depth", text: "Advanced postures open naturally at your own pace when your body and breath are truly ready." },
];

const GAINS = [
  "Strength and flexibility in balance",
  "Better posture and a stronger back",
  "Improved balance and body awareness",
  "Steadier energy and a calmer mind",
  "A safe, guided path towards advanced practice",
];

const FAQS = [
  {
    q: "I am stiff and not flexible at all — can I still practice Hatha Yoga at OJALIS?",
    a: "Yes, absolutely. At OJALIS, we value the quality of your attention far above the shape of the pose. Postures are adapted to your current range of motion using blocks, straps, or chairs so you can practice with dignity, comfort, and zero strain. Flexibility develops naturally with patient, breath-led practice.",
  },
  {
    q: "How is Hatha Yoga at OJALIS different from fast-paced gym yoga or Vinyasa flow?",
    a: "Many modern classes rush through 30 to 40 poses with heavy sweat and loud music. At OJALIS, Hatha Yoga is unhurried and breath-led. Fewer postures, held well and aligned with the breath, bring deeper muscular strength, spinal health, and mental poise than rapid sequences ever could.",
  },
  {
    q: "Can postures be modified if I have back pain, knee issues, or neck stiffness?",
    a: "Yes. Because every session begins with your personal Breath Signature, your teacher identifies somatic holding patterns. Sequences are tailored to protect vulnerable joints, relieve chronic spinal tension, and strengthen stabilizing core muscles safely.",
  },
  {
    q: "How are advanced postures like deep backbends, headstands, or arm balances introduced?",
    a: "Advanced postures are never rushed or performed for performance's sake. They are introduced when a student explicitly expresses a wish to explore them, and when the teacher observes that the foundation, breath control, and muscular stability are completely ready.",
  },
  {
    q: "Are classes available in person in Gurugram and online?",
    a: "Yes, classes are offered in intimate small groups or one-to-one, in person at our Gurugram studio as well as live online for students across India and around the world.",
  },
];

export default function HathaYogaLanding() {
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
            हठयोग
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
                    हठ योग · Haṭha Yoga
                  </span>
                </p>

                <h1 className="em-hero-title">
                  What OJALIS Teaches — <span className="italic-gold">Hatha Yoga</span>
                </h1>

                <p className="em-hero-desc">
                  Slow, breath-led postures that bring strength and ease.
                </p>

                <div className="em-hero-ctas">
                  <Link
                    data-testid="hero-book-session-button"
                    to="/book-session?program=Hatha%20Yoga"
                    className="em-btn"
                  >
                    Book a Session in Hatha Yoga
                  </Link>
                </div>
              </div>

              {/* Right Column: Framed Photo + Floating Badge */}
              <div style={{ position: "relative" }}>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=85"
                    alt="Hatha Yoga — classical breath-led postures at OJALIS"
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
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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
                      BREATH-LED ASANAS
                    </span>
                    <span style={{ display: "block", fontSize: "14px", color: "#6b6164" }}>
                      Strength, Ease & Inner Stillness
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
                हकारः कीर्तितः सूर्यष्ठकारश्चन्द्र उच्यते ।<br />
                सूर्याचन्द्रमसोर्योगो हठयोगो निगद्यते ॥
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
                “Ha is called the sun, and Tha is called the moon. The union of the sun and the moon is called Hatha Yoga.”
              </blockquote>

              <figcaption className="em-eyebrow" style={{ marginTop: "28px" }}>
                — Siddha Siddhānta Paddhati of Gorakṣanātha
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
              Hatha Yoga is the classical system of yoga postures. At OJALIS it is slow and breath-led: the breath guides every movement, and each posture is held with awareness.
            </p>
          </div>
        </section>

        {/* =========================================================================
            4. WHAT IT IS (FROM PDF PAGE 1 & 2)
            ========================================================================= */}
        <section className="em-sec-what">
          <div className="em-container">
            <div className="em-what-grid">
              {/* Left Column: Text */}
              <div>
                <p className="em-eyebrow">What It Is</p>
                <h2 className="em-section-heading">
                  Fewer postures held well, where the breath leads
                </h2>

                <div className="em-what-paragraphs">
                  <p>
                    Hatha Yoga is the traditional path of body and breath, described in classic texts such as the Hatha Yoga Pradipika. The word is often explained as ha, the sun, and tha, the moon — the balance of active and calm energy within us. Hatha Yoga includes asanas (postures), pranayama, cleansing practices and relaxation, all working together.
                  </p>
                  <p>
                    At OJALIS, Hatha Yoga is practised slowly. You move into each posture with the breath, stay in it with awareness, and release it with the breath. Fewer postures, held well, bring more benefit than many postures rushed. Foundation practice includes standing postures such as Tadasana, gentle forward bends, backbends such as Bhujangasana, twists, balancing postures, and deep relaxation in Shavasana.
                  </p>
                </div>
              </div>

              {/* Right Column: Visual Photo */}
              <div>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85"
                    alt="Classical mindful Hatha Yoga practice"
                    className="em-framed-img"
                    style={{ height: "360px" }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Advanced Postures Note from PDF Page 2 */}
            <div
              style={{
                marginTop: "36px",
                padding: "20px 24px",
                borderRadius: "1rem",
                border: "1px solid rgba(197, 155, 75, 0.35)",
                backgroundColor: "rgba(252, 251, 249, 0.9)",
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
              }}
            >
              <span style={{ color: "#9b7328", fontSize: "18px", marginTop: "1px" }}>★</span>
              <p style={{ margin: 0, fontSize: "15px", color: "#2c2426", lineHeight: 1.65 }}>
                <span style={{ fontWeight: 600 }}>Advanced postures</span> — such as deeper backbends, inversions and arm balances — are introduced when a student asks for them, and when the teacher sees that the body and breath are ready.
              </p>
            </div>

            <div style={{ marginTop: "56px" }}>
              <p className="em-practices-title">
                Foundation Practices You Will Learn:
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
            5. HOW OJALIS GUIDES YOU (FROM PDF PAGE 2)
            ========================================================================= */}
        <section className="em-sec-guided">
          <div className="em-container">
            <div>
              <p className="em-eyebrow">How OJALIS Guides You</p>
              <h2 className="em-section-heading" style={{ maxWidth: "768px" }}>
                Your Breath Signature shapes your practice
              </h2>
            </div>

            <div className="em-guided-intro-grid">
              <div>
                <p style={{ color: "#2c2426", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  Your Breath Signature shapes your practice. Your teacher knows where your breath restricts and where tension gathers, and builds a sequence around it. Every posture can be adapted with props, a wall or a chair, so each student practises safely and comfortably.
                </p>
              </div>

              <div>
                <p style={{ color: "#6b6164", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  In small groups, your teacher watches each person, offers gentle corrections, and explains the purpose of every posture in simple words. Progress follows your own pace and your own wishes, and deeper practice opens step by step, whenever you feel ready to explore it.
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
            स्थिरता
          </span>

          <div className="em-container" style={{ maxWidth: "896px", position: "relative" }}>
            <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
              The OJALIS Perspective
            </p>

            <blockquote className="em-perspective-quote">
              “At OJALIS, we see Hatha Yoga as a conversation between the body and the breath. The aim is a posture that feels steady and comfortable: sthira sukham asanam.”
            </blockquote>

            <p className="em-perspective-body">
              Depth comes naturally with patience. We value the quality of your attention above the shape of the pose, so every student — flexible or stiff, young or older — can practise with dignity and joy. When the time is right, we guide you into advanced postures with the same care. Each class aims to leave you both stronger and calmer, the true sign of balanced Hatha practice.
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
                  Strength and ease in equal measure
                </h2>

                <div className="em-who-card">
                  <p className="em-who-tag">Who it is for</p>
                  <p className="em-who-text">
                    <span style={{ fontWeight: 600 }}>Beginners, regular practitioners, and experienced students</span> who wish to explore advanced postures with personal guidance.
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
                हठयोग
              </span>

              <div style={{ position: "relative" }}>
                <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
                  Begin Today
                </p>

                <h2 className="em-cta-title">
                  Experience the classical union of body and breath
                </h2>

                <p className="em-cta-subtitle">
                  A patient, breath-led practice where fewer postures, held well, bring lasting strength and calm.
                </p>

                <div className="em-cta-btn-wrap">
                  <Link
                    data-testid="final-cta-book-button"
                    to="/book-session?program=Hatha%20Yoga"
                    className="em-btn em-btn-light"
                  >
                    Book a Session in Hatha Yoga
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

