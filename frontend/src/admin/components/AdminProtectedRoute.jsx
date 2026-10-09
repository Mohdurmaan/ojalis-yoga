import { Navigate } from 'react-router-dom';
import { getToken } from '../services/api';

function AdminProtectedRoute({ children }) {
  const token = getToken();
  
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default AdminProtectedRoute;
