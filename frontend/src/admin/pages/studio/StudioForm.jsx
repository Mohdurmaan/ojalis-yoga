import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import { getImageUrl } from '../../../utils/api';

function StudioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    displayOrder: 0,
    status: 'published'
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (isEdit) {
      apiFetch('/admin/studio/' + id).then(res => {
        setFormData({ ...res.data, image: undefined });
        if (res.data.image) setImagePreview(getImageUrl(res.data.image));
      }).catch(err => alert(err.message));
    }
  }, [id, isEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(k => {
      if (formData[k] !== undefined && formData[k] !== null) {
        data.append(k, formData[k]);
      }
    });
    if (image) data.append('image', image);

    try {
      if (isEdit) {
        await apiFetch('/admin/studio/' + id, { method: 'PUT', body: data });
      } else {
        await apiFetch('/admin/studio', { method: 'POST', body: data });
      }
      navigate('/admin/studio');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="admin-card">
      <div className="admin-header-flex">
        <h2 className="admin-title">{isEdit ? 'Edit Studio Photo' : 'Upload Studio Photo'}</h2>
        <Link to="/admin/studio" className="admin-btn admin-btn-secondary">
          Back to List
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="admin-form-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Title *</label>
            <input
              className="admin-input"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Main Hall Lotus View"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Category</label>
            <input
              className="admin-input"
              value={formData.category || ''}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              placeholder="e.g. Sanctuary, Garden, Asana Hall"
            />
          </div>
        </div>

        <div className="admin-form-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Display Order</label>
            <input
              type="number"
              className="admin-input"
              value={formData.displayOrder}
              onChange={e => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Status</label>
            <select
              className="admin-select"
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Description</label>
          <textarea
            className="admin-textarea"
            value={formData.description || ''}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            placeholder="Photo caption or space details..."
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Studio Photo {!isEdit && '*'}</label>
          {imagePreview && (
            <div className="admin-image-preview">
              <img src={imagePreview} alt="Studio Preview" />
            </div>
          )}
          <div className="admin-file-wrapper">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={!isEdit}
            />
          </div>
        </div>
        
        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary">
            {isEdit ? 'Save Changes' : 'Upload Photo'}
          </button>
          <Link to="/admin/studio" className="admin-btn admin-btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default StudioForm;
