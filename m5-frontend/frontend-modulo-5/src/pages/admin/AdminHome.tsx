import { Container, Typography, Card, CardContent, Button, Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { homeStyles } from '../styles/HomeStyles';

const adminOptions = [
  {
    label: 'Manage Users',
    description: 'Assign roles and manage user statuses',
    path: '/admin/manage-users',
    icon: <PeopleAltOutlinedIcon fontSize='large' />,    
  },
  {
    label: 'Manage Reports',
    description: 'Review and act on user reports',
    path: '/admin/manage-reports',
    icon: <ReportProblemOutlinedIcon fontSize='large' />,    
  },
  {
    label: 'Manage Comments',
    description: 'Moderate comments and flagged content',
    path: '/admin/manage-comments',
    icon: <CommentOutlinedIcon fontSize='large' />,    
  },
  {
    label: 'Statistics',
    description: 'View application usage and admin metrics',
    path: '/admin/statistics',
    icon: <QueryStatsOutlinedIcon fontSize='large' />,    
  },
  {
    label: 'Queries',
    description: 'Inspect advanced search and filters',
    path: '/admin/queries',
    icon: <BalanceOutlinedIcon fontSize='large' />,    
  },
  {
    label: 'Cases of Injustice',
    description: 'Track cases and legal status updates',
    path: '/admin/cases-of-injustice',
    icon: <ArticleOutlinedIcon fontSize='large' />,    
  },
  {
    label: 'Logs',
    description: 'Track logs and system updates',
    path: '/admin/logs',
    icon: <ArticleOutlinedIcon fontSize='large' />,    
  }
];

export default function AdminHome() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container sx={homeStyles.container(theme)}>
      <Box sx={{ width: '100%', mb: 4 }}>
        <Typography variant='h4' sx={{ fontWeight: 700, mb: 1 }}>
          Admin Home
        </Typography>
        <Typography variant='body1' sx={{ color: theme.palette.text.secondary, maxWidth: 760 }}>
          Use the admin control panel to manage users, reports, comments, statistics, queries, and cases. Select any option to open the corresponding admin tool.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 24,
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          width: '100%',
        }}
      >
        {adminOptions.map((option) => (
          <Card
            key={option.label}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 3,
              minHeight: 205,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, color: theme.palette.primary.main }}>
                {option.icon}
                <Typography variant='h6' sx={{ fontWeight: 700 }}>
                  {option.label}
                </Typography>
              </Box>
              <Typography variant='body2' sx={{ color: theme.palette.text.secondary }}>
                {option.description}
              </Typography>
            </CardContent>
            <Box sx={{ p: 3, pt: 0 }}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                onClick={() => navigate(option.path)}
                sx={{ textTransform: 'none' }}
              >
                Open {option.label}
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
