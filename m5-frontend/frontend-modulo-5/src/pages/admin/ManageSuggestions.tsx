import { useEffect, useMemo, useState } from 'react';
import {
    Box,
    Button,
    Card,
    Chip,
    Container,
    InputAdornment,
    MenuItem,
    Modal,
    OutlinedInput,
    Select,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ReplyIcon from '@mui/icons-material/Reply';
import { manageSuggestionsStyles } from '../styles/ManageSuggestionsStyles';
import { getAllSuggestions, replySuggestion, updateSuggestionStatus } from '../../services/suggestionService';
import type { Suggestion } from '../../services/suggestionService';
import { useAuth } from '../../context/authContext';

type SuggestionStatus = 'Pending' | 'Approved' | 'Rejected';

interface SuggestionRow {
    id: number;
    date: string;
    subject: string;
    description: string;
    username: string;
    status: SuggestionStatus;
    adminAnswer: string | null;
}

const normalizeSuggestion = (item: Suggestion, index: number): SuggestionRow => {
    const stateId = item.SuggestionStateID;
    return {
        id: item.SuggestionID ?? index + 1,
        date: item.SuggestedAt ? new Date(item.SuggestedAt).toLocaleDateString('es-ES') : 'No date',
        subject: item.Subject ?? '',
        description: item.Description ?? '',
        username: item.SuggestedByUser?.Username ?? 'Unknown',
        status:
        stateId === 2
            ? 'Approved'
            : stateId === 3
            ? 'Rejected'
            : 'Pending',
        adminAnswer: item.AdminAnswer ?? null,
    };
};

export default function ManageSuggestions() {
    const theme = useTheme();
    const { user } = useAuth();
    const resolvedUserId = user?.appUserId ?? (user as any)?.userId ?? (user as any)?.id;

    const [suggestions, setSuggestions] = useState<SuggestionRow[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'All' | SuggestionStatus>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [replyModalOpen, setReplyModalOpen] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState<SuggestionRow | null>(null);
    const [replyText, setReplyText] = useState('');
    const [replyLoading, setReplyLoading] = useState(false);

    const rowsPerPage = 5;

    useEffect(() => {
        const fetchSuggestions = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllSuggestions();
            setSuggestions(data.map(normalizeSuggestion));
        } catch {
            setError('Could not load suggestions.');
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
        };
        fetchSuggestions();
    }, []);

    const counts = useMemo(() => ({
        total: suggestions.length,
        pending: suggestions.filter((s) => s.status === 'Pending').length,
        approved: suggestions.filter((s) => s.status === 'Approved').length,
        rejected: suggestions.filter((s) => s.status === 'Rejected').length,
    }), [suggestions]);

    const filtered = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return suggestions.filter((s) => {
        const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
        const matchesSearch =
            s.subject.toLowerCase().includes(term) ||
            s.description.toLowerCase().includes(term) ||
            s.username.toLowerCase().includes(term);
        return matchesStatus && matchesSearch;
        });
    }, [suggestions, searchTerm, statusFilter]);

    const pageCount = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const currentPageItems = useMemo(
        () => filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage),
        [filtered, currentPage]
    );

    useEffect(() => { setCurrentPage(1); }, [searchTerm, statusFilter]);
    useEffect(() => {
        if (currentPage > pageCount) setCurrentPage(pageCount);
    }, [currentPage, pageCount]);

    const statusBg = (status: SuggestionStatus) => {
        switch (status) {
        case 'Pending': return '#f6c44b';
        case 'Approved': return '#38a169';
        case 'Rejected': return '#b02525';
        }
    };

    const handleApprove = async (id: number) => {
        try {
        await updateSuggestionStatus(id, 2, resolvedUserId);
        setSuggestions((cur) => cur.map((s) => s.id === id ? { ...s, status: 'Approved' } : s));
        } catch {
        setError('Could not update suggestion status.');
        }
    };

    const handleReject = async (id: number) => {
        try {
        await updateSuggestionStatus(id, 3, resolvedUserId);
        setSuggestions((cur) => cur.map((s) => s.id === id ? { ...s, status: 'Rejected' } : s));
        } catch {
        setError('Could not update suggestion status.');
        }
    };

    const openReplyModal = (suggestion: SuggestionRow) => {
        setSelectedSuggestion(suggestion);
        setReplyText(suggestion.adminAnswer ?? '');
        setReplyModalOpen(true);
    };

    const handleReply = async () => {
        if (!selectedSuggestion || !replyText.trim()) return;
        setReplyLoading(true);
        try {
        await replySuggestion(selectedSuggestion.id, replyText, resolvedUserId);
        setSuggestions((cur) =>
            cur.map((s) => s.id === selectedSuggestion.id ? { ...s, adminAnswer: replyText } : s)
        );
        setReplyModalOpen(false);
        setReplyText('');
        } catch {
        setError('Could not send reply.');
        } finally {
        setReplyLoading(false);
        }
    };

    return (
        <Container sx={manageSuggestionsStyles.container(theme)}>

        {/* Stats */}
        <Box sx={manageSuggestionsStyles.statsRow(theme)}>
            <Card sx={manageSuggestionsStyles.statCard(theme)}>
            <WarningAmberIcon sx={{ ...manageSuggestionsStyles.statIcon(theme), color: '#f6c44b' }} />
            <Box sx={manageSuggestionsStyles.statContent(theme)}>
                <Typography sx={manageSuggestionsStyles.statLabel(theme)}>Pending</Typography>
                <Typography sx={manageSuggestionsStyles.statNumber(theme)}>{counts.pending}</Typography>
            </Box>
            </Card>
            <Card sx={manageSuggestionsStyles.statCard(theme)}>
            <CheckCircleIcon sx={{ ...manageSuggestionsStyles.statIcon(theme), color: '#38a169' }} />
            <Box sx={manageSuggestionsStyles.statContent(theme)}>
                <Typography sx={manageSuggestionsStyles.statLabel(theme)}>Approved</Typography>
                <Typography sx={manageSuggestionsStyles.statNumber(theme)}>{counts.approved}</Typography>
            </Box>
            </Card>
            <Card sx={manageSuggestionsStyles.statCard(theme)}>
            <CancelIcon sx={{ ...manageSuggestionsStyles.statIcon(theme), color: '#b02525' }} />
            <Box sx={manageSuggestionsStyles.statContent(theme)}>
                <Typography sx={manageSuggestionsStyles.statLabel(theme)}>Rejected</Typography>
                <Typography sx={manageSuggestionsStyles.statNumber(theme)}>{counts.rejected}</Typography>
            </Box>
            </Card>
        </Box>

        {/* Header */}
        <Box sx={manageSuggestionsStyles.headerLine(theme)}>
            <Typography sx={{ color: theme.palette.common.white }}>Total: {counts.total}</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                size="small"
                sx={{ backgroundColor: '#fff', color: '#000', minWidth: 120 }}
            >
                <MenuItem value="All" sx={{ color: '#000' }}>All</MenuItem>
                <MenuItem value="Pending" sx={{ color: '#000' }}>Pending</MenuItem>
                <MenuItem value="Approved" sx={{ color: '#000' }}>Approved</MenuItem>
                <MenuItem value="Rejected" sx={{ color: '#000' }}>Rejected</MenuItem>
            </Select>
            <OutlinedInput
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                size="small"
                sx={{ ...manageSuggestionsStyles.search(theme), border: '1px solid rgba(0,0,0,0.08)' }}
                startAdornment={
                <InputAdornment position="start">
                    <SearchOutlinedIcon color="action" />
                </InputAdornment>
                }
            />
            </Box>
        </Box>

        {/* Status message */}
        <Box sx={{ mb: 2 }}>
            <Typography sx={{ color: theme.palette.grey[400], fontSize: 12 }}>
            {loading ? 'Loading suggestions...' : error ?? ''}
            </Typography>
        </Box>

        {/* Table */}
        <Box sx={{ overflowX: 'auto' }}>
            <Box sx={manageSuggestionsStyles.gridHeader(theme)}>
            <Typography sx={manageSuggestionsStyles.headerCell(theme)}>Date</Typography>
            <Typography sx={manageSuggestionsStyles.headerCell(theme)}>Status</Typography>
            <Typography sx={manageSuggestionsStyles.headerCell(theme)}>Subject</Typography>
            <Typography sx={manageSuggestionsStyles.headerCell(theme)}>Description</Typography>
            <Typography sx={{ ...manageSuggestionsStyles.headerCell(theme), textAlign: 'center' }}>Actions</Typography>
            </Box>

            {currentPageItems.map((s, i) => (
            <Box key={s.id} sx={manageSuggestionsStyles.row(theme, i)}>
                <Typography sx={{ color: theme.palette.common.white, fontSize: 13 }}>{s.date}</Typography>
                <Chip
                label={s.status}
                sx={{ backgroundColor: statusBg(s.status), color: '#fff', minWidth: 90 }}
                />
                <Typography sx={manageSuggestionsStyles.subjectText(theme)}>{s.subject}</Typography>
                <Typography sx={manageSuggestionsStyles.descriptionText(theme)}>{s.description}</Typography>
                <Box sx={manageSuggestionsStyles.actionsBox(theme)}>
                {s.status === 'Pending' ? (
                    <>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<CheckCircleOutlineIcon />}
                        onClick={() => handleApprove(s.id)}
                        sx={{ ...manageSuggestionsStyles.actionButton(theme), backgroundColor: '#38a169', '&:hover': { backgroundColor: '#2f855a' } }}
                    >
                        Approve
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<CancelOutlinedIcon />}
                        onClick={() => handleReject(s.id)}
                        sx={{ ...manageSuggestionsStyles.actionButton(theme), backgroundColor: '#b02525', '&:hover': { backgroundColor: '#9b1c1c' } }}
                    >
                        Reject
                    </Button>
                    </>
                ) : null}
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ReplyIcon />}
                    onClick={() => openReplyModal(s)}
                    sx={{ ...manageSuggestionsStyles.actionButton(theme), borderColor: '#888', color: '#fff' }}
                >
                    Reply
                </Button>
                </Box>
            </Box>
            ))}
        </Box>

        {/* Pagination */}
        <Box sx={manageSuggestionsStyles.paginationRow(theme)}>
            <Typography>{`Showing ${currentPageItems.length} rows of ${filtered.length}`}</Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button
                size="small"
                variant="outlined"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                sx={manageSuggestionsStyles.pageButton(theme)}
            >
                Previous
            </Button>
            {Array.from({ length: pageCount }, (_, i) => (
                <Button
                key={i}
                size="small"
                variant={currentPage === i + 1 ? 'contained' : 'outlined'}
                onClick={() => setCurrentPage(i + 1)}
                sx={{
                    ...manageSuggestionsStyles.pageButton(theme),
                    ...(currentPage === i + 1 ? { backgroundColor: '#ffffff', color: '#000000' } : {}),
                }}
                >
                {i + 1}
                </Button>
            ))}
            <Button
                size="small"
                variant="outlined"
                disabled={currentPage === pageCount}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, pageCount))}
                sx={manageSuggestionsStyles.pageButton(theme)}
            >
                Next
            </Button>
            </Box>
        </Box>

        {/* Reply Modal */}
        <Modal open={replyModalOpen} onClose={() => setReplyModalOpen(false)}>
            <Box sx={manageSuggestionsStyles.replyModal(theme)}>
            <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                Reply to suggestion
            </Typography>
            <Typography sx={{ color: theme.palette.grey[400], fontSize: 13, mb: 2 }}>
                {selectedSuggestion?.subject}
            </Typography>
            <TextField
                fullWidth
                multiline
                minRows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply..."
                sx={{ backgroundColor: '#2a2a2a', borderRadius: 1, input: { color: '#fff' }, textarea: { color: '#fff' }, mb: 3 }}
            />
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                variant="outlined"
                onClick={() => setReplyModalOpen(false)}
                sx={{ color: '#fff', borderColor: '#888' }}
                >
                Cancel
                </Button>
                <Button
                variant="contained"
                disabled={replyLoading || !replyText.trim()}
                onClick={handleReply}
                sx={{ backgroundColor: '#38a169', '&:hover': { backgroundColor: '#2f855a' } }}
                >
                {replyLoading ? 'Sending...' : 'Send Reply'}
                </Button>
            </Box>
            </Box>
        </Modal>

        </Container>
    );
}