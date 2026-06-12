import type { SxProps, Theme } from '@mui/material';

export const searchBarStyles = {

  container: (theme: Theme): SxProps<Theme> => ({
    width: '100%',
    display: {xs: 'none',
      sm : 'flex',
    },
    maxWidth: '50rem',

  }),

  mobileMenuButton: (theme: Theme): SxProps<Theme> => ({
    display: { xs: 'flex', md: 'none' },
    color: 'white',
  }),

  searchField: (theme: Theme): SxProps<Theme> => ({
    flex: 1,
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
  profilePicture: (theme:Theme): SxProps<Theme> => ({
        width: '45px',
        height: '45px',
  }),
  profilePictureButton: (theme:Theme): SxProps<Theme> => ({
      width: '45px',
      height: '45px',
      borderRadius: '22.5px',
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
};
