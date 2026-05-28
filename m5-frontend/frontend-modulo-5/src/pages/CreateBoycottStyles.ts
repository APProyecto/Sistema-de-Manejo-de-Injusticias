import type { SxProps, Theme } from '@mui/material';

export const CreateBoycottStyles = {
    TextFieldContent : (theme: Theme): SxProps<Theme> => ({
        width:'100%',
        color: theme.palette.background.default,
        '& .MuiOutlinedInput-root': {
        background: theme.palette.background.paper,
        color: theme.palette.background.default,
        borderRadius: 5},
        borderRadius:5,
        mt:1,
        mb:1
    }),
    selectedButtonColor:"#423C28",
    notSelectedButtonColor:"#1E1E1A"
}