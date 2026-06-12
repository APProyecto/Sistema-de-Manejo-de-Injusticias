import { Container, ToggleButton, Typography, useTheme } from "@mui/material";
import { VotesBoxStyles } from "../styles/VotesBoxStyles";
import React, { useEffect, useRef, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAuth } from "../../context/authContext";

interface VotesBoxProps {
  votes: string;
  initialVote?: boolean | null;
  onVoteChange?: (
    newVote: boolean | null,
    previousVote: boolean | null,
  ) => Promise<void> | void;
}

export default function VotesBox({
  votes,
  initialVote = null,
  onVoteChange,
}: Readonly<VotesBoxProps>) {
  const theme = useTheme();
  const [vote, setVote] = useState<boolean | null>(initialVote);
  const [isSendingVote, setIsSendingVote] = useState(false);
  const voteLockRef = useRef(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    setVote(initialVote);
  }, [initialVote]);

  const handleVote = async (newVote: boolean, event: React.MouseEvent) => {
    event.stopPropagation();

    if (!isAuthenticated) {
      return;
    }

    if (voteLockRef.current) {
      return;
    }

    voteLockRef.current = true;

    const previousVote = vote;

    // Option 2 UX: switching side is done in 2 clicks.
    // 1st click removes current vote, 2nd click applies opposite vote.
    let updatedVote: boolean | null;
    if (previousVote === newVote) {
      updatedVote = null;
    } else if (previousVote !== null && previousVote !== newVote) {
      updatedVote = null;
    } else {
      updatedVote = newVote;
    }

    setVote(updatedVote);

    if (!onVoteChange) {
      return;
    }

    setIsSendingVote(true);
    try {
      await onVoteChange(updatedVote, previousVote);
    } catch (error) {
      console.error("Error al registrar el voto:", error);
      setVote(previousVote);
    } finally {
      setIsSendingVote(false);
      voteLockRef.current = false;
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