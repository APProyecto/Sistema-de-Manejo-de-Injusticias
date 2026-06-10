import { Container, Typography, InputAdornment, Button, Box, TextField, useTheme } from '@mui/material';
import { CasesOfInjusticeStyles } from '../styles/CasesOfInjusticeStyles';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

export default function CasesOfInjustice() {
  const theme = useTheme();


  return (
    <Container sx={CasesOfInjusticeStyles.mainContainer(theme)}>
      <Container sx={CasesOfInjusticeStyles.searchSpace(theme)}>
        <Button sx={CasesOfInjusticeStyles.filterButton(theme)}>
          <TuneIcon />
        </Button>    
      <TextField
          placeholder="Search for a case"
          variant="outlined"
          size="medium"
          sx={CasesOfInjusticeStyles.searchField(theme)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={CasesOfInjusticeStyles.searchIcon(theme)} />
                </InputAdornment>
              )
            },
          }}
        />
        </Container>
        <Container>
          <Container sx={CasesOfInjusticeStyles.headerCases(theme)}>
            <Typography>Picture</Typography>
          <Typography>Case</Typography>
          <Typography sx={ {marginLeft: 'auto'}}>Posts</Typography>
          </Container>
          
        </Container>
    </Container>
  );
}