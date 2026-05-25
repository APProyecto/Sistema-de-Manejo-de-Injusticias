import {useTheme, Dialog, DialogContent, IconButton, Typography, Divider, TextField, Button} from '@mui/material';
import { loginWindowStyles } from './LoginWindowStyles';
import CloseIcon from '@mui/icons-material/Close';
import googleLogo from '../assets/google.svg';
import AuthLogo from '../assets/auth0.svg';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

interface LoginWindowProps {
  open: boolean;
  onClose: () => void;
}



export default function LoginWindow({ open, onClose }: LoginWindowProps) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const result = await fetch(`${import.meta.env.VITE_API_MODULE1}/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await result.json();
        console.log(data);
    };
/*
    const handleGoogleLogin = useGoogleLogin({
        
        onSuccess: async (response) => {
            console.log("Hola");
            const result = await fetch(`${import.meta.env.VITE_API_MODULE1}/api/users/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: response.access_token })
            });
            const data = await result.json();
            console.log(data);
        },
        onError: () => {
            console.log('Google login failed');
        }
    });
*/
    const theme = useTheme();
    return (
        <Dialog sx={loginWindowStyles.dialog(theme)} open={open} onClose={onClose} >
            <DialogContent sx={loginWindowStyles.dialogContent(theme)}>

                <IconButton onClick={onClose} sx={loginWindowStyles.closeButton(theme)}>
                <CloseIcon />
                </IconButton>

                <Typography variant='h2'>Log In</Typography>
                <Typography variant='body1' sx={loginWindowStyles.typography(theme)}>By continuing, you agree to our <Typography component='span' sx={loginWindowStyles.highlighted(theme)}>User Agreement</Typography> and acknowledge that you understand the Privacy Policy</Typography>
                <Button sx={loginWindowStyles.primaryButton(theme)}>
                    <img src={AuthLogo} width={30} height={30} />
                    <Typography sx={loginWindowStyles.textButton(theme)}>
                        Continue with Auth0
                    </Typography>
                </Button>
                <Button sx={loginWindowStyles.primaryButton(theme)}>
                    <img src={googleLogo} width={30} height={30} />
                    <Typography sx={loginWindowStyles.textButton(theme)}>
                        Continue with Google
                    </Typography>
                </Button>
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