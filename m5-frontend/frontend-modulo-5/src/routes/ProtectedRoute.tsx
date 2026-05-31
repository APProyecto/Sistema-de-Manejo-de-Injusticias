import { Navigate } from 'react-router-dom';
import { useAuth, type UserRole } from '../context/authContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole | UserRole[];  // Roles permitidos
  redirectTo?: string;                   // A dónde redirigir si no tiene acceso
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles = ['user', 'admin', 'master'],  // Por defecto, cualquier usuario autenticado
  redirectTo = '/' 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasRole } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // redirigir a login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // redirigir según el rol que tiene
  if (!hasRole(allowedRoles)) {
    // si es admin redirigir a admin dashboard
    if (hasRole('admin') || hasRole('master')) {
      return <Navigate to="/admin/dashboard" replace />;
    }
    // si es user normal redirigir a home
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}