import type { SxProps, Theme } from '@mui/material';

export const PostCardStyles = {
    container: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.grey[100],

    width: {
        xs: 'calc(100% - 24px)',
        sm: '85%',
        md: '75%',
        lg: '75%',
    },

    maxWidth: '900px',
    boxSizing: 'border-box',

    mx: {
        xs: 'auto',
        sm: 'auto',
        md: 'auto',
    },

    borderRadius: {
        xs: '24px',
        sm: '35px',
        md: '45px',
    },

    padding: {
        xs: '18px',
        sm: '35px',
        md: '45px',
    },

    
}),
    topContainer: (theme: Theme): SxProps<Theme> => ({
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }),
    profilePicture: (theme: Theme): SxProps<Theme> => ({
        width: '45px',
        height: '45px',
    }),
    usernameButton: (theme: Theme): SxProps<Theme> => ({
        marginX: '10px',
        borderColor: 'transparent',
        padding: '0px',
        '&:hover': {
            backgroundColor: 'transparent',
            textDecoration: 'underline',
        },
        fontSize: theme.typography.body2.fontSize,
        fontWeight: theme.typography.body2.fontWeight,
        color: theme.typography.body2.color,
    }),
    descriptionContainer: (theme: Theme): SxProps<Theme> => ({
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: 0,
        overflow: 'hidden',
        paddingLeft: '20px',
        paddingRight: '22.5px',
        borderStyle: 'solid',
        border: 0,
        borderLeft: 2,
        borderLeftColor: theme.palette.secondary.main,
        marginY: '20px',
        marginLeft: '22.5px',
        backgroundColor: 'transparent',
    }),
    entitiesContainer: (theme: Theme): SxProps<Theme> => ({
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 2,
        minWidth: 0,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        justifyContent: 'left',
    }),
    title: (theme: Theme): SxProps<Theme> => ({
        textAlign: 'left',
        fontSize: theme.typography.h3.fontSize,
        fontWeight: theme.typography.h3.fontWeight,
        color: theme.typography.h3.color,
        marginY: '15px',
    }),
    description: (theme: Theme): SxProps<Theme> => ({
        textAlign: 'left',
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
        color: theme.typography.body1.color,
        display: '-webkit-box',
        WebkitLineClamp: 10,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        wordBreak: 'break-word',
        maxHeight: 'calc(1.5em * 10)',
        lineHeight: 1.5,
    }),
    bottomContainer: (theme: Theme): SxProps<Theme> => ({
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',          
        alignItems: 'center',
        gap: 1,                    
        backgroundColor: 'transparent',
        paddingLeft: '22.5px',
        width: '100%',
    }),
    interactiveButtonsContainer: (theme: Theme): SxProps<Theme> => ({
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',          
        backgroundColor: 'transparent',
        gap: 2,
        width: 'auto',
        padding: 0,
        margin: 0,
    }),
    filler: (theme: Theme): SxProps<Theme> => ({
        display: 'flex',
        flex: 1,
        minWidth: 0,              
    }),
}