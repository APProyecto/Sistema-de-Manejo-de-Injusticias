import { Container, Typography, Card, CardContent, Button, Box } from '@mui/material';
import {logout as logoutService} from '../../services/uesrService';
import { useAuth } from '../../context/authContext';

export default function Profile() {

  const handleLogout = async () => {
    await logoutService(); //llamada al servicio
    logout() //limpia el estado (isAthenticated = false)
  }

  const {user, logout} = useAuth();

  if (!user) return null;

  return (
    <Container sx={{backgroundColor: '#3f8818'}}>
      <Button
        onClick={handleLogout}
      >Logout
      </Button>
      <Typography>username: {user.nombreUsuario}</Typography>
      
    </Container>
  );
}