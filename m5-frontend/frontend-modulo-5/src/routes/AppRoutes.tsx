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
import MyPosts from '../pages/user/MyPosts';
import EditProfile from '../pages/user/EditProfile';

// Páginas de admin
import AdminHome from '../pages/admin/AdminHome';
import Dashboard from '../pages/admin/Dashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageReports from '../pages/admin/ManageReports';
import Statistics from '../pages/admin/Statistics';
import Quereis from '../pages/admin/Queries';
import CasesOfInjustice from '../pages/admin/CasesOfInjustice';
import Logs from '../pages/admin/Logs';
import ManageComments from '../pages/admin/ManageComments';
import DynamicLayout from '../layouts/DynamicLayout';
import Register from '../pages/public/Register';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas sin header ni side menu */}
      <Route path='register' element={<Register />}/>

      {/* Rutas públicas (sin inciar sesión) */}
      <Route element={<DynamicLayout />}>
        <Route path="/" element={<Home />} />

      {/* Rutas de usuario registrado */}
        
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

        <Route path="/my-posts" element={
          <ProtectedRoute allowedRoles={['user', 'admin', 'master']}>
            <MyPosts />
          </ProtectedRoute>
        } />

        <Route path="/edit-profile" element={
          <ProtectedRoute allowedRoles={['user', 'admin', 'master']}>
            <EditProfile />
          </ProtectedRoute>
        } />

      {/* Rutas de administrador */}
        <Route path="/admin/" element={
          <ProtectedRoute allowedRoles={['admin', 'master']}>
            <AdminHome />
          </ProtectedRoute>
        } />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['admin', 'master']}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/manage-users" element={
          <ProtectedRoute allowedRoles={['admin', 'master']}>
            <ManageUsers />
          </ProtectedRoute>
        } />
        <Route path="/admin/manage-reports" element={
          <ProtectedRoute allowedRoles={['admin', 'master']}>
            <ManageReports />
          </ProtectedRoute>
        } />
        <Route path="/admin/manage-comments" element={
          <ProtectedRoute allowedRoles={['admin', 'master']}>
            <ManageComments />
          </ProtectedRoute>
        } />
        <Route path="/admin/statistics" element={
          <ProtectedRoute allowedRoles={['admin', 'master']}>
            <Statistics />
          </ProtectedRoute>
        } />
        <Route path="/admin/queries" element={
          <ProtectedRoute allowedRoles={['admin', 'master']}>
            <Quereis />
          </ProtectedRoute>
        } />
        <Route path="/admin/cases-of-injustice" element={
          <ProtectedRoute allowedRoles={['admin', 'master']}>
            <CasesOfInjustice />
          </ProtectedRoute>
        } />
        <Route path="/admin/logs" element={
          <ProtectedRoute allowedRoles={['master']}>  {/* Solo máster */}
            <Logs />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}