import { useState } from "react";
import { Link } from "react-router-dom";

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");

  const galleryItems = [
    {
      id: 1,
      category: "meditation",
      title: "Silent Dawn Sadhana",
      subtitle: "Meditation Circle",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 2,
      category: "poses",
      title: "Natarajasana (Dancer's Pose)",
      subtitle: "Balance & Alignment",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 3,
      category: "group",
      title: "Morning Group Vinyasa",
      subtitle: "Community Energy",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 4,
      category: "environment",
      title: "The Main Practice Hall",
      subtitle: "Natural Wood & Warm Sunlight",
      image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 5,
      category: "trainer",
      title: "Individual Posture Alignment",
      subtitle: "Teacher Hands-On Care",
      image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 6,
      category: "poses",
      title: "Vrikshasana (Tree Pose)",
      subtitle: "Grounding & Focus",
      image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 7,
      category: "meditation",
      title: "Pranayama Breath Alignment",
      subtitle: "Clearing the Nadis",
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 8,
      category: "environment",
      title: "Studio Herbal Tea & Library Nook",
      subtitle: "Post-Practice Relaxation",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 9,
      category: "group",
      title: "Sunset Restorative Circle",
      subtitle: "Deep Relaxation",
      image: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?auto=format&fit=crop&w=900&q=80"
    }
  ];

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <main className="bg-ivory">
      {/* Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Visual Journey</span>
          <h1 className="page-hero-title">Studio & Practice Gallery</h1>
          <p className="page-hero-subtitle">
            A glimpse into the quiet sanctuary, dedicated postures, shared silence, and warm community of Ojalis Yogic Kriya.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-spacing bg-white">
        <div className="container">
          {/* Filter Tabs */}
          <div className="filter-tabs-row">
            <button 
              className={`filter-tab-btn ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              All Moments ({galleryItems.length})
            </button>
            <button 
              className={`filter-tab-btn ${activeCategory === "poses" ? "active" : ""}`}
              onClick={() => setActiveCategory("poses")}
            >
              Yoga Poses (Asanas)
            </button>
            <button 
              className={`filter-tab-btn ${activeCategory === "meditation" ? "active" : ""}`}
              onClick={() => setActiveCategory("meditation")}
            >
              Meditation & Sadhana
            </button>
            <button 
              className={`filter-tab-btn ${activeCategory === "environment" ? "active" : ""}`}
              onClick={() => setActiveCategory("environment")}
            >
              Centre & Environment
            </button>
            <button 
              className={`filter-tab-btn ${activeCategory === "group" ? "active" : ""}`}
              onClick={() => setActiveCategory("group")}
            >
              Group Sessions
            </button>
            <button 
              className={`filter-tab-btn ${activeCategory === "trainer" ? "active" : ""}`}
              onClick={() => setActiveCategory("trainer")}
            >
              Trainer Sessions
            </button>
          </div>

          {/* Photos Grid */}
          <div className="gallery-cards-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="gallery-photo-card">
                <img src={item.image} alt={item.title} className="gallery-photo-img" />
                <div className="gallery-photo-overlay">
                  <div>
                    <span className="gallery-caption-cat">{item.subtitle}</span>
                    <h3 className="gallery-caption-title">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Studio Visit Note */}
          <div className="text-center" style={{ marginTop: "50px" }}>
            <p style={{ color: "var(--ojalis-text-muted)", fontSize: "15px", marginBottom: "16px" }}>
              Pictures capture only a fraction of the serene ambience. We welcome you to visit our centre in person.
            </p>
            <Link to="/book-session" className="btn btn-primary">
              Schedule a Studio Visit
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Gallery;
