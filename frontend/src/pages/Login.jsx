import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './dashboard/userDashboard.css';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' | 'email'
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  // Where to redirect after login
  const getRedirectTarget = () => {
    const rawFrom = location.state?.from;
    if (!rawFrom) return '/dashboard';
    if (typeof rawFrom === 'string') return rawFrom;
    if (typeof rawFrom === 'object') {
      const pathname = rawFrom.pathname || '/dashboard';
      const search = rawFrom.search || '';
      const hash = rawFrom.hash || '';
      return `${pathname}${search}${hash}`;
    }
    return '/dashboard';
  };

  const from = getRedirectTarget();

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const validateForm = () => {
    const newErrors = {};

    if (loginMethod === 'phone') {
      const digits = phone.replace(/[^0-9]/g, '');
      if (!digits) {
        newErrors.phone = 'Mobile number is required';
      } else if (digits.length < 10) {
        newErrors.phone = 'Please enter a valid 10-digit mobile number';
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim()) {
        newErrors.email = 'Email address is required';
      } else if (!emailRegex.test(email.trim())) {
        newErrors.email = 'Please provide a valid email address';
      }
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      const identifier = loginMethod === 'phone' ? phone.trim() : email.trim().toLowerCase();
      const res = await login(identifier, password);

      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setServerError(res.message || 'Invalid credentials. Please verify your details.');
      }
    } catch (err) {
      setServerError(err.message || 'An unexpected error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ojalis-auth-page">
      <div className="ojalis-auth-card">
        {/* Header with Ojalis Logo & Brand Tag */}
        <div className="ojalis-auth-header">
          <div className="ojalis-auth-logo-box">
            <img src="/logo.png" alt="Ojalis Yoga" className="ojalis-auth-logo-img" />
          </div>
          <div className="ojalis-auth-tag">
            <span className="ojalis-auth-tag-line"></span>
            <span className="ojalis-auth-tag-text">OJALIS YOGA</span>
            <span className="ojalis-auth-tag-line"></span>
          </div>
          <h1 className="ojalis-auth-title">Welcome Back</h1>
          <p className="ojalis-auth-subtitle">Sign in to your sacred practice & personal dashboard</p>
        </div>

        {/* Method Toggle: Mobile Number vs Email */}
        <div className="ojalis-auth-tabs" role="tablist">
          <button
            type="button"
            className={`ojalis-auth-tab ${loginMethod === 'phone' ? 'active' : ''}`}
            onClick={() => {
              setLoginMethod('phone');
              setErrors({});
              setServerError('');
            }}
          >
            Mobile Number
          </button>
          <button
            type="button"
            className={`ojalis-auth-tab ${loginMethod === 'email' ? 'active' : ''}`}
            onClick={() => {
              setLoginMethod('email');
              setErrors({});
              setServerError('');
            }}
          >
            Email Address
          </button>
        </div>

        {serverError && (
          <div className="user-alert user-alert-error" style={{ marginBottom: '20px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {loginMethod === 'phone' ? (
            /* Mobile Number Field */
            <div className="form-field-group">
              <label className="form-field-label" htmlFor="login-phone">
                Mobile Number <span style={{ color: '#D32F2F' }}>*</span>
              </label>
              <div className={`ojalis-auth-phone-wrap ${errors.phone ? 'has-error' : ''}`}>
                <div className="ojalis-auth-country" title="India (+91)">
                  <svg width="18" height="13" viewBox="0 0 20 14" style={{ borderRadius: '2px', display: 'block', flexShrink: 0 }}>
                    <rect width="20" height="14" fill="#FFFFFF" />
                    <rect width="20" height="4.67" fill="#FF9933" />
                    <rect y="9.33" width="20" height="4.67" fill="#138808" />
                    <rect y="4.67" width="20" height="4.66" fill="#FFFFFF" />
                    <circle cx="10" cy="7" r="1.8" fill="none" stroke="#000088" strokeWidth="0.5" />
                    <circle cx="10" cy="7" r="0.4" fill="#000088" />
                  </svg>
                  <span className="ojalis-auth-country-arrow">▾</span>
                </div>
                <span className="ojalis-auth-dial-code">+91</span>
                <input
                  id="login-phone"
                  type="tel"
                  className="ojalis-auth-phone-input"
                  placeholder="Enter 10-digit number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                  }}
                  autoComplete="tel"
                  required
                />
              </div>
              {errors.phone && <div className="user-error-hint">{errors.phone}</div>}
            </div>
          ) : (
            /* Email Address Field */
            <div className="form-field-group">
              <label className="form-field-label" htmlFor="login-email">
                Email Address <span style={{ color: '#D32F2F' }}>*</span>
              </label>
              <input
                id="login-email"
                type="email"
                className={`form-input-ctrl ${errors.email ? 'has-error' : ''}`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                autoComplete="email"
                required
              />
              {errors.email && <div className="user-error-hint">{errors.email}</div>}
            </div>
          )}

          {/* Password Field */}
          <div className="form-field-group">
            <label className="form-field-label" htmlFor="login-password">
              Password <span style={{ color: '#D32F2F' }}>*</span>
            </label>
            <div className="user-input-wrap">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className={`form-input-ctrl ${errors.password ? 'has-error' : ''}`}
                placeholder="Enter your account password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                }}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="user-input-icon-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <div className="user-error-hint">{errors.password}</div>}
          </div>

          <button
            id="login-submit-btn"
            type="submit"
            className="ojalis-auth-submit-btn"
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In to Ojalis'}
          </button>
        </form>

        <div className="ojalis-auth-footer-prompt">
          Don't have an account?{' '}
          <Link
            to="/register"
            state={{ from }}
            className="ojalis-auth-footer-link"
          >
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}
