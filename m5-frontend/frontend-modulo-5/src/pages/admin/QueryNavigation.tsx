import { Box, Button, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QueriesStyles } from "../styles/QueriesStyles";


export default function QueryNavegation() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [Category, setCategory] = useState(0);
  const [reportSelected, setReport] = useState('None');

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
      <Box sx={{alignItems:'center', display:'flex'}}>
        <Box sx={{width:'25%'}}>
          <Button sx={QueriesStyles.TopButton(theme)}
          onClick={() => handleNavigation('/admin/Queries')}>
            <Typography variant='body2' sx={{color:theme.palette.background.default}}>Reports</Typography>
          </Button>
          
        </Box>
        <Box sx={{width:'25%'}}>
          <Button sx={QueriesStyles.TopButton(theme)}
          onClick={() => handleNavigation('/admin/company-boycotts')}>
          {/* WIP : Doesnt work, have to redirect to the company boycotts page */}
            <Typography variant='body2' sx={{color:theme.palette.background.default}}>Company Boycotts</Typography>
          </Button>
        </Box>
        <Box sx={{width:'25%'}}>
          <Button sx={QueriesStyles.TopButton(theme)}
          onClick={() => handleNavigation('/admin/user-history')}>
            <Typography variant='body2' sx={{color:theme.palette.background.default}}>User History</Typography>
          </Button>
        </Box>
        <Box sx={{width:'25%'}}>
          <Button sx={QueriesStyles.TopButton(theme)}
          onClick={() => handleNavigation('/admin/most-followed-cases')}>
            <Typography variant='body2' sx={{color:theme.palette.background.default}}>Most Followed Cases</Typography>
          </Button>
        </Box>
      </Box>
  );
}