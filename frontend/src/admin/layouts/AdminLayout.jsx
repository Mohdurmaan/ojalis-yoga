import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import '../admin.css';

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add('admin-body');
    return () => document.body.classList.remove('admin-body');
  }, []);

  // Close sidebar automatically when user navigates to a new page
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile sidebar drawer is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  return (
    <div className="admin-layout">
      {/* Mobile / Tablet Topbar */}
      <header className="admin-topbar">
        <button
          type="button"
          className="admin-menu-btn"
          onClick={() => setSidebarOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={sidebarOpen}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {sidebarOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        <div className="admin-topbar-brand">
          <img src="/logo.png" alt="Ojalis Logo" className="admin-topbar-logo" />
          <span className="admin-topbar-badge">Admin</span>
        </div>

        <div className="admin-topbar-actions" aria-hidden="true"></div>
      </header>

      {/* Backdrop overlay for mobile drawer */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar backdrop"
        />
      )}

      {/* Responsive Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="admin-content">
        <div className="admin-content-inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
