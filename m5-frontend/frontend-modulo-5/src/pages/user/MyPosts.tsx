import { Container, Typography, Card, CardContent, Button, Box, useTheme } from '@mui/material';
import { homeStyles } from '../public/HomeStyles';
import type { PostCardData } from '../../types';
import PostCard from '../../components/common/PostCard';
import OptionMenuMyPosts from '../../components/user/OptionMenuMyPosts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { myPostsStyles } from '../styles/MyPostsStyles';

export default function MyPosts() {

  const theme = useTheme();

  const onPostClick = (id: number) => {
    console.log('go to post view');
  }

  const onUsernameClick = (id: number) => {
    console.log("got to the user's page")
  }

  const onIndictedClick = (id:number) => {
    console.log("go to the indicted's page");
  }
  
  const onCaseClick = (id:number) => {
    console.log("go to the case's page");
  }

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
      is_favorite: false,
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

  return (
    <Container sx={myPostsStyles.mainContainer(theme)}>
      <Container sx={myPostsStyles.topContainer(theme)}>
        <Typography variant='h2'>My Posts</Typography>
      </Container>
      <Container sx={myPostsStyles.container(theme)}>
        {data.map((data) => (
          <PostCard 
          key={data.id}
          data={data}
          onCaseClick={onCaseClick}
          onPostClick={onPostClick}
          onIndictedClick={onIndictedClick}
          onUsernameClick={onUsernameClick}
          inFeed={false}
          >
          </PostCard>
        )
      )}
      </Container>
    </Container>
  );
}