import { AppBar, Toolbar, Button, Box, useTheme, TextField, InputAdornment, Avatar } from '@mui/material';
import { headerStyles } from '../styles/HeaderStyles';
import LogoSrc from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import DefaultAvatar from '../../assets/pfpDefaultImage.png';
import Searchbar from '../common/SearchBar';
export default function UserHeader() {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate('/my-votes');
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
        <Searchbar></Searchbar>

        <Box>
          <Button 
            color="inherit" 
            title='User Profile' 
            sx={headerStyles.profilePictureButton(theme)}
            onClick={handleProfileClick}
          >
                <Avatar
                    src={user?.picture || DefaultAvatar}
                    alt={user?.appUserName || 'User avatar'}
                    sx={headerStyles.profilePicture(theme)}
                />
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}