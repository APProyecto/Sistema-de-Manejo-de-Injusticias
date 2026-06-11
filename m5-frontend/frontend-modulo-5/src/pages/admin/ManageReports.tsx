import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { commentApi } from '../../services/api';

import { manageReportsStyles } from '../styles/ManageReportsStyles';

type ReportStatus = 'Pending' | 'Approved' | 'Rejected';

type ReportItem = {
  id: number;
  postId: number;
  reportTitle: string;
  reporter: string;
  reportDetails: string;
  reportTime: string;
  reportCount: number;
  status: ReportStatus;
  reportUserId: string;
};

const initialReports: ReportItem[] = [
  {
    id: 1,
    postId: 101,
    reportTitle: 'This post is obsolete',
    reporter: 'user123',
    reportDetails:
      'Hello, I have seen this post claiming Johnson & Johnson uses Tylenol, however those products were discontinued, this is misleading and irrelevant, please take action.',
    reportTime: '2026-06-09 14:32',
    reportCount: 7,
    status: 'Pending',
    reportUserId: 'user123',
  },
  {
    id: 2,
    postId: 102,
    reportTitle: 'McDonald’s doesn’t use pink slime!',
    reporter: 'user124',
    reportDetails:
      'A user claims pink slime is used in McDonald’s food, which is not correct.',
    reportTime: '2026-06-08 11:10',
    reportCount: 12,
    status: 'Pending',
    reportUserId: 'user124',
  },
  {
    id: 3,
    postId: 103,
    reportTitle: 'Unverified health claim',
    reporter: 'user127',
    reportDetails:
      'Using X product cures all illnesses, but there is no evidence.',
    reportTime: '2026-06-06 09:05',
    reportCount: 12,
    status: 'Approved',
    reportUserId: 'user127',
  },
  {
    id: 4,
    postId: 104,
    reportTitle: 'Political hate post',
    reporter: 'user129',
    reportDetails:
      'A message attacking a group based on political affiliation.',
    reportTime: '2026-06-07 18:22',
    reportCount: 5,
    status: 'Rejected',
    reportUserId: 'user129',
  },
];

const tabs = ['Posts', 'Unresolved', 'All'] as const;

type ReportTab = (typeof tabs)[number];

const reportsEndpoint =
  import.meta.env.VITE_REPORTS_MODERATION_ENDPOINT ?? '/api/reports/getAll?SortBy=0';
const useBackend = Boolean(import.meta.env.VITE_API_MODULE3);

function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  const now = new Date();
  const diff = Math.max(0, now.getTime() - date.getTime());
  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) return `${weeks}w ago`;
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'just now';
}

export default function ManageReports() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<ReportTab>('Posts');
  const [reports, setReports] = useState<ReportItem[]>(initialReports);
  const [selectedReportId, setSelectedReportId] = useState<number>(initialReports[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  const visibleItems = useMemo(() => {
    if (currentTab === 'Posts') {
      const grouped = reports.reduce<Record<number, ReportItem>>((acc, report) => {
        if (!acc[report.postId] || report.status === 'Pending') {
          acc[report.postId] = report;
        }
        return acc;
      }, {});
      return Object.values(grouped);
    }

    if (currentTab === 'Unresolved') {
      return reports.filter((report) => report.status === 'Pending');
    }

    return reports;
  }, [currentTab, reports]);

  const activeReport = useMemo(() => {
    return reports.find((report) => report.id === selectedReportId) ?? reports[0];
  }, [reports, selectedReportId]);

  useEffect(() => {
    if (visibleItems.length && !visibleItems.some((item) => item.id === selectedReportId)) {
      setSelectedReportId(visibleItems[0].id);
    }
  }, [visibleItems, selectedReportId]);

  const handleTabChange = (tab: ReportTab) => {
    setCurrentTab(tab);
  };

  const handleSelectItem = (id: number) => {
    setSelectedReportId(id);
    setReplyOpen(false);
    setReplyText('');
  };

  const handleApprove = (id: number) => {
    setReports((current) => current.map((item) => (item.id === id ? { ...item, status: 'Approved' } : item)));
  };

  const handleReject = (id: number) => {
    setReports((current) => current.map((item) => (item.id === id ? { ...item, status: 'Rejected' } : item)));
  };

  const handleSendReply = () => {
    setReplyOpen(false);
    setReplyText('');
  };

  useEffect(() => {
    if (!useBackend) {
      return;
    }

    const fetchReports = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await commentApi.get<any>(reportsEndpoint);
        const rawReports =
          Array.isArray(response.data)
            ? response.data
            : response.data?.reports ?? response.data?.data ?? [];
        const normalizedReports: ReportItem[] = (rawReports as any[]).map((item) => ({
          id: item.id ?? item.report_id ?? Date.now(),
          postId: item.post_id ?? item.postId ?? 0,
          reportTitle: item.report_title || item.title || item.reason || 'Reported item',
          reporter: item.reporter || item.username || item.reported_by || item.reportedBy || 'Unknown',
          reportDetails:
            item.report_details || item.details || item.description || item.report_description || item.report_text || '',
          reportTime:
            item.report_time || item.created_at || item.createdAt || item.date || item.reported_at || 'Unknown date',
          reportCount: Number(item.report_count ?? item.count ?? 1),
          status: ['Pending', 'Approved', 'Rejected'].includes(item.status) ? item.status : 'Pending',
          reportUserId: item.reporter || item.username || item.reported_by || item.reportedBy || 'Unknown',
        }));

        setReports(normalizedReports.length ? normalizedReports : initialReports);
      } catch (fetchError) {
        setError('No se pudo cargar el backend de reports. Usando datos de ejemplo.');
        setReports(initialReports);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const reportCountForPost = useMemo(() => {
    return reports.reduce<Record<number, number>>((acc, item) => {
      acc[item.postId] = (acc[item.postId] ?? 0) + 1;
      return acc;
    }, {});
  }, [reports]);

  return (
    <Container sx={manageReportsStyles.container(theme)}>
      <Typography variant="h5" sx={manageReportsStyles.headerTitle(theme)}>
        Manage Reports
      </Typography>

      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        <Typography sx={{ color: theme.palette.grey[400], fontSize: 12 }}>
          {useBackend
            ? loading
              ? 'Cargando reportes desde el backend...'
              : error
              ? error
              : 'Reportes cargados desde el backend de M3.'
            : 'No se ha configurado el backend M3. Usando datos de ejemplo.'}
        </Typography>
        {useBackend && !loading && !error && (
          <Typography sx={{ color: theme.palette.grey[400], fontSize: 12 }}>
            Endpoint: {reportsEndpoint}
          </Typography>
        )}
      </Box>

      <Box sx={manageReportsStyles.tabsRow(theme)}>
        {tabs.map((tab) => (
          <Button key={tab} onClick={() => handleTabChange(tab)} sx={manageReportsStyles.tabButton(theme, currentTab === tab)}>
            {tab}
          </Button>
        ))}
      </Box>

      <Box sx={manageReportsStyles.contentArea(theme)}>
        <Box sx={manageReportsStyles.leftPanel(theme)}>
          {visibleItems.map((item) => (
            <Card key={item.id} sx={manageReportsStyles.reportCard(theme, item.id === selectedReportId)} onClick={() => handleSelectItem(item.id)}>
              <Box sx={manageReportsStyles.listHeader(theme)}>
                <Avatar sx={manageReportsStyles.listAvatar(theme)}>{item.reporter.charAt(0).toUpperCase()}</Avatar>
                <Box sx={manageReportsStyles.listText(theme)}>
                  <Typography sx={manageReportsStyles.reporterName(theme)}>{item.reporter}</Typography>
                  <Typography sx={manageReportsStyles.reportTitle(theme)}>{item.reportTitle}</Typography>
                  {currentTab !== 'Posts' ? (
                    <Typography sx={manageReportsStyles.reportMeta(theme)}>{formatRelativeTime(item.reportTime)}</Typography>
                  ) : null}
                </Box>
                {currentTab === 'Posts' ? (
                  <Box sx={manageReportsStyles.countBadge(theme)}>{reportCountForPost[item.postId]}</Box>
                ) : null}
              </Box>
            </Card>
          ))}
        </Box>

        <Box sx={manageReportsStyles.rightPanel(theme)}>
          <Card sx={manageReportsStyles.detailCard(theme)}>
            <Box sx={manageReportsStyles.detailHeader(theme)}>
              <Box sx={manageReportsStyles.detailAuthor(theme)}>
                <Avatar sx={manageReportsStyles.detailAvatar(theme)}>{activeReport.reporter.charAt(0).toUpperCase()}</Avatar>
                <Box>
                  <Typography sx={manageReportsStyles.detailAuthorName(theme)}>{activeReport.reporter}</Typography>
                  <Typography sx={manageReportsStyles.timestamp(theme)}>{activeReport.reportTime}</Typography>
                </Box>
              </Box>
              <Button variant="contained" onClick={() => navigate(`/detailed-post/${activeReport.postId}`)} sx={manageReportsStyles.actionButton(theme)}>
                Go to Post View
              </Button>
            </Box>

            <Typography sx={manageReportsStyles.reportHeading(theme)}>{activeReport.reportTitle}</Typography>
            <Typography sx={manageReportsStyles.reportBody(theme)}>{activeReport.reportDetails}</Typography>

            <Box sx={manageReportsStyles.actionRow(theme)}>
              {activeReport.status === 'Pending' ? (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircleOutlineIcon />}
                    onClick={() => handleApprove(activeReport.id)}
                    sx={{ ...manageReportsStyles.actionButton(theme), ml: 0, whiteSpace: 'nowrap' , color: '#fff', backgroundColor: '#38a169', '&:hover': { backgroundColor: '#2f855a' }}}>
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<CancelOutlinedIcon />}
                    onClick={() => handleReject(activeReport.id)}
                    sx={{ ...manageReportsStyles.actionButton(theme), whiteSpace: 'nowrap' , color: '#fff', backgroundColor: '#b02525', '&:hover': { backgroundColor: '#9b1c1c' }}}>
                    Reject
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    startIcon={<ReplyOutlinedIcon />}
                    onClick={() => setReplyOpen(true)}
                    sx={{ ...manageReportsStyles.actionButton(theme), whiteSpace: 'nowrap' , color: '#fff', backgroundColor: '#3182ce', '&:hover': { backgroundColor: '#2b6cb0' }}}>
                    Reply
                  </Button>
                </>
              ) : (
                <>
                  <Box sx={manageReportsStyles.statusTag(theme, activeReport.status)}>
                    {activeReport.status}
                  </Box>
                  <Button
                    variant="contained"
                    color="info"
                    startIcon={<ReplyOutlinedIcon />}
                    onClick={() => setReplyOpen(true)}
                    sx={manageReportsStyles.actionButton(theme)}
                  >
                    Reply
                  </Button>
                </>
              )}
            </Box>
          </Card>

          {replyOpen && (
            <Card sx={manageReportsStyles.responderCard(theme)}>
              <Box sx={manageReportsStyles.replyHeader(theme)}>
                <Avatar sx={{ bgcolor: theme.palette.grey[700], width: 28, height: 28 }}>To</Avatar>
                <Typography sx={{ color: theme.palette.common.white, fontWeight: 700 }}>To {activeReport.reporter}</Typography>
              </Box>
              <TextField
                multiline
                rows={5}
                value={replyText}
                onChange={(event) => setReplyText(event.target.value)}
                placeholder="Write a response for the reporter..."
                variant="outlined"
                sx={manageReportsStyles.replyInput(theme)}
              />
              <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
                <Button variant="contained" color="primary" disabled={!replyText.trim()} onClick={handleSendReply} sx={manageReportsStyles.actionButton(theme)}>
                  Send
                </Button>
                <Button variant="outlined" color="error" onClick={() => { setReplyOpen(false); setReplyText(''); }} sx={manageReportsStyles.actionButton(theme)}>
                  Discard
                </Button>
              </Box>
            </Card>
          )}
        </Box>
      </Box>
    </Container>
  );
}
