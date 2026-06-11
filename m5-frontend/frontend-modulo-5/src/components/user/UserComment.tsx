import {
  useTheme,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Divider,
  TextField,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import type { Comment } from "../../types";
import { commentStyles } from "../styles/CommentStyles";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CommentVotesBox from "../public/CommentVoteBox";
import { Delete, Error } from "@mui/icons-material";
import ReportWindow from "./ReportWindow";
import { useState } from "react";
import { voteComment, deleteCommentVote } from "../../services/commentsService";
import DeleteCommentConfirmation from "./DeleteCommentConfirmation";

interface UserCommentProps {
  comment: Comment;
  loggedInUserId?: Number;
}

export default function UserComment({
  comment: c,
  loggedInUserId: loggedInUserId,
}: UserCommentProps) {
  const theme = useTheme();
  const [reportCommentOpen, setReportCommentOpen] = useState(false);
  const [delelteCommentOpen, setDeleteCommentOpen] = useState(false);
  const [votes, setVotes] = useState<number>(Number(c.votes));
  const [currentVote, setCurrentVote] = useState<boolean | null>(
    c.voted_by_user ?? null,
  );

  const handleVote = async (isInFavor: boolean) => {
    if (loggedInUserId == null) return;

    const userId = Number(loggedInUserId);
    const previousVote = currentVote;
    const previousVotes = votes;

    let nextVote: boolean | null;

    if (currentVote === isInFavor) {
      nextVote = null;
    } else {
      nextVote = isInFavor;
    }

    setCurrentVote(nextVote);

    try {
      let updatedComment;

      if (currentVote === isInFavor) {
        updatedComment = await deleteCommentVote(userId, c.id);
      } else {
        updatedComment = await voteComment(userId, c.id, isInFavor);
      }

      setVotes(
        Number(updatedComment.VotesInFavor) -
          Number(updatedComment.VotesAgainst),
      );
    } catch (error) {
      console.error("Error voting comment:", error);

      setCurrentVote(previousVote);
      setVotes(previousVotes);
    }
  };
  return (
    <Box key={c.id} sx={commentStyles.commentCard(theme)}>
      <ReportWindow
        open={reportCommentOpen}
        onClose={() => setReportCommentOpen(false)}
        commentId={c.id}
      />
      <DeleteCommentConfirmation
        open={delelteCommentOpen}
        onClose={() => setDeleteCommentOpen(false)}
        commentId={c.id}
      />

      <Box sx={commentStyles.commentHeader(theme)}>
        <Avatar
          src={c.user.profilePicture}
          alt={c.user.username}
          sx={commentStyles.avatar(theme)}
        />
        <Typography sx={commentStyles.username(theme)}>
          {c.user.username}
        </Typography>
        <FiberManualRecordIcon sx={commentStyles.dotSeparator(theme)} />
        <Typography sx={commentStyles.dateText(theme)}>
          {new Date(c.creation_date).toLocaleDateString("es-CR")}
        </Typography>
        <Box sx={{ display: "flex", flex: 1 }}></Box>


        {loggedInUserId == c.user.id ?
          /* Botón de eliminar */
          <IconButton
            sx={commentStyles.replyButton(theme)}
            onClick={() => setDeleteCommentOpen(true)}
          >
            <Delete sx={commentStyles.errorIcon(theme)}></Delete>
          </IconButton>
          :
          /*Botón de reporte*/
          <IconButton
            sx={commentStyles.replyButton(theme)}
            onClick={() => setReportCommentOpen(true)}
          >
            <Error sx={commentStyles.errorIcon(theme)}></Error>
          </IconButton>
        }
      </Box>
      <Typography sx={commentStyles.text(theme)}>{c.content}</Typography>
      <Box sx={commentStyles.interactionBox(theme)}>
        <Box sx={{ display: "flex", flex: 1 }}></Box>
        <CommentVotesBox
          votes={votes}
          currentVote={currentVote}
          onVote={handleVote}
        />
      </Box>
    </Box>
  );
}
