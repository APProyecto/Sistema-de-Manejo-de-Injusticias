import type { SxProps, Theme } from '@mui/material';

export const filterWindowStyles = {
  dialog: (theme: Theme): SxProps<Theme> => ({
    '& .MuiDialog-paper': {
      borderRadius: '20px',
      backgroundColor: theme.palette.background.default,
    }
  }),

  dialogContent: (theme: Theme): SxProps<Theme> => ({
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  }),

  header: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  }),

  title: (theme: Theme): SxProps<Theme> => ({
    fontWeight: 600,
    fontSize: '24px',
    color: theme.palette.text.primary,
  }),

  closeButton: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.grey[500],
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    }
  }),

  filtersContainer: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  }),

  formControl: (theme: Theme): SxProps<Theme> => ({
    width: '100%',
  }),

  inputLabel: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.primary.main,
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    '&.Mui-focused': {
        color: theme.palette.primary.main,
    }
  }),

  select: (theme: Theme): SxProps<Theme> => ({
    '& .MuiOutlinedInput-root': {
      backgroundColor: theme.palette.secondary.main,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiSelect-select': {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.grey[200],
      padding: '14px',
    },
    '&.Mui-focused .MuiSelect-select': {
      color: theme.palette.background.default
    }
  }),

  menuPaper: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: theme.palette.background.default,
    borderRadius: '12px',
    marginTop: '4px',
    '& .MuiMenuItem-root': {
      color: theme.palette.text.primary,
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      '&.Mui-selected': {
        backgroundColor: theme.palette.action.selected,
        color: theme.palette.background.default, 
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        }
      }
    }
  }),

  activeFilters: (theme: Theme): SxProps<Theme> => ({
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }),

  activeFiltersTitle: (theme: Theme): SxProps<Theme> => ({
    fontWeight: 500,
    color: 'theme.palette.text.secondary',
  }),

  chipContainer: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  }),

  chip: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.background.default,
    '&:hover': {
      backgroundColor: theme.palette.grey[300],
    },
    '& .MuiChip-deleteIcon': {
      color: theme.palette.grey[200],
      '&:hover': {
        color: theme.palette.error.main,
      }
    }
  }),

  buttonContainer: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  }),

  cancelButton: (theme: Theme): SxProps<Theme> => ({
    flex: 1,
    padding: '10px',
    borderRadius: '10px',
    borderColor: theme.palette.divider,
    color: theme.palette.secondary.main,
    '&:hover': {
      borderColor: theme.palette.text.primary,
      backgroundColor: theme.palette.action.hover,
    }
  }),

  applyButton: (theme: Theme): SxProps<Theme> => ({
    flex: 1,
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.body2.fontWeight,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    }
  }),
};