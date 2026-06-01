import { AppBar, Toolbar, Button, Box, useTheme, TextField, InputAdornment, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { headerStyles } from '../styles/HeaderStyles';
import TuneIcon from '@mui/icons-material/Tune';
import LogoSrc from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
export default function UserHeader() {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate('/profile/');
  };
  const {user} = useAuth()



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
          <Button 
            color="inherit" 
            title='User Profile' 
            sx={headerStyles.profilePictureButton(theme)}
            onClick={handleProfileClick}
          >
                <Avatar
                    src= {user?.profilePicture}
                    alt= {'data.username'}
                    sx={headerStyles.profilePicture(theme)}
                />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}