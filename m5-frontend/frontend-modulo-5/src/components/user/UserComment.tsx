import {useTheme, Dialog, DialogContent, IconButton, Typography, Divider, TextField, Button, Box, Avatar} from '@mui/material';
import type { Comment } from '../../types';
import { commentStyles } from '../styles/CommentStyles';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import VotesBox from '../public/VotesBox';
import CommentVotesBox from '../public/CommentVoteBox';
import { Reply, Error } from '@mui/icons-material';

interface UserCommentProps {
  comment: Comment;
  loggedInUserId?: Number;
}

export default function UserComment({comment: c, loggedInUserId: loggedInUserId}:UserCommentProps) {
    const theme = useTheme();
    return (
        <Box key={c.id} sx={commentStyles.commentCard(theme)}>
            <Box sx={commentStyles.commentHeader(theme)}>
                <Avatar src={c.user.profilePicture} alt={c.user.username} sx={commentStyles.avatar(theme)} />
                <Typography sx={commentStyles.username(theme)}>{c.user.username}</Typography>
                <FiberManualRecordIcon sx={commentStyles.dotSeparator(theme)} />
                <Typography sx={commentStyles.dateText(theme)}>{new Date(c.creation_date).toLocaleDateString('es-CR')}</Typography>
                <Box sx={{display:'flex', flex: 1}}></Box>
                <IconButton sx={commentStyles.replyButton(theme)}>
                    <Error sx={commentStyles.errorIcon(theme)}></Error>
                </IconButton>
            </Box>
            <Typography sx={commentStyles.text(theme)}>{c.content}</Typography>
            <Box sx={commentStyles.interactionBox(theme)}>
                <Box sx={{display:'flex', flex: 1}}></Box>
                <IconButton sx={commentStyles.replyButton(theme)}>
                    <Reply sx={commentStyles.replyIcon(theme)}></Reply>
                </IconButton>
                <CommentVotesBox votes={c.votes} initialVote={c.voted_by_user}></CommentVotesBox>
            </Box>
        </Box>
    );
}