import { AppBar, Toolbar, Typography, Button, Box, Container, useTheme, TextField, InputAdornment } from '@mui/material';
import { sideMenuStyles } from './SideMenuStyles';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import CreateIcon from '@mui/icons-material/Create';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import { useNavigate } from 'react-router-dom';

export default function Header() {
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
            <Typography sx={sideMenuStyles.createButtonText(theme)}>Create</Typography>
        </Button>

        {/* Home */}
        <Button 
            sx={sideMenuStyles.navButton(theme)}
            onClick={() => handleNavigation('/home')}
        >
            <HomeOutlinedIcon sx={sideMenuStyles.buttonIcon(theme)}></HomeOutlinedIcon>
            <Typography sx={sideMenuStyles.buttonText(theme)}>Home</Typography>
        </Button>

        {/* Favorites */}
        <Button 
            sx={sideMenuStyles.navButton(theme)}
            onClick={() => handleNavigation('/favorites')}
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