import { Container, IconButton, Typography, useTheme, type SvgIconTypeMap } from "@mui/material";
import { VotesBoxStyles } from "../styles/VotesBoxStyles";
import { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import { PostInteractionButtonStyles } from "../styles/PostInteractionButtonStyles";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import { fontSize } from "@mui/system";

interface PostInteractionButtonProps {
    text: string,
    icon: React.ElementType,
    iconColor: string, //se pasa el color del icono como parámetro para usar el componente con el estado del boycott
    onPressClick?: () => void;
}

export default function PostInteracionButton ({text, icon: Icon, iconColor, onPressClick}: PostInteractionButtonProps) {
    const theme = useTheme();
    const [vote, setVote] = useState<'positive' | 'negative' | null>(null);

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        if(onPressClick) onPressClick();
    }


    return(
        <Container sx={PostInteractionButtonStyles.interactiveButtonContainer(theme)}>
            <IconButton
                onClick={(event) => handleClick(event)}
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