import type { SxProps, Theme } from '@mui/material';

export const sideMenuStyles = {

  container: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'column',
    marginX: 0,
    paddingTop: '100px',
    paddingBottom: '30px',
    minWidth: '280px',
    maxWidth: '280px',
    height: '100%',
    backgroundColor: theme.palette.background.default,
    borderStyle: 'solid',
    border: 0,
    borderRight: 1,
    borderRightColor: theme.palette.secondary.main,
  }),
  buttonIcon: (theme: Theme): SxProps<Theme> => ({
    fontSize: '28px',
    marginLeft: '16px',
  }),
  createButton: (theme: Theme): SxProps<Theme> => ({
    justifyContent: 'left',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '26px',
    height: '52px',
    font: theme.typography.body2,
    color: theme.palette.background.default,
    width: 'auto',
    marginX: '25px',
    marginBottom: '20px',
    display: 'flex',
    '&:hover':{
      backgroundColor: '#ffffff',
    }
  }),
  navButton: (theme: Theme): SxProps<Theme> => ({
    justifyContent: 'left',
    backgroundColor: 'transparent',
    height: '52px',
    font: theme.typography.body2,
    color: theme.palette.secondary.main,
    width: 'auto',
    paddingX: '25px',
    '&:hover':{
      backgroundColor: theme.palette.action.hover,
    }
  }),
  buttonText: (theme: Theme): SxProps<Theme> => ({
    marginLeft: '10px',
    font: theme.typography.body2,
    color: theme.palette.secondary.main,
  }),
  createButtonText: (theme: Theme): SxProps<Theme> => ({
    margin: 'auto',
    font: theme.typography.body2,
    color: theme.palette.background.default,
  }),
  filler: (theme: Theme): SxProps<Theme> => ({
    height: '100%',
  }),
};
