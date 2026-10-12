import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function UserProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F0EBDD',
          color: '#1A1A1A',
          fontFamily: "'Cinzel', serif",
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(79, 97, 68, 0.2)',
            borderTopColor: '#4F6144',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '16px',
          }}
        />
        <p style={{ letterSpacing: '0.1em', fontSize: '0.9rem', color: '#4F6144' }}>
          Loading your sanctuary...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
