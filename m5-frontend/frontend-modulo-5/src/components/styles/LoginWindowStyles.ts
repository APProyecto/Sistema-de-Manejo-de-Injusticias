import type { SxProps, Theme } from '@mui/material';

export const loginWindowStyles = {
    dialogContent : (theme: Theme): SxProps<Theme> => ({
        backgroundColor: '#3C3C3C',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        paddingX: '50px',
    }),

    divider: (theme: Theme): SxProps<Theme> => ({
    width: '81%',
    '&::before, &::after': {
        borderColor: theme.palette.grey[500]
        }
    }),
    typography : (theme: Theme): SxProps<Theme> => ({
        textAlign:'left', 
        width: '81%',
        minWidth: '200px',
    }),

    dialog: (theme: Theme): SxProps<Theme> => ({
    '& .MuiDialog-paper': {
        borderRadius: '30px'
    }
    }),

    closeButton: (theme: Theme): SxProps<Theme> => ({
    position: 'absolute',
    top: 15,
    right: 15,
    color: 'white', 
    border: '2px solid white',
    '&:hover': {
        backgroundColor: theme.palette.grey[700]  
    }
    }),

    highlighted : (theme: Theme): SxProps<Theme> => ({
        color: theme.palette.primary.main,
        display: 'inline'
    }),
    auth0Button : (theme: Theme): SxProps<Theme> => ({
        width: '81%',
        minWidth: '200px',
        backgroundColor: 'white',
        borderRadius: '15px',
    }),

    googleButton : (theme: Theme): SxProps<Theme> => ({
        width: '100%',
        minWidth: '200px',
        backgroundColor: 'white',
        borderRadius: '15px',
    }),

    textButton: (theme: Theme): SxProps<Theme> => ({
        flex: 1, 
        textAlign: 'center',
        color: '#4B4F52'
    }),

    secundaryButton : (theme: Theme): SxProps<Theme> => ({
        width: '81%',
        minWidth: '200px',
        backgroundColor: '#4B4F52',
        borderRadius: '15px',
        color: theme.palette.primary.main
    }),

    textField: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: '#1E1E1E',
    width: '81%',
    minWidth: '200px',
    borderRadius: '10px',
    '& .MuiFilledInput-root': {
        borderRadius: '10px',                          
        '&:before': { borderBottom: 'none' },          
        '&:after': { borderBottom: 'none' },           
        '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
    },
    '& input': { color: 'white' },
    '& .MuiInputLabel-root': { color: theme.palette.grey[200] },
})
}