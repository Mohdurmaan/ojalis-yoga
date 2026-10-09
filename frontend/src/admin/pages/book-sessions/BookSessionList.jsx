import { useState, useEffect, useMemo } from 'react';
import { apiFetch } from '../../services/api';

function BookSessionList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null); // For details modal

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProgram, setFilterProgram] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await apiFetch('/book-sessions');
      setItems(res.data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await apiFetch(`/book-sessions/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      });
      fetchItems();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this book session request?')) return;
    try {
      await apiFetch(`/book-sessions/${id}`, { method: 'DELETE' });
      fetchItems();
    } catch (err) {
      alert(err.message);
    }
  };

  // Filter Logic
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const queryMatch = item.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.email?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.phone?.includes(searchQuery);
      const programMatch = item.program?.toLowerCase().includes(filterProgram.toLowerCase());
      const statusMatch = filterStatus ? item.status === filterStatus : true;
      return queryMatch && programMatch && statusMatch;
    });
  }, [items, searchQuery, filterProgram, filterStatus]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-card" style={{ position: 'relative' }}>
      <div className="admin-header-flex" style={{ flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <h2 className="admin-title" style={{ margin: 0 }}>Book Sessions</h2>
      </div>

      {/* Filters Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <input 
          type="text" 
          placeholder="Search Name/Email/Phone" 
          value={searchQuery} 
          onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          style={{ padding: '8px', border: '1px solid var(--ojalis-border)', borderRadius: '4px' }}
        />
        <input 
          type="text" 
          placeholder="Search Program" 
          value={filterProgram} 
          onChange={e => { setFilterProgram(e.target.value); setCurrentPage(1); }}
          style={{ padding: '8px', border: '1px solid var(--ojalis-border)', borderRadius: '4px' }}
        />
        <select 
          value={filterStatus} 
          onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }}
          style={{ padding: '8px', border: '1px solid var(--ojalis-border)', borderRadius: '4px' }}
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button 
          onClick={() => {
            setSearchQuery('');
            setFilterProgram('');
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
              <th>Name</th>
              <th>Program</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--admin-text-muted)' }}>
                  No book sessions found.
                </td>
              </tr>
            ) : (
              currentItems.map(item => (
                <tr key={item._id}>
                  <td style={{ fontWeight: 500 }}>{item.name}</td>
                  <td>{item.program}</td>
                  <td>{item.date}</td>
                  <td>{item.timeSlot}</td>
                  <td>
                    <select 
                      value={item.status} 
                      onChange={(e) => handleStatusChange(item._id, e.target.value)}
                      style={{ padding: '6px', borderRadius: '4px', border: '1px solid var(--ojalis-border)' }}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <div className="admin-actions-cell">
                      <button onClick={() => setSelectedSession(item)} className="admin-btn admin-btn-secondary">
                        View
                      </button>
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

      {/* Details Modal */}
      {selectedSession && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, 
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: 'white', padding: '32px', borderRadius: '8px', 
            maxWidth: '500px', width: '100%', maxHeight: '90vh', overflowY: 'auto'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '24px', color: 'var(--ojalis-burgundy)', fontSize: '20px' }}>Session Details</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div><strong>Name:</strong> {selectedSession.name}</div>
              <div><strong>Email:</strong> {selectedSession.email}</div>
              <div><strong>Phone:</strong> {selectedSession.phone}</div>
              <div><strong>Program:</strong> {selectedSession.program}</div>
              <div><strong>Preferred Date:</strong> {selectedSession.date}</div>
              <div><strong>Preferred Time:</strong> {selectedSession.timeSlot}</div>
              <div><strong>Message:</strong> <p style={{ margin: '8px 0', whiteSpace: 'pre-wrap' }}>{selectedSession.message || 'N/A'}</p></div>
              <div><strong>Status:</strong> {selectedSession.status}</div>
              <div><strong>Submitted:</strong> {new Date(selectedSession.createdAt).toLocaleString()}</div>
            </div>
            <div style={{ marginTop: '32px', textAlign: 'right' }}>
              <button onClick={() => setSelectedSession(null)} className="admin-btn admin-btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookSessionList;
