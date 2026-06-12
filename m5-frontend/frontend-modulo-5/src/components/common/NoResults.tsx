import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function NoResults() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        gap: 2,
      }}
    >
      <Typography variant="h3" color="text.secondary">
        No results found :(
      </Typography>
    </Box>
  );
}