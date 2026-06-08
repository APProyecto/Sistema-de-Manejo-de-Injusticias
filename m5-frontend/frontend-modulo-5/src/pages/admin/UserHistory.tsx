import { Container, Typography, Button, Box, useTheme, Divider, Avatar, Select, MenuItem, TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { UserHistoryStyles } from '../styles/UserHistoryStyles';
import { QueriesStyles } from '../styles/QueriesStyles';
import UserPFP from '../../assets/pfpDefaultImage.png';
import StarbucksLogo from '../../assets/StarbucksLogo.jpg'
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

const Categories = [
  {id:0,name:'Category'},
  {id:1,name:'Politics'},
  {id:2,name:'Health'},
  {id:3,name:'Labor practices'},
];

const Queries = [
    {
        authorPFP: UserPFP,
        author: 'User123',
        indictedPFP: StarbucksLogo,
        indicted: 'Starbucks',
        injustice:'Politics',
        files:5,
        date:'04-19-2026',
        country:'Global',
        votes:'21K'
    },
    {
        authorPFP: UserPFP,
        author: 'User123',
        indictedPFP: StarbucksLogo,
        indicted: 'Starbucks',
        injustice:'Health',
        files:5,
        date:'04-19-2026',
        country:'USA',
        votes:'25K'
    },
    {
        authorPFP: UserPFP,
        author: 'User123',
        indictedPFP: StarbucksLogo,
        indicted: 'Starbucks',
        injustice:'Labor practices',
        files:5,
        date:'04-19-2026',
        country:'France',
        votes:'5K'
    },
  ];

export default function UserHistory() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [Category, setCategory] = useState(0);
  const [reportSelected, setReport] = useState('None');

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Container sx={{p:5,backgroundColor:theme.palette.background.default}}>
      <Box sx={{alignItems:'center', display:'flex'}}>
        <Box sx={{width:'25%'}}>
          <Button sx={QueriesStyles.TopButton(theme)}>
            <Typography variant='body2' sx={{color:theme.palette.background.default}}>Reports</Typography>
          </Button>
          {/* This button dont do anything because we are actually in the report query page */}
        </Box>
        <Box sx={{width:'25%'}}>
          <Button sx={QueriesStyles.TopButton(theme)}>
          {/* WIP : Doesnt work, have to redirect to the company boycotts page */}
            <Typography variant='body2' sx={{color:theme.palette.background.default}}>Company Boycotts</Typography>
          </Button>
        </Box>
        <Box sx={{width:'25%'}}>
          <Button sx={QueriesStyles.TopButton(theme)}>
          {/* WIP : Doesnt work, have to redirect to the User History page */}
            <Typography variant='body2' sx={{color:theme.palette.background.default}}>User History</Typography>
          </Button>
        </Box>
        <Box sx={{width:'25%'}}>
          <Button sx={QueriesStyles.TopButton(theme)}>
          {/* WIP : Doesnt work, have to redirect to the Most Followed Cases page */}
            <Typography variant='body2' sx={{color:theme.palette.background.default}}>Most Followed Cases</Typography>
          </Button>
        </Box>
      </Box>
      
      <Box>
        <TextField
          placeholder="Search..."
          variant="outlined"
          size="medium"
          sx={UserHistoryStyles.searchField(theme)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={UserHistoryStyles.searchIcon(theme)} />
                </InputAdornment>
              ),
              endAdornment: (
                <Button>
                  <TuneIcon sx={UserHistoryStyles.filterButton(theme)} />
                </Button>
              ),
            },
          }}
        />
      </Box>
      {Queries.map((Query) =>(
        <Box key={Query.injustice} sx={{'&:hover':{background:theme.palette.grey[100]},display:'flex'}}
          onClick={()=>{setReport(Query.injustice);}}
          >
          {/* WIP : Al dar click al archivo no pasa nada, los archivos aun no son reales */}

          <Box sx={{width:'14%',display:'flex',my:1}}>
            <Avatar
            src={Query.authorPFP}
                alt="Logo" 
                style={{ width: 30, height: 30}}
                sx={{ m:1, my: 'Auto'}}
            />
            <Typography variant='body2' sx={{my:'Auto'}}>{Query.author}</Typography>
          </Box>
        </Box>
      ))}

    </Container>
  );
}