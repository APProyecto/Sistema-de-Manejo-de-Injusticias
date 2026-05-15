// VotesBoxStyles.ts
import type { SxProps, Theme } from "@mui/material";

export const PostInteractionButtonStyles = {
    interactiveButtonContainer: (theme: Theme): SxProps<Theme> => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.palette.grey[200],
        width: 'auto',
        height: '40px',
        borderRadius: '20px',
        boxSizing: 'border-box',
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    }),
    
    buttonIcon: (theme: Theme): SxProps<Theme> => ({
        fontSize: '20px',
    }),
    
    button: (theme: Theme): SxProps<Theme> => ({
        padding: '0px 15px',
        gap: '7px',
        minWidth: 'auto',
        width: 'auto',
        maxWidth: '100px',
        height: '28px',
        color: theme.palette.text.primary,
        border: 'hidden',
        backgroundColor: 'transparent',
    }),
}