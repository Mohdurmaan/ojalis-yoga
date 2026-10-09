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
    <div 
      style={{ 
        background: "#ffffff", 
        borderRadius: "var(--radius-lg)", 
        border: "1px solid var(--ojalis-border)", 
        overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
        position: "relative"
      }}
    >
      {/* Featured Image */}
      {item.image && (
        <div style={{ width: '100%', height: '220px' }}>
          <img 
            src={getImageUrl(item.image)} 
            alt={item.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      )}

      <div style={{ padding: "30px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Header Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <span style={{ fontSize: "11.5px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--ojalis-gold-dark)" }}>
            {item.mode}
          </span>
          <span style={{ fontSize: "11.5px", background: "var(--ojalis-burgundy-subtle)", color: "var(--ojalis-burgundy)", padding: "3px 10px", borderRadius: "var(--radius-full)", fontWeight: 600 }}>
            ₹{item.price}
          </span>
        </div>

        <h3 style={{ fontSize: "22px", color: "var(--ojalis-burgundy)", fontFamily: "var(--font-serif)", marginBottom: "12px", lineHeight: 1.25 }}>
          {item.title}
        </h3>

        {/* Short description (strip html if needed, but since it's html, just show snippet) */}
        <div 
          style={{ fontSize: "14px", color: "var(--ojalis-text-muted)", lineHeight: 1.6, marginBottom: "22px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
          dangerouslySetInnerHTML={{ __html: item.description }}
        />

        {/* Key Info */}
        <div style={{ background: "var(--ojalis-ivory)", borderRadius: "var(--radius-md)", padding: "16px", marginBottom: "24px", border: "1px solid var(--ojalis-border-light)", marginTop: "auto" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
            <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "var(--ojalis-text-main)" }}>
              <span style={{ color: "var(--ojalis-gold)", marginTop: "2px" }}>•</span>
              <span><strong>Dates:</strong> {new Date(item.startDate).toLocaleDateString()} – {new Date(item.endDate).toLocaleDateString()}</span>
            </li>
            <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "var(--ojalis-text-main)" }}>
              <span style={{ color: "var(--ojalis-gold)", marginTop: "2px" }}>•</span>
              <span><strong>Time:</strong> {item.startTime} - {item.endTime}</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "12px", marginTop: "auto", borderTop: "1px solid var(--ojalis-border-light)", paddingTop: "20px" }}>
          <Link 
            to={`/online-classes/${item.slug}`} 
            className="btn btn-secondary" 
            style={{ flex: 1, textAlign: "center", justifyContent: "center", padding: "10px" }}
          >
            View Details
          </Link>
          <Link 
            to={`/online-classes/${item.slug}#book`} 
            className="btn btn-primary" 
            style={{ flex: 1, textAlign: "center", justifyContent: "center", padding: "10px" }}
          >
            Book Now
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px" }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px" }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px" }}>
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

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px" }}>
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
