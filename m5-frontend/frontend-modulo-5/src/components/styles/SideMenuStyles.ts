import type { SxProps, Theme } from '@mui/material';

export const sideMenuStyles = {

  container: (theme: Theme): SxProps<Theme> => ({
    display: {xs: 'none',
              md: 'flex',},
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
  adminModeContainer: (theme: Theme): SxProps<Theme> => ({
    display: {xs: 'none',
              md: 'flex',},
    flexDirection: 'column',
    marginX: 0,
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
  primaryButton: (theme: Theme): SxProps<Theme> => ({
    justifyContent: 'left',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '26px',
    height: '52px',
    font: theme.typography.body2,
    color: theme.palette.background.default,
    width: 'auto',
    marginX: '25px',
    display: 'flex',
    '&:hover':{
      backgroundColor: '#ffffff',
    }
  }),
  secondaryButton: (theme: Theme): SxProps<Theme> => ({
    justifyContent: 'left',
    backgroundColor: 'transparent',
    borderRadius: '26px',
    border: '2px',
    borderStyle: 'solid',
    height: '52px',
    font: theme.typography.body2,
    color: theme.palette.secondary.main,
    width: 'auto',
    marginX: '25px',
    display: 'flex',
    '&:hover':{
      backgroundColor: theme.palette.action.hover,
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
  searchFileButton: (theme: Theme): SxProps<Theme> => ({
    justifyContent: 'left',
    backgroundColor: theme.palette.background.default,
    height: '52px',
    font: theme.typography.body2,
    color: theme.palette.secondary.main,
    width: 'auto',
    paddingX: '25px',
    '&:hover':{
      backgroundColor: theme.palette.action.hover,
    },
    borderRadius:2,
    ml:'auto',
    mr:'auto'
  }),
  buttonText: (theme: Theme): SxProps<Theme> => ({
    marginLeft: '10px',
    font: theme.typography.body2,
    color: theme.palette.secondary.main,
  }),
  primaryButtonText: (theme: Theme): SxProps<Theme> => ({
    margin: 'auto',
    font: theme.typography.body2,
    color: theme.palette.background.default,
  }),
  secondaryButtonText: (theme: Theme): SxProps<Theme> => ({
    margin: 'auto',
    font: theme.typography.body2,
    color: theme.palette.secondary.main,
  }),
  filler: (theme: Theme): SxProps<Theme> => ({
    height: '100%',
  }),
  messageContainer: (theme: Theme): SxProps<Theme> => ({
    padding: '25px',
  }),
  divider: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    padding: '10px',
    alignItems: 'center',
  }),
  line: (theme: Theme): SxProps<Theme> => ({
    flex: 1,
    backgroundColor: theme.palette.secondary.main,
    height: '1px',
  }),
  or: (theme: Theme): SxProps<Theme> => ({
    paddingX: '10px',
  }),
  buttonsContainer: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  }),
  unsignedContainer: (theme: Theme): SxProps<Theme> => ({
    display: {xs: 'none',
              md: 'flex',},
    flexDirection: 'column',
    marginX: 0,
    paddingY: '40px',
    minWidth: '280px',
    maxWidth: '280px',
    height: '100%',
    backgroundColor: theme.palette.background.default,
    borderStyle: 'solid',
    border: 0,
    borderRight: 1,
    borderRightColor: theme.palette.secondary.main,
    justifyContent: 'space-evenly'
  }),

};
