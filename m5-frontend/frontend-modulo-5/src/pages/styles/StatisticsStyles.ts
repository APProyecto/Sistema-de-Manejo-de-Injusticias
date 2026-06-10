import { type SxProps, type Theme } from '@mui/material';

export const StatisticsStyles = {
  Divider: (theme: Theme): SxProps<Theme> => ({
    color:theme.palette.primary.main,
    mx:1,
    my:0.5,
    border:4,
    borderRadius:5,
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
}