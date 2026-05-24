import type { SxProps, Theme } from '@mui/material';

export const loginWindowStyles = {
    DialogContent : (theme: Theme): SxProps<Theme> => ({
        backgroundColor: theme.palette.background.default,
    })
}