import type { SxProps, Theme } from '@mui/material';

export const loginWindowStyles = {
    DialogContent : (theme: Theme): SxProps<Theme> => ({
        backgroundColor: '#3C3C3C',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        textAlign: 'left',
        paddingX: '50px'
    }),

    Divider: (theme: Theme): SxProps<Theme> => ({
    '&::before, &::after': {
        borderColor: theme.palette.grey[200]
    }
})
}