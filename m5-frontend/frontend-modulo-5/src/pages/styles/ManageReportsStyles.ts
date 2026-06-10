import type { SxProps, Theme } from '@mui/material';

export const manageReportsStyles = {
  container: (_theme: Theme): SxProps<Theme> => ({
    minHeight: 'calc(100vh - 90px)',
    py: 4,
    backgroundColor: _theme.palette.background.default,
  }),

  headerTitle: (_theme: Theme): SxProps<Theme> => ({
    color: _theme.palette.common.white,
    fontWeight: 700,
    mb: 3,
  }),

  tabsRow: (_theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    gap: 1,
    mb: 2,
    flexWrap: 'wrap',
  }),

  tabButton: (_theme: Theme, active?: boolean): SxProps<Theme> => ({
    textTransform: 'none',
    borderRadius: 3,
    px: 3,
    py: 1.2,
    minWidth: 100,
    backgroundColor: active ? _theme.palette.grey[100] : _theme.palette.grey[900],
    color: active ? _theme.palette.common.black : _theme.palette.common.white,
    '&:hover': {
      backgroundColor: active ? _theme.palette.grey[200] : _theme.palette.grey[800],
    },
  }),

  contentArea: (_theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    gap: 3,
    flexWrap: 'wrap',
  }),

  leftPanel: (_theme: Theme): SxProps<Theme> => ({
    width: 360,
    minWidth: 320,
    maxHeight: 'calc(100vh - 180px)',
    overflowY: 'auto',
    pr: 1,
  }),

  reportCard: (_theme: Theme, active?: boolean): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    p: 2,
    borderRadius: 3,
    backgroundColor: active ? _theme.palette.grey[800] : _theme.palette.grey[900],
    border: active ? `1px solid ${_theme.palette.primary.main}` : '1px solid transparent',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, border-color 0.2s ease',
    '&:hover': {
      backgroundColor: _theme.palette.grey[800],
    },
  }),

  reportHeader: (_theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 1,
  }),

  listHeader: (_theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    width: '100%',
  }),

  listAvatar: (_theme: Theme): SxProps<Theme> => ({
    bgcolor: _theme.palette.grey[700],
    width: 40,
    height: 40,
  }),

  listText: (_theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
    flex: 1,
  }),

  reporterName: (_theme: Theme): SxProps<Theme> => ({
    color: _theme.palette.common.white,
    fontWeight: 700,
    fontSize: 14,
  }),

  reportTitle: (_theme: Theme): SxProps<Theme> => ({
    color: _theme.palette.grey[300],
    fontWeight: 500,
    fontSize: 13,
    lineHeight: 1.3,
  }),

  reportHeading: (_theme: Theme): SxProps<Theme> => ({
    color: _theme.palette.common.white,
    fontWeight: 700,
    fontSize: 20,
    mb: 1,
  }),

  reportMeta: (_theme: Theme): SxProps<Theme> => ({
    color: _theme.palette.grey[400],
    fontSize: 12,
  }),

  countBadge: (_theme: Theme): SxProps<Theme> => ({
    minWidth: 40,
    height: 40,
    borderRadius: '50%',
    border: `1px solid ${_theme.palette.common.white}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: _theme.palette.common.white,
    fontWeight: 700,
    fontSize: 14,
  }),

  excerpt: (_theme: Theme): SxProps<Theme> => ({
    color: _theme.palette.grey[300],
    fontSize: 13,
    lineHeight: 1.4,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  }),

  rightPanel: (_theme: Theme): SxProps<Theme> => ({
    flex: 1,
    minWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  }),

  detailCard: (_theme: Theme): SxProps<Theme> => ({
    p: 3,
    borderRadius: 3,
    backgroundColor: _theme.palette.grey[900],
  }),

  detailHeader: (_theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 2,
  }),

  detailAuthor: (_theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    flex: 1,
  }),

  detailAvatar: (_theme: Theme): SxProps<Theme> => ({
    bgcolor: _theme.palette.grey[700],
    width: 50,
    height: 50,
  }),

  detailAuthorName: (_theme: Theme): SxProps<Theme> => ({
    color: _theme.palette.common.white,
    fontWeight: 700,
    fontSize: 18,
  }),

  timestamp: (_theme: Theme): SxProps<Theme> => ({
    color: _theme.palette.grey[400],
    fontSize: 12,
  }),

  detailInfo: (_theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
  }),

  actionRow: (_theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    mb: 2,
  }),

  actionButton: (_theme: Theme): SxProps<Theme> => ({
    textTransform: 'none',
    minWidth: 110,
    px: 2,
    borderRadius: 3,
  }),

  statusTag: (_theme: Theme, status: 'Approved' | 'Rejected' | 'Pending'): SxProps<Theme> => ({
    px: 2,
    py: 0.75,
    borderRadius: 3,
    fontWeight: 700,
    fontSize: 14,
    color: _theme.palette.common.white,
    backgroundColor:
      status === 'Approved'
        ? '#4caf50'
        : status === 'Rejected'
        ? _theme.palette.error.main
        : _theme.palette.warning.main,
  }),

  sectionLabel: (_theme: Theme): SxProps<Theme> => ({
    color: _theme.palette.grey[400],
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  }),

  reportBody: (_theme: Theme): SxProps<Theme> => ({
    color: _theme.palette.common.white,
    fontSize: 14,
    lineHeight: 1.7,
    mb: 2,
  }),

  responderCard: (_theme: Theme): SxProps<Theme> => ({
    p: 2,
    borderRadius: 3,
    backgroundColor: _theme.palette.grey[800],
    border: `1px solid rgba(255,255,255,0.08)`,
  }),

  replyHeader: (_theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 2,
  }),

  replyInput: (_theme: Theme): SxProps<Theme> => ({
    width: '100%',
    mt: 1,
    backgroundColor: _theme.palette.grey[900],
    color: _theme.palette.common.white,
    '& .MuiInputBase-input': {
      color: _theme.palette.common.white,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255,255,255,0.12)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255,255,255,0.24)',
    },
  }),
};

export default manageReportsStyles;
