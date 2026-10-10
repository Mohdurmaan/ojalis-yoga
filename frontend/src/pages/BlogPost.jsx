import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { blogArticles as fallbackArticles } from "../data/blogData";
import { fetchPublic, getImageUrl } from "../utils/api";

function BlogPost() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [otherArticles, setOtherArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToc, setShowToc] = useState(false);

  useEffect(() => {
    // Fetch all to find the active article, plus related posts
    fetchPublic("/journals").then(data => {
      let mapped = [];
      if (data && data.length > 0) {
        mapped = data.map(item => ({
          id: item._id,
          title: item.title,
          category: item.category || "Wisdom",
          summary: item.excerpt || "",
          content: item.content,
          author: item.author || "Ojalis Team",
          date: new Date(item.publishedAt || item.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          }),
          image: getImageUrl(item.featuredImage)
        }));
      } else {
        mapped = fallbackArticles.map(item => ({...item, date: item.date || "Recent"}));
      }
      
      const found = mapped.find(item => item.id === id) || mapped[0];
      
      // Process Table of Contents & clean non-breaking spaces (\u00a0 / &nbsp;)
      if (found && found.content) {
        let rawContent = found.content.replace(/&nbsp;|\u00a0/g, ' ');
        const cleanHtml = DOMPurify.sanitize(rawContent);
        const parser = new DOMParser();
        const doc = parser.parseFromString(cleanHtml, 'text/html');
        
        const headings = Array.from(doc.querySelectorAll('h2, h3'));
        const tocData = headings.map((heading, index) => {
          const headingId = heading.id || `section-${index}`;
          heading.id = headingId;
          return {
            id: headingId,
            text: heading.textContent,
            level: heading.tagName.toLowerCase()
          };
        });
        found.contentWithIds = doc.body.innerHTML;
        found.toc = tocData;
      }

      setArticle(found);
      setOtherArticles(mapped.filter(item => item.id !== found.id).slice(0, 3));
      setLoading(false);
    });
  }, [id]);

  if (loading || !article) return (
    <div style={{ textAlign: "center", padding: "120px 20px", minHeight: "60vh", fontFamily: "system-ui, sans-serif", color: "#666" }}>
      Loading article...
    </div>
  );

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -100; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <main className="editorial-page bg-ivory">
      <style>{`
        .editorial-page {
          padding-top: 0;
        }

        /* Direct Blog Featured Image Header */
        .editorial-hero-banner {
          width: 100%;
          max-height: 480px;
          overflow: hidden;
          background-color: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
        }

        .editorial-hero-img {
          width: 100%;
          height: auto;
          max-height: 480px;
          object-fit: cover;
          display: block;
        }

        .editorial-main {
          width: 90%;
          max-width: 1100px;
          margin: 40px auto;
          padding: 0 0 80px;
        }

        .editorial-back-link {
          font-size: 14px;
          color: #777;
          text-decoration: none;
          margin-bottom: 20px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }

        .editorial-back-link:hover {
          color: #e67e22;
        }

        .editorial-meta-tag {
          color: #e67e22;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          margin-bottom: 12px;
          display: block;
        }

        .editorial-title {
          font-size: clamp(30px, 4.5vw, 46px);
          font-weight: 800;
          color: #1a1a1a;
          margin: 0 0 18px 0;
          line-height: 1.22;
          letter-spacing: -0.02em;
        }

        .editorial-meta-info {
          font-size: 14px;
          color: #666;
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eaeaea;
        }

        .editorial-meta-author {
          font-weight: 600;
          color: #333;
        }

        /* Top Author Profile Box */
        .editorial-top-author-box {
          margin: 24px 0 32px;
          padding: 18px 24px;
          background-color: #ffffff;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 16px;
          border: 1px solid #eaeaea;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        .editorial-author-img {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
        }

        .editorial-author-info h4 {
          font-size: 17px;
          margin: 0 0 4px 0;
          font-weight: 700;
          color: #1a1a1a;
        }

        .editorial-author-info p {
          font-size: 14px;
          color: #666;
          margin: 0;
          line-height: 1.4;
        }

        /* "In this article" Pill Badges Style matching Book a Session Button */
        .editorial-toc-pills-container {
          margin: 32px 0 40px;
        }

        .editorial-toc-pills-header {
          font-size: 19px;
          font-weight: 700;
          color: #2c2c2c;
          margin: 0 0 16px 0;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          user-select: none;
          transition: color 0.2s;
        }

        .editorial-toc-pills-header:hover {
          color: var(--ojalis-burgundy, #4d5d47);
        }

        .editorial-toc-chevron {
          font-size: 12px;
          color: #666;
          display: inline-block;
          transition: transform 0.25s ease;
        }

        .editorial-toc-pills-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 14px;
          align-items: center;
        }

        .editorial-toc-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 22px;
          border-radius: var(--radius-full, 9999px);
          font-size: 13.5px;
          font-weight: 600;
             background-color: #4f614436;

          
             color: #4f6144 !important;
          text-decoration: none;
          transition: all 0.25s ease;
          white-space: nowrap;
          border: 2px solid #4F6144;
         
        }

        .editorial-toc-pill:hover {
          background-color: #faf7f2;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(74, 21, 37, 0.2);
    
         
        }

        .editorial-content {
          font-size: 18px;
          line-height: 1.8;
          color: #2c2c2c;
          overflow-wrap: break-word;
          word-wrap: break-word;
          word-break: break-word;
          background: #ffffff;
          padding: 40px;
          border-radius: 16px;
          border: 1px solid #eaeaea;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        /* Override pasted inline styles so text colors and backgrounds wrap cleanly */
        .editorial-content * {
          background-color: transparent !important;
          color: inherit;
          max-width: 100%;
        }

        .editorial-content p {
          margin-bottom: 24px;
        }

        .editorial-content a {
          color: var(--ojalis-gold, #e67e22) !important;
          text-decoration: underline;
        }

        .editorial-content h2 {
          font-size: 28px;
          font-weight: 700;
          color: #111111 !important;
          margin: 48px 0 18px;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }

        .editorial-content h3 {
          font-size: 22px;
          font-weight: 600;
          color: #222222 !important;
          margin: 36px 0 14px;
          line-height: 1.35;
        }

        .editorial-content img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 36px auto;
          display: block;
        }

        .editorial-content blockquote {
          margin: 44px auto;
          padding: 24px 32px;
          text-align: center;
          font-style: italic;
          color: #d37215 !important;
          font-size: 21px;
          font-weight: 500;
          line-height: 1.6;
          position: relative;
          background: transparent !important;
          border: none;
          max-width: 800px;
        }

        .editorial-content blockquote::before {
          content: '“';
          font-size: 36px;
          color: #d37215;
          margin-right: 6px;
          vertical-align: top;
          font-family: Georgia, serif;
          line-height: 0;
        }

        .editorial-content blockquote::after {
          content: '”';
          font-size: 36px;
          color: #d37215;
          margin-left: 6px;
          vertical-align: bottom;
          font-family: Georgia, serif;
          line-height: 0;
        }

        .editorial-content blockquote p {
          margin: 0;
          display: inline;
        }

        .editorial-related {
          background-color: #faf9f6;
          padding: 72px 24px;
          border-top: 1px solid #f0ede6;
        }

        .editorial-related-inner {
          width: 90%;
          max-width: 1100px;
          margin: 0 auto;
        }

        .editorial-related h3 {
          font-size: 26px;
          text-align: center;
          margin-bottom: 40px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .editorial-related-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        @media (min-width: 768px) {
          .editorial-related-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .editorial-related-card {
          text-decoration: none;
          color: inherit;
          display: block;
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #eaeaea;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .editorial-related-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.06);
        }

        .editorial-related-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .editorial-related-card-content {
          padding: 20px;
        }

        .editorial-related-tag {
          font-size: 11px;
          text-transform: uppercase;
          color: #e67e22;
          letter-spacing: 1px;
          font-weight: 700;
          display: block;
          margin-bottom: 6px;
        }

        .editorial-related-title {
          font-size: 18px;
          font-weight: 600;
          line-height: 1.35;
          margin: 0;
          color: #1a1a1a;
        }
      `}</style>

      {/* Direct Featured Blog Image */}
      {article.image && (
        <div className="editorial-hero-banner">
          <img src={article.image} alt={article.title} className="editorial-hero-img" />
        </div>
      )}

      {/* Main 90% Reading Area */}
      <section className="editorial-main">
       
       
        <h1 className="editorial-title">{article.title}</h1>
        
        

        {/* Author Profile */}
        

        {/* Collapsible Horizontal Pill Badges "In this article" TOC */}
        {article.toc && article.toc.length > 0 && (
          <div className="editorial-toc-pills-container">
            <h3 
              className="editorial-toc-pills-header"
              onClick={() => setShowToc(!showToc)}
              title="Click to toggle Table of Contents"
            >
              In this article 
              <span 
                className="editorial-toc-chevron"
                style={{ transform: showToc ? 'rotate(0deg)' : 'rotate(180deg)' }}
              >
                ▲
              </span>
            </h3>
            {showToc && (
              <div className="editorial-toc-pills-wrapper">
                {article.toc.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    onClick={(e) => scrollToSection(e, heading.id)}
                    className="editorial-toc-pill"
                  >
                    {heading.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
        

        {/* Content */}
        <div
          className="editorial-content"
          dangerouslySetInnerHTML={{ __html: article.contentWithIds || article.content }}
        />
      </section>

      {/* Related Articles */}
      {otherArticles.length > 0 && (
        <section className="editorial-related">
          <div className="editorial-related-inner">
            <h3>Read More Wisdom</h3>
            <div className="editorial-related-grid">
              {otherArticles.map((item) => (
                <Link key={item.id} to={`/blog/${item.id}`} className="editorial-related-card">
                  <img src={item.image} alt={item.title} />
                  <div className="editorial-related-card-content">
                    <span className="editorial-related-tag">{item.category}</span>
                    <h4 className="editorial-related-title">{item.title}</h4>
                  </div>
                </Link>
                
              ))}
            </div>
          </div>
          
        </section>
      )}
    </main>
  );
}

export default BlogPost;
