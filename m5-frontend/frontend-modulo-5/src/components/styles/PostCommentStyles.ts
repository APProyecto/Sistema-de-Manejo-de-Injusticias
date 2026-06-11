import type { SxProps, Theme } from '@mui/material';

export const postCommentBoxStyles = {
  container: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.palette.action.hover,
    borderRadius: 3,
    px: 2,
    py: 0.5,
    gap: 1,
    width: 'auto',
    minWidth: 0,
    height: 'auto',
  }),

  input: (theme: Theme): SxProps<Theme> => ({
    flex: 1,
    fontFamily: theme.typography.body1.fontFamily,
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    minWidth: 0,
    '& .MuiInputBase-input': {
      padding: '8px 0',
      color: theme.palette.text.primary,
    },
    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
    '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
  }),

  submitButton: (theme: Theme): SxProps<Theme> => ({
    minWidth: 0,
    width: 36,
    height: 36,
    borderRadius: '50%',
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.background.default,
    flexShrink: 0,
    '&:hover': {
      backgroundColor: theme.palette.text.secondary,
    },
  }),

  submitIcon: (theme: Theme): SxProps<Theme> => ({
    fontSize: 18,
  }),
};