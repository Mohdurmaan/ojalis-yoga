import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './userDashboard.css';

export default function UserProfile() {
  const { user, updateProfile, changePassword } = useAuth();

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [profileErrors, setProfileErrors] = useState({});
  const [profileStatus, setProfileStatus] = useState({ error: '', success: '' });
  const [profileSaving, setProfileSaving] = useState(false);

  // Password Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordStatus, setPasswordStatus] = useState({ error: '', success: '' });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  // Profile update handler
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    if (profileErrors[name]) setProfileErrors((prev) => ({ ...prev, [name]: '' }));
    if (profileStatus.error || profileStatus.success) {
      setProfileStatus({ error: '', success: '' });
    }
  };

  const validateProfileForm = () => {
    const errors = {};
    if (!profileData.name.trim()) {
      errors.name = 'Full name cannot be empty';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!profileData.email.trim()) {
      errors.email = 'Email address cannot be empty';
    } else if (!emailRegex.test(profileData.email.trim())) {
      errors.email = 'Please provide a valid email format';
    }

    const phoneDigits = (profileData.phone || '').replace(/[^0-9]/g, '');
    if (profileData.phone && phoneDigits.length < 10) {
      errors.phone = 'Mobile number must be at least 10 digits';
    }

    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileStatus({ error: '', success: '' });

    if (!validateProfileForm()) return;

    setProfileSaving(true);
    try {
      const res = await updateProfile({
        name: profileData.name.trim(),
        email: profileData.email.trim().toLowerCase(),
        phone: profileData.phone.trim(),
      });

      if (res.success) {
        setProfileStatus({
          error: '',
          success: 'Your profile details have been successfully updated.',
        });
      } else {
        setProfileStatus({
          error: res.message || 'Failed to update profile.',
          success: '',
        });
      }
    } catch (err) {
      setProfileStatus({
        error: err.message || 'An unexpected error occurred while updating profile.',
        success: '',
      });
    } finally {
      setProfileSaving(false);
    }
  };

  // Password change handler
  const handlePasswordChangeInput = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    if (passwordErrors[name]) setPasswordErrors((prev) => ({ ...prev, [name]: '' }));
    if (passwordStatus.error || passwordStatus.success) {
      setPasswordStatus({ error: '', success: '' });
    }
  };

  const validatePasswordForm = () => {
    const errors = {};
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Enter your current password';
    }
    if (!passwordData.newPassword) {
      errors.newPassword = 'Enter a new password';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'New password must be at least 6 characters long';
    }
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      errors.confirmNewPassword = 'New passwords do not match';
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordStatus({ error: '', success: '' });

    if (!validatePasswordForm()) return;

    setPasswordSaving(true);
    try {
      const res = await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (res.success) {
        setPasswordStatus({
          error: '',
          success: 'Password updated successfully.',
        });
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
      } else {
        setPasswordStatus({
          error: res.message || 'Failed to change password. Verify your current password.',
          success: '',
        });
      }
    } catch (err) {
      setPasswordStatus({
        error: err.message || 'An unexpected error occurred.',
        success: '',
      });
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <>
      <div className="user-content-card">
        <div className="user-card-header">
          <div>
            <h1 className="user-card-title">My Account Settings</h1>
            <p className="user-card-subtitle">
              Manage your personal information, contact credentials, and security settings.
            </p>
          </div>
        </div>

        <div className="user-profile-grid">
          {/* Section 1: Personal Details */}
          <div>
            <h3
              style={{
                fontFamily: 'Forum, serif',
                fontSize: '1.25rem',
                color: 'var(--user-charcoal)',
                marginBottom: '16px',
                borderBottom: '1px solid var(--user-border)',
                paddingBottom: '8px',
              }}
            >
              Personal & Contact Information
            </h3>

            {profileStatus.error && (
              <div className="user-alert user-alert-error" style={{ marginBottom: '16px' }}>
                <span>{profileStatus.error}</span>
              </div>
            )}

            {profileStatus.success && (
              <div className="user-alert user-alert-success" style={{ marginBottom: '16px' }}>
                <span>{profileStatus.success}</span>
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="user-auth-form" noValidate>
              <div className="user-form-group">
                <label className="user-form-label" htmlFor="profile-name">
                  Full Name
                </label>
                <input
                  id="profile-name"
                  type="text"
                  name="name"
                  className={`user-input ${profileErrors.name ? 'has-error' : ''}`}
                  value={profileData.name}
                  onChange={handleProfileChange}
                  required
                />
                {profileErrors.name && (
                  <div className="user-error-hint">{profileErrors.name}</div>
                )}
              </div>

              <div className="user-form-group">
                <label className="user-form-label" htmlFor="profile-email">
                  Email Address
                </label>
                <input
                  id="profile-email"
                  type="email"
                  name="email"
                  className={`user-input ${profileErrors.email ? 'has-error' : ''}`}
                  value={profileData.email}
                  onChange={handleProfileChange}
                  required
                />
                {profileErrors.email && (
                  <div className="user-error-hint">{profileErrors.email}</div>
                )}
              </div>

              <div className="user-form-group">
                <label className="user-form-label" htmlFor="profile-phone">
                  Mobile Number
                </label>
                <input
                  id="profile-phone"
                  type="tel"
                  name="phone"
                  className={`user-input ${profileErrors.phone ? 'has-error' : ''}`}
                  placeholder="+91 98765 43210"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                />
                {profileErrors.phone && (
                  <div className="user-error-hint">{profileErrors.phone}</div>
                )}
              </div>

              <button
                id="profile-save-btn"
                type="submit"
                className="user-btn-primary"
                disabled={profileSaving}
                style={{ marginTop: '10px' }}
              >
                {profileSaving ? 'Saving Changes...' : 'Update Profile Details'}
              </button>
            </form>
          </div>

          {/* Section 2: Change Password */}
          <div>
            <h3
              style={{
                fontFamily: 'Forum, serif',
                fontSize: '1.25rem',
                color: 'var(--user-charcoal)',
                marginBottom: '16px',
                borderBottom: '1px solid var(--user-border)',
                paddingBottom: '8px',
              }}
            >
              Change Password
            </h3>

            {passwordStatus.error && (
              <div className="user-alert user-alert-error" style={{ marginBottom: '16px' }}>
                <span>{passwordStatus.error}</span>
              </div>
            )}

            {passwordStatus.success && (
              <div className="user-alert user-alert-success" style={{ marginBottom: '16px' }}>
                <span>{passwordStatus.success}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="user-auth-form" noValidate>
              <div className="user-form-group">
                <label className="user-form-label" htmlFor="current-password">
                  Current Password <span className="req">*</span>
                </label>
                <div className="user-input-wrap">
                  <input
                    id="current-password"
                    type={showCurrentPw ? 'text' : 'password'}
                    name="currentPassword"
                    className={`user-input ${passwordErrors.currentPassword ? 'has-error' : ''}`}
                    placeholder="Enter existing password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChangeInput}
                    required
                  />
                  <button
                    type="button"
                    className="user-input-icon-btn"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    aria-label="Toggle password visibility"
                  >
                    {showCurrentPw ? (
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
                {passwordErrors.currentPassword && (
                  <div className="user-error-hint">{passwordErrors.currentPassword}</div>
                )}
              </div>

              <div className="user-form-group">
                <label className="user-form-label" htmlFor="new-password">
                  New Password <span className="req">*</span>
                </label>
                <div className="user-input-wrap">
                  <input
                    id="new-password"
                    type={showNewPw ? 'text' : 'password'}
                    name="newPassword"
                    className={`user-input ${passwordErrors.newPassword ? 'has-error' : ''}`}
                    placeholder="At least 6 characters"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChangeInput}
                    required
                  />
                  <button
                    type="button"
                    className="user-input-icon-btn"
                    onClick={() => setShowNewPw(!showNewPw)}
                    aria-label="Toggle password visibility"
                  >
                    {showNewPw ? (
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
                {passwordErrors.newPassword && (
                  <div className="user-error-hint">{passwordErrors.newPassword}</div>
                )}
              </div>

              <div className="user-form-group">
                <label className="user-form-label" htmlFor="confirm-new-password">
                  Confirm New Password <span className="req">*</span>
                </label>
                <input
                  id="confirm-new-password"
                  type="password"
                  name="confirmNewPassword"
                  className={`user-input ${passwordErrors.confirmNewPassword ? 'has-error' : ''}`}
                  placeholder="Repeat new password"
                  value={passwordData.confirmNewPassword}
                  onChange={handlePasswordChangeInput}
                  required
                />
                {passwordErrors.confirmNewPassword && (
                  <div className="user-error-hint">{passwordErrors.confirmNewPassword}</div>
                )}
              </div>

              <button
                id="change-password-submit-btn"
                type="submit"
                className="user-btn-primary"
                disabled={passwordSaving}
                style={{ marginTop: '10px' }}
              >
                {passwordSaving ? 'Updating Password...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
