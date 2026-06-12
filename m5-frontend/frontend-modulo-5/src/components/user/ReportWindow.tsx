import {useTheme, Dialog, DialogContent, Typography, TextField, Button, Box, MenuItem, Select, FormControl, InputLabel} from '@mui/material';
import { commentDialogStyles } from '../styles/CommentDialogStyles';
import { useEffect, useState } from 'react';
import { createCommentReport, getReportMotives } from '../../services/commentsService';
import { useAuth } from '../../context/authContext';
import type { ReportMotive } from '../../types';

interface ReportWindowProps {
  open: boolean;
  onClose: () => void;
  commentId: Number;
}

export default function ReportWindow({ open, onClose, commentId }: ReportWindowProps) {

    const theme = useTheme();
    const { user } = useAuth();
    const reportedBy = user?.appUserId ?? (user as any)?.userId ?? (user as any)?.id;

    const [description, setDescription] = useState('');
    const [reason, setReason] = useState<number | ''>('');
    const [motives, setMotives] = useState<ReportMotive[]>([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!open) return;
        getReportMotives()
            .then(setMotives)
            .catch((error) => console.error('Error loading report motives:', error));
    }, [open]);

    const selectedMotiveName =
        motives.find((m) => m.MotiveReportID === reason)?.MotiveName ?? 'Comment report';

    const handleSendReport = async () => {
        if (!description.trim() || reason === '') return;

        if (!reportedBy) {
            alert('You must be logged in to report a comment.');
            return;
        }

        setSubmitting(true);
        try {
            await createCommentReport({
                UserDescription: description.trim(),
                MotiveReportID: Number(reason),
                ReportedBy: Number(reportedBy),
                CommentId: Number(commentId),
                Subject: selectedMotiveName,
            });
            alert('Report sent successfully.');
            setDescription('');
            setReason('');
            onClose();
        } catch (error) {
            console.error('Error sending report:', error);
            alert('Error sending the report. Please try again.');
        } finally {
            setSubmitting(false);
        }
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
                        value={reason === '' ? '' : String(reason)}
                        onChange={(e) => setReason(e.target.value ? Number(e.target.value) : '')}
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
                        {motives.map((motive) => (
                            <MenuItem key={motive.MotiveReportID} value={String(motive.MotiveReportID)}>
                                {motive.MotiveName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={commentDialogStyles.buttonContainer(theme)}>
                    <Button
                        sx={commentDialogStyles.sendButton(theme)}
                        onClick={handleSendReport}
                        variant="contained"
                        disabled={!description.trim() || !reason || submitting}
                    >
                        {submitting ? 'Sending...' : 'Send Report'}
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
