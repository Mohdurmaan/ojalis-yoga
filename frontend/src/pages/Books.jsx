import { Link } from "react-router-dom";

function Books() {
  const booksData = [
    {
      title: "The Yoga Sutras of Patanjali",
      author: "Translation & Commentary by Swami Satchidananda",
      category: "Classical Scripture",
      tag: "Essential Core Reading",
      description: "The foundational handbook of Raja Yoga. Outlines the 196 sutras on the nature of the mind, meditation, self-discipline, and ultimate liberation.",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Light on Yoga (Yoga Dipika)",
      author: "B.K.S. Iyengar",
      category: "Asana Anatomy & Alignment",
      tag: "Anatomical Classic",
      description: "Often called the definitive bible of modern asana practice. Contains precise physical guidelines, therapeutic benefits, and breath sequencing for over 200 postures.",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Autobiography of a Yogi",
      author: "Paramahansa Yogananda",
      category: "Spiritual Memoir",
      tag: "Inspiring Sadhana",
      description: "A transformative narrative offering a timeless introduction to Kriya Yoga, ancient Himalayan masters, and the science of spiritual awakening.",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "The Science of Pranayama",
      author: "Swami Sivananda",
      category: "Breath Science & Vital Energy",
      tag: "Prana Mastery",
      description: "A thorough practical guide explaining the subtle nadis, chakras, Kumbhaka, and systematic breath exercises to vitalize the physical body.",
      image: "https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Hatha Yoga Pradipika",
      author: "Yogi Svatmarama (Commentary by Swami Muktibodhananda)",
      category: "Hatha Scripture",
      tag: "Ancient Manual",
      description: "The 15th-century classical manual detailing asanas, cleansing kriyas (Shatkarmas), mudras, bandhas, and awakening the inner Kundalini energy.",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Raja Yoga",
      author: "Swami Vivekananda",
      category: "Philosophy & Psychology",
      tag: "Rational Spirituality",
      description: "Swami Vivekananda’s brilliant lectures in the West delivering a rational, scientific, and deeply inspiring analysis of mind control and meditation.",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <main className="bg-ivory">
      {/* Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Curated Library</span>
          <h1 className="page-hero-title">Yogic Literature & Recommended Reading</h1>
          <p className="page-hero-subtitle">
            Expand your understanding through timeless classical texts and insightful commentaries by revered masters of the yogic lineage.
          </p>
        </div>
      </section>

      {/* Library Intro */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="intro-two-col">
            <div>
              <div className="section-tag-wrapper">
                <span className="section-tag-line"></span>
                <span className="section-tag-text">Studio Reading Room</span>
              </div>
              <h2 className="section-title-main">
                The Power of <span>Svadhyaya (Study)</span>
              </h2>
              <p className="section-desc-main" style={{ marginBottom: "16px" }}>
                In traditional yoga, <em>Svadhyaya</em>—the study of spiritual and philosophical texts—is recognized as an indispensable foundation for genuine personal growth. Reading elevating words before practice calms intellectual doubts and inspires dedicated practice.
              </p>
              <p className="section-desc-main">
                At our studio in Vasant Vihar, we maintain a quiet reference library containing classical scriptures, anatomy encyclopedias, and commentaries. All enrolled students are welcome to borrow or read quietly before and after class.
              </p>
              <div style={{ borderLeft: "3px solid var(--ojalis-gold)", paddingLeft: "20px", marginTop: "22px" }}>
                <p style={{ fontStyle: "italic", fontFamily: "var(--font-serif)", fontSize: "17.5px", color: "var(--ojalis-burgundy)", marginBottom: "4px" }}>
                  "By self-study (Svadhyaya) and contemplative reading, communion with inner wisdom is attained."
                </p>
                <span style={{ fontSize: "12.5px", fontWeight: 700, color: "var(--ojalis-gold-dark)", textTransform: "uppercase", letterSpacing: "1px" }}>
                  — Yoga Sutras of Patanjali (2.44)
                </span>
              </div>
            </div>
            <div className="intro-visual-side">
              <div className="intro-image-container" style={{ height: "360px" }}>
                <img 
                  src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=85" 
                  alt="Ojalis Yoga Studio Library & Reading Nook" 
                  className="intro-main-img" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="section-spacing bg-ivory">
        <div className="container">
          <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
            <div className="section-tag-wrapper">
              <span className="section-tag-line"></span>
              <span className="section-tag-text">Recommended Roster</span>
              <span className="section-tag-line"></span>
            </div>
            <h2 className="section-title-main">
              Books Every Practitioner <span>Should Explore</span>
            </h2>
            <p className="section-desc-main mx-auto">
              Our teachers recommend starting with these revered titles to illuminate your personal practice.
            </p>
          </div>

          <div className="programs-card-grid" style={{ marginTop: "48px" }}>
            {booksData.map((book, idx) => (
              <div key={idx} className="program-card-item">
                <div className="program-card-thumb-wrap" style={{ height: "200px" }}>
                  <img src={book.image} alt={book.title} className="program-card-img" />
                  <span className="program-badge-tag">{book.category}</span>
                </div>
                <div className="program-card-body">
                  <span style={{ fontSize: "12px", color: "var(--ojalis-gold-dark)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>
                    {book.tag}
                  </span>
                  <h3 className="program-card-title" style={{ fontSize: "19px", marginBottom: "4px" }}>
                    {book.title}
                  </h3>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--ojalis-burgundy)", marginBottom: "14px" }}>
                    By {book.author}
                  </div>
                  <p className="program-card-text" style={{ fontSize: "14px" }}>
                    {book.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: "48px" }}>
            <p style={{ color: "var(--ojalis-text-muted)", marginBottom: "18px", fontSize: "15px" }}>
              Looking for personal reading recommendations based on your current practice level?
            </p>
            <Link to="/contact" className="btn btn-outline-burgundy">
              Ask Our Teachers for Recommendations
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Books;