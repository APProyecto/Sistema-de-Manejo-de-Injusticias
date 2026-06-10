import {useTheme, Dialog, DialogContent, IconButton, Typography, TextField, Button, Box, MenuItem, Select, FormControl, InputLabel} from '@mui/material';
import { reportWindowStyles } from '../styles/ReportWindowStyles';
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
        <Dialog sx={reportWindowStyles.dialog(theme)} open={open} onClose={onClose}>
            <DialogContent sx={reportWindowStyles.dialogContent(theme)}>

                <Typography variant='h2' sx={reportWindowStyles.title(theme)}>Report Comment</Typography>
                
                <Typography variant='body1' sx={reportWindowStyles.label(theme)}>Description</Typography>
                <TextField
                    multiline
                    rows={4}
                    placeholder="Please provide a detailed description of the issue..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={reportWindowStyles.textField(theme)}
                    variant="filled"
                />

                <Typography variant='body1' sx={reportWindowStyles.label(theme)}>Reason</Typography>
                <FormControl sx={reportWindowStyles.formControl(theme)}>
                    <InputLabel sx={{ color: theme.palette.grey[400] }}>Select a reason</InputLabel>
                    <Select
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        label="Select a reason"
                        sx={reportWindowStyles.select(theme)}
                        MenuProps={{
                            slotProps: {
                                paper:{
                                    sx: reportWindowStyles.menuPaper(theme)
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

                <Box sx={reportWindowStyles.buttonContainer(theme)}>
                    <Button 
                        sx={reportWindowStyles.sendButton(theme)} 
                        onClick={handleSendReport}
                        variant="contained"
                        disabled={!description.trim() || !reason}
                    >
                        Send Report
                    </Button>
                    
                    <Button 
                        sx={reportWindowStyles.cancelButton(theme)} 
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