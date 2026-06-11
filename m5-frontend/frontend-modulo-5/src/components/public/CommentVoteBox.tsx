import { Container, ToggleButton, Typography, useTheme } from "@mui/material";
import { VotesBoxStyles } from "../styles/VotesBoxStyles";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface VotesBoxProps {
  votes: string | number;
  currentVote?: boolean | null;
  onVote?: (isInFavor: boolean) => void;
}

export default function CommentVotesBox({
  votes,
  currentVote = null,
  onVote,
}: VotesBoxProps) {
  const theme = useTheme();

  const handleVote = (newVote: boolean, event: React.MouseEvent) => {
    event.stopPropagation();
    onVote?.(newVote);
  };
  return (
    <Container sx={VotesBoxStyles.CommentVersionContainer(theme)}>
      <ToggleButton
        value="favor"
        selected={currentVote === true}
        onClick={(event) => handleVote(true, event)}
        sx={VotesBoxStyles.positiveVoteButton(theme)}
        disableRipple
        disableTouchRipple
      >
        <CheckCircleIcon sx={VotesBoxStyles.buttonIcon(theme)} />
      </ToggleButton>

      <Typography sx={VotesBoxStyles.votesText(theme)}>{votes}</Typography>

      <ToggleButton
        value="against"
        selected={currentVote === false}
        onClick={(event) => handleVote(false, event)}
        sx={VotesBoxStyles.negativeVoteButton(theme)}
        disableRipple
        disableTouchRipple
      >
        <CancelIcon sx={VotesBoxStyles.buttonIcon(theme)} />
      </ToggleButton>
    </Container>
  );
}
