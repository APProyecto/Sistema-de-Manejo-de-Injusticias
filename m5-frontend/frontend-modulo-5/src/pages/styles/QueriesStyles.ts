import { type SxProps, type Theme } from "@mui/material";

export const QueriesStyles = {
  Container: (theme: Theme): SxProps<Theme> => ({
    width: "100%",
    p: { xs: 2, sm: 3, md: 5 },
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.default,
    minHeight: "calc(100vh - 64px)",
    overflowY: "auto",
  }),

  TableScroll: (): SxProps<Theme> => ({
    width: "100%",
    overflowX: "auto",
    overflowY: "hidden",
    WebkitOverflowScrolling: "touch",
    pb: 1,
  }),

  TableContent: (): SxProps<Theme> => ({
    minWidth: "1100px",
    width: "100%",
  }),

  FiltersContainer: (): SxProps<Theme> => ({
    display: "flex",
    alignItems: "center",
    width: "100%",
    mt: 5,
    mb: 0,
    flexWrap: "nowrap",
  }),

  FilterCell: (width: string): SxProps<Theme> => ({
    width,
    minWidth: width,
    flexShrink: 0,
    px: 1,
    boxSizing: "border-box",
  }),

  DateFields: (): SxProps<Theme> => ({
    display: "flex",
    gap: 1,
    width: "100%",
  }),

  ResultRow: (theme: Theme): SxProps<Theme> => ({
    display: "flex",
    width: "100%",
    flexWrap: "nowrap",
    cursor: "pointer",
    "&:hover": {
      background: theme.palette.grey[100],
    },
  }),

  ResultCell: (width: string): SxProps<Theme> => ({
    width,
    minWidth: width,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    my: 1,
    px: 1,
    boxSizing: "border-box",
    overflow: "hidden",
  }),

  CellText: (): SxProps<Theme> => ({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),

  TopButton: (theme: Theme): SxProps<Theme> => ({
    background: theme.palette.secondary.main,
    borderRadius: 10,
    width: { xs: "100%", sm: "auto" },
    minHeight: { xs: 40, sm: 36 },
    "&:hover": {
      background: theme.palette.grey[100],
    },
  }),

  Divider: (theme: Theme): SxProps<Theme> => ({
    background: theme.palette.secondary.main,
    m: 0,
    border: 1,
    borderRadius: 5,
    width: "100%",
  }),

  VerticalDivider: (theme: Theme): SxProps<Theme> => ({
    background: theme.palette.secondary.main,
    m: 0,
    border: 1,
    borderRadius: 5,
    flexShrink: 0,
  }),

  Select: (theme: Theme): SxProps<Theme> => ({
    background: theme.palette.background.paper,
    color: "black",
    borderRadius: 5,
    textAlign: "center",

    width: "100%",
    minWidth: 0,
    height: 34,

    my: 1,

    "&:before": {
      borderBottom: "none",
    },
    "&:after": {
      borderBottom: "none",
    },
    "&:hover:before": {
      borderBottom: "none",
    },
    "&.Mui-focused": {
      background: theme.palette.background.paper,
    },

    "& .MuiSelect-select": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      py: 0,
      minHeight: "unset",
      height: "100%",
      background: theme.palette.background.paper,
      borderRadius: 5,
    },

    "& .MuiSelect-select:hover": {
      background: theme.palette.background.paper,
      borderRadius: 5,
    },
  }),
};