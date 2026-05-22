import { Pages } from '@mui/icons-material';
import { Container, Typography, Card, CardContent, Button, Box, Paper, Divider } from '@mui/material';
import { bgcolor, height, maxHeight, textAlign } from '@mui/system';


export default function Register() {
  return (
    <Container sx={(theme=>({
      background: theme.palette.background.default
    }))}>
      <Box sx={(theme)=>({
        background: theme.palette.background.default,
        height:'100%',
        width:'90%',
        display:'flex',
        pl:'5%',
        pr:'5%',
        pt:5,
      })}>


        <Divider orientation='vertical' flexItem sx={(theme)=>({
            background: theme.palette.secondary.main,
            mb:10,
            border:2,
            borderRadius:5
          })}/>

        <Box sx={(theme)=>({
          background: theme.palette.background.default,
          height:'100%',
          width:'75%',
          alignContent:'center'
        })}>

          <Typography align='center'>
            Hellowordl
          </Typography>

        </Box>
      
        <Divider orientation='vertical' flexItem sx={(theme)=>({
          background: theme.palette.secondary.main,
          ml:'auto',
          mb:10,
          border:2,
          borderRadius:5,
        })}/>
      </Box>

    </Container>
  );
}