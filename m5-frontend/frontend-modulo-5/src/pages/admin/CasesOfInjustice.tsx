import {
  Container,
  Typography,
  InputAdornment,
  Button,
  Box,
  TextField,
  useTheme,
  Avatar,
} from "@mui/material";

import { CasesOfInjusticeStyles } from "../styles/CasesOfInjusticeStyles";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import BalanceIcon from "@mui/icons-material/Balance";

import { useEffect, useState } from "react";
import { getInjusticeTypes } from "../../services/catalogueService";
import type { InjusticeType } from "../../types";

export default function CasesOfInjustice() {
  const theme = useTheme();

  const [items, setItems] = useState<InjusticeType[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadInjusticeTypes = async () => {
      try {
        const data = await getInjusticeTypes();
        setItems(data);
      } catch (error) {
        console.error("Error loading injustice types", error);
      }
    };

    loadInjusticeTypes();
  }, []);

  const filteredItems = items.filter((item) =>
    item.InjusticeName.toLowerCase().includes(search.toLowerCase())
  );

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
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          sx={CasesOfInjusticeStyles.searchField(theme)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={CasesOfInjusticeStyles.searchIcon(theme)} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Container>

      <Container>
        <Container sx={CasesOfInjusticeStyles.headerCases(theme)}>
          <Typography>Case</Typography>
          
        </Container>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {filteredItems.map((item) => (
            <Box
              key={item.InjusticeTypeID}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                px: 2,
                py: 1,
              }}
            >
              <Avatar sx={{ width: 36, height: 36 }}>
                <BalanceIcon fontSize="small" />
              </Avatar>

              <Typography>{item.InjusticeName}</Typography>


            </Box>
          ))}

          {filteredItems.length === 0 && (
            <Typography sx={{ textAlign: "left", px: 2, pt: 1 }}>
              No cases found.
            </Typography>
          )}

          <Typography
            sx={{
              textAlign: "left",
              px: 2,
              pt: 1,
              fontSize: 13,
            }}
          >
            Total: {filteredItems.length}
          </Typography>
        </Box>
      </Container>
    </Container>
  );
}