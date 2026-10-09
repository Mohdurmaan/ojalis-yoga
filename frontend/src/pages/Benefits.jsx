import { Link } from "react-router-dom";
import {
  IconFlexibility,
  IconStrength,
  IconBreathing,
  IconStressManagement,
  IconSleep,
  IconBalance,
  IconMobility,
  IconMindBody
} from "../components/Icons";

function Benefits() {
  const benefitPillars = [
    {
      category: "Flexibility",
      IconComponent: IconFlexibility,
      title: "Functional Range of Motion & Supple Joints",
      description: "Unlike rapid bouncing stretches that trigger the muscle spindle stretch-reflex and cause protective tightening, yogic postures utilize sustained isometric holds synchronized with long exhales. This safely down-regulates protective neural tone, allowing fascial sheaths and tendons to lengthen safely and naturally over time."
    },
    {
      category: "Strength",
      IconComponent: IconStrength,
      title: "Balanced Isometric Muscle Tone",
      description: "Yoga builds functional full-body strength rather than isolated cosmetic bulk. Supporting your own body weight in standing postures, arm balances, and inversions activates deep stabilizing muscles—including the transversus abdominis, rotators, and pelvic floor—creating resilient joints that resist sports injuries."
    },
    {
      category: "Better Breathing",
      IconComponent: IconBreathing,
      title: "Diaphragmatic Expansion & Vagal Tone",
      description: "Most modern adults breathe shallowly into the upper chest at 14 to 18 breaths per minute, triggering subconscious chronic stress. Regular Pranayama trains the diaphragm to engage fully, lowering resting respiration to 6 to 8 calm, oxygen-rich breaths per minute and activating the calming vagus nerve."
    },
    {
      category: "Stress Management",
      IconComponent: IconStressManagement,
      title: "Down-Regulating Cortisol & Adrenaline",
      description: "When confronted with unexpected daily demands, an untrained mind reacts with immediate physiological anxiety. Classical yogic breath retention and conscious witness observation teach the brain to pause before reacting, measurably reducing salivary cortisol and stabilizing blood pressure."
    },
    {
      category: "Better Sleep",
      IconComponent: IconSleep,
      title: "Deeper Sleep Architecture & Nervous Reset",
      description: "By releasing the accumulated muscular and mental tension of the day through restorative evening asanas and Yoga Nidra, the body can transition smoothly from sympathetic arousal into deep parasympathetic recovery. Students routinely report falling asleep faster and waking with genuine refreshed vitality."
    },
    {
      category: "Balance",
      IconComponent: IconBalance,
      title: "Neuromuscular Coordination & Stability",
      description: "Single-leg standing postures and inverted transitions recalibrate the vestibular inner ear, proprioceptive joint sensors, and ocular tracking. This significantly reduces the risk of accidental falls and develops a rooted, unwavering sense of physical and mental balance."
    },
    {
      category: "Mobility",
      IconComponent: IconMobility,
      title: "Spinal Health & Postural Longevity",
      description: "Prolonged sitting causes the spine to compress, leading to habitual anterior pelvic tilt, rounded upper backs, and cervical disc pressure. Classical yoga asanas systematically mobilize all three planes of the spinal column, nourishing intervertebral discs through natural fluid circulation and restoring graceful posture."
    },
    {
      category: "Mind-Body Wellness",
      IconComponent: IconMindBody,
      title: "Interoceptive Awareness & Daily Rhythm",
      description: "Interoception is the internal sense of the body’s physiological condition—recognizing hunger, muscle fatigue, tension, and emotional states before they escalate into burnout. Yoga fine-tunes this internal sensory radar, helping you make healthier lifestyle decisions intuitively."
    }
  ];

  return (
    <main className="bg-ivory">
      {/* Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Evidence & Experience</span>
          <h1 className="page-hero-title">The Practical Benefits of Yoga</h1>
          <p className="page-hero-subtitle">
            An informative, realistic breakdown of how classical yoga transforms physical mobility, internal biology, emotional resilience, and daily vitality.
          </p>
        </div>
      </section>

      {/* Intro Philosophy */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="intro-two-col">
            <div>
              <div className="section-tag-wrapper">
                <span className="section-tag-line"></span>
                <span className="section-tag-text">Realistic Wellness</span>
              </div>
              <h2 className="section-title-main">
                No Exaggerated Claims. <span>Just Pure Science.</span>
              </h2>
              <p className="section-desc-main" style={{ marginBottom: "18px" }}>
                At Ojalis Yogic Kriya, we respect both the timeless wisdom of classical yogic texts and the insights of modern anatomy and exercise physiology. We do not make supernatural promises or claim that yoga is an overnight miracle cure.
              </p>
              <p className="section-desc-main">
                Instead, we share the well-documented, reproducible benefits of steady, dedicated practice. When you commit 60 minutes a few times a week to mindful posture alignment, breath regulation, and sensory relaxation, your body rewards you with profound biological rejuvenation.
              </p>
            </div>
            <div className="intro-visual-side">
              <div className="intro-image-container" style={{ height: "360px" }}>
                <img 
                  src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=85" 
                  alt="Authentic Indian yoga practitioner in mindful asana" 
                  className="intro-main-img" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 8 Pillars Grid */}
      <section className="section-spacing bg-ivory">
        <div className="container">
          <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
            <div className="section-tag-wrapper">
              <span className="section-tag-line"></span>
              <span className="section-tag-text">Eight Core Dimensions</span>
              <span className="section-tag-line"></span>
            </div>
            <h2 className="section-title-main">
              How Regular Practice <span>Heals & Sustains</span>
            </h2>
            <p className="section-desc-main mx-auto">
              Explore the detailed physiological and psychological benefits observed in students over weeks and months of steady practice.
            </p>
          </div>

          <div className="programs-card-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", marginTop: "48px" }}>
            {benefitPillars.map((pillar, idx) => {
              const Icon = pillar.IconComponent;
              return (
                <div key={idx} className="why-card-item" style={{ padding: "34px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                    <div style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      backgroundColor: "var(--ojalis-gold-subtle)",
                      color: "var(--ojalis-burgundy)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}>
                      <Icon size={22} color="var(--ojalis-burgundy)" />
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ojalis-gold-dark)" }}>
                      {pillar.category}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "21px", color: "var(--ojalis-burgundy)", marginBottom: "12px" }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontSize: "14.5px", color: "var(--ojalis-text-muted)", lineHeight: 1.75 }}>
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What to Expect in 30 Days (Balanced Two-Column Section) */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="intro-two-col" style={{ alignItems: "center" }}>
            <div>
              <div className="section-tag-wrapper">
                <span className="section-tag-line"></span>
                <span className="section-tag-text">Realistic Progression</span>
              </div>
              <h2 className="section-title-main">
                What to Expect in <span>Your First 30 Days</span>
              </h2>
              <p className="section-desc-main" style={{ marginBottom: "16px" }}>
                True biological transformation does not happen overnight. When practiced with consistency and patience, here is how your body and nervous system adapt over the first month:
              </p>

              <div className="timeline-phase-list">
                <div className="timeline-phase-item">
                  <span className="timeline-phase-badge">Week 1</span>
                  <div className="timeline-phase-content">
                    <h4>Breath Awareness & Deeper Sleep</h4>
                    <p>Gentle diaphragm activation loosens initial muscle guarding. Students immediately report calmer evenings and deeper, undisturbed sleep.</p>
                  </div>
                </div>

                <div className="timeline-phase-item">
                  <span className="timeline-phase-badge">Weeks 2–3</span>
                  <div className="timeline-phase-content">
                    <h4>Spinal Decompression & Joint Fluidity</h4>
                    <p>Pelvic alignment and sustained hamstring stretches relieve chronic lower back pressure. Morning stiffness noticeably diminishes.</p>
                  </div>
                </div>

                <div className="timeline-phase-item">
                  <span className="timeline-phase-badge">Month 1 & Beyond</span>
                  <div className="timeline-phase-content">
                    <h4>Habitual Stamina & Inner Poise</h4>
                    <p>Core stabilizers strengthen naturally. Posture during long workdays feels effortless, and conscious breathing becomes second nature.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="intro-visual-side">
              <div className="stats-highlight-card">
                <div style={{ borderRadius: "var(--radius-md)", overflow: "hidden", height: "240px", border: "1px solid var(--ojalis-border)" }}>
                  <img 
                    src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85" 
                    alt="Authentic Indian yoga practitioner in steady morning posture" 
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
                  />
                </div>

                <div className="stat-item-row">
                  <div className="stat-big-num">92%</div>
                  <p className="stat-text-label">
                    Of students report a measurable reduction in desk-bound neck and shoulder tension within their first 3 weeks.
                  </p>
                </div>

                <div className="stat-item-row">
                  <div className="stat-big-num">84%</div>
                  <p className="stat-text-label">
                    Report improved resting respiration and falling asleep significantly faster without nighttime restlessness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-card-box">
            <h2 className="final-cta-title">
              Start Experiencing <span>These Benefits Today</span>
            </h2>
            <p className="final-cta-desc">
              Your body is designed to move, breathe, and recover naturally. Join our community for a trial session this week.
            </p>
            <div className="final-cta-btn-group">
              <Link to="/book-session" className="btn btn-gold">
                Book a Trial Session
                <span className="btn-arrow">→</span>
              </Link>
              <Link to="/programs" className="btn btn-white">
                View Program Schedules
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Benefits;
