import { type SxProps, type Theme } from '@mui/material';
import { palette } from '@mui/system';

export const QueriesStyles = {
  TopButton: (theme: Theme): SxProps<Theme> => ({
    background:theme.palette.secondary.main,
    borderRadius:10,
    '&:hover':{background:theme.palette.grey[100]}
  }),
  Divider: (theme: Theme): SxProps<Theme> => ({
    background: theme.palette.secondary.main,
    m:0,
    border:1,
    borderRadius:5,
  }),
  Select: (theme: Theme): SxProps<Theme> => ({
  background: theme.palette.background.paper,
  color: 'black',
  borderRadius: 5,
  textAlign: 'center',
  '&:before': { borderBottom: 'none' },
  '&:after': { borderBottom: 'none' },
  '&.Mui-focused': { background: theme.palette.background.paper },
  '& .MuiSelect-select:hover': { background: theme.palette.background.paper,
    borderRadius: 5,
    },
    '& .MuiFilledInput-root': {
    transition: 'none',
    },
    height:30,
    my:1
  })
}