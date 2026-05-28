
import { Avatar, TextField, useTheme} from '@mui/material';
import { Container, Typography, Card, CardContent, Button, Box, Grid, Divider } from '@mui/material';
import { sideMenuStyles } from '../components/SideMenuStyles';
import pfpSrc from '../assets/pfpDefaultImage.png';
import CreateIcon from '@mui/icons-material/Create';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import React,{ useState } from 'react';
import { RegisterStyles } from './RegisterStyles';

const Countries = [
    {
      name: 'Costa Rica',
    },
    {
      name: 'United States',
    },
    {
      name: 'China',
    },
  ];

const Genders = [
    {
      name: 'Female',
    },
    {
      name: 'Male',
    },
    {
      name: 'Other',
    },
  ];

export default function Register() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [txt,setTxt] = useState<string>('');
  const inputChangeHandler=(e:React.ChangeEvent<HTMLSelectElement>):void=>{
  setTxt(e.target.value)
  }

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Container sx={(theme=>({
      background: theme.palette.background.default,
      height:'110vh',
      width:'95vw'
    }))}>
      <Box sx={(theme)=>({
        background: theme.palette.background.default,
        height:'90%',
        width:'90%',
        display:'flex',
        pl:'5%',
        pr:'2%',
        pt:3,
        mt:0,
        mb:0
      })}>

        <Divider orientation='vertical' flexItem sx={RegisterStyles.DivisorContent(theme)}/>

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
                mb:0
              }}>
                <Typography variant='h3' align='left' sx={{ml:3,mt:0}}>
                  First name
                </Typography>
                <TextField placeholder="First name" sx={RegisterStyles.TextFieldContent2(theme)}/>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{m:0}}>
              <Box sx={{
                height:'100%',
                width:'100%',
                p:1,
                mt:1,
                mb:0
              }}>
                <Typography variant='h3' align='left' sx={{ml:3,mt:0}}>
                  Last name
                </Typography>
                <TextField placeholder="Last name" sx={RegisterStyles.TextFieldContent2(theme)}/>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{m:0}}>
              <Box sx={{
                height:'100%',
                width:'100%',
                p:1,
                mt:0,
                mb:1
              }}>
                <Typography variant='h3' align='left' sx={{ml:3,mt:0}}>
                  Country
                </Typography>
                <select onChange={inputChangeHandler} style={{
                  borderRadius:15,
                  width:"94%",
                  height:"45%",
                  backgroundColor:theme.palette.background.paper,
                  color:theme.palette.background.default,
                  fontSize:20,
                  marginLeft:5}}>
                  <option style={{color:"Gray"}}>Select a country</option>
                  {Countries.map((country) => (
                    <option style={{color:theme.palette.background.default}}>{country.name}</option>
                  ))}
                </select>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{m:0}}>
              <Box sx={{
                height:'100%',
                width:'100%',
                p:1,
                mt:0,
                mb:8
              }}>
                <Typography variant='h3' align='left' sx={{ml:3,mt:0}}>
                  Gender
                </Typography>
                <select onChange={inputChangeHandler} style={{
                  borderRadius:15,
                  width:"94%",
                  height:"45%",
                  backgroundColor:theme.palette.background.paper,
                  color:theme.palette.background.default,
                  fontSize:20,
                  marginLeft:5}}>
                  <option style={{color:"Gray"}}>Select your gender</option>
                  {Genders.map((gender) => (
                    <option style={{color:theme.palette.background.default}}>{gender.name}</option>
                  ))}
                </select>
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
                <TextField placeholder="Email" sx={RegisterStyles.TextFieldContent(theme)}/>
                <Typography variant='h3' align='left' sx={{ml:3,mt:0}}>
                  Password
                </Typography>
                <TextField type='password' placeholder="Password" sx={RegisterStyles.TextFieldContent(theme)}/>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{m:0, width:'100%',p:0}}>
              <Box sx={{
                height:'100%',
                width:'100%',
                display:'flex',
                justifyContent:'space-between'
              }}>
                <Button sx={{...RegisterStyles.ButtonContent(theme),background:'#00740E'}}>
                  {/*WIP cick save */}
                  <Typography variant='h2'>Save</Typography>
                </Button>

                <Button sx={{...RegisterStyles.ButtonContent(theme),background:'#740000'}}
                  onClick={() => handleNavigation('../')}>
                  
                  <Typography variant='h2'>Cancel</Typography>
                </Button>

              </Box>
            </Grid>
          </Grid>
        </Box>
        <Divider orientation='vertical' flexItem sx={RegisterStyles.DivisorContent(theme)}/>
      </Box>

    </Container>
  );
}