import {useTheme, Dialog, DialogContent, IconButton, Typography, TextField, Button, Box, MenuItem, Select, FormControl, InputLabel} from '@mui/material';
import { commentDialogStyles } from '../styles/CommentDialogStyles';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface ReportWindowProps {
  open: boolean;
  onClose: () => void;
  commentId: Number;
}

export default function DeleteCommentConfirmation({ open, onClose, commentId }: ReportWindowProps) {

    const theme = useTheme();
    const [description, setDescription] = useState('');
    const [reason, setReason] = useState('');


    const handleDeleteComment = () => {
        onClose();
    };

    const handleCancel = () => {
        setDescription('');
        setReason('');
        onClose();
    };

    return (
        <Dialog sx={commentDialogStyles.dialog(theme)} open={open} onClose={onClose}>
            <DialogContent sx={commentDialogStyles.dialogContent(theme)}>

                <Typography variant='h2' sx={commentDialogStyles.title(theme)}>Delete Comment</Typography>
                
                <Typography variant='body1' sx={commentDialogStyles.body(theme)}>Are you sure you want to delete this comment?</Typography>

                <Box sx={commentDialogStyles.buttonContainer(theme)}>
                    <Button 
                        sx={commentDialogStyles.cancelButton(theme)} 
                        onClick={handleCancel}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button 
                        sx={commentDialogStyles.deleteButton(theme)} 
                        onClick={handleDeleteComment}
                        variant="contained"
                    >
                        Delete
                    </Button>
                    

                </Box>
            </DialogContent>
        </Dialog>
    );
}