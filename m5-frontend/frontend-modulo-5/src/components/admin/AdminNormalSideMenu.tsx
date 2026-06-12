import {
  Typography,
  Button,
  Box,
  Container,
  useTheme,
  Drawer,
} from "@mui/material";

import { sideMenuStyles } from "../styles/SideMenuStyles";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import CreateIcon from "@mui/icons-material/Create";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import { useNavigate } from "react-router-dom";
import { Assessment } from "@mui/icons-material";

interface AdminNormalSideMenuProps {
  onSwitchToDashboardMode: () => void;
  currentMode?: string;
  open: boolean;
  onClose: () => void;
}

export default function AdminNormalSideMenu({
  onSwitchToDashboardMode,
  currentMode,
  open,
  onClose,
}: AdminNormalSideMenuProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleDashboardClick = () => {
    onSwitchToDashboardMode();
    
  };

  const menuContent = (
    <>
      <Button
        sx={sideMenuStyles.createButton(theme)}
        onClick={() => handleNavigation("/create")}
      >
        <AddCircleOutlineOutlinedIcon sx={sideMenuStyles.buttonIcon(theme)} />
        <Typography sx={sideMenuStyles.primaryButtonText(theme)}>
          Create
        </Typography>
      </Button>

      <Button
        sx={sideMenuStyles.navButton(theme)}
        onClick={() => handleNavigation("/")}
      >
        <HomeOutlinedIcon sx={sideMenuStyles.buttonIcon(theme)} />
        <Typography sx={sideMenuStyles.buttonText(theme)}>Home</Typography>
      </Button>

      <Button
        sx={sideMenuStyles.navButton(theme)}
        onClick={() => handleNavigation("/favorites")}
      >
        <StarBorderPurple500OutlinedIcon
          sx={sideMenuStyles.buttonIcon(theme)}
        />
        <Typography sx={sideMenuStyles.buttonText(theme)}>Favorites</Typography>
      </Button>

      <Button
        sx={sideMenuStyles.navButton(theme)}
        onClick={() => handleNavigation("/my-posts")}
      >
        <CreateIcon sx={sideMenuStyles.buttonIcon(theme)} />
        <Typography sx={sideMenuStyles.buttonText(theme)}>My Posts</Typography>
      </Button>

      <Button
        sx={sideMenuStyles.navButton(theme)}
        onClick={handleDashboardClick}
      >
        <Assessment sx={sideMenuStyles.buttonIcon(theme)} />
        <Typography sx={sideMenuStyles.buttonText(theme)}>
          Admin Dashboard
        </Typography>
      </Button>

      <Container sx={sideMenuStyles.filler(theme)} />

      <Button
        sx={sideMenuStyles.navButton(theme)}
        onClick={() => handleNavigation("/suggestions")}
      >
        <MarkunreadOutlinedIcon sx={sideMenuStyles.buttonIcon(theme)} />
        <Typography sx={sideMenuStyles.buttonText(theme)}>
          Suggestions
        </Typography>
      </Button>
    </>
  );

  return (
    <>
      <Container
        sx={{
          ...sideMenuStyles.container(theme),
          display: { xs: "none", sm: "flex" },
        }}
      >
        {menuContent}
      </Container>

      <Drawer anchor="left" open={open} onClose={onClose}>
        <Box
          sx={{
            ...sideMenuStyles.container(theme),
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