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
//import UserPFP from "../../assets/pfpDefaultImage.png";
//import StarbucksLogo from "../../assets/StarbucksLogo.jpg";
import { useNavigate } from "react-router-dom";
import QueryNavegation from "./QueryNavigation";
import { statsApi } from "../../services/api";
import {
  getEntityPictureUrlByBoycottId,
  getUserProfilePictureUrl,
} from "../../services/userService";

interface AuditPublication {
  boycottId: number;
  title: string;
  author: string;
  authorId: number;
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
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [countryId, setCountryId] = useState(0);
  const [indictedId, setIndictedId] = useState(0);
  const [orderByVotes, setOrderByVotes] = useState("none");
  const [filesOrder, setFilesOrder] = useState<"none" | "desc" | "asc">("none");
  const [entities, setEntities] = useState<
    { EntityID: number; EntityName: string }[]
  >([]);
  const [countries, setCountries] = useState<
    { CountryID: number; CountryName: string }[]
  >([]);
  const [injusticeTypes, setInjusticeTypes] = useState<
    { InjusticeTypeID: number; InjusticeName: string }[]
  >([]);

  const [rows, setRows] = useState<AuditPublication[]>([]);

  useEffect(() => {
    fetchPublications("", 0, 0, "", "", 0);

    statsApi.get("/api/audits/filter-options").then((res) => {
      setInjusticeTypes(res.data.data.injusticeTypes);
      setCountries(res.data.data.countries);
      setEntities(res.data.data.entities);
    });
  }, []);

  const fetchPublications = async (
    author: string,
    entityId?: number,
    injusticeTypeId?: number,
    dateFrom?: string,
    dateTo?: string,
    countryId?: number,
    orderByVotes?: string,
  ) => {
    try {
      const params: Record<string, string> = {};
      if (author.trim()) params.author = author.trim();
      if (entityId && entityId !== 0) params.entityId = String(entityId);
      if (injusticeTypeId && injusticeTypeId !== 0)
        params.injusticeTypeId = String(injusticeTypeId);
      if (dateFrom) params.dateFrom = dateFrom;
      if (dateTo) params.dateTo = dateTo;
      if (countryId && countryId !== 0) params.countryId = String(countryId);
      if (orderByVotes) params.orderByVotes = orderByVotes;

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

  const sortedRows =
    filesOrder === "none"
      ? rows
      : [...rows].sort((a, b) =>
          filesOrder === "desc"
            ? b.filesCount - a.filesCount
            : a.filesCount - b.filesCount,
        );

  const cycleFilesOrder = () => {
    setFilesOrder((prev) =>
      prev === "none" ? "desc" : prev === "desc" ? "asc" : "none",
    );
  };

  const clearFilters = () => {
    setAuthorInput("");
    setIndictedId(0);
    setCategory(0);
    setDateFrom("");
    setDateTo("");
    setCountryId(0);
    setOrderByVotes("none");
    setFilesOrder("none");
    fetchPublications("", 0, 0, "", "", 0, "none");
  };

  return (
    <Container sx={{ p: 5, backgroundColor: theme.palette.background.default }}>
      <QueryNavegation />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="outlined" onClick={clearFilters}>
          Clear Filters
        </Button>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", mt: 5, mb: 0 }}>
        <Box sx={{ width: "14%" }}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.secondary.main }}
          >
            Author
          </Typography>
          <TextField
            size="small"
            placeholder="Search by author..."
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                fetchPublications(
                  authorInput,
                  indictedId,
                  Category,
                  dateFrom,
                  dateTo,
                  countryId,
                  orderByVotes,
                );
            }}
          />
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
          <Select
            size="small"
            hiddenLabel
            value={indictedId}
            onChange={(e) => {
              setIndictedId(Number(e.target.value));
              fetchPublications(
                authorInput,
                Number(e.target.value),
                Category,
                dateFrom,
                dateTo,
                countryId,
                orderByVotes,
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
            <MenuItem value={0}>All</MenuItem>
            {entities.map((e) => (
              <MenuItem key={e.EntityID} value={e.EntityID}>
                {e.EntityName}
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
                indictedId,
                Number(c.target.value),
                dateFrom,
                dateTo,
                countryId,
                orderByVotes,
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
            <MenuItem value={0}>All</MenuItem>
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
        <Box sx={{ width: "10%", cursor: "pointer" }} onClick={cycleFilesOrder}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.secondary.main }}
          >
            Files{" "}
            {filesOrder === "none" ? "↕" : filesOrder === "desc" ? "↓" : "↑"}
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={QueriesStyles.Divider(theme)}
        />
        <Box sx={{ width: "18%" }}>
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
            onBlur={() =>
              fetchPublications(
                authorInput,
                indictedId,
                Category,
                dateFrom,
                dateTo,
                countryId,
                orderByVotes,
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
                indictedId,
                Category,
                dateFrom,
                dateTo,
                countryId,
                orderByVotes,
              )
            }
            slotProps={{ inputLabel: { shrink: true } }}
          />
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
                indictedId,
                Category,
                dateFrom,
                dateTo,
                Number(e.target.value),
                orderByVotes,
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
            <MenuItem value={0}>All</MenuItem>
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
          <Select
            size="small"
            hiddenLabel
            value={orderByVotes}
            onChange={(e) => {
              setOrderByVotes(e.target.value);
              fetchPublications(
                authorInput,
                indictedId,
                Category,
                dateFrom,
                dateTo,
                countryId,
                e.target.value,
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
            <MenuItem value="inFavorDesc">Most votes in favor</MenuItem>
            <MenuItem value="inFavorAsc">Least votes in favor</MenuItem>
            <MenuItem value="againstDesc">Most votes against</MenuItem>
            <MenuItem value="againstAsc">Least votes against</MenuItem>
          </Select>
        </Box>
      </Box>
      <Divider
        orientation="horizontal"
        flexItem
        sx={{ ...QueriesStyles.Divider(theme), m: 0 }}
      />

      {sortedRows.map((row) => (
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
              src={getUserProfilePictureUrl(row.authorId)}
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
              src={getEntityPictureUrlByBoycottId(row.boycottId)}
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

          <Box sx={{ width: "10%", display: "flex", my: 1 }}>
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

          <Box sx={{ width: "18%", display: "flex", my: 1 }}>
            <Typography variant="body2" sx={{ m: "Auto" }}>
              {new Date(row.date).toLocaleDateString("es-ES")}
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
            <Typography variant="body2" sx={{ m: "Auto", color: "green" }}>
              {row.votesInFavor}
            </Typography>
            <Typography variant="body2" sx={{ m: "Auto", color: "red" }}>
              {row.votesAgainst}
            </Typography>
          </Box>
        </Box>
      ))}
    </Container>
  );
}
