import { Container, Typography, Card, Grid, Box, useTheme, Avatar } from '@mui/material';
import { DashboardStyles } from '../styles/DashboardStyles';
import { useEffect, useState } from 'react';
import {
  getDashboardSummary,
  getImmediateActionAlerts,
  type ActionAlert,
} from '../../services/statisticsService';

export default function Dashboard() {
  const [activeBoycotts, setActiveBoycotts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [reportes, setresportes] = useState(0);
  const [companies, setCompanies] = useState<ActionAlert[]>([]);
  const theme = useTheme();

  useEffect(() => {
    getDashboardSummary()
      .then((summary) => {
        setActiveBoycotts(summary.activeBoycotts);
        setTotalUsers(summary.totalUsers);
        setresportes(summary.reportsToday);
      })
      .catch((error) => console.error('Error loading dashboard summary:', error));

    getImmediateActionAlerts()
      .then((data) => setCompanies(data.alerts))
      .catch((error) => console.error('Error loading action alerts:', error));
  }, []);

  return (
    <Container sx={(theme=>({backgroundColor: theme.palette.background.default,overflowY: 'auto'}))}>
      <Box sx={{margin:5}}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }} key='Dashboard-Boycotts'>
            <Card sx={DashboardStyles.GridCard(theme)}>
              <Box sx={DashboardStyles.GridBox(theme)}>
                <Typography variant="h4" sx={DashboardStyles.TypographyTitle(theme)} gutterBottom>
                  Active boycotts
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {activeBoycotts}
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} key='Dashboard-Users'>
            <Card sx={DashboardStyles.GridCard(theme)}>
              <Box sx={DashboardStyles.GridBox(theme)}>
                <Typography variant="h4" sx={DashboardStyles.TypographyTitle(theme)} gutterBottom>
                  Users
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {totalUsers}
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} key='Dashboard-Reports'>
            <Card sx={DashboardStyles.GridCard(theme)}>
              <Box sx={DashboardStyles.GridBox(theme)}>
                <Typography variant="h4" sx={DashboardStyles.TypographyTitle(theme)} gutterBottom>
                  Reports today
                </Typography>
                <Typography variant="h4" color="text.secondary" gutterBottom>
                  {reportes}
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{background:theme.palette.grey[100], borderRadius:10,margin:5,px:5, py:3}}>
        <Typography variant='h5' sx={{color:theme.palette.primary.main,marginX:'Auto'}} gutterBottom>INMEDIATE ACTION ALERTS</Typography>
        {companies.length === 0 && (
          <Typography variant='body1' sx={{ textAlign: 'center', mt: 2 }}>No active alerts.</Typography>
        )}
        {companies.map((company) => (
          <Box key={company.entityId}>
            <Box sx={DashboardStyles.companiesBox(theme)}>
              <Box sx={DashboardStyles.companiesItemsBox()}>
                <Avatar
                      alt={company.entityName}
                      style={{ width: 50, height: 50}}
                      sx={{ ml:4, mr:4, my: 'Auto'}}
                  >
                    {company.entityName.charAt(0)}
                  </Avatar>
                <Typography variant='h6' sx={{my:'Auto',ml:2}}>{company.entityName}</Typography>
              </Box>
              <Box sx={DashboardStyles.companiesItemsBox()}>
                <Typography variant='h6' sx={{textAlign:'center',my:'Auto',mx:'Auto'}}>{company.totalReports} Reports</Typography>
              </Box>
              <Box sx={DashboardStyles.companiesItemsBox()}>
                <Typography variant='h6' sx={{my:'Auto',ml:'Auto',mr:5}}>{company.pendingReports > 0 ? 'Pending' : 'Checked'}</Typography>
             </Box>
            </Box>
          </Box>
        ))}
      </Box>

    </Container>
  );
}