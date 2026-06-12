import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  useTheme,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { commentApi } from '../../services/api';
import { manageCommentsStyles } from '../styles/ManageCommentsStyles';
import { useAuth } from '../../context/authContext';
import { getCommentReports, updateReportStatus } from '../../services/commentsService';
import type { CommentReport } from '../../types';

type CommentStatus = 'Pending' | 'Approved' | 'Rejected';

interface CommentRow {
  id: number;
  date: string;
  status: CommentStatus;
  reason: string;
  original: string;
  description: string;
}

const normalizeCommentReport = (item: CommentReport, index: number): CommentRow => {
  const raw = item as any;
  const reportId = raw.ReportID ?? raw.reportId ?? raw.id ?? Number(raw.comment_id) ?? index + 1;
  const stateName = item.ReportState?.StateName?.toString().toLowerCase();

  return {
    id: Number(reportId),
    date: item.ReportedAt ? new Date(item.ReportedAt).toLocaleDateString('es-ES') : 'Sin fecha',
    status:
      stateName === 'approved'
        ? 'Approved'
        : stateName === 'rejected'
        ? 'Rejected'
        : 'Pending',
    reason: item.MotiveReport?.MotiveName ?? 'Sin motivo',
    original: item.ReportComment?.CommentBoycott?.Description ?? 'Sin comentario original',
    description: item.UserDescription ?? '',
  };
};

const initialComments: CommentRow[] = [];

export default function ManageComments() {
  const theme = useTheme();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [comments, setComments] = useState<CommentRow[]>(initialComments);
  const [statusFilter, setStatusFilter] = useState<'All' | CommentStatus>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const rowsPerPage = 5;
  const useBackend = Boolean(import.meta.env.VITE_API_MODULE3);
  const commentsEndpoint = '/api/reports';

  const counts = useMemo(() => {
    const total = comments.length;
    const pending = comments.filter((c) => c.status === 'Pending').length;
    const approved = comments.filter((c) => c.status === 'Approved').length;
    const rejected = comments.filter((c) => c.status === 'Rejected').length;
    return { total, pending, approved, rejected };
  }, [comments]);

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return comments.filter((c) => {
      const matchesStatus = statusFilter === 'All' ? true : c.status === statusFilter;
      const matchesSearch =
        c.original.toLowerCase().includes(term) || c.description.toLowerCase().includes(term) || c.reason.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [comments, searchTerm, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const currentPageItems = useMemo(
    () => filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage),
    [filtered, currentPage, rowsPerPage]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(pageCount);
    }
  }, [currentPage, pageCount]);

  useEffect(() => {
    if (!useBackend) {
      return;
    }

    const fetchReports = async () => {
      setLoading(true);
      setError(null);

      try {
        const reports = await getCommentReports();
        const normalizedComments: CommentRow[] = reports.map(normalizeCommentReport);
        setComments(normalizedComments);
      } catch (fetchError) {
        setError('No se pudo cargar el backend de reports. No hay datos para mostrar.');
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [useBackend]);

  const statusBg = (status: CommentStatus) => {
    switch (status) {
      case 'Pending':
        return '#f6c44b';
      case 'Approved':
        return '#38a169';
      case 'Rejected':
        return '#b02525';
    }
  };

  const handleApprove = async (id: number) => {
    try {
      if (!user) {
        setError('No hay usuario autenticado.');
        return;
      }
      await updateReportStatus(id, 2, user.id);
      setComments((cur) => cur.map((c) => (c.id === id ? { ...c, status: 'Approved' } : c)));
    } catch {
      setError('No se pudo actualizar el estado del reporte.');
    }
  };

  const handleReject = async (id: number) => {
    try {
      if (!user) {
        setError('No hay usuario autenticado.');
        return;
      }
      await updateReportStatus(id, 3, user.id);
      setComments((cur) => cur.map((c) => (c.id === id ? { ...c, status: 'Rejected' } : c)));
    } catch {
      setError('No se pudo actualizar el estado del reporte.');
    }
  };

  return (
    <Container sx={manageCommentsStyles.container(theme)}>
      <Box sx={manageCommentsStyles.statsRow(theme)}>
        <Card sx={manageCommentsStyles.statCard(theme)}>
          <WarningAmberIcon sx={{ ...manageCommentsStyles.statIcon(theme), color: '#f6c44b' }} />
          <Box sx={manageCommentsStyles.statContent(theme)}>
            <Typography sx={manageCommentsStyles.statLabel(theme)}>Pending</Typography>
            <Typography sx={manageCommentsStyles.statNumber(theme)}>{counts.pending}</Typography>
          </Box>
        </Card>
        <Card sx={manageCommentsStyles.statCard(theme)}>
          <CheckCircleIcon sx={{ ...manageCommentsStyles.statIcon(theme), color: '#38a169' }} />
          <Box sx={manageCommentsStyles.statContent(theme)}>
            <Typography sx={manageCommentsStyles.statLabel(theme)}>Approved</Typography>
            <Typography sx={manageCommentsStyles.statNumber(theme)}>{counts.approved}</Typography>
          </Box>
        </Card>
        <Card sx={manageCommentsStyles.statCard(theme)}>
          <CancelIcon sx={{ ...manageCommentsStyles.statIcon(theme), color: '#b02525' }} />
          <Box sx={manageCommentsStyles.statContent(theme)}>
            <Typography sx={manageCommentsStyles.statLabel(theme)}>Rejected</Typography>
            <Typography sx={manageCommentsStyles.statNumber(theme)}>{counts.rejected}</Typography>
          </Box>
        </Card>
      </Box>

      <Box sx={manageCommentsStyles.headerLine(theme)}>
        <Typography sx={{ color: theme.palette.common.white }}>Total: {counts.total}</Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} size="small" sx={{ backgroundColor: '#fff', color: '#000000', minWidth: 120 }}>
            <MenuItem value="All" sx={{ color: '#000000' }}>
              All
            </MenuItem>
            <MenuItem value="Pending" sx={{ color: '#000000' }}>
              Pending
            </MenuItem>
            <MenuItem value="Approved" sx={{ color: '#000000' }}>
              Approved
            </MenuItem>
            <MenuItem value="Rejected" sx={{ color: '#000000' }}>
              Rejected
            </MenuItem>
          </Select>
          <OutlinedInput
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search"
                size="small"
                sx={{ ...manageCommentsStyles.search(theme), boxShadow: 'none', border: '1px solid rgba(0,0,0,0.08)' }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchOutlinedIcon color="action" />
                  </InputAdornment>
                }
              />
        </Box>
      </Box>

      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
        <Typography sx={{ color: theme.palette.grey[400], fontSize: 12 }}>
          {useBackend
            ? loading
              ? 'Cargando reports desde el backend...'
              : error
              ? error
              : ''
            : 'Backend de M3 no configurado. Mostrando datos de ejemplo.'}
        </Typography>
        {useBackend && !loading && !error && (
          <Typography sx={{ color: theme.palette.grey[400], fontSize: 12 }}>
            Endpoint: {commentsEndpoint}
          </Typography>
        )}
      </Box>

      <Box sx={{ mt: 2, overflowX: 'auto', overflowY: 'auto', maxHeight: 400 }}>
        <Box sx={manageCommentsStyles.gridHeader(theme)}>
          <Typography sx={manageCommentsStyles.headerCell(theme)}>Date</Typography>
          <Typography sx={{ ...manageCommentsStyles.headerCell(theme), textAlign: 'center' }}>Status</Typography>
          <Typography sx={manageCommentsStyles.headerCell(theme)}>Reason</Typography>
          <Typography sx={manageCommentsStyles.headerCell(theme)}>Original Comment</Typography>
          <Typography sx={manageCommentsStyles.headerCell(theme)}>Description</Typography>
          <Typography sx={{ ...manageCommentsStyles.headerCell(theme), textAlign: 'center' }}>Actions</Typography>
        </Box>

        {currentPageItems.map((c, i) => (
          <Box key={c.id} sx={manageCommentsStyles.row(theme, i)}>
            <Typography sx={{ color: theme.palette.common.white }}>{c.date}</Typography>
            <Chip label={c.status} sx={{ ...manageCommentsStyles.statusCell(theme), backgroundColor: statusBg(c.status), color: '#ffffff', minWidth: 120, textAlign: 'center', display: 'flex', justifyContent: 'center' }} />
            <Typography sx={manageCommentsStyles.reasonText(theme)}>{c.reason}</Typography>
            <Typography sx={manageCommentsStyles.originalText(theme)}>{c.original}</Typography>
            <Typography variant="body2" sx={manageCommentsStyles.descriptionText(theme)}>{c.description}</Typography>
            <Box sx={{ ...manageCommentsStyles.actionsBox(theme), justifySelf: c.status === 'Pending' ? 'end' : 'center' }}>
              {c.status === 'Pending' ? (
                <>
                  <Button variant="contained" color="success" startIcon={<CheckCircleOutlineIcon />} onClick={() => handleApprove(c.id)} sx={{ ...manageCommentsStyles.actionButton(theme), ml: 0, whiteSpace: 'nowrap' , color: '#fff', backgroundColor: '#38a169', '&:hover': { backgroundColor: '#2f855a' }}}>
                    Approve
                  </Button>
                  <Button variant="contained" color="error" startIcon={<CancelOutlinedIcon />} onClick={() => handleReject(c.id)} sx={{ ...manageCommentsStyles.actionButton(theme), whiteSpace: 'nowrap' , color: '#fff', backgroundColor: '#b02525', '&:hover': { backgroundColor: '#9b1c1c' }}}>
                    Reject
                  </Button>
                  
                </>
              ) : (
                <Typography sx={{ color: theme.palette.grey[400], fontSize: 14 }}>-</Typography>
              )  
            }
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={manageCommentsStyles.paginationRow(theme)}>
        <Typography>{`Showing ${currentPageItems.length} rows of ${filtered.length}`}</Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button
            size="small"
            variant="outlined"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            sx={manageCommentsStyles.pageButton(theme)}
          >
            Previous
          </Button>

          {Array.from({ length: pageCount }, (_, index) => (
            <Button
              key={index}
              size="small"
              variant={currentPage === index + 1 ? 'contained' : 'outlined'}
              onClick={() => setCurrentPage(index + 1)}
              sx={{
                ...manageCommentsStyles.pageButton(theme),
                ...(currentPage === index + 1 ? { backgroundColor: '#ffffff', color: '#000000' } : {}),
              }}
            >
              {index + 1}
            </Button>
          ))}

          <Button
            size="small"
            variant="outlined"
            disabled={currentPage === pageCount}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
            sx={manageCommentsStyles.pageButton(theme)}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
}