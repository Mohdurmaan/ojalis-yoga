import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pranayama-emergent.css";

const PRACTICES = [
  { name: "Initial settling & Shavasana", desc: "resting comfortably on your back with light blanket and support" },
  { name: "Sankalpa (positive intention)", desc: "forming a short, heartfelt resolve that plants deeply in receptive awareness" },
  { name: "Rotation of consciousness", desc: "guiding awareness systematically through every part of the body to release held tension" },
  { name: "Breath awareness", desc: "witnessing the natural, unhurried flow of the breath without changing or controlling it" },
  { name: "Contrasting sensations", desc: "experiencing heaviness and lightness, warmth and coolness to harmonize brain hemispheres" },
  { name: "Calm visual journeys", desc: "soothing inner imagery that dissolves subconscious anxiety and awakens spacious stillness" },
  { name: "Gentle return & integration", desc: "softly returning to waking life feeling refreshed, light, and restored" },
];

const STEPS = [
  { n: "01", title: "Live guided sessions", text: "Guided live by your teacher, adapting the pace, words, and length to you personally." },
  { n: "02", title: "Gentle return to voice", text: "When your mind is busy, your teacher shows you how to return softly without effort or self-judgment." },
  { n: "03", title: "Meaningful Sankalpa", text: "Your teacher helps you discover an authentic resolve that grows stronger and clearer over time." },
  { n: "04", title: "Supports all practice", text: "Complements your pranayama, eases daily stress, and lays the ground for deep, peaceful nighttime sleep." },
  { n: "05", title: "Flexible ways to learn", text: "Available in regular classes, within The Wakeful Hours Cadence, or as a single restorative evening." },
];

const GAINS = [
  "Deep, restoring rest for body and mind",
  "Easier, more peaceful sleep",
  "A refreshed, clearer mind",
  "Release of tension held in the body",
  "A positive intention that grows stronger over time",
];

const FAQS = [
  {
    q: "What happens if I fall asleep during a Yoga Nidra session?",
    a: "Falling asleep is completely normal and very common, especially when your body carries chronic tiredness. Even if you fall asleep, your subconscious mind continues to hear the teacher's voice and release somatic tension. Over time, you learn to hover effortlessly in the sweet space between wakefulness and sleep.",
  },
  {
    q: "Do I need to do any physical stretching, postures, or flexibility exercises?",
    a: "No physical movement is required. You lie down in total comfort on a cushioned mat in Shavasana (corpse pose), with a bolster under your knees, a pillow for your head, and a warm blanket. You only need to lie down, listen, and allow.",
  },
  {
    q: "How does 30 to 45 minutes of Yoga Nidra compare to regular night sleep?",
    a: "Because your brainwaves gently shift into alpha and theta rhythms during guided conscious rest, 30 to 45 minutes of Yoga Nidra can provide physiological recovery and nervous system rejuvenation comparable to several hours of conventional, restless sleep.",
  },
  {
    q: "How do I choose my Sankalpa (positive intention)?",
    a: "A Sankalpa is a short, clear positive statement in the present tense (such as 'I am peaceful and steady' or 'I am healthy and strong'). Your teacher guides you in discovering a meaningful resolve that aligns with your life and deepens with practice.",
  },
  {
    q: "Can I attend Yoga Nidra online from my own bed or home?",
    a: "Yes. Many students find online sessions from home especially wonderful, as they can practice directly in their bedroom or living room and drift into undisturbed rest immediately after the session finishes.",
  },
];

export default function YogaNidraLanding() {
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
            योगनिद्रा
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
                    योग निद्रा · Yoga Nidrā
                  </span>
                </p>

                <h1 className="em-hero-title">
                  What OJALIS Teaches — <span className="italic-gold">Yoga Nidra</span>
                </h1>

                <p className="em-hero-desc">
                  Deep, guided rest — the yogic sleep.
                </p>

                <div className="em-hero-ctas">
                  <Link
                    data-testid="hero-book-session-button"
                    to="/book-session?program=Yoga%20Nidra"
                    className="em-btn"
                  >
                    Book a Session in Yoga Nidra
                  </Link>
                </div>
              </div>

              {/* Right Column: Framed Photo + Floating Badge */}
              <div style={{ position: "relative" }}>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85"
                    alt="Yoga Nidra — deep, conscious yogic rest at OJALIS"
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
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        color: "#4f6144",
                      }}
                    >
                      CONSCIOUS YOGIC REST
                    </span>
                    <span style={{ display: "block", fontSize: "14px", color: "#6b6164" }}>
                      Deep, Guided Healing Sleep
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
                विच्छिन्नसंकल्पविकल्पमूले निःशेषनिर्मूलितकर्मजाले ।<br />
                निरन्तराभ्यासनितान्तभद्रा सा जृम्भते योगिनि योगनिद्रा ॥
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
                “When the roots of restless thought are released and mental agitation subsides, Yoga Nidra blossoms as pure healing rest.”
              </blockquote>

              <figcaption className="em-eyebrow" style={{ marginTop: "28px" }}>
                — Yoga Tārāvalī of Ādi Śaṅkarācārya (Verse 25)
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
              Yoga Nidra is a guided practice of deep rest. You lie down comfortably and simply listen, while your body rests deeply and your mind stays gently aware.
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
                  You only need to lie down, listen and allow
                </h2>

                <div className="em-what-paragraphs">
                  <p>
                    Yoga Nidra means “yogic sleep”. It is practised lying on your back in a comfortable position, usually in Shavasana, with a light blanket if you wish. A teacher’s voice guides your attention gently through the body, the breath, feelings and images. Your body moves into a state of deep rest, much like sleep, while a quiet part of your mind remains softly aware.
                  </p>
                  <p>
                    A session flows through a few gentle stages. First you settle and relax. Then you form a sankalpa, a short positive intention for your life. Your attention is guided around the body, part by part, then to the natural breath, to contrasting sensations such as warmth and coolness, and to calm images. Finally you are guided back slowly, feeling refreshed and light.
                  </p>
                  <p style={{ marginTop: "16px" }}>
                    It is one of the simplest practices in all of yoga. You only need to lie down, listen and allow.
                  </p>
                </div>
              </div>

              {/* Right Column: Visual Photo */}
              <div>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=85"
                    alt="Restful Shavasana practice with light and warmth"
                    className="em-framed-img"
                    style={{ height: "360px" }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: "56px" }}>
              <p className="em-practices-title">
                The Stages of the Journey:
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
                Guided live by your teacher, in a calm and quiet space
              </h2>
            </div>

            <div className="em-guided-intro-grid">
              <div>
                <p style={{ color: "#2c2426", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  At OJALIS, Yoga Nidra is guided live by your teacher, in a calm and quiet space. The teacher adapts the pace, the words and the length of each practice to the group, or to you personally. If your mind is busy, your teacher shows you how to return gently to the voice, so the practice becomes easier and deeper each time.
                </p>
              </div>

              <div>
                <p style={{ color: "#6b6164", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  Your teacher also helps you choose a meaningful sankalpa and shows you how Yoga Nidra supports your other practices, especially pranayama and restful sleep. It is offered within regular classes, within The Wakeful Hours Cadence, and as A Single Evening of Yoga Nidra for anyone who simply wants to experience it.
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
            चेतना
          </span>

          <div className="em-container" style={{ maxWidth: "896px", position: "relative" }}>
            <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
              The OJALIS Perspective
            </p>

            <blockquote className="em-perspective-quote">
              “Rest is a skill worth learning. Modern life gives us plenty of activity and very little true rest; Yoga Nidra offers a different kind of rest — conscious, deep and restoring.”
            </blockquote>

            <p className="em-perspective-body">
              We teach it as a gift you can return to whenever you need it. With regular practice, deep relaxation tends to become easier to reach, both during Yoga Nidra and in everyday life. Our hope is that you leave each session feeling lighter, clearer and more at home in yourself.
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
                  Conscious, deep and restoring rest
                </h2>

                <div className="em-who-card">
                  <p className="em-who-tag">Who it is for</p>
                  <p className="em-who-text">
                    <span style={{ fontWeight: 600 }}>Almost everyone</span> — especially people who feel tired, or whose mind stays busy long after the day is done.
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
                योगनिद्रा
              </span>

              <div style={{ position: "relative" }}>
                <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
                  Begin Today
                </p>

                <h2 className="em-cta-title">
                  Give yourself the gift of deep, conscious rest
                </h2>

                <p className="em-cta-subtitle">
                  A guided practice where you only need to lie down, listen and allow yourself to return home in your body.
                </p>

                <div className="em-cta-btn-wrap">
                  <Link
                    data-testid="final-cta-book-button"
                    to="/book-session?program=Yoga%20Nidra"
                    className="em-btn em-btn-light"
                  >
                    Book a Session in Yoga Nidra
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

