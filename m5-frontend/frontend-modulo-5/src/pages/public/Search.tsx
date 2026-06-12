import { Container, Box, useTheme } from '@mui/material';
import type { PostCardData } from '../../types';
import PostCard from '../../components/common/PostCard';
import { homeStyles } from '../styles/HomeStyles';
import { useEffect, useState } from 'react';
import { searchBoycotts } from '../../services/boycottService';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

export default function Search() {

  const theme = useTheme();
  const [posts, setPosts] = useState<PostCardData[]>([]);
  const { user, isLoading } = useAuth();
  const resolvedUserId = user?.appUserId ?? (user as any)?.userId ?? (user as any)?.id;

  const [searchParams] = useSearchParams();

  const q = searchParams.get('q');
  const filters = {
    countryId: searchParams.get('countryId') ? Number(searchParams.get('countryId')) : undefined,
    industryTypeId: searchParams.get('industryId') ? Number(searchParams.get('industryId')) : undefined,
    injusticeTypeId: searchParams.get('injusticeId') ? Number(searchParams.get('injusticeId')) : undefined,
    orderBy: searchParams.get('orderById') ? Number(searchParams.get('orderById')) : undefined,
  }

  useEffect(() => {
    if (isLoading) return;

    searchBoycotts(q || '', filters, resolvedUserId).then(setPosts);
  }, [q, searchParams, isLoading, resolvedUserId]);

  if(!posts) return (<Box>Searching...</Box>)

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