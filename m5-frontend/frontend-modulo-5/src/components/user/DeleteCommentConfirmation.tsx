import {
  useTheme,
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { commentDialogStyles } from "../styles/CommentDialogStyles";
import { deleteComment } from "../../services/commentsService";

interface DeleteCommentConfirmationProps {
  open: boolean;
  onClose: () => void;
  commentId: number;
  onDeleted?: () => void;
}

export default function DeleteCommentConfirmation({
  open,
  onClose,
  commentId,
  onDeleted,
}: DeleteCommentConfirmationProps) {
  const theme = useTheme();

  const handleDeleteComment = async () => {
    try {
      await deleteComment(commentId);
      onDeleted?.();
      onClose();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <Dialog
      sx={commentDialogStyles.dialog(theme)}
      open={open}
      onClose={onClose}
    >
      <DialogContent sx={commentDialogStyles.dialogContent(theme)}>
        <Typography variant="h2" sx={commentDialogStyles.title(theme)}>
          Delete Comment
        </Typography>

        <Typography variant="body1" sx={commentDialogStyles.body(theme)}>
          Are you sure you want to delete this comment?
        </Typography>

        <Box sx={commentDialogStyles.buttonContainer(theme)}>
          <Button
            sx={commentDialogStyles.cancelButton(theme)}
            onClick={onClose}
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
