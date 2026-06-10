import type { SxProps, Theme } from '@mui/material';

export const commentStyles = {
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
    p: 4,
    display: 'flex',
    flexDirection: 'column',
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

  dateText: (theme: Theme): SxProps<Theme> => ({
    fontFamily: theme.typography.body1.fontFamily,
    fontSize: theme.typography.caption.fontSize,
    color: theme.typography.caption.color,
    display: 'block',
    justifyContent: 'left',
    textAlign: 'left',
  }),

  text: (theme: Theme): SxProps<Theme> => ({
    textAlign: 'left',
    fontFamily: theme.typography.body1.fontFamily,
    fontWeight: theme.typography.body1.fontWeight,
    color: theme.typography.body1.color,
    marginTop: '4px',
    lineHeight: 1.6,
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

  interactionBox: (theme: Theme): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 1,
    mt: 1,
  }),

  replyIcon: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.text.primary,
    fontSize: '25px',
  }),

  errorIcon: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.text.primary,
    fontSize: '25px',
  }),

  replyButton: (theme: Theme): SxProps<Theme> => ({
    marginLeft: 'auto',
  }),
} 