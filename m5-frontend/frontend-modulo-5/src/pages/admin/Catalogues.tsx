import { Container, Typography, InputAdornment, Button, Box, TextField, useTheme, Avatar } from '@mui/material';
import { CasesOfInjusticeStyles } from '../styles/CasesOfInjusticeStyles';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';



export default function Catalogues() {
  const theme = useTheme();
  const items = [
  { id: 1, name: 'Transphobia', posts: '5k', image: 'https://elclosetlgbt.com/wp-content/uploads/2019/08/bandera-trans-historia--969x600.jpeg' },
  { id: 2, name: 'Homophobia', posts: '5k', image: 'https://static.vecteezy.com/system/resources/previews/001/416/641/original/lgbt-rainbow-flag-vector.jpg' },
  { id: 3, name: 'Animal Cruelty', posts: '5k', image: 'https://img.freepik.com/premium-vector/cruelty-free-logo-cruelty-free-label-vector-isolated-flat-style-best-cruelty-free-logo_849264-1553.jpg?w=2000' },
];

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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
  
  {items.map((item) => (
    <Box key={item.id} sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      px: 2,
      py: 1,
    }}>
      <Avatar src={item.image} sx={{ width: 36, height: 36 }} />
      <Typography>{item.name}</Typography>
      <Typography sx={{ marginLeft: 'auto', color: 'gray', fontSize: 14 }}>
        {item.posts} Posts
      </Typography>
    </Box>
  ))}

  <Typography sx={{ textAlign: 'left', px: 2, pt: 1, fontSize: 13}}>
    Total: {items.length}
  </Typography>

</Box>
        </Container>
    </Container>
  );
}