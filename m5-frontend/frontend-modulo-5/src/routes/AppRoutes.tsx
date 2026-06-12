import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Páginas públicas
import Home from '../pages/public/Home';
import DetailedPost from '../pages/public/DetailedPost';
import Evidences from '../pages/public/Evidences';
import Search from '../pages/public/Search';

// Páginas de usuario
import Profile from '../pages/user/Profile';
import CreateBoycott from '../pages/user/CreateBoycott';
import Favorites from '../pages/user/Favorites';
import MyPosts from '../pages/user/MyPosts';
import EditProfile from '../pages/user/EditProfile';
import MyVotes from '../pages/user/MyVotes';
import Suggestions from '../pages/user/Suggestions';

// Páginas de admin
import Dashboard from '../pages/admin/Dashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageReports from '../pages/admin/ManageReports';
import Statistics from '../pages/admin/Statistics';
import Queries from '../pages/admin/Queries';
import UserHistory from '../pages/admin/UserHistory';
import MostFollowedCases from '../pages/admin/MostFollowedCases';
import CasesOfInjustice from '../pages/admin/CasesOfInjustice';
import Catalogues from '../pages/admin/Catalogues';
import Logs from '../pages/admin/Logs';
import ManageComments from '../pages/admin/ManageComments';
import ManageSuggestions from '../pages/admin/ManageSuggestions';
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
        <Route path="/search/" element={<Search />} />
        <Route path="/detailed-post/:id" element={<DetailedPost />} />
        <Route path="/detailed-post/:id/evidences" element={<Evidences />} />

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
        <Route path="/my-votes" element={
          <ProtectedRoute allowedRoles={['user', 'admin', 'master']}>
            <MyVotes />
          </ProtectedRoute>
        } />
        <Route path="suggestions" element={
          <ProtectedRoute allowedRoles={['user', 'admin', 'master']}>
            <Suggestions />
          </ProtectedRoute>
        } />

        <Route path="/edit-profile" element={
          <ProtectedRoute allowedRoles={['user', 'admin', 'master']}>
            <EditProfile />
          </ProtectedRoute>
        } />

      {/* Rutas de administrador */}
        <Route path="/admin/" element={<Navigate to="/" replace />} />
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
        <Route path="/admin/manage-suggestions" element={
          <ProtectedRoute allowedRoles={['admin', 'master']}>
            <ManageSuggestions />
          </ProtectedRoute>
        } />
        <Route path="/admin/statistics" element={
          <ProtectedRoute allowedRoles={['admin', 'master']}>
            <Statistics />
          </ProtectedRoute>
        } />
        <Route path="/admin/queries" element={
          <ProtectedRoute allowedRoles={['admin', 'master']}>
            <Queries />
          </ProtectedRoute>
        } />
        <Route path="/admin/user-history" element={
          <ProtectedRoute allowedRoles={['admin', 'master']}>
            <UserHistory />
          </ProtectedRoute>
        } />
        <Route path="/admin/most-followed-cases" element={
          <ProtectedRoute allowedRoles={['admin', 'master']}>
            <MostFollowedCases />
          </ProtectedRoute>
        } />
        <Route path="/admin/cases-of-injustice" element={
          <ProtectedRoute allowedRoles={['admin', 'master']}>
            <CasesOfInjustice />
          </ProtectedRoute>
        } />
        <Route path="/admin/catalogues" element={
          <ProtectedRoute allowedRoles={['admin', 'master']}>
            <Catalogues />
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