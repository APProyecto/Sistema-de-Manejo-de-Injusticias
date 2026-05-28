import { Container,TextField, Typography, Grid, Card, CardContent, Button, Box, useTheme } from '@mui/material';
import React,{ useState } from 'react';
import { CreateBoycottStyles } from './CreateBoycottStyles';
import { createBoycott } from '../services/boycottService';

const options = [
  "Company",
  "Organization",
  "Person",
  "Institution",
  "Government",
  "Other",
];

export default function CreateBoycott() {
  const theme = useTheme();
  const [txt,setTxt] = useState<string>('');
  const inputChangeHandler=(e:React.ChangeEvent<HTMLSelectElement>):void=>{
    setTxt(e.target.value)
  }
  const [selected, setSelected] = useState("Other");
    
  return (
    <Container sx={(theme=>({backgroundColor:theme.palette.background.default, pl:5,pt:2,pr:5,Height:'100vh', width:'100vw'}))}>
      <Box sx={{m:0,p:0,height:'100%',width:'100%'}}>
        <Typography variant='h6' align='left' sx={{mb:3}}>Create Boycott{'>'}<Typography component='span' variant='h6' sx={(theme=>({color:theme.palette.primary.main}))}>General</Typography></Typography>
        <Typography variant='h4' align='left' sx={{fontWeight:'bold'}}>General Information</Typography>
        <Typography variant='h6' align='left'>Complete the basic information about the boycott. Details of the complaint are added in the next step.</Typography>
        
        <Box sx={{mt:3}}>
          <Typography variant='h5' align='left'>TITLE</Typography>
          <TextField placeholder="Boycott name" sx={CreateBoycottStyles.TextFieldContent(theme)}/>
        </Box>

        <Box sx={{mt:3}}>
          <Typography variant='h5' align='left'>CATEGORY</Typography>
          <select onChange={inputChangeHandler} style={{
            borderRadius:15,
            width:"100%",
            height:55,
            backgroundColor:theme.palette.background.paper,
            color:theme.palette.background.default,
            fontSize:20,
            marginTop:10,
            marginLeft:0}}>
            <option style={{color:"Gray"}}>Select a Category</option>
            <option style={{color:theme.palette.background.default}}>Other</option>
            {/*WIP: Mapear las categorias */}
          </select>
        </Box>

        <Typography variant='h5' align='left' sx={{mt:3,mb:0}}>ENTITY</Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {xs:"1fr",md:"1fr 1fr 1fr"},
            mt:2,
            gap: 2
          }}
        >
          
          {options.map((option) => (
            <Button
              key={option}
              variant={selected === option ? "contained" : "text"}
              onClick={() => setSelected(option)}
              sx={{
                height: 70,
                borderRadius: 3,
                background:
                  selected === option ? CreateBoycottStyles.selectedButtonColor : CreateBoycottStyles.notSelectedButtonColor,
                color:
                  selected === option ? theme.palette.primary.main : theme.palette.grey[200],
              }}
            >
              {option}
            </Button>
          ))}
        </Box>

        <Button
          sx={(theme=>({
          width:'50%',
          mt:3,
          mb:3,
          background: theme.palette.primary.main,
          borderRadius:5
          }))}>
          <Typography variant='h5' sx={(theme=>({color:theme.palette.background.default}))}>Next step</Typography>
        </Button>
      </Box>
    </Container>
  );
}