import { Box, Button, Container, Divider, TextField, Typography, useTheme } from '@mui/material';
import { suggestionsStyles } from '../styles/SuggestionsStyles';


export default function Suggestions() {
  const theme = useTheme();

  return (
    <Container sx={suggestionsStyles.mainContainer(theme)}>
      <Container sx={suggestionsStyles.card(theme)}>
        <Typography variant="h2" sx={suggestionsStyles.title(theme)}>
          Send a suggestion
        </Typography>

        <Box>
          <Typography sx={suggestionsStyles.label(theme)}>Subject*</Typography>
          <TextField
            fullWidth
            required
            sx={suggestionsStyles.textField(theme)}
          />
        </Box>

        <Box>
          <Typography sx={suggestionsStyles.label(theme)}>Description*</Typography>
          <TextField
            fullWidth
            required
            multiline
            minRows={4}
            sx={suggestionsStyles.descriptionField(theme)}
          />
        </Box>

        <Divider sx={suggestionsStyles.divider(theme)} />

        <Typography sx={suggestionsStyles.sectionTitle(theme)}>
          Contact Information
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: '12px',
          }}
        >
          <Box>
            <Typography sx={suggestionsStyles.label(theme)}>Name*</Typography>
            <TextField
              fullWidth
              required
              sx={suggestionsStyles.textField(theme)}
            />
          </Box>

          <Box>
            <Typography sx={suggestionsStyles.label(theme)}>Email*</Typography>
            <TextField
              fullWidth
              required
              sx={suggestionsStyles.textField(theme)}
            />
          </Box>
        </Box>

        <Button variant="contained" sx={suggestionsStyles.submitButton(theme)}>
          Submit Suggestion
        </Button>
      </Container>
    </Container>
  );
}