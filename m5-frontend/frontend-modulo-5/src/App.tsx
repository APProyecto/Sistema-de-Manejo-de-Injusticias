import Home from './pages/public/Home';
import { Container, ThemeProvider } from '@mui/system';
import { darkTheme, lightTheme } from './theme';
import { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Register from './pages/public/Register';
import PublicLayout from './layouts/PublicLayout';
import UserLayout from './layouts/UserLayout';
import CreateBoycott from './pages/user/CreateBoycott';
import Favorites from './pages/user/Favorites';
import MyPosts from './pages/user/MyPosts';
import Suggestions from './pages/user/Suggestions';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/authContext';
import { SearchProvider } from './context/SearchContext';

const theme = darkTheme;

function App() {

  return (
    <SearchProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <AppRoutes/>
        </ThemeProvider>
      </AuthProvider>
    </SearchProvider>

  );
}

export default App;