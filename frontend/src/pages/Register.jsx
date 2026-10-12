import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './dashboard/userDashboard.css';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  // Target destination after registration
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

  // If already logged in, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) {
      setServerError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    const phoneDigits = formData.phone.replace(/[^0-9]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (phoneDigits.length < 10) {
      newErrors.phone = 'Mobile number must be at least 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      const res = await register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
      });

      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setServerError(res.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setServerError(err.message || 'An unexpected error occurred. Please try again.');
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
          <h1 className="ojalis-auth-title">Create Account</h1>
          <p className="ojalis-auth-subtitle">Begin your sacred path with Ojalis authentic practice</p>
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
          {/* Full Name */}
          <div className="form-field-group">
            <label className="form-field-label" htmlFor="register-name">
              Full Name <span style={{ color: '#D32F2F' }}>*</span>
            </label>
            <input
              id="register-name"
              type="text"
              name="name"
              className={`form-input-ctrl ${errors.name ? 'has-error' : ''}`}
              placeholder="e.g. Aarav Sharma"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
            {errors.name && <div className="user-error-hint">{errors.name}</div>}
          </div>

          {/* Mobile Number */}
          <div className="form-field-group">
            <label className="form-field-label" htmlFor="register-phone">
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
                id="register-phone"
                type="tel"
                name="phone"
                className="ojalis-auth-phone-input"
                placeholder="Enter 10-digit number"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
                required
              />
            </div>
            {errors.phone && <div className="user-error-hint">{errors.phone}</div>}
          </div>

          {/* Email Address */}
          <div className="form-field-group">
            <label className="form-field-label" htmlFor="register-email">
              Email Address <span style={{ color: '#D32F2F' }}>*</span>
            </label>
            <input
              id="register-email"
              type="email"
              name="email"
              className={`form-input-ctrl ${errors.email ? 'has-error' : ''}`}
              placeholder="aarav@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
            {errors.email && <div className="user-error-hint">{errors.email}</div>}
          </div>

          {/* Password */}
          <div className="form-field-group">
            <label className="form-field-label" htmlFor="register-password">
              Password <span style={{ color: '#D32F2F' }}>*</span>
            </label>
            <div className="user-input-wrap">
              <input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                className={`form-input-ctrl ${errors.password ? 'has-error' : ''}`}
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
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

          {/* Confirm Password */}
          <div className="form-field-group">
            <label className="form-field-label" htmlFor="register-confirm-password">
              Confirm Password <span style={{ color: '#D32F2F' }}>*</span>
            </label>
            <div className="user-input-wrap">
              <input
                id="register-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                className={`form-input-ctrl ${errors.confirmPassword ? 'has-error' : ''}`}
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="user-input-icon-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? (
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
            {errors.confirmPassword && <div className="user-error-hint">{errors.confirmPassword}</div>}
          </div>

          <button
            id="register-submit-btn"
            type="submit"
            className="ojalis-auth-submit-btn"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register for Ojalis'}
          </button>
        </form>

        <div className="ojalis-auth-footer-prompt">
          Already have an account?{' '}
          <Link
            to="/login"
            state={{ from }}
            className="ojalis-auth-footer-link"
          >
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
