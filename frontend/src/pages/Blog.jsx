import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { blogArticles as fallbackArticles } from "../data/blogData";
import { fetchPublic, getImageUrl } from "../utils/api";

function Blog() {
  const [articles, setArticles] = useState(fallbackArticles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublic("/journals").then(data => {
      if (data && data.length > 0) {
        // Map backend fields to frontend expected fields
        const mapped = data.map(item => ({
          id: item._id,
          title: item.title,
          category: item.category || "Journal",
          readTime: "5 min read",
          summary: item.excerpt || "",
          author: item.author,
          image: getImageUrl(item.featuredImage)
        }));
        setArticles(mapped);
      }
      setLoading(false);
    });
  }, []);

  return (
    <main className="bg-ivory">
      {/* Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Yoga Journal</span>
          <h1 className="page-hero-title">Wisdom, Practice & Mindful Living</h1>
          <p className="page-hero-subtitle">
            Thoughtful articles, scientific insights, and practical guides to support your yoga and meditation journey both on and off the mat.
          </p>
        </div>
      </section>

      {/* Blog Listing Grid */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="programs-card-grid">
            {loading ? <div style={{textAlign:"center", padding:"40px"}}>Loading journal...</div> : articles.map((article) => (
              <div key={article.id} className="program-card-item">
                <div className="program-card-thumb-wrap">
                  <img src={article.image} alt={article.title} className="program-card-img" />
                  <span className="program-badge-tag">{article.category}</span>
                </div>
                <div className="program-card-body">
                  <div className="program-meta-row">
                    <span>{article.readTime} | By {article.author}</span>
                  </div>
                  <h3 className="program-card-title">{article.title}</h3>
                  <p className="program-card-text">{article.summary}</p>
                  <Link to={`/blog/${article.id}`} className="program-link-cta">
                    Read Article
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Box */}
          <div style={{ marginTop: "64px", background: "var(--ojalis-ivory)", borderRadius: "var(--radius-lg)", padding: "48px 36px", border: "1px solid var(--ojalis-border)", textAlign: "center", maxWidth: "760px", margin: "64px auto 0" }}>
            <span style={{ color: "var(--ojalis-gold-dark)", fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>
              Monthly Sadhana Notes
            </span>
            <h3 style={{ fontSize: "26px", color: "var(--ojalis-burgundy)", marginTop: "8px", marginBottom: "12px" }}>
              Receive Yogic Insights in Your Inbox
            </h3>
            <p style={{ color: "var(--ojalis-text-muted)", fontSize: "15px", maxWidth: "520px", margin: "0 auto 24px" }}>
              We write once a month with practical breathwork routines, alignment tips, and inspiring philosophical reflections. No spam, ever.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing to Ojalis Sadhana Notes!"); }} style={{ display: "flex", gap: "12px", maxWidth: "460px", margin: "0 auto", flexWrap: "wrap" }}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required 
                className="form-input-ctrl"
                style={{ flex: 1, minWidth: "220px" }}
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Blog;
