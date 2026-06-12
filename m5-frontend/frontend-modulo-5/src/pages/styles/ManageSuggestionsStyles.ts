import type { Theme } from '@mui/material';

export const manageSuggestionsStyles = {
    container: (theme: Theme) => ({
        maxWidth: '1200px !important',
        py: 4,
        color: theme.palette.common.white,
    }),

    statsRow: (_theme: Theme) => ({
        display: 'flex',
        gap: 2,
        mb: 3,
        flexWrap: 'wrap',
    }),

    statCard: (theme: Theme) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        flex: 1,
        minWidth: 140,
        backgroundColor: theme.palette.grey[900],
        borderRadius: 2,
    }),

    statIcon: (_theme: Theme) => ({
        fontSize: 36,
    }),

    statContent: (_theme: Theme) => ({
        display: 'flex',
        flexDirection: 'column',
    }),

    statLabel: (theme: Theme) => ({
        color: theme.palette.grey[400],
        fontSize: 13,
    }),

    statNumber: (theme: Theme) => ({
        color: theme.palette.common.white,
        fontSize: 24,
        fontWeight: 700,
    }),

    headerLine: (_theme: Theme) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        flexWrap: 'wrap',
        gap: 2,
    }),

    search: (theme: Theme) => ({
        backgroundColor: theme.palette.common.white,
        color: '#000',
        borderRadius: 1,
        height: 36,
        fontSize: 14,
    }),

    gridHeader: (_theme: Theme) => ({
        display: 'grid',
        gridTemplateColumns: '120px 110px 1fr 1fr 160px',
        gap: 2,
        px: 2,
        py: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 1,
        mb: 1,
    }),

    headerCell: (theme: Theme) => ({
        color: theme.palette.grey[400],
        fontSize: 13,
        fontWeight: 600,
        textTransform: 'uppercase' as const,
    }),

    row: (theme: Theme, index: number) => ({
        display: 'grid',
        gridTemplateColumns: '120px 110px 1fr 1fr 160px',
        gap: 2,
        px: 2,
        py: 1.5,
        alignItems: 'center',
        backgroundColor: index % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent',
        borderRadius: 1,
        mb: 0.5,
    }),

    subjectText: (theme: Theme) => ({
        color: theme.palette.common.white,
        fontSize: 14,
        fontWeight: 600,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap' as const,
    }),

    descriptionText: (theme: Theme) => ({
        color: theme.palette.grey[300],
        fontSize: 13,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap' as const,
    }),

    actionsBox: (_theme: Theme) => ({
        display: 'flex',
        gap: 1,
        flexWrap: 'wrap' as const,
    }),

    actionButton: (_theme: Theme) => ({
        fontSize: 12,
        px: 1.5,
        py: 0.5,
        minWidth: 'auto',
    }),

    paginationRow: (theme: Theme) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 3,
        color: theme.palette.grey[400],
        flexWrap: 'wrap',
        gap: 1,
    }),

    pageButton: (theme: Theme) => ({
        color: theme.palette.common.white,
        borderColor: theme.palette.grey[600],
        fontSize: 12,
    }),

    replyModal: (_theme: Theme) => ({
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: '#1e1e1e',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
    }),
};