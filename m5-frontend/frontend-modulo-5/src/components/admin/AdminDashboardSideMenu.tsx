import {
  Typography,
  Button,
  Box,
  Container,
  useTheme,
  Drawer,
} from "@mui/material";

import { sideMenuStyles } from "../styles/SideMenuStyles";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Assessment,
  Balance,
  PeopleAlt,
  QueryStats,
  QuestionAnswer,
  ReportProblem,
  Source,
  Category,
} from "@mui/icons-material";

interface AdminDashboardSideMenuProps {
  onSwitchToNormalMode: () => void;
  currentMode?: string;
  open: boolean;
  onClose: () => void;
}

export default function AdminDahsboardSideMenu({
  onSwitchToNormalMode,
  currentMode,
  open,
  onClose,
}: AdminDashboardSideMenuProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleNormalMode = () => {
    onSwitchToNormalMode();
    
  };

  const menuContent = (
    <>
      <Button
        sx={sideMenuStyles.navButton(theme)}
        onClick={handleNormalMode}
      >
        <HomeOutlinedIcon sx={sideMenuStyles.buttonIcon(theme)} />
        <Typography sx={sideMenuStyles.buttonText(theme)}>Home</Typography>
      </Button>

      <Button
        sx={sideMenuStyles.navButton(theme)}
        onClick={() => handleNavigation("/admin/dashboard")}
      >
        <Assessment sx={sideMenuStyles.buttonIcon(theme)} />
        <Typography sx={sideMenuStyles.buttonText(theme)}>Dashboard</Typography>
      </Button>

      <Button
        sx={sideMenuStyles.navButton(theme)}
        onClick={() => handleNavigation("/admin/manage-users")}
      >
        <PeopleAlt sx={sideMenuStyles.buttonIcon(theme)} />
        <Typography sx={sideMenuStyles.buttonText(theme)}>
          Manage Users
        </Typography>
      </Button>

      <Button
        sx={sideMenuStyles.navButton(theme)}
        onClick={() => handleNavigation("/admin/manage-reports")}
      >
        <ReportProblem sx={sideMenuStyles.buttonIcon(theme)} />
        <Typography sx={sideMenuStyles.buttonText(theme)}>
          Manage Reports
        </Typography>
      </Button>

      <Button
        sx={sideMenuStyles.navButton(theme)}
        onClick={() => handleNavigation("/admin/manage-comments")}
      >
        <QuestionAnswer sx={sideMenuStyles.buttonIcon(theme)} />
        <Typography sx={sideMenuStyles.buttonText(theme)}>
          Manage Comments
        </Typography>
      </Button>

      <Button
        sx={sideMenuStyles.navButton(theme)}
        onClick={() => handleNavigation("/admin/statistics")}
      >
        <AreaChart sx={sideMenuStyles.buttonIcon(theme)} />
        <Typography sx={sideMenuStyles.buttonText(theme)}>Statistics</Typography>
      </Button>

      <Button
        sx={sideMenuStyles.navButton(theme)}
        onClick={() => handleNavigation("/admin/queries")}
      >
        <QueryStats sx={sideMenuStyles.buttonIcon(theme)} />
        <Typography sx={sideMenuStyles.buttonText(theme)}>Queries</Typography>
      </Button>

      <Button
        sx={sideMenuStyles.navButton(theme)}
        onClick={() => handleNavigation("/admin/cases-of-injustice")}
      >
        <Balance sx={sideMenuStyles.buttonIcon(theme)} />
        <Typography sx={sideMenuStyles.buttonText(theme)}>
          Cases of Injustice
        </Typography>
      </Button>

      <Button
        sx={sideMenuStyles.navButton(theme)}
        onClick={() => handleNavigation("/admin/logs")}
      >
        <Source sx={sideMenuStyles.buttonIcon(theme)} />
        <Typography sx={sideMenuStyles.buttonText(theme)}>Logs</Typography>
      </Button>

      <Button
        sx={sideMenuStyles.navButton(theme)}
        onClick={() => handleNavigation("/admin/catalogues")}
      >
        <Category sx={sideMenuStyles.buttonIcon(theme)} />
        <Typography sx={sideMenuStyles.buttonText(theme)}>Catalogues</Typography>
      </Button>
    </>
  );

  return (
    <>
      
      <Container
        sx={{
          ...sideMenuStyles.adminModeContainer(theme),
          display: { xs: "none", sm: "flex" },
        }}
      >
        {menuContent}
      </Container>

      
      <Drawer anchor="left" open={open} onClose={onClose}>
        <Box
          sx={{
            ...sideMenuStyles.adminModeContainer(theme),
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