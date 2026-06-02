import type { SxProps, Theme } from '@mui/material';

export const homeStyles = {
    container: (theme: Theme): SxProps<Theme> => ({
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        boxSizing: 'border-box',
        flex: 1,
        background: 'theme.palette.background.default',
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '100%',
        gap: '50px',
        paddingY: '25px',
    }),
};