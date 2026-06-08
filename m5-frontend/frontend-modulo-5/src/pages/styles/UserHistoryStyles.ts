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
  }),

  Box: (theme: Theme): SxProps<Theme> => ({
    mx:2,
    my:2,
    py:2,
    background:theme.palette.background.default,
    borderRadius:10,
    '&:hover':{background:theme.palette.grey[100]}
  }),
  subTitle: (theme: Theme): SxProps<Theme> => ({
    ml:4,
    mt:2,
    mb:0,
    fontWeight:'bold'
  }),
  subText: (theme: Theme): SxProps<Theme> => ({
    textAlign:'left',
    ml:4
  }),
  subTextBold: (theme: Theme): SxProps<Theme> => ({
    textAlign:'left',
    ml:4,
    fontWeight:'bold'
  })

}