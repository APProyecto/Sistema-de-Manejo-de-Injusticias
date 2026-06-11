import { Container, Typography, Card, Grid, CardContent, Box, useTheme, Avatar, TextField, Divider, Select } from '@mui/material';
import StarbucksLogo from '../../assets/StarbucksLogo.jpg'
import { useState } from 'react';
import QueryNavegation from './QueryNavigation';
import { QueriesStyles } from '../styles/QueriesStyles';

export default function CompanyBoycotts() {
  const [indictedInput, setIndictedInput] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const theme = useTheme();

  return (
    <Container sx={(theme=>({backgroundColor: theme.palette.background.default,overflowY: 'auto'}))}>
      <Box sx={{margin:5}}>
        <QueryNavegation />
        <Box sx={{ display: "flex", alignItems: "center", mt: 5, mb: 0 }}>
          <Box sx={{ width: "25%" }}>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.secondary.main }}
            >
              Author
            </Typography>
            <TextField
              size="small"
              placeholder="Search by indicted..."
              value={indictedInput}
              onChange={(e) => setIndictedInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter"){
                  // WIP : Search Indicted
                }
              }}
            />
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={QueriesStyles.Divider(theme)}
          />
          <Box sx={{ width: "25%" }}>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.secondary.main }}
            >
              Date
            </Typography>
            <TextField
              size="small"
              type="date"
              label="From"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
                {/* WIP : Onblur */}

            <TextField
              size="small"
              type="date"
              label="To"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
                {/* WIP : Onblur */}
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={QueriesStyles.Divider(theme)}
          />
          <Box sx={{ width: "25%" }}>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.secondary.main }}
            >
              Date
            </Typography>
            <TextField
              size="small"
              type="date"
              label="From"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
                {/* WIP : Onblur */}

            <TextField
              size="small"
              type="date"
              label="To"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
                {/* WIP : Onblur */}
          </Box>

        </Box>
      </Box>

    </Container>
  );
}