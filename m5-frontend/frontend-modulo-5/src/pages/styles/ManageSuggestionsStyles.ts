import type { SxProps, Theme } from "@mui/material";

export const manageSuggestionsStyles = {
  container: (theme: Theme): SxProps<Theme> => ({
    width: "100%",
    maxWidth: "1200px !important",
    py: { xs: 2, sm: 3, md: 4 },
    px: { xs: 2, sm: 3, md: 4 },
    color: theme.palette.common.white,
    boxSizing: "border-box",
  }),

  statsRow: (_theme: Theme): SxProps<Theme> => ({
    display: "flex",
    gap: 2,
    mb: 3,
    flexWrap: "wrap",
    width: "100%",
  }),

  statCard: (theme: Theme): SxProps<Theme> => ({
    display: "flex",
    alignItems: "center",
    gap: 2,
    p: { xs: 1.5, sm: 2 },
    flex: { xs: "1 1 100%", sm: "1 1 220px", md: 1 },
    minWidth: { xs: "100%", sm: 180 },
    backgroundColor: theme.palette.grey[900],
    borderRadius: 2,
    boxSizing: "border-box",
  }),

  statIcon: (_theme: Theme): SxProps<Theme> => ({
    fontSize: { xs: 30, sm: 36 },
    flexShrink: 0,
  }),

  statContent: (_theme: Theme): SxProps<Theme> => ({
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  }),

  statLabel: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.grey[400],
    fontSize: { xs: 12, sm: 13 },
  }),

  statNumber: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.common.white,
    fontSize: { xs: 22, sm: 24 },
    fontWeight: 700,
  }),

  headerLine: (_theme: Theme): SxProps<Theme> => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: { xs: "stretch", sm: "center" },
    mb: 2,
    flexWrap: "wrap",
    gap: 2,
    width: "100%",
  }),

  search: (theme: Theme): SxProps<Theme> => ({
    backgroundColor: theme.palette.common.white,
    color: "#000",
    borderRadius: 1,
    height: 36,
    fontSize: 14,
    width: { xs: "100%", sm: 240 },
    maxWidth: "100%",
    boxSizing: "border-box",
  }),

  gridHeader: (_theme: Theme): SxProps<Theme> => ({
  display: "grid",
  gridTemplateColumns:
    "120px 110px minmax(220px, 1fr) minmax(300px, 1fr) 260px",
  gap: 2,
  px: 2,
  py: 1,
  backgroundColor: "rgba(255,255,255,0.05)",
  borderRadius: 1,
  mb: 1,
  alignItems: "center",

  minWidth: 1050,
  width: "100%",
  boxSizing: "border-box",
}),

  headerCell: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.grey[400],
    fontSize: 13,
    fontWeight: 600,
    textTransform: "uppercase",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),

    row: (theme: Theme, index: number): SxProps<Theme> => ({
    display: "grid",
    gridTemplateColumns:
        "120px 110px minmax(220px, 1fr) minmax(300px, 1fr) 260px",
    gap: 2,
    px: 2,
    py: 1.5,
    alignItems: "center",
    backgroundColor:
        index % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent",
    borderRadius: 1,
    mb: 0.5,

    minWidth: 1050,
    width: "100%",
    boxSizing: "border-box",
    }),

  subjectText: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.common.white,
    fontSize: 14,
    fontWeight: 600,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minWidth: 0,
  }),

  descriptionText: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.grey[300],
    fontSize: 13,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minWidth: 0,
  }),

  actionsBox: (_theme: Theme): SxProps<Theme> => ({
  display: "flex",
  gap: 1,
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
  minWidth: 0,
}),

  actionButton: (_theme: Theme): SxProps<Theme> => ({
  fontSize: 12,
  px: 1,
  py: 0.5,
  minWidth: 74,
  whiteSpace: "nowrap",
}),

  paginationRow: (theme: Theme): SxProps<Theme> => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: { xs: "stretch", sm: "center" },
    mt: 3,
    color: theme.palette.grey[400],
    flexWrap: "wrap",
    gap: 1,
    flexDirection: { xs: "column", sm: "row" },
  }),

  pageButton: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.common.white,
    borderColor: theme.palette.grey[600],
    fontSize: 12,
    width: { xs: "100%", sm: "auto" },
  }),

  replyModal: (_theme: Theme): SxProps<Theme> => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90vw", sm: 500 },
    maxWidth: "90vw",
    maxHeight: "90vh",
    overflowY: "auto",
    bgcolor: "#1e1e1e",
    borderRadius: 2,
    boxShadow: 24,
    p: { xs: 2, sm: 4 },
    boxSizing: "border-box",
  }),
};