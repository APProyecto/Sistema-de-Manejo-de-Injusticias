import {useTheme, Dialog, DialogContent, IconButton, Typography, Divider, TextField, Button} from '@mui/material';
import { loginWindowStyles } from './LoginWindowStyles';
import CloseIcon from '@mui/icons-material/Close';

interface LoginWindowProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginWindow({ open, onClose }: LoginWindowProps) {
    const theme = useTheme();
    return (
        <Dialog open={open} onClose={onClose} >
            <DialogContent sx={loginWindowStyles.DialogContent(theme)}>

                <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
                <CloseIcon />
                </IconButton>

                <Typography variant='h2'>Log In</Typography>
                <Typography variant='body1'>By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy</Typography>
                <Button>
                    <Typography>Continue with Auth0</Typography>
                </Button>
                <Button>
                    <Typography>Continue with Google</Typography>
                </Button>
                <Divider sx={loginWindowStyles.Divider(theme)}>
                    <Typography>OR</Typography>
                </Divider>
                <TextField label="Email or username" variant="outlined" size="small" />
                <TextField label="Password" variant="outlined" size="small" />
                <Typography variant='body1'>Forgot password?</Typography>
                <Typography>Don't have an account? Sign Up</Typography>
                <Button>
                    <Typography>Log In</Typography>
                </Button>
            </DialogContent>
        </Dialog>
    );
}