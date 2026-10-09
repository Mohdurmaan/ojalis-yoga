const fs = require('fs');
const path = require('path');
const pagesDir = path.join(__dirname, 'src', 'pages');

// Helper to replace content
const replaceInFile = (file, search, replacement) => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(search, replacement);
  fs.writeFileSync(filePath, content);
};

// 1. Blog.jsx
replaceInFile('Blog.jsx', 
  'import { Link } from "react-router-dom";\nimport { blogArticles } from "../data/blogData";',
  'import { Link } from "react-router-dom";\nimport { useState, useEffect } from "react";\nimport { blogArticles as fallbackArticles } from "../data/blogData";\nimport { fetchPublic, getImageUrl } from "../utils/api";'
);
replaceInFile('Blog.jsx',
  'function Blog() {',
  'function Blog() {\n  const [articles, setArticles] = useState(fallbackArticles);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetchPublic("/journals").then(data => {\n      if (data && data.length > 0) {\n        // Map backend fields to frontend expected fields\n        const mapped = data.map(item => ({\n          id: item._id,\n          title: item.title,\n          category: item.category || "Journal",\n          readTime: "5 min read",\n          summary: item.excerpt || "",\n          author: item.author,\n          image: getImageUrl(item.featuredImage)\n        }));\n        setArticles(mapped);\n      }\n      setLoading(false);\n    });\n  }, []);\n'
);
replaceInFile('Blog.jsx',
  '{blogArticles.map((article) => (',
  '{loading ? <div style={{textAlign:"center", padding:"40px"}}>Loading journal...</div> : articles.map((article) => ('
);

// 2. BlogPost.jsx
replaceInFile('BlogPost.jsx',
  'import { useParams, Link } from "react-router-dom";\nimport { blogArticles } from "../data/blogData";',
  'import { useParams, Link } from "react-router-dom";\nimport { useState, useEffect } from "react";\nimport { blogArticles as fallbackArticles } from "../data/blogData";\nimport { fetchPublic, getImageUrl } from "../utils/api";'
);
replaceInFile('BlogPost.jsx',
  'function BlogPost() {\n  const { id } = useParams();\n  const article = blogArticles.find((item) => item.id === id) || blogArticles[0];\n\n  const otherArticles = blogArticles.filter((item) => item.id !== article.id).slice(0, 2);',
  'function BlogPost() {\n  const { id } = useParams();\n  const [article, setArticle] = useState(null);\n  const [otherArticles, setOtherArticles] = useState([]);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    // Fetch all to find the one, and get related\n    fetchPublic("/journals").then(data => {\n      if (data && data.length > 0) {\n        const mapped = data.map(item => ({\n          id: item._id,\n          title: item.title,\n          category: item.category || "Journal",\n          readTime: "5 min read",\n          summary: item.excerpt || "",\n          content: item.content,\n          author: item.author,\n          date: new Date(item.publishedAt || item.createdAt).toLocaleDateString(),\n          image: getImageUrl(item.featuredImage)\n        }));\n        const found = mapped.find(item => item.id === id) || mapped[0];\n        setArticle(found);\n        setOtherArticles(mapped.filter(item => item.id !== found.id).slice(0, 2));\n      } else {\n        const foundFallback = fallbackArticles.find(item => item.id === id) || fallbackArticles[0];\n        setArticle(foundFallback);\n        setOtherArticles(fallbackArticles.filter(item => item.id !== foundFallback.id).slice(0, 2));\n      }\n      setLoading(false);\n    });\n  }, [id]);\n\n  if (loading || !article) return <div style={{textAlign:"center", padding:"100px", minHeight:"60vh"}}>Loading article...</div>;'
);

console.log("Blog pages updated successfully.");
