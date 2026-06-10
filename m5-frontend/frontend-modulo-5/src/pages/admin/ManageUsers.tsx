import { useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Tab,
  Tabs,
  Typography,
  useTheme,
  Chip,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { manageUsersStyles } from '../styles/ManageUsersStyles';

interface ManageUserRow {
  id: number;
  name: string;
  username: string;
  email: string;
  role: 'user' | 'admin' | 'master';
  status: 'Active' | 'Suspended' | 'Deactivated' | 'Pending';
}

const initialUsers: ManageUserRow[] = [
  {
    id: 1,
    name: 'User1',
    username: '@user1',
    email: 'user1@example.com',
    role: 'user',
    status: 'Active',
  },
  {
    id: 2,
    name: 'User2',
    username: '@user2',
    email: 'user2@example.com',
    role: 'user',
    status: 'Suspended',
  },
  {
    id: 3,
    name: 'User3',
    username: '@user3',
    email: 'user3@example.com',
    role: 'admin',
    status: 'Active',
  },
  {
    id: 4,
    name: 'User4',
    username: '@user4',
    email: 'user4@example.com',
    role: 'user',
    status: 'Deactivated',
  },
  {
    id: 5,
    name: 'User5',
    username: '@user5',
    email: 'user5@example.com',
    role: 'admin',
    status: 'Pending',
  },
];

export default function ManageUsers() {
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<ManageUserRow[]>(initialUsers);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesTab = tabIndex === 0 ? user.role === 'user' : user.role !== 'user';
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        user.name.toLowerCase().includes(searchLower) ||
        user.username.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower);
      return matchesTab && matchesSearch;
    });
  }, [users, searchTerm, tabIndex]);

  const handleRoleToggle = (id: number) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? {
              ...user,
              role: user.role === 'user' ? 'admin' : 'user',
            }
          : user,
      ),
    );
  };

  const handleStatusChange = (id: number, status: ManageUserRow['status']) => {
    setUsers((current) =>
      current.map((user) => (user.id === id ? { ...user, status } : user)),
    );
  };

  const statusBgColor = (status: ManageUserRow['status']) => {
    switch (status) {
      case 'Active':
        return '#f6c44b';
      case 'Suspended':
        return '#f08a24';
      case 'Deactivated':
        return '#b02525';
      case 'Pending':
        return '#8a8f94';
      default:
        return '#8a8f94';
    }
  };

  return (
    <Container maxWidth="xl" sx={manageUsersStyles.container(theme)}>

      <Card sx={manageUsersStyles.card(theme)}>
        
        <Box sx={manageUsersStyles.innerPanel(theme)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Tabs
              value={tabIndex}
              onChange={(_, value) => setTabIndex(value)}
              textColor="primary"
              indicatorColor="primary"
              sx={{
                ...manageUsersStyles.tabs(theme),
                '& .MuiTabs-indicator': { backgroundColor: '#f6c44b' },
                '& .MuiTab-root.Mui-selected': { color: '#f6c44b' },
              }}
            >
              <Tab label="Registered users" sx = {{ color: '#ffffff' }}/>
              <Tab label="Administrators" sx = {{ color: '#ffffff' }} />
            </Tabs>
            <Box sx={manageUsersStyles.totalBox(theme)}>
          <Avatar sx={{ bgcolor: '#f6c44b', color: '#000' }}>
            <PeopleAltOutlinedIcon />
          </Avatar>
          <Typography sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Total: {users.length}</Typography>
        </Box>
            <Box sx={manageUsersStyles.toolbar(theme)}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Showing {filteredUsers.length} {tabIndex === 0 ? 'registered users' : 'administrators'}
              </Typography>
              <OutlinedInput
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search"
                size="small"
                sx={{ ...manageUsersStyles.search(theme), boxShadow: 'none', border: '1px solid rgba(0,0,0,0.08)' }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchOutlinedIcon color="action" />
                  </InputAdornment>
                }
              />
            </Box>

            <Box sx={manageUsersStyles.gridHeader(theme)}>
              <Typography variant="caption" sx={manageUsersStyles.headerCaption(theme)}>
                User
              </Typography>
              <Typography variant="caption" sx={manageUsersStyles.headerCaption(theme)}>
                Current Status
              </Typography>
              <Typography variant="caption" sx={manageUsersStyles.headerCaption(theme)}>
                Select New Status
              </Typography>
              <Typography variant="caption" sx={manageUsersStyles.headerCaption(theme)}>
                Change Role
              </Typography>
            </Box>

            {filteredUsers.map((user, index) => (
              <Box key={user.id} sx={manageUsersStyles.row(theme, index)}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: '#f6c44b', width: 42, height: 42, color: '#000' }}>{user.name.charAt(0)}</Avatar>
                  <Box>
                    <Typography sx={manageUsersStyles.userName(theme)}>{user.name}</Typography>
                    <Typography variant="body2" sx={manageUsersStyles.userMeta(theme)}>
                      {user.username} · {user.email}
                    </Typography>
                  </Box>
                </Box>

                <Chip label={user.status} sx={{ backgroundColor: statusBgColor(user.status), color: '#fff', ...manageUsersStyles.statusChip(theme) }} />

                <FormControl fullWidth variant="outlined" size="small" sx={manageUsersStyles.selectControl(theme)}>
                  <Select value={user.status} onChange={(event) => handleStatusChange(user.id, event.target.value as ManageUserRow['status'])} sx={{ borderRadius: 2 , color: '#000000b6'}}>
                    <MenuItem value="Active" sx={{ color: '#000000b6' }}>Active</MenuItem>
                    <MenuItem value="Suspended" sx={{ color: '#000000b6' }}>Suspended</MenuItem>
                    <MenuItem value="Deactivated" sx={{ color: '#000000b6' }}>Deactivated</MenuItem>
                    <MenuItem value="Pending" sx={{ color: '#000000b6' }}>Pending</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant={user.role === 'admin' ? 'contained' : 'outlined'}
                  color={user.role === 'admin' ? 'primary' : 'inherit'}
                  onClick={() => handleRoleToggle(user.id)}
                  sx={manageUsersStyles.adminButton(theme, user.role === 'admin')}
                  startIcon={<AdminPanelSettingsOutlinedIcon />}
                >
                  {user.role === 'admin' ? 'Revoke admin' : 'Make admin'}
                </Button>
              </Box>
            ))}

            {filteredUsers.length === 0 && (
              <Box sx={manageUsersStyles.emptyBox(theme)}>
                <Typography sx={{ color: theme.palette.text.secondary }}>No users found for this filter.</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
