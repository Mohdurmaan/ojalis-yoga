import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchPublic, getImageUrl } from '../utils/api';
import DOMPurify from 'dompurify';

function EventDetails() {
  const { slug } = useParams();
  const location = useLocation();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({ customerName: '', email: '', phone: '', message: '' });
  const [bookingStatus, setBookingStatus] = useState('idle'); // idle, processing, success, error
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    fetchPublic(`/events/slug/${slug}`)
      .then(res => {
        setEvent(res);
        setLoading(false);
      })
      .catch(err => {
        setError('Event not found or unavailable.');
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    // Check if we need to auto-scroll to book form
    if (!loading && event && location.hash === '#book') {
      const el = document.getElementById('book');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [loading, event, location.hash]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingStatus('processing');
    setBookingError(null);

    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      setBookingError('Failed to load Razorpay SDK. Please check your connection.');
      setBookingStatus('error');
      return;
    }

    try {
      // 1. Create order
      const res = await fetch('http://localhost:5000/api/event-bookings/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event._id,
          customerName: formData.customerName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Failed to create Razorpay order. Check backend keys.');

      // 2. Open Razorpay Checkout
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'Ojalis Yoga',
        description: event.title,
        order_id: data.order.id,
        handler: async function (response) {
          // 3. Verify Payment
          try {
            const verifyRes = await fetch('http://localhost:5000/api/event-bookings/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: data.bookingId
              })
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setBookingStatus('success');
            } else {
              setBookingError('Payment verification failed. If money was deducted, please contact support.');
              setBookingStatus('error');
            }
          } catch (err) {
            setBookingError('Error communicating with server for payment verification.');
            setBookingStatus('error');
          }
        },
        prefill: {
          name: formData.customerName,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#800020'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        setBookingError(response.error.description);
        setBookingStatus('error');
      });
      paymentObject.open();

    } catch (err) {
      setBookingError(err.message || 'Something went wrong while initiating booking.');
      setBookingStatus('error');
    }
  };

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;
  if (error || !event) return <div style={{ padding: '100px', textAlign: 'center', color: 'red' }}>{error}</div>;

  const isPast = event.endDate ? new Date(event.endDate) < new Date(new Date().toISOString().split('T')[0]) : false;

  return (
    <main className="bg-ivory" style={{ paddingBottom: '80px' }}>
      {/* Banner */}
      <section className="page-hero-banner" style={{ padding: '60px 0' }}>
        <div className="container">
          <span className="page-hero-tag">{event.mode} Event</span>
          <h1 className="page-hero-title">{event.title}</h1>
        </div>
      </section>

      <section className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '48px', alignItems: 'start', marginTop: '40px' }}>
        {/* Left Column: Details */}
        <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', border: '1px solid var(--ojalis-border)', boxShadow: 'var(--shadow-sm)' }}>
          {event.image && (
            <img src={getImageUrl(event.image)} alt={event.title} style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '32px' }} />
          )}

          <h2 style={{ fontSize: '28px', color: 'var(--ojalis-burgundy)', fontFamily: 'var(--font-serif)', marginBottom: '24px' }}>About This Session</h2>
          <div 
            className="article-content"
            style={{ fontSize: '15px', color: 'var(--ojalis-text-muted)', lineHeight: '1.8' }}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.description) }}
          />
        </div>

        {/* Right Column: Sticky Booking / Info */}
        <div style={{ position: 'sticky', top: '100px' }}>
          <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', border: '1px solid var(--ojalis-border)', boxShadow: 'var(--shadow-sm)', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', color: 'var(--ojalis-burgundy)', marginBottom: '20px' }}>Event Details</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '12px', color: 'var(--ojalis-text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Dates</span>
                <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ojalis-text-main)' }}>{new Date(event.startDate).toLocaleDateString()} – {new Date(event.endDate).toLocaleDateString()}</span>
              </li>
              <li style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '12px', color: 'var(--ojalis-text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Time</span>
                <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ojalis-text-main)' }}>{event.startTime} to {event.endTime}</span>
              </li>
              <li style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '12px', color: 'var(--ojalis-text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Instructor</span>
                <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ojalis-text-main)' }}>{event.instructor || 'TBA'}</span>
              </li>
              <li style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '12px', color: 'var(--ojalis-text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Location / Mode</span>
                <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ojalis-text-main)', textTransform: 'capitalize' }}>{event.location || event.mode}</span>
              </li>
              <li style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '12px', color: 'var(--ojalis-text-light)', textTransform: 'uppercase', letterSpacing: '1px' }}>Fee</span>
                <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--ojalis-gold-dark)' }}>₹{event.price}</span>
              </li>
            </ul>
          </div>

          <div id="book" style={{ background: 'var(--ojalis-ivory)', padding: '32px', borderRadius: '16px', border: '1px solid var(--ojalis-border)' }}>
            <h3 style={{ fontSize: '20px', color: 'var(--ojalis-burgundy)', marginBottom: '20px' }}>Book Your Spot</h3>
            
            {isPast ? (
              <div style={{ padding: '16px', background: '#ffebee', color: '#c62828', borderRadius: '8px', textAlign: 'center' }}>
                This event has already ended.
              </div>
            ) : bookingStatus === 'success' ? (
              <div style={{ padding: '24px', background: '#e8f5e9', color: '#2e7d32', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
                <strong>Booking Confirmed!</strong>
                <p style={{ marginTop: '8px', fontSize: '14px' }}>Your payment was successful and your spot is reserved. We have sent the details to your email.</p>
              </div>
            ) : (
              <form onSubmit={handleBooking}>
                {bookingError && <div style={{ marginBottom: '16px', padding: '10px', background: '#ffebee', color: '#c62828', borderRadius: '4px', fontSize: '13px' }}>{bookingError}</div>}
                <div className="form-field-group" style={{ marginBottom: '16px' }}>
                  <label className="form-field-label">Full Name *</label>
                  <input type="text" required className="form-input-ctrl" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} />
                </div>
                <div className="form-field-group" style={{ marginBottom: '16px' }}>
                  <label className="form-field-label">Email Address *</label>
                  <input type="email" required className="form-input-ctrl" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="form-field-group" style={{ marginBottom: '16px' }}>
                  <label className="form-field-label">Phone Number *</label>
                  <input type="tel" required className="form-input-ctrl" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="form-field-group" style={{ marginBottom: '24px' }}>
                  <label className="form-field-label">Notes (Optional)</label>
                  <textarea rows="2" className="form-textarea-ctrl" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                </div>
                <button type="submit" disabled={bookingStatus === 'processing'} className="btn btn-primary" style={{ width: '100%', opacity: bookingStatus === 'processing' ? 0.7 : 1 }}>
                  {bookingStatus === 'processing' ? 'Processing...' : `Pay ₹${event.price} & Book`}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default EventDetails;
