import type { SxProps, Theme } from "@mui/material";

export const OptionMenuStyles = {
    container: (theme:Theme): SxProps<Theme> => ({ 
        display: 'flex',
        flex: 0,
    }),
    menu: (theme:Theme): SxProps<Theme> => ({ 
        marginTop: '15px',
    }),
    optionsButton: (theme:Theme): SxProps<Theme> => ({
        marginLeft: 'auto',
        backgroundColor: 'transparent',
        borderRadius: '24px',
        height: '48px',
        minWidth: '48px',
        padding: '0px',
        color: theme.palette.secondary.main,
        fontSize: theme.typography.body2.fontSize,
        fontWeight: theme.typography.body2.fontWeight,
        border: 'hidden',
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            color: theme.palette.secondary.main,
        },
        '&.Mui-selected': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.background.default,
        }
    }),
    optionsIcon: (theme:Theme): SxProps<Theme> => ({ 
        fontSize: '28px',
    }),
    listIcon: (theme:Theme): SxProps<Theme> => ({ 
        fontSize: '28px',
        marginRight: '5px',
    }),
    menuItem: (theme:Theme): SxProps<Theme> => ({ 
        backgroundColor: theme.palette.secondary.main,
        fontFamily: theme.typography.body1.fontFamily,
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
        color: theme.palette.background.default,
    }),
    
    
}