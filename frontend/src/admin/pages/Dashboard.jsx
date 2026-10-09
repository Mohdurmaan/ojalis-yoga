import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [bookSessions, setBookSessions] = useState([]);
  const [eventBookings, setEventBookings] = useState([]);
  const [payoutSummary, setPayoutSummary] = useState(null);

  useEffect(() => {
    fetchStats();
    fetchBookSessions();
    fetchEventBookings();
    fetchPayoutSummary();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await apiFetch('/admin/dashboard');
      setStats(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookSessions = async () => {
    try {
      const res = await apiFetch('/book-sessions');
      setBookSessions(res.data);
    } catch (err) {
      console.error('Error fetching book sessions', err);
    }
  };

  const fetchEventBookings = async () => {
    try {
      const res = await apiFetch('/event-bookings');
      setEventBookings(res.data);
    } catch (err) {
      console.error('Error fetching event bookings', err);
    }
  };

  const fetchPayoutSummary = async () => {
    try {
      const res = await apiFetch('/event-bookings/payout-summary');
      setPayoutSummary(res.data);
    } catch (err) {
      console.error('Error fetching payout summary', err);
    }
  };

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div className="admin-error">{error}</div>;

  return (
    <div>
      <div className="admin-header-flex">
        <h1 className="admin-title">Dashboard Overview</h1>
      </div>
      
      <div className="admin-stats-grid">
        <div className="admin-card admin-stat-card">
          <div className="admin-stat-label">Total Journals</div>
          <div className="admin-stat-number">{stats?.totalJournals ?? 0}</div>
          <div className="admin-stat-subtext">{stats?.publishedJournals ?? 0} Published</div>
        </div>

        <div className="admin-card admin-stat-card">
          <div className="admin-stat-label">Studio Photos</div>
          <div className="admin-stat-number">{stats?.totalStudioPhotos ?? 0}</div>
        </div>

        <div className="admin-card admin-stat-card">
          <div className="admin-stat-label">Online Classes (Events)</div>
          <div className="admin-stat-number">{stats?.totalEvents ?? 0}</div>
          <div className="admin-stat-subtext">{stats?.upcomingEvents ?? 0} Upcoming</div>
        </div>

        <div className="admin-card admin-stat-card">
          <div className="admin-stat-label">Teachers</div>
          <div className="admin-stat-number">{stats?.totalTeachers ?? 0}</div>
          <div className="admin-stat-subtext">{stats?.publishedTeachers ?? 0} Published</div>
        </div>

        <div className="admin-card admin-stat-card" style={{ borderLeft: '4px solid var(--ojalis-gold-dark)' }}>
          <div className="admin-stat-label">Book Sessions</div>
          <div className="admin-stat-number">{bookSessions.length}</div>
          <div className="admin-stat-subtext" style={{ color: '#d97706' }}>{bookSessions.filter(s => s.status === 'New').length} New Requests</div>
        </div>

        <div className="admin-card admin-stat-card" style={{ borderLeft: '4px solid var(--ojalis-gold)' }}>
          <div className="admin-stat-label">Event Bookings</div>
          <div className="admin-stat-number">{eventBookings.length}</div>
          <div className="admin-stat-subtext" style={{ color: '#2e7d32' }}>{eventBookings.filter(b => b.paymentStatus === 'Paid').length} Paid</div>
        </div>
      </div>

      {payoutSummary && (
        <div style={{ marginTop: '2.5rem' }}>
          <div className="admin-header-flex" style={{ marginBottom: '1rem' }}>
            <h2 className="admin-title" style={{ fontSize: '1.25rem', color: 'var(--ojalis-gold-dark)' }}>Payout Summary</h2>
          </div>
          <div className="admin-stats-grid">
            <div className="admin-card admin-stat-card" style={{ borderLeft: '4px solid #10b981' }}>
              <div className="admin-stat-label">Total Collected</div>
              <div className="admin-stat-number">₹{payoutSummary.totalCollected?.toLocaleString('en-IN') || 0}</div>
            </div>
            <div className="admin-card admin-stat-card" style={{ borderLeft: '4px solid #10b981' }}>
              <div className="admin-stat-label">Successful Bookings</div>
              <div className="admin-stat-number">{payoutSummary.successfulBookings || 0}</div>
            </div>
            <div className="admin-card admin-stat-card" style={{ borderLeft: '4px solid #10b981' }}>
              <div className="admin-stat-label">Net Payout</div>
              <div className="admin-stat-number" style={{ color: '#10b981' }}>₹{payoutSummary.netPayout?.toLocaleString('en-IN') || 0}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
