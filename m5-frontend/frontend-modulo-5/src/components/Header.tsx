import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { headerStyles } from "./HeaderStyles";
import TuneIcon from "@mui/icons-material/Tune";
import LogoSrc from "../assets/logo.png";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../context/authContext";
export default function Header() {
  const theme = useTheme();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const { logout: localLogout } = useAuth();
  return (
    <AppBar sx={headerStyles.appBar(theme)}>
      <Toolbar sx={headerStyles.toolbar(theme)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={LogoSrc}
            alt="Logo"
            style={{
              width: "124px",
              objectFit: "contain",
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
          {!isAuthenticated ? (
            <Button
              color="inherit"
              variant="outlined"
              sx={headerStyles.loginButton(theme)}
              onClick={() => loginWithRedirect()}
            >
              Login
            </Button>
          ) : (
            <Button
              color="inherit"
              variant="outlined"
              sx={headerStyles.loginButton(theme)}
              onClick={() => {
                sessionStorage.setItem("auth0LoggingOut", "true");
                localLogout();

                logout({
                  logoutParams: {
                    returnTo: window.location.origin,
                  },
                });
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
