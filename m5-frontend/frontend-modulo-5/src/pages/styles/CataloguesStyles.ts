import type { SxProps, Theme } from '@mui/material';

export const CataloguesStyles = {

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
    gap: 3,
  }),

  pageTitle: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.text.primary,
    marginBottom: '8px',
  }),

  
  tabsContainer: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    gap: 1,
    marginBottom: '8px',
  }),

  tabButton: (theme: Theme, active: boolean): SxProps<Theme> => ({
    borderRadius: '8px',
    paddingX: '20px',
    paddingY: '8px',
    backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[100],
    color: active ? '#000000' : theme.palette.text.primary,
    fontWeight: active ? 700 : 400,
    fontSize: '14px',
    '&:hover': {
      backgroundColor: active ? theme.palette.primary.main : theme.palette.action.hover,
    },
  }),


  panel: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  }),


  addRow: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
  }),

  addField: (theme: Theme): SxProps<Theme> => ({
    flex: 1,
    '& .MuiOutlinedInput-root': {
      height: '48px',
      borderRadius: '8px',
      backgroundColor: theme.palette.grey[100],
      fontSize: '15px',
      '& fieldset': { border: 'none' },
      '&:hover fieldset': { border: 'none' },
      '&.Mui-focused fieldset': {
        border: `1.5px solid ${theme.palette.primary.main}`,
      },
    },
    '& .MuiInputBase-input': {
      color: theme.palette.text.primary,
      '&::placeholder': { color: theme.palette.grey[200] },
    },
  }),

  addButton: (theme: Theme): SxProps<Theme> => ({
    height: '48px',
    paddingX: '24px',
    borderRadius: '8px',
    backgroundColor: theme.palette.primary.main,
    color: '#000000',
    fontWeight: 700,
    fontSize: '14px',
    flexShrink: 0,
    '&:hover': { backgroundColor: theme.palette.primary.main, opacity: 0.85 },
    '&:disabled': { backgroundColor: theme.palette.grey[100], color: theme.palette.grey[200] },
  }),

  
  tableHeader: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'center',
    paddingX: '16px',
    paddingY: '10px',
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),

  headerText: (theme: Theme): SxProps<Theme> => ({
    fontSize: '12px',
    fontWeight: 700,
    color: theme.palette.grey[200],
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  }),

  
  tableRow: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'center',
    paddingX: '16px',
    paddingY: '10px',
    borderRadius: '6px',
    gap: 1,
    '&:hover': { backgroundColor: theme.palette.action.hover },
  }),

  rowId: (theme: Theme): SxProps<Theme> => ({
    width: '48px',
    flexShrink: 0,
    fontSize: '13px',
    color: theme.palette.grey[200],
  }),

  rowName: (theme: Theme): SxProps<Theme> => ({
    flex: 1,
    fontSize: '15px',
    color: theme.palette.text.primary,
  }),

  
  editField: (theme: Theme): SxProps<Theme> => ({
    flex: 1,
    '& .MuiInputBase-root': {
      height: '36px',
      fontSize: '15px',
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.grey[100],
      borderRadius: '6px',
      paddingX: '10px',
    },
    '& .MuiInputBase-input': { padding: 0 },
  }),

  
  iconButton: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.grey[200],
    width: '32px',
    height: '32px',
    '&:hover': { color: theme.palette.text.primary, backgroundColor: 'transparent' },
  }),

  deleteButton: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.error.main,
    width: '32px',
    height: '32px',
    '&:hover': { color: '#ff4444', backgroundColor: 'transparent' },
  }),

  saveButton: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.primary.main,
    width: '32px',
    height: '32px',
    '&:hover': { color: theme.palette.primary.main, backgroundColor: 'transparent', opacity: 0.8 },
  }),

  
  errorText: (theme: Theme): SxProps<Theme> => ({
    fontSize: '13px',
    color: theme.palette.error.main,
    paddingX: '4px',
  }),

  emptyText: (theme: Theme): SxProps<Theme> => ({
    fontSize: '14px',
    color: theme.palette.grey[200],
    paddingX: '16px',
    paddingY: '12px',
  }),

  totalText: (theme: Theme): SxProps<Theme> => ({
    fontSize: '13px',
    color: theme.palette.grey[200],
    paddingX: '16px',
    paddingTop: '8px',
  }),
};