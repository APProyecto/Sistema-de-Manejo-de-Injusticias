import type { SxProps, Theme } from '@mui/material';

export const headerStyles = {
  appBar: (theme: Theme): SxProps<Theme> => ({
    bgcolor: theme.palette.background.default,
    height: '90px',
    justifyContent: 'center',
    position: 'sticky' as const,
    boxShadow: 'none',
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.secondary.main,
    borderBottomWidth: '1px'
  }),

  toolbar: (theme: Theme): SxProps<Theme> => ({
    justifyContent: 'space-between',
    alignItems: 'center',
    px: { xs: 0, md: 0 },
    marginX: '60px',
  }),

  logo: (theme: Theme): SxProps<Theme> => ({
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
    fontSize: { xs: '1rem', sm: '1.25rem' },
    '&:hover': {
      opacity: 0.9,
    },
  }),

  navButton: (theme: Theme): SxProps<Theme> => ({
    color: 'white',
  }),

  loginButton: (theme: Theme): SxProps<Theme> => ({
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

  mobileMenuButton: (theme: Theme): SxProps<Theme> => ({
    display: { xs: 'flex', md: 'none' },
    color: 'white',
  }),

  searchField: (theme: Theme): SxProps<Theme> => ({
    flex: 1,
    maxWidth: '50rem',
    mx: 2,
    '& .MuiOutlinedInput-root': {
      height: '60px',
      borderRadius: '10px',
      fontSize: '18px',
      backgroundColor: '#ffffff',
      '& fieldset': {
        border: 'none',
      },
      '&:hover fieldset': {
        border: 'none',
      },
      '&.Mui-focused fieldset': {
        border: 'none',
      },
    },
    '& .MuiInputBase-input': {
      color: 'black',
      '&::placeholder': {
        color: 'black',
      },
    },
  }),

  searchIcon: (theme: Theme): SxProps<Theme> => ({
    color: '#000000',
    fontSize: 35
  }),

  filterButton: (theme: Theme): SxProps<Theme> => ({
    borderColor: 'transparent',
    padding: '0px',
    '&:hover': {
        backgroundColor: 'transparent',
        textDecoration: 'underline',
    },
    fontSize: 35,
    color: '#000000',
  }),
};
