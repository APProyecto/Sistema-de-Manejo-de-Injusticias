import type { SxProps, Theme } from '@mui/material';

const fieldRoot = (theme: Theme, disabled = false): SxProps<Theme> => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: disabled ? '#d5dcdc' : '#ffffff',
    borderRadius: '8px',
    color: '#000000',
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: disabled ? 'transparent' : theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: disabled ? 'transparent' : theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input': {
    color: '#000000',
    padding: '12px 14px',
    WebkitTextFillColor: '#000000',
  },
  '& .MuiInputLabel-root': {
    color: '#000000',
  },
});

export const editProfileStyles = {
  container: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    flex: 1,
    width: '100%',
    minHeight: '100%',
    backgroundColor: theme.palette.background.default,
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingX: { xs: '20px', md: '60px' },
    paddingY: '30px',
    gap: '22px',
  }),
  backButton: (theme: Theme): SxProps<Theme> => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    alignSelf: 'flex-start',
    color: theme.palette.text.primary,
    padding: 0,
    minWidth: 'fit-content',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  }),
  backTitle: (theme: Theme): SxProps<Theme> => ({
    fontWeight: theme.typography.h2.fontWeight,
    fontSize: theme.typography.h2.fontSize,
    color: theme.palette.text.primary,
  }),
  panel: (): SxProps<Theme> => ({
    width: '100%',
    maxWidth: '840px',
    alignSelf: 'center',
    backgroundColor: '#47453b',
    borderRadius: '16px',
    overflow: 'hidden',
  }),
  topSection: (): SxProps<Theme> => ({
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', md: '320px 1fr' },
    minHeight: '240px',
    backgroundColor: '#47453b',
  }),
  avatarColumn: (): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    padding: '28px 24px',
    borderRight: { xs: 'none', md: '1px solid rgba(255,255,255,0.20)' },
  }),
  avatar: (): SxProps<Theme> => ({
    width: '132px',
    height: '132px',
  }),
  changePictureButton: (): SxProps<Theme> => ({
    minWidth: '200px',
    height: '42px',
    borderRadius: '2px',
    backgroundColor: '#2f2f2a',
    color: '#ffffff',
    gap: '10px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#3a3a34',
    },
  }),
  usernameColumn: (): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '34px 24px',
  }),
  usernameField: (theme: Theme): SxProps<Theme> => ({
    width: '100%',
    maxWidth: '260px',
    ...fieldRoot(theme),
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#2f2f2a',
      borderRadius: '8px',
      color: '#ffffff',
      paddingRight: '8px',
      '& fieldset': {
        borderColor: 'transparent',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& .MuiInputBase-input': {
      color: '#ffffff',
      padding: '12px 14px',
      fontSize: '22px',
      fontWeight: 700,
      WebkitTextFillColor: '#ffffff',
    },
  }),
  usernameEditIcon: (): SxProps<Theme> => ({
    color: '#ffffff',
  }),
  form: (): SxProps<Theme> => ({
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
    gap: '22px 28px',
    width: '100%',
    maxWidth: '840px',
    alignSelf: 'center',
  }),
  fieldGroup: (): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  }),
  label: (theme: Theme): SxProps<Theme> => ({
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.palette.text.primary,
  }),
  textField: (theme: Theme): SxProps<Theme> => fieldRoot(theme, false),
  readonlyField: (theme: Theme): SxProps<Theme> => fieldRoot(theme, true),
  actions: (): SxProps<Theme> => ({
    display: 'flex',
    gap: '14px',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '840px',
    alignSelf: 'center',
    paddingTop: '4px',
    flexWrap: 'wrap',
  }),
  saveButton: (): SxProps<Theme> => ({
    minWidth: '150px',
    height: '44px',
    borderRadius: '0px',
    backgroundColor: '#0b8c18',
    color: '#ffffff',
    textTransform: 'none',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#0a7614',
    },
  }),
  cancelButton: (): SxProps<Theme> => ({
    minWidth: '150px',
    height: '44px',
    borderRadius: '0px',
    backgroundColor: '#b20a0a',
    color: '#ffffff',
    textTransform: 'none',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#930808',
    },
  }),
};