import type { SxProps, Theme } from '@mui/material';

export const loginWindowStyles = {
    dialogContent : (theme: Theme): SxProps<Theme> => ({
        backgroundColor: '#3C3C3C',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        textAlign: 'center',
        paddingX: '50px'
    }),

    divider: (theme: Theme): SxProps<Theme> => ({
    '&::before, &::after': {
        borderColor: theme.palette.grey[200]
    }
}),
    highlighted : (theme: Theme): SxProps<Theme> => ({
        color: theme.palette.primary.main,
        display: 'inline'
    }),
    primaryButton : (theme: Theme): SxProps<Theme> => ({
        width: '81%',
        backgroundColor: 'white',
        borderRadius: '15px',
        color: theme.palette.grey[100]
    }),
    textField : (theme: Theme): SxProps<Theme> => ({
        backgroundColor: '#1E1E1E',
        '& input': { color: 'white' },
        '& .MuiInputLabel-root': { color: theme.palette.grey[200] },
    })
}