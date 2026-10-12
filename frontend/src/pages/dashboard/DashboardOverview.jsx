import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { userApiFetch } from '../../utils/userApi';
import './userDashboard.css';

export default function DashboardOverview() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await userApiFetch('/event-bookings/my');
        if (res.success && Array.isArray(res.data)) {
          setBookings(res.data);
        }
      } catch (err) {
        setError('Could not load recent bookings activity');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Compute metrics
  const totalBookings = bookings.length;
  
  const upcomingBookings = bookings.filter((b) => {
    const status = (b.bookingStatus || '').toUpperCase();
    if (status === 'CANCELLED') return false;
    const eventDate = b.eventId?.startDate || b.eventDate;
    if (!eventDate) return true; // if not specified, consider active
    const eventTime = new Date(eventDate).getTime();
    return eventTime >= new Date().setHours(0, 0, 0, 0);
  }).length;

  const paidBookings = bookings.filter((b) => {
    const payStatus = (b.paymentStatus || '').toUpperCase();
    const bookStatus = (b.bookingStatus || '').toUpperCase();
    return payStatus === 'PAID' && bookStatus !== 'CANCELLED';
  }).length;

  const recentBookings = bookings.slice(0, 4);

  const getBookingAmount = (b) => {
    if (b.amount !== undefined && b.amount !== null && b.amount !== '') return b.amount;
    if (b.totalAmount !== undefined && b.totalAmount !== null && b.totalAmount !== '') return b.totalAmount;
    if (b.eventId?.price !== undefined && b.eventId?.price !== null) return b.eventId.price;
    return 0;
  };

  return (
    <>
      {/* Welcome Banner */}
      <div className="user-welcome-card">
        <span className="user-welcome-tag">Namaste & Welcome</span>
        <h1 className="user-welcome-title">
          Greetings, {user?.name || 'Devotee of Yoga'}
        </h1>
        <p className="user-welcome-desc">
          Welcome to your personal Ojalis Yoga sanctuary. Track your enrolled workshops,
          manage your studio bookings, and stay connected on your path of mindfulness.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="user-stats-grid">
        <div className="user-stat-card">
          <div className="user-stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div>
            <h3 className="user-stat-num">{loading ? '...' : totalBookings}</h3>
            <p className="user-stat-label">Total Bookings</p>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="user-stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <h3 className="user-stat-num">{loading ? '...' : upcomingBookings}</h3>
            <p className="user-stat-label">Upcoming Sessions</p>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="user-stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div>
            <h3 className="user-stat-num">{loading ? '...' : paidBookings}</h3>
            <p className="user-stat-label">Confirmed & Paid</p>
          </div>
        </div>
      </div>

      {/* Recent Bookings Activity */}
      <div className="user-content-card">
        <div className="user-card-header">
          <div>
            <h2 className="user-card-title">Recent Booking Activity</h2>
            <p className="user-card-subtitle">
              Your recent workshop enrollments and practice requests
            </p>
          </div>
          <Link to="/dashboard/bookings" className="user-btn-secondary">
            View All Bookings
          </Link>
        </div>

        {error && (
          <div className="user-alert user-alert-error" style={{ marginBottom: '16px' }}>
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#6B6164' }}>
            Loading booking activity...
          </div>
        ) : recentBookings.length === 0 ? (
          <div className="user-empty-state">
            <div className="user-empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="user-empty-title">No Bookings Yet</h3>
            <p className="user-empty-desc">
              You haven't registered for any workshops or sessions yet. Explore our authentic yoga
              offerings and start your journey today.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/events" className="user-btn-primary" style={{ width: 'auto', textDecoration: 'none' }}>
                Explore Events
              </Link>
              <Link to="/book-session" className="user-btn-secondary">
                Book a Session
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="user-bookings-table-wrap">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Event / Session</th>
                    <th>Booking ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b) => {
                    const payStatus = (b.paymentStatus || '').toUpperCase();
                    const bookStatus = (b.bookingStatus || '').toUpperCase();
                    const ticketsCount = b.tickets || 1;
                    return (
                      <tr key={b._id}>
                        <td>
                          <div style={{ fontWeight: 600, color: 'var(--user-charcoal)' }}>
                            {b.eventId?.title || b.eventTitle || 'Yoga Practice'}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--user-charcoal-muted)' }}>
                            {ticketsCount} Ticket{ticketsCount > 1 ? 's' : ''}
                          </div>
                        </td>
                        <td>
                          <code style={{ fontSize: '0.8rem', background: '#F0EBDD', padding: '2px 6px', borderRadius: '4px' }}>
                            {b.bookingId || b._id.slice(-8).toUpperCase()}
                          </code>
                        </td>
                        <td>
                          {new Date(b.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td style={{ fontWeight: 600, color: 'var(--user-charcoal)' }}>
                          ₹{getBookingAmount(b)}
                        </td>
                        <td>
                          <span
                            className={`user-badge ${
                              payStatus === 'PAID'
                                ? 'user-badge-success'
                                : payStatus === 'FAILED'
                                ? 'user-badge-danger'
                                : 'user-badge-warning'
                            }`}
                          >
                            {b.paymentStatus || 'Pending'}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`user-badge ${
                              bookStatus === 'CONFIRMED'
                                ? 'user-badge-success'
                                : bookStatus === 'CANCELLED'
                                ? 'user-badge-danger'
                                : 'user-badge-muted'
                            }`}
                          >
                            {b.bookingStatus || 'New'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="user-mobile-booking-list">
              {recentBookings.map((b) => {
                const payStatus = (b.paymentStatus || '').toUpperCase();
                const bookStatus = (b.bookingStatus || '').toUpperCase();
                const ticketsCount = b.tickets || 1;
                return (
                  <div key={b._id} className="user-mobile-booking-card">
                    <div className="user-mobile-booking-top">
                      <div className="user-mobile-booking-title">
                        {b.eventId?.title || b.eventTitle || 'Yoga Practice'}
                      </div>
                      <span className="user-mobile-booking-id">
                        #{b.bookingId || b._id.slice(-6).toUpperCase()}
                      </span>
                    </div>

                    <div className="user-mobile-booking-meta">
                      <div className="user-mobile-booking-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>
                          {new Date(b.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="user-mobile-booking-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                        </svg>
                        <span>{ticketsCount} Ticket{ticketsCount > 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    <div className="user-mobile-booking-bottom">
                      <div className="user-mobile-booking-price">
                        <span className="user-mobile-booking-price-label">Amount</span>
                        <span className="user-mobile-booking-price-val">₹{getBookingAmount(b)}</span>
                      </div>

                      <div className="user-mobile-booking-badges">
                        <span
                          className={`user-badge ${
                            payStatus === 'PAID'
                              ? 'user-badge-success'
                              : payStatus === 'FAILED'
                              ? 'user-badge-danger'
                              : 'user-badge-warning'
                          }`}
                        >
                          {b.paymentStatus || 'Pending'}
                        </span>
                        <span
                          className={`user-badge ${
                            bookStatus === 'CONFIRMED'
                              ? 'user-badge-success'
                              : bookStatus === 'CANCELLED'
                              ? 'user-badge-danger'
                              : 'user-badge-muted'
                          }`}
                        >
                          {b.bookingStatus || 'New'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
