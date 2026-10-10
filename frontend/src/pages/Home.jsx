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
import SocialConnectSection from "../components/OmSwamiSection";
import { whatWeTeachData } from "../data/whatWeTeachData";

function Home() {
  const programsData = Object.values(whatWeTeachData).slice(0, 6).map(item => ({
    id: item.slug,
    title: item.title,
    level: item.tag || "All Levels",
    timing: "Flexible Scheduling",
    image: item.image,
    description: item.lead,
    link: `/what-we-teach/${item.slug}`
  }));

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
            <span>HOME OF THE &bull; BREATH SIGNATURE</span>
            <IconSparkle size={13} color="var(--ojalis-gold)" />
          </div>

          <h1 className="hero-main-heading">
           Your breath has been waiting for you to notice.<span className="hero-heading-accent"><br></br>We start with your breath. Everything else grows from there.</span>
          </h1>

          <p className="hero-lead-text">
          Your breath already holds the whole story - when your shoulders rise with worry, where your exhale pauses, how quickly you return to calm. At OJALIS, we listen to that story first. That's the Breath Signature: a calm, personal session where we observe how you truly breathe. From there, every practice is chosen for you - and you alone.
          </p>

          <div className="hero-cta-group">
            <Link to="/what-we-teach" className="hero-explore-btn">
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
                <span className="section-tag-text">About Ojalis</span>
              </div>

              <h2 className="section-title-main">
                Why <span>OJALIS</span> Exists
              </h2>

              <p className="section-desc-main" style={{ marginBottom: "18px" }}>
              <span className="y">Y</span>

               our breath has been your most faithful companion since your very first moment. It has carried you through every joy and every hard day, quietly and mostly unnoticed. OJALIS exists to help you notice it. Noticing is the whole skill, and it can be learned by anyone.
              </p>

              <p className="section-desc-main" style={{ marginBottom: "20px" }}>
                OJALIS was founded by Kuldeep Dubey, who has taught yoga since 2016. Across ten years and several hundred students, one pattern shone through: the students who transformed most were the ones whose breathing transformed. That is why every journey begins with a Breath Signature.
              </p>

              <div className="intro-feature-check-list">
                <div className="intro-check-item">
                  <span style={{ color: "var(--ojalis-gold-dark)", display: "inline-flex", marginTop: "2px" }}>
                    <IconCheckmark size={18} color="var(--ojalis-gold-dark)" />
                  </span>
                  <span><strong>Who Can Join:</strong> students from Class 6 to college, working professionals, new mothers, and adults of every age and fitness level</span>
                </div>
                <div className="intro-check-item">
                  <span style={{ color: "var(--ojalis-gold-dark)", display: "inline-flex", marginTop: "2px" }}>
                    <IconCheckmark size={18} color="var(--ojalis-gold-dark)" />
                  </span>
                  <span><strong>Our Approach:</strong> slow, breath-led practice, taught live online and shaped around your own Breath Signature.</span>
                </div>
                <div className="intro-check-item">
                  <span style={{ color: "var(--ojalis-gold-dark)", display: "inline-flex", marginTop: "2px" }}>
                    <IconCheckmark size={18} color="var(--ojalis-gold-dark)" />
                  </span>
                  <span><strong>Why It Matters:</strong>sleep that comes easier, calm that returns in minutes, and a mind that stays clear through a long day.</span>
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
              Taught by a teacher who came to yoga through science, so every step is something you can observe and feel for yourself.
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
              <span className="trainer-role-badge">FOUNDER & LEAD TEACHER</span>
              <h3 className="trainer-full-name" style={{ fontSize: "28px" }}>Kuldeep Dubey</h3>
              <div className="trainer-qualification" style={{ color: "var(--ojalis-gold-dark)", marginBottom: "12px" }}>
                M.Sc. Mathematics &bull; Diploma in Yoga Science &bull; MDNIY (Ministry of Ayush) &bull;  250-hr Yog Teacher’s Training, Patanjali Yog Samiti
              </div>
              <blockquote className="trainer-quote-italic" style={{ fontSize: "16px", marginBottom: "16px" }}>
                "Yoga is neither a sport nor an exercise regime. It is the conscious art of living in harmony with your breath, your mind, and your natural rhythm."
              </blockquote>
              <p className="trainer-bio-excerpt" style={{ fontSize: "14px", marginBottom: "22px" }}>
                Teaching yoga since 2016. Many of Kuldeep’s students arrived looking for flexibility and stayed talking about their breath. That pattern is why every OJALIS journey begins with a Breath Signature.
              </p>
              <Link to="/trainers" className="btn btn-primary" style={{ padding: "10px 22px", fontSize: "14px" }}>
               Meet the teachers
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
                  <Link to={item.link} className="program-link-cta">
                    Learn More
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: "44px" }}>
            <Link to="/what-we-teach" className="btn btn-primary">
              View All Programs & Detailed Schedules
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

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
      
      <SocialConnectSection />
    </main>
  );
}

export default Home;