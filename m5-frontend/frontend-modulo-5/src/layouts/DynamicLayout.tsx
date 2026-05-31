import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import PublicLayout from './PublicLayout';
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';

export default function DynamicLayout() {
  const { isAuthenticated, user } = useAuth();
  
  // Si no está autenticado, layout público
  if (!isAuthenticated) {
    return <PublicLayout />;
  }
  
  // Si es admin o master, layout admin
  if (user?.rol === 'admin' || user?.rol === 'master') {
    return <AdminLayout />;
  }
  
  // Usuario normal, layout user
  return <UserLayout />;
}