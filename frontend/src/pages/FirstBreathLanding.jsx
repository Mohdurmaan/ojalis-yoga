import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pranayama-emergent.css";

const PRACTICES = [
  {
    name: "Mindful Sun Salutation Flow (Surya Namaskar)",
    desc: "A graceful, 12-movement sequence tailored to growing bodies, honoring the sun with balanced forward folds, gentle backbends, and core stability.",
  },
  {
    name: "Breath-Joined Movement (Swasa Sahita)",
    desc: "Pairing every stretch with an in-breath and every fold with an out-breath, transforming exercise into an unhurried practice of noticing.",
  },
  {
    name: "Spinal Alignment & Natural Posture",
    desc: "Protecting growing joints, opening tight chests, and gently correcting the slouching posture caused by heavy schoolbags and screens.",
  },
  {
    name: "Traditional Surya Mantras & Cultural Wonder",
    desc: "Introducing children to the melodic names of the sun (Mitraya, Ravaye, Suryaya...), connecting them with a beautiful sense of heritage and meaning.",
  },
  {
    name: "Playful Balance & Coordination",
    desc: "Animal-inspired shapes and joyful balance challenges that build proprioception, muscular symmetry, and body awareness.",
  },
  {
    name: "Calm Savasana & Stillness (Quiet Time)",
    desc: "A soft, restorative resting period at the close of practice where active young nervous systems absorb the benefits and find deep peaceful calm.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Postures learned slowly & correctly",
    text: "Children first discover each posture at their own pace, focusing on safety, comfort, and good natural alignment.",
  },
  {
    n: "02",
    title: "Learning the breath for each shape",
    text: "Next, the child learns which movement opens with an inhale and which relaxes with an exhale, building internal rhythm.",
  },
  {
    n: "03",
    title: "Joining into one smooth flow",
    text: "Posture and breath weave together into one seamless, rhythmic salutation free from mechanical counting or rushing.",
  },
  {
    n: "04",
    title: "Playful & competition-free space",
    text: "Your teacher keeps classes encouraging and lighthearted, where every child’s effort is appreciated and individuality is celebrated.",
  },
  {
    n: "05",
    title: "A joyful family morning ritual",
    text: "Parents receive simple, practical guidance so the practice can continue happily at home — often enjoyed together as a family.",
  },
];

const FAQS = [
  {
    q: "What age group is The First Breath designed for?",
    a: "The program is specifically tailored for children aged 5 to 14 years. Movements and teaching vocabulary are adjusted dynamically to match the developmental stage, attention span, and motor skills of younger children and pre-teens alike.",
  },
  {
    q: "How does this differ from school sports or fast calisthenics?",
    a: "In schools and gyms, Surya Namaskar is frequently counted rapidly as high-speed cardio. At OJALIS, it is taught as an inward practice of noticing. Moving with the breath calms the nervous system, enhances school focus, and prevents joint strain during growth spurts.",
  },
  {
    q: "What if my child is very energetic, restless, or has trouble sitting still?",
    a: "Yoga is ideal for energetic children! We do not ask children to sit rigidly in silence. Instead, we channel their natural vibrancy through fluid, expressive movements and creative imagery, naturally bringing them into focus and grounded calm.",
  },
  {
    q: "Can parents practice together with their children?",
    a: "Yes! Family practice is one of the most rewarding aspects of The First Breath. We offer family sessions and provide easy-to-follow visual guides so morning Surya Namaskar becomes a joyful, bonding household ritual.",
  },
  {
    q: "Are classes offered in person or online?",
    a: "Classes are held both at our serene Gurugram studio in small, attentive groups and via live interactive online sessions where teachers provide personal posture feedback in real time.",
  },
];

export default function FirstBreathLanding() {
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
            सूर्य
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
                    सूर्य नमस्कार · Sūrya Namaskāra
                  </span>
                </p>

                <h1 className="em-hero-title">
                  What OJALIS Teaches — <span className="italic-gold">The First Breath</span>
                </h1>

                <p className="em-hero-desc">
                  Surya Namaskar, taught to children with the breath first.
                </p>

                <div className="em-hero-ctas">
                  <Link
                    data-testid="hero-book-session-button"
                    to="/book-session?program=The%20First%20Breath"
                    className="em-btn"
                  >
                    Book a Session in The First Breath
                  </Link>
                </div>
              </div>

              {/* Right Column: Framed Photo + Floating Badge */}
              <div style={{ position: "relative" }}>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85"
                    alt="The First Breath — Surya Namaskar for children taught with the breath first"
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
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
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
                      THE BREATH-FIRST SUN SALUTATION
                    </span>
                    <span style={{ display: "block", fontSize: "14px", color: "#6b6164" }}>
                      Joyful Movement for Growing Bodies
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
                सूर्यस्य नमस्कारं ये कुर्वन्ति दिने दिने ॥
                <br />
                आयुः प्रज्ञा बलं वीर्यं तेजस्तेषां च जायते ॥
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
                “Those who salute the Sun day after day with mindful breath receive long life, radiant health, wisdom and luminous vitality.”
              </blockquote>

              <figcaption className="em-eyebrow" style={{ marginTop: "28px" }}>
                — Sūrya Namaskāra Paddhati
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
              Surya Namaskar, the Sun Salutation, taught to children the OJALIS way: every movement joined to its own breath, learned gently and correctly.
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
                  The Sun of Life Taught Breath-First
                </h2>

                <p className="em-body-p1">
                  Surya Namaskar is a flowing sequence of yoga postures traditionally practised to honour the sun, the source of light and energy. It stretches and strengthens the whole body: the spine bends forward and back, the arms and legs work, and the chest opens.
                </p>

                <p className="em-body-p2">
                  Children are often taught Surya Namaskar as a fast exercise, counted and rushed. At OJALIS, it is taught as a practice of noticing. Each movement is joined to its own inhale or exhale, so a child learns to move with the breath. This builds awareness, rhythm and calm at the age when good habits form most naturally.
                </p>
              </div>

              <div>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85"
                    alt="Surya Namaskar for children taught breath first"
                    className="em-framed-img"
                    style={{ height: "360px" }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: "56px" }}>
              <p className="em-practices-title">
                Pillars of the First Breath:
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
              <h2 className="em-section-heading">Playful, Encouraging Guidance</h2>
              <div className="em-guided-intro-grid">
                <p style={{ color: "#2c2426", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  OJALIS teaches The First Breath step by step. Children first learn each posture slowly and correctly, then learn the breath for each posture, and finally join them into one smooth flow.
                </p>
                <p style={{ color: "#6b6164", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  Your teacher keeps the class playful and encouraging, in a calm space free from competition. Small groups or one-to-one sessions allow personal attention, and parents receive simple tips so children can enjoy the practice at home.
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
            सूर्य
          </span>

          <div className="em-container" style={{ maxWidth: "896px", textAlign: "center" }}>
            <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
              The OJALIS Perspective
            </p>

            <blockquote
              data-testid="perspective-quote"
              className="em-perspective-quote"
            >
              “At OJALIS, we believe the first lessons a child learns in yoga shape how they will feel about it for life. When those lessons are joyful, patient and connected to the breath, yoga becomes a lifelong friend.”
            </blockquote>

            <p className="em-perspective-body">
              The First Breath gives children an early experience of moving with awareness — a gift that supports their focus in school, their calm at home and their health as they grow. We teach it with warmth and respect for each child’s pace, celebrating progress of every size.
            </p>

            <p className="em-perspective-body" style={{ marginTop: "16px" }}>
              In this way, a simple morning practice can grow into a lifelong love of yoga. It also connects children to a beautiful part of Indian tradition, in a way they can understand and enjoy.
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
                <p className="em-eyebrow">Lifelong Blessings</p>
                <h2 className="em-font-display em-gains-title">
                  What you gain with OJALIS
                </h2>
                <p className="em-gains-sub">
                  Planting the seeds of rhythm, strength, and inner calm early in life through joyful, breath-led movement.
                </p>

                <div data-testid="who-it-is-for-card" className="em-who-card">
                  <p className="em-who-tag">WHO IT IS FOR</p>
                  <p className="em-who-text">
                    Young children beginning yoga, and parents looking for a calm, joyful activity for them.
                  </p>
                </div>
              </div>

              {/* Right Column: 5 Gains List */}
              <div>
                <ul className="em-gains-list">
                  {[
                    "Better body awareness and posture",
                    "Improved focus and calm",
                    "Flexibility and strength in a growing body",
                    "Joy in movement",
                    "A healthy daily habit learned early",
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
                सूर्य
              </span>

              <div style={{ position: "relative", zIndex: 10 }}>
                <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
                  Begin a Lifelong Friendship with Yoga
                </p>

                <h2 className="em-cta-title">
                  Ready to Introduce Your Child to the Breath-First Sun Salutation?
                </h2>

                <p className="em-cta-subtitle">
                  Connect with our warm, encouraging teachers to schedule a joyful session tailored for your child or your family.
                </p>

                <div className="em-cta-btn-wrap">
                  <Link
                    data-testid="final-cta-book-button"
                    to="/book-session?program=The%20First%20Breath"
                    className="em-btn em-btn-light"
                  >
                    Book a Session in The First Breath
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

