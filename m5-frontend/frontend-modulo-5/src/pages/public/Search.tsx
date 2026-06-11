import { Container, Typography, Card, CardContent, Button, Box, useTheme } from '@mui/material';
import type { PostCardData } from '../../types';
import PostCard from '../../components/common/PostCard';
import { homeStyles } from '../styles/HomeStyles';
import { useEffect, useState } from 'react';
import { getBoycotts, searchBoycotts } from '../../services/boycottService';
import { useSearchParams } from 'react-router-dom';

export default function Search() {

  const theme = useTheme();
  const [posts, setPosts] = useState<PostCardData[]>([]);

  const [searchParams] = useSearchParams();

  const q = searchParams.get('q');
  const filters = {
    countryId: searchParams.get('country') ? Number(searchParams.get('country')) : undefined,
    industryTypeId: searchParams.get('industry') ? Number(searchParams.get('industry')) : undefined,
    injusticeTypeId: searchParams.get('injustice') ? Number(searchParams.get('injustice')) : undefined,
    orderBy: searchParams.get('orderBy') ?? undefined,
  }

  useEffect(() => {
    searchBoycotts(q || '', filters).then(setPosts);
  }, [q, searchParams]);

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