import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken, getToken, getAdminUser, setAdminUser, removeToken, apiFetch } from '../services/api';
import '../admin.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('admin-body');

    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get('error');

    if (errorParam) {
      setError(errorParam);
    } else if (getToken() && getAdminUser()?.role === 'admin') {
      navigate('/admin/dashboard');
    }

    return () => document.body.classList.remove('admin-body');
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      // Role check: Only users with role === 'admin' can access admin dashboard
      if (!res.user || res.user.role !== 'admin') {
        removeToken();
        setError('You are not an admin');
        return;
      }

      setToken(res.token);
      setAdminUser(res.user);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-card admin-login-card">
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <img src="/logo.png" alt="Ojalis Logo" style={{ maxWidth: '130px', height: 'auto' }} />
          <h2 style={{ marginTop: '16px', fontSize: '20px', fontWeight: 600, color: 'var(--admin-text)' }}>Admin Login</h2>
        </div>

        {error && <div className="admin-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-label">Email Address</label>
            <input
              type="email"
              className="admin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Password</label>
            <input
              type="password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="admin-btn admin-btn-primary" style={{ width: '100%', marginTop: '12px', minHeight: '42px' }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
