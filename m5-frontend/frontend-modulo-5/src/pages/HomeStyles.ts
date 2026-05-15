import type { SxProps, Theme } from '@mui/material';

export const homeStyles = {
    container: (theme: Theme): SxProps<Theme> => ({
        background: theme.palette.background.default,
        overflowY: 'auto',
    }),
};