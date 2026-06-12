import { Container, Typography, useTheme } from '@mui/material';
import type { PostCardData } from '../../types';
import PostCard from '../../components/common/PostCard';
import { myPostsStyles } from '../styles/MyPostsStyles';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import { getMyBoycotts } from '../../services/boycottService';
import LoadingScreen from '../../components/common/LoadingScreen';

export default function MyPosts() {

  const theme = useTheme();
  const { user } = useAuth();
  const resolvedUserId = user?.appUserId ?? (user as any)?.userId ?? (user as any)?.id;
  const [posts, setPosts] = useState<PostCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (!resolvedUserId) {
        setPosts([]);
        setLoading(false);
        return;
      }

      try {
        const result = await getMyBoycotts(resolvedUserId);
        setPosts(result);
      } catch (error) {
        console.error('Error loading my posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchMyPosts();
  }, [resolvedUserId]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container sx={myPostsStyles.mainContainer(theme)}>
      <Container sx={myPostsStyles.topContainer(theme)}>
        <Typography variant='h2'>My Posts</Typography>
      </Container>
      <Container sx={myPostsStyles.container(theme)}>
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