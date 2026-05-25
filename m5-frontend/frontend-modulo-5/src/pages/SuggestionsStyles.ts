import type { SxProps, Theme } from '@mui/material';

const fieldBase = (theme: Theme): SxProps<Theme> => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.default,
    borderRadius: '10px',
    color: theme.palette.text.primary,
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
    padding: '18px 16px',
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  '& .MuiInputLabel-asterisk': {
    color: theme.palette.error.main,
  },
});

export const suggestionsStyles = {
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
  card: (theme: Theme): SxProps<Theme> => ({
    width: '100%',
    maxWidth: '1180px',
    marginLeft: { xs: 0, lg: '15%' },
    borderRadius: '32px',
    backgroundColor: theme.palette.grey[100],
    boxShadow: '0 10px 24px rgba(0, 0, 0, 0.28)',
    padding: { xs: '24px', md: '34px 36px 28px' },
    display: 'flex',
    flexDirection: 'column',
    gap: '22px',
  }),
  title: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.text.primary,
    fontWeight: 700,
    fontSize: { xs: '28px', md: '34px' },
    lineHeight: 1.1,
  }),
  sectionTitle: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.text.primary,
    fontWeight: 500,
    fontSize: '18px',
  }),
  label: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.text.primary,
    fontWeight: 500,
    marginBottom: '8px',
  }),
  textField: (theme: Theme): SxProps<Theme> => fieldBase(theme),
  descriptionField: (theme: Theme): SxProps<Theme> => ({
    ...fieldBase(theme),
    '& .MuiOutlinedInput-root': {
      backgroundColor: theme.palette.background.default,
      borderRadius: '10px',
      color: theme.palette.text.primary,
      alignItems: 'flex-start',
      minHeight: '108px',
      '& fieldset': {
        borderColor: 'transparent',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main,
      },
    },
    '& .MuiInputBase-input': {
      color: theme.palette.text.primary,
      padding: '16px 16px 18px',
      alignSelf: 'flex-start',
    },
  }),
  divider: (theme: Theme): SxProps<Theme> => ({
    height: '1px',
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.85,
    marginY: '8px',
  }),
  submitButton: (theme: Theme): SxProps<Theme> => ({
    minWidth: { xs: '100%', md: '420px' },
    height: '52px',
    borderRadius: '26px',
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: '18px',
    textTransform: 'none',
    alignSelf: 'center',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#9aa0a0',
      boxShadow: 'none',
    },
  }),
};