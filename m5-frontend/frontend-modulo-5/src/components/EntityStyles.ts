import type { SxProps, Theme } from '@mui/material';

export const EntityStyles = {
    container: (theme:Theme): SxProps<Theme> => ({
        backgroundColor: theme.palette.grey[200],
        borderRadius: '10px',
        paddingX: '10px',
        paddingY: '8px',
        maxWidth: '45%',
        justifyContent: 'left',
        overflow: 'hidden',
    }),
    picture: (theme:Theme): SxProps<Theme> => ({
        marginRight: '15px',
    }),
    
    buttonText: (theme:Theme): SxProps<Theme> => ({
        fontFamily: theme.typography.h3.fontFamily,
        fontSize: theme.typography.h3.fontSize,
        fontWeight: theme.typography.h3.fontWeight,
        color: theme.palette.text.primary,
    }),

} 