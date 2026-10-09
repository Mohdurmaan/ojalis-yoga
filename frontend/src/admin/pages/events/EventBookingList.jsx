import { useState, useEffect, useMemo } from 'react';
import { apiFetch } from '../../services/api';

function EventBookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [searchEvent, setSearchEvent] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterPayment, setFilterPayment] = useState('');
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await apiFetch('/event-bookings');
      setBookings(res.data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await apiFetch(`/event-bookings/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ bookingStatus: newStatus }),
      });
      fetchBookings();
    } catch (err) {
      alert(err.message);
    }
  };

  // Filter Logic
  const filteredBookings = useMemo(() => {
    return bookings.filter(item => {
      const customerMatch = item.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.phone?.includes(searchTerm);
      const eventMatch = item.eventId?.title?.toLowerCase().includes(searchEvent.toLowerCase());
      const paymentMatch = filterPayment ? item.paymentStatus === filterPayment : true;
      
      let dateMatch = true;
      if (filterDate) {
        const itemD = new Date(item.createdAt);
        const y = itemD.getFullYear();
        const m = String(itemD.getMonth() + 1).padStart(2, '0');
        const d = String(itemD.getDate()).padStart(2, '0');
        const itemDateString = `${y}-${m}-${d}`;
        dateMatch = itemDateString === filterDate;
      }

      return customerMatch && eventMatch && paymentMatch && dateMatch;
    });
  }, [bookings, searchTerm, searchEvent, filterDate, filterPayment]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const currentBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-card" style={{ position: 'relative' }}>
      <div className="admin-header-flex" style={{ flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <h2 className="admin-title" style={{ margin: 0 }}>Event Bookings</h2>
      </div>

      {/* Filters Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <input 
          type="text" 
          placeholder="Search Customer / Phone" 
          value={searchTerm} 
          onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          style={{ padding: '8px', border: '1px solid var(--ojalis-border)', borderRadius: '4px' }}
        />
        <input 
          type="text" 
          placeholder="Search Event" 
          value={searchEvent} 
          onChange={e => { setSearchEvent(e.target.value); setCurrentPage(1); }}
          style={{ padding: '8px', border: '1px solid var(--ojalis-border)', borderRadius: '4px' }}
        />
        <input 
          type="date" 
          value={filterDate} 
          onChange={e => { setFilterDate(e.target.value); setCurrentPage(1); }}
          style={{ padding: '8px', border: '1px solid var(--ojalis-border)', borderRadius: '4px' }}
        />
        <select 
          value={filterPayment} 
          onChange={e => { setFilterPayment(e.target.value); setCurrentPage(1); }}
          style={{ padding: '8px', border: '1px solid var(--ojalis-border)', borderRadius: '4px' }}
        >
          <option value="">All Payment Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
        <button 
          onClick={() => {
            setSearchTerm('');
            setSearchEvent('');
            setFilterDate('');
            setFilterPayment('');
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
              <th>Customer</th>
              <th>Event</th>
              <th>Date</th>
              <th>Amount (₹)</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: 'var(--admin-text-muted)' }}>
                  No event bookings found.
                </td>
              </tr>
            ) : (
              currentBookings.map(item => (
                <tr key={item._id}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{item.customerName}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{item.phone}</div>
                  </td>
                  <td>{item.eventId?.title || 'Deleted Event'}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>₹{item.amount}</td>
                  <td>
                    <span className={`admin-badge ${item.paymentStatus === 'Paid' ? 'published' : 'draft'}`}>
                      {item.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <select 
                      value={item.bookingStatus} 
                      onChange={(e) => handleStatusChange(item._id, e.target.value)}
                      style={{ padding: '6px', borderRadius: '4px', border: '1px solid var(--ojalis-border)' }}
                    >
                      <option value="New">New</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => setSelectedBooking(item)} className="admin-btn admin-btn-secondary">
                      View
                    </button>
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

      {selectedBooking && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, 
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: 'white', padding: '32px', borderRadius: '8px', 
            maxWidth: '500px', width: '100%', maxHeight: '90vh', overflowY: 'auto'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '24px', color: 'var(--ojalis-burgundy)' }}>Booking Details</h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div><strong>Customer Name:</strong> {selectedBooking.customerName}</div>
              <div><strong>Email:</strong> {selectedBooking.email}</div>
              <div><strong>Phone:</strong> {selectedBooking.phone}</div>
              <div><strong>Message:</strong> <p>{selectedBooking.message || 'N/A'}</p></div>
              <hr style={{ borderColor: 'var(--ojalis-border)' }} />
              <div><strong>Event:</strong> {selectedBooking.eventId?.title}</div>
              <div><strong>Amount:</strong> ₹{selectedBooking.amount}</div>
              <div><strong>Payment Status:</strong> {selectedBooking.paymentStatus}</div>
              <div><strong>Razorpay Order ID:</strong> {selectedBooking.razorpayOrderId}</div>
              <div><strong>Razorpay Payment ID:</strong> {selectedBooking.razorpayPaymentId || 'N/A'}</div>
              <div><strong>Booking Status:</strong> {selectedBooking.bookingStatus}</div>
              <div><strong>Date:</strong> {new Date(selectedBooking.createdAt).toLocaleString()}</div>
            </div>
            <div style={{ marginTop: '32px', textAlign: 'right' }}>
              <button onClick={() => setSelectedBooking(null)} className="admin-btn admin-btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventBookingList;
