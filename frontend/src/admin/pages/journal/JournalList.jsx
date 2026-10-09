import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import { getImageUrl } from '../../../utils/api';

function JournalList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchTitle, setSearchTitle] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await apiFetch('/admin/journals');
      setItems(res.data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this journal?')) return;
    try {
      await apiFetch('/admin/journals/' + id, { method: 'DELETE' });
      fetchItems();
    } catch (err) {
      alert(err.message);
    }
  };

  // Filter Logic
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const titleMatch = item.title?.toLowerCase().includes(searchTitle.toLowerCase());
      const categoryMatch = item.category?.toLowerCase().includes(searchCategory.toLowerCase());
      const statusMatch = filterStatus ? item.status === filterStatus : true;
      return titleMatch && categoryMatch && statusMatch;
    });
  }, [items, searchTitle, searchCategory, filterStatus]);

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
        <h2 className="admin-title" style={{ margin: 0 }}>Journal Posts</h2>
        <Link to="/admin/journal/create" className="admin-btn admin-btn-primary">
          + Add New Post
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
        <input 
          type="text" 
          placeholder="Search Category" 
          value={searchCategory} 
          onChange={e => { setSearchCategory(e.target.value); setCurrentPage(1); }}
          style={{ padding: '8px', border: '1px solid var(--ojalis-border)', borderRadius: '4px' }}
        />
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
            setSearchCategory('');
            setFilterStatus('');
            setCurrentPage(1);
          }}
          className="admin-btn admin-btn-secondary"
        >
          Clear Filters
        </button>
      </div>

      <div className="admin-table-container">
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
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: 'var(--admin-text-muted)' }}>
                  No journal posts found.
                </td>
              </tr>
            ) : (
              currentItems.map(item => (
                <tr key={item._id}>
                  <td>
                    {item.featuredImage ? (
                      <img src={getImageUrl(item.featuredImage)} alt={item.title} />
                    ) : (
                      <span style={{ color: 'var(--admin-text-muted)', fontSize: '12px' }}>No image</span>
                    )}
                  </td>
                  <td style={{ fontWeight: 500 }}>{item.title}</td>
                  <td>{item.category || '-'}</td>
                  <td>
                    <span className={'admin-badge ' + (item.status || 'draft')}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions-cell">
                      <Link to={'/admin/journal/edit/' + item._id} className="admin-btn admin-btn-secondary">
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

export default JournalList;
