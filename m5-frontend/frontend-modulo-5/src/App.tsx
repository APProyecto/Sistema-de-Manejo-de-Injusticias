import Guide from './pages/Guide';
import Header from './components/Header';
import SideMenu from './components/SideMenu'
import Home from './pages/Home';
import { Container, display, ThemeProvider } from '@mui/system';
import { darkTheme, lightTheme } from './theme';
import { useState } from 'react';

const theme = darkTheme;
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header />
        <Container sx={
          {display:'flex', 
          flexDirection:'row', 
          height: 'calc(100vh - 90px)'
          }}>
          <SideMenu />
          <Home />
        </Container>
      </Container>
    </ThemeProvider>
  );
}

export default App;