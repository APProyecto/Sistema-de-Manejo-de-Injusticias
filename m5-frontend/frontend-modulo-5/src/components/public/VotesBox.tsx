import { Container, IconButton, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import { VotesBoxStyles } from "../styles/VotesBoxStyles";
import { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface VotesBoxProps {
    votes: string
    
}

export default function VotesBox ({votes}: VotesBoxProps) {
    const theme = useTheme();
    const [vote, setVote] = useState<'positive' | 'negative' | null>(null);

    const handleVote = (newVote: 'positive' | 'negative') => {
        if (vote === newVote){
            setVote(null);
        } else {
            setVote(newVote);
        }
    }

    return(
        <Container sx={VotesBoxStyles.container(theme)}>
            {/*Positive Vote*/}
            <ToggleButton
                value={"checked"} 
                selected={vote === 'positive'}
                onChange={() => handleVote('positive')}
                sx={VotesBoxStyles.positiveVoteButton(theme)}
                disableRipple
                disableTouchRipple
            >
                <CancelIcon sx={VotesBoxStyles.buttonIcon(theme)}></CancelIcon>
            </ToggleButton>

            {/*Votes*/}
            <Typography>
                {votes}
            </Typography>

            {/*Negative Vote*/}
            <ToggleButton
                value={"checked"} 
                selected={vote === 'negative'}
                onChange={() => handleVote('negative')}
                sx={VotesBoxStyles.negativeVoteButton(theme)}
                disableRipple
                disableTouchRipple
            >
                <CheckCircleIcon sx={VotesBoxStyles.buttonIcon(theme)}></CheckCircleIcon>
            </ToggleButton>
        </Container>
    );
}