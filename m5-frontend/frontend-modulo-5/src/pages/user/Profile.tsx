import { Container, Typography, Card, CardContent, Button, Box, useTheme, Avatar } from '@mui/material';
import {logout as logoutService} from '../../services/uesrService';
import { useAuth } from '../../context/authContext';
import { profileStyles } from '../styles/ProfileStyles';
import EditIcon from '@mui/icons-material/Edit';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { PostCardData } from '../../types';
import PostCard from '../../components/common/PostCard';

export default function Profile() {

  let data: PostCardData[] = [
    {
      id: 1,
      username: 'myUsername',
      user_picture: 'https://res.cloudinary.com/dewscucnp/image/upload/v1778781104/cool-profile-picture-87h46gcobjl5e4xu_bifpln.jpg',
      indicted: 'Starbucksssssssssssssssssssssssssssssssssss',
      indicted_picture: 'https://res.cloudinary.com/dewscucnp/image/upload/v1778781215/images_11_objw2p.png',
      case: 'War in Gazaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      case_picture: 'https://res.cloudinary.com/dewscucnp/image/upload/v1778781294/round-palestinian-flag-of-palestine-vector_fvtvtg.jpg',
      title: 'starbucks supports the genocide in gaza',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus maximus ante vitae dignissim elementum. Fusce fermentum velit vitae nulla sodales scelerisque. Cras et dolor metus. Vestibulum vitae ex nec lacus cursus volutpat a at mi. Maecenas hendrerit sodales lectus vitae scelerisque. Vivamus vehicula risus in euismod eleifend. Nulla et sapien vel eros bibendum sagittis. Cras pretium neque in mauris fringilla, vitae facilisis mi ornare. Donec semper tempor arcu id dignissim. Etiam sed ligula eu nibh sollicitudin semper. Cras quis porttitor dui. Nullam consectetur velit sit amet arcu auctor, sit amet auctor mauris tempus. nisl volutpat ac. Suspendisse accumsan dictum arcu eget tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus maximus ante vitae dignissim elementum. Fusce fermentum velit vitae nulla sodales scelerisque. Cras et dolor metus. Vestibulum vitae ex nec lacus cursus volutpat a at mi. Maecenas hendrerit sodales lectus vitae scelerisque. Vivamus vehicula risus in euismod eleifend. Nulla et sapien vel eros bibendum sagittis. Cras pretium neque in mauris fringilla, vitae facilisis mi ornare. Donec semper tempor arcu id dignissim. Etiam sed ligula eu nibh sollicitudin semper. Cras quis porttitor dui. Nullam consectetur velit sit amet arcu auctor, sit amet auctor mauris tempus. nisl volutpat ac. Suspendisse accumsan dictum arcu eget tempo',
      creation_date: '7h ago',
      is_favorite: true,
      votes: '23k',
      voted_by_user: true,
      coments: '25k',
      evidences: '6',
      state: 'Active',
    },
    {
      id: 2,
      username: 'myUsername',
      user_picture: 'https://res.cloudinary.com/dewscucnp/image/upload/v1778781104/cool-profile-picture-87h46gcobjl5e4xu_bifpln.jpg',
      indicted: 'Alice',
      indicted_picture: 'https://collection.cloudinary.com/dewscucnp/e12ce56707ce38351028cd0d62474fb0',
      case: 'Exploitation',
      case_picture: 'https://res.cloudinary.com/dewscucnp/image/upload/v1778781294/round-palestinian-flag-of-palestine-vector_fvtvtg.jpg',
      title: 'Alice exploits their workersssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus maximus ante vitae dignissim elementum. Fusce fermentum velit vitae nulla sodales scelerisque. Cras et dolor metus. Vestibulum vitae ex nec lacus cursus volutpat a at mi. Maecenas hendrerit sodales lectus vitae scelerisque. Vivamus vehicula risus in euismod eleifend. Nulla et sapien vel eros bibendum sagittis. Cras pretium neque in mauris fringilla, vitae facilisis mi ornare. Donec semper tempor arcu id dignissim. Etiam sed ligula eu nibh sollicitudin semper. Cras quis porttitor dui. Nullam consectetur velit sit amet arcu auctor, sit amet auctor mauris tempus. nisl volutpat ac. Suspendisse accumsan dictum arcu eget tempor.',
      creation_date: '8 days ago',
      is_favorite: true,
      votes: '27M',
      voted_by_user: false,
      coments: '205k',
      evidences: '40',
      state: 'Closed',
    }
  ]

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutService(); //llamada al servicio
    logout() //isAthenticated = false
  }

  const handleEdit = () => {
    navigate('/edit-profile');
  }

  const {user, logout} = useAuth();
  const theme = useTheme()

  if (!user) return null;

  return (
    <Container sx={profileStyles.container(theme)}>
      <Container sx={profileStyles.actionsPannelContainer(theme)}>
        <Avatar 
          sx={profileStyles.profilePicture(theme)}
          src={user?.profilePicture}
        />
        <Typography 
          sx={profileStyles.username(theme)}
        >{user.username}
        </Typography>
        <Container sx={profileStyles.filler(theme)}></Container>

        {/*Edit Button*/}
        <Button 
          sx={profileStyles.editButton(theme)}
          onClick={handleEdit}
        >
          <EditIcon 
            className='edit-button-icon'
            sx={profileStyles.editButtonIcon(theme)}>
          </EditIcon>
          <Typography 
            className='edit-button-text'
            sx={profileStyles.editButtonText(theme)}
          >Edit User</Typography>
        </Button>

        {/*Logut Button*/}
        <Button 
          sx={profileStyles.logOutButton(theme)}
          onClick={handleLogout}
        >
          <Logout
            className='logout-button-icon' 
            sx={profileStyles.logOutButtonIcon(theme)}>
          </Logout>
          <Typography 
            className='logout-button-text'
            sx={profileStyles.logOutButtonText(theme)}
          >Log Out</Typography>
        </Button>

      </Container>
      <Typography
        sx={profileStyles.myVotesText(theme)}
      >My Votes</Typography>
      <Container sx={profileStyles.postsContainer(theme)}>
        {data.map((data) => (
          <PostCard 
          key={data.id}
          data={data}
          inFeed={true}
          >
          </PostCard>
        )
      )}
      </Container>
    </Container>
  );
}