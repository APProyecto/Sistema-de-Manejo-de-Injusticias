import { Container, Typography, Card, CardContent, Button, Box, useTheme, Divider, Grid } from '@mui/material';
import { StatisticsStyles } from '../styles/StatisticsStyles';
import { BarChart } from '@mui/x-charts/BarChart';

export default function Statistics() {
  const theme = useTheme();

  {/* a */}
  let UsersByRegions =[
    {region:'Europa',value:20},
    {region:'America',value:10},
    {region:'Asia',value:30}
  ];

  {/* b */}
  let IndustriesMoreBoycotts =[
    {industry:'Fast food',value:20},
    {industry:'Tech',value:10},
    {industry:'Clotches',value:30},
    {industry:'Energy',value:50},
    {industry:'Motorsport',value:5},
    {industry:'Pharmaceutical',value:10}
  ];

  {/* d */}
  let FavoritesByCountry =[
    {country:'EEUU',value:20},
    {country:'Germany',value:50},
    {country:'France',value:10},
    {country:'Spain',value:30},
    {country:'Mexico',value:25}
  ];

  {/* h */}
  let TopReasonsReportRejection =[
    {reason:'False information',value:20},
    {reason:'duplicate content',value:10},
    {reason:'lack of evidence',value:40},
    {reason:'inappropriate language',value:5},
    {reason:'out of context',value:6}
  ];


  {/* j */}
  let BoycottsDistributionPerCountry =[
    {country:'China',value:20},
    {country:'India',value:10},
    {country:'Brazil',value:40},
    {country:'United Kingdom',value:5}
  ];

  return (
    <Container sx={{backgroundColor: theme.palette.background.default,p:5,overflowY:'auto'}}>

      <Box sx={{display:'flex',mb:5}}>
        <Divider orientation='vertical' flexItem sx={{...StatisticsStyles.Divider(theme)}}/>
        <Typography variant='h6' sx={{fontWeight:'bold',my:'Auto'}}>Statistics</Typography>
      </Box>

      <Grid container spacing={3}>

        {/* Graphic : a. User distribution by region */}
        <Grid size={{ xs: 12, md: 6 }} key='Dashboard-Top'>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.CardGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox(theme)}>
                <Typography variant='h6' sx={StatisticsStyles.LabelGraphic(theme)}>a. User distribution by region</Typography>
              </Box>
              <BarChart
                dataset={UsersByRegions}
                xAxis={[{ scaleType: 'band', dataKey: 'region' }]}
                series={[
                  { dataKey: 'value', color: theme.palette.primary.main }
                ]}
                height={300}
              />
            </Box>
          </Card>
        </Grid>

        {/* Graphic : b. Industries with most Boycotts */}
        <Grid size={{ xs: 12, md: 6 }} key='Dashboard-Top'>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.CardGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox(theme)}>
                <Typography variant='h6' sx={StatisticsStyles.LabelGraphic(theme)}>b. Industries with most Boycotts</Typography>
              </Box>
              <BarChart
                dataset={IndustriesMoreBoycotts}
                layout='horizontal'
                xAxis={[{scaleType: 'linear'}]}
                yAxis={[{scaleType: 'band', dataKey: 'industry'}]}
                series={[
                  {dataKey:'value',color:"#E67E22"}
                ]}
                height={300}
              />
            </Box>
          </Card>
        </Grid>


        {/* Graphic : d. Total favorites by countries */}
        <Grid size={{ xs: 12, md: 6 }} key='Dashboard-Top'>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.CardGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox(theme)}>
                <Typography variant='h6' sx={StatisticsStyles.LabelGraphic(theme)}>d. Total favorites by countries</Typography>
              </Box>
              <BarChart
                dataset={FavoritesByCountry}
                xAxis={[{scaleType: 'band', dataKey: 'country'}]}
                series={[
                  {dataKey:'value',color:"#3498DB"}
                ]}
                height={300}
              />
            </Box>
          </Card>
        </Grid>


        {/* Graphic : h. Top Reasons for Report Rejection */}
        <Grid size={{ xs: 12, md: 6 }} key='Dashboard-Top'>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.CardGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox(theme)}>
                <Typography variant='h6' sx={StatisticsStyles.LabelGraphic(theme)}>h. Top Reasons for Report Rejection</Typography>
              </Box>
              <BarChart
                dataset={TopReasonsReportRejection}
                layout='horizontal'
                xAxis={[{scaleType: 'linear'}]}
                yAxis={[{scaleType: 'band', dataKey: 'reason'}]}
                series={[
                  {dataKey:'value',color:"#E74C3C"}
                ]}
                height={300}
              />
            </Box>
          </Card>
        </Grid>


        {/*  Graphic : j. Geographic Distribution of Boycotts by Country */}
        <Grid size={{ xs: 12, md: 6 }} key='Dashboard-Top'>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.CardGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox(theme)}>
                <Typography variant='h6' sx={StatisticsStyles.LabelGraphic(theme)}>j. Geographic Distribution of Boycotts by Country</Typography>
              </Box>
              <BarChart
                dataset={BoycottsDistributionPerCountry}
                xAxis={[{scaleType: 'band', dataKey: 'country'}]}
                series={[
                  {dataKey:'value',color:"#9B59B6"}
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