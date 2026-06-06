import type { SxProps, Theme } from '@mui/material';

export const detailedPostSyles = {
    mainContainer: (theme: Theme): SxProps<Theme> => ({
        display: 'flex',
        flexDirection: 'row',
        boxSizing: 'border-box',
        flex: 1,
        background: 'theme.palette.background.default',
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '100%',
    }),
    centerContainer: (theme: Theme): SxProps<Theme> => ({
        backgroundColor: 'red',
    }),
    rightContainer: (theme: Theme): SxProps<Theme> => ({
        backgroundColor: 'transparent',
        width: '25vw',
        padding: '20px',
        justifyContent: 'left',
        alignItems: 'start',
        border: 'none',
        borderLeft: 'solid',
        borderLeftWidth: '1px',
        overflowY: 'auto',
        overflowX: 'hidden',
    }),
    subtitle: (theme: Theme): SxProps<Theme> => ({
        textAlign: 'left',
        overflow: 'auto',
        fontFamily: theme.typography.h3.fontFamily,
        fontSize: theme.typography.h3.fontSize,
        fontWeight: theme.typography.h3.fontWeight,
        color: theme.typography.h3.color,
        marginTop: '20px',
    }),
    text: (theme: Theme): SxProps<Theme> => ({
        textAlign: 'left',
        overflow: 'auto',
        fontFamily: theme.typography.body1.fontFamily,
        fontWeight: theme.typography.body1.fontWeight,
        color: theme.typography.body1.color,
        marginTop: '10px',
    }),
    bulletItem: (theme: Theme): SxProps<Theme> => ({
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'left',
    }),
    bulletPoint: (theme: Theme): SxProps<Theme> => ({
        marginRight: '5px',
    }),
};