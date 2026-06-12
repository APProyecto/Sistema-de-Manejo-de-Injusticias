import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useTheme,
  IconButton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LogoSrc from "../../assets/logo.png";
import { useState } from "react";
import LoginWindow from "./LoginWindow";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Searchbar from "../common/SearchBar";
import { headerStyles } from "../styles/HeaderStyles";

interface PublicHeaderProps {
  onLoginSuccess: (userData: any) => void;
  onOpenSideMenu: () => void;
}



export default function PublicHeader({ onLoginSuccess, onOpenSideMenu }: PublicHeaderProps) {
  const theme = useTheme();
  const [loginOpen, setLoginOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate("/my-votes");
  };


  return (
    <AppBar sx={headerStyles.appBar(theme)}>
      <LoginWindow
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={(userData) => onLoginSuccess(userData)}
      />

  <Toolbar sx={headerStyles.toolbar(theme)}>
  <IconButton
    sx={headerStyles.mobileMenuButton(theme)}
    onClick={onOpenSideMenu}
  >
    <MenuIcon />
</IconButton>

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

  <Box sx={headerStyles.searchContainer(theme)}>
    <Searchbar />
  </Box>

  <Box sx={headerStyles.authContainer(theme)}>
    {user ? (
      <Button
        color="inherit"
        sx={headerStyles.profilePictureButton(theme)}
        onClick={handleAvatarClick}
      >
      </Button>
    ) : (
      <Button
        color="inherit"
        variant="outlined"
        sx={headerStyles.loginButton(theme)}
        onClick={() => setLoginOpen(true)}
      >
        Login
      </Button>
    )}
  </Box>
</Toolbar>
    </AppBar>
  );
}