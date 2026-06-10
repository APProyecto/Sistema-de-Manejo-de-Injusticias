import { useMemo, useState } from 'react';
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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { manageCommentsStyles } from '../styles/ManageCommentsStyles';

type CommentStatus = 'Pending' | 'Approved' | 'Rejected';

interface CommentRow {
  id: number;
  date: string;
  status: CommentStatus;
  reason: string;
  original: string;
  description: string;
}

const initialComments: CommentRow[] = [
  { id: 1, date: '13/04/2026', status: 'Pending', reason: 'Fake News', original: 'This people use pink slime.', description: 'Accusations are proven to be false.' },
  { id: 2, date: '17/04/2026', status: 'Pending', reason: 'Hate Speech', original: 'These libs are getting crazy nowadays.', description: 'Hate based on political preferences.' },
  { id: 3, date: '19/04/2026', status: 'Pending', reason: 'Inappropriate', original: 'Do women even have a word on this?', description: 'Comment includes sexism and misogyny.' },
  { id: 4, date: '20/04/2026', status: 'Approved', reason: 'Resolved', original: 'Thanks for the info.', description: 'Helpful comment.' },
  { id: 5, date: '22/04/2026', status: 'Rejected', reason: 'Spam', original: 'Buy cheap watches now!', description: 'Promotional spam.' },
];

export default function ManageComments() {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [comments, setComments] = useState<CommentRow[]>(initialComments);
  const [statusFilter, setStatusFilter] = useState<'All' | CommentStatus>('All');

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

  const handleApprove = (id: number) => {
    setComments((cur) => cur.map((c) => (c.id === id ? { ...c, status: 'Approved' } : c)));
  };

  const handleReject = (id: number) => {
    setComments((cur) => cur.map((c) => (c.id === id ? { ...c, status: 'Rejected' } : c)));
  };

  const handleDelete = (id: number) => {
    setComments((cur) => cur.filter((c) => c.id !== id));
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

      <Box sx={{ mt: 2, overflowX: 'auto' }}>
        <Box sx={manageCommentsStyles.gridHeader(theme)}>
          <Typography sx={manageCommentsStyles.headerCell(theme)}>Date</Typography>
          <Typography sx={{ ...manageCommentsStyles.headerCell(theme), textAlign: 'center' }}>Status</Typography>
          <Typography sx={manageCommentsStyles.headerCell(theme)}>Reason</Typography>
          <Typography sx={manageCommentsStyles.headerCell(theme)}>Original Comment</Typography>
          <Typography sx={manageCommentsStyles.headerCell(theme)}>Description</Typography>
          <Typography sx={{ ...manageCommentsStyles.headerCell(theme), textAlign: 'center' }}>Actions</Typography>
        </Box>

        {filtered.map((c, i) => (
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
                  <IconButton color="error" onClick={() => handleDelete(c.id)} sx={manageCommentsStyles.actionButton(theme)}>
                    <DeleteOutlineIcon sx={{ color: '#ff0000'}} />
                  </IconButton>
                </>
              ) : (
                <IconButton color="error" onClick={() => handleDelete(c.id)} sx={manageCommentsStyles.actionButton(theme)}>
                  <DeleteOutlineIcon sx={{ color: '#ff0000'}} />
                </IconButton>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}