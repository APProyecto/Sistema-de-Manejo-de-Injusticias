import {useTheme, Dialog, DialogContent, IconButton, Typography, Divider, TextField, Button} from '@mui/material';
import { loginWindowStyles } from './LoginWindowStyles';
import CloseIcon from '@mui/icons-material/Close';
import googleLogo from '../assets/google.svg';
import AuthLogo from '../assets/auth0.svg';

interface LoginWindowProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginWindow({ open, onClose }: LoginWindowProps) {
    const theme = useTheme();
    return (
        <Dialog open={open} onClose={onClose} >
            <DialogContent sx={loginWindowStyles.dialogContent(theme)}>

                <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
                <CloseIcon />
                </IconButton>

                <Typography variant='h2'>Log In</Typography>
                <Typography variant='body1'>By continuing, you agree to our <Typography sx={loginWindowStyles.highlighted(theme)}>User Agreement</Typography> and acknowledge that you understand the Privacy Policy</Typography>
                <Button startIcon={<img src={AuthLogo} width={30} height={30} />} sx={loginWindowStyles.primaryButton(theme)}>
                    Continue with Auth0
                </Button>
                <Button startIcon={<img src={googleLogo} width={30} height={30} />} sx={loginWindowStyles.primaryButton(theme)}>
                    Continue with Google
                </Button>
                <Divider sx={loginWindowStyles.divider(theme)}>
                    <Typography>OR</Typography>
                </Divider>
                <TextField sx={loginWindowStyles.textField(theme)} label="Email or username" variant="filled" size="small" />
                <TextField sx={loginWindowStyles.textField(theme)} label="Password" variant="filled" size="small" />
                <Typography variant='body1'>Forgot password?</Typography>
                <Typography>Don't have an account? Sign Up</Typography>
                <Button>
                    <Typography>Log In</Typography>
                </Button>
            </DialogContent>
        </Dialog>
    );
}