import { AppBar, Toolbar, Typography, Button, Box, Container, useTheme, TextField, InputAdornment } from '@mui/material';
import { sideMenuStyles } from './SideMenuStyles';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import CreateIcon from '@mui/icons-material/Create';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

export default function SideMenuUnsigned() {
  const theme = useTheme();
  const navigate = useNavigate();

  const { loginWithRedirect } = useAuth0();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Container sx={sideMenuStyles.unsignedContainer(theme)}>

        <Container sx={sideMenuStyles.messageContainer(theme)}>
            <Typography variant='h2'>
                It appears you're not signed in
            </Typography>
        </Container>

        <Container sx={sideMenuStyles.buttonsContainer(theme)}>
            {/* Register */}
            <Button 
                sx={sideMenuStyles.primaryButton(theme)}
                onClick={() => handleNavigation('/register')}
            >
                <Typography sx={sideMenuStyles.primaryButtonText(theme)}>Register</Typography>
            </Button>

            <Container sx={sideMenuStyles.divider(theme)}>
                <Container sx={sideMenuStyles.line(theme)}></Container>
                <Typography variant='caption' sx={sideMenuStyles.or(theme)}>or</Typography>
                <Container sx={sideMenuStyles.line(theme)}></Container>
            </Container>

            {/* Login */}
            <Button 
            sx={sideMenuStyles.secondaryButton(theme)}
            onClick={() => loginWithRedirect()}>
            <Typography sx={sideMenuStyles.secondaryButtonText(theme)}>
                Login
            </Typography>
        </Button>
        </Container>

    </Container>
  );
}