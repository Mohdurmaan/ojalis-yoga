import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IconLotus, IconSparkle, IconCheckmark } from "../components/Icons";
import { fetchPublic, getImageUrl } from "../utils/api";

function OnlineClasses() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [activeCohorts, setActiveCohorts] = useState([]);
  const [runningClasses, setRunningClasses] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublic("/events").then(data => {
      if (data && data.length > 0) {
        const todayStr = new Date().toISOString().split('T')[0];
        const todayDate = new Date(todayStr); // local midnight

        const upcoming = [];
        const cohorts = [];
        const classes = [];
        const completed = [];

        data.forEach(item => {
          const startStr = item.startDate ? new Date(item.startDate).toISOString().split('T')[0] : null;
          const endStr = item.endDate ? new Date(item.endDate).toISOString().split('T')[0] : null;

          if (!startStr || !endStr) return; // skip if invalid

          const startDate = new Date(startStr);
          const endDate = new Date(endStr);
          const todayDateObj = new Date(todayStr);

          const isFuture = startDate > todayDateObj;
          const isCompleted = endDate < todayDateObj || item.status === 'completed';
          const isRunning = startDate <= todayDateObj && todayDateObj <= endDate;
          
          const cat = item.category || 'event';

          if (isCompleted) {
            completed.push(item);
          } else if (isFuture) {
            if (cat === 'cohort') {
              cohorts.push(item);
            } else {
              upcoming.push(item);
            }
          } else if (isRunning) {
            if (cat === 'cohort') {
              cohorts.push(item);
            } else {
              classes.push(item);
            }
          }
        });

        setUpcomingEvents(upcoming);
        setActiveCohorts(cohorts);
        setRunningClasses(classes);
        setCompletedEvents(completed);
      }
      setLoading(false);
    });
  }, []);

  const EventCard = ({ item }) => (
    <div className="program-card-item">
      <div className="program-card-thumb-wrap">
        <img 
          src={item.image ? getImageUrl(item.image) : "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"} 
          alt={item.title} 
          className="program-card-img" 
        />
        <span className="program-badge-tag">{item.mode}</span>
      </div>

      <div className="program-card-body">
        <div className="program-meta-row">
          <span>₹{item.price}</span>
        </div>
        
        <h3 className="program-card-title">{item.title}</h3>

        <div 
          className="program-card-text"
          dangerouslySetInnerHTML={{ __html: item.description }}
        />

        <div style={{ background: "var(--ojalis-ivory)", borderRadius: "var(--radius-md)", padding: "12px", marginBottom: "20px", border: "1px solid var(--ojalis-border-light)", fontSize: "13px" }}>
          <strong>Dates:</strong> {new Date(item.startDate).toLocaleDateString()} – {new Date(item.endDate).toLocaleDateString()}<br/>
          <strong>Time:</strong> {item.startTime} - {item.endTime}
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "auto", borderTop: "1px solid var(--ojalis-border-light)", paddingTop: "16px" }}>
          <Link 
            to={`/online-classes/${item.slug}`} 
            className="program-link-cta"
            style={{flex: 1, justifyContent: "center"}}
          >
            View Details
          </Link>
          <Link 
            to={`/online-classes/${item.slug}#book`} 
            className="program-link-cta"
            style={{flex: 1, justifyContent: "center", color: "var(--ojalis-gold-dark)"}}
          >
            Book Now <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <main className="bg-ivory">
      {/* Page Hero Banner */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Virtual Sanctuary</span>
          <h1 className="page-hero-title">Online Classes & Guided Circles</h1>
          <p className="page-hero-subtitle">
            Authentic classical sadhana delivered live with individualized attention, mindful pacing, and authentic guidance wherever you are in the world.
          </p>
        </div>
      </section>

      {/* SECTION 1: UPCOMING EVENTS */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="text-center" style={{ maxWidth: "760px", margin: "0 auto 48px" }}>
            <div className="section-tag-wrapper" style={{ justifyContent: "center" }}>
              <span className="section-tag-line"></span>
              <span className="section-tag-text">Special Immersions</span>
              <span className="section-tag-line"></span>
            </div>
            <h2 className="section-title-main">
              Upcoming <span>Events & Workshops</span>
            </h2>
            <p className="section-desc-main">
              Specialized masterclasses, weekend intensives, and seasonal sadhana programs are announced here. Join our waitlist to receive prompt notification when registrations open.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
          ) : upcomingEvents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--ojalis-text-muted)' }}>
              No upcoming events at this time.
            </div>
          ) : (
            <div className="programs-card-grid">
              {upcomingEvents.map((item) => <EventCard key={item._id} item={item} />)}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: ACTIVE COHORTS */}
      <section className="section-spacing bg-ivory">
        <div className="container">
          <div className="text-center" style={{ maxWidth: "720px", margin: "0 auto 52px" }}>
            <div className="section-tag-wrapper" style={{ justifyContent: "center" }}>
              <span className="section-tag-line"></span>
              <span className="section-tag-text">Guided Practice</span>
              <span className="section-tag-line"></span>
            </div>
            <h2 className="section-title-main">
              Active <span>Cohorts</span>
            </h2>
            <p className="section-desc-main">
              Join one of our active or upcoming live cohorts. Each offering is grounded in classical discipline and structured for consistent practice.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
          ) : activeCohorts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--ojalis-text-muted)' }}>
              No active cohorts at this time.
            </div>
          ) : (
            <div className="programs-card-grid">
              {activeCohorts.map((item) => <EventCard key={item._id} item={item} />)}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: RUNNING OFFERINGS */}
      <section className="section-spacing bg-white">
        <div className="container">
          <div className="text-center" style={{ maxWidth: "720px", margin: "0 auto 52px" }}>
            <div className="section-tag-wrapper" style={{ justifyContent: "center" }}>
              <span className="section-tag-line"></span>
              <span className="section-tag-text">Daily Sadhana</span>
              <span className="section-tag-line"></span>
            </div>
            <h2 className="section-title-main">
              Running <span>Online Offerings</span>
            </h2>
            <p className="section-desc-main">
              Explore our currently running online classes. These offerings are available for ongoing participation.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
          ) : runningClasses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--ojalis-text-muted)' }}>
              No running online offerings at this time.
            </div>
          ) : (
            <div className="programs-card-grid">
              {runningClasses.map((item) => <EventCard key={item._id} item={item} />)}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: PAST / COMPLETED EVENTS */}
      {completedEvents.length > 0 && (
        <section className="section-spacing bg-ivory">
          <div className="container">
            <div className="text-center" style={{ maxWidth: "720px", margin: "0 auto 52px" }}>
              <div className="section-tag-wrapper" style={{ justifyContent: "center" }}>
                <span className="section-tag-line"></span>
                <span className="section-tag-text">Archive</span>
                <span className="section-tag-line"></span>
              </div>
              <h2 className="section-title-main">
                Past <span>Events & Offerings</span>
              </h2>
              <p className="section-desc-main">
                A look back at our successfully completed events and workshops.
              </p>
            </div>

            <div className="programs-card-grid">
              {completedEvents.map((item) => <EventCard key={item._id} item={item} />)}
            </div>
          </div>
        </section>
      )}

      {/* Practice Notes Banner */}
      <section className="section-spacing-sm bg-white" style={{ borderTop: "1px solid var(--ojalis-border)" }}>
        <div className="container" style={{ maxWidth: "860px", textAlign: "center" }}>
          <h3 style={{ fontSize: "24px", color: "var(--ojalis-burgundy)", fontFamily: "var(--font-serif)", marginBottom: "12px" }}>
            How Our Online Classes Work
          </h3>
          <p style={{ fontSize: "14.5px", color: "var(--ojalis-text-muted)", lineHeight: 1.7, margin: "0 auto 24px", maxWidth: "680px" }}>
            All sessions are conducted in high-definition video with dedicated time for student check-ins, breath alignment checks, and brief Q&A. You will receive clear joining instructions, prop recommendations, and quiet setting guidance prior to your first class.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link to="/book-session" className="btn btn-gold">
              Schedule a Discovery Call
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              General Inquiries
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default OnlineClasses;
