import { Container, IconButton, Typography, useTheme, type SvgIconTypeMap } from "@mui/material";
import { VotesBoxStyles } from "./VotesBoxStyles";
import { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import { PostInteractionButtonStyles } from "./PostInteractionButtonStyles";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import { fontSize } from "@mui/system";

interface PostInteractionButtonProps {
    text: string,
    icon: React.ElementType,
    iconColor: string, //se pasa el color del icono como parámetro para usar el componente con el estado del boycott
}

export default function PostInteracionButton ({text, icon: Icon, iconColor}: PostInteractionButtonProps) {
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
        <Container sx={PostInteractionButtonStyles.interactiveButtonContainer(theme)}>
            <IconButton
                onClick={() => {}}
                sx={PostInteractionButtonStyles.button(theme)}
                disableRipple
                disableTouchRipple
            >
                <Icon sx={{fontSize: '20px', color: iconColor}}/>
                <Typography>
                    {text}
                </Typography>
            </IconButton>
        </Container>
    );
}