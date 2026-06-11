import { Container, Typography, Button, Box, useTheme, Divider, Avatar, Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import { QueriesStyles } from '../styles/QueriesStyles';
import StarbucksLogo from '../../assets/StarbucksLogo.jpg'
import { Categories } from '../../data/Categories';
import { EntityType } from '../../data/EntityType';
import QueryNavegation from './QueryNavigation';


interface followsQuery{
  ok:boolean;
  mostFollowed:[{
    entityname:string;
    entityPicture:Promise<Buffer<ArrayBufferLike> | null>;
    entityType:string;
    injusticeType:string;
    followers:number;
  }];
}
let Queries: followsQuery[] = [];/**[
    {
        indictedPFP: StarbucksLogo,
        indicted: 'Starbucks',
        EntityType:'Politics',
        injustice:'Health',
        amountFollowers:8
    }
  ];**/

export default function MostFollowedCases() {
  const theme = useTheme();
  const [followed, setFollowed] = useState<followsQuery[]|null>([]);
  const [Category, setCategory] = useState(0);
  const [caseSelected, setCase] = useState('None');
  const [EntityTypeSelected, setEntityTypeSelected] = useState(0);

  const getFollows = async () => {
    //const key = EntityTypeSelected as keyof typeof EntityType;
    const parameters = new URLSearchParams({
      indictedFilter: EntityType.find(item => item.id === EntityTypeSelected)?.name ?? 'Category',
      injusticeFilter: Categories.find(item => item.id === Category)?.name ?? 'Category'
    });
    try{
      const response = await fetch(`http://localhost:3004/api/tracking/getFollowers?${parameters.toString()}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setFollowed(data);
      } else {
        setFollowed([data]); 
      }
    }catch(error){
      console.error('Error fetching user history:', error);
    }
  }
  //getFollows();

  return (
    <Container sx={{p:5,backgroundColor:theme.palette.background.default}}>
      <QueryNavegation/>

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
            onChange={(etc) => {
              setEntityTypeSelected(etc.target.value);
              getFollows();
            }}
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
            onChange={(c) => {
              setCategory(c.target.value)
              getFollows();
            }}
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
      
      {followed?.map((Case) =>(
        Case.mostFollowed?.map((Query) =>(
          <Box key={Query.injusticeType} sx={{'&:hover':{background:theme.palette.grey[100]},display:'flex'}}
          onClick={()=>{setCase(Query.injusticeType);}}
          >
          <Box sx={{width:'25%',display:'flex',my:1}}>
            <Avatar
            src={StarbucksLogo}
                alt="Logo" 
                style={{ width: 30, height: 30}}
                sx={{ m:1, my: 'Auto'}}
            />
            <Typography variant='body2' sx={{my:'Auto'}}>{Query.entityname}</Typography>
          </Box>
          <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>
      
          <Box sx={{width:'25%',display:'flex',my:1}}>
            <Typography variant='body2' sx={{m:'Auto'}}>{Query.entityType}</Typography>
          </Box>
          <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>
      
          <Box sx={{width:'25%',display:'flex',my:1}}>
            <DescriptionIcon sx={{my:'Auto',ml:'Auto'}}/>
            <Typography variant='body2' sx={{my:'Auto',mr:'Auto'}}>{Query.injusticeType}</Typography>
          </Box>
          <Divider orientation='vertical' flexItem sx={QueriesStyles.Divider(theme)}/>
          
          <Box sx={{width:'25%',display:'flex',my:1}}>
            <Typography variant='body2' sx={{m:'Auto'}}>{Query.followers}</Typography>
          </Box>

        </Box>
        ))
      ))}

    </Container>
  );
}