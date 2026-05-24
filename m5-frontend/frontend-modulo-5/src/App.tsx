import Guide from './pages/Guide';
import Header from './components/Header';
import SideMenu from './components/SideMenu'
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import MyPosts from './pages/MyPosts';
import Suggestions from './pages/Suggestions';
import { Container, ThemeProvider } from '@mui/system';
import { darkTheme, lightTheme } from './theme';
import { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import CerateBoycott from './pages/CreateBoycott';
import SideMenuUnsigned from './components/SideMenuUnsigned';
import Register from './pages/Register';

const theme = darkTheme;
const singedIn = true;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          element={
            <Container>
              <Header />
              <Container sx={
                {display:'flex', 
                flexDirection:'row', 
                height: 'calc(100vh - 90px)',
                overflow: 'hidden'
                }}>
                {singedIn?
                  <SideMenu />:
                  <SideMenuUnsigned />
                }
                <Outlet/>
              </Container>
            </Container>
          }
        >
      
      {/*ESTAS SON LAS RUTAS QUE CONTIENEN SIDEBARS */}
      
          <Route path="/" element={<Guide />} />
          <Route path="/home" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/create" element={<CerateBoycott />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/suggestions" element={<Suggestions />} />
        
        </Route>
      
      {/*ESTAS SON LAS RUTAS QUE NO CONTIENEN SIDEBARS */}
      
        <Route path="/register" element={<Register />} />
  
      </Routes>

    </ThemeProvider>
  );
}

export default App;