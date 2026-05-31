import { AppBar, Toolbar, Typography, Button, Box, useTheme, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { headerStyles } from '../styles/HeaderStyles';
import TuneIcon from '@mui/icons-material/Tune';
import LogoSrc from '../../assets/logo.png';
export default function PublicHeader() {
  const theme = useTheme();

  return (
    <AppBar sx={headerStyles.appBar(theme)}>
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
          <Button color="inherit" href="/login" variant="outlined" sx={headerStyles.loginButton(theme)}>
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}