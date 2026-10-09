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
          <div className="blog-cards-grid">
            {loading ? <div style={{textAlign:"center", padding:"40px"}}>Loading journal...</div> : articles.map((article) => (
              <article key={article.id} className="blog-card-item">
                <div className="blog-card-thumb">
                  <img src={article.image} alt={article.title} className="blog-card-img" />
                </div>
                <div className="blog-card-content">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span className="blog-meta-tag">{article.category}</span>
                    <span style={{ fontSize: "12px", color: "var(--ojalis-text-light)" }}>{article.readTime}</span>
                  </div>
                  <h2 className="blog-card-title">
                    <Link to={`/blog/${article.id}`} style={{ color: "inherit" }}>
                      {article.title}
                    </Link>
                  </h2>
                  <p className="blog-card-summary">
                    {article.summary}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--ojalis-border-light)", paddingTop: "14px", marginTop: "auto" }}>
                    <span style={{ fontSize: "12.5px", color: "var(--ojalis-text-muted)" }}>
                      By {article.author}
                    </span>
                    <Link to={`/blog/${article.id}`} className="program-link-cta" style={{ fontSize: "13px" }}>
                      Read Article
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
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
