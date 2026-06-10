import type { SxProps, Theme } from '@mui/material';
import { flex } from '@mui/system';

export const CasesOfInjusticeStyles = {

mainContainer: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    flex: 1,
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.default,
    paddingY: '32px',
    paddingX: { xs: '16px', md: '24px' },
  }),

  searchSpace: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'center',
  }),

filterButton: (theme: Theme): SxProps<Theme> => ({
  borderColor: 'transparent',
  backgroundColor: 'white',
  borderRadius: '30px', 
  height: 60,           
  width: 60,            
  minWidth: 60,         
  padding: '0px',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  fontSize: 35,
  color: '#000000',
}),
searchField: (theme: Theme): SxProps<Theme> => ({
    flex: 1,
    width: '80%',
    mx: 2,
    my: 4,
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

  headerCases: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    gap: 2,
    width: '96%',
  }),
}