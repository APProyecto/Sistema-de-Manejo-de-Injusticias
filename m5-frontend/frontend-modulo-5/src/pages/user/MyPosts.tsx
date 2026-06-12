import { Container, Typography, Box, CircularProgress, useTheme } from '@mui/material';
import type { PostCardData } from '../../types';
import PostCard from '../../components/common/PostCard';
import { myPostsStyles } from '../styles/MyPostsStyles';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useAuth } from '../../context/authContext';
import { getMyBoycotts } from '../../services/boycottService';
import LoadingScreen from '../../components/common/LoadingScreen';

export default function MyPosts() {
  const theme = useTheme();
  const { user } = useAuth();
  const resolvedUserId = user?.appUserId ?? (user as any)?.userId ?? (user as any)?.id;

  const [posts, setPosts] = useState<PostCardData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Carga inicial
  useEffect(() => {
    if (!resolvedUserId) {
      setPosts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setPosts([]);
    setPage(1);
    setHasMore(true);

    getMyBoycotts(resolvedUserId, 1)
      .then(({ data, hasMore }) => {
        setPosts(data);
        setHasMore(hasMore);
      })
      .catch((err) => {
        console.error('Error loading my posts:', err);
        setPosts([]);
      })
      .finally(() => setLoading(false));

  }, [resolvedUserId]);

  // Cargar página siguiente
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore || !resolvedUserId) return;

    const nextPage = page + 1;
    setLoadingMore(true);

    getMyBoycotts(resolvedUserId, nextPage)
      .then(({ data: newData, hasMore: more }) => {
        setPosts((prev) => [...prev, ...newData]);
        setPage(nextPage);
        setHasMore(more);
      })
      .catch((err) => console.error('Error loading more posts:', err))
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
        <Typography variant="h2">My Posts</Typography>
      </Container>
      <Container sx={myPostsStyles.container(theme)}>
        {posts.length === 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Typography sx={{ color: 'text.secondary' }}>
              You have not created any boycotts yet.
            </Typography>
          </Box>
        )}

        {posts.map((post) => (
          <PostCard key={post.id} data={post} inFeed={false} />
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