import { Navigate } from 'react-router-dom';
import { getToken, getAdminUser, removeToken } from '../services/api';

function AdminProtectedRoute({ children }) {
  const token = getToken();
  const user = getAdminUser();
  
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!user || user.role !== 'admin') {
    removeToken();
    return <Navigate to="/admin/login?error=You%20are%20not%20an%20admin" replace />;
  }

  return children;
}

export default AdminProtectedRoute;
