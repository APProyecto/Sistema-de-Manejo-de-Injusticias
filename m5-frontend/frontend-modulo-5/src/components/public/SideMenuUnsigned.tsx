import {
  Button,
  Container,
  Typography,
  useTheme,
  Drawer,
  Box,
} from "@mui/material";

import { sideMenuStyles } from "../styles/SideMenuStyles";
import LoginWindow from "./LoginWindow";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface SideMenuUnsignedProps {
  onLoginSuccess: (userData: any) => void;
  open: boolean;
  onClose: () => void;
}

export default function SideMenuUnsigned({
  onLoginSuccess,
  open,
  onClose,
}: SideMenuUnsignedProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const menuContent = (
    <>
      <LoginWindow
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={(userData) => {
          onLoginSuccess(userData);
          onClose();
        }}
      />

      <Container sx={sideMenuStyles.messageContainer(theme)}>
        <Typography variant="h2">It appears you're not signed in</Typography>
      </Container>

      <Container sx={sideMenuStyles.buttonsContainer(theme)}>
        <Button
          sx={sideMenuStyles.primaryButton(theme)}
          onClick={() => handleNavigation("/register")}
        >
          <Typography sx={sideMenuStyles.primaryButtonText(theme)}>
            Register
          </Typography>
        </Button>

        <Container sx={sideMenuStyles.divider(theme)}>
          <Container sx={sideMenuStyles.line(theme)} />
          <Typography variant="caption" sx={sideMenuStyles.or(theme)}>
            or
          </Typography>
          <Container sx={sideMenuStyles.line(theme)} />
        </Container>

        <Button
          sx={sideMenuStyles.secondaryButton(theme)}
          onClick={() => setLoginOpen(true)}
        >
          <Typography sx={sideMenuStyles.secondaryButtonText(theme)}>
            Login
          </Typography>
        </Button>
      </Container>
    </>
  );

  return (
    <>
      {/* Menú normal en desktop */}
      <Container
        sx={{
          ...sideMenuStyles.unsignedContainer(theme),
          display: { xs: "none", sm: "flex" },
        }}
      >
        {menuContent}
      </Container>

      
      <Drawer anchor="left" open={open} onClose={onClose}>
        <Box
          sx={{
            ...sideMenuStyles.unsignedContainer(theme),
            width: "280px",
            height: "100%",
            display: "flex",
          }}
        >
          {menuContent}
        </Box>
      </Drawer>
    </>
  );
}