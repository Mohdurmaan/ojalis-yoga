import React from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './userDashboard.css';

export default function UserDashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <main className="bg-ivory">
      {/* Page Hero Banner - Identical to all other pages */}
      <section className="page-hero-banner user-dash-hero-banner">
        <div className="container">
          <span className="page-hero-tag">Practitioner Sanctuary</span>
          <h1 className="page-hero-title">My Dashboard</h1>
          <p className="page-hero-subtitle">
            Welcome, {user?.name || 'Devotee of Yoga'}. Track your enrollments, sessions, and sadhana path.
          </p>
        </div>
      </section>

      <div className="user-dash-container">
        <div className="user-dash-inner">
        {/* Sidebar */}
        <aside className="user-sidebar">
          <div className="user-sidebar-profile">
            <div className="user-sidebar-profile-left">
              <div className="user-avatar-circle" title={user?.name || 'User'}>
                {getInitials(user?.name)}
              </div>
              <div className="user-sidebar-info">
                <h3 className="user-sidebar-name" title={user?.name}>
                  {user?.name || 'Practitioner'}
                </h3>
                <p className="user-sidebar-email" title={user?.email}>
                  {user?.email || ''}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="user-mobile-logout-btn"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Logout</span>
            </button>
          </div>

          <nav className="user-sidebar-nav">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `user-nav-link ${isActive ? 'active' : ''}`
              }
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <span>Overview</span>
            </NavLink>

            <NavLink
              to="/dashboard/bookings"
              className={({ isActive }) =>
                `user-nav-link ${isActive ? 'active' : ''}`
              }
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>My Bookings</span>
            </NavLink>

            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `user-nav-link ${isActive ? 'active' : ''}`
              }
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>My Profile</span>
            </NavLink>

            <div className="user-sidebar-divider" />

            <Link to="/" className="user-nav-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Browse Website</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="user-nav-logout-btn"
              id="user-logout-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Sign Out</span>
            </button>
          </nav>
        </aside>

        {/* Dynamic Page Content */}
        <div className="user-dash-main">
          <Outlet />
        </div>
      </div>
    </div>
    </main>
  );
}
