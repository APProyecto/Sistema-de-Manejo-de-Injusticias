// VotesBoxStyles.ts
import type { SxProps, Theme } from "@mui/material";

export const VotesBoxStyles = {
    container: (theme: Theme): SxProps<Theme> => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.grey[200],
        width: '110px',
        height: '40px',
        borderRadius: '20px',
        padding: '0 8px',
        boxSizing: 'border-box',
    }),
    
    votesText: (theme: Theme): SxProps<Theme> => ({
        color: theme.palette.text.primary,
        fontSize: theme.typography.caption.fontSize,
        fontWeight: theme.typography.caption.fontWeight,
        textAlign: 'center',
        flex: 1,
    }),
    
    buttonIcon: (theme: Theme): SxProps<Theme> => ({
        fontSize: '20px',
    }),
    
    positiveVoteButton: (theme: Theme): SxProps<Theme> => ({
        padding: '0px',
        minWidth: 'auto',
        width: '28px',
        height: '28px',
        color: theme.palette.text.primary,
        border: 'hidden',
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: 'transparent',
            color: theme.palette.error.main,
        },
        '&.Mui-selected': {
            color: theme.palette.error.main,
            backgroundColor: 'transparent',
            '&:hover': {backgroundColor: 'transparent'}
        }
    }),
    
    negativeVoteButton: (theme: Theme): SxProps<Theme> => ({
        padding: '0px',
        minWidth: 'auto',
        width: '28px',
        height: '28px',
        color: theme.palette.text.primary,
        border: 'hidden',
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: 'transparent',
            color: theme.palette.success.main,
        },
        '&.Mui-selected': {
            color: theme.palette.success.main,
            backgroundColor: 'transparent',
            '&:hover': {backgroundColor: 'transparent'}
        }
    }),
}