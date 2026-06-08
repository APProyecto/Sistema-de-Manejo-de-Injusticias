import { Container, Typography, Button, Box, useTheme, Divider, Avatar, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import { QueriesStyles } from '../styles/QueriesStyles';
import UserPFP from '../../assets/pfpDefaultImage.png';
import StarbucksLogo from '../../assets/StarbucksLogo.jpg'

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

export default function Quereis() {
  const theme = useTheme();
  const [Category, setCategory] = useState(0);
  

  return (
    <Container sx={{p:5,backgroundColor:theme.palette.background.default}}>
      <Box sx={{alignItems:'center', display:'flex'}}>
        <Box sx={{width:'25%'}}>
          <Button sx={QueriesStyles.TopButton(theme)}>
            <Typography variant='body2' sx={{color:theme.palette.background.default}}>Reports</Typography>
          </Button>
        </Box>
        <Box sx={{width:'25%'}}>
          <Button sx={QueriesStyles.TopButton(theme)}>
            <Typography variant='body2' sx={{color:theme.palette.background.default}}>Company Boycotts</Typography>
          </Button>
        </Box>
        <Box sx={{width:'25%'}}>
          <Button sx={QueriesStyles.TopButton(theme)}>
            <Typography variant='body2' sx={{color:theme.palette.background.default}}>User History</Typography>
          </Button>
        </Box>
        <Box sx={{width:'25%'}}>
          <Button sx={QueriesStyles.TopButton(theme)}>
            <Typography variant='body2' sx={{color:theme.palette.background.default}}>Most Followed Cases</Typography>
          </Button>
        </Box>
      </Box>

      <Box sx={{display:'flex', alignItems:'center', mt:5,mb:0}}>
        <Box sx={{width:'14%'}}>
          <Typography variant='body2' sx={{color:theme.palette.secondary.main}}>Author</Typography>
        </Box>
        <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>
        <Box sx={{width:'14%'}}>
          <Typography variant='body2' sx={{color:theme.palette.secondary.main}}>Indicted</Typography>
        </Box>
        <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>
        <Box sx={{width:'14%'}}>
          <Typography variant='body2' sx={{color:theme.palette.secondary.main}}>Injustice</Typography>
          <Select
            size='small'
            hiddenLabel
            value={Category}
            onChange={(c) => setCategory(Number(c.target.value))}
            disableUnderline
            variant="filled"
            MenuProps={{
                sx: {
                    '& .MuiMenuItem-root': {
                        color: 'black !important',
                    }
                }
            }}
            sx={{
          
                background: theme.palette.background.paper,
                color: 'black',
                borderRadius: 5,
                textAlign: 'center',
                '&:before': { borderBottom: 'none' },
                '&:after': { borderBottom: 'none' },
                '&.Mui-focused': { background: theme.palette.background.paper },
                '& .MuiSelect-select:hover': { background: theme.palette.background.paper,
                  borderRadius: 5,
                  },
                  '& .MuiFilledInput-root': {
                  transition: 'none',
                  },
                  height:30,
                  my:1
            }}
            >
                {Categories.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                        {c.name}
                    </MenuItem>
                ))}
            </Select>
        </Box>
        <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>
        <Box sx={{width:'14%'}}>
          <Typography variant='body2' sx={{color:theme.palette.secondary.main}}>Files</Typography>
        </Box>
        <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>
        <Box sx={{width:'14%'}}>
          <Typography variant='body2' sx={{color:theme.palette.secondary.main}}>Date</Typography>
        </Box>
        <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>
        <Box sx={{width:'14%'}}>
          <Typography variant='body2' sx={{color:theme.palette.secondary.main}}>Country</Typography>
        </Box>
        <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>
        <Box sx={{width:'14%'}}>
          <Typography variant='body2' sx={{color:theme.palette.secondary.main}}>Votes</Typography>
        </Box>
      </Box>
      <Divider orientation='horizontal' flexItem sx={{...QueriesStyles.Divider(theme),m:0}}/>
      
      {Queries.map((Query) =>(
        <Box key={Query.injustice} sx={{'&:hover':{background:theme.palette.grey[100]},display:'flex'}}

          >
          <Box sx={{width:'14%',display:'flex',my:1}}>
            <Avatar
            src={Query.authorPFP}
                alt="Logo" 
                style={{ width: 30, height: 30}}
                sx={{ m:1, my: 'Auto'}}
            />
            <Typography variant='body2' sx={{my:'Auto'}}>{Query.author}</Typography>
          </Box>
          <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>
      
          <Box sx={{width:'14%',display:'flex',my:1}}>
            <Avatar
            src={Query.indictedPFP}
                alt="Logo" 
                style={{ width: 30, height: 30}}
                sx={{ m:1, my: 'Auto'}}
            />
            <Typography variant='body2' sx={{my:'Auto'}}>{Query.indicted}</Typography>
          </Box>
          <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>
      
          <Box sx={{width:'14%',display:'flex',my:1}}>
            <Typography variant='body2' sx={{m:'Auto'}}>{Query.injustice}</Typography>
          </Box>
          <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>
      
          <Box sx={{width:'14%',display:'flex',my:1}}>
            <DescriptionIcon sx={{my:'Auto',ml:'Auto'}}/>
            <Typography variant='body2' sx={{my:'Auto',mr:'Auto'}}>{Query.files}</Typography>
          </Box>
          <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>
          
          <Box sx={{width:'14%',display:'flex',my:1}}>
            <Typography variant='body2' sx={{m:'Auto'}}>{Query.date}</Typography>
          </Box>
          <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>

          <Box sx={{width:'14%',display:'flex',my:1}}>
            <Typography variant='body2' sx={{m:'Auto'}}>{Query.country}</Typography>
          </Box>
          <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>

          <Box sx={{width:'14%',display:'flex',my:1}}>
            <Typography variant='body2' sx={{m:'Auto'}}>{Query.votes}</Typography>
          </Box>
        </Box>
      ))}

    </Container>
  );
}