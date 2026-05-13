import { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Paper,
  Stack,
  Divider,
  Alert,
  Chip,
  Avatar,
  IconButton,
  TextField,
  Grid,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  Badge,
  Rating,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import {
  Home as HomeIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Favorite as FavoriteIcon,
  ThumbUp as ThumbUpIcon,
  Star as StarIcon,
  FormatListBulleted as ListIcon,
} from '@mui/icons-material';

const DRAWER_WIDTH = 200;

export default function Guide() {
  const [ratingValue, setRatingValue] = useState<number | null>(4);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');

  const navItems = [
    { label: 'Home', icon: <HomeIcon fontSize="small" /> },
    { label: 'Boycotts', icon: <ListIcon fontSize="small" /> },
    { label: 'Settings', icon: <SettingsIcon fontSize="small" /> },
    { label: 'About', icon: <InfoIcon fontSize="small" /> },
  ];

  const companies = [
    {
      name: 'Nestlé',
      desc: 'Questionable practices in the food industry.',
      tags: ['Food', 'Switzerland'],
    },
    {
      name: 'Shell',
      desc: 'Environmental damage and contribution to conflicts.',
      tags: ['Energy', 'Netherlands'],
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* ── AppBar ── */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 2 }}
            onClick={() => setDrawerOpen(true)}
          >
            <ListIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MUI Components Guide
          </Typography>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </Toolbar>
      </AppBar>

      {/* ── Drawer ── */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
      >
        <Toolbar />
        <List>
          {navItems.map(({ label, icon }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton
                selected={activeNav === label}
                onClick={() => {
                  setActiveNav(label);
                  setDrawerOpen(false);
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Container>

        {/* ══════════════════════════════════════
            1. TYPOGRAPHY
        ══════════════════════════════════════ */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            1. Typography
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Stack spacing={0.5}>
            <Typography variant="h1">h1 — Main title</Typography>
            <Typography variant="h2">h2 — Section heading</Typography>
            <Typography variant="h3">h3 — Subsection</Typography>
            <Typography variant="h4">h4 — Card heading</Typography>
            <Typography variant="h5">h5 — Sub-card title</Typography>
            <Typography variant="h6">h6 — Small title</Typography>
            <Typography variant="body1">
              body1 — Regular paragraph text for descriptions and longer content.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              body2 — Important part of a paragraph.
            </Typography>
            <Typography variant="caption" sx={{ display: 'block' }}>
              caption — Dates, fine print, tooltips
            </Typography>
            <Typography variant="overline" sx={{ display: 'block' }}>
              overline — Category labels / badges
            </Typography>
          </Stack>

          <Alert severity="info" sx={{ mt: 2 }}>
            Common: <code>h4</code> for page titles · <code>h6</code> for card titles ·{' '}
            <code>{'body2 color="text.secondary"'}</code> for descriptions
          </Alert>
        </Paper>

        {/* ══════════════════════════════════════
            2. CARD
        ══════════════════════════════════════ */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            2. Card
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={3}>
            {companies.map((company) => (
              <Grid size={{ xs: 12, md: 6 }} key={company.name}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {company.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {company.desc}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Chip label={company.tags[0]} size="small" />
                      <Chip label={company.tags[1]} size="small" variant="outlined" />
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="outlined">
                      Details
                    </Button>
                    <IconButton size="small" color="error" sx={{ ml: 'auto' }}>
                      <FavoriteIcon fontSize="small" />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Alert severity="success" sx={{ mt: 2 }}>
            <code>CardContent</code> holds the body · <code>CardActions</code> holds buttons ·
            wrap in a <code>Grid</code> for responsive layouts
          </Alert>
        </Paper>

        {/* ══════════════════════════════════════
            3. BUTTON + ICONBUTTON
        ══════════════════════════════════════ */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            3. Button &amp; IconButton
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Stack spacing={2}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                variant
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
                <Button variant="text">Text</Button>
              </Box>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                color + size
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                <Button variant="contained" color="success" size="small">Approve</Button>
                <Button variant="outlined" color="error" size="small">Reject</Button>
                <Divider orientation="vertical" flexItem />
                <IconButton color="primary" aria-label="like">
                  <ThumbUpIcon />
                </IconButton>
                <IconButton color="error" aria-label="favorite">
                  <FavoriteIcon />
                </IconButton>
                <IconButton color="warning" aria-label="star">
                  <StarIcon />
                </IconButton>
              </Box>
            </Box>
          </Stack>

          <Alert severity="info" sx={{ mt: 2 }}>
            Use <code>contained</code> for primary CTA · <code>outlined</code> for secondary ·{' '}
            <code>IconButton</code> for toolbar actions
          </Alert>
        </Paper>

        {/* ══════════════════════════════════════
            4. TEXTFIELD
        ══════════════════════════════════════ */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            4. TextField
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Stack spacing={2}>
            <TextField label="Company name" variant="outlined" fullWidth />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              placeholder="Why is this company being boycotted?"
            />
            <TextField label="Country" variant="outlined" size="small" />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField type="email" label="Email" variant="outlined" size="small" fullWidth />
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
          </Stack>

          <Alert severity="success" sx={{ mt: 2 }}>
            Add <code>fullWidth</code> to span the container · <code>size="small"</code> for
            compact forms · <code>multiline rows</code> for textareas
          </Alert>
        </Paper>

        {/* ══════════════════════════════════════
            5. CHIP + AVATAR + BADGE
        ══════════════════════════════════════ */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            5. Chip, Avatar &amp; Badge
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Stack spacing={2}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Chip — filters &amp; tags
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label="Technology" color="primary" size="small" />
                <Chip label="War" color="error" size="small" />
                <Chip label="Approved" color="success" size="small" />
                <Chip label="Pending" color="warning" size="small" variant="outlined" />
              </Box>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Avatar + Badge
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#667eea' }}>AG</Avatar>
                <Avatar sx={{ bgcolor: '#f56565' }}>JS</Avatar>
                <Avatar sx={{ bgcolor: '#48bb78' }}>MR</Avatar>
                <Badge badgeContent={5} color="error">
                  <NotificationsIcon />
                </Badge>
                <Badge badgeContent="new" color="success">
                  <HomeIcon />
                </Badge>
              </Box>
            </Box>
          </Stack>

          <Alert severity="info" sx={{ mt: 2 }}>
            <code>Chip</code> for categories/filters · <code>Avatar</code> for user photos/initials ·{' '}
            <code>Badge</code> for notification counts
          </Alert>
        </Paper>

        {/* ══════════════════════════════════════
            6. ALERT
        ══════════════════════════════════════ */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            6. Alert
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Stack spacing={1}>
            <Alert severity="success">Boycott created successfully!</Alert>
            <Alert severity="error">Error: that email is already registered.</Alert>
            <Alert severity="warning">Warning: please verify the data before submitting.</Alert>
            <Alert severity="info">30 people have already supported this boycott.</Alert>
          </Stack>

          <Alert severity="info" sx={{ mt: 2 }}>
            severity options: <code>"success"</code> · <code>"error"</code> ·{' '}
            <code>"warning"</code> · <code>"info"</code>
          </Alert>
        </Paper>

        {/* ══════════════════════════════════════
            7. PROGRESS
        ══════════════════════════════════════ */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            7. CircularProgress &amp; LinearProgress
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Stack spacing={2}>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <CircularProgress size={32} />
              <CircularProgress size={32} color="success" />
              <Typography variant="body2" color="text.secondary">
                CircularProgress — inline loading spinner
              </Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                LinearProgress — page-level loading bar
              </Typography>
              <LinearProgress />
            </Box>
          </Stack>

          <Alert severity="info" sx={{ mt: 2 }}>
            Use while loading data or submitting forms · add{' '}
            <code>{'variant="determinate" value={n}'}</code> for a progress percentage
          </Alert>
        </Paper>

        {/* ══════════════════════════════════════
            8. RATING
        ══════════════════════════════════════ */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            8. Rating
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Stack spacing={2}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Rating value={4} readOnly precision={0.5} />
              <Typography variant="body2" color="text.secondary">
                readOnly · precision=0.5
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Rating
                value={ratingValue}
                onChange={(_event, newValue) => setRatingValue(newValue)}
              />
              <Typography variant="body2" color="text.secondary">
                Interactive — current value: <strong>{ratingValue ?? '—'}</strong>
              </Typography>
            </Box>
          </Stack>

          <Alert severity="info" sx={{ mt: 2 }}>
            Use <code>readOnly</code> for display · controlled with <code>value</code> +{' '}
            <code>onChange</code> · great for rating boycotts or comments
          </Alert>
        </Paper>

        {/* ══════════════════════════════════════
            9. SWITCH
        ══════════════════════════════════════ */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            9. Switch
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Stack spacing={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={emailNotifs}
                  onChange={(e) => setEmailNotifs(e.target.checked)}
                />
              }
              label="Email notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
              }
              label="Dark mode"
            />
            <FormControlLabel
              control={<Switch disabled />}
              label="Disabled toggle"
            />
          </Stack>

          <Alert severity="info" sx={{ mt: 2 }}>
            Always wrap in <code>FormControlLabel</code> to get the label · bind to{' '}
            <code>checked</code> state via <code>e.target.checked</code> in <code>onChange</code>
          </Alert>
        </Paper>

        {/* ══════════════════════════════════════
            10. GRID
        ══════════════════════════════════════ */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            10. Grid — responsive layout
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography variant="body2" color="text.secondary" gutterBottom>
            12-column system. <code>xs=12</code> = full width on mobile ·{' '}
            <code>md=4</code> = 3 per row on desktop.
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="body2">xs=12 md=4</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="body2">xs=12 md=4</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="body2">xs=12 md=4</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Card>
                <CardContent>
                  <Typography variant="body2">xs=12 md=8 (main content)</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="body2">xs=12 md=4 (aside)</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Alert severity="success" sx={{ mt: 2 }}>
            Use <code>spacing</code> prop for gaps · <code>container</code> on the parent ·{' '}
            <code>item</code> on each child
          </Alert>
        </Paper>

        {/* ══════════════════════════════════════
            11. BOX + STACK
        ══════════════════════════════════════ */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            11. Box &amp; Stack — layout primitives
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Stack spacing={2}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Box — custom flex layout with sx prop
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
                <Chip label="Item 1" size="small" />
                <Chip label="Item 2" size="small" />
                <Chip label="Item 3" size="small" />
              </Box>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                {'Stack direction="column" spacing={1}'}
              </Typography>
              <Stack spacing={1}>
                <Button variant="outlined" size="small">Row A</Button>
                <Button variant="outlined" size="small">Row B</Button>
                <Button variant="outlined" size="small">Row C</Button>
              </Stack>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                {'Stack direction="row" spacing={2}'}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button size="small">One</Button>
                <Button size="small">Two</Button>
                <Button size="small">Three</Button>
              </Stack>
            </Box>
          </Stack>

          <Alert severity="info" sx={{ mt: 2 }}>
            <code>Box</code> is a generic styled div · <code>Stack</code> is flex with spacing
            built in · both accept the <code>sx</code> prop for one-off styles
          </Alert>
        </Paper>

      </Container>
    </Box>
  );
}