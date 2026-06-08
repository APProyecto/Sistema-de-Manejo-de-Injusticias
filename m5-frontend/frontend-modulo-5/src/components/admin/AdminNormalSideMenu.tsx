import { AppBar, Toolbar, Typography, Button, Box, Container, useTheme, TextField, InputAdornment } from '@mui/material';
import { sideMenuStyles } from '../styles/SideMenuStyles';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import CreateIcon from '@mui/icons-material/Create';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import { useNavigate } from 'react-router-dom';
import { Assessment } from '@mui/icons-material';

interface AdminNormalSideMenu {
    onSwitchToDashboardMode: () => void; 
    currentMode?: string;
}

export default function AdminNormalSideMenu({ onSwitchToDashboardMode, currentMode }: AdminNormalSideMenu) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Container sx={sideMenuStyles.container(theme)}>
        {/* Crear */}
        <Button 
            sx={sideMenuStyles.createButton(theme)}
            onClick={() => handleNavigation('/create')}
        >
            <AddCircleOutlineOutlinedIcon sx={sideMenuStyles.buttonIcon(theme)}></AddCircleOutlineOutlinedIcon>
            <Typography sx={sideMenuStyles.primaryButtonText(theme)}>Create</Typography>
        </Button>

        {/* Home */}
        <Button 
            sx={sideMenuStyles.navButton(theme)}
            onClick={() => handleNavigation('admin/')}
        >
            <HomeOutlinedIcon sx={sideMenuStyles.buttonIcon(theme)}></HomeOutlinedIcon>
            <Typography sx={sideMenuStyles.buttonText(theme)}>Home</Typography>
        </Button>

        {/* Favorites */}
        <Button 
            sx={sideMenuStyles.navButton(theme)}
            onClick={() => handleNavigation('../favorites')}
        >
            <StarBorderPurple500OutlinedIcon sx={sideMenuStyles.buttonIcon(theme)}></StarBorderPurple500OutlinedIcon>
            <Typography sx={sideMenuStyles.buttonText(theme)}>Favorites</Typography>
        </Button>

        {/* My posts */}
        <Button 
            sx={sideMenuStyles.navButton(theme)}
            onClick={() => handleNavigation('/my-posts')}
        >
            <CreateIcon sx={sideMenuStyles.buttonIcon(theme)}></CreateIcon>
            <Typography sx={sideMenuStyles.buttonText(theme)}>My Posts</Typography>
        </Button>

        {/* Dashboard */}
        <Button 
            sx={sideMenuStyles.navButton(theme)}
            onClick={onSwitchToDashboardMode}
        >
            <Assessment sx={sideMenuStyles.buttonIcon(theme)}></Assessment>
            <Typography sx={sideMenuStyles.buttonText(theme)}>Admin Dashboard</Typography>
        </Button>

        {/* Espacio en blanco para rellenar */}
        <Container sx={sideMenuStyles.filler(theme)}></Container>

        {/* Suggestions */}
        <Button 
            sx={sideMenuStyles.navButton(theme)}
            onClick={() => handleNavigation('/suggestions')}
        >
            <MarkunreadOutlinedIcon sx={sideMenuStyles.buttonIcon(theme)}></MarkunreadOutlinedIcon>
            <Typography sx={sideMenuStyles.buttonText(theme)}>Suggestions</Typography>
        </Button>
    </Container>
  );
}