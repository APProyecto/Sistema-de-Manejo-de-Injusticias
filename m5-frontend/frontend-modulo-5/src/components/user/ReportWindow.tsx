import {useTheme, Dialog, DialogContent, IconButton, Typography, TextField, Button, Box, MenuItem, Select, FormControl, InputLabel} from '@mui/material';
import { commentDialogStyles } from '../styles/CommentDialogStyles';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface ReportWindowProps {
  open: boolean;
  onClose: () => void;
  commentId: Number;
}

export default function ReportWindow({ open, onClose, commentId }: ReportWindowProps) {

    const theme = useTheme();
    const [description, setDescription] = useState('');
    const [reason, setReason] = useState('');

    const reasons = [
        'Spam',
        'Harassment',
        'Inappropriate content',
        'Misinformation',
        'Copyright violation',
        'Others'
    ];

    const handleSendReport = () => {
        // Handle report submission logic here
        console.log('Report sent:', {
            commentId,
            description,
            reason,
            timestamp: new Date().toISOString()
        });
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

                <Typography variant='h2' sx={commentDialogStyles.title(theme)}>Report Comment</Typography>
                
                <Typography variant='body1' sx={commentDialogStyles.label(theme)}>Description</Typography>
                <TextField
                    multiline
                    rows={4}
                    placeholder="Please provide a detailed description of the issue..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={commentDialogStyles.textField(theme)}
                    variant="filled"
                />

                <Typography variant='body1' sx={commentDialogStyles.label(theme)}>Reason</Typography>
                <FormControl sx={commentDialogStyles.formControl(theme)}>
                    <InputLabel sx={{ color: theme.palette.grey[400] }}>Select a reason</InputLabel>
                    <Select
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        label="Select a reason"
                        sx={commentDialogStyles.select(theme)}
                        MenuProps={{
                            slotProps: {
                                paper:{
                                    sx: commentDialogStyles.menuPaper(theme)
                                }
                            }
                        }}
                    >
                        {reasons.map((reasonOption) => (
                            <MenuItem key={reasonOption} value={reasonOption}>
                                {reasonOption}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={commentDialogStyles.buttonContainer(theme)}>
                    <Button 
                        sx={commentDialogStyles.sendButton(theme)} 
                        onClick={handleSendReport}
                        variant="contained"
                        disabled={!description.trim() || !reason}
                    >
                        Send Report
                    </Button>
                    
                    <Button 
                        sx={commentDialogStyles.cancelButton(theme)} 
                        onClick={handleCancel}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}