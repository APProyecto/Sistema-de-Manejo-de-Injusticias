import { Container, ToggleButton, Typography, useTheme } from "@mui/material";
import { VotesBoxStyles } from "../styles/VotesBoxStyles";
import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface VotesBoxProps {
  votes: string;
  initialVote?: boolean | null;
  onVoteChange?: (newVote: boolean | null) => Promise<void> | void;
}

export default function VotesBox({
  votes,
  initialVote = null,
  onVoteChange,
}: Readonly<VotesBoxProps>) {
  const theme = useTheme();
  const [vote, setVote] = useState<boolean | null>(initialVote);
  const [isSendingVote, setIsSendingVote] = useState(false);

  useEffect(() => {
    setVote(initialVote);
  }, [initialVote]);

  const handleVote = async (newVote: boolean, event: React.MouseEvent) => {
    event.stopPropagation();
    const updatedVote = vote === newVote ? null : newVote;
    const previousVote = vote;

    setVote(updatedVote);

    if (!onVoteChange) {
      return;
    }

    setIsSendingVote(true);
    try {
      await onVoteChange(updatedVote);
    } catch (error) {
      console.error("Error al registrar el voto:", error);
      setVote(previousVote);
    } finally {
      setIsSendingVote(false);
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
        disabled={isSendingVote}
      >
        <CheckCircleIcon sx={VotesBoxStyles.buttonIcon(theme)}></CheckCircleIcon>
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
        disabled={isSendingVote}
      >
        <CancelIcon sx={VotesBoxStyles.buttonIcon(theme)}></CancelIcon>
      </ToggleButton>
    </Container>
  );
}