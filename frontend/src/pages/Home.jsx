import { Link } from "react-router-dom";
import {
  IconFlexibility,
  IconStrength,
  IconStressManagement,
  IconSleep,
  IconBreathing,
  IconBalance,
  IconCheckmark,
  IconStar,
  IconLotus,
  IconSparkle
} from "../components/Icons";
import HomeGallerySection from "../components/HomeGallerySection";

function Home() {
  const programsData = [
    {
      id: "general-yoga",
      title: "General Hatha Yoga",
      level: "All Levels",
      timing: "Morning & Evening Batches",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
      description: "Classical foundational postures (Asanas), steady alignment, and gentle breath coordination designed to strengthen muscles, loosen stiffness, and revitalize daily vitality.",
      link: "/programs"
    },
    {
      id: "therapeutic-yoga",
      title: "Therapeutic Yoga",
      level: "Customized",
      timing: "Specialized Daily Sessions",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80",
      description: "Restorative, physician-aligned yogic sequences tailored for posture correction, back ache relief, joint flexibility, and gentle rehabilitation at your body's natural pace.",
      link: "/programs"
    },
    {
      id: "pranayama-kriya",
      title: "Pranayama & Yogic Kriya",
      level: "All Practitioners",
      timing: "Early Morning Sadhana",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
      description: "Traditional yogic cleansing and vitalizing breathwork including Kapalabhati, Nadi Shodhana, Bhastrika, and foundational kriyas to calm the nervous system.",
      link: "/programs"
    },
    {
      id: "meditation-stillness",
      title: "Meditation & Inner Stillness",
      level: "Beginner to Advanced",
      timing: "Daily Twilight Slots",
      image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80",
      description: "Guided Dharana (focused concentration) and Dhyana (effortless stillness) along with Omkar resonance to dissolve mental friction and nurture inner clarity.",
      link: "/programs"
    },
    {
      id: "weight-management",
      title: "Weight Management Yoga",
      level: "Progressive",
      timing: "Active Dynamic Batches",
      image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80",
      description: "Vinyasa flow, core toning series, and metabolic activation combined with mindful nutritional principles to build healthy, sustainable metabolic rhythm.",
      link: "/programs"
    },
    {
      id: "personal-sessions",
      title: "Personal 1-on-1 Sessions",
      level: "Private Coaching",
      timing: "Flexible Scheduling",
      image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=800&q=80",
      description: "One-to-one dedicated mentoring with our senior teacher, focused strictly on your unique physiological objectives, recovery, and spiritual progression.",
      link: "/programs"
    }
  ];

  const whyChooseUsData = [
    {
      number: "01",
      title: "Experienced Guidance",
      description: "Our instructors carry decades of authentic traditional sadhana alongside university degrees in Yogic Sciences, ensuring safe and disciplined learning."
    },
    {
      number: "02",
      title: "Personal Attention",
      description: "We strictly limit class sizes to small, intimate cohorts so that every student receives individualized posture adjustments and breath alignment."
    },
    {
      number: "03",
      title: "Beginner Friendly",
      description: "No prior flexibility or yoga background required. We meet you exactly where your body is today and guide you progressively without intimidation."
    },
    {
      number: "04",
      title: "Comfortable Environment",
      description: "A serene, clean, naturally ventilated practice hall bathed in gentle light, shielded from city hustle, allowing your senses to settle deeply."
    },
    {
      number: "05",
      title: "Practical Yoga Approach",
      description: "We emphasize practical tools you can integrate directly into modern work life: desk stretches, stress-relieving breathwork, and posture awareness."
    },
    {
      number: "06",
      title: "Focus on Long-Term Wellness",
      description: "No superficial quick-fixes. We cultivate sustainable breathing habits, spinal longevity, emotional resilience, and lifelong physical grace."
    }
  ];

  const benefitsData = [
    {
      IconComponent: IconFlexibility,
      title: "Improved Flexibility",
      description: "Gently lengthen tight hamstrings, hips, and shoulders, restoring natural range of motion and effortless posture."
    },
    {
      IconComponent: IconStrength,
      title: "Better Strength & Mobility",
      description: "Build balanced functional core strength, joint stability, and muscular endurance using your own body weight."
    },
    {
      IconComponent: IconStressManagement,
      title: "Stress Management",
      description: "Regulate the autonomic nervous system, lower cortisol levels, and bring natural ease into challenging days."
    },
    {
      IconComponent: IconSleep,
      title: "Better Sleep Quality",
      description: "Unwind accumulated nervous tension through evening restorative asanas and breathwork for deep, undisturbed sleep."
    },
    {
      IconComponent: IconBreathing,
      title: "Improved Breathing",
      description: "Expand diaphragmatic lung capacity, clear congested airways, and cultivate calm, oxygen-rich breathing."
    },
    {
      IconComponent: IconBalance,
      title: "Mind & Body Balance",
      description: "Bridge cognitive focus with somatic awareness to experience rooted emotional steadiness and mental peace."
    }
  ];

  const testimonialsData = [
    {
      quote: "Joining Ojalis was the best decision for my persistent lower back stiffness. The instructors watch every posture with genuine care and patience. I feel lighter and centered every morning.",
      name: "Sunita Sharma",
      program: "General Yoga & Therapeutic Sessions",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "The pranayama and meditation guidance here is authentic and profoundly calming. As an IT professional working 10-hour desk shifts, these sessions have revived my energy and mental clarity.",
      name: "Rajesh Kulkarni",
      program: "Pranayama & Yogic Kriya",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Warm, peaceful, and zero pretentiousness. Ojalis feels like a real sanctuary where you can truly slow down, breathe properly, and build genuine inner strength. Highly recommended.",
      name: "Priyanka Mehra",
      program: "Meditation & Stillness",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <main>
      {/* =================================================================
          1. HERO SECTION (Follows Shiv Eye Reveal)
          ================================================================= */}
      <section className="hero-welcome-section text-center">
        <div className="container">
          <div className="hero-pill-badge">
            <IconSparkle size={13} color="var(--ojalis-gold)" />
            <span>OJALIS YOGIC KRIYA &bull; SACRED SADHANA</span>
            <IconSparkle size={13} color="var(--ojalis-gold)" />
          </div>

          <h1 className="hero-main-heading">
            Find Your Balance. Strengthen Your Body. <span className="hero-heading-accent">Calm Your Mind.</span>
          </h1>

          <p className="hero-lead-text">
            Discover a simple and meaningful approach to yoga designed to help you improve flexibility, strength, breathing and overall well-being.
          </p>

          <div className="hero-cta-group">
            <Link to="/programs" className="hero-explore-btn">
              Explore Our Programs
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/book-session" className="hero-book-btn">
              Book a Session
            </Link>
          </div>

          {/* Quick Highlights Row */}

        </div>
      </section>

      {/* =================================================================
          2. INTRODUCTION / ABOUT SECTION
          ================================================================= */}
      <section className="intro-yoga-section">
        <div className="container">
          <div className="intro-two-col">
            {/* Visual Side */}
            <div className="intro-visual-side">
              <div className="intro-image-container">
                <img
                  src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=85"
                  alt="Authentic Indian yoga practice at Ojalis"
                  className="intro-main-img"
                />
              </div>
              <div className="intro-stat-badge-float">
                <div className="badge-float-icon">
                  <IconLotus size={24} color="var(--ojalis-gold)" />
                </div>
                <div>
                  <span className="badge-float-title">Classical Yogic Tradition</span>
                  <span className="badge-float-sub">Grounding Body, Breath & Spirit</span>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div>
              <div className="section-tag-wrapper">
                <span className="section-tag-line"></span>
                <span className="section-tag-text">About Ojalis Yoga</span>
              </div>

              <h2 className="section-title-main">
                A Haven for <span>Authentic Healing</span> & Inner Presence
              </h2>

              <p className="section-desc-main" style={{ marginBottom: "18px" }}>
                At Ojalis Yogic Kriya, we believe yoga is not an acrobatic performance, but a sacred journey back to yourself. Rooted in ancient Vedic and classical Hatha traditions, our centre offers an authentic, peaceful sanctuary where modern individuals can step away from relentless distractions.
              </p>

              <p className="section-desc-main" style={{ marginBottom: "20px" }}>
                Whether you wish to loosen stiff muscles, restore restful breathing, cultivate mental stillness, or seek therapy for chronic physical discomfort, we provide systematic, compassionate guidance tailored to your body.
              </p>

              <div className="intro-feature-check-list">
                <div className="intro-check-item">
                  <span style={{ color: "var(--ojalis-gold-dark)", display: "inline-flex", marginTop: "2px" }}>
                    <IconCheckmark size={18} color="var(--ojalis-gold-dark)" />
                  </span>
                  <span><strong>Who Can Join:</strong> Open to all age groups, beginners, working professionals, and seniors.</span>
                </div>
                <div className="intro-check-item">
                  <span style={{ color: "var(--ojalis-gold-dark)", display: "inline-flex", marginTop: "2px" }}>
                    <IconCheckmark size={18} color="var(--ojalis-gold-dark)" />
                  </span>
                  <span><strong>Our Approach:</strong> Breath-synchronized alignment, safe posture transitions, and mindful stillness.</span>
                </div>
                <div className="intro-check-item">
                  <span style={{ color: "var(--ojalis-gold-dark)", display: "inline-flex", marginTop: "2px" }}>
                    <IconCheckmark size={18} color="var(--ojalis-gold-dark)" />
                  </span>
                  <span><strong>Why It Matters:</strong> Long-term physical mobility, nervous system regulation, and emotional poise.</span>
                </div>
              </div>

              <Link to="/about" className="btn btn-outline-burgundy">
                Learn More About Us
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          3. TRAINER / INSTRUCTOR SPOTLIGHT
          ================================================================= */}
      <section className="trainer-spotlight-section">
        <div className="container">
          <div className="text-center mx-auto" style={{ maxWidth: 680 }}>
            <div className="section-tag-wrapper">
              <span className="section-tag-line"></span>
              <span className="section-tag-text">Teacher & Guide</span>
              <span className="section-tag-line"></span>
            </div>
            <h2 className="section-title-main">
              Meet Our <span>Lead Instructor</span>
            </h2>
            <p className="section-desc-main mx-auto">
              Guided by experienced, humble teachers whose life mission is sharing the purest essence of traditional yogic wisdom.
            </p>
          </div>

          <div className="trainer-spotlight-card" style={{ maxWidth: "1140px" }}>
            <div className="trainer-photo-frame" style={{ minHeight: "420px", height: "100%" }}>
              <img
                src="/new_instructor.png"
                alt="Acharya Ananya Sharma - Lead Indian Yoga Acharya"
                className="trainer-photo-img"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div className="trainer-info-content" style={{ padding: "36px 32px" }}>
              <span className="trainer-role-badge">Founder & Lead Yogacharya</span>
              <h3 className="trainer-full-name" style={{ fontSize: "28px" }}>Acharya Ananya Sharma</h3>
              <div className="trainer-qualification" style={{ color: "var(--ojalis-gold-dark)", marginBottom: "12px" }}>
                M.Sc. Yogic Sciences &bull; 500-Hr Certified Master &bull; 14+ Years Sadhana
              </div>
              <blockquote className="trainer-quote-italic" style={{ fontSize: "16px", marginBottom: "16px" }}>
                "Yoga is neither a sport nor an exercise regime. It is the conscious art of living in harmony with your breath, your mind, and your natural rhythm."
              </blockquote>
              <p className="trainer-bio-excerpt" style={{ fontSize: "14px", marginBottom: "22px" }}>
                Trained in the traditional Himalayan ashrams and certified by premier yogic institutions, Acharya Ananya combines ancient anatomical precision with compassionate personal adjustments. Her calm demeanor has guided hundreds of students from hesitant beginners to confident, mindful practitioners.
              </p>
              <Link to="/trainers" className="btn btn-primary" style={{ padding: "10px 22px", fontSize: "14px" }}>
                Meet Our Faculty & Lineage
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          4. YOGA PROGRAMS SECTION
          ================================================================= */}
      <section className="programs-overview-section" id="programs-overview">
        <div className="container">
          <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
            <div className="section-tag-wrapper">
              <span className="section-tag-line"></span>
              <span className="section-tag-text">Our Structured Offerings</span>
              <span className="section-tag-line"></span>
            </div>
            <h2 className="section-title-main">
              Yoga Programs Tailored to <span>Your Needs</span>
            </h2>
            <p className="section-desc-main mx-auto">
              From mindful beginners to dedicated sadhakas, explore our balanced roster of morning, evening, and therapeutic sessions.
            </p>
          </div>

          <div className="programs-card-grid">
            {programsData.map((item) => (
              <div key={item.id} className="program-card-item">
                <div className="program-card-thumb-wrap">
                  <img src={item.image} alt={item.title} className="program-card-img" />
                  <span className="program-badge-tag">{item.level}</span>
                </div>
                <div className="program-card-body">
                  <div className="program-meta-row">
                    <span>{item.timing}</span>
                  </div>
                  <h3 className="program-card-title">{item.title}</h3>
                  <p className="program-card-text">{item.description}</p>
                  <Link to="/programs" className="program-link-cta">
                    Learn More
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: "44px" }}>
            <Link to="/programs" className="btn btn-primary">
              View All Programs & Detailed Schedules
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================================
          5. WHY CHOOSE US SECTION
          ================================================================= */}
      

      {/* =================================================================
          6. CIRCULAR GALLERY SECTION (Sacred Sadhana & Himalayan Dawn)
          ================================================================= */}
      <HomeGallerySection />

      {/* =================================================================
          7. BENEFITS OF YOGA SECTION (Zero Emojis, Pure SVG Icons)
          ================================================================= */}
     

      {/* =================================================================
          7. TESTIMONIALS SECTION (Zero Emojis, Pure SVG Stars)
          ================================================================= */}
      <section className="testimonials-home-section">
        <div className="container">
          <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
            <div className="section-tag-wrapper">
              <span className="section-tag-line"></span>
              <span className="section-tag-text">Voices of Experience</span>
              <span className="section-tag-line"></span>
            </div>
            <h2 className="section-title-main">
              What Our <span>Students Share</span>
            </h2>
            <p className="section-desc-main mx-auto">
              Real reflections from regular practitioners who have discovered healing, mobility, and peaceful presence with Ojalis.
            </p>
          </div>

          <div className="testimonials-cards-grid">
            {testimonialsData.map((item, idx) => (
              <div key={idx} className="testimonial-card-single">
                <div>
                  <div style={{ display: "flex", gap: "3px", marginBottom: "14px" }}>
                    {[...Array(5)].map((_, starIdx) => (
                      <IconStar key={starIdx} size={15} color="#F5A623" />
                    ))}
                  </div>
                  <p className="testimonial-quote-text">"{item.quote}"</p>
                </div>
                <div className="testimonial-student-meta">
                  <img src={item.avatar} alt={item.name} className="student-avatar-img" />
                  <div>
                    <div className="student-name-text">{item.name}</div>
                    <div className="student-program-tag">{item.program}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: "36px" }}>
            <Link to="/testimonials" className="btn btn-outline-burgundy">
              Read More Student Stories
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================================
          8. CALL TO ACTION SECTION
          ================================================================= */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-card-box">
            <div className="section-tag-wrapper" style={{ justifyContent: "center" }}>
              <span className="section-tag-line" style={{ backgroundColor: "var(--ojalis-gold-light)" }}></span>
              <span className="section-tag-text" style={{ color: "var(--ojalis-gold-light)" }}>Begin Today</span>
              <span className="section-tag-line" style={{ backgroundColor: "var(--ojalis-gold-light)" }}></span>
            </div>

            <h2 className="final-cta-title">
              Your Yoga Journey <span>Starts Here</span>
            </h2>

            <p className="final-cta-desc">
              Take the first step towards a healthier, stronger and more balanced lifestyle. Join our welcoming community for an introductory trial session.
            </p>

            <div className="final-cta-btn-group">
              <Link to="/book-session" className="btn btn-gold">
                Book a Session
                <span className="btn-arrow">→</span>
              </Link>
              <Link to="/contact" className="btn btn-white">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;