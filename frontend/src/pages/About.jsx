import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <main className="about-page" style={{ paddingTop: "72px" }}>
      {/* 1. Hero Section */}
      <section className="bg-burgundy" style={{ padding: "100px 20px 80px", textAlign: "center", color: "var(--ojalis-white)" }}>
        <div className="container" style={{ maxWidth: "1120", margin: "0 auto" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--ojalis-gold)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "20px" }}>
            ABOUT OJALIS
          </div>
          <h1 className="font-serif" style={{ fontSize: "65px", fontWeight: 400, lineHeight: 1.2, marginBottom: "24px", color: "var(--ojalis-white)" }}>
            Rooted in the breath.<br/>Taught with care.
          </h1>
          <p style={{ fontSize: "17px", lineHeight: 1.6, opacity: 0.9, maxWidth: "500px", margin: "0 auto", color: "var(--ojalis-white)" }}>
            OJALIS is a breath-centred yoga practice, taught live online by <br/> Kuldeep Dubey since 2016.
          </p>
        </div>
      </section>

      {/* 2. Why OJALIS exists */}
      <section className="bg-ivory" style={{ padding: "100px 20px" }}>
        <div className="container" style={{ maxWidth: "1120px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "60px", alignItems: "center" }}>
          <div style={{ flex: "1 1 400px", borderRadius: "28px", aspectRatio: "1/1", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
             <img src="/online_yoga_class.jpg" alt="Online Yoga Class" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <div style={{ flex: "1 1 400px" }}>
            <div style={{ fontSize: "11px", borderRadius: "20px", fontWeight: 700, color: "var(--ojalis-text-muted)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>
              HOW OJALIS BEGAN
            </div>
            <h2 className="section-title-main" style={{ fontSize: "46px", marginBottom: "24px" }}>
              Why OJALIS exists
            </h2>
            <p className="section-desc-main" style={{ marginBottom: "16px", opacity: 0.9 }}>
             Your breath has been your most faithful companion
since your very first moment. It has carried you
through every joy and every hard day — quietly,
steadily, mostly unnoticed. OJALIS exists to help you
notice it. Noticing is the whole skill, and it can be
learned by anyone
            </p>
            <p className="section-desc-main" style={{ marginBottom: "16px", opacity: 0.9 }}>
             OJALIS was founded by Kuldeep Dubey, who has taught yoga since 2016. Many students arrived looking for flexibility and stayed talking about their breath. Across ten years and several hundred students, the ones who transformed most were the ones whose breathing transformed.
            </p>
            <p className="section-desc-main" style={{ opacity: 0.9 }}>
              That single observation is the foundation OJALIS stands on, and the reason every journey begins with a Breath Signature.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Four ideas behind every practice */}
      <section className="bg-white" style={{ padding: "100px 20px" }}>
        <div className="container" style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--ojalis-text-muted)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>
              WHAT GUIDES US
            </div>
            <h2 className="section-title-main" style={{ fontSize: "36px" }}>
              Four ideas behind every practice
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {[
              { num: "01", title: "Breath first", text: "Every practice begins with one question: what is your breath doing right now?" },
              { num: "02", title: "Made for one", text: "Your Breath Signature is a personal portrait of how you breathe, and every practice is shaped from it." },
              { num: "03", title: "Slow and unhurried", text: "Fewer postures, held with awareness. The breath leads, and the posture follows." },
              { num: "04", title: "Beside your doctor", text: "OJALIS complements medical care, and we gladly point you towards a doctor whenever something needs one." }
            ].map(item => (
              <div key={item.num} className="bg-ivory program-card-item" style={{ padding: "36px 28px", display: "block" }}>
                <div className="font-serif text-burgundy" style={{ fontSize: "22px", marginBottom: "16px" }}>
                  {item.num}
                </div>
                <h3 className="font-serif" style={{ fontSize: "20px", fontWeight: 400, color: "var(--ojalis-text-main)", marginBottom: "12px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--ojalis-text-muted)", opacity: 0.85 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Where OJALIS comes from */}
      <section style={{ backgroundColor: "var(--ojalis-border)", padding: "100px 20px" }}>
        <div className="container" style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--ojalis-burgundy)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px", opacity: 0.8 }}>
            THE NAME
          </div>
          <h2 className="section-title-main" style={{ fontSize: "36px", marginBottom: "30px" }}>
            Where OJALIS comes from
          </h2>
          <p className="section-desc-main" style={{ margin: "0 auto 16px auto", opacity: 0.9 }}>
            Ojas is the word the classical texts use for the radiant reserve the body gathers when it is nourished, rested and unhurried: the quiet glow of a life lived with care.
          </p>
          <p className="section-desc-main" style={{ margin: "0 auto", opacity: 0.9 }}>
            It grows gently, breath by breath, as attention returns to where your energy flows. Helping that reserve grow is the entire work of OJALIS.
          </p>
        </div>
      </section>

      {/* 5. Meet the founder & CTA */}
      <section className="bg-ivory" style={{ padding: "100px 20px" }}>
        <div className="container" style={{ maxWidth: "1120x", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--ojalis-text-muted)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px" }}>
              YOUR TEACHER
            </div>
            <h2 className="section-title-main" style={{ fontSize: "36px" }}>
              Meet the founder
            </h2>
          </div>

          <div className="bg-white" style={{ display: "flex", borderRadius: "12px", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", marginBottom: "100px", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 350px", minHeight: "350px", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
              <img src="/new_instructor.png" alt="Kuldeep Dubey - Founder & Yoga Teacher" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ flex: "1 1 400px", padding: "60px 50px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "var(--ojalis-gold)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "12px" }}>
                FOUNDER & YOGA TEACHER
              </div>
              <h3 className="font-serif" style={{ fontSize: "32px", fontWeight: 400, color: "var(--ojalis-text-main)", marginBottom: "16px" }}>
                Kuldeep Dubey
              </h3>
              <div style={{ fontSize: "12px", color: "var(--ojalis-text-muted)", marginBottom: "24px", lineHeight: 1.6 }}>
                M.Sc. Mathematics • Diploma in Yoga Science • 250-Hour Yoga Teacher Training.<br/>Post graduate in Yoga therapy (currently pursuing)
              </div>
              <p style={{ fontSize: "14.5px", lineHeight: 1.6, color: "var(--ojalis-text-muted)", opacity: 0.9, marginBottom: "28px" }}>
                Kuldeep came to yoga through the sciences, and that shapes how OJALIS teaches: precisely, clearly, and with every step something you can observe and feel for yourself.
              </p>
              
              

              <div>
                <Link to="/book-session" className="btn btn-primary">
                  Book Your Breath Signature
                </Link>
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-burgundy" style={{ borderRadius: "28px", padding: "80px 40px", textAlign: "center", color: "var(--ojalis-white)" }}>
            <h2 className="font-serif" style={{ fontSize: "50px", fontWeight: 600, marginBottom: "20px", color: "var(--ojalis-white)" }}>
              Ready to begin?
            </h2>
            <p style={{ fontSize: "16px", color:"white", opacity: 0.9, marginBottom: "40px", maxWidth: "400px", margin: "0 auto 40px" }}>
              Every breath you've taken this year happened on its own. The next one can be yours.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/book-session" className="btn btn-white">
                Book Your Breath Signature
              </Link>
              <a href="https://wa.me/919876543210" className="btn" style={{ border: "1px solid rgba(255,255,255,0.4)", color: "var(--ojalis-white)" }}>
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