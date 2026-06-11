import { Container, Typography, Card, CardContent, Button, Box, useTheme } from '@mui/material';
import type { PostCardData } from '../../types';
import PostCard from '../../components/common/PostCard';
import { homeStyles } from '../styles/HomeStyles';
import { useEffect, useState } from 'react';
import { getBoycotts } from '../../services/boycottService';

export default function Home() {

  const theme = useTheme();
  const [posts, setPosts] = useState<PostCardData[]>([]);

  useEffect(() => {
    getBoycotts().then(setPosts);
  }, []);

  return (
    <Container sx={homeStyles.container(theme)}>
      {posts.map((post) => (
        <PostCard 
          key={post.id}
          data={post}
          inFeed={true}
          >
        </PostCard>
      )
      )}
    </Container>
  );
}