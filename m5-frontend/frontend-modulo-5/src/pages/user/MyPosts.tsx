import { Container, Typography, Card, CardContent, Button, Box, useTheme } from '@mui/material';
import { homeStyles } from '../styles/HomeStyles';
import type { PostCardData } from '../../types';
import PostCard from '../../components/common/PostCard';
import OptionMenuMyPosts from '../../components/user/OptionMenuMyPosts';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { myPostsStyles } from '../styles/MyPostsStyles';
import { useEffect, useState} from "react";
import { useAuth } from "../../context/authContext";
import {
  getMyBoycotts
} from "../../services/boycottService";

export default function MyPosts() {

  const theme = useTheme();
  const { user, login } = useAuth();
  const [posts, setPosts] = useState<PostCardData[]>([]);

  useEffect(() => {
  const loadMyBoycotts = async () => {
    if (!user?.appUserId) return;

    const data = await getMyBoycotts(user.appUserId);
    setPosts(data);
  };

  loadMyBoycotts();
}, [user]);


  return (
    <Container sx={myPostsStyles.mainContainer(theme)}>
      <Container sx={myPostsStyles.topContainer(theme)}>
        <Typography variant='h2'>My Posts</Typography>
      </Container>
      <Container sx={myPostsStyles.container(theme)}>
        {posts.length === 0 && (
          <Typography>You have not created any boycotts yet.</Typography>
        )}
        
        {posts.map((data) => (
          
          <PostCard 
          key={data.id}
          data={data}
          inFeed={false}
          >
          </PostCard>
        )
      )}
      </Container>
    </Container>
  );
}