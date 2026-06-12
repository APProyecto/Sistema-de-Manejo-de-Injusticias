import { Container, Box, CircularProgress, useTheme } from '@mui/material';
import type { PostCardData } from '../../types';
import PostCard from '../../components/common/PostCard';
import { homeStyles } from '../styles/HomeStyles';
import { useEffect, useState, useRef, useCallback } from 'react';
import { getBoycotts } from '../../services/boycottService';
import { useAuth } from '../../context/authContext';
import LoadingScreen from '../../components/common/LoadingScreen';

export default function Home() {
  const theme = useTheme();
  const [posts, setPosts] = useState<PostCardData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const { user, isLoading } = useAuth();
  const resolvedUserId = user?.appUserId ?? (user as any)?.userId ?? (user as any)?.id;

  const observerRef = useRef<IntersectionObserver | null>(null);

  // Carga inicial
  useEffect(() => {
    if (isLoading) return;

    setLoading(true);
    setPosts([]);
    setPage(1);
    setHasMore(true);

    getBoycotts(undefined, resolvedUserId, 1)
      .then(({ data, total }) => {
        setPosts(data);
        setHasMore(data.length < total);
      })
      .catch((err) => console.error('Error cargando posts:', err))
      .finally(() => setLoading(false));

  }, [isLoading, resolvedUserId]);

  // Cargar página siguiente
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;

    const nextPage = page + 1;
    setLoadingMore(true);

    getBoycotts(undefined, resolvedUserId, nextPage)
      .then(({ data, total }) => {
        setPosts((prev) => {
          const updated = [...prev, ...data];
          setHasMore(updated.length < total);
          return updated;
        });
        setPage(nextPage);
      })
      .catch((err) => console.error('Error cargando más posts:', err))
      .finally(() => setLoadingMore(false));
  }, [page, hasMore, loadingMore, resolvedUserId]);

  // Callback ref — se conecta exactamente cuando el nodo entra al DOM
  const bottomRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) observerRef.current.disconnect();
    if (!node) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(node);
  }, [loadMore]);

  if (loading) return <LoadingScreen />;

  return (
    <Container sx={homeStyles.container(theme)}>
      {posts.map((post) => (
        <PostCard key={post.id} data={post} inFeed={true} />
      ))}

      <div ref={bottomRef} style={{ height: 1 }} />

      {loadingMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <CircularProgress size={28} />
        </Box>
      )}
    </Container>
  );
}