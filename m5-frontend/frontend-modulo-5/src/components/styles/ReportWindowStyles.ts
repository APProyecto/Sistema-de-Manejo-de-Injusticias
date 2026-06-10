import type { SxProps, Theme } from '@mui/material';

export const reportWindowStyles = {
    dialogContent: (theme: Theme): SxProps<Theme> => ({
        backgroundColor: '#3C3C3C',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        paddingX: '50px',
        paddingY: '40px',
        minWidth: '400px',
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

    title: (theme: Theme): SxProps<Theme> => ({
        color: 'white',
        marginBottom: '20px',
        textAlign: 'center',
        width: '100%'
    }),

    label: (theme: Theme): SxProps<Theme> => ({
        color: 'white',
        textAlign: 'left',
        width: '81%',
        minWidth: '200px',
        marginTop: '10px',
        fontWeight: 'bold'
    }),

    textField: (theme: Theme): SxProps<Theme> => ({
        backgroundColor: theme.palette.background.default,
        width: '81%',
        minWidth: '200px',
        borderRadius: '10px',
        '& .MuiFilledInput-root': {
            borderRadius: '10px',
            backgroundColor: theme.palette.background.default,
            '&:before': { borderBottom: 'none' },
            '&:after': { borderBottom: 'none' },
            '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
        },
        '& .MuiFilledInput-input': { 
            color: 'white' 
        },
        '& .MuiInputLabel-root': { 
            color: theme.palette.grey[200] 
        },
        '& textarea': {
            color: 'white'
        }
    }),

    formControl: (theme: Theme): SxProps<Theme> => ({
        width: '81%',
        minWidth: '200px',
        marginBottom: '20px'
    }),

    select: (theme: Theme): SxProps<Theme> => ({
        backgroundColor: theme.palette.background.default,
        borderRadius: '10px',
        color: 'black',
        '& .MuiSelect-select': {
            color: 'white',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            border: 'none'
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 'none'
        },
        '& .MuiSvgIcon-root': {
            color: 'white'
        }
    }),

    // Menu dropdown styles for better contrast
    menuPaper: (theme: Theme): SxProps<Theme> => ({
        backgroundColor: theme.palette.background.default,
        borderRadius: '10px',
        marginTop: '5px',
        '& .MuiMenuItem-root': {
            color: theme.palette.text.primary,
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
            '&.Mui-selected': {
                backgroundColor: theme.palette.action.selected,
                '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                }
            },
            '&.Mui-focusVisible': {
                backgroundColor: theme.palette.action.focus,
            }
        }
    }),

    buttonContainer: (theme: Theme): SxProps<Theme> => ({
        display: 'flex',
        gap: '15px',
        width: '81%',
        minWidth: '200px',
        marginTop: '20px'
    }),

    sendButton: (theme: Theme): SxProps<Theme> => ({
        flex: 1,
        backgroundColor: theme.palette.primary.main,
        borderRadius: '15px',
        padding: '10px',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
        '&.Mui-disabled': {
            backgroundColor: theme.palette.grey[600],
            color: theme.palette.grey[400]
        }
    }),

    cancelButton: (theme: Theme): SxProps<Theme> => ({
        flex: 1,
        borderColor: theme.palette.grey[500],
        color: theme.palette.grey[300],
        borderRadius: '15px',
        padding: '10px',
        '&:hover': {
            borderColor: theme.palette.grey[400],
            backgroundColor: theme.palette.grey[200]
        }
    })
};