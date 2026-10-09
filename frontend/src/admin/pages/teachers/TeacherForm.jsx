import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import { getImageUrl } from '../../../utils/api';

function TeacherForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  
  const [formData, setFormData] = useState({
    name: '',
    shortBio: '',
    biography: '',
    qualifications: '',
    specializations: '',
    experience: '',
    displayOrder: 0,
    status: 'published'
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (isEdit) {
      apiFetch('/admin/teachers/' + id).then(res => {
        setFormData({ ...res.data, image: undefined });
        if (res.data.profileImage) setImagePreview(getImageUrl(res.data.profileImage));
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
        await apiFetch('/admin/teachers/' + id, { method: 'PUT', body: data });
      } else {
        await apiFetch('/admin/teachers', { method: 'POST', body: data });
      }
      navigate('/admin/teachers');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="admin-card">
      <div className="admin-header-flex">
        <h2 className="admin-title">{isEdit ? 'Edit Teacher' : 'Add New Teacher'}</h2>
        <Link to="/admin/teachers" className="admin-btn admin-btn-secondary">
          Back to List
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="admin-form-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Name *</label>
            <input
              className="admin-input"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Acharya Sharma"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Short Bio / Quote</label>
            <input
              className="admin-input"
              value={formData.shortBio || ''}
              onChange={e => setFormData({ ...formData, shortBio: e.target.value })}
              placeholder="Brief tagline or philosophy"
            />
          </div>
        </div>

        <div className="admin-form-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Specializations</label>
            <input
              className="admin-input"
              value={formData.specializations || ''}
              onChange={e => setFormData({ ...formData, specializations: e.target.value })}
              placeholder="e.g. Ashtanga, Pranayama, Meditation"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Qualifications</label>
            <input
              className="admin-input"
              value={formData.qualifications || ''}
              onChange={e => setFormData({ ...formData, qualifications: e.target.value })}
              placeholder="e.g. 500-hr RYT, MA in Yoga Studies"
            />
          </div>
        </div>

        <div className="admin-form-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Experience</label>
            <input
              className="admin-input"
              value={formData.experience || ''}
              onChange={e => setFormData({ ...formData, experience: e.target.value })}
              placeholder="e.g. 12+ Years"
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
          <label className="admin-label">Biography</label>
          <textarea
            className="admin-textarea"
            value={formData.biography || ''}
            onChange={e => setFormData({ ...formData, biography: e.target.value })}
            placeholder="Detailed journey, teaching style, background..."
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Profile Image</label>
          {imagePreview && (
            <div className="admin-image-preview">
              <img src={imagePreview} alt="Teacher Preview" />
            </div>
          )}
          <div className="admin-file-wrapper">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>
        
        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary">
            {isEdit ? 'Save Changes' : 'Add Teacher'}
          </button>
          <Link to="/admin/teachers" className="admin-btn admin-btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default TeacherForm;
