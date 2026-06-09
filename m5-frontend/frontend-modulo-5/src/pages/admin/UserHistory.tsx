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

const Queries = [
    {
        userPFP: UserPFP,
        user: 'User123',
        userPosts: [{title:'Starbucks Controversy',
          description:' There has been controversy surrounding Starbucks due to boycott calls linked to the Israel and Gaza conflict. Many consumers and activists have accused the company...',
          state:'Open'},
          {title:'Starbucks supports Israel',
            description:' Im deeply troubled by reports suggesting Starbucks backing of Israel, especially given the ongoing genocide in Gaza. As patrons, our choices reflect our values, and its disheartening to see a company...',
            state:'Closed'
          }],
        userComments: [
          {
            postTitle:'Starbucks supports Israel',
            postAuthor: 'User1234',
            comment:'Starbucks CEO and shareholders are not only evil for supporting genocide. They also fail to engage in sustainable or ethical practices, from Ethiopia to the Americas.'
          },
          {
            postTitle:'Starbucks Controversy',
            postAuthor: 'User1234',
            comment:'I want to see Starbucks go bankrupt and cease to exist! The brand deserves it.'
          }
        ],
        followedEntities:[
          {
            entityPFP:StarbucksLogo,
            entity: 'Starbucks'
          },
          {
            entityPFP:MetaLogo,
            entity: 'Meta'
          }
        ]
    },
  ];

export default function UserHistory() {
  const theme = useTheme();
  const navigate = useNavigate();

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

    await fetch(`http://localhost:3004/api/tracking/getUserHistory?${parameters.toString()}`)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  const handleStateColor = (state: string) => {
        if(state === 'Open'){
            return theme.palette.success.main;
        }else{
            return theme.palette.background.default;
        }
    }

  return (
    <Container sx={{p:5,backgroundColor:theme.palette.background.default,overflowY: 'auto'}}>
      <QueryNavegation/>
      
      <Box>
        <TextField
          placeholder="Search..."
          value={userSearchBar}
          onChange={(e) => setUserSearchBar(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              console.log(userSearchBar);
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
        <Box key={Query.user} sx={{my:2,py:2,background:theme.palette.grey[100],borderRadius:10}}
          onClick={()=>{setUser(Query.user);}}
          >

          <Box sx={{display:'flex',mx:2}}>
            <Avatar
            src={Query.userPFP}
                alt="Logo"
                style={{ width: 50, height: 50}}
                sx={{ mx:1, my: 'Auto'}}
            />
            <Typography variant='h4' sx={{my:'Auto',fontWeight:'bold'}}>{Query.user}</Typography>
          </Box>

          <Box sx={{mx:2,my:2,pb:1, background:theme.palette.grey[200],borderRadius:5}}>
            <Box sx={{display:'flex'}}>
              <Typography variant='h5' sx={UserHistoryStyles.subTitle(theme)}>User Posts</Typography>
            </Box>
            {Query.userPosts.map((Post) =>(
              <Box key={Post.title} sx={{...UserHistoryStyles.Box(theme),display:'flex'}}
              onClick={()=>{setPostSelected(Post.title);}}>
              {/* WIP : Falta hacer que al clickear el post haga algo */}

                <Box>
                  <Box sx={{display:'flex',ml:2}}>
                    <Typography variant='h5' sx={UserHistoryStyles.subTextBold(theme)}>{Post.title}</Typography>
                  </Box>
                  <Box sx={{display:'flex'}}>
                    <Typography variant='h6' sx={UserHistoryStyles.subText(theme)}>{Post.description}</Typography>
                  </Box>
                </Box>
           
                <Box sx={{mr:2,ml:'Auto',alignContent:'center'}}>
                  <PostInteracionButton
                    text={Post.state}
                    icon={Circle}
                    iconColor={handleStateColor(Post.state)}
                  ></PostInteracionButton>
                </Box>
              </Box>
            ))
            }
          </Box>

          <Box sx={{mx:2,my:4,pb:1, background:theme.palette.grey[200],borderRadius:5}}>
            <Box sx={{display:'flex'}}>
              <Typography variant='h5' sx={UserHistoryStyles.subTitle(theme)}>User Comments</Typography>
            </Box>
            {Query.userComments.map((Comment) =>(
              <Box key={Comment.postTitle} sx={UserHistoryStyles.Box(theme)}
              onClick={()=>{setCommentSelected(Comment.comment);}}>
              {/* WIP : Falta hacer que al clickear el comentario haga algo */}
           
                <Box>
                  <Box sx={{display:'flex',ml:2}}>
                    <Typography variant='h5' sx={UserHistoryStyles.subTextBold(theme)}>{Comment.postTitle}</Typography>
                  </Box>
                  <Box sx={{display:'flex',ml:2}}>
                    <Typography variant='body1' sx={UserHistoryStyles.subTextBold(theme)}>From: {Comment.postAuthor}</Typography>
                  </Box>
                  <Box sx={{display:'flex'}}>
                    <Typography variant='h6' sx={UserHistoryStyles.subText(theme)}>{Comment.comment}</Typography>
                  </Box>

                </Box>
        
              </Box>
            ))
            }
          </Box>

          <Box sx={{mx:2,my:4,pb:1, background:theme.palette.grey[200],borderRadius:5}}>
            <Box sx={{display:'flex'}}>
              <Typography variant='h5' sx={UserHistoryStyles.subTitle(theme)}>Followed Companies</Typography>
            </Box>
            <Box sx={{display:'flex',flexWrap:'wrap',px:3}}>
              {Query.followedEntities.map((Entity) =>(
                <Box key={Entity.entity} sx={{...UserHistoryStyles.Box(theme),m:1}}
                onClick={()=>{setEntitySelected(Entity.entity);}}>
                {/* WIP : Falta hacer que al clickear la entidad haga algo */}
            
                  <Box sx={{display:'flex',mx:2}}>
                    <Avatar
                    src={Entity.entityPFP}
                        alt="Logo"
                        style={{ width: 50, height: 50}}
                        sx={{ mx:1, my: 'Auto'}}
                    />
                    <Typography variant='h4' sx={{my:'Auto',fontWeight:'bold'}}>{Entity.entity}</Typography>
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