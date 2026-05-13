import { AppBar, Toolbar, Typography, Button, Box, Container, useTheme, TextField, InputAdornment } from '@mui/material';
import { sideMenuStyles } from './SideMenuStyles';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import CreateIcon from '@mui/icons-material/Create';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';

export default function Header() {
  const theme = useTheme();

  return (
    <Container sx={sideMenuStyles.container(theme)}>
        <Button sx={sideMenuStyles.createButton(theme)}>
            <AddCircleOutlineOutlinedIcon sx={sideMenuStyles.buttonIcon(theme)}></AddCircleOutlineOutlinedIcon>
            <Typography sx={sideMenuStyles.createButtonText(theme)}>Create</Typography>
        </Button>
        <Button sx={sideMenuStyles.navButton(theme)}>
            <HomeOutlinedIcon sx={sideMenuStyles.buttonIcon(theme)}></HomeOutlinedIcon>
            <Typography sx={sideMenuStyles.buttonText(theme)}>Home</Typography>
        </Button>
        <Button sx={sideMenuStyles.navButton(theme)}>
            <StarBorderPurple500OutlinedIcon sx={sideMenuStyles.buttonIcon(theme)}></StarBorderPurple500OutlinedIcon>
            <Typography sx={sideMenuStyles.buttonText(theme)}>Favorites</Typography>
        </Button>
        <Button sx={sideMenuStyles.navButton(theme)}>
            <CreateIcon sx={sideMenuStyles.buttonIcon(theme)}></CreateIcon>
            <Typography sx={sideMenuStyles.buttonText(theme)}>My Posts</Typography>
        </Button>
        <Container sx={sideMenuStyles.filler(theme)}></Container>
        <Button sx={sideMenuStyles.navButton(theme)}>
            <MarkunreadOutlinedIcon sx={sideMenuStyles.buttonIcon(theme)}></MarkunreadOutlinedIcon>
            <Typography sx={sideMenuStyles.buttonText(theme)}>Suggestions</Typography>
        </Button>
    </Container>
  );
}