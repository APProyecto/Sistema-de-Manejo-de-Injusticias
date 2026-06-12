import { Container, Typography, Box, CircularProgress, useTheme } from '@mui/material';
import type { PostCardData } from '../../types';
import PostCard from '../../components/common/PostCard';
import { myPostsStyles } from '../styles/MyPostsStyles';
import { useEffect, useState, useRef, useCallback } from 'react';
import { getFavorites } from '../../services/boycottService';
import { useAuth } from '../../context/authContext';
import LoadingScreen from '../../components/common/LoadingScreen';

export default function Favorites() {
  const theme = useTheme();
  const { user } = useAuth();
  const resolvedUserId = user?.appUserId ?? (user as any)?.userId ?? (user as any)?.id;

  const [data, setData] = useState<PostCardData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Carga inicial
  useEffect(() => {
    setLoading(true);
    setData([]);
    setPage(1);
    setHasMore(true);
    setError(null);

    getFavorites(resolvedUserId, 1)
      .then(({ data, hasMore }) => {
        setData(data);
        setHasMore(hasMore);
      })
      .catch((err) => {
        console.error('Error cargando favoritos:', err);
        setError('No se pudieron cargar los favoritos.');
      })
      .finally(() => setLoading(false));

  }, [resolvedUserId]);

  // Cargar página siguiente
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;

    const nextPage = page + 1;
    setLoadingMore(true);

    getFavorites(resolvedUserId, nextPage)
      .then(({ data: newData, hasMore: more }) => {
        setData((prev) => [...prev, ...newData]);
        setPage(nextPage);
        setHasMore(more);
      })
      .catch((err) => console.error('Error cargando más favoritos:', err))
      .finally(() => setLoadingMore(false));
  }, [page, hasMore, loadingMore, resolvedUserId]);

  // IntersectionObserver
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 }
    );

    if (bottomRef.current) observerRef.current.observe(bottomRef.current);

    return () => observerRef.current?.disconnect();
  }, [loadMore]);

  if (loading) return <LoadingScreen />;

  return (
    <Container sx={myPostsStyles.mainContainer(theme)}>
      <Container sx={myPostsStyles.topContainer(theme)}>
        <Typography variant="h2">Favorites</Typography>
      </Container>
      <Container sx={myPostsStyles.container(theme)}>
        {error && <Typography>{error}</Typography>}

        {!error && data.length === 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Typography sx={{ color: 'text.secondary' }}>
              No favorites yet.
            </Typography>
          </Box>
        )}

        {data.map((item) => (
          <PostCard key={item.id} data={item} inFeed={true} />
        ))}

        <div ref={bottomRef} style={{ height: 1 }} />

        {loadingMore && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={28} />
          </Box>
        )}
      </Container>
    </Container>
  );
}