import type { SxProps, Theme } from '@mui/material';

export const manageUsersStyles = {
  container: (theme: Theme): SxProps<Theme> => ({
    minHeight: 'calc(100vh - 90px)',
    py: 4,
    backgroundColor: theme.palette.background.default,
  }),

  headerWrapper: (_theme: Theme): SxProps<Theme> => ({
    mb: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
    flexWrap: 'wrap',
  }),

  title: (theme: Theme): SxProps<Theme> => ({ fontWeight: 700, mb: 1, color: theme.palette.common.white }),
  subtitle: (theme: Theme): SxProps<Theme> => ({ color: theme.palette.common.white }),

  totalBox: (_theme: Theme): SxProps<Theme> => ({ display: 'flex', alignItems: 'center', gap: 1 }),

  card: (_theme: Theme): SxProps<Theme> => ({
    backgroundColor: 'transparent',
    borderRadius: 4,
    boxShadow: 'none',
    p: 3,
  }),

  innerPanel: (_theme: Theme): SxProps<Theme> => ({
    backgroundColor: 'transparent',
    borderRadius: 3,
    p: 2,
  }),

  tabs: (theme: Theme): SxProps<Theme> => ({ borderBottom: `1px solid ${theme.palette.divider}`}),

  toolbar: (_theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    justifyContent: 'space-between',
    gap: 2,
    flexWrap: 'wrap',
    alignItems: 'center',
  }),

  search: (_theme: Theme): SxProps<Theme> => ({
    backgroundColor: '#ffffff',
    color: '#000',
    borderRadius: 2,
    minWidth: 300,
    px: 1,
  }),

  gridHeader: (theme: Theme): SxProps<Theme> => ({
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    py: 2,
    px: 1,
    gap: 2,
    bgcolor: theme.palette.grey[900],
    borderRadius: 2,
  }),

  headerCaption: (theme: Theme): SxProps<Theme> => ({ color: theme.palette.common.white, fontWeight: 700 }),

  row: (theme: Theme, index: number): SxProps<Theme> => ({
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: 2,
    alignItems: 'center',
    p: 2,
    borderRadius: 2,
    backgroundColor: index % 2 === 0 ? theme.palette.grey[900] : theme.palette.grey[800],
  }),

  avatar: (theme: Theme): SxProps<Theme> => ({ bgcolor: theme.palette.primary.main, width: 42, height: 42 }),

  userName: (theme: Theme): SxProps<Theme> => ({ fontWeight: 700, color: theme.palette.common.white }),
  userMeta: (theme: Theme): SxProps<Theme> => ({ color: theme.palette.common.white }),

  statusChip: (_theme: Theme): SxProps<Theme> => ({ width: 'fit-content', px: 2, py: 1, fontWeight: 700}),

  selectControl: (_theme: Theme): SxProps<Theme> => ({ backgroundColor: '#ffffff', borderRadius: 2, }),

  adminButton: (_theme: Theme, _isAdmin: boolean): SxProps<Theme> => ({
    textTransform: 'none',
    borderColor: _theme.palette.grey[700],
    color: _theme.palette.common.white,
  }),

  emptyBox: (_theme: Theme): SxProps<Theme> => ({ p: 4, textAlign: 'center' }),
};
