import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchPublic, getImageUrl } from "../utils/api";

function Trainers() {
  const fallbackTrainers = [
    {
      name: "Acharya Ananya Sharma",
      role: "Founder & Lead Yogacharya",
      photo: "/acharya_ananya.jpg",
      qualification: "M.Sc. in Yogic Sciences (SVYASA) • 500-Hr Certified Yoga Acharya • Certified Ayurveda Counselor",
      experience: "14+ Years of Dedicated Teaching & Traditional Sadhana",
      specialization: "Classical Hatha Yoga, Yogic Kriyas, Pranic Breathwork, Posture Therapy",
      quote: "Yoga is not an imposition of will upon the body; it is listening so deeply that the body uncoils naturally into stillness.",
      bio: "Trained in traditional Himalayan ashrams under esteemed masters, Acharya Ananya has devoted her life to communicating the profound meditative essence of classical yoga. Her teaching emphasizes subtle postural alignment, diaphragmatic breath regulation, and compassionate individual attention. She has guided hundreds of beginners and senior practitioners across India."
    },
    {
      name: "Yogi Devrat Vashisht",
      role: "Senior Asana & Mobility Specialist",
      photo: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=85",
      qualification: "Postgraduate Diploma in Yoga Therapy • 500-Hr RYT Registered Master • National Yoga Gold Medalist",
      experience: "11+ Years Clinical & Studio Instruction",
      specialization: "Spinal Decompression, Functional Mobility, Surya Namaskar Vinyasa, Core Stabilization",
      quote: "True flexibility begins in the nervous system. When you feel safe in your breath, your muscles naturally release.",
      bio: "Devrat combines traditional gurukul discipline with modern biomechanical understanding. Known for his clear, reassuring instructions and safe hands-on adjustments, he helps students conquer physical stiffness and build balanced joint strength without risk of overstretching."
    },
    {
      name: "Vidya Nambiar",
      role: "Therapeutic & Restorative Instructor",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=85",
      qualification: "BAMS (Ayurvedic Medicine & Surgery) • Certified Medical Yoga Therapist (CYT-500)",
      experience: "9+ Years Integrative Wellness Practice",
      specialization: "Therapeutic Back Care, Cervical Spine Relief, Prenatal Yoga, Hormonal Balance",
      quote: "Healing occurs when we stop fighting our physical limitations and instead provide the body with gentle space to recover.",
      bio: "With her formal medical background in Ayurveda combined with deep therapeutic yoga training, Vidya specializes in designing gentle restorative sessions for students recovering from joint pain, lumbar stiffness, or severe chronic stress."
    },
    {
      name: "Dr. Ramanathan Iyer",
      role: "Philosophy Preceptor & Meditation Mentor",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=85",
      qualification: "Ph.D. in Sanskrit & Indian Philosophy • 20+ Years Contemplative Sadhana",
      experience: "18+ Years University & Ashram Lecturing",
      specialization: "Patanjali Yoga Sutras, Trataka & Third Eye Sadhana, Omkar Chanting, Nada Yoga",
      quote: "The quietest mind is the most powerful mind. In silence, all questions find their answer.",
      bio: "Dr. Ramanathan leads our weekend philosophical explorations and twilight meditation circles. His soothing voice and profound command of the Yoga Sutras make ancient wisdom accessible, engaging, and immediately practical for contemporary living."
    }
  ];

  const [trainersList, setTrainersList] = useState(fallbackTrainers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublic("/teachers").then(data => {
      if (data && data.length > 0) {
        const mapped = data.map(item => ({
          name: item.name,
          role: item.specializations || "Yoga Teacher",
          photo: getImageUrl(item.profileImage) || "/logo.png",
          qualification: item.qualifications,
          experience: item.experience,
          specialization: item.specializations,
          quote: item.shortBio || "Dedicated to classical practice.",
          bio: item.biography
        }));
        setTrainersList(mapped);
      }
      setLoading(false);
    });
  }, []);

  return (
    <main className="bg-ivory">
      {/* Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Dedicated Faculty</span>
          <h1 className="page-hero-title">Meet Our Experienced Mentors</h1>
          <p className="page-hero-subtitle">
            Humble, certified, and deeply grounded teachers who embody the authentic spirit, precision, and compassion of traditional yoga.
          </p>
        </div>
      </section>

      {/* Balanced Trainers Profile Layout */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "36px", maxWidth: "980px", margin: "0 auto" }}>
            {trainersList.map((trainer, idx) => (
              <div 
                key={idx} 
                className="trainer-balanced-card"
                style={{
                  backgroundColor: "var(--ojalis-ivory)",
                  border: "1px solid var(--ojalis-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px",
                  display: "flex",
                  gap: "32px",
                  alignItems: "flex-start",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                {/* Balanced, Reduced Photo Container */}
                <div 
                  className="trainer-avatar-box"
                  style={{
                    width: "210px",
                    height: "240px",
                    minWidth: "210px",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    border: "1.5px solid var(--ojalis-gold-border)",
                    boxShadow: "var(--shadow-sm)",
                    backgroundColor: "#ffffff",
                    flexShrink: 0
                  }}
                >
                  <img 
                    src={trainer.photo} 
                    alt={trainer.name} 
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} 
                  />
                </div>

                {/* Trainer Content & Credentials */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px", marginBottom: "4px" }}>
                    <h2 style={{ fontSize: "24px", color: "var(--ojalis-burgundy)", margin: 0 }}>
                      {trainer.name}
                    </h2>
                    <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--ojalis-gold-dark)" }}>
                      {trainer.role}
                    </span>
                  </div>

                  <div style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--ojalis-burgundy-light)", marginBottom: "10px" }}>
                    {trainer.qualification}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", background: "#ffffff", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--ojalis-border)", fontSize: "12.5px", marginBottom: "14px" }}>
                    <div>
                      <strong style={{ color: "var(--ojalis-burgundy)" }}>Experience: </strong>
                      <span style={{ color: "var(--ojalis-text-muted)" }}>{trainer.experience}</span>
                    </div>
                    <div>
                      <strong style={{ color: "var(--ojalis-burgundy)" }}>Specialization: </strong>
                      <span style={{ color: "var(--ojalis-text-muted)" }}>{trainer.specialization}</span>
                    </div>
                  </div>

                  <blockquote style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "15.5px",
                    color: "var(--ojalis-burgundy)",
                    borderLeft: "2.5px solid var(--ojalis-gold)",
                    paddingLeft: "14px",
                    marginBottom: "12px",
                    lineHeight: 1.6
                  }}>
                    "{trainer.quote}"
                  </blockquote>

                  <p style={{ fontSize: "14px", color: "var(--ojalis-text-muted)", lineHeight: 1.65, marginBottom: "18px" }}>
                    {trainer.bio}
                  </p>

                  <Link to={`/book-session?trainer=${encodeURIComponent(trainer.name)}`} className="btn btn-primary" style={{ padding: "9px 20px", fontSize: "13.5px" }}>
                    Book a Session with {trainer.name.split(" ")[0]}
                    <span className="btn-arrow">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-card-box">
            <h2 className="final-cta-title">
              Experience Personal Guidance <span>Firsthand</span>
            </h2>
            <p className="final-cta-desc">
              Schedule a friendly orientation session with our faculty to assess your current flexibility and discuss your personal wellness goals.
            </p>
            <div className="final-cta-btn-group">
              <Link to="/book-session" className="btn btn-gold">
                Schedule Orientation Session
                <span className="btn-arrow">→</span>
              </Link>
              <Link to="/contact" className="btn btn-white">
                Contact the Teachers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Trainers;
