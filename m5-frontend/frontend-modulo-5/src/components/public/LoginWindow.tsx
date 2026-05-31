import {useTheme, Dialog, DialogContent, IconButton, Typography, Divider, TextField, Button, Box} from '@mui/material';
import { loginWindowStyles } from '../styles/LoginWindowStyles';
import CloseIcon from '@mui/icons-material/Close';
import googleLogo from '../../assets/google.svg';
import AuthLogo from '../../assets/auth0.svg';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import {login as loginService} from '../../services/uesrService'

interface LoginWindowProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: (userData: any) => void;
}



export default function LoginWindow({ open, onClose, onLoginSuccess }: LoginWindowProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setError('');
        try {
            const response = await loginService(email, password);// llamada al servicio
            await login(response.data.token, response.data.user);// actualización del contexto
            if(onLoginSuccess){
                onLoginSuccess(response.data.user);
            }
            onClose();
        } catch (err: any) {
            setError(err.message);
        }


    /*
      try {
        const result = await fetch(`${import.meta.env.VITE_API_MODULE1}/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await result.json();
        
        if (result.ok) {
            // la función del contexto
            login(data.token, data.user);
            onClose();
        } else {
            setError(data.error || 'Login failed');
        }
        } catch (err) {
        setError('Network error. Please try again.');
        }
    */
    };

    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
        const result = await fetch(`${import.meta.env.VITE_API_MODULE1}/api/users/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: credentialResponse.credential }),
        });
        
        const data = await result.json();
        
        if (result.ok) {
            // con la función del contexto
            login(data.token, data.user);
            onClose();
        } else {
            setError(data.error || 'Google login failed');
        }
        } catch (err) {
        setError('Network error. Please try again.');
        }
    }

    const theme = useTheme();
    return (
        <Dialog sx={loginWindowStyles.dialog(theme)} open={open} onClose={onClose} >
            <DialogContent sx={loginWindowStyles.dialogContent(theme)}>

                <IconButton onClick={onClose} sx={loginWindowStyles.closeButton(theme)}>
                <CloseIcon />
                </IconButton>

                <Typography variant='h2'>Log In</Typography>
                <Typography variant='body1' sx={loginWindowStyles.typography(theme)}>By continuing, you agree to our <Typography component='span' sx={loginWindowStyles.highlighted(theme)}>User Agreement</Typography> and acknowledge that you understand the Privacy Policy</Typography>
                <Button sx={loginWindowStyles.auth0Button(theme)}
                    onClick={handleLogin}
                >
                    <img src={AuthLogo} width={30} height={30} />
                    <Typography sx={loginWindowStyles.textButton(theme)}>
                        Continue with Auth0
                    </Typography>
                </Button>
                
                <Box sx={{ position: 'relative', width: '81%' }}>
                
                <Box sx={{ 
                    opacity: 0, 
                    position: 'absolute', 
                    top: 0, 
                    left: 0,   
                    width: '100%', 
                    height: '100%', 
                    zIndex: 1 
                }}>
                    <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError('Google login failed')}
                    />
                </Box>
                
                <Button sx={loginWindowStyles.googleButton(theme)}>
                    <img src={googleLogo} width={30} height={30} />
                    <Typography sx={loginWindowStyles.textButton(theme)}>
                        Continue with Google
                    </Typography>
                </Button>
            </Box>
                <Divider sx={loginWindowStyles.divider(theme)}>
                    <Typography>OR</Typography>
                </Divider>
                <TextField sx={loginWindowStyles.textField(theme)} onChange={(e) => setEmail(e.target.value)} required label="Email or username" variant="filled" size="small" />
                <TextField sx={loginWindowStyles.textField(theme)} onChange={(e) => setPassword(e.target.value)} required label="Password" variant="filled" size="small" />
                <Typography sx={loginWindowStyles.typography(theme)} variant='body1'>Forgot password?</Typography>
                <Typography sx={loginWindowStyles.typography(theme)} variant='body1'>Don't have an account? Sign Up</Typography>
                <Button sx={loginWindowStyles.secundaryButton(theme)} onClick={handleLogin}>
                    Log In
                </Button>
            </DialogContent>
        </Dialog>
    );
}