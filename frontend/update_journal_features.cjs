const fs = require('fs');
const path = require('path');
const srcDir = path.join(__dirname, 'src');

const replaceInFile = (file, search, replacement) => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(search, replacement);
  fs.writeFileSync(file, content);
};

// 1. Blog.jsx - Update Card Layout
const blogPath = path.join(srcDir, 'pages', 'Blog.jsx');
const blogContent = fs.readFileSync(blogPath, 'utf8');

// The Blog.jsx currently has:
// <div className="container" style={{ maxWidth: "1160px" }}>
//   <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px", marginBottom: "48px" }}>
//     {loading ? ... : articles.map((article) => ( ... ))}
//   </div>

const newGrid = `
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "40px", marginBottom: "64px" }}>
            {loading ? <div style={{textAlign:"center", padding:"40px", gridColumn: "1 / -1"}}>Loading journal...</div> : articles.map((article) => (
              <Link to={\`/journal/\${article.id}\`} key={article.id} style={{ textDecoration: "none", display: "flex", flexDirection: "column", color: "inherit" }}>
                <div style={{
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  border: "1px solid var(--ojalis-border)",
                  background: article.image ? \`url(\${article.image}) center/cover no-repeat\` : "linear-gradient(145deg, #f7f3ec 0%, #ede6db 100%)",
                  aspectRatio: "4 / 3",
                  width: "100%",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                />
                <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontSize: "11px", letterSpacing: "1.5px", fontWeight: 700, textTransform: "uppercase", color: "var(--ojalis-gold-dark)" }}>
                      {article.category || "Journal"}
                    </span>
                    <span style={{ fontSize: "12px", color: "var(--ojalis-text-muted)" }}>
                      {article.readTime || "5 min read"}
                    </span>
                  </div>
                  <h4 style={{ fontSize: "20px", color: "var(--ojalis-burgundy)", fontFamily: "var(--font-serif)", marginBottom: "8px", marginTop: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: "56px" }}>
                    {article.title}
                  </h4>
                  {article.summary && (
                    <p style={{ fontSize: "13.5px", color: "var(--ojalis-text-muted)", lineHeight: 1.6, margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {article.summary}
                    </p>
                  )}
                  <div style={{ marginTop: "12px", fontSize: "12px", color: "var(--ojalis-text-muted)", fontWeight: 500 }}>
                    By {article.author}
                  </div>
                </div>
              </Link>
            ))}
          </div>
`;

replaceInFile(blogPath, /<div style={{ display: "grid".*?<\/div>\s*<\/div>\s*<\/section>/s, newGrid + '\n        </div>\n      </section>');


// 2. BlogPost.jsx - DOMPurify
const blogPostPath = path.join(srcDir, 'pages', 'BlogPost.jsx');
let bpContent = fs.readFileSync(blogPostPath, 'utf8');
if (!bpContent.includes('DOMPurify')) {
  bpContent = bpContent.replace('import { useState, useEffect } from "react";', 'import { useState, useEffect } from "react";\nimport DOMPurify from "dompurify";');
  
  // Replace the content rendering to use dangerouslySetInnerHTML
  // Currently it might be just mapping paragraphs or raw string.
  // We will find the content rendering area.
  bpContent = bpContent.replace(/<div className="article-content".*?<\/div>/s, 
    `<div className="article-content" style={{ fontSize: "16px", lineHeight: 1.8, color: "var(--ojalis-text-muted)", marginTop: "40px" }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }} />`
  );
  fs.writeFileSync(blogPostPath, bpContent);
}

// 3. JournalForm.jsx - ReactQuill, Image Preview, Auto-Slug
const formPath = path.join(srcDir, 'admin', 'pages', 'journal', 'JournalForm.jsx');
const newFormContent = `
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch, getImageUrl } from '../../../services/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function JournalForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  
  const [formData, setFormData] = useState({ title: '', slug: '', content: '', author: '', category: '', status: 'draft' });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      apiFetch('/admin/journals/' + id).then(res => {
        setFormData({ ...res.data, image: undefined });
        if (res.data.featuredImage) setImagePreview(getImageUrl(res.data.featuredImage));
      }).catch(err => setError(err.message));
    }
  }, [id, isEdit]);

  const generateSlug = (text) => {
    return text.toString().toLowerCase()
      .replace(/\\s+/g, '-')
      .replace(/[^\\w\\-]+/g, '')
      .replace(/\\-\\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const data = new FormData();
    Object.keys(formData).forEach(k => data.append(k, formData[k]));
    if (image) data.append('image', image);

    try {
      if (isEdit) {
        await apiFetch('/admin/journals/' + id, { method: 'PUT', body: data });
      } else {
        await apiFetch('/admin/journals', { method: 'POST', body: data });
      }
      navigate('/admin/journal');
    } catch (err) { 
      if (err.message.includes('11000') || err.message.toLowerCase().includes('duplicate')) {
        setError('A journal with this slug already exists. Please modify the title or slug.');
      } else {
        setError(err.message); 
      }
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div className="admin-card">
      <h2 className="admin-title" style={{ marginBottom: '24px' }}>{isEdit ? 'Edit Journal' : 'Create Journal'}</h2>
      {error && <div className="admin-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="admin-form-group"><label className="admin-label">Title</label>
          <input className="admin-input" required value={formData.title} onChange={handleTitleChange} /></div>
        <div className="admin-form-group"><label className="admin-label">Slug</label>
          <input className="admin-input" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Category</label>
          <input className="admin-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Author</label>
          <input className="admin-input" required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} /></div>
        
        <div className="admin-form-group"><label className="admin-label">Content</label>
          <div style={{ backgroundColor: '#fff', paddingBottom: '40px' }}>
            <ReactQuill theme="snow" value={formData.content} onChange={val => setFormData({...formData, content: val})} modules={modules} style={{ height: '300px' }} />
          </div>
        </div>

        <div className="admin-form-group"><label className="admin-label">Status</label>
          <select className="admin-select" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
            <option value="draft">Draft</option><option value="published">Published</option>
          </select>
        </div>
        
        <div className="admin-form-group"><label className="admin-label">Featured Image</label>
          {imagePreview && <div style={{ marginBottom: '10px' }}><img src={imagePreview} alt="Preview" style={{ height: '120px', borderRadius: '4px', objectFit: 'cover' }} /></div>}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        
        <button type="submit" className="admin-btn admin-btn-primary">Save Journal</button>
      </form>
    </div>
  );
}
export default JournalForm;
`;
fs.writeFileSync(formPath, newFormContent);

// 4. Update backend JournalController to catch 11000 errors and return clean message
// Actually, mongoose automatically handles it and throws E11000, which error.message captures.
// Our frontend already handles the '11000' substring check!
console.log('Update script finished.');
