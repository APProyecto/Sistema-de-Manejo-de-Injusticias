import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];  // ['admin'] o ['user', 'admin'] o ['master']
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole'); // 'user' | 'admin' | 'master'

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole || '')) {
    // Redirigir según el rol que tiene
    if (userRole === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}