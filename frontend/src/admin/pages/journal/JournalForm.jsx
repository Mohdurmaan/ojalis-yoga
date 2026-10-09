import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import { getImageUrl } from '../../../utils/api';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

function JournalForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    author: '',
    category: '',
    status: 'draft'
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      apiFetch('/admin/journals/' + id).then(res => {
        const journal = res.data || res.journal || res;
        setFormData(prev => ({
          ...prev,
          ...journal,
          image: undefined
        }));
        if (journal.featuredImage) setImagePreview(getImageUrl(journal.featuredImage));
        setIsLoading(false);
      }).catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
    }
  }, [id, isEdit]);

  const generateSlug = (text) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
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
    Object.keys(formData).forEach(k => {
      if (formData[k] !== undefined && formData[k] !== null) {
        data.append(k, formData[k]);
      }
    });
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

  if (isLoading) {
    return (
      <div className="admin-card">
        <div className="admin-header-flex">
          <h2 className="admin-title">Edit Journal Post</h2>
        </div>
        <div style={{ padding: '2rem', textAlign: 'center' }}>Loading journal data...</div>
      </div>
    );
  }

  return (
    <div className="admin-card">
      <div className="admin-header-flex">
        <h2 className="admin-title">{isEdit ? 'Edit Journal Post' : 'Create Journal Post'}</h2>
        <Link to="/admin/journal" className="admin-btn admin-btn-secondary">
          Back to List
        </Link>
      </div>

      {error && <div className="admin-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="admin-form-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Title *</label>
            <input
              className="admin-input"
              required
              value={formData.title || ''}
              onChange={handleTitleChange}
              placeholder="Post title"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Slug *</label>
            <input
              className="admin-input"
              required
              value={formData.slug || ''}
              onChange={e => setFormData({ ...formData, slug: e.target.value })}
              placeholder="url-friendly-slug"
            />
          </div>
        </div>

        <div className="admin-form-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Category</label>
            <input
              className="admin-input"
              value={formData.category || ''}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              placeholder="e.g. Asana, Philosophy, Wellness"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Author *</label>
            <input
              className="admin-input"
              required
              value={formData.author || ''}
              onChange={e => setFormData({ ...formData, author: e.target.value })}
              placeholder="Author name"
            />
          </div>
        </div>
        
        <div className="admin-form-group">
          <label className="admin-label">Content</label>
          <div className="admin-quill-wrapper">
            <ReactQuill
              theme="snow"
              value={formData.content || ''}
              onChange={val => setFormData({ ...formData, content: val })}
              modules={modules}
              style={{ minHeight: '260px' }}
            />
          </div>
        </div>

        <div className="admin-form-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Status</label>
            <select
              className="admin-select"
              value={formData.status || 'draft'}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          
          <div className="admin-form-group">
            <label className="admin-label">Featured Image</label>
            {imagePreview && (
              <div className="admin-image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
            <div className="admin-file-wrapper">
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>
        </div>
        
        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary">
            {isEdit ? 'Save Changes' : 'Publish Journal'}
          </button>
          <Link to="/admin/journal" className="admin-btn admin-btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default JournalForm;

