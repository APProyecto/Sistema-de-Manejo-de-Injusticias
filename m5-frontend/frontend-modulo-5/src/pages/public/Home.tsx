import { Container, useTheme } from '@mui/material';
import type { PostCardData } from '../../types';
import PostCard from '../../components/common/PostCard';
import { homeStyles } from '../styles/HomeStyles';
import { useEffect, useState } from 'react';
import { getBoycotts } from '../../services/boycottService';
import { useAuth } from '../../context/authContext';

export default function Home() {

  const theme = useTheme();
  const [posts, setPosts] = useState<PostCardData[]>([]);
  const { user, isLoading } = useAuth();
  const resolvedUserId = user?.appUserId ?? (user as any)?.userId ?? (user as any)?.id;

  useEffect(() => {
    if (isLoading) return;

    getBoycotts(undefined, resolvedUserId).then(setPosts);
  }, [isLoading, resolvedUserId]);

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