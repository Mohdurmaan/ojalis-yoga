import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <main className="bg-ivory">
      {/* 1. Hero Section */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">ABOUT OJALIS</span>
          <h1 className="page-hero-title">
            Rooted in the breath.<br />Taught with care.
          </h1>
          <p className="page-hero-subtitle">
            OJALIS is a breath-centred yoga practice, taught live online by Kuldeep Dubey since 2016.
          </p>
        </div>
      </section>

      {/* 2. Why OJALIS exists */}
      <section className="section-spacing bg-ivory">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-media">
              <img src="/online_yoga_class.jpg" alt="Online Yoga Class" className="about-story-img" />
            </div>
            <div className="about-story-content">
              <div className="section-tag-wrapper">
                <span className="section-tag-line"></span>
                <span className="section-tag-text">HOW OJALIS BEGAN</span>
              </div>
              <h2 className="section-title-main">
                Why OJALIS exists
              </h2>
              <p className="section-desc-main" style={{ marginBottom: "16px" }}>
                Your breath has been your most faithful companion since your very first moment. It has carried you through every joy and every hard day — quietly, steadily, mostly unnoticed. OJALIS exists to help you notice it. Noticing is the whole skill, and it can be learned by anyone.
              </p>
              <p className="section-desc-main" style={{ marginBottom: "16px" }}>
                OJALIS was founded by Kuldeep Dubey, who has taught yoga since 2016. Many students arrived looking for flexibility and stayed talking about their breath. Across ten years and several hundred students, the ones who transformed most were the ones whose breathing transformed.
              </p>
              <p className="section-desc-main">
                That single observation is the foundation OJALIS stands on, and the reason every journey begins with a Breath Signature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Four ideas behind every practice */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="text-center mx-auto" style={{ maxWidth: "720px", marginBottom: "48px" }}>
            <div className="section-tag-wrapper" style={{ justifyContent: "center" }}>
              <span className="section-tag-line"></span>
              <span className="section-tag-text">WHAT GUIDES US</span>
              <span className="section-tag-line"></span>
            </div>
            <h2 className="section-title-main">
              Four ideas behind every practice
            </h2>
          </div>

          <div className="about-ideas-grid">
            {[
              { num: "01", title: "Breath first", text: "Every practice begins with one question: what is your breath doing right now?" },
              { num: "02", title: "Made for one", text: "Your Breath Signature is a personal portrait of how you breathe, and every practice is shaped from it." },
              { num: "03", title: "Slow and unhurried", text: "Fewer postures, held with awareness. The breath leads, and the posture follows." },
              { num: "04", title: "Beside your doctor", text: "OJALIS complements medical care, and we gladly point you towards a doctor whenever something needs one." }
            ].map(item => (
              <div key={item.num} className="about-idea-card">
                <div className="about-idea-num">
                  {item.num}
                </div>
                <h3 className="about-idea-title">
                  {item.title}
                </h3>
                <p className="about-idea-text">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Where OJALIS comes from */}
      <section className="section-spacing-sm bg-ivory" style={{ borderTop: "1px solid var(--ojalis-border)", borderBottom: "1px solid var(--ojalis-border)" }}>
        <div className="container">
          <div className="text-center mx-auto" style={{ maxWidth: "740px" }}>
            <div className="section-tag-wrapper" style={{ justifyContent: "center" }}>
              <span className="section-tag-line"></span>
              <span className="section-tag-text">THE NAME</span>
              <span className="section-tag-line"></span>
            </div>
            <h2 className="section-title-main" style={{ marginBottom: "20px" }}>
              Where OJALIS comes from
            </h2>
            <p className="section-desc-main" style={{ marginBottom: "16px" }}>
              Ojas is the word the classical texts use for the radiant reserve the body gathers when it is nourished, rested and unhurried: the quiet glow of a life lived with care.
            </p>
            <p className="section-desc-main">
              It grows gently, breath by breath, as attention returns to where your energy flows. Helping that reserve grow is the entire work of OJALIS.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Meet the founder */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="text-center mx-auto" style={{ maxWidth: "720px", marginBottom: "48px" }}>
            <div className="section-tag-wrapper" style={{ justifyContent: "center" }}>
              <span className="section-tag-line"></span>
              <span className="section-tag-text">YOUR TEACHER</span>
              <span className="section-tag-line"></span>
            </div>
            <h2 className="section-title-main">
              Meet the founder
            </h2>
          </div>

          <div className="about-founder-card">
            <div className="about-founder-avatar-box">
              <img src="/new_instructor.png" alt="Kuldeep Dubey - Founder & Yoga Teacher" className="about-founder-img" />
            </div>
            <div className="about-founder-content">
              <span className="about-founder-badge">FOUNDER & YOGA TEACHER</span>
              <h3 className="about-founder-name">Kuldeep Dubey</h3>
              <div className="about-founder-creds">
                M.Sc. Mathematics • Diploma in Yoga Science • 250-Hour Yoga Teacher Training.<br />Post graduate in Yoga therapy (currently pursuing)
              </div>
              <p className="about-founder-bio">
                Kuldeep came to yoga through the sciences, and that shapes how OJALIS teaches: precisely, clearly, and with every step something you can observe and feel for yourself.
              </p>
              <div>
                <Link to="/book-session" className="btn btn-primary">
                  Book Your Breath Signature
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Ready to begin CTA */}
      <section className="section-spacing bg-ivory" style={{ borderTop: "1px solid var(--ojalis-border)" }}>
        <div className="container">
          <div className="final-cta-card-box">
            <h2 className="final-cta-title">
              Ready to begin?
            </h2>
            <p className="final-cta-desc">
              Every breath you've taken this year happened on its own. The next one can be yours.
            </p>
            <div className="final-cta-btn-group">
              <Link to="/book-session" className="btn btn-gold">
                Book Your Breath Signature
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-white"
              >
                Message us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;