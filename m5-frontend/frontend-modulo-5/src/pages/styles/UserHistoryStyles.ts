import { type SxProps, type Theme } from '@mui/material';

export const UserHistoryStyles = {
  searchField: (theme: Theme): SxProps<Theme> => ({
    flex: 1,
    maxWidth: '50rem',
    width:'70%',
    my:5,
    '& .MuiOutlinedInput-root': {
      height: '60px',
      borderRadius: '10px',
      fontSize: '18px',
      backgroundColor: '#ffffff',
      '& fieldset': {
        border: 'none'
      },
      '&:hover fieldset': {
        border: 'none'
      },
      '&.Mui-focused fieldset': {
        border: 'none'
      }
    },
    '& .MuiInputBase-input': {
      color: 'black',
      '&::placeholder': {
        color: 'black'
      }
    }
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
  })
}