import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import { getImageUrl } from '../../../utils/api';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'class',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    location: '',
    mode: 'online',
    meetingUrl: '',
    instructor: '',
    price: 0,
    status: 'published'
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (isEdit) {
      apiFetch('/admin/events/' + id).then(res => {
        const data = res.data;
        const start = data.startDate ? new Date(data.startDate).toISOString().split('T')[0] : '';
        const end = data.endDate ? new Date(data.endDate).toISOString().split('T')[0] : '';
        
        setFormData({ 
          ...data, 
          startDate: start, 
          endDate: end,
          price: data.price || 0,
          image: undefined 
        });
        if (data.image) {
          setImagePreview(getImageUrl(data.image));
        }
      }).catch(err => alert(err.message));
    }
  }, [id, isEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
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
        await apiFetch('/admin/events/' + id, { method: 'PUT', body: data });
      } else {
        await apiFetch('/admin/events', { method: 'POST', body: data });
      }
      navigate('/admin/online-classes');
    } catch (err) {
      alert(err.message);
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
      <div className="admin-header-flex">
        <h2 className="admin-title">{isEdit ? 'Edit Online Class / Event' : 'Create Online Class / Event'}</h2>
        <Link to="/admin/online-classes" className="admin-btn admin-btn-secondary">
          Back to List
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="admin-form-group">
          <label className="admin-label">Title *</label>
          <input
            className="admin-input"
            required
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Morning Vinyasa Flow"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Category *</label>
          <select
            className="admin-select"
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="event">Upcoming Event / Workshop</option>
            <option value="cohort">Active Cohort</option>
            <option value="class">Running Online Offering</option>
          </select>
        </div>

        <div className="admin-form-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Start Date *</label>
            <input
              type="date"
              className="admin-input"
              required
              value={formData.startDate}
              onChange={e => setFormData({ ...formData, startDate: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">End Date *</label>
            <input
              type="date"
              className="admin-input"
              required
              value={formData.endDate}
              onChange={e => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>
        </div>

        <div className="admin-form-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Start Time</label>
            <input
              type="time"
              className="admin-input"
              value={formData.startTime}
              onChange={e => setFormData({ ...formData, startTime: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">End Time</label>
            <input
              type="time"
              className="admin-input"
              value={formData.endTime}
              onChange={e => setFormData({ ...formData, endTime: e.target.value })}
            />
          </div>
        </div>

        <div className="admin-form-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Mode</label>
            <select
              className="admin-select"
              value={formData.mode}
              onChange={e => setFormData({ ...formData, mode: e.target.value })}
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Location (or City)</label>
            <input
              className="admin-input"
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
        </div>

        <div className="admin-form-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Meeting URL (if online)</label>
            <input
              type="url"
              className="admin-input"
              value={formData.meetingUrl}
              onChange={e => setFormData({ ...formData, meetingUrl: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Price (in INR) *</label>
            <input
              type="number"
              className="admin-input"
              required
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
        </div>

        <div className="admin-form-grid-2">
          <div className="admin-form-group">
            <label className="admin-label">Instructor</label>
            <input
              className="admin-input"
              value={formData.instructor || ''}
              onChange={e => setFormData({ ...formData, instructor: e.target.value })}
              placeholder="e.g. Acharya Sharma"
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
          <label className="admin-label">Description *</label>
          <div style={{ backgroundColor: '#fff', paddingBottom: '40px' }}>
            <ReactQuill 
              theme="snow" 
              value={formData.description} 
              onChange={val => setFormData({ ...formData, description: val })} 
              modules={modules} 
              style={{ height: '250px' }} 
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Event Cover Image</label>
          {imagePreview && (
            <div style={{ marginBottom: '10px' }}>
              <img src={imagePreview} alt="Preview" style={{ height: '120px', borderRadius: '4px', objectFit: 'cover' }} />
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
            {isEdit ? 'Save Changes' : 'Create Event'}
          </button>
          <Link to="/admin/online-classes" className="admin-btn admin-btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EventForm;
