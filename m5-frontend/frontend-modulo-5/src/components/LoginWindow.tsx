import {useTheme, Dialog, DialogContent, IconButton, Typography} from '@mui/material';
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

        <Typography variant="h5">Log In</Typography>
        

      </DialogContent>
    </Dialog>
    );
}