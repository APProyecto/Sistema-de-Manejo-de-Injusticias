import {
  Container,
  Typography,
  Button,
  Box,
  useTheme,
  Divider,
  Avatar,
  Select,
  MenuItem,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import { QueriesStyles } from "../styles/QueriesStyles";
import UserPFP from "../../assets/pfpDefaultImage.png";
import StarbucksLogo from "../../assets/StarbucksLogo.jpg";
import { useNavigate } from "react-router-dom";
import { Categories } from "../../data/Categories";
import QueryNavegation from "./QueryNavigation";

import SearchIcon from "@mui/icons-material/Search";
import { statsApi } from "../../services/api";

const Queries = [
  {
    authorPFP: UserPFP,
    author: "User123",
    indictedPFP: StarbucksLogo,
    indicted: "Starbucks",
    injustice: "Politics",
    files: 5,
    date: "04-19-2026",
    country: "Global",
    votes: "21K",
  },
  {
    authorPFP: UserPFP,
    author: "User123",
    indictedPFP: StarbucksLogo,
    indicted: "Starbucks",
    injustice: "Health",
    files: 5,
    date: "04-19-2026",
    country: "USA",
    votes: "25K",
  },
  {
    authorPFP: UserPFP,
    author: "User123",
    indictedPFP: StarbucksLogo,
    indicted: "Starbucks",
    injustice: "Labor practices",
    files: 5,
    date: "04-19-2026",
    country: "France",
    votes: "5K",
  },
];

interface AuditPublication {
  boycottId: number;
  title: string;
  author: string;
  indicted: string;
  injusticeCategory: string;
  date: string;
  country: string;
  votesInFavor: number;
  votesAgainst: number;
  status: string;
  filesCount: number;
}

export default function Quereis() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [Category, setCategory] = useState(0);
  const [reportSelected, setReport] = useState("None");

  const [authorInput, setAuthorInput] = useState("");
  const [indictedInput, setIndictedInput] = useState("");
  const [injusticeTypes, setInjusticeTypes] = useState<
    { InjusticeTypeID: number; InjusticeName: string }[]
  >([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [countries, setCountries] = useState<
    { CountryID: number; CountryName: string }[]
  >([]);
  const [countryId, setCountryId] = useState(0);

  const [rows, setRows] = useState<AuditPublication[]>([]);

  useEffect(() => {
    fetchPublications("", "", 0, "", "", 0);

    statsApi.get("/api/audits/filter-options").then((res) => {
      setInjusticeTypes(res.data.data.injusticeTypes);
      setCountries(res.data.data.countries);
    });
  }, []);

  const fetchPublications = async (
    author: string,
    indicted: string,
    injusticeTypeId?: number,
    dateFrom?: string,
    dateTo?: string,
    countryId?: number,
  ) => {
    try {
      const params: Record<string, string> = {};
      if (author.trim()) params.author = author.trim();
      if (indicted.trim()) params.indicted = indicted.trim();
      if (injusticeTypeId && injusticeTypeId !== 0)
        params.injusticeTypeId = String(injusticeTypeId);
      if (dateFrom) params.dateFrom = dateFrom;
      if (dateTo) params.dateTo = dateTo;
      if (countryId && countryId !== 0) params.countryId = String(countryId);

      const response = await statsApi.get("/api/audits/publications", {
        params,
      });
      setRows(response.data.data);
    } catch (error) {
      console.error("Error fetching publications:", error);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Container sx={{ p: 5, backgroundColor: theme.palette.background.default }}>
      <QueryNavegation />

      <Box sx={{ display: "flex", alignItems: "center", mt: 5, mb: 1, gap: 1 }}>
        <TextField
          size="small"
          placeholder="Search by author..."
          value={authorInput}
          onChange={(e) => setAuthorInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              fetchPublications(
                authorInput,
                indictedInput,
                Category,
                dateFrom,
                dateTo,
                countryId,
              );
          }}
        />
        <TextField
          size="small"
          placeholder="Search by indicted..."
          value={indictedInput}
          onChange={(e) => setIndictedInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              fetchPublications(
                authorInput,
                indictedInput,
                Category,
                dateFrom,
                dateTo,
                countryId,
              );
          }}
        />
        <TextField
          size="small"
          type="date"
          label="From"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          onBlur={() =>
            fetchPublications(
              authorInput,
              indictedInput,
              Category,
              dateFrom,
              dateTo,
              countryId,
            )
          }
          slotProps={{ inputLabel: { shrink: true } }}
        />

        <TextField
          size="small"
          type="date"
          label="To"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          onBlur={() =>
            fetchPublications(
              authorInput,
              indictedInput,
              Category,
              dateFrom,
              dateTo,
              countryId,
            )
          }
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <IconButton
          onClick={() =>
            fetchPublications(
              authorInput,
              indictedInput,
              Category,
              dateFrom,
              dateTo,
              countryId,
            )
          }
        >
          <SearchIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mt: 5, mb: 0 }}>
        <Box sx={{ width: "14%" }}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.secondary.main }}
          >
            Author
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={QueriesStyles.Divider(theme)}
        />
        <Box sx={{ width: "14%" }}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.secondary.main }}
          >
            Indicted
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={QueriesStyles.Divider(theme)}
        />
        <Box sx={{ width: "14%" }}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.secondary.main }}
          >
            Injustice
          </Typography>
          <Select
            size="small"
            hiddenLabel
            value={Category}
            onChange={(c) => {
              setCategory(c.target.value);
              fetchPublications(
                authorInput,
                indictedInput,
                Number(c.target.value),
              );
            }}
            disableUnderline
            variant="filled"
            MenuProps={{
              sx: {
                "& .MuiMenuItem-root": {
                  color: "black !important",
                },
              },
            }}
            sx={QueriesStyles.Select(theme)}
          >
            <MenuItem value={0}>Category</MenuItem>
            {injusticeTypes.map((c) => (
              <MenuItem key={c.InjusticeTypeID} value={c.InjusticeTypeID}>
                {c.InjusticeName}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={QueriesStyles.Divider(theme)}
        />
        <Box sx={{ width: "14%" }}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.secondary.main }}
          >
            Files
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={QueriesStyles.Divider(theme)}
        />
        <Box sx={{ width: "14%" }}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.secondary.main }}
          >
            Date
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={QueriesStyles.Divider(theme)}
        />
        <Box sx={{ width: "14%" }}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.secondary.main }}
          >
            Country
          </Typography>
          <Select
            size="small"
            hiddenLabel
            value={countryId}
            onChange={(e) => {
              setCountryId(Number(e.target.value));
              fetchPublications(
                authorInput,
                indictedInput,
                Category,
                dateFrom,
                dateTo,
                Number(e.target.value),
              );
            }}
            disableUnderline
            variant="filled"
            MenuProps={{
              sx: {
                "& .MuiMenuItem-root": {
                  color: "black !important",
                },
              },
            }}
            sx={QueriesStyles.Select(theme)}
          >
            <MenuItem value={0}>Country</MenuItem>
            {countries.map((c) => (
              <MenuItem key={c.CountryID} value={c.CountryID}>
                {c.CountryName}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={QueriesStyles.Divider(theme)}
        />
        <Box sx={{ width: "14%" }}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.secondary.main }}
          >
            Votes
          </Typography>
        </Box>
      </Box>
      <Divider
        orientation="horizontal"
        flexItem
        sx={{ ...QueriesStyles.Divider(theme), m: 0 }}
      />

      {rows.map((row) => (
        <Box
          key={row.boycottId}
          sx={{
            "&:hover": { background: theme.palette.grey[100] },
            display: "flex",
          }}
          onClick={() => {
            setReport(row.injusticeCategory);
          }}
        >
          <Box sx={{ width: "14%", display: "flex", my: 1 }}>
            <Avatar
              alt="Logo"
              style={{ width: 30, height: 30 }}
              sx={{ m: 1, my: "Auto" }}
            />
            <Typography variant="body2" sx={{ my: "Auto" }}>
              {row.author}
            </Typography>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={QueriesStyles.Divider(theme)}
          />

          <Box sx={{ width: "14%", display: "flex", my: 1 }}>
            <Avatar
              alt="Logo"
              style={{ width: 30, height: 30 }}
              sx={{ m: 1, my: "Auto" }}
            />
            <Typography variant="body2" sx={{ my: "Auto" }}>
              {row.indicted}
            </Typography>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={QueriesStyles.Divider(theme)}
          />

          <Box sx={{ width: "14%", display: "flex", my: 1 }}>
            <Typography variant="body2" sx={{ m: "Auto" }}>
              {row.injusticeCategory}
            </Typography>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={QueriesStyles.Divider(theme)}
          />

          <Box sx={{ width: "14%", display: "flex", my: 1 }}>
            <DescriptionIcon sx={{ my: "Auto", ml: "Auto" }} />
            <Typography variant="body2" sx={{ my: "Auto", mr: "Auto" }}>
              {row.filesCount}
            </Typography>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={QueriesStyles.Divider(theme)}
          />

          <Box sx={{ width: "14%", display: "flex", my: 1 }}>
            <Typography variant="body2" sx={{ m: "Auto" }}>
              {row.date}
            </Typography>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={QueriesStyles.Divider(theme)}
          />

          <Box sx={{ width: "14%", display: "flex", my: 1 }}>
            <Typography variant="body2" sx={{ m: "Auto" }}>
              {row.country}
            </Typography>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={QueriesStyles.Divider(theme)}
          />

          <Box sx={{ width: "14%", display: "flex", my: 1 }}>
            <Typography variant="body2" sx={{ m: "Auto" }}>
              {row.votesInFavor}
            </Typography>
          </Box>
        </Box>
      ))}
    </Container>
  );
}
