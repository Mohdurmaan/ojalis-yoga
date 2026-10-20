import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userApiFetch } from '../../utils/userApi';
import './userDashboard.css';

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState({ text: '', type: '' });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filter, setFilter] = useState('ALL');
  const [cancellingId, setCancellingId] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await userApiFetch('/event-bookings/my');
      if (res.success && Array.isArray(res.data)) {
        setBookings(res.data);
      } else {
        setError(res.message || 'Could not load your bookings');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (booking) => {
    const confirmCancel = window.confirm(
      `Are you sure you want to cancel your booking for "${
        booking.eventId?.title || booking.eventTitle || 'this event'
      }"?`
    );
    if (!confirmCancel) return;

    setCancellingId(booking._id);
    setActionMessage({ text: '', type: '' });

    try {
      const res = await userApiFetch(`/event-bookings/my/${booking._id}/cancel`, {
        method: 'PUT',
      });

      if (res.success) {
        setActionMessage({
          text: 'Booking cancelled successfully.',
          type: 'success',
        });
        // Update local state
        setBookings((prev) =>
          prev.map((b) =>
            b._id === booking._id ? { ...b, bookingStatus: 'CANCELLED' } : b
          )
        );
        if (selectedBooking?._id === booking._id) {
          setSelectedBooking((prev) => ({ ...prev, bookingStatus: 'CANCELLED' }));
        }
      } else {
        setActionMessage({
          text: res.message || 'Failed to cancel booking',
          type: 'error',
        });
      }
    } catch (err) {
      setActionMessage({
        text: err.message || 'Error occurred during cancellation',
        type: 'error',
      });
    } finally {
      setCancellingId(null);
    }
  };

  const getBookingAmount = (b) => {
    if (!b) return 0;
    if (b.amount !== undefined && b.amount !== null && b.amount !== '') return b.amount;
    if (b.totalAmount !== undefined && b.totalAmount !== null && b.totalAmount !== '') return b.totalAmount;
    if (b.eventId?.price !== undefined && b.eventId?.price !== null) return b.eventId.price;
    return 0;
  };

  const filteredBookings = bookings.filter((b) => {
    const bookStatus = (b.bookingStatus || '').toUpperCase();
    const payStatus = (b.paymentStatus || '').toUpperCase();
    if (filter === 'CONFIRMED') return bookStatus === 'CONFIRMED';
    if (filter === 'CANCELLED') return bookStatus === 'CANCELLED';
    if (filter === 'PAID') return payStatus === 'PAID';
    return true;
  });

  return (
    <>
      <div className="user-content-card">
        <div className="user-card-header">
          <div>
            <h1 className="user-card-title">My Bookings & Workshops</h1>
            <p className="user-card-subtitle">
              Manage your confirmed enrollments, session schedules, and receipts.
            </p>
          </div>

          <Link to="/events" className="user-btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Explore Events</span>
          </Link>
        </div>

        {/* Action / Alert Message */}
        {actionMessage.text && (
          <div
            className={`user-alert ${
              actionMessage.type === 'success'
                ? 'user-alert-success'
                : 'user-alert-error'
            }`}
            style={{ marginBottom: '20px' }}
          >
            <span>{actionMessage.text}</span>
          </div>
        )}

        {error && (
          <div className="user-alert user-alert-error" style={{ marginBottom: '20px' }}>
            <span>{error}</span>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="user-filter-tabs-wrap">
          {['ALL', 'CONFIRMED', 'PAID', 'CANCELLED'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`user-filter-tab ${filter === tab ? 'active' : ''}`}
            >
              {tab === 'ALL'
                ? `All (${bookings.length})`
                : tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--user-charcoal-muted)' }}>
            Loading your bookings...
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="user-empty-state">
            <div className="user-empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h3 className="user-empty-title">
              {filter === 'ALL' ? 'No Bookings Found' : `No ${filter.toLowerCase()} bookings`}
            </h3>
            <p className="user-empty-desc">
              {filter === 'ALL'
                ? "You haven't enrolled in any yoga workshops or events yet. Browse our calendar to participate."
                : `There are currently no bookings with status "${filter}".`}
            </p>
            {filter === 'ALL' && (
              <Link to="/events" className="user-btn-primary" style={{ width: 'auto', textDecoration: 'none' }}>
                Browse Upcoming Events
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="user-bookings-table-wrap">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Event / Session</th>
                    <th>Event Date</th>
                    <th>Booked On</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b) => {
                    const payStatus = (b.paymentStatus || '').toUpperCase();
                    const bookStatus = (b.bookingStatus || '').toUpperCase();
                    const eventDate = b.eventId?.startDate || b.eventDate;
                    const ticketsCount = b.tickets || 1;
                    return (
                      <tr key={b._id}>
                        <td>
                          <code style={{ fontSize: '0.8rem', background: '#F0EBDD', padding: '3px 8px', borderRadius: '4px' }}>
                            {b.bookingId || b._id.slice(-8).toUpperCase()}
                          </code>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, color: 'var(--user-charcoal)' }}>
                            {b.eventId?.title || b.eventTitle || 'Yoga Session'}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--user-charcoal-muted)' }}>
                            {ticketsCount} Person{ticketsCount > 1 ? 's' : ''}
                          </div>
                        </td>
                        <td>
                          {eventDate
                            ? new Date(eventDate).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })
                            : '-'}
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
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                            <button
                              type="button"
                              className="user-btn-secondary"
                              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                              onClick={() => setSelectedBooking(b)}
                            >
                              Details
                            </button>

                            {bookStatus !== 'CANCELLED' && (
                              <button
                                type="button"
                                className="user-btn-danger-outline"
                                onClick={() => handleCancelBooking(b)}
                                disabled={cancellingId === b._id}
                              >
                                {cancellingId === b._id ? 'Cancelling...' : 'Cancel'}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="user-mobile-booking-list">
              {filteredBookings.map((b) => {
                const payStatus = (b.paymentStatus || '').toUpperCase();
                const bookStatus = (b.bookingStatus || '').toUpperCase();
                const eventDate = b.eventId?.startDate || b.eventDate;
                const ticketsCount = b.tickets || 1;
                return (
                  <div key={b._id} className="user-mobile-booking-card">
                    <div className="user-mobile-booking-top">
                      <div className="user-mobile-booking-title">
                        {b.eventId?.title || b.eventTitle || 'Yoga Session'}
                      </div>
                      <span className="user-mobile-booking-id">
                        #{b.bookingId || b._id.slice(-6).toUpperCase()}
                      </span>
                    </div>

                    <div className="user-mobile-booking-meta">
                      {eventDate && (
                        <div className="user-mobile-booking-meta-item">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          <span>
                            {new Date(eventDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      )}

                      <div className="user-mobile-booking-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                        </svg>
                        <span>{ticketsCount} Person{ticketsCount > 1 ? 's' : ''}</span>
                      </div>

                      <div className="user-mobile-booking-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>
                          Booked: {new Date(b.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
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

                    <div className="user-mobile-booking-actions">
                      <button
                        type="button"
                        className="user-btn-secondary user-mobile-action-btn"
                        onClick={() => setSelectedBooking(b)}
                      >
                        Details
                      </button>
                      {bookStatus !== 'CANCELLED' && (
                        <button
                          type="button"
                          className="user-btn-danger-outline user-mobile-action-btn"
                          onClick={() => handleCancelBooking(b)}
                          disabled={cancellingId === b._id}
                        >
                          {cancellingId === b._id ? 'Cancelling...' : 'Cancel'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="user-modal-backdrop" onClick={() => setSelectedBooking(null)}>
          <div className="user-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="user-modal-header">
              <h2 className="user-modal-title">Booking Details</h2>
              <button
                type="button"
                className="user-modal-close"
                onClick={() => setSelectedBooking(null)}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="user-detail-row">
                <span className="user-detail-label">Booking Reference</span>
                <span className="user-detail-val">
                  <code>{selectedBooking.bookingId || selectedBooking._id}</code>
                </span>
              </div>

              <div className="user-detail-row">
                <span className="user-detail-label">Event / Workshop</span>
                <span className="user-detail-val">
                  {selectedBooking.eventId?.title || selectedBooking.eventTitle || 'Yoga Session'}
                </span>
              </div>

              {(selectedBooking.eventId?.startDate || selectedBooking.eventDate) && (
                <div className="user-detail-row">
                  <span className="user-detail-label">Session Date</span>
                  <span className="user-detail-val">
                    {new Date(selectedBooking.eventId?.startDate || selectedBooking.eventDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              )}

              <div className="user-detail-row">
                <span className="user-detail-label">Participant Name</span>
                <span className="user-detail-val">
                  {selectedBooking.customerName || selectedBooking.name || 'Practitioner'}
                </span>
              </div>

              <div className="user-detail-row">
                <span className="user-detail-label">Email Address</span>
                <span className="user-detail-val">{selectedBooking.email}</span>
              </div>

              <div className="user-detail-row">
                <span className="user-detail-label">Phone</span>
                <span className="user-detail-val">{selectedBooking.phone || '-'}</span>
              </div>

              <div className="user-detail-row">
                <span className="user-detail-label">Number of Tickets</span>
                <span className="user-detail-val">
                  {selectedBooking.tickets || 1} Mat{(selectedBooking.tickets || 1) > 1 ? 's' : ''}
                </span>
              </div>

              <div className="user-detail-row">
                <span className="user-detail-label">Total Amount</span>
                <span className="user-detail-val">₹{getBookingAmount(selectedBooking)}</span>
              </div>

              <div className="user-detail-row">
                <span className="user-detail-label">Payment Status</span>
                <span className="user-detail-val">
                  <span
                    className={`user-badge ${
                      (selectedBooking.paymentStatus || '').toUpperCase() === 'PAID'
                        ? 'user-badge-success'
                        : (selectedBooking.paymentStatus || '').toUpperCase() === 'FAILED'
                        ? 'user-badge-danger'
                        : 'user-badge-warning'
                    }`}
                  >
                    {selectedBooking.paymentStatus || 'Pending'}
                  </span>
                </span>
              </div>

              <div className="user-detail-row">
                <span className="user-detail-label">Booking Status</span>
                <span className="user-detail-val">
                  <span
                    className={`user-badge ${
                      (selectedBooking.bookingStatus || '').toUpperCase() === 'CONFIRMED'
                        ? 'user-badge-success'
                        : (selectedBooking.bookingStatus || '').toUpperCase() === 'CANCELLED'
                        ? 'user-badge-danger'
                        : 'user-badge-muted'
                    }`}
                  >
                    {selectedBooking.bookingStatus || 'New'}
                  </span>
                </span>
              </div>

              {selectedBooking.razorpayPaymentId && (
                <div className="user-detail-row">
                  <span className="user-detail-label">Payment ID</span>
                  <span className="user-detail-val" style={{ fontSize: '0.8rem' }}>
                    {selectedBooking.razorpayPaymentId}
                  </span>
                </div>
              )}

              <div className="user-detail-row">
                <span className="user-detail-label">Booked At</span>
                <span className="user-detail-val">
                  {new Date(selectedBooking.createdAt).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              {(selectedBooking.bookingStatus || '').toUpperCase() !== 'CANCELLED' && (
                <button
                  type="button"
                  className="user-btn-danger-outline"
                  onClick={() => handleCancelBooking(selectedBooking)}
                  disabled={cancellingId === selectedBooking._id}
                >
                  {cancellingId === selectedBooking._id ? 'Cancelling...' : 'Cancel This Booking'}
                </button>
              )}
              <button
                type="button"
                className="user-btn-primary"
                style={{ width: 'auto' }}
                onClick={() => setSelectedBooking(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
