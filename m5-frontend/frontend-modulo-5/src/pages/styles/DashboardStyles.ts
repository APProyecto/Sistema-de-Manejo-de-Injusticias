import { type SxProps, type Theme } from '@mui/material';

export const DashboardStyles = {
  GridBox: (theme: Theme): SxProps<Theme> => ({
    background:theme.palette.grey[100],
    backgroundColor:theme.palette.grey[100],
    borderRadius:10,
    height:300,
    alignContent:'center'
  }),
  GridCard: (theme: Theme): SxProps<Theme> => ({
    height: '100%', 
    background:theme.palette.background.default, 
    borderRadius:10,
    boxShadow:'0px 10px 16px -10px rgb(0.5,0.5,0.5)'
  }),
  TypographyTitle: (theme:Theme): SxProps<Theme> => ({
    fontWeight:'bold',
    color:theme.palette.primary.main
  }),
  companiesBox: (theme:Theme): SxProps<Theme> => ({
    display:'flex',
    alignItems:'center',
    my:2,
    py:2,
    '&:hover':{background:theme.palette.background.default},
    background:theme.palette.grey[200],
    borderRadius:9
  }),
  companiesItemsBox: (): SxProps<Theme> => ({
    display:'flex',
    width:'33%'
  })
}