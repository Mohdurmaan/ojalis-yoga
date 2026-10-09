import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import { getImageUrl } from '../../../utils/api';

function EventList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchTitle, setSearchTitle] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await apiFetch('/admin/events');
      setItems(res.data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await apiFetch('/admin/events/' + id, { method: 'DELETE' });
      fetchItems();
    } catch (err) {
      alert(err.message);
    }
  };

  const stripHtml = (html) => {
    if (!html) return '-';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || '';
    return text.length > 50 ? text.substring(0, 50) + '...' : text;
  };

  // Filter Logic
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const titleMatch = item.title?.toLowerCase().includes(searchTitle.toLowerCase());
      const categoryMatch = filterCategory ? item.category === filterCategory : true;
      const statusMatch = filterStatus ? item.status === filterStatus : true;
      return titleMatch && categoryMatch && statusMatch;
    });
  }, [items, searchTitle, filterCategory, filterStatus]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-card">
      <div className="admin-header-flex" style={{ flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <h2 className="admin-title" style={{ margin: 0 }}>Online Classes (Events)</h2>
        <Link to="/admin/online-classes/create" className="admin-btn admin-btn-primary">
          + Add New Event
        </Link>
      </div>

      {/* Filters Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <input 
          type="text" 
          placeholder="Search Title" 
          value={searchTitle} 
          onChange={e => { setSearchTitle(e.target.value); setCurrentPage(1); }}
          style={{ padding: '8px', border: '1px solid var(--ojalis-border)', borderRadius: '4px' }}
        />
        <select 
          value={filterCategory} 
          onChange={e => { setFilterCategory(e.target.value); setCurrentPage(1); }}
          style={{ padding: '8px', border: '1px solid var(--ojalis-border)', borderRadius: '4px' }}
        >
          <option value="">All Categories</option>
          <option value="event">Event</option>
          <option value="cohort">Cohort</option>
          <option value="class">Class</option>
        </select>
        <select 
          value={filterStatus} 
          onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }}
          style={{ padding: '8px', border: '1px solid var(--ojalis-border)', borderRadius: '4px' }}
        >
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <button 
          onClick={() => {
            setSearchTitle('');
            setFilterCategory('');
            setFilterStatus('');
            setCurrentPage(1);
          }}
          className="admin-btn admin-btn-secondary"
        >
          Clear Filters
        </button>
      </div>

      <div className="admin-table-container" style={{ overflowX: 'auto' }}>
        <table className="admin-table" style={{ minWidth: '1200px' }}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Event</th>
              <th>Category</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Mode</th>
              <th>Meeting URL</th>
              <th>Price</th>
              <th>Instructor</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="14" style={{ textAlign: 'center', padding: '32px', color: 'var(--admin-text-muted)' }}>
                  No online classes or events found.
                </td>
              </tr>
            ) : (
              currentItems.map(item => (
                <tr key={item._id}>
                  <td>
                    {item.image ? (
                      <img 
                        src={getImageUrl(item.image)} 
                        alt={item.title} 
                        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} 
                      />
                    ) : (
                      <div style={{ width: '40px', height: '40px', backgroundColor: '#f0f0f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#999' }}>-</div>
                    )}
                  </td>
                  <td style={{ fontWeight: 500, minWidth: '160px' }}>{item.title}</td>
                  <td style={{ textTransform: 'capitalize' }}>{item.category || 'event'}</td>
                  <td style={{ minWidth: '100px', whiteSpace: 'nowrap' }}>{item.startDate ? new Date(item.startDate).toLocaleDateString() : '-'}</td>
                  <td style={{ minWidth: '100px', whiteSpace: 'nowrap' }}>{item.endDate ? new Date(item.endDate).toLocaleDateString() : '-'}</td>
                  <td style={{ minWidth: '120px', whiteSpace: 'nowrap' }}>
                    {item.startTime ? item.startTime : '-'} {item.endTime ? `to ${item.endTime}` : ''}
                  </td>
                  <td>{item.location || '-'}</td>
                  <td style={{ textTransform: 'capitalize' }}>{item.mode}</td>
                  <td>
                    {item.meetingUrl ? (
                      <a href={item.meetingUrl} target="_blank" rel="noreferrer" style={{ color: '#0066cc', textDecoration: 'underline', fontSize: '13px' }}>
                        Link
                      </a>
                    ) : '-'}
                  </td>
                  <td>₹{item.price}</td>
                  <td>{item.instructor || '-'}</td>
                  <td style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '13px', color: 'var(--admin-text-muted)' }} title={stripHtml(item.description)}>
                    {stripHtml(item.description)}
                  </td>
                  <td>
                    <span className={'admin-badge ' + (item.status || 'draft')}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions-cell">
                      <Link to={'/admin/online-classes/edit/' + item._id} className="admin-btn admin-btn-secondary">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(item._id)} className="admin-btn admin-btn-danger">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="admin-btn admin-btn-secondary"
            style={{ padding: '6px 12px' }}
          >
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="admin-btn admin-btn-secondary"
            style={{ padding: '6px 12px' }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default EventList;
