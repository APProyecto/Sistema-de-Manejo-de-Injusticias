import { type SxProps, type Theme } from '@mui/material';

export const StatisticsStyles = {
  Divider: (theme: Theme): SxProps<Theme> => ({
    color:theme.palette.primary.main,
    mx:1,
    my:0.5,
    border:4,
    borderRadius:5,
  }),
  Divider2: (theme: Theme): SxProps<Theme> => ({
    my:1, 
    borderColor:theme.palette.grey[200]
  }),
  CardGraphic: (theme: Theme): SxProps<Theme> => ({
    background:theme.palette.grey[100],
    borderRadius:5
  }),
  BoxGraphic: (theme: Theme): SxProps<Theme> => ({
    background:theme.palette.grey[100],
    p:1,
    borderRadius:5
  }),
  LabelGraphic: (theme: Theme): SxProps<Theme> => ({
    color:theme.palette.primary.main
  }),
  LabelBox: (theme: Theme): SxProps<Theme> => ({
    display:'flex',
    pl:5,
    pt:2
  }),
  TopLabel: (theme: Theme): SxProps<Theme> => ({
    color:theme.palette.grey[200],
    ml:0
  }),
  TopLabelNumber: (theme: Theme): SxProps<Theme> => ({
    fontWeight:'bold',
    color:theme.palette.secondary.main,
    mb:2,
    ml:0
  }),
  ElementMapBox: (theme: Theme): SxProps<Theme> => ({
    maxHeight:285,
    minHeight:285,
    mx:2, 
    overflowY:'auto'
  }),
}