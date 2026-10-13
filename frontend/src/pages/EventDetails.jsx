import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { fetchPublic, getImageUrl, API_URL } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { getUserToken } from '../utils/userApi';
import DOMPurify from 'dompurify';
import './eventDetails.css';

function EventDetails() {
  const { slug } = useParams();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({ customerName: '', email: '', phone: '', message: '' });
  const [bookingStatus, setBookingStatus] = useState('idle'); // idle, processing, success, error
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        customerName: prev.customerName || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || ''
      }));
    }
  }, [user]);

  useEffect(() => {
    fetchPublic(`/events/slug/${slug}`)
      .then(res => {
        setEvent(res);
        setLoading(false);
      })
      .catch(() => {
        setError('Event not found or currently unavailable.');
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
      const headers = { 'Content-Type': 'application/json' };
      const token = getUserToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/event-bookings/create-order`, {
        method: 'POST',
        headers,
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
            const verifyRes = await fetch(`${API_URL}/event-bookings/verify-payment`, {
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
          } catch {
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
          color: '#4F6144'
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

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const formatTiming = () => {
    if (event?.startTime && event?.endTime) {
      return `${event.startTime} to ${event.endTime}`;
    }
    return event?.startTime || event?.endTime || 'Flexible / As per schedule';
  };

  const cleanDescription = (html) => {
    if (!html) return '<p>Detailed sadhana guidelines and syllabus will be provided upon enrollment.</p>';
    // Replace non-breaking spaces with standard spaces so lines wrap properly
    let cleaned = html.replace(/&nbsp;/g, ' ').replace(/\u00A0/g, ' ');
    // Strip pasted background-color styles that cause ugly grey boxes
    cleaned = cleaned.replace(/background-color:\s*[^;"]+;?/gi, '');
    return DOMPurify.sanitize(cleaned);
  };

  if (loading) {
    return (
      <main className="event-details-page">
        <div style={{ padding: '160px 20px', textAlign: 'center', color: 'var(--ojalis-text-muted)' }}>
          <div style={{ fontSize: '18px', fontWeight: 600 }}>Loading Session Details...</div>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="event-details-page">
        <div style={{ padding: '160px 20px', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--ojalis-burgundy)', marginBottom: '12px' }}>Session Not Found</h2>
          <p style={{ color: 'var(--ojalis-text-muted)', marginBottom: '24px' }}>{error || 'This session might have been concluded or moved.'}</p>
          <Link to="/online-classes" className="btn btn-secondary">
            ← Browse All Classes & Events
          </Link>
        </div>
      </main>
    );
  }

  const isPast = event.endDate ? new Date(event.endDate) < new Date(new Date().toISOString().split('T')[0]) : false;

  return (
    <main className="event-details-page">
      {/* 1. Header Hero Banner */}
      <section className="event-details-hero">
        <div className="event-hero-inner">
          {/* Breadcrumbs */}
          <nav className="event-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="event-breadcrumbs-sep">/</span>
            <Link to="/online-classes">Online Classes</Link>
            <span className="event-breadcrumbs-sep">/</span>
            <span className="event-breadcrumbs-current">{event.title}</span>
          </nav>

          {/* Badge Tag */}
          <div className="event-badge-tag">
            <span className="event-badge-dot" />
            <span>{event.mode || 'Online'} Offering</span>
          </div>

          {/* Title */}
          <h1 className="event-hero-title">{event.title}</h1>

          {/* Subtitle / Key Meta */}
          <div className="event-hero-meta-row">
            <div className="event-hero-meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{formatDate(event.startDate)} {event.endDate && event.endDate !== event.startDate ? `– ${formatDate(event.endDate)}` : ''}</span>
            </div>

            <div className="event-hero-meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{formatTiming()}</span>
            </div>

            <div className="event-hero-meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>{event.instructor || 'Ojalis Acharya'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <div className="event-details-container">
        {/* Left Column: Media & Overview */}
        <div className="event-main-card">
          {/* Cover Media with Aspect Ratio Protection */}
          {event.image ? (
            <div className="event-cover-media">
              <img
                src={getImageUrl(event.image)}
                alt={event.title}
                className="event-cover-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80";
                }}
              />
              <span className="event-cover-badge">
                {event.category ? event.category.toUpperCase() : 'SPECIAL SESSION'}
              </span>
            </div>
          ) : (
            <div className="event-cover-media" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', color: '#8C8275' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <div style={{ fontSize: '13px', marginTop: '6px' }}>Ojalis Sacred Yoga Studio</div>
              </div>
            </div>
          )}

          {/* Quick Specifications Bar */}
          <div className="event-quick-specs-grid">
            <div className="event-spec-item">
              <div className="event-spec-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div>
                <span className="event-spec-label">Schedule</span>
                <span className="event-spec-val">
                  {formatDate(event.startDate)} {event.endDate && event.endDate !== event.startDate ? `– ${formatDate(event.endDate)}` : ''}
                </span>
              </div>
            </div>

            <div className="event-spec-item">
              <div className="event-spec-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <span className="event-spec-label">Time</span>
                <span className="event-spec-val">{formatTiming()}</span>
              </div>
            </div>

            <div className="event-spec-item">
              <div className="event-spec-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <span className="event-spec-label">Teacher</span>
                <span className="event-spec-val">{event.instructor || 'Acharya'}</span>
              </div>
            </div>

            <div className="event-spec-item">
              <div className="event-spec-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div>
                <span className="event-spec-label">Platform / Mode</span>
                <span className="event-spec-val" style={{ textTransform: 'capitalize' }}>
                  {event.location || event.mode || 'Live Online'}
                </span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <h2 className="event-section-heading">About This Practice</h2>
          <div 
            className="article-content event-rich-article"
            dangerouslySetInnerHTML={{ __html: cleanDescription(event.description) }}
          />

          {/* Inclusions Card */}
          <div className="event-inclusions-card">
            <div className="event-inclusions-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>What is Included in this Session</span>
            </div>
            <ul className="event-inclusions-list">
              <li className="event-inclusion-li">
                <span className="event-inclusion-check">✦</span>
                <span>Live guided authentic classical instruction</span>
              </li>
              <li className="event-inclusion-li">
                <span className="event-inclusion-check">✦</span>
                <span>Breath signature alignment & kriya corrections</span>
              </li>
              <li className="event-inclusion-li">
                <span className="event-inclusion-check">✦</span>
                <span>Interactive practitioner Q&A with teacher</span>
              </li>
              <li className="event-inclusion-li">
                <span className="event-inclusion-check">✦</span>
                <span>Self-practice recording & sadhana notes</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Sticky Booking & Fee Summary */}
        <aside className="event-sidebar-sticky">
          {/* 1. Price Overview Box */}
          <div className="event-price-box">
            <div className="event-price-tag-wrap">
              <div>
                <span className="event-price-label">Registration Fee</span>
                <div style={{ fontSize: '11.5px', color: '#7A7265', marginTop: '2px' }}>Per Participant</div>
              </div>
              <div className="event-price-num">
                <span>₹</span>{event.price}
              </div>
            </div>

            <ul className="event-info-list">
              <li className="event-info-row">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <div className="event-info-row-text">
                  <span className="event-info-row-title">Dates</span>
                  <span className="event-info-row-detail">
                    {formatDate(event.startDate)} {event.endDate && event.endDate !== event.startDate ? `– ${formatDate(event.endDate)}` : ''}
                  </span>
                </div>
              </li>

              <li className="event-info-row">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <div className="event-info-row-text">
                  <span className="event-info-row-title">Timings</span>
                  <span className="event-info-row-detail">{formatTiming()}</span>
                </div>
              </li>

              <li className="event-info-row">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <div className="event-info-row-text">
                  <span className="event-info-row-title">Instructor</span>
                  <span className="event-info-row-detail">{event.instructor || 'Senior Guide'}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* 2. Interactive Booking Form / Authentication Guard */}
          <div id="book" className="event-booking-card">
            <h3 className="event-booking-title">Reserve Your Spot</h3>
            <p className="event-booking-subtitle">
              Instant registration via official Razorpay gateway.
            </p>

            {isPast ? (
              <div style={{ padding: '16px', background: '#FFF3F3', color: '#B71C1C', borderRadius: '10px', textAlign: 'center', fontSize: '13.5px', fontWeight: 600 }}>
                This session has concluded.
              </div>
            ) : bookingStatus === 'success' ? (
              <div className="event-success-box">
                <div className="event-success-icon">✓</div>
                <div className="event-success-title">Enrollment Confirmed!</div>
                <p className="event-success-desc">
                  Your spot is successfully booked. We have sent the confirmation & session joining details to your email.
                </p>
                <Link to="/dashboard/bookings" className="btn-event-dash-link">
                  View in My Dashboard →
                </Link>
              </div>
            ) : !isAuthenticated ? (
              <div className="event-auth-prompt">
                <div className="event-auth-icon-wrap">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h4 className="event-auth-heading">Sign In Required</h4>
                <p className="event-auth-desc">
                  Please sign in to your sanctuary account to enroll and manage your bookings.
                </p>
                <Link
                  to="/login"
                  state={{ from: `/online-classes/${slug}#book` }}
                  className="btn-event-signin"
                >
                  Sign In to Book →
                </Link>
                <p className="event-auth-footer-prompt">
                  New practitioner?{' '}
                  <Link
                    to="/register"
                    state={{ from: `/online-classes/${slug}#book` }}
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            ) : (
              <form onSubmit={handleBooking} noValidate>
                {bookingError && (
                  <div style={{ marginBottom: '16px', padding: '10px 12px', background: '#FDECEA', color: '#D32F2F', borderRadius: '8px', fontSize: '13px', lineHeight: 1.4 }}>
                    {bookingError}
                  </div>
                )}

                <div className="form-field-group" style={{ marginBottom: '14px' }}>
                  <label className="form-field-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input-ctrl"
                    placeholder="Enter your name"
                    value={formData.customerName}
                    onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                  />
                </div>

                <div className="form-field-group" style={{ marginBottom: '14px' }}>
                  <label className="form-field-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="form-input-ctrl"
                    placeholder="yourname@domain.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-field-group" style={{ marginBottom: '14px' }}>
                  <label className="form-field-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="form-input-ctrl"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-field-group" style={{ marginBottom: '18px' }}>
                  <label className="form-field-label">Special Notes / Intention (Optional)</label>
                  <textarea
                    rows="2"
                    className="form-textarea-ctrl"
                    placeholder="Any health condition or note for teacher..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={bookingStatus === 'processing'}
                  className="btn-event-checkout"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                  <span>{bookingStatus === 'processing' ? 'Processing Order...' : `Pay ₹${event.price} & Book`}</span>
                </button>

                <div className="event-trust-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>256-Bit SSL Encrypted Razorpay Checkout</span>
                </div>
              </form>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}

export default EventDetails;
