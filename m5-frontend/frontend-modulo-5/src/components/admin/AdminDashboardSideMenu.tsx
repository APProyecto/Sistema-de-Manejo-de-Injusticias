import { AppBar, Toolbar, Typography, Button, Box, Container, useTheme, TextField, InputAdornment } from '@mui/material';
import { sideMenuStyles } from '../styles/SideMenuStyles';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import CreateIcon from '@mui/icons-material/Create';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Assessment, Balance, PeopleAlt, QueryStats, QuestionAnswer, ReportProblem, Source, Category } from '@mui/icons-material';

interface AdminDahsboardSideMenu {
    onSwitchToNormalMode: () => void; 
    currentMode?: string;
}

export default function AdminDahsboardSideMenu({ onSwitchToNormalMode, currentMode }: AdminDahsboardSideMenu) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Container sx={sideMenuStyles.adminModeContainer(theme)}>

        {/* Home */}
        <Button 
            sx={sideMenuStyles.navButton(theme)}
            onClick={onSwitchToNormalMode}
        >
            <HomeOutlinedIcon sx={sideMenuStyles.buttonIcon(theme)}></HomeOutlinedIcon>
            <Typography sx={sideMenuStyles.buttonText(theme)}>Home</Typography>
        </Button>


        {/* Dashboard */}
        <Button 
            sx={sideMenuStyles.navButton(theme)}
            onClick={() => handleNavigation('admin/dashboard')}
        >
            <Assessment sx={sideMenuStyles.buttonIcon(theme)}></Assessment>
            <Typography sx={sideMenuStyles.buttonText(theme)}>Dashboard</Typography>
        </Button>


        {/* Manage Users */}
        <Button 
            sx={sideMenuStyles.navButton(theme)}
            onClick={() => handleNavigation('admin/manage-users')}
        >
            <PeopleAlt sx={sideMenuStyles.buttonIcon(theme)}></PeopleAlt>
            <Typography sx={sideMenuStyles.buttonText(theme)}>Manage Users</Typography>
        </Button>


        {/* Manage Reports */}
        <Button 
            sx={sideMenuStyles.navButton(theme)}
            onClick={() => handleNavigation('admin/manage-reports')}
        >
            <ReportProblem sx={sideMenuStyles.buttonIcon(theme)}></ReportProblem>
            <Typography sx={sideMenuStyles.buttonText(theme)}>Manage Reports</Typography>
        </Button>


        {/* Manage Comments */}
        <Button 
            sx={sideMenuStyles.navButton(theme)}
            onClick={() => handleNavigation('admin/manage-comments')}
        >
            <QuestionAnswer sx={sideMenuStyles.buttonIcon(theme)}></QuestionAnswer>
            <Typography sx={sideMenuStyles.buttonText(theme)}>Manage Comments</Typography>
        </Button>


        {/* Statistics */}
        <Button 
            sx={sideMenuStyles.navButton(theme)}
            onClick={() => handleNavigation('admin/statistics')}
        >
            <AreaChart sx={sideMenuStyles.buttonIcon(theme)}></AreaChart>
            <Typography sx={sideMenuStyles.buttonText(theme)}>Statistics</Typography>
        </Button>


        {/* Queries */}
        <Button 
            sx={sideMenuStyles.navButton(theme)}
            onClick={() => handleNavigation('admin/queries')}
        >
            <QueryStats sx={sideMenuStyles.buttonIcon(theme)}></QueryStats>
            <Typography sx={sideMenuStyles.buttonText(theme)}>Queries</Typography>
        </Button>


        {/* Cases of Injustice */}
        <Button 
            sx={sideMenuStyles.navButton(theme)}
            onClick={() => handleNavigation('admin/cases-of-injustice')}
        >
            <Balance sx={sideMenuStyles.buttonIcon(theme)}></Balance>
            <Typography sx={sideMenuStyles.buttonText(theme)}>Cases of Injustice</Typography>
        </Button>


        {/* Logs */}
        <Button 
            sx={sideMenuStyles.navButton(theme)}
            onClick={() => handleNavigation('admin/logs')}
        >
            <Source sx={sideMenuStyles.buttonIcon(theme)}></Source>
            <Typography sx={sideMenuStyles.buttonText(theme)}>Logs</Typography>
        </Button>

        {/* Catalogue */}
        <Button 
            sx={sideMenuStyles.navButton(theme)}
            onClick={() => handleNavigation('admin/catalogues')}
        >
            <Category sx={sideMenuStyles.buttonIcon(theme)}></Category>
            <Typography sx={sideMenuStyles.buttonText(theme)}>Catalogues</Typography>
        </Button>

    </Container>
  );
}