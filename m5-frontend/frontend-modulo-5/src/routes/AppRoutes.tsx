import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';

// Páginas públicas
import Home from '../pages/public/Home';

// Páginas de usuario
import Profile from '../pages/user/Profile';
import CreateBoycott from '../pages/user/CreateBoycott';
import Favorites from '../pages/user/Favorites';

// Páginas de admin
import Dashboard from '../pages/admin/Dashboard';
import PendingReports from '../pages/admin/PendingReports';
import ActivityLog from '../pages/admin/ActivityLog';
import Statistics from '../pages/admin/Statistics';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas (sin inciar sesión) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Rutas de usuario registrado */}
      <Route element={<UserLayout />}>
        <Route path="/profile" element={
          <ProtectedRoute allowedRoles={['user', 'admin', 'master']}>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/create" element={
          <ProtectedRoute allowedRoles={['user', 'admin', 'master']}>
            <CreateBoycott />
          </ProtectedRoute>
        } />
        <Route path="/favorites" element={
          <ProtectedRoute allowedRoles={['user', 'admin', 'master']}>
            <Favorites />
          </ProtectedRoute>
        } />
      </Route>

      {/* Rutas de administrador */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['admin', 'master']}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/reports" element={
          <ProtectedRoute allowedRoles={['admin', 'master']}>
            <PendingReports />
          </ProtectedRoute>
        } />
        <Route path="/admin/logs" element={
          <ProtectedRoute allowedRoles={['master']}>  {/* Solo máster */}
            <ActivityLog />
          </ProtectedRoute>
        } />
        <Route path="/admin/statistics" element={
          <ProtectedRoute allowedRoles={['admin', 'master']}>
            <Statistics />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}