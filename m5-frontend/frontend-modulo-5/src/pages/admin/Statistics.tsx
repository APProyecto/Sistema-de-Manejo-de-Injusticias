import { Container, Typography, Card, CardContent, Button, Box, useTheme, Divider, Grid } from '@mui/material';
import { StatisticsStyles } from '../styles/StatisticsStyles';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export default function Statistics() {
  const theme = useTheme();

  {/* Colors */}
  const red = '#E74C3C';
  const blue = '#3498DB';
  const orange = '#E67E22';
  const green = '#1ABC9C';


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

  {/* c */}
  let IndustriesWithMoreBoycottsByRegion =[
    {region:'North America',Category:'Tech',value:56},
    {region:'North America',Category:'Fast Food',value:40},
    {region:'Europe',Category:'Motorsport',value:30},
    {region:'-',Category:'Clotches',value:17},
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

  {/* f */}
  let IndustiesWithMoreBoycotts =[
    {top:1,Industry:'Starbucks',value:256},
    {top:2,Industry:'Amazon',value:128},
    {top:3,Industry:'Mc Donalds',value:64},
    {top:4,Industry:'Nestle',value:32},
    {top:5,Industry:'Cocacola',value:16},
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
    {label:'False information',value:20},
    {label:'duplicate content',value:10},
    {label:'lack of evidence',value:40},
    {label:'inappropriate language',value:5},
    {label:'out of context',value:6},
    {label:'others',value:60}
  ];

  {/* j */}
  let BoycottsDistributionPerCountry =[
    {country:'China',value:20},
    {country:'India',value:10},
    {country:'Brazil',value:40},
    {country:'United Kingdom',value:5}
  ];

  {/* k */}
  let UsersWithMoreBoycottsPublished =[
    {top:1,user:'@activist_maria',value:87},
    {top:2,user:'@eco_warrior_23',value:76},
    {top:3,user:'@justice_now',value:65},
    {top:4,user:'@green_planet',value:58},
    {top:4,user:'@human_rights_defender',value:54},
  ];

  {/* l */}
  let TopBoycottsWithBestRating =[
    {boycott:'Starbucks and labor unions',indicted:'Starbucks',date:'2026-03-15',stars:4.8},
    {boycott:'Amazon practices in warehouses',indicted:'Amazon',date:'2026-02-28',stars:4.7},
    {boycott:'Nestlé and bottled water',indicted:'Nestlé',date:'2026-03-22',stars:4.6}
  ];

  {/* k */}
  let TopBoycottsWithWorstRating =[
    {boycott:'Rumors without evidence about TechCo',indicted:'TechCo',date:'2026-04-01',stars:1.2},
    {boycott:'Baseless accusation against LocalShop',indicted:'LocalShop',date:'2026-03-28',stars:1.5},
    {boycott:'Outdated information about FastFood',indicted:'Fast Food',date:'2026-03-20',stars:1.8}
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
                <Typography variant='h6' sx={StatisticsStyles.LabelGraphic(theme)}>b. Industries with most boycotts</Typography>
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

        {/* Graphic : c. Top Industries with more Boycotts by region */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={{...StatisticsStyles.LabelBox(theme),pl:2,mb:2}}>
                <Typography variant='h6' sx={StatisticsStyles.LabelGraphic(theme)}>c. Top industries with more boycotts by region</Typography>
              </Box>
              <Box sx={StatisticsStyles.ElementMapBox(theme)}>
                {IndustriesWithMoreBoycottsByRegion.map((Industy) => (
                  <Box>
                    <Box sx={{display:'flex'}}>
                      <Box>
                        <Box sx={{display:'flex'}}>
                          <Typography variant='body1'>{Industy.Category}</Typography>
                        </Box>
                        <Box sx={{display:'flex'}}>
                          <Typography variant='caption' sx={{color:theme.palette.grey[200]}}>{Industy.region}</Typography>
                        </Box>
                      </Box>

                      <Box sx={{my:'Auto',ml:'Auto',mr:0}}>
                        <Typography variant='h6' sx={{color:theme.palette.primary.main}}>{Industy.value}</Typography>
                      </Box>
                    </Box>
                    <Divider orientation='horizontal' sx={StatisticsStyles.Divider2(theme)}/>
                  </Box>
                ))}
              </Box>
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
                <Typography variant='h6' sx={StatisticsStyles.LabelGraphic(theme)}>e. Favorite campaigns by category</Typography>
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

        {/* Graphic : f. Top Companies with Most Boycotts */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={{...StatisticsStyles.LabelBox(theme),pl:2,mb:2}}>
                <Typography variant='h6' sx={StatisticsStyles.LabelGraphic(theme)}>f. Top companies with most boycotts</Typography>
              </Box>
              <Box sx={StatisticsStyles.ElementMapBox(theme)}>
                {IndustiesWithMoreBoycotts.map((Industy) => (
                  <Box>
                    <Box sx={{display:'flex'}}>

                      <Box sx={{display:'flex'}}>
                        <Typography variant='h6' sx={{color:theme.palette.primary.main}}>#{Industy.top}</Typography>
                        <Typography variant='body1' sx={{ml:1,my:'auto'}}>{Industy.Industry}</Typography>
                      </Box>

                      <Box sx={{my:'Auto',ml:'Auto',mr:0}}>
                        <Typography variant='h6' sx={{color:red}}>{Industy.value}</Typography>
                      </Box>
                    </Box>
                    <Divider orientation='horizontal' sx={StatisticsStyles.Divider2(theme)}/>
                  </Box>
                ))}
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Graphic : h. Top Reasons for Report Rejection */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={StatisticsStyles.LabelBox(theme)}>
                <Typography variant='h6' sx={StatisticsStyles.LabelGraphic(theme)}>h. Top reasons for report rejection</Typography>
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
                <Typography variant='h6' sx={StatisticsStyles.LabelGraphic(theme)}>i. Boycotts by injustice category</Typography>
              </Box>
              <PieChart
                series={[
                  {
                    data: BoycottsByInjusticeCategory,
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
                <Typography variant='body1' sx={StatisticsStyles.LabelGraphic(theme)}>j. Geographic distribution of boycotts by country</Typography>
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

        {/* Graphic : k. Top Users with Most Boycotts Published */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={{...StatisticsStyles.LabelBox(theme),pl:2,mb:2}}>
                <Typography variant='h6' sx={StatisticsStyles.LabelGraphic(theme)}>k. Top users with most boycotts published</Typography>
              </Box>
              <Box sx={StatisticsStyles.ElementMapBox(theme)}>
                {UsersWithMoreBoycottsPublished.map((User) => (
                  <Box>
                    <Box sx={{display:'flex'}}>

                      <Box sx={{display:'flex'}}>
                        <Typography variant='h6' sx={{color:theme.palette.primary.main}}>#{User.top}</Typography>
                        <Typography variant='body1' sx={{ml:1,my:'auto'}}>{User.user}</Typography>
                      </Box>

                      <Box sx={{my:'Auto',ml:'Auto',mr:0}}>
                        <Typography variant='h6' sx={{color:green}}>{User.value}</Typography>
                      </Box>
                    </Box>
                    <Divider orientation='horizontal' sx={StatisticsStyles.Divider2(theme)}/>
                  </Box>
                ))}
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Graphic : l. Top Boycotts with Best Rating */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={{...StatisticsStyles.LabelBox(theme),pl:2,mb:2}}>
                <Typography variant='h6' sx={StatisticsStyles.LabelGraphic(theme)}>l. Top boycotts with best rating</Typography>
              </Box>
              <Box sx={StatisticsStyles.ElementMapBox(theme)}>
                {TopBoycottsWithBestRating.map((Boycott) => (
                  <Box>
                    <Box sx={{display:'flex'}}>
                      <Box>
                        <Box sx={{display:'flex'}}>
                          <Typography variant='body2' sx={{ml:1,my:'auto',textAlign:'left'}}>{Boycott.boycott}</Typography>
                        </Box>
                        <Box sx={{display:'flex'}}>
                          <Typography variant='caption' sx={{ml:1,my:'auto',color:theme.palette.grey[200],textAlign:'left'}}>{Boycott.indicted}</Typography>
                        </Box>
                      </Box>

                      <Box sx={{my:'Auto',ml:'Auto',mr:0}}>
                        <Box sx={{display:'flex'}}>
                          <StarIcon sx={{fontSize:30 ,color:theme.palette.primary.main,ml:'Auto',mr:0}}/>
                          <Typography variant='body1' sx={{color:theme.palette.primary.main,mt:'Auto',textAlign:'right',mr:0}}>{Boycott.stars}</Typography>
                        </Box>
                        <Typography variant='body2' sx={{color:theme.palette.grey[200],mb:'Auto'}}>{Boycott.date}</Typography>
                      </Box>
                    </Box>
                    <Divider orientation='horizontal' sx={StatisticsStyles.Divider2(theme)}/>
                  </Box>
                ))}
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Graphic : m. Top Boycotts with worst Rating */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={StatisticsStyles.CardGraphic(theme)}>
            <Box sx={StatisticsStyles.BoxGraphic(theme)}>
              <Box sx={{...StatisticsStyles.LabelBox(theme),pl:2,mb:2}}>
                <Typography variant='h6' sx={StatisticsStyles.LabelGraphic(theme)}>m. Top boycotts with worst rating</Typography>
              </Box>
              <Box sx={StatisticsStyles.ElementMapBox(theme)}>
                {TopBoycottsWithWorstRating.map((Boycott) => (
                  <Box>
                    <Box sx={{display:'flex'}}>
                      <Box>
                        <Box sx={{display:'flex'}}>
                          <Typography variant='body2' sx={{ml:1,my:'auto',textAlign:'left'}}>{Boycott.boycott}</Typography>
                        </Box>
                        <Box sx={{display:'flex'}}>
                          <Typography variant='caption' sx={{ml:1,my:'auto',color:theme.palette.grey[200],textAlign:'left'}}>{Boycott.indicted}</Typography>
                        </Box>
                      </Box>

                      <Box sx={{my:'Auto',ml:'Auto',mr:0}}>
                        <Box sx={{display:'flex'}}>
                          <StarIcon sx={{fontSize:30 ,color:red,ml:'Auto',mr:0}}/>
                          <Typography variant='h6' sx={{color:red,mt:'Auto',textAlign:'right',mr:0}}>{Boycott.stars}</Typography>
                        </Box>
                        <Typography variant='body1' sx={{color:theme.palette.grey[200],mb:'Auto'}}>{Boycott.date}</Typography>
                      </Box>
                    </Box>
                    <Divider orientation='horizontal' sx={StatisticsStyles.Divider2(theme)}/>
                  </Box>
                ))}
              </Box>
            </Box>
          </Card>
        </Grid>

      </Grid>

    </Container>
  );
}