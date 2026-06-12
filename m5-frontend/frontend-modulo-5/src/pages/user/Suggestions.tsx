import { Box, Button, Container, Divider, TextField, Typography, useTheme } from '@mui/material';
import { suggestionsStyles } from '../styles/SuggestionsStyles';
import { useState } from 'react';
import { createSuggestion } from '../../services/commentsService';
import { useAuth } from '../../context/authContext';


export default function Suggestions() {
  const theme = useTheme();
  const { user } = useAuth();
  const suggestedBy = user?.appUserId ?? (user as any)?.userId ?? (user as any)?.id;

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!subject.trim() || !description.trim()) {
      alert('Please fill in the subject and description.');
      return;
    }

    if (!suggestedBy) {
      alert('You must be logged in to send a suggestion.');
      return;
    }

    setSubmitting(true);
    try {
      await createSuggestion(subject.trim(), description.trim(), Number(suggestedBy));
      alert('Suggestion sent successfully!');
      setSubject('');
      setDescription('');
    } catch (error) {
      console.error('Error sending suggestion:', error);
      alert('Error sending the suggestion. Please try again.');
    } finally {
      setSubmitting(false);
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
            onChange={(event) => setSubject(event.target.value)}
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
            onChange={(event) => setDescription(event.target.value)}
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

        <Button
          variant="contained"
          sx={suggestionsStyles.submitButton(theme)}
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? 'Sending...' : 'Submit Suggestion'}
        </Button>
      </Container>
    </Container>
  );
}
