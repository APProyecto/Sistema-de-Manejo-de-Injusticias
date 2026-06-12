import { AppBar, Toolbar, Button, Box, useTheme, TextField, InputAdornment, Avatar } from '@mui/material';
import { headerStyles } from '../styles/HeaderStyles';
import LogoSrc from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import DefaultAvatar from '../../assets/pfpDefaultImage.png';
import Searchbar from '../common/SearchBar';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  getUserProfilePictureUrl,
} from "../../services/userService";
export default function UserHeader() {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate('/my-votes');
  };
  const { user} = useAuth();
  if (!user) return null;
  console.log("USUARIO", user);
  const currentUser = user as any;
  const userId = currentUser.appUserId ?? currentUser.userId;
  const profilePicture =
      currentUser.picture ??
      currentUser.profilePicture ??
      (userId ? getUserProfilePictureUrl(userId) : undefined);


  return (
  <AppBar sx={headerStyles.appBar(theme)}>
    <Toolbar sx={headerStyles.toolbar(theme)}>
      {/* Menú móvil izquierda */}
      <IconButton sx={headerStyles.mobileMenuButton(theme)}>
        <MenuIcon />
      </IconButton>

      {/* Logo centrado en móvil */}
      <Box sx={headerStyles.logoContainer(theme)}>
        <img
          src={LogoSrc}
          alt="Logo"
          style={{
            width: "124px",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Barra de búsqueda solo desktop */}
      <Box sx={headerStyles.searchContainer(theme)}>
        <Searchbar />
      </Box>

      {/* Avatar derecha */}
      <Box sx={headerStyles.authContainer(theme)}>
        <Button
          color="inherit"
          title="User Profile"
          sx={headerStyles.profilePictureButton(theme)}
          onClick={handleProfileClick}
        >
          <Avatar
            src={profilePicture || DefaultAvatar}
            alt={user?.appUserName || "User avatar"}
            sx={headerStyles.profilePicture(theme)}
          />
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
);
}