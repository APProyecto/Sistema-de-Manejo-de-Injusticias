import { type SxProps, type Theme } from '@mui/material';

export const QueriesStyles = {
  TopButton: (theme: Theme): SxProps<Theme> => ({
    background:theme.palette.secondary.main,
    borderRadius:10
  }),
  Divider: (theme: Theme): SxProps<Theme> => ({
    background: theme.palette.secondary.main,
    m:0,
    border:1,
    borderRadius:5,
  }),
}