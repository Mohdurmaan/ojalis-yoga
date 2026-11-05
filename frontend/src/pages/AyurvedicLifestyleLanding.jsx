import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pranayama-emergent.css";

const PRACTICES = [
  {
    name: "Calm Morning Routine (Pratah Charya)",
    desc: "Awakening gently, hydrating with warm water, and establishing a grounded, centered state of mind before digital demands begin.",
  },
  {
    name: "Mindful Regular Meals (Ahara Niyama)",
    desc: "Eating nourishing meals at consistent times, honouring your digestive fire (Agni), and eating with calm presence rather than multitasking.",
  },
  {
    name: "Lighter Evening Nourishment (Laghu Ahara)",
    desc: "Enjoying warm, easily digestible dinners at least two to three hours before bedtime to protect nighttime digestion and sleep quality.",
  },
  {
    name: "Daily Movement & Breath Breaks",
    desc: "Integrating brief micro-movements, conscious posture resets, and steady breathing intervals throughout desk-bound working hours.",
  },
  {
    name: "Gentle Evening Wind-Down",
    desc: "Stepping away from blue screens, dimming harsh room lights, and preparing the nervous system for natural, restorative circadian sleep.",
  },
  {
    name: "Seasonal Adjustments (Ritucharya)",
    desc: "Mindfully adapting food textures, hydration temperatures, and lifestyle habits to harmonize with the changing external seasons.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Shaped around your real life",
    text: "Tailored realistically around demanding jobs, business travel, family commitments, and urban living without impractical rules.",
  },
  {
    n: "02",
    title: "One or two small steps at a time",
    text: "Your teacher suggests small, realistic adjustments, introduced gradually so new habits settle in comfortably and last for life.",
  },
  {
    n: "03",
    title: "Hand in hand with yoga practice",
    text: "Pranayama, asana, and Yoga Nidra each support the rhythm you are building, forming a complete and unified tapestry of health.",
  },
  {
    n: "04",
    title: "Practical, kind mentorship",
    text: "Every recommendation is explained in plain language, so you understand why it helps and can freely choose what suits your life.",
  },
  {
    n: "05",
    title: "Working alongside your doctor",
    text: "Guidance for healthy everyday living that respects your medical care, always directing you toward medical support when needed.",
  },
];

const FAQS = [
  {
    q: "Do I have to follow strict diets or give up my favourite foods?",
    a: "Not at all. The OJALIS perspective on Ayurveda is practical and kind. We avoid rigid dogmas and extreme cleanses. Instead, we focus on simple timing improvements, mindful eating habits, and small adjustments to when and how you eat so that meals feel comforting and energising.",
  },
  {
    q: "How does this guidance adapt to long corporate work hours and frequent travel?",
    a: "We start from the life you actually live. If you work late or travel frequently, your teacher helps identify micro-anchors — such as a 5-minute morning hydration ritual, smarter travel snack choices, and simple evening breathing routines that keep your rhythm steady anywhere in the world.",
  },
  {
    q: "What is the difference between Dinacharya and ordinary time management?",
    a: "Time management organizes tasks around a clock; Dinacharya synchronizes your biology with nature's circadian rhythms. It aligns your digestive fire with the sun's peak, your deep rest with the quiet hours, and your mental focus with optimal physiological windows.",
  },
  {
    q: "Does Ayurvedic lifestyle guidance replace medical care or doctors' advice?",
    a: "No. Lifestyle guidance is designed for everyday preventive wellbeing and healthy rhythm building. It works harmoniously alongside your physician's clinical care. Your teacher will gladly recommend clinical medical consultation whenever individual medical care is indicated.",
  },
  {
    q: "How are Vata, Pitta, and Kapha used in my personal sessions?",
    a: "Rather than burdening you with complex jargon, your teacher observes your natural tendencies (doshas) alongside your Breath Signature. We translate these ancient insights into straightforward advice on room temperature, sleep habits, food warmth, and exercise styles that naturally restore your balance.",
  },
];

export default function AyurvedicLifestyleLanding() {
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
            आयुर्वेद
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
                    आयुर्वेद · Āyurveda
                  </span>
                </p>

                <h1 className="em-hero-title">
                  What OJALIS Teaches — <span className="italic-gold">Ayurvedic Lifestyle Guidance</span>
                </h1>

                <p className="em-hero-desc">
                  Daily rhythm shaped around the life you actually live.
                </p>

                <div className="em-hero-ctas">
                  <Link
                    data-testid="hero-book-session-button"
                    to="/book-session?program=Ayurvedic%20Lifestyle%20Guidance"
                    className="em-btn"
                  >
                    Book a Session in Ayurvedic Guidance
                  </Link>
                </div>
              </div>

              {/* Right Column: Framed Photo + Floating Badge */}
              <div style={{ position: "relative" }}>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85"
                    alt="Ayurvedic Lifestyle Guidance — living in harmony with daily rhythm"
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
                      RHYTHMIC LIVING
                    </span>
                    <span style={{ display: "block", fontSize: "14px", color: "#6b6164" }}>
                      Shaped Around the Life You Actually Live
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
                हिताहितं सुखं दुःखमायुस्तस्य हिताहितम् ।
                <br />
                मानं च तच्च यत्रोक्तमायुर्वेदः स उच्यते ॥
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
                “The knowledge that describes what is beneficial and harmful to life, a happy and an unhappy life, and the measure of life itself, is called Ayurveda.”
              </blockquote>

              <figcaption className="em-eyebrow" style={{ marginTop: "28px" }}>
                — Caraka Saṃhitā, Sūtrasthāna 1.41
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
              Simple, practical guidance on your daily rhythm — waking, eating, moving, resting and sleeping — drawn from Ayurveda and shaped around your real life.
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
                  The Wisdom of Daily & Seasonal Rhythm
                </h2>

                <p className="em-body-p1">
                  Ayurveda, often called the sister science of yoga, means “the knowledge of life”. One of its central ideas is beautifully simple: health grows from rhythm. When you wake, eat, move and rest in harmony with your body, and with the cycles of the day and the seasons, energy and wellbeing follow naturally.
                </p>

                <p className="em-body-p2">
                  Ayurveda describes <em>dinacharya</em>, the daily routine, and <em>ritucharya</em>, the seasonal routine. It also describes three doshas — vata, pitta, and kapha — the natural qualities that shape each person’s nature. At OJALIS, these ideas are turned into practical everyday steps: a calm morning routine, regular meal times, movement breaks, and gentle evening wind-down.
                </p>
              </div>

              <div>
                <div className="em-framed-card">
                  <img
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85"
                    alt="Ayurvedic daily rhythm"
                    className="em-framed-img"
                    style={{ height: "360px" }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: "56px" }}>
              <p className="em-practices-title">
                Pillars of Daily Rhythm:
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
              <h2 className="em-section-heading">Personal Mentorship</h2>
              <div className="em-guided-intro-grid">
                <p style={{ color: "#2c2426", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  OJALIS shapes this guidance around the life you actually live, including long working hours, travel and family responsibilities. Your teacher suggests small, realistic changes, one or two at a time.
                </p>
                <p style={{ color: "#6b6164", lineHeight: 1.75, fontSize: "16px", margin: 0 }}>
                  Lifestyle guidance works hand in hand with your yoga practice: pranayama, asana and Yoga Nidra each support the rhythm you are building. It works alongside your doctor’s care, directing you to medical support whenever needed.
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
            दिनचर्या
          </span>

          <div className="em-container" style={{ maxWidth: "896px", textAlign: "center" }}>
            <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
              The OJALIS Perspective
            </p>

            <blockquote
              data-testid="perspective-quote"
              className="em-perspective-quote"
            >
              “We believe small, steady changes create lasting wellbeing far more reliably than strict rules that are hard to follow. Your routine should feel supportive, like a friendly rhythm that carries you through the day.”
            </blockquote>

            <p className="em-perspective-body">
              The OJALIS perspective on Ayurveda is practical and kind. Yoga and Ayurveda grew up side by side in India, and together they offer a complete picture of healthy living: yoga works with the body, breath and mind, while Ayurveda shapes the rhythm in which they live.
            </p>

            <p className="em-perspective-body" style={{ marginTop: "16px" }}>
              We bring these traditions together in clear, everyday language, so ancient wisdom becomes something you can use in a modern home, a busy office or a crowded city. Each suggestion is explained, so you understand why it helps and can choose what suits you.
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
                <p className="em-eyebrow">The Living Rewards</p>
                <h2 className="em-font-display em-gains-title">
                  What you gain with OJALIS
                </h2>
                <p className="em-gains-sub">
                  When everyday rhythms align with your inner biology, fatigue gives way to sustainable vitality and deep mental calm.
                </p>

                <div data-testid="who-it-is-for-card" className="em-who-card">
                  <p className="em-who-tag">WHO IT IS FOR</p>
                  <p className="em-who-text">
                    Anyone who wants a healthier daily routine, especially people with busy schedules.
                  </p>
                </div>
              </div>

              {/* Right Column: 5 Gains List */}
              <div>
                <ul className="em-gains-list">
                  {[
                    "Steadier energy through the day",
                    "Comfortable digestion and mindful eating",
                    "More restful sleep",
                    "A feeling of living in harmony with your body",
                    "Healthy habits that last",
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
                दिनचर्या
              </span>

              <div style={{ position: "relative", zIndex: 10 }}>
                <p className="em-eyebrow" style={{ color: "#dfbd74" }}>
                  Begin Your Daily Harmony
                </p>

                <h2 className="em-cta-title">
                  Ready to Shape a Daily Rhythm That Truly Supports You?
                </h2>

                <p className="em-cta-subtitle">
                  Discover your Breath Signature or consult your teacher to begin building small, sustainable habits that carry you through each day.
                </p>

                <div className="em-cta-btn-wrap">
                  <Link
                    data-testid="final-cta-book-button"
                    to="/book-session?program=Ayurvedic%20Lifestyle%20Guidance"
                    className="em-btn em-btn-light"
                  >
                    Book a Session in Ayurvedic Guidance
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

