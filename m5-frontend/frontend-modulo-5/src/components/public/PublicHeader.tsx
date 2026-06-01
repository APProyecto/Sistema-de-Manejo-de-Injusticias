import { AppBar, Toolbar, Typography, Button, Box, useTheme, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { headerStyles } from '../styles/HeaderStyles';
import TuneIcon from '@mui/icons-material/Tune';
import LogoSrc from '../../assets/logo.png';
import { useState } from 'react';
import LoginWindow from './LoginWindow';

interface PublicHeaderProps {
  onLoginSuccess: (userData: any) => void;
}

export default function PublicHeader({ onLoginSuccess }: PublicHeaderProps) {


  const theme = useTheme();
  const [loginOpen, setLoginOpen] = useState (false);

  return (
    <AppBar sx={headerStyles.appBar(theme)}>
      <LoginWindow open = {loginOpen} onClose={() => setLoginOpen(false)} onLoginSuccess={(userData) => onLoginSuccess(userData)}/>
      <Toolbar sx={headerStyles.toolbar(theme)}>
        
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
        }}>
            <img 
                src={LogoSrc} 
                alt="Logo" 
                style={{ 
                    width: '124px', 
                    objectFit: 'contain'
                }} 
            />
        </Box>

        {/* Barra de Búsqueda */}
        <TextField
          placeholder="Search..."
          variant="outlined"
          size="medium"
          sx={headerStyles.searchField(theme)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={headerStyles.searchIcon(theme)} />
                </InputAdornment>
              ),
              endAdornment: (
                <Button>
                  <TuneIcon sx={headerStyles.filterButton(theme)} />
                </Button>
              ),
            },
          }}
        />

        <Box>
          <Button
           color="inherit" 
           variant="outlined" 
           sx={headerStyles.loginButton(theme)}
           onClick={() => setLoginOpen(true)}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}