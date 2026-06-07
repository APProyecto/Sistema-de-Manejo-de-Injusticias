import { Container, Typography, Card, Grid, CardContent, Button, Box, useTheme, Avatar } from '@mui/material';
import { DashboardStyles } from '../styles/DashboardStyles';
import MetaLogo from '../../assets/MetaLogo.png'
import StarbucksLogo from '../../assets/StarbucksLogo.jpg'
import { useState } from 'react';

const companies = [
    {
        icon: StarbucksLogo,
        name: 'Starbucks',
        reports: 40,
        state: 'Pending'
    },
    {
        icon: MetaLogo,
        name: 'Meta',
        reports: 120,
        state: 'Checked'
    }
];

export default function Dashboard() {
  const [selectedCompany, setSelectedCompany] = useState('None');

  const theme = useTheme();

  return (
    <Container sx={(theme=>({backgroundColor: theme.palette.background.default,overflowY: 'auto'}))}>
      <Box sx={{margin:5}}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }} key='Dashboard-Top'>
            <Card sx={DashboardStyles.GridCard(theme)}>
              <Box sx={DashboardStyles.GridBox(theme)}>
                <Typography variant="h4" sx={DashboardStyles.TypographyTitle(theme)} gutterBottom>
                  Dashboard
                </Typography>
                <Typography variant="h4" gutterBottom>
                  300 {/* WIP usar numeros reales*/}
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} key='Dashboard-Top'>
            <Card sx={DashboardStyles.GridCard(theme)}>
              <Box sx={DashboardStyles.GridBox(theme)}>
                <Typography variant="h4" sx={DashboardStyles.TypographyTitle(theme)} gutterBottom>
                  Users
                </Typography>
                <Typography variant="h4" gutterBottom>
                  416 {/* WIP usar numeros reales*/}
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} key='Dashboard-Top'>
            <Card sx={DashboardStyles.GridCard(theme)}>
              <Box sx={DashboardStyles.GridBox(theme)}>
                <Typography variant="h4" sx={DashboardStyles.TypographyTitle(theme)} gutterBottom>
                  Reports
                </Typography>
                <Typography variant="h4" color="text.secondary" gutterBottom>
                  23 {/* WIP usar numeros reales*/}
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{background:theme.palette.grey[100], borderRadius:10,margin:5,px:5, py:3}}>
        <Typography variant='h5' sx={{color:theme.palette.primary.main,marginX:'Auto'}} gutterBottom>INMEDIATE ACTION ALERTS</Typography>
        {companies.map((company) => (
          <Box key={company.name} 
          onClick={()=>{setSelectedCompany(company.name);
            {/* WIP : Al dar click al archivo no pasa nada, los archivos aun no son reales */}
        }}>
            <Box sx={DashboardStyles.companiesBox(theme)}>
              <Box sx={DashboardStyles.companiesItemsBox()}>
                {/* WIP : Usar Fotos reales */}
                <Avatar
                  src={company.icon}
                      alt="Logo" 
                      style={{ width: 50, height: 50}}
                      sx={{ ml:4, mr:4, my: 'Auto'}}
                  />
                {/* WIP : Usar numeros reales */}
                <Typography variant='h6' sx={{my:'Auto',ml:2}}>{company.name}</Typography>
              </Box>
              <Box sx={DashboardStyles.companiesItemsBox()}>
                {/* WIP : Usar numeros reales */}
                <Typography variant='h6' sx={{textAlign:'center',my:'Auto',mx:'Auto'}}>{company.reports} Reports</Typography>
              </Box>
              <Box sx={DashboardStyles.companiesItemsBox()}>
                {/* WIP : Usar numeros reales */}
                <Typography variant='h6' sx={{my:'Auto',ml:'Auto',mr:5}}>{company.state}</Typography>
             </Box>
            </Box>
          </Box>
        ))}
      </Box>

    </Container>
  );
}