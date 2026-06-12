import { Container, useTheme } from '@mui/material';
import type { PostCardData } from '../../types';
import PostCard from '../../components/common/PostCard';
import { homeStyles } from '../styles/HomeStyles';
import { useEffect, useState } from 'react';
import { getBoycotts } from '../../services/boycottService';
import { useAuth } from '../../context/authContext';
import LoadingScreen from '../../components/common/LoadingScreen';

export default function Home() {

  const theme = useTheme();
  const [posts, setPosts] = useState<PostCardData[]>([]);
  const { user, isLoading } = useAuth();
  const resolvedUserId = user?.appUserId ?? (user as any)?.userId ?? (user as any)?.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoycotts = async () => {
      setLoading(true);
      setError(null);
      try {
        const posts = await getBoycotts(undefined, resolvedUserId);
        setPosts(posts);
      } catch (err) {
        console.error('Error cargando posts:', err);
        setError('No se pudieron cargar los posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchBoycotts();
  }, [isLoading, resolvedUserId]);

  if(loading) return (<LoadingScreen/>);
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