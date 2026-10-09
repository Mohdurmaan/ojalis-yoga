import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconTeacher,
  IconPersonalAttention,
  IconBeginner,
  IconAuthentic,
  IconSanctuary,
  IconWellbeing,
  IconChevronDown
} from "../components/Icons";

function About() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  const philosophyPoints = [
    {
      title: "Breath as the Living Bridge",
      desc: "In classical yoga, breath (Prana) connects unconscious biological impulses to conscious awareness. Every movement at Ojalis begins with an inhale and completes with an exhale."
    },
    {
      title: "Alignment without Strain (Sthira-Sukham)",
      desc: "Patanjali defines asana as steady and comfortable. We teach that forcing yourself into extreme shapes causes nervous anxiety; relaxed consistency builds authentic strength."
    },
    {
      title: "Conscious Stillness in a Loud World",
      desc: "Modern living is over-stimulated. Our classes reserve dedicated silence at the beginning and conclusion of each class to allow the sensory nervous system to recalibrate."
    },
    {
      title: "Holistic Integration for Daily Living",
      desc: "Yoga does not end when you step off the mat. We teach how your sitting posture, screen habits, speech, and mental responses can reflect serene yogic balance."
    }
  ];

  const whyPointsLeft = [
    {
      title: "Experienced Yoga Guidance",
      desc: "Trained in Himalayan ashrams and certified in yogic sciences, our acharyas bring decades of study in anatomy, alignment, and the subtle mechanics of breath.",
      icon: <IconTeacher size={22} />
    },
    {
      title: "Personal Attention",
      desc: "We deliberately limit batch sizes so teachers observe your alignment, provide gentle adjustments, and tailor postures to your individual body structure.",
      icon: <IconPersonalAttention size={22} />
    },
    {
      title: "Beginner Friendly Sessions",
      desc: "Never feel intimidated. We guide you step-by-step with props, steady progressions, and a welcoming environment completely free of comparison or judgment.",
      icon: <IconBeginner size={22} />
    }
  ];

  const whyPointsRight = [
    {
      title: "Authentic Yoga Practices",
      desc: "We preserve the genuine depth of classical Hatha and Ashtanga traditions, integrating authentic Yogic Kriyas, bandhas, and traditional philosophy rather than commercial fitness fads.",
      icon: <IconAuthentic size={22} />
    },
    {
      title: "Comfortable Learning Environment",
      desc: "Our studio is designed as an unhurried sanctuary with natural light, clean airflow, warm earthy materials, and peaceful silence to disconnect from the busy world.",
      icon: <IconSanctuary size={22} />
    },
    {
      title: "Focus on Overall Well-Being",
      desc: "Beyond physical flexibility, our teachings cultivate nervous system regulation, restorative sleep, posture correction, and steady mental clarity for everyday life.",
      icon: <IconWellbeing size={22} />
    }
  ];

  const faqList = [
    {
      q: "Is yoga suitable for beginners?",
      a: "Yes, absolutely. Yoga meets you exactly where you are today. At Ojalis, every asana has gentler variations, and our teachers prioritize anatomical safety and comfort over extreme flexibility. You will never be rushed or pressured into any posture."
    },
    {
      q: "How long is a typical yoga session?",
      a: "Our standard group classes run for 60 to 75 minutes. This includes a calming centering practice, warm-up kriyas, a focused asana sequence, cooling pranayama breathwork, and 10 minutes of restorative Savasana stillness."
    },
    {
      q: "Do I need any previous yoga experience?",
      a: "No prior experience is necessary. Many of our students have never practiced yoga before joining us. Our instructors provide step-by-step guidance, clear breath cues, and personalized modifications from your very first session."
    },
    {
      q: "What should I bring to a yoga session?",
      a: "Wear comfortable, breathable clothing that allows free movement. We provide sanitized organic mats, blocks, and bolsters at our studio, though you are always welcome to bring your personal mat and a small water bottle."
    },
    {
      q: "Are personal yoga sessions available?",
      a: "Yes. We offer one-on-one private sessions tailored to your individual health objectives, specific spinal or joint conditions, posture rehabilitation, or deeper exploration of meditation and kriyas."
    },
    {
      q: "Do you also offer meditation and pranayama sessions?",
      a: "Yes. Breathwork (Pranayama) and conscious stillness are woven into all daily classes. We also conduct dedicated 45-minute meditation and Yogic Kriya sessions in the early morning and evening."
    },
    {
      q: "How can I book a yoga session?",
      a: "You can book directly through our online Book a Session page, send us a message on WhatsApp, or call our studio. We recommend reserving at least 12 hours in advance to secure your preferred slot."
    },
    {
      q: "How often should I practice yoga?",
      a: "For sustainable benefits, practicing 3 to 4 times a week creates noticeable improvements in flexibility, breath capacity, and stress levels. Even two consistent sessions weekly will bring meaningful mental clarity and relief from daily fatigue."
    }
  ];

  return (
    <main className="bg-ivory">
      {/* 1. About Hero Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">About Our Sanctuary</span>
          <h1 className="page-hero-title">Rooted in Tradition. Practiced with Care.</h1>
          <p className="page-hero-subtitle">
            Ojalis Yogic Kriya was founded to preserve the depth, quiet grace, and healing purity of authentic classical yoga for seekers of all walks of life.
          </p>
        </div>
      </section>

      {/* 2. About / Introduction Section with Authentic Indian Yoga Photography */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="intro-two-col" style={{ alignItems: "center" }}>
            <div className="intro-visual-side">
              <div
                className="intro-image-container"
                style={{
                  height: "440px",
                  maxHeight: "460px",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-md)",
                  border: "1px solid var(--ojalis-border)"
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=85"
                  alt="Authentic Indian yoga practitioner meditating in peaceful ashram hall"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>

            <div>
              <div className="section-tag-wrapper">
                <span className="section-tag-line"></span>
                <span className="section-tag-text">Our Journey & Origin</span>
              </div>
              <h2 className="section-title-main">
                How Ojalis Came to <span>Be Born</span>
              </h2>
              <p className="section-desc-main" style={{ marginBottom: "18px" }}>
                Ojalis emerged from a simple realization: while yoga had gained worldwide popularity, much of its contemplative spirit, anatomical safety, and transformative breathwork had been lost to commercial fitness fads.
              </p>
              <p className="section-desc-main" style={{ marginBottom: "18px" }}>
                Founded by dedicated practitioners trained in traditional Himalayan ashrams, Ojalis was envisioned as an unhurried sanctuary. Here, the ancient science of Yogic Kriyas (cleansing and energy-directing practices) is shared with patience, meticulous posture guidance, and genuine warmth.
              </p>
              <p className="section-desc-main">
                Over the past decade, hundreds of individuals—from desk-bound professionals suffering chronic spinal fatigue to elders seeking joyful mobility—have walked through our doors and discovered sustainable, lasting wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Yoga Philosophy / Approach */}
      <section className="section-spacing bg-ivory">
        <div className="container">
          <div className="text-center mx-auto" style={{ maxWidth: 720 }}>
            <div className="section-tag-wrapper">
              <span className="section-tag-line"></span>
              <span className="section-tag-text">Our Core Philosophy</span>
              <span className="section-tag-line"></span>
            </div>
            <h2 className="section-title-main">
              The Four Pillars of <span>Ojalis Sadhana</span>
            </h2>
            <p className="section-desc-main mx-auto">
              Our teaching methodology honors the foundational classical texts while adapting smoothly to the demands of contemporary bodies.
            </p>
          </div>

          <div className="why-grid-layout" style={{ marginTop: "48px" }}>
            {philosophyPoints.map((item, index) => (
              <div key={index} className="why-card-item">
                <div className="why-number-mark">0{index + 1}</div>
                <h3 className="why-card-title">{item.title}</h3>
                <p className="why-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section (Human Editorial Layout with Authentic Indian Imagery) */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="text-center mx-auto" style={{ maxWidth: 760 }}>
            <div className="section-tag-wrapper">
              <span className="section-tag-line"></span>
              <span className="section-tag-text">Why Choose Ojalis</span>
              <span className="section-tag-line"></span>
            </div>
            <h2 className="section-title-main">
              A Thoughtful Sanctuary for <span>Genuine Transformation</span>
            </h2>
            <p className="section-desc-main mx-auto">
              We bridge time-honored Vedic traditions with attentive personal guidance, ensuring you feel supported, respected, and energized every time you practice.
            </p>
          </div>

          <div className="about-why-editorial-grid">
            {/* Left Column of Features */}
            <div className="why-feature-col">
              {whyPointsLeft.map((pt, idx) => (
                <div key={idx} className="why-feature-item">
                  <div className="why-feature-icon-wrapper">
                    {pt.icon}
                  </div>
                  <div>
                    <h3 className="why-feature-title">{pt.title}</h3>
                    <p className="why-feature-desc">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Center Authentic Indian Yoga Photo */}
            <div className="why-center-photo-frame">
              <img
                src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=900&q=85"
                alt="Authentic Indian yoga practitioner practicing mindful asana in peaceful setting"
                className="why-center-photo-img"
              />
              <div className="why-center-photo-caption">
                <span className="why-center-photo-tag">Traditional Lineage</span>
                <p className="why-center-photo-title">Mindful Alignment & Compassionate Guidance</p>
              </div>
            </div>

            {/* Right Column of Features */}
            <div className="why-feature-col">
              {whyPointsRight.map((pt, idx) => (
                <div key={idx} className="why-feature-item">
                  <div className="why-feature-icon-wrapper">
                    {pt.icon}
                  </div>
                  <div>
                    <h3 className="why-feature-title">{pt.title}</h3>
                    <p className="why-feature-desc">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Trainer / Guidance Section (Upgraded to 90%+ Standard) */}
      <section className="section-spacing bg-ivory">
        <div className="container">
          <div className="text-center mx-auto" style={{ maxWidth: 760 }}>
            <div className="section-tag-wrapper">
              <span className="section-tag-line"></span>
              <span className="section-tag-text">Guiding Mentorship</span>
              <span className="section-tag-line"></span>
            </div>
            <h2 className="section-title-main">
              Meet Our Founder & <span>Lead Acharya</span>
            </h2>
            <p className="section-desc-main mx-auto">
              Rooted in authentic Himalayan lineage and university-trained in yogic sciences, bringing anatomical safety, depth, and heartfelt encouragement to every practitioner.
            </p>
          </div>

          <div className="trainer-spotlight-card" style={{ maxWidth: "1140px", margin: "44px auto 0" }}>
            <div className="trainer-photo-frame" style={{ minHeight: "440px", height: "100%" }}>
              <img
                src="/acharya_ananya.jpg"
                alt="Acharya Ananya Sharma - Founder & Lead Yogacharya at Ojalis"
                className="trainer-photo-img"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div className="trainer-info-content" style={{ padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
                <span className="trainer-role-badge" style={{ margin: 0 }}>Founder & Lead Yogacharya</span>
                <span style={{ fontSize: "12px", color: "var(--ojalis-gold-dark)", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
                  &bull; 14+ Years Sadhana
                </span>
              </div>
              <h3 className="trainer-full-name" style={{ fontSize: "32px", marginBottom: "6px" }}>
                Acharya Ananya Sharma
              </h3>
              <div className="trainer-qualification" style={{ color: "var(--ojalis-gold-dark)", marginBottom: "16px", fontWeight: 600 }}>
                M.Sc. in Yogic Sciences &bull; Certified Ayurvedic Lifestyle Counselor
              </div>

              <div style={{ borderLeft: "3px solid var(--ojalis-gold)", paddingLeft: "18px", marginBottom: "18px" }}>
                <p style={{ fontStyle: "italic", fontFamily: "var(--font-serif)", fontSize: "17px", color: "var(--ojalis-burgundy)", margin: 0, lineHeight: 1.6 }}>
                  "My objective as a teacher is not to force the body into extreme shapes, but to guide you on what you learn about yourself on the way down. Yoga is self-discovery in action."
                </p>
              </div>

              <p className="trainer-bio-excerpt" style={{ fontSize: "14.5px", marginBottom: "20px", lineHeight: 1.7 }}>
                Trained in traditional Himalayan ashrams under esteemed masters, Acharya Ananya brings profound stillness, clinical anatomy insight, and genuine warmth to every session. She specializes in therapeutic alignment and mindful breath regulation.
              </p>

              {/* Credential Badges */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "26px" }}>
                <span style={{ fontSize: "12.5px", background: "var(--ojalis-ivory)", border: "1px solid var(--ojalis-border)", padding: "5px 14px", borderRadius: "var(--radius-full)", color: "var(--ojalis-burgundy)", fontWeight: 600 }}>
                  Classical Hatha & Kriya
                </span>
                <span style={{ fontSize: "12.5px", background: "var(--ojalis-ivory)", border: "1px solid var(--ojalis-border)", padding: "5px 14px", borderRadius: "var(--radius-full)", color: "var(--ojalis-burgundy)", fontWeight: 600 }}>
                  Anatomical Posture Therapy
                </span>
                <span style={{ fontSize: "12.5px", background: "var(--ojalis-ivory)", border: "1px solid var(--ojalis-border)", padding: "5px 14px", borderRadius: "var(--radius-full)", color: "var(--ojalis-burgundy)", fontWeight: 600 }}>
                  Pranayama & Meditation
                </span>
              </div>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Link to="/trainers" className="btn btn-outline-burgundy">
                  View Full Faculty Profile
                </Link>
                <Link to="/book-session" className="btn btn-primary">
                  Book a Trial Session with Ananya &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Section (Modern Two-Column Layout, Zero Emojis) */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="faq-two-col-layout">
            {/* Left Column: Heading, Intro, Accordion */}
            <div className="faq-content-col">
              <div className="section-tag-wrapper">
                <span className="section-tag-line"></span>
                <span className="section-tag-text">Common Inquiries</span>
              </div>
              <h2 className="section-title-main" style={{ textAlign: "left", marginBottom: "14px" }}>
                Frequently Asked <span>Questions</span>
              </h2>
              <p className="section-desc-main" style={{ textAlign: "left", marginBottom: "28px", maxWidth: "100%" }}>
                Find answers to some common questions about our yoga sessions, class preparations, and beginning your practice at Ojalis.
              </p>

              <div className="faq-accordion-list">
                {faqList.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className={`faq-accordion-item ${isOpen ? 'faq-open' : ''}`}
                    >
                      <button
                        type="button"
                        className="faq-question-btn"
                        onClick={() => toggleFaq(index)}
                        aria-expanded={isOpen}
                      >
                        <h3 className="faq-question-title">{faq.q}</h3>
                        <div className="faq-toggle-icon">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                              transform: isOpen ? "rotate(45deg)" : "none",
                              transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                            }}
                          >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="faq-answer-panel">
                          <p className="faq-answer-text">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Authentic Indian Yoga Image Card */}
            <div className="faq-visual-col">
              <div className="faq-image-card-box">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=85"
                  alt="Authentic Indian yoga practitioner in serene morning contemplation"
                />
                <div className="faq-image-caption">
                  <span className="faq-image-tag">Traditional Sanctuary</span>
                  <h4>A Welcoming Space for Sincere Growth</h4>
                  <p>
                    Whether you are taking your first conscious breath on a yoga mat or deepening years of sadhana, our teachers guide you with patience, anatomical care, and genuine warmth.
                  </p>
                  <div style={{ marginTop: "18px" }}>
                    <Link to="/programs" className="btn btn-outline-burgundy" style={{ padding: "8px 18px", fontSize: "13px" }}>
                      Explore All Programs &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-card-box">
            <h2 className="final-cta-title">
              Ready to Begin <span>Your Journey?</span>
            </h2>
            <p className="final-cta-desc">
              Experience the peaceful energy of our studio firsthand. Book an introductory trial class today.
            </p>
            <div className="final-cta-btn-group">
              <Link to="/book-session" className="btn btn-gold">
                Book a Trial Session
                <span className="btn-arrow">→</span>
              </Link>
              <Link to="/contact" className="btn btn-white">
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;