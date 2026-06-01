import { Container, Typography, Card, CardContent, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function EditProfile() {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }
  return (
    <Container sx={{backgroundColor: '#ffee00'}}>
        <Button
            onClick={handleBack}
        >{'<'}</Button>
      <Typography>EditProfile</Typography>
      
      
    </Container>
  );
}