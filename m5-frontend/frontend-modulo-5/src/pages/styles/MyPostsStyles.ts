import type { SxProps, Theme } from '@mui/material';

export const myPostsStyles = {
    mainContainer: (theme: Theme): SxProps<Theme> => ({
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        flex: 1,
        background: 'theme.palette.background.default',
        overflowY: 'auto',
        overflowX: 'hidden',
        width: '100%',
    }),
    topContainer: (theme: Theme): SxProps<Theme> => ({
        display: 'flex',
        flexDirection: 'row',
        background: 'transparent',// theme.palette.background.default,
        alignItems: 'center',
        marginLeft: '15%',
        marginY: '20px',
    }),
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
    }),
};