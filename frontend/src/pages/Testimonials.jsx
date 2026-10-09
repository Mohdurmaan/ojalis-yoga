import { Link } from "react-router-dom";
import { IconStar } from "../components/Icons";

function Testimonials() {
  const testimonialsList = [
    {
      name: "Sunita Sharma",
      role: "School Teacher, Age 42",
      program: "Therapeutic & General Yoga (8 Months Practice)",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      story: "Years of standing while teaching had left me with persistent lower back ache and stiff mornings. A physician friend suggested trying therapeutic yoga. At Ojalis, Acharya Ananya showed me how to use simple bolsters and breathe through tight hip flexors. Within two months, the persistent dull ache disappeared. What I cherish most is how patient and non-judgmental everyone is here."
    },
    {
      name: "Rajesh Kulkarni",
      role: "Software Architect, Age 38",
      program: "Pranayama & Yogic Kriya (1 Year Practice)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      story: "Between overseas client calls and 12-hour desk stints, my stress levels and sleep were deteriorating. I joined the 6:00 AM Pranayama cohort with some skepticism. Learning proper Nadi Shodhana and Bhramari has been a life-saver. My resting heart rate has dropped, my concentration at work has deepened, and I now fall asleep within minutes without waking up anxiously in the night."
    },
    {
      name: "Priyanka Mehra",
      role: "Creative Director, Age 31",
      program: "Meditation & Stillness (6 Months Practice)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      story: "I had previously tried meditation apps and trendy fitness studios, but they always felt rushed or clinical. Ojalis is totally different. The atmosphere in the practice hall has an authentic quiet sanctity. The teachers explain the 'why' behind each technique. For the first time in my adult life, I feel comfortable simply sitting quietly with my own mind."
    },
    {
      name: "Col. Harish Chandra (Retd.)",
      role: "Retired Veteran, Age 68",
      program: "Gentle Senior Yoga (1.5 Years Practice)",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      story: "After knee replacement surgery, my mobility and balance had become unsteady. Yogi Devrat designed modified chair and wall postures tailored precisely to my doctor's rehabilitation guidelines. I have regained steady balance on my morning walks and feel energized throughout the day. Age is truly no barrier when the instruction is this safe and experienced."
    },
    {
      name: "Dr. Aarti Varma",
      role: "Pediatrician, Age 46",
      program: "General Hatha Yoga (10 Months Practice)",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      story: "As a doctor, I observe firsthand how chronic stress manifests as somatic illness in adults. Ojalis practices genuine classical yoga that respects physiological biomechanics. There is zero ego or pressure to force dangerous postures. The breath-synchronized pacing leaves me feeling energized rather than depleted. I frequently recommend this studio to my patients."
    },
    {
      name: "Manish Singhal",
      role: "Business Owner, Age 51",
      program: "Weight Management & Asana Flow (7 Months Practice)",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      story: "I struggled with erratic eating habits and sluggish energy for a decade. The combination of morning dynamic Surya Namaskars and the dietary mindfulness tips shared by the teachers helped me shed 7 kilograms steadily without starvation diets. More importantly, my digestion feels light, and I look forward to stepping on the mat every morning."
    }
  ];

  return (
    <main className="bg-ivory">
      {/* Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Community Voices</span>
          <h1 className="page-hero-title">Real Stories of Healing & Growth</h1>
          <p className="page-hero-subtitle">
            Read honest, unedited reflections from everyday seekers, working professionals, and seniors who practice at Ojalis Yogic Kriya.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-spacing bg-white">
        <div className="container">
          {/* Featured Student Transformation Spotlight */}
          <div className="featured-testimonial-spotlight">
            <div className="featured-testi-photo-col">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" 
                alt="Dr. Aarti Varma - Featured Practitioner at Ojalis" 
              />
              <span className="featured-testi-badge">Featured Journey</span>
            </div>

            <div className="featured-testi-content-col">
              <div style={{ display: "flex", gap: "3px", marginBottom: "12px" }}>
                {[...Array(5)].map((_, i) => (
                  <IconStar key={i} size={16} color="#F5A623" />
                ))}
              </div>
              <h3 className="featured-testi-headline">
                "From Chronic Spinal Fatigue to Effortless Daily Vitality"
              </h3>
              <p className="featured-testi-quote">
                "As a pediatrician on my feet for 10-hour hospital rounds, I had accepted lower back strain as an unavoidable career toll. Ojalis transformed my relationship with my own body. Their teachers don't push extreme contortions—they teach scientific breath synchronization and gentle spinal alignment. Within two months, my morning stiffness dissolved."
              </p>
              <div>
                <strong style={{ color: "var(--ojalis-burgundy)", fontSize: "16px", display: "block" }}>
                  Dr. Aarti Varma
                </strong>
                <span style={{ fontSize: "13.5px", color: "var(--ojalis-text-muted)" }}>
                  Senior Pediatrician, Age 46 &bull; Therapeutic Hatha & Pranayama (10 Months Practice)
                </span>
              </div>

              <div className="featured-milestones-row">
                <span className="featured-milestone-pill">Month 1: Breath Awareness</span>
                <span className="featured-milestone-pill">Month 3: Back Relief</span>
                <span className="featured-milestone-pill">Month 6: Daily Home Sadhana</span>
              </div>
            </div>
          </div>

          <div className="section-tag-wrapper text-center mx-auto" style={{ marginBottom: "12px" }}>
            <span className="section-tag-line"></span>
            <span className="section-tag-text">More Student Reflections</span>
            <span className="section-tag-line"></span>
          </div>

          <div className="testimonials-cards-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "30px", marginTop: "24px" }}>
            {testimonialsList.map((item, idx) => (
              <div key={idx} className="testimonial-card-single" style={{ padding: "36px 30px" }}>
                <div>
                  <div style={{ display: "flex", gap: "3px", marginBottom: "14px" }}>
                    {[...Array(item.rating)].map((_, starI) => (
                      <IconStar key={starI} size={15} color="#F5A623" />
                    ))}
                  </div>
                  <p className="testimonial-quote-text" style={{ fontSize: "16px", lineHeight: 1.75, marginBottom: "24px" }}>
                    "{item.story}"
                  </p>
                </div>

                <div className="testimonial-student-meta">
                  <img src={item.avatar} alt={item.name} className="student-avatar-img" style={{ width: "52px", height: "52px" }} />
                  <div>
                    <div className="student-name-text" style={{ fontSize: "16px" }}>{item.name}</div>
                    <div style={{ fontSize: "12.5px", color: "var(--ojalis-text-muted)" }}>{item.role}</div>
                    <div className="student-program-tag" style={{ color: "var(--ojalis-gold-dark)", fontWeight: 600, marginTop: "2px" }}>
                      {item.program}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: "50px" }}>
            <p style={{ color: "var(--ojalis-text-muted)", marginBottom: "18px", fontSize: "15.5px" }}>
              Join hundreds of happy, grounded practitioners in our studio.
            </p>
            <Link to="/book-session" className="btn btn-primary">
              Begin Your Own Yoga Story
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Testimonials;
