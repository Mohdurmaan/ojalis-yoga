import { NavLink, useNavigate } from 'react-router-dom';
import { removeToken } from '../services/api';

function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    if (onClose) onClose();
    navigate('/admin/login');
  };

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="admin-sidebar-header">
        <div className="admin-sidebar-brand-wrapper">
          <img src="/logo.png" alt="Ojalis Logo" className="admin-sidebar-logo" />
          <div className="admin-panel-badge">Admin Panel</div>
        </div>

        {/* Mobile close button */}
        <button
          type="button"
          className="admin-sidebar-close-btn"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <nav className="admin-nav">
        <NavLink
          to="/admin/dashboard"
          onClick={handleNavClick}
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/journal"
          onClick={handleNavClick}
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
        >
          Journal
        </NavLink>
        <NavLink
          to="/admin/studio"
          onClick={handleNavClick}
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
        >
          Studio
        </NavLink>
        <NavLink
          to="/admin/online-classes"
          onClick={handleNavClick}
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
        >
          Online Classes
        </NavLink>
        <NavLink
          to="/admin/event-bookings"
          onClick={handleNavClick}
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
        >
          Event Bookings
        </NavLink>
        <NavLink
          to="/admin/teachers"
          onClick={handleNavClick}
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
        >
          Teachers
        </NavLink>
        <NavLink
          to="/admin/book-sessions"
          onClick={handleNavClick}
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
        >
          Book Sessions
        </NavLink>
        
        <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
          <button
            onClick={handleLogout}
            className="admin-nav-item admin-logout-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
