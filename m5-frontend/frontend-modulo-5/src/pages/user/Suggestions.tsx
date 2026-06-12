import { Alert, Box, Button, CircularProgress, Container, Divider, Snackbar, TextField, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { suggestionsStyles } from '../styles/SuggestionsStyles';
import { createSuggestion } from '../../services/suggestionService';
import { useAuth } from '../../context/authContext';

export default function Suggestions() {
  const theme = useTheme();
  const { user } = useAuth();
  const resolvedUserId = user?.appUserId ?? (user as any)?.userId ?? (user as any)?.id;

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!subject || !description) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createSuggestion({ subject, description, suggestedBy: resolvedUserId });
      setSuccess(true);
      setSubject('');
      setDescription('');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unexpected error.');
    } finally {
      setLoading(false);
    }
  };

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
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={suggestionsStyles.descriptionField(theme)}
          />
        </Box>

        <Divider sx={suggestionsStyles.divider(theme)} />

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={suggestionsStyles.submitButton(theme)}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
        >
          {loading ? 'Sending...' : 'Submit Suggestion'}
        </Button>
      </Container>

      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Suggestion submitted successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}