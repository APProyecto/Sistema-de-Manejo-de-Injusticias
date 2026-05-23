
import { Avatar, TextField, useTheme, IconButton } from '@mui/material';
import { Container, Typography, Card, CardContent, Button, Box, Grid, Divider } from '@mui/material';
import { sideMenuStyles } from '../components/SideMenuStyles';
import pfpSrc from '../assets/pfpDefaultImage.png';
import CreateIcon from '@mui/icons-material/Create';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  
  return (
    <Container sx={(theme=>({
      background: theme.palette.background.default,
      height:'100vh',
      width:'100vw'
    }))}>
      <Box sx={(theme)=>({
        background: theme.palette.background.default,
        height:'90%',
        width:'90%',
        display:'flex',
        pl:'5%',
        pr:'5%',
        pt:5,
      })}>

        <Divider orientation='vertical' flexItem sx={(theme)=>({
          background: theme.palette.secondary.main,
          mr:'auto',
          border:2,
          borderRadius:5
        })}/>

        <Box sx={(theme)=>({
          background: theme.palette.background.default,
          height:'100%',
          width:'90%',
        })}>
          <Box sx={{
            width:'100%',
            display:'flex'
          }}>
            <Button color="inherit" aria-label="like" sx={{
              borderRadius:5,
              mb:1,
              justifyContent:'flex-start'
            }}
            onClick={() => handleNavigation('/')}>
              <ArrowBackIcon/>
              <Typography variant='h3'>Register</Typography>
            </Button>
          </Box>

          <Card sx={(theme)=>({
            background:theme.palette.grey[100], 
            height: '30%',
            borderRadius:5
            })}>
            <CardContent sx={{
              height:'100%',
              width:'100%',
              p:0
            }}>
              <Box sx={{
                display:'flex',
                height:'100%',
                width:'100%',
                p:0,
                m:0
              }}>

                <Box sx={{
                  height:'100%',
                  width:'30%'
                  }}>
                  
                  
                  <Avatar
                    src={pfpSrc} 
                    alt="Logo" 
                    style={{ 
                        width:100,
                        height:100
                    }}
                    sx={{
                      ml:'auto',
                      mr:'auto',
                      mt:3,
                      mb:3
                    }}
                  />

                  <Button 
                    sx={sideMenuStyles.searchFileButton(theme)}
                    onClick={() => {
                      //WIP change PFP function
                    }}
                  >
                    <CreateIcon/>
                    <Typography sx={sideMenuStyles.buttonText(theme)}>Change profile picture</Typography>
                  </Button>
                </Box>
                
                <Divider orientation='vertical' flexItem sx={(theme)=>({
                  background: theme.palette.secondary.main,
                  mr:1,
                  ml:1,
                  border:0.5,
                })}/>
                
                <Box sx={{
                  height:'100%',
                  width:'65%',
                  alignContent:'center'
                  }}>
                  <TextField placeholder="Username" sx={{
                    background:theme.palette.background.default,
                    width:'95%',
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: theme.palette.background.default,
                      borderRadius: 5},
                    borderRadius:5,
                    }}/>
                </Box>
              </Box>

            </CardContent>
          </Card>

          <Grid container spacing={0}>

            <Grid size={{ xs: 12, md: 6 }} sx={{m:0}}>
              <Box sx={{
                height:'100%',
                width:'100%',
                p:1,
                mt:1,
                mb:1
              }}>
                <Typography variant='h3' align='left' sx={{ml:3,mt:0}}>
                  First name
                </Typography>
                <TextField placeholder="First name" sx={{
                  width:'95%',
                  color: theme.palette.background.default,
                  '& .MuiOutlinedInput-root': {
                    background: theme.palette.background.paper,
                    color: theme.palette.background.default,
                    borderRadius: 5},
                  borderRadius:5,
                  m:0
                  }}/>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{m:0}}>
              <Box sx={{
                height:'100%',
                width:'100%',
                p:1,
                mt:1,
                mb:1
              }}>
                <Typography variant='h3' align='left' sx={{ml:3,mt:0}}>
                  Last name
                </Typography>
                <TextField placeholder="Last name" sx={{
                  width:'95%',
                  color: theme.palette.background.default,
                  '& .MuiOutlinedInput-root': {
                    background: theme.palette.background.paper,
                    color: theme.palette.background.default,
                    borderRadius: 5},
                  borderRadius:5,
                  m:0
                  }}/>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{m:0}}>
              <Box sx={{
                height:'100%',
                width:'100%',
                p:1,
                mt:1,
                mb:1
              }}>
                <Typography variant='h3' align='left' sx={{ml:3,mt:0}}>
                  Country
                </Typography>
                <TextField placeholder="Country" sx={{
                  width:'95%',
                  color: theme.palette.background.default,
                  '& .MuiOutlinedInput-root': {
                    background: theme.palette.background.paper,
                    color: theme.palette.background.default,
                    borderRadius: 5},
                  borderRadius:5,
                  m:0
                  }}/>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{m:0}}>
              <Box sx={{
                height:'100%',
                width:'100%',
                p:1,
                mt:1,
                mb:1
              }}>
                <Typography variant='h3' align='left' sx={{ml:3,mt:0}}>
                  Gender
                </Typography>
                <TextField placeholder="Gender" sx={{
                  width:'95%',
                  color: theme.palette.background.default,
                  '& .MuiOutlinedInput-root': {
                    background: theme.palette.background.paper,
                    color: theme.palette.background.default,
                    borderRadius: 5},
                  borderRadius:5,
                  m:0
                  }}/>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{m:0}}>
              <Box sx={{
                height:'100%',
                width:'100%',
                p:1,
                mt:1,
                mb:1
              }}>
                <Typography variant='h3' align='left' sx={{ml:3,mt:0}}>
                  Email
                </Typography>
                <TextField placeholder="Email" sx={{
                  width:'95%',
                  color: theme.palette.background.default,
                  '& .MuiOutlinedInput-root': {
                    background: theme.palette.background.paper,
                    color: theme.palette.background.default,
                    borderRadius: 5},
                  borderRadius:5,
                  mb:7
                }}/>
                <Typography variant='h3' align='left' sx={{ml:3,mt:0}}>
                  Password
                </Typography>
                <TextField type='password' placeholder="Password" sx={{
                  width:'95%',
                  color: theme.palette.background.default,
                  '& .MuiOutlinedInput-root': {
                    background: theme.palette.background.paper,
                    color: theme.palette.background.default,
                    borderRadius: 5},
                  borderRadius:5,
                  m:0
                  }}/>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{m:0, width:'100%',p:0}}>
              <Box sx={{
                height:'100%',
                width:'100%',
                display:'flex',
                justifyContent:'space-between'
              }}>
                <Button sx={{
                  background:'#00740E',
                  height:'77%',
                  width:'45%',
                  mt:'8%',
                  mb:'5%',
                  borderRadius:5,
                  ml:3
                  }}>
                  {/*WIP cick save */}
                  <Typography variant='h2'>Save</Typography>
                </Button>

                <Button sx={{
                  background:'#740000',
                  height:'77%',
                  width:'45%',
                  mt:'8%',
                  mb:'5%',
                  borderRadius:5,
                  mr:1
                  }}>
                  {/*WIP cick cancel */}
                  <Typography variant='h2'>Cancel</Typography>
                </Button>

              </Box>
            </Grid>

          </Grid>

        </Box>
      
        <Divider orientation='vertical' flexItem sx={(theme)=>({
          background: theme.palette.secondary.main,
          ml:'auto',
          border:2,
          borderRadius:5,
        })}/>
      </Box>

    </Container>
  );
}