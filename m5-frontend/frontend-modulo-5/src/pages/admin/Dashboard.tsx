import { Container, Typography, Card, Grid, Box, useTheme, Avatar } from '@mui/material';
import { DashboardStyles } from '../styles/DashboardStyles';
import { useEffect, useState } from 'react';

const API_BASE_URL = 'https://fair-boycott.sytes.net/api';

type DashboardSummaryResponse = {
  ok: boolean;
  data: {
    activeBoycotts: number;
    totalUsers: number;
    reportsToday: number;
    boycottReportsToday: number;
    commentReportsToday: number;
  };
};

type ImmediateActionAlertsResponse = {
  ok: boolean;
  data: {
    alerts: AlertCompany[];
    totalAlerts: number;
    consideredStates: string[];
  };
};

type AlertCompany = {
  entityId: number;
  entityName: string;
  totalReports: number;
  pendingReports: number;
  checkedReports: number;
  boycottReports: number;
  commentReports: number;
  boycotts: AlertBoycott[];
};

type AlertBoycott = {
  boycottId: number;
  title: string;
  pendingReports: number;
  checkedReports: number;
  boycottReports: number;
  commentReports: number;
  totalReports: number;
};

export default function Dashboard() {
  const theme = useTheme();

  const [selectedCompany, setSelectedCompany] = useState<string>('None');
  const [activeBoycotts, setActiveBoycotts] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [reportsToday, setReportsToday] = useState<number>(0);
  const [companies, setCompanies] = useState<AlertCompany[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();

    const loadDashboardData = async () => {
      try {
        const [summaryResponse, alertsResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/metrics/dashboard-summary`, {
            signal: abortController.signal,
          }),
          fetch(`${API_BASE_URL}/metrics/immediate-action-alerts`, {
            signal: abortController.signal,
          }),
        ]);

        if (!summaryResponse.ok || !alertsResponse.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const summaryData: DashboardSummaryResponse = await summaryResponse.json();
        const alertsData: ImmediateActionAlertsResponse = await alertsResponse.json();

        if (summaryData.ok) {
          setActiveBoycotts(summaryData.data.activeBoycotts);
          setTotalUsers(summaryData.data.totalUsers);
          setReportsToday(summaryData.data.reportsToday);
        }

        if (alertsData.ok) {
          setCompanies(alertsData.data.alerts);
        }
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Dashboard fetch error:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Container sx={(theme) => ({ backgroundColor: theme.palette.background.default, overflowY: 'auto' })}>
      <Box sx={{ margin: 5 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }} key="Dashboard-Top-1">
            <Card sx={DashboardStyles.GridCard(theme)}>
              <Box sx={DashboardStyles.GridBox(theme)}>
                <Typography variant="h4" sx={DashboardStyles.TypographyTitle(theme)} gutterBottom>
                  Active Boycotts
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {loading ? '...' : activeBoycotts}
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }} key="Dashboard-Top-2">
            <Card sx={DashboardStyles.GridCard(theme)}>
              <Box sx={DashboardStyles.GridBox(theme)}>
                <Typography variant="h4" sx={DashboardStyles.TypographyTitle(theme)} gutterBottom>
                  Users
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {loading ? '...' : totalUsers}
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }} key="Dashboard-Top-3">
            <Card sx={DashboardStyles.GridCard(theme)}>
              <Box sx={DashboardStyles.GridBox(theme)}>
                <Typography variant="h4" sx={DashboardStyles.TypographyTitle(theme)} gutterBottom>
                  Reports 
                </Typography>
                <Typography variant="h4" color="text.secondary" gutterBottom>
                  {loading ? '...' : reportsToday}
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ background: theme.palette.grey[100], borderRadius: 10, margin: 5, px: 5, py: 3 }}>
        <Typography variant="h5" sx={{ color: theme.palette.primary.main, marginX: 'auto' }} gutterBottom>
          IMMEDIATE ACTION ALERTS
        </Typography>

        {companies.map((company) => (
          <Box
            key={company.entityId}
            onClick={() => {
              setSelectedCompany(company.entityName);
            }}
          >
            <Box sx={DashboardStyles.companiesBox(theme)}>
              <Box sx={DashboardStyles.companiesItemsBox()}>
                <Avatar
                  alt={company.entityName}
                  sx={{
                    ml: 4,
                    mr: 4,
                    my: 'auto',
                    width: 50,
                    height: 50,
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    fontWeight: 700,
                  }}
                >
                  {company.entityName.charAt(0).toUpperCase()}
                </Avatar>

                <Typography variant="h6" sx={{ my: 'auto', ml: 2 }}>
                  {company.entityName}
                </Typography>
              </Box>

              <Box sx={DashboardStyles.companiesItemsBox()}>
                <Typography variant="h6" sx={{ textAlign: 'center', my: 'auto', mx: 'auto' }}>
                  {company.totalReports} Reports
                </Typography>
              </Box>

              <Box sx={DashboardStyles.companiesItemsBox()}>
                <Typography variant="h6" sx={{ my: 'auto', ml: 'auto', mr: 5 }}>
                  {company.pendingReports} Pending / {company.checkedReports} Checked
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}

        {!loading && companies.length === 0 && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            No alerts found.
          </Typography>
        )}
      </Box>
    </Container>
  );
}