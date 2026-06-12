import { type SxProps, type Theme } from "@mui/material";

export const StatisticsStyles = {
  Container: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: theme.palette.background.default,
    width: "100%",
    maxWidth: "100%",
    minHeight: "calc(100vh - 64px)",
    p: { xs: 2, sm: 3, md: 5 },
    overflowY: "auto",
    boxSizing: "border-box",
  }),

  HeaderBox: (): SxProps<Theme> => ({
    display: "flex",
    alignItems: "center",
    mb: { xs: 3, md: 5 },
  }),

  Divider: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.primary.main,
    mx: { xs: 0.5, md: 1 },
    my: 0.5,
    border: { xs: 3, md: 4 },
    borderRadius: 5,
  }),

  Divider2: (theme: Theme): SxProps<Theme> => ({
    my: 1.2,
    borderColor: theme.palette.divider,
    opacity: 0.7,
  }),

  CardGraphic: (theme: Theme): SxProps<Theme> => ({
    background: theme.palette.grey[100],
    borderRadius: 5,
    height: "100%",
    overflow: "hidden",
  }),

  BoxGraphic: (theme: Theme): SxProps<Theme> => ({
    background: theme.palette.grey[100],
    p: { xs: 1.5, sm: 2 },
    borderRadius: 5,
    width: "100%",
    boxSizing: "border-box",
  }),

  KpiCardContent: (): SxProps<Theme> => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: { xs: 1, sm: 2 },
    p: { xs: 1.5, sm: 2 },
  }),

  KpiTextBox: (): SxProps<Theme> => ({
    minWidth: 0,
    flex: 1,
  }),

  KpiIcon: (): SxProps<Theme> => ({
    m: "auto",
    fontSize: { xs: 38, sm: 48, md: 57 },
    flexShrink: 0,
  }),

  LabelGraphic: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.primary.main,
    fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.25rem" },
    lineHeight: 1.2,
    wordBreak: "break-word",
  }),

  LabelBox: (): SxProps<Theme> => ({
    display: "flex",
    pl: { xs: 0, sm: 1, md: 2 },
    pt: { xs: 1, md: 2 },
    mb: { xs: 1, md: 1.5 },
  }),

  TopLabel: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.grey[200],
    ml: 0,
    fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" },
    lineHeight: 1.1,
  }),

  TopLabelNumber: (theme: Theme): SxProps<Theme> => ({
    fontWeight: "bold",
    color: theme.palette.secondary.main,
    mb: { xs: 0, sm: 1 },
    ml: 0,
    fontSize: { xs: "1.6rem", sm: "2rem", md: "2.125rem" },
  }),

  ChartScroll: (): SxProps<Theme> => ({
    width: "100%",
    overflowX: "auto",
    overflowY: "hidden",
    WebkitOverflowScrolling: "touch",
  }),

  ChartInner: (): SxProps<Theme> => ({
    minWidth: { xs: 520, sm: 560, md: "100%" },
  }),

  ElementMapBox: (): SxProps<Theme> => ({
    maxHeight: { xs: 260, md: 285 },
    minHeight: { xs: 220, md: 285 },
    mx: { xs: 0, md: 2 },
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
    mt: 1,
  }),

  ListRow: (): SxProps<Theme> => ({
    display: "flex",
    alignItems: "center",
    gap: 1,
    minWidth: 0,
  }),

  ListTextBox: (): SxProps<Theme> => ({
    minWidth: 0,
    flex: 1,
  }),

  ListValueBox: (): SxProps<Theme> => ({
    my: "auto",
    ml: "auto",
    mr: 0,
    flexShrink: 0,
  }),

  EllipsisText: (): SxProps<Theme> => ({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),

  SubGridBox: (): SxProps<Theme> => ({
    p: { xs: 1.5, md: 2 },
    borderRadius: 3,
    m: 0,
    minHeight: { xs: 85, md: 100 },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }),

  SubGridBoxText: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.secondary.main,
    mx: "auto",
    my: 1,
    fontWeight: 700,
    fontSize: { xs: "1.7rem", md: "2.125rem" },
  }),

  SubGridBoxValue: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.secondary.main,
    fontWeight: 500,
  }),

  TopBoycottSubLabel: (theme: Theme): SxProps<Theme> => ({
    ml: 1,
    color: theme.palette.text.secondary,
    fontSize: "0.75rem",
    textAlign: "left",
  }),
};