import { Container, Typography, useTheme } from '@mui/material';
import type { PostCardData } from '../../types';
import PostCard from '../../components/common/PostCard';
import { myPostsStyles } from '../styles/MyPostsStyles';
import { useEffect, useState } from 'react';
import { getFavorites } from '../../services/boycottService';
import { useAuth } from '../../context/authContext';

export default function Favorites() {

  const theme = useTheme();
  const { user } = useAuth();
  const resolvedUserId = user?.appUserId ?? (user as any)?.userId ?? (user as any)?.id;
  const [data, setData] = useState<PostCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        const userId = resolvedUserId;
        const favorites = await getFavorites(userId);
        setData(favorites);
      } catch (err) {
        console.error('Error cargando favoritos:', err);
        setError('No se pudieron cargar los favoritos.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [resolvedUserId]);

  return (
    <Container sx={myPostsStyles.mainContainer(theme)}>
      <Container sx={myPostsStyles.topContainer(theme)}>
        <Typography variant='h2'>Favorites</Typography>
      </Container>
      <Container sx={myPostsStyles.container(theme)}>
        {loading ? <Typography>Cargando favoritos...</Typography> : null}
        {error ? <Typography>{error}</Typography> : null}
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