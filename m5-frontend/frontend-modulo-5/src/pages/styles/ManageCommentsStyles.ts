import type { SxProps, Theme } from '@mui/material';

export const manageCommentsStyles = {
  container: (_theme: Theme): SxProps<Theme> => ({
    minHeight: 'calc(100vh - 90px)',
    py: 4,
    backgroundColor: _theme.palette.background.default,
  }),

  statsRow: (_theme: Theme): SxProps<Theme> => ({ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }),

  statCard: (_theme: Theme): SxProps<Theme> => ({
    backgroundColor: _theme.palette.grey[800],
    borderRadius: 2,
    p: 2,
    minWidth: 200,
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  }),

  statContent: (_theme: Theme): SxProps<Theme> => ({ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }),

  statIcon: (_theme: Theme): SxProps<Theme> => ({ fontSize: 40 }),

  statNumber: (_theme: Theme): SxProps<Theme> => ({ fontSize: 28, fontWeight: 700, color: _theme.palette.common.white }),

  statLabel: (_theme: Theme): SxProps<Theme> => ({ color: _theme.palette.common.white }),

  headerLine: (_theme: Theme): SxProps<Theme> => ({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }),

  search: (_theme: Theme): SxProps<Theme> => ({ backgroundColor: '#ffffff', color: '#000000', borderRadius: 2, minWidth: 300, px: 1 }),

  gridHeader: (_theme: Theme): SxProps<Theme> => ({
    display: 'grid',
    gridTemplateColumns: '120px 120px 180px 280px 280px 320px',
    gap: 2,
    py: 1,
    px: 1,
    borderBottom: `1px solid rgba(255,255,255,0.08)`,
    color: _theme.palette.common.white,
    fontWeight: 700,
    minWidth: 1380,
  }),

  row: (_theme: Theme, index: number): SxProps<Theme> => ({
    display: 'grid',
    gridTemplateColumns: '120px 120px 180px 280px 280px 320px',
    gap: 2,
    alignItems: 'start',
    p: 2,
    backgroundColor: index % 2 === 0 ? _theme.palette.grey[900] : _theme.palette.grey[800],
    borderRadius: 1,
    mb: 1,
  }),

  headerCell: (_theme: Theme): SxProps<Theme> => ({
    color: _theme.palette.common.white,
    fontWeight: 700,
    fontSize: 12,
    lineHeight: 1.2,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  }),

  reasonText: (_theme: Theme): SxProps<Theme> => ({ color: _theme.palette.common.white, whiteSpace: 'normal', overflowWrap: 'anywhere', wordBreak: 'break-word' }),

  originalText: (_theme: Theme): SxProps<Theme> => ({ color: _theme.palette.common.white, whiteSpace: 'normal', overflowWrap: 'anywhere', wordBreak: 'break-word' }),

  descriptionText: (_theme: Theme): SxProps<Theme> => ({ color: _theme.palette.common.white, whiteSpace: 'normal', overflowWrap: 'anywhere', wordBreak: 'break-word'}),

  statusChip: (_theme: Theme): SxProps<Theme> => ({ px: 2, py: 0.8, fontWeight: 700, borderRadius: 2 }),

  statusCell: (_theme: Theme): SxProps<Theme> => ({ justifySelf: 'center' }),

  actionsBox: (_theme: Theme): SxProps<Theme> => ({ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }),

  actionButton: (_theme: Theme): SxProps<Theme> => ({ height: 36, px: 2, textTransform: 'none' }),
};

export default manageCommentsStyles;
