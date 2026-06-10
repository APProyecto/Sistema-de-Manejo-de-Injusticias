import { Container, Typography, Card, CardContent, Button, Box, useTheme, Divider, Grid } from '@mui/material';
import { StatisticsStyles } from '../styles/StatisticsStyles';
import { BarChart } from '@mui/x-charts/BarChart';

export default function Statistics() {
  const theme = useTheme();

  let UsersByRegions =[
    {region:'Europa',value:20},
    {region:'America',value:10},
    {region:'Asia',value:30}
  ];

  return (
    <Container sx={{backgroundColor: theme.palette.background.default,p:10,overflowY:'auto'}}>

      <Box sx={{display:'flex',mb:5}}>
        <Divider orientation='vertical' flexItem sx={{...StatisticsStyles.Divider(theme)}}/>
        <Typography variant='h6' sx={{fontWeight:'bold',my:'Auto'}}>Statistics</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }} key='Dashboard-Top'>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.CardGraphic(theme)}>
              <BarChart
                dataset={UsersByRegions}
                xAxis={[{ scaleType: 'band', dataKey: 'region' }]}
                series={[
                  { dataKey: 'value', label: 'a. User distribution by region', color: theme.palette.primary.main }
                ]}
                height={300}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>

    </Container>
  );
}