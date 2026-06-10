import type { SxProps, Theme } from '@mui/material';

export const detailedPostStyles = {
  mainContainer: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    height: 'calc(100vh - 64px)', // adjust to your header height
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100% !important',
    padding: '0 !important',
    background: theme.palette.background.default,
  }),


  indictedContainer: (theme: Theme): SxProps<Theme> => ({
    textAlign: 'left',
    marginBottom: '20px',

  }),

  centerContainer: (theme: Theme): SxProps<Theme> => ({
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '100%',
    padding: '35px !important',
    maxWidth: 'none !important',
  }),

  rightContainer: (theme: Theme): SxProps<Theme> => ({
    width: '25vw',
    minWidth: '220px',
    maxWidth: '300px',
    flexShrink: 0,
    minheight: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '20px !important',
    borderLeft: `1px solid ${theme.palette.divider}`,
    backgroundColor: 'transparent',
  }),

  // ── Post header ──
  postHeader: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
    mb: '20px',
  }),

  backButton: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.text.primary,
  }),

  avatar: (theme: Theme): SxProps<Theme> => ({
    width: 32,
    height: 32,
  }),

  username: (theme: Theme): SxProps<Theme> => ({
    fontFamily: theme.typography.body1.fontFamily,
    fontWeight: 600,
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.text.primary,
  }),

  dateText: (theme: Theme): SxProps<Theme> => ({
    fontFamily: theme.typography.body1.fontFamily,
    fontSize: theme.typography.caption.fontSize,
    color: theme.typography.caption.color,
    display: 'block',
    justifyContent: 'left',
    textAlign: 'left',
  }),

  // ── Title + description ──
  postTitle: (theme: Theme): SxProps<Theme> => ({
    fontFamily: theme.typography.h2.fontFamily,
    fontSize: theme.typography.h6.fontSize,
    fontWeight: 700,
    color: theme.palette.text.primary,
    textAlign: 'left',
    mt: 2,
    mb: 0.75,
  }),

  descriptionLabel: (theme: Theme): SxProps<Theme> => ({
    fontFamily: theme.typography.body1.fontFamily,
    fontSize: theme.typography.caption.fontSize,
    color: theme.palette.text.secondary,
    display: 'block',
    mb: 0.5,
  }),

  subtitle: (theme: Theme): SxProps<Theme> => ({
    textAlign: 'left',
    fontFamily: theme.typography.h3.fontFamily,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.typography.h3.color,
    marginTop: '20px',
    marginBottom: '8px',
  }),

  text: (theme: Theme): SxProps<Theme> => ({
    textAlign: 'left',
    fontFamily: theme.typography.body1.fontFamily,
    fontWeight: theme.typography.body1.fontWeight,
    color: theme.typography.body1.color,
    marginTop: '4px',
    lineHeight: 1.6,
  }),

  // ── Attachments ──

  caseNumberContainer: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    boxSizing: 'border-box',
    justifyContent: 'flex-start',
    backgroundColor: theme.palette.grey[100],
    flexWrap: 'wrap',
    flexShrink: 0,
    padding: '5px 10px',
    borderRadius: '10px',
    gap: 1,
    mt: 1,
    mb: 2.5,
    width: 'fit-content', // Esto también funciona
  }),

  caseNumberText: (theme: Theme): SxProps<Theme> => ({
    color: theme.typography.body1.color,
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.body1.fontWeight,
    fontWidth: theme.typography.body1.fontWidth,
  }),

  attachmentsRow: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    mt: 1,
    mb: 2.5,
  }),

  attachmentCard: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: theme.palette.grey[100],
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    borderRadius: 2,
    px: 1.5,
    py: 0.75,
    minWidth: 140,
  }),

  attachmentIconPdf: (theme: Theme): SxProps<Theme> => ({
    color: theme.typography.body1.color,
  }),

  attachmentIconImg: (theme: Theme): SxProps<Theme> => ({
    color: theme.typography.body1.color,
  }),

  attachmentInfo: (theme: Theme): SxProps<Theme> => ({
    flex: 1,
    overflow: 'hidden',
  }),

  attachmentName: (theme: Theme): SxProps<Theme> => ({
    fontFamily: theme.typography.body2.fontFamily,
    fontSize: 14,
    fontWeight: 700,
    color: theme.palette.text.primary,
    display: 'block',
  }),

  attachmentWeight: (theme: Theme): SxProps<Theme> => ({
    fontFamily: theme.typography.body1.fontFamily,
    fontSize: theme.typography.caption.fontSize,
    color: theme.typography.caption.color,
    display: 'block',
    textAlign: 'left',
  }),

  downloadButton: (theme: Theme): SxProps<Theme> => ({
    color: theme.typography.body1.color,
  }),

  extraEvidences: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: theme.palette.grey[100],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    px: 1.5,
    py: 0.75,
    minWidth: 48,
    cursor: 'pointer',
  }),

  extraEvidencesText: (theme: Theme): SxProps<Theme> => ({
    fontFamily: theme.typography.body1.fontFamily,
    fontSize: theme.typography.body2.fontSize,
    fontWeight: 600,
    color: theme.palette.text.primary,
  }),

  // ── Action bar ──
  actionBar: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    mb: 2.5,
  }),

  voteChip: (theme: Theme, active: boolean | null | undefined): SxProps<Theme> => ({
    backgroundColor: active ? theme.palette.primary.main : 'transparent',
    color: active ? theme.palette.primary.contrastText : theme.palette.text.primary,
    borderColor: theme.palette.divider,
    fontWeight: 600,
  }),

  commentChip: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
  }),

  openChip: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
    fontWeight: 700,
    borderRadius: 2,
  }),

  divider: (theme: Theme): SxProps<Theme> => ({
    mb: 2,
    borderColor: theme.palette.divider,
  }),

  // ── Filters ──
  filtersRow: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    gap: 1,
    flexWrap: 'wrap',
    mb: 2.5,
  }),

  filterChip: (theme: Theme, active: boolean): SxProps<Theme> => ({
    borderRadius: 4,
    padding: 2,
    fontWeight: 700,
    backgroundColor: active ? theme.palette.action.selected : theme.palette.grey[100],
    color: active ? theme.palette.background.default : theme.palette.text.primary,
    cursor: 'pointer',
  }),

  // ── Comments ──
  commentsList: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    pb: 4,
  }),

  commentCard: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: 3,
    p: 2,
  }),

  commentHeader: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 1,
  }),

  dotSeparator: (theme: Theme): SxProps<Theme> => ({
    fontSize: 6,
    color: theme.palette.text.disabled,
  }),

  // ── Right sidebar bullets ──
  bulletItem: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'left',
    padding: '0 !important',
    alignItems: 'flex-start',
  }),

  bulletPoint: (theme: Theme): SxProps<Theme> => ({
    marginRight: '5px',
    color: theme.palette.text.secondary,
  }),
};