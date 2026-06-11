import { Container, Typography, Card, CardContent, Button, Box, useTheme, Divider, Grid } from '@mui/material';
import { StatisticsStyles } from '../styles/StatisticsStyles';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function Statistics() {
  const theme = useTheme();

  {/* Colors */}
  const red = '#E74C3C';
  const blue = '#3498DB';
  const orange = '#E67E22';


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

  {/* e */}
  let FavoritesByCategory =[
    {label:'support for wars',value:30},
    {label:'animal abuse',value:70},
    {label:'environmental damage',value:70},
    {label:'discrimination',value:70},
  ];

  {/* h */}
  let TopReasonsReportRejection =[
    {reason:'False information',value:20},
    {reason:'duplicate content',value:10},
    {reason:'lack of evidence',value:40},
    {reason:'inappropriate language',value:5},
    {reason:'out of context',value:6}
  ];

  {/* i */}
  let BoycottsByInjusticeCategory =[
    {category:'False information',value:20},
    {category:'duplicate content',value:10},
    {category:'lack of evidence',value:40},
    {category:'inappropriate language',value:5},
    {category:'out of context',value:6},
    {category:'others',value:60}
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
        {/* TOP DATA */}
        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={{display:'flex'}}>
              <Box sx={{...StatisticsStyles.BoxGraphic(theme)}}>
                <Box sx={{...StatisticsStyles.LabelBox(theme),pl:1}}>
                  <Typography variant='h6' sx={StatisticsStyles.TopLabel(theme)}>Total users</Typography>
                </Box>

                <Box sx={{...StatisticsStyles.LabelBox(theme),pl:1}}>
                  <Typography variant='h4' sx={StatisticsStyles.TopLabelNumber(theme)}>13.800</Typography>
                  {/* WIP : Usar numeros reales */}
                </Box>
              </Box>
              <PeopleAltIcon sx={{m:'Auto',fontSize:57, color:theme.palette.primary.main}}/>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={{display:'flex'}}>
              <Box sx={{...StatisticsStyles.BoxGraphic(theme)}}>
                <Box sx={{...StatisticsStyles.LabelBox(theme),pl:1}}>
                  <Typography variant='h6' sx={StatisticsStyles.TopLabel(theme)}>Total boycotts</Typography>
                </Box>

                <Box sx={{...StatisticsStyles.LabelBox(theme),pl:1}}>
                  <Typography variant='h4' sx={StatisticsStyles.TopLabelNumber(theme)}>1850</Typography>
                  {/* WIP : Usar numeros reales */}
                </Box>
              </Box>
              <TrendingUpIcon sx={{m:'Auto',fontSize:57, color: orange}}/>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{...StatisticsStyles.CardGraphic(theme)}}>
            <Box sx={{display:'flex',p:0}}>
              <Box sx={{...StatisticsStyles.BoxGraphic(theme)}}>
                <Box sx={{...StatisticsStyles.LabelBox(theme),pl:1}}>
                  <Typography variant='h6' sx={StatisticsStyles.TopLabel(theme)}>Pending reports</Typography>
                </Box>

                <Box sx={{...StatisticsStyles.LabelBox(theme),pl:1}}>
                  <Typography variant='h4' sx={StatisticsStyles.TopLabelNumber(theme)}>187</Typography>
                  {/* WIP : Usar numeros reales */}
                </Box>
              </Box>
              <ReportProblemIcon sx={{m:'Auto',fontSize:57, color:red}}/>
            </Box>
          </Card>
        </Grid>

        <Grid size={{ xs: 6, md: 3 }}>
          <Card sx={{...StatisticsStyles.CardGraphic(theme)}}>
            <Box sx={{display:'flex',p:0}}>
              <Box sx={{...StatisticsStyles.BoxGraphic(theme)}}>
                <Box sx={{...StatisticsStyles.LabelBox(theme),pl:1}}>
                  <Typography variant='h6' sx={StatisticsStyles.TopLabel(theme)}>Pending reports</Typography>
                </Box>

                <Box sx={{...StatisticsStyles.LabelBox(theme),pl:1}}>
                  <Typography variant='h4' sx={StatisticsStyles.TopLabelNumber(theme)}>187</Typography>
                  {/* WIP : Usar numeros reales */}
                </Box>
              </Box>
              <StarBorderIcon sx={{m:'Auto',fontSize:57, color:blue}}/>
            </Box>
          </Card>
        </Grid>

        {/* GRAPHICS */}

        {/* Graphic : a. User distribution by region */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox(theme)}>
                <Typography variant='h6' sx={StatisticsStyles.LabelGraphic(theme)}>a. User distribution by region</Typography>
              </Box>
              <BarChart
                dataset={UsersByRegions}
                xAxis={[{scaleType: 'band', dataKey: 'region'}]}
                series={[
                  { dataKey: 'value', color: theme.palette.primary.main }
                ]}
                height={300}
              />
            </Box>
          </Card>
        </Grid>

        {/* Graphic : b. Industries with most Boycotts */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox(theme)}>
                <Typography variant='h6' sx={StatisticsStyles.LabelGraphic(theme)}>b. Industries with most Boycotts</Typography>
              </Box>
              <BarChart
                dataset={IndustriesMoreBoycotts}
                layout='horizontal'
                xAxis={[{scaleType: 'linear'}]}
                yAxis={[{scaleType: 'band', dataKey: 'industry'}]}
                series={[
                  {dataKey:'value',color:orange}
                ]}
                height={300}
              />
            </Box>
          </Card>
        </Grid>


        {/* Graphic : d. Total favorites by countries */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox(theme)}>
                <Typography variant='h6' sx={StatisticsStyles.LabelGraphic(theme)}>d. Total favorites by countries</Typography>
              </Box>
              <BarChart
                dataset={FavoritesByCountry}
                xAxis={[{scaleType: 'band', dataKey: 'country'}]}
                
                series={[
                  {dataKey:'value',color:blue}
                ]}
                
                height={300}
              />
            </Box>
          </Card>
        </Grid>

        {/* Graphic : e. Favorite Campaigns by Category/Genre */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox(theme)}>
                <Typography variant='h6' sx={StatisticsStyles.LabelGraphic(theme)}>e. Favorite Campaigns by Category</Typography>
              </Box>
              <PieChart
                series={[
                  {
                    data: FavoritesByCategory,
                    outerRadius: 100,
                    arcLabel: (item) => `${item.label}`
                  },
                ]}
                sx={{
                  '& .MuiChartsTooltip-cell': {
                    color:theme.palette.background.default
                  },
                }}
                height={300}
              />
            </Box>
          </Card>
        </Grid>

        {/* Graphic : h. Top Reasons for Report Rejection */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox(theme)}>
                <Typography variant='h6' sx={StatisticsStyles.LabelGraphic(theme)}>h. Top Reasons for Report Rejection</Typography>
              </Box>
              <BarChart
                dataset={TopReasonsReportRejection}
                layout='horizontal'
                xAxis={[{scaleType: 'linear'}]}
                yAxis={[{scaleType: 'band', dataKey: 'reason'}]}
                series={[
                  {dataKey:'value',color:red}
                ]}
                height={300}
              />
            </Box>
          </Card>
        </Grid>

        {/*  Graphic : i. Boycotts by Injustice Category */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox(theme)}>
                <Typography variant='h6' sx={StatisticsStyles.LabelGraphic(theme)}>i. Boycotts by Injustice Category</Typography>
              </Box>
              <PieChart
                series={[
                  {
                    data: FavoritesByCategory,
                    outerRadius: 100,
                    arcLabel: (item) => `${item.label}`
                  },
                ]}
                sx={{
                  '& .MuiChartsTooltip-cell': {
                    color:theme.palette.background.default
                  },
                }}
                height={300}
              />
            </Box>
          </Card>
        </Grid>

        {/*  Graphic : j. Geographic Distribution of Boycotts by Country */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={{...StatisticsStyles.LabelBox(theme),pb:1.1}}>
                <Typography variant='body1' sx={StatisticsStyles.LabelGraphic(theme)}>j. Geographic Distribution of Boycotts by Country</Typography>
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