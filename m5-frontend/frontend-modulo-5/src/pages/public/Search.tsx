import { Container, Box, Typography, useTheme } from '@mui/material';
import type { PostCardData } from '../../types';
import PostCard from '../../components/common/PostCard';
import LoadingScreen from '../../components/common/LoadingScreen'; // ← ajusta el path
import { homeStyles } from '../styles/HomeStyles';
import { useEffect, useState } from 'react';
import { searchBoycotts } from '../../services/boycottService';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import NoResults from '../../components/common/NoResults';

export default function Search() {
  const theme = useTheme();
  const [posts, setPosts] = useState<PostCardData[]>([]);
  const [total, setTotal] = useState<number | null>(null); // null = todavía no hay respuesta
  const [searching, setSearching] = useState(false);

  const { user, isLoading } = useAuth();
  const resolvedUserId = user?.appUserId ?? (user as any)?.userId ?? (user as any)?.id;
  const [searchParams] = useSearchParams();

  const q = searchParams.get('q');
  const filters = {
    countryId:      searchParams.get('countryId')    ? Number(searchParams.get('countryId'))    : undefined,
    industryTypeId: searchParams.get('industryId')   ? Number(searchParams.get('industryId'))   : undefined,
    injusticeTypeId: searchParams.get('injusticeId') ? Number(searchParams.get('injusticeId'))  : undefined,
    orderBy:        searchParams.get('orderById')    ? Number(searchParams.get('orderById'))    : undefined,
  };

  useEffect(() => {
    if (isLoading) return;

    setSearching(true);
    setTotal(null);

    searchBoycotts(q || '', filters, resolvedUserId)
      .then(({ data, total }) => {
        setPosts(data);
        setTotal(total);
      })
      .finally(() => setSearching(false));

  }, [q, searchParams, isLoading, resolvedUserId]);

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
    </Container>
  );
}