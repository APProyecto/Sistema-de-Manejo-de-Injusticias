import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useTheme,
  TextField,
  InputAdornment,
} from "@mui/material";
import { sideMenuStyles } from "../styles/SideMenuStyles";
import LoginWindow from "./LoginWindow";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

interface SideMenuUnsignedProps {
  onLoginSuccess: (userData: any) => void;
}

export default function SideMenuUnsigned({
  onLoginSuccess,
}: SideMenuUnsignedProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);

  const { loginWithRedirect } = useAuth0();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Container sx={sideMenuStyles.unsignedContainer(theme)}>
      <LoginWindow
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={(userData) => onLoginSuccess(userData)}
      />

      <Container sx={sideMenuStyles.messageContainer(theme)}>
        <Typography variant="h2">It appears you're not signed in</Typography>
      </Container>

      <Container sx={sideMenuStyles.buttonsContainer(theme)}>
        {/* Register */}
        <Button
          sx={sideMenuStyles.primaryButton(theme)}
          onClick={() => handleNavigation("/register")}
        >
          <Typography sx={sideMenuStyles.primaryButtonText(theme)}>
            Register
          </Typography>
        </Button>

        <Container sx={sideMenuStyles.divider(theme)}>
          <Container sx={sideMenuStyles.line(theme)}></Container>
          <Typography variant="caption" sx={sideMenuStyles.or(theme)}>
            or
          </Typography>
          <Container sx={sideMenuStyles.line(theme)}></Container>
        </Container>

        {/* Login */}
        <Button
          sx={sideMenuStyles.secondaryButton(theme)}
          onClick={() => setLoginOpen(true)}
        >
          <Typography sx={sideMenuStyles.secondaryButtonText(theme)}>
            Login
          </Typography>
        </Button>
      </Container>
    </Container>
  );
}
