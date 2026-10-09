const fs = require('fs');
const path = require('path');
const srcAdminDir = path.join(__dirname, 'src', 'admin');

const pagesDir = path.join(srcAdminDir, 'pages');
if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });

['journal', 'studio', 'events', 'teachers'].forEach(d => {
  if (!fs.existsSync(path.join(pagesDir, d))) fs.mkdirSync(path.join(pagesDir, d));
});

// JournalList.jsx
fs.writeFileSync(path.join(pagesDir, 'journal', 'JournalList.jsx'), `
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../services/api';

function JournalList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await apiFetch('/admin/journals');
      setItems(res.data);
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this journal?')) return;
    try {
      await apiFetch('/admin/journals/' + id, { method: 'DELETE' });
      fetchItems();
    } catch (err) { alert(err.message); }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-card">
      <div className="admin-header-flex">
        <h2 className="admin-title">Journal Posts</h2>
        <Link to="/admin/journal/create" className="admin-btn admin-btn-primary">Add New Post</Link>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              <td>{item.featuredImage && <img src={'http://localhost:5000' + item.featuredImage} alt="thumb" />}</td>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td><span className={'admin-badge ' + item.status}>{item.status}</span></td>
              <td>
                <Link to={'/admin/journal/edit/' + item._id} className="admin-btn admin-btn-secondary" style={{ marginRight: '8px' }}>Edit</Link>
                <button onClick={() => handleDelete(item._id)} className="admin-btn admin-btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default JournalList;
`);

// JournalForm.jsx
fs.writeFileSync(path.join(pagesDir, 'journal', 'JournalForm.jsx'), `
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../../services/api';

function JournalForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  
  const [formData, setFormData] = useState({ title: '', slug: '', excerpt: '', content: '', author: '', category: '', status: 'draft' });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (isEdit) {
      apiFetch('/admin/journals/' + id).then(res => {
        setFormData({ ...res.data, image: undefined });
      }).catch(err => alert(err.message));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="admin-card">
      <h2 className="admin-title" style={{ marginBottom: '24px' }}>{isEdit ? 'Edit Journal' : 'Create Journal'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="admin-form-group"><label className="admin-label">Title</label>
          <input className="admin-input" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Slug</label>
          <input className="admin-input" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Category</label>
          <input className="admin-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Author</label>
          <input className="admin-input" required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Excerpt</label>
          <textarea className="admin-textarea" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Content (HTML)</label>
          <textarea className="admin-textarea" required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Status</label>
          <select className="admin-select" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
            <option value="draft">Draft</option><option value="published">Published</option>
          </select>
        </div>
        <div className="admin-form-group"><label className="admin-label">Featured Image</label>
          <input type="file" onChange={e => setImage(e.target.files[0])} /></div>
        
        <button type="submit" className="admin-btn admin-btn-primary">Save Journal</button>
      </form>
    </div>
  );
}
export default JournalForm;
`);

// Same for Studio, Events, Teachers...
// StudioList.jsx
fs.writeFileSync(path.join(pagesDir, 'studio', 'StudioList.jsx'), `
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../services/api';

function StudioList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await apiFetch('/admin/studio');
      setItems(res.data);
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this photo?')) return;
    try {
      await apiFetch('/admin/studio/' + id, { method: 'DELETE' });
      fetchItems();
    } catch (err) { alert(err.message); }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-card">
      <div className="admin-header-flex">
        <h2 className="admin-title">Studio Photos</h2>
        <Link to="/admin/studio/create" className="admin-btn admin-btn-primary">Add New Photo</Link>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              <td>{item.image && <img src={'http://localhost:5000' + item.image} alt="thumb" />}</td>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td><span className={'admin-badge ' + item.status}>{item.status}</span></td>
              <td>
                <Link to={'/admin/studio/edit/' + item._id} className="admin-btn admin-btn-secondary" style={{ marginRight: '8px' }}>Edit</Link>
                <button onClick={() => handleDelete(item._id)} className="admin-btn admin-btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default StudioList;
`);

// StudioForm.jsx
fs.writeFileSync(path.join(pagesDir, 'studio', 'StudioForm.jsx'), `
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../../services/api';

function StudioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  
  const [formData, setFormData] = useState({ title: '', category: '', description: '', displayOrder: 0, status: 'published' });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (isEdit) {
      apiFetch('/admin/studio/' + id).then(res => {
        setFormData({ ...res.data, image: undefined });
      }).catch(err => alert(err.message));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(k => data.append(k, formData[k]));
    if (image) data.append('image', image);

    try {
      if (isEdit) {
        await apiFetch('/admin/studio/' + id, { method: 'PUT', body: data });
      } else {
        await apiFetch('/admin/studio', { method: 'POST', body: data });
      }
      navigate('/admin/studio');
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="admin-card">
      <h2 className="admin-title" style={{ marginBottom: '24px' }}>{isEdit ? 'Edit Photo' : 'Create Photo'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="admin-form-group"><label className="admin-label">Title</label>
          <input className="admin-input" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Category</label>
          <input className="admin-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Description</label>
          <textarea className="admin-textarea" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Display Order</label>
          <input type="number" className="admin-input" value={formData.displayOrder} onChange={e => setFormData({...formData, displayOrder: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Status</label>
          <select className="admin-select" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
            <option value="draft">Draft</option><option value="published">Published</option>
          </select>
        </div>
        <div className="admin-form-group"><label className="admin-label">Image</label>
          <input type="file" onChange={e => setImage(e.target.files[0])} required={!isEdit} /></div>
        
        <button type="submit" className="admin-btn admin-btn-primary">Save Photo</button>
      </form>
    </div>
  );
}
export default StudioForm;
`);

// EventList.jsx
fs.writeFileSync(path.join(pagesDir, 'events', 'EventList.jsx'), `
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../services/api';

function EventList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await apiFetch('/admin/events');
      setItems(res.data);
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await apiFetch('/admin/events/' + id, { method: 'DELETE' });
      fetchItems();
    } catch (err) { alert(err.message); }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-card">
      <div className="admin-header-flex">
        <h2 className="admin-title">Online Classes (Events)</h2>
        <Link to="/admin/online-classes/create" className="admin-btn admin-btn-primary">Add New Event</Link>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Mode</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>{item.mode}</td>
              <td><span className={'admin-badge ' + item.status}>{item.status}</span></td>
              <td>
                <Link to={'/admin/online-classes/edit/' + item._id} className="admin-btn admin-btn-secondary" style={{ marginRight: '8px' }}>Edit</Link>
                <button onClick={() => handleDelete(item._id)} className="admin-btn admin-btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default EventList;
`);

// EventForm.jsx
fs.writeFileSync(path.join(pagesDir, 'events', 'EventForm.jsx'), `
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../../services/api';

function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  
  const [formData, setFormData] = useState({ title: '', description: '', date: '', startTime: '', endTime: '', location: '', mode: 'online', meetingUrl: '', instructor: '', price: 0, registrationUrl: '', status: 'published' });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (isEdit) {
      apiFetch('/admin/events/' + id).then(res => {
        let theDate = '';
        if (res.data.date) theDate = new Date(res.data.date).toISOString().split('T')[0];
        setFormData({ ...res.data, date: theDate, image: undefined });
      }).catch(err => alert(err.message));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(k => data.append(k, formData[k]));
    if (image) data.append('image', image);

    try {
      if (isEdit) {
        await apiFetch('/admin/events/' + id, { method: 'PUT', body: data });
      } else {
        await apiFetch('/admin/events', { method: 'POST', body: data });
      }
      navigate('/admin/online-classes');
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="admin-card">
      <h2 className="admin-title" style={{ marginBottom: '24px' }}>{isEdit ? 'Edit Event' : 'Create Event'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="admin-form-group"><label className="admin-label">Title</label>
          <input className="admin-input" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Date</label>
          <input type="date" className="admin-input" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Mode</label>
          <select className="admin-select" value={formData.mode} onChange={e => setFormData({...formData, mode: e.target.value})}>
            <option value="online">Online</option><option value="offline">Offline</option>
          </select></div>
        <div className="admin-form-group"><label className="admin-label">Instructor</label>
          <input className="admin-input" value={formData.instructor} onChange={e => setFormData({...formData, instructor: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Description</label>
          <textarea className="admin-textarea" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Status</label>
          <select className="admin-select" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
            <option value="draft">Draft</option><option value="published">Published</option>
          </select>
        </div>
        <div className="admin-form-group"><label className="admin-label">Event Image</label>
          <input type="file" onChange={e => setImage(e.target.files[0])} /></div>
        
        <button type="submit" className="admin-btn admin-btn-primary">Save Event</button>
      </form>
    </div>
  );
}
export default EventForm;
`);

// TeacherList.jsx
fs.writeFileSync(path.join(pagesDir, 'teachers', 'TeacherList.jsx'), `
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../services/api';

function TeacherList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await apiFetch('/admin/teachers');
      setItems(res.data);
    } catch (err) { alert(err.message); } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this teacher?')) return;
    try {
      await apiFetch('/admin/teachers/' + id, { method: 'DELETE' });
      fetchItems();
    } catch (err) { alert(err.message); }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-card">
      <div className="admin-header-flex">
        <h2 className="admin-title">Teachers</h2>
        <Link to="/admin/teachers/create" className="admin-btn admin-btn-primary">Add New Teacher</Link>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              <td>{item.profileImage && <img src={'http://localhost:5000' + item.profileImage} alt="thumb" />}</td>
              <td>{item.name}</td>
              <td>{item.specializations}</td>
              <td><span className={'admin-badge ' + item.status}>{item.status}</span></td>
              <td>
                <Link to={'/admin/teachers/edit/' + item._id} className="admin-btn admin-btn-secondary" style={{ marginRight: '8px' }}>Edit</Link>
                <button onClick={() => handleDelete(item._id)} className="admin-btn admin-btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TeacherList;
`);

// TeacherForm.jsx
fs.writeFileSync(path.join(pagesDir, 'teachers', 'TeacherForm.jsx'), `
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../../services/api';

function TeacherForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  
  const [formData, setFormData] = useState({ name: '', shortBio: '', biography: '', qualifications: '', specializations: '', experience: '', displayOrder: 0, status: 'published' });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (isEdit) {
      apiFetch('/admin/teachers/' + id).then(res => {
        setFormData({ ...res.data, image: undefined });
      }).catch(err => alert(err.message));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(k => data.append(k, formData[k]));
    if (image) data.append('image', image);

    try {
      if (isEdit) {
        await apiFetch('/admin/teachers/' + id, { method: 'PUT', body: data });
      } else {
        await apiFetch('/admin/teachers', { method: 'POST', body: data });
      }
      navigate('/admin/teachers');
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="admin-card">
      <h2 className="admin-title" style={{ marginBottom: '24px' }}>{isEdit ? 'Edit Teacher' : 'Create Teacher'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="admin-form-group"><label className="admin-label">Name</label>
          <input className="admin-input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Short Bio / Quote</label>
          <input className="admin-input" value={formData.shortBio} onChange={e => setFormData({...formData, shortBio: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Specializations</label>
          <input className="admin-input" value={formData.specializations} onChange={e => setFormData({...formData, specializations: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Qualifications</label>
          <input className="admin-input" value={formData.qualifications} onChange={e => setFormData({...formData, qualifications: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Experience</label>
          <input className="admin-input" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Biography</label>
          <textarea className="admin-textarea" value={formData.biography} onChange={e => setFormData({...formData, biography: e.target.value})} /></div>
        <div className="admin-form-group"><label className="admin-label">Status</label>
          <select className="admin-select" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
            <option value="draft">Draft</option><option value="published">Published</option>
          </select>
        </div>
        <div className="admin-form-group"><label className="admin-label">Profile Image</label>
          <input type="file" onChange={e => setImage(e.target.files[0])} /></div>
        
        <button type="submit" className="admin-btn admin-btn-primary">Save Teacher</button>
      </form>
    </div>
  );
}
export default TeacherForm;
`);

console.log("React Admin Pages Scaffolded.");
