import {
  Container,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { VotesBoxStyles } from "../styles/VotesBoxStyles";
import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface VotesBoxProps {
  votes: string;
  initialVote?: Boolean | null;
}

export default function VotesBox({ votes, initialVote = null }: VotesBoxProps) {
  const theme = useTheme();
  const [vote, setVote] = useState<Boolean | null>(initialVote);

  const handleVote = (newVote: Boolean, event: React.MouseEvent) => {
    event.stopPropagation();
    if (vote === newVote) {
      setVote(null);
    } else {
      setVote(newVote);
    }
  };

  return (
    <Container sx={VotesBoxStyles.container(theme)}>
      {/*Positive Vote*/}
      <ToggleButton
        value={"checked"}
        selected={vote === true}
        onChange={(event) => handleVote(true, event)}
        sx={VotesBoxStyles.positiveVoteButton(theme)}
        disableRipple
        disableTouchRipple
      >
        <CheckCircleIcon
          sx={VotesBoxStyles.buttonIcon(theme)}
        ></CheckCircleIcon>
      </ToggleButton>

      {/*Votes*/}
      <Typography sx={VotesBoxStyles.votesText(theme)}>{votes}</Typography>

      {/*Negative Vote*/}
      <ToggleButton
        value={"checked"}
        selected={vote === false}
        onChange={(event) => handleVote(false, event)}
        sx={VotesBoxStyles.negativeVoteButton(theme)}
        disableRipple
        disableTouchRipple
      >
        <CancelIcon sx={VotesBoxStyles.buttonIcon(theme)}></CancelIcon>


      </ToggleButton>
    </Container>
  );
}
