import { Container, Typography, Card, Grid, CardContent, Box, useTheme, Avatar, TextField, Divider, Select, MenuItem } from '@mui/material';
import StarbucksLogo from '../../assets/StarbucksLogo.jpg'
import UserPFP from '../../assets/pfpDefaultImage.png';
import { useState } from 'react';
import QueryNavegation from './QueryNavigation';
import { QueriesStyles } from '../styles/QueriesStyles';
import PostInteracionButton from '../../components/common/PostInteractionButton';
import { Circle } from '@mui/icons-material';

export default function CompanyBoycotts() {
  const [indictedInput, setIndictedInput] = useState('');
  const [indicted, setIndicted] = useState('Starbucks');
  const [indictedPFP, setIndictedPFP] = useState(StarbucksLogo);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [stateFilterId, setStateFilterId] = useState(0);

  const handleStateColor = (state: string) => {
    if(state === 'Open'){
      return theme.palette.success.main;
    }else{
      return theme.palette.background.default;
    }
  }

  let Boycotts = [
    {
        authorPFP: UserPFP,
        authorName:'user123',
        date:'04-19-2026',
        name:'Starbucks Controversy',
        description:'There has been controversy surrounding Starbucks due to boycott calls linked to the Israel and Gaza conflict. Many consumers and activists have accused the company...',
        state:'Open'
    },
    {
        authorPFP: UserPFP,
        authorName:'user123',
        date:'04-19-2026',
        name:'Starbucks Controversy',
        description:'There has been controversy surrounding Starbucks due to boycott calls linked to the Israel and Gaza conflict. Many consumers and activists have accused the company...',
        state:'Open'
    },
    {
        authorPFP: UserPFP,
        authorName:'user123',
        date:'04-19-2026',
        name:'Starbucks Controversy',
        description:'There has been controversy surrounding Starbucks due to boycott calls linked to the Israel and Gaza conflict. Many consumers and activists have accused the company...',
        state:'Open'
    },
    {
        authorPFP: UserPFP,
        authorName:'user123',
        date:'04-19-2026',
        name:'Starbucks Controversy',
        description:'There has been controversy surrounding Starbucks due to boycott calls linked to the Israel and Gaza conflict. Many consumers and activists have accused the company...',
        state:'Open'
    },
    {
        authorPFP: UserPFP,
        authorName:'user123',
        date:'04-19-2026',
        name:'Starbucks supports Israel',
        description:'Im deeply troubled by reports suggesting Starbucks backing of Israel, especially given the ongoing genocide in Gaza. As patrons, our choices reflect our values, and its disheartening to see a company...',
        state:'Closed'
    }
  ]

  const theme = useTheme();

  return (
    <Container sx={(theme=>({backgroundColor: theme.palette.background.default,overflowY: 'auto'}))}>
      <Box sx={{margin:5}}>
        <QueryNavegation />
        <Box sx={{display: "flex", alignItems: "center", mt: 5, mb: 0 }}>
          <Box sx={{ width: "25%" }}>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.secondary.main }}
            >
              Indicted
            </Typography>
            <TextField
              size="small"
              placeholder="Search by indicted..."
              value={indictedInput}
              onChange={(e) => setIndictedInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter"){
                  // WIP : Search Indicted
                }
              }}
            />
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={QueriesStyles.Divider(theme)}
          />
          <Box sx={{ width: "50%",display:'flex',alignItems:'center'}}>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.secondary.main,ml:'Auto',mr:1 }}
            >
              Date
            </Typography>
            <TextField
              size="small"
              type="date"
              label="From"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
                {/* WIP : Onblur */}

            <TextField
              size="small"
              type="date"
              label="To"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{mr:'Auto'}}
            />
                {/* WIP : Onblur */}
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={QueriesStyles.Divider(theme)}
          />
          <Box sx={{ width: "25%" }}>
            <Typography
                variant="body2"
                sx={{ color: theme.palette.secondary.main }}
            >
                State
            </Typography>
            <Select
                size="small"
                hiddenLabel
                value={stateFilterId}
                onChange={(c) => {
                setStateFilterId(Number(c.target.value));
                }}
                disableUnderline
                variant="filled"
                MenuProps={{
                sx: {
                    "& .MuiMenuItem-root": {
                    color: "black !important",
                    },
                },
                }}
                sx={QueriesStyles.Select(theme)}
                >
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={1}>Open</MenuItem>
                    <MenuItem value={2}>Closed</MenuItem>
            </Select>
          </Box>
        </Box>
            
        <Divider orientation="horizontal" flexItem sx={QueriesStyles.Divider(theme)}/>

        <Box sx={{display:'flex'}}>
            <Box sx={{width:'25%',my:0,display:'flex'}}>
                <Avatar
                    src={indictedPFP}
                    alt="Logo"
                    style={{ width: 50, height: 50}}
                    sx={{ mx:1, my: 3}}
                />
                <Typography variant="h6" sx={{ color: theme.palette.secondary.main,my:4 }}>{indicted}</Typography>
            </Box>    
            <Divider orientation="vertical" flexItem sx={QueriesStyles.Divider(theme)}/>

            <Box sx={{ml:'Auto',mr:2, width:'75%',p:4}}>
            {Boycotts.map((Boycott)=>(
              <Box sx={{background:theme.palette.grey[100],my:2,p:2,borderRadius:5}}>
                <Box sx={{display:'flex'}}>
                  <Avatar
                    src={Boycott.authorPFP}
                    alt="Logo"
                    style={{ width: 50, height: 50}}
                    sx={{ mx:1, my: 'Auto'}}
                  />
                  <Typography variant='h6' sx={{my:'Auto'}}>{Boycott.authorName}</Typography>
                  <Typography variant='h5' sx={{fontWeight:'bold',mx:'Auto',my:'Auto'}}>{Boycott.name}</Typography>
                </Box>
                <Box sx={{display:'flex'}}>
                  <Box sx={{display:'flex',width:'25%'}}>
                    <Typography variant='body2' sx={{color:theme.palette.grey[200],fontWeight:'bold',mx:'Auto',textAlign:'left'}}>{Boycott.date}</Typography>
                  </Box>
                  <Box sx={{display:'flex',width:'75%',textAlign:'left'}}>
                    <Typography variant='body1' sx={{fontWeight:'bold',mx:'Auto'}}>{Boycott.description}</Typography>
                  </Box>
                </Box>
                <Box sx={{mr:'0',ml:'Auto',alignContent:'right',width:'20%'}}>
                  <PostInteracionButton
                    text={Boycott.state}
                    icon={Circle}
                    iconColor={handleStateColor(Boycott.state)}
                  />
                </Box>
              </Box>
            ))}
            </Box>
        </Box>
      </Box>

    </Container>
  );
}