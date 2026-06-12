import { Container, Typography, Button, Box, useTheme, Divider, Avatar, Select, MenuItem, TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { UserHistoryStyles } from '../styles/UserHistoryStyles';
import { QueriesStyles } from '../styles/QueriesStyles';
import UserPFP from '../../assets/pfpDefaultImage.png';
import StarbucksLogo from '../../assets/StarbucksLogo.jpg'
import MetaLogo from '../../assets/MetaLogo.png'
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { Circle} from '@mui/icons-material';
import PostInteracionButton from '../../components/common/PostInteractionButton';
import QueryNavegation from './QueryNavigation';
import { Edited, UnderReview } from '../styles/ButtonStyles';



interface userQuery {ok:boolean;
  username: string; 
  userPicture:string;
  posts:[{
    Title:string;
    State:string;
    Description:string;
  }];
  Comments:[{
    Title:string;
    User:string;
    Description:string;
  }];
  Follows:[{
    EntityName:string;
    EntityPicture:string;
  }]
}

export default function UserHistory() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [user, setUserS] = useState<userQuery[]|null>([]);

  const [userSearchBar, setUserSearchBar] = useState('');
  const [userSelected, setUser] = useState('None');
  const [postSelected, setPostSelected] = useState('None');
  const [commentSelected, setCommentSelected] = useState('None');
  const [entitySelected, setEntitySelected] = useState('None');


  const handleNavigation = (path: string) => {
    navigate(path);
  };
  const searchUser = async () => {

    const parameters = new URLSearchParams({
      userName: userSearchBar,
      CategoryFilter:'Category'
    });
    try{
      const response = await fetch(`http://localhost:3004/api/tracking/getUserHistory?${parameters.toString()}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setUserS(data);
      } else {
        setUserS([data]); 
      }
    }catch(error){
      console.error('Error fetching user history:', error);
    }
    
      /**.then(response => response.json())
      .then(data => Queries.push(data))//
      .catch(error => console.error('Error:', error));**/
    };

  const handleStateColor = (state: string) => {
    if(state === 'Active'){
      return theme.palette.success.main;
    }
    if(state === 'Under Review'){
      return UnderReview;
    }
    if(state === 'Edited'){
      return Edited;
    }
    return theme.palette.background.default;
    }

  return (
    <Container sx={{p:5,backgroundColor:theme.palette.background.default,overflowY: 'auto'}}>
      <QueryNavegation/>
      
      <Box>
        <TextField
          placeholder="Search User..."
          value={userSearchBar}
          onChange={(e) => setUserSearchBar(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchUser();
            }
          }}
          variant="outlined"
          size="medium"
          sx={UserHistoryStyles.searchField(theme)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={UserHistoryStyles.searchIcon(theme)} />
                </InputAdornment>
              )
            }
          }}
        />
      </Box>
      {user?.map((Query) =>(
        <Box key={Query.username} sx={{my:2,py:2,background:theme.palette.grey[100],borderRadius:10}}
          onClick={()=>{setUser(Query.username);}}
          >

          <Box sx={{display:'flex',mx:2}}>
            <Avatar
            src={Query.userPicture}
                alt="Logo"
                style={{ width: 50, height: 50}}
                sx={{ mx:1, my: 'Auto'}}
            />
            <Typography variant='h4' sx={{my:'Auto',fontWeight:'bold'}}>{Query.username}</Typography>
          </Box>

          <Box sx={{mx:2,my:2,pb:1, background:theme.palette.grey[200],borderRadius:5, overflowY:'auto',maxHeight:400}}>
            <Box sx={{display:'flex'}}>
              <Typography variant='h5' sx={UserHistoryStyles.subTitle(theme)}>User Posts</Typography>
            </Box>
            {Query.posts?.map((Post) =>(
              <Box key={Post.Title} sx={{...UserHistoryStyles.Box(theme),display:'flex'}}
              onClick={()=>{setPostSelected(Post.Title);}}>
              {/* WIP : Falta hacer que al clickear el post haga algo */}

                <Box>
                  <Box sx={{display:'flex',ml:2}}>
                    <Typography variant='h5' sx={UserHistoryStyles.subTextBold(theme)}>{Post.Title}</Typography>
                  </Box>
                  <Box sx={{display:'flex'}}>
                    <Typography variant='h6' sx={UserHistoryStyles.subText(theme)}>{Post.Description}</Typography>
                  </Box>
                </Box>
           
                <Box sx={{mr:2,ml:'Auto',alignContent:'center'}}>
                  <PostInteracionButton
                    text={Post.State}
                    icon={Circle}
                    iconColor={handleStateColor(Post.State)}
                  ></PostInteracionButton>
                </Box>
              </Box>
            ))
            }
          </Box>

          <Box sx={{mx:2,my:4,pb:1, background:theme.palette.grey[200],borderRadius:5, overflowY:'auto',maxHeight:400}}>
            <Box sx={{display:'flex'}}>
              <Typography variant='h5' sx={UserHistoryStyles.subTitle(theme)}>User Comments</Typography>
            </Box>
            {Query.Comments?.map((Comment, index) =>(
              <Box key={`${Comment.Title}-${index}`} sx={UserHistoryStyles.Box(theme)}
              onClick={()=>{setCommentSelected(Comment.Description);}}>
              {/* WIP : Falta hacer que al clickear el comentario haga algo */}
           
                <Box>
                  <Box sx={{display:'flex',ml:2}}>
                    <Typography variant='h5' sx={UserHistoryStyles.subTextBold(theme)}>{Comment.Title}</Typography>
                  </Box>
                  <Box sx={{display:'flex',ml:2}}>
                    <Typography variant='body1' sx={UserHistoryStyles.subTextBold(theme)}>From: {Comment.User}</Typography>
                  </Box>
                  <Box sx={{display:'flex'}}>
                    <Typography variant='h6' sx={UserHistoryStyles.subText(theme)}>{Comment.Description}</Typography>
                  </Box>

                </Box>
        
              </Box>
            ))
            }
          </Box>

          <Box sx={{mx:2,my:4,pb:1, background:theme.palette.grey[200],borderRadius:5, overflowY:'auto',maxHeight:400}}>
            <Box sx={{display:'flex'}}>
              <Typography variant='h5' sx={UserHistoryStyles.subTitle(theme)}>Followed Companies</Typography>
            </Box>
            <Box sx={{display:'flex',flexWrap:'wrap',px:3}}>
              {Query.Follows?.map((Entity) =>(
                <Box key={Entity.EntityName} sx={{...UserHistoryStyles.Box(theme),m:1}}
                onClick={()=>{setEntitySelected(Entity.EntityName);}}>
                {/* WIP : Falta hacer que al clickear la entidad haga algo */}
            
                  <Box sx={{display:'flex',mx:2}}>
                    <Avatar
                    src={Entity.EntityPicture}
                        alt="Logo"
                        style={{ width: 50, height: 50}}
                        sx={{ mx:1, my: 'Auto'}}
                    />
                    <Typography variant='h4' sx={{my:'Auto',fontWeight:'bold'}}>{Entity.EntityName}</Typography>
                  </Box>
          
                </Box>
              ))
              }
            </Box>
          </Box>

        </Box>
      ))}
      
    </Container>
  );
}