import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getUserToken, setUserToken, removeUserToken, userApiFetch } from '../utils/userApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(getUserToken());
  const [loading, setLoading] = useState(true);

  // Load user profile on startup if token exists
  const loadUser = useCallback(async () => {
    const existingToken = getUserToken();
    if (!existingToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await userApiFetch('/auth/me');
      if (res.success && (res.user || res.data)) {
        setUser(res.user || res.data);
      } else {
        removeUserToken();
        setUser(null);
      }
    } catch (err) {
      // Expired or invalid token
      removeUserToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Register
  const register = async (userData) => {
    const res = await userApiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (res.success && res.token) {
      setUserToken(res.token);
      setTokenState(res.token);
      setUser(res.user);
    }
    return res;
  };

  // Login
  const login = async (email, password) => {
    const res = await userApiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (res.success && res.token) {
      setUserToken(res.token);
      setTokenState(res.token);
      setUser(res.user);
    }
    return res;
  };

  // Update profile
  const updateProfile = async (profileData) => {
    const res = await userApiFetch('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });

    if (res.success && res.user) {
      setUser((prev) => ({ ...prev, ...res.user }));
    }
    return res;
  };

  // Change password
  const changePassword = async (passwordData) => {
    const res = await userApiFetch('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
    return res;
  };

  // Logout
  const logout = async () => {
    try {
      await userApiFetch('/auth/logout', { method: 'POST' });
    } catch (err) {
      // Ignore network errors on logout
    } finally {
      removeUserToken();
      setTokenState(null);
      setUser(null);
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    loading,
    login,
    register,
    updateProfile,
    changePassword,
    logout,
    refreshUser: loadUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
