import { Container, Typography, Card, CardContent, Button, Box } from '@mui/material';
import { useParams } from 'react-router-dom';


export default function Evidences() {
    const { id } = useParams();
  return (
    <Container sx={{backgroundColor: '#125896'}}>
      <Typography>Evidences for post: {id}</Typography>
      
    </Container>
  );
}