import type { SxProps, Theme } from '@mui/material';

const fieldRoot = (theme: Theme): SxProps<Theme> => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '10px',
    color: '#000000',
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
    color: '#000000',
    padding: '14px 14px',
  },
});

export const createBoycottStyles = {
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
  panel: (theme: Theme): SxProps<Theme> => ({
    width: '100%',
    maxWidth: '1140px',
    color: 'theme.palette.text.primary',
  }),
  breadcrumb: (): SxProps<Theme> => ({
    color: '#c4c8c8',
    fontWeight: 600,
    fontSize: '16px',
    marginBottom: '18px',
  }),
  breadcrumbActive: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.primary.main,
  }),
  title: (): SxProps<Theme> => ({
    color: '#ffffff',
    fontWeight: 700,
    fontSize: { xs: '28px', md: '36px' },
    lineHeight: 1.1,
    marginBottom: '6px',
  }),
  subtitle: (): SxProps<Theme> => ({
    
    display: 'flex',
    justifyContent: 'center',
    color: '#d1d4d4',
    fontSize: { xs: '16px', md: '18px' },
    lineHeight: 1.45,
    width: '100%',
  }),
  formSection: (): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    marginTop: '32px',
  }),
  fieldLabel: (): SxProps<Theme> => ({
    color: '#d1d4d4',
    fontWeight: 700,
    fontSize: '18px',
    marginBottom: '8px',
    textTransform: 'uppercase',
  }),
  textField: (theme: Theme): SxProps<Theme> => fieldRoot(theme),
  selectMenuPaper: (): SxProps<Theme> => ({
    backgroundColor: '#2f2f2a',
    color: '#000000',
    borderRadius: '10px',
    marginTop: '6px',
    '& .MuiMenuItem-root': {
      color: '#ffffff',
      fontWeight: 500,
    },
  }),
  selectMenuItem: (): SxProps<Theme> => ({
    color: '#ffffff',
    fontWeight: 500,
    '&.Mui-selected': {
      backgroundColor: '#4a4a44',
    },
    '&.Mui-selected:hover': {
      backgroundColor: '#5a5a53',
    },
    '&:hover': {
      backgroundColor: '#43433d',
    },
  }),
  textarea: (theme: Theme): SxProps<Theme> => ({
    ...fieldRoot(theme),
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#2f2f2a',
      borderRadius: '10px',
      color: '#000000',
      alignItems: 'flex-start',
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
      padding: '14px 14px',
    },
  }),
  entityGrid: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
    gap: '16px',
  },
  entityButton: (theme: Theme, selected: boolean): SxProps<Theme> => ({
    minHeight: '54px',
    borderRadius: '10px',
    textTransform: 'none',
    backgroundColor: selected ? '#5e5837' : '#1f1f1b',
    color: selected ? theme.palette.primary.main : '#c4c0af',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    fontWeight: 700,
    fontSize: '16px',
    '&:hover': {
      backgroundColor: selected ? '#5e5837' : '#2a2a25',
    },
  }),
  optionStack: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
    gap: '16px',
  },
  primaryButton: (theme: Theme): SxProps<Theme> => ({
    minHeight: '52px',
    borderRadius: '26px',
    padding: '5px 30px',
    textTransform: 'none',
    backgroundColor: theme.palette.primary.main,
    color: '#111111',
    fontWeight: 800,
    fontSize: '18px',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#f0cf4f',
      boxShadow: 'none',
    },
  }),
  outlineButton: (theme: Theme): SxProps<Theme> => ({
    minHeight: '52px',
    borderRadius: '26px',
    textTransform: 'none',
    backgroundColor: 'transparent',
    color: '#d1d4d4',
    border: '1px solid #d1d4d4',
    fontWeight: 700,
    fontSize: '18px',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      borderColor: '#ffffff',
    },
  }),
  uploadBox: (): SxProps<Theme> => ({
    minHeight: '130px',
    borderRadius: '10px',
    border: '2px solid rgba(255, 255, 255, 0.10)',
    backgroundColor: '#272722',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#b9b4a0',
    fontWeight: 600,
    textAlign: 'center',
    padding: '20px',
    cursor: 'pointer',
    transition: 'border-color 0.2s ease, background-color 0.2s ease',
  }),
  uploadBoxActive: (theme: Theme): SxProps<Theme> => ({
    borderColor: theme.palette.primary.main,
    backgroundColor: '#2d2d27',
    color: '#ffffff',
  }),
  uploadContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
  },
  uploadHint: {
    fontWeight: 600,
    color: '#b9b4a0',
  },
  uploadFileList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
    marginTop: '8px',
  },
  uploadFileItem: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    borderRadius: '8px',
    backgroundColor: '#1f1f1b',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '10px 14px',
    color: theme.palette.text.primary,
  }),
  uploadFileName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: '#ffffff',
  },
  uploadFileMeta: {
    color: '#b9b4a0',
    fontSize: '12px',
    flexShrink: 0,
  },
  footerActions: {
    display: 'flex',
    gap: '14px',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '36px',
    flexWrap: 'wrap',
  },
  postButton: (theme: Theme): SxProps<Theme> => ({
    minWidth: { xs: '100%', md: '420px' },
    height: '50px',
    borderRadius: '25px',
    backgroundColor: theme.palette.primary.main,
    color: '#111111',
    fontWeight: 800,
    fontSize: '18px',
    textTransform: 'none',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#f0cf4f',
      boxShadow: 'none',
    },
  }),
};