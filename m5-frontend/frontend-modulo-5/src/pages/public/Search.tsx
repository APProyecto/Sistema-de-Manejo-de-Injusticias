import { Container, Box, Typography, useTheme, CircularProgress } from '@mui/material';
import type { PostCardData } from '../../types';
import PostCard from '../../components/common/PostCard';
import LoadingScreen from '../../components/common/LoadingScreen';
import { homeStyles } from '../styles/HomeStyles';
import { useEffect, useState, useRef, useCallback } from 'react';
import { searchBoycotts } from '../../services/boycottService';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import NoResults from '../../components/common/NoResults';

export default function Search() {
  const theme = useTheme();
  const [posts, setPosts] = useState<PostCardData[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searching, setSearching] = useState(false);      // loading inicial
  const [loadingMore, setLoadingMore] = useState(false);  // loading de páginas extra

  const { user, isLoading } = useAuth();
  const resolvedUserId = user?.appUserId ?? (user as any)?.userId ?? (user as any)?.id;
  const [searchParams] = useSearchParams();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const q = searchParams.get('q');
  const filters = {
    countryId:       searchParams.get('countryId')   ? Number(searchParams.get('countryId'))   : undefined,
    industryTypeId:  searchParams.get('industryId')  ? Number(searchParams.get('industryId'))  : undefined,
    injusticeTypeId: searchParams.get('injusticeId') ? Number(searchParams.get('injusticeId')) : undefined,
    orderBy:         searchParams.get('orderById')   ? Number(searchParams.get('orderById'))   : undefined,
  };

  // Resetear cuando cambian los parámetros de búsqueda
  useEffect(() => {
    if (isLoading) return;

    setPosts([]);
    setPage(1);
    setHasMore(true);
    setTotal(null);
    setSearching(true);

    searchBoycotts(q || '', filters, resolvedUserId, 1)
      .then(({ data, total }) => {
        setPosts(data);
        setTotal(total);
        setHasMore(data.length < total);
      })
      .finally(() => setSearching(false));

  }, [q, searchParams, isLoading, resolvedUserId]);

  // Cargar página siguiente
  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;

    const nextPage = page + 1;
    setLoadingMore(true);

    searchBoycotts(q || '', filters, resolvedUserId, nextPage)
      .then(({ data, total }) => {
        setPosts(prev => [...prev, ...data]);
        setPage(nextPage);
        setHasMore(posts.length + data.length < total);
      })
      .finally(() => setLoadingMore(false));
  }, [page, hasMore, loadingMore, q, filters, resolvedUserId, posts.length]);

  // IntersectionObserver sobre el div del fondo
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

  if (searching || isLoading) return <LoadingScreen />;

  if (total === 0) {
    return (
      <NoResults/>
    );
  }

  return (
    <Container sx={homeStyles.container(theme)}>
      {posts.map((post) => (
        <PostCard key={post.id} data={post} inFeed={true} />
      ))}

      {/* Sentinel — cuando entra en viewport dispara loadMore */}
      <div ref={bottomRef} style={{ height: 1 }} />

      {loadingMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <CircularProgress size={28} />
        </Box>
      )}
    </Container>
  );
}