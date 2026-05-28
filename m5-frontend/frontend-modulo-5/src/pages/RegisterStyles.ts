import type { SxProps, Theme } from '@mui/material';


export const RegisterStyles = {
    TextFieldContent : (theme: Theme): SxProps<Theme> => ({
        width:'95%',
        color: theme.palette.background.default,
        '& .MuiOutlinedInput-root': {
        background: theme.palette.background.paper,
        color: theme.palette.background.default,
        borderRadius: 5},
        borderRadius:5,
        mb:7
    }),
    TextFieldContent2 : (theme: Theme): SxProps<Theme> => ({
        width:'95%',
        color: theme.palette.background.default,
        '& .MuiOutlinedInput-root': {
        background: theme.palette.background.paper,
        color: theme.palette.background.default,
        borderRadius: 5},
        borderRadius:5,
        mb:4
    }),
    SelectContent : (theme: Theme): SxProps<Theme> => ({
        borderRadius:15,
        width:"94%",
        height:"45%",
        backgroundColor:theme.palette.background.paper,
        color:theme.palette.background.default,
        fontSize:20,
        marginLeft:5
    }),
    DivisorContent : (theme:Theme) : SxProps<Theme> => ({
        background: theme.palette.secondary.main,
        ml:'auto',
        border:2,
        borderRadius:5,
    }),
    ButtonContent : (theme:Theme) : SxProps<Theme> => ({
        background:'#740000',
        height:'67%',
        width:'45%',
        mt:'7%',
        mb:'5%',
        borderRadius:5,
        mr:1
    })
}