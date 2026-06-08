import { Container, Typography, Button, Box, useTheme, Divider, Avatar, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import { QueriesStyles } from '../styles/QueriesStyles';
import StarbucksLogo from '../../assets/StarbucksLogo.jpg'
import { Categories } from '../../data/Categories';
import { EntityType } from '../../data/EntityType';

const Queries = [
    {
        indictedPFP: StarbucksLogo,
        indicted: 'Starbucks',
        EntityType:'Politics',
        injustice:'Health',
        amountFollowers:8
    }
  ];

export default function MostFollowedCases() {
  const theme = useTheme();
  const [Category, setCategory] = useState(0);
  const [caseSelected, setCase] = useState('None');
  const [EntityTypeSelected, setEntityTypeSelected] = useState(0);

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
        <Box sx={{width:'25%'}}>
          <Typography variant='body2' sx={{color:theme.palette.secondary.main}}>Indirected</Typography>
        </Box>
        <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>
        <Box sx={{width:'25%'}}>
          <Typography variant='body2' sx={{color:theme.palette.secondary.main}}>Type of entity</Typography>
          <Select
            size='small'
            hiddenLabel
            value={EntityTypeSelected}
            onChange={(etc) => setEntityTypeSelected(etc.target.value)}
            disableUnderline
            variant="filled"
            MenuProps={{
                sx: {
                    '& .MuiMenuItem-root': {
                        color: 'black !important',
                    }
                }
            }}
            sx={QueriesStyles.Select(theme)}
            >
                {EntityType.map((et) => (
                    <MenuItem key={et.id} value={et.id}>
                        {et.name}
                    </MenuItem>
                ))}
            </Select>
        </Box>
        <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>
        <Box sx={{width:'25%'}}>
          <Typography variant='body2' sx={{color:theme.palette.secondary.main}}>Injustice</Typography>
          <Select
            size='small'
            hiddenLabel
            value={Category}
            onChange={(c) => setCategory(c.target.value)}
            disableUnderline
            variant="filled"
            MenuProps={{
                sx: {
                    '& .MuiMenuItem-root': {
                        color: 'black !important',
                    }
                }
            }}
            sx={QueriesStyles.Select(theme)}
            >
                {Categories.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                        {c.name}
                    </MenuItem>
                ))}
            </Select>
        </Box>
        <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>
        <Box sx={{width:'25%'}}>
          <Typography variant='body2' sx={{color:theme.palette.secondary.main}}>Amount of followers</Typography>
        </Box>
      </Box>
      <Divider orientation='horizontal' flexItem sx={{...QueriesStyles.Divider(theme),m:0}}/>
      
      {Queries.map((Query) =>(
        <Box key={Query.injustice} sx={{'&:hover':{background:theme.palette.grey[100]},display:'flex'}}
          onClick={()=>{setCase(Query.injustice);}}
          >
          {/* WIP : Al dar click al archivo no pasa nada, los archivos aun no son reales */}

          <Box sx={{width:'25%',display:'flex',my:1}}>
            <Avatar
            src={Query.indictedPFP}
                alt="Logo" 
                style={{ width: 30, height: 30}}
                sx={{ m:1, my: 'Auto'}}
            />
            <Typography variant='body2' sx={{my:'Auto'}}>{Query.indicted}</Typography>
          </Box>
          <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>
      
          <Box sx={{width:'25%',display:'flex',my:1}}>
            <Typography variant='body2' sx={{m:'Auto'}}>{Query.EntityType}</Typography>
          </Box>
          <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>
      
          <Box sx={{width:'25%',display:'flex',my:1}}>
            <DescriptionIcon sx={{my:'Auto',ml:'Auto'}}/>
            <Typography variant='body2' sx={{my:'Auto',mr:'Auto'}}>{Query.injustice}</Typography>
          </Box>
          <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>
          
          <Box sx={{width:'25%',display:'flex',my:1}}>
            <Typography variant='body2' sx={{m:'Auto'}}>{Query.amountFollowers}</Typography>
          </Box>

        </Box>
      ))}

    </Container>
  );
}