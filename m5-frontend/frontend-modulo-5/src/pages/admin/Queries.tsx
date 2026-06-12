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
} from "@mui/material";
import { useState, useEffect } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import { QueriesStyles } from "../styles/QueriesStyles";
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
  const [, setReport] = useState("None");

  const [authorInput, setAuthorInput] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [countryId, setCountryId] = useState(0);
  const [indictedId, setIndictedId] = useState(0);
  const [orderByVotes, setOrderByVotes] = useState("none");
  const [filesOrder, setFilesOrder] = useState<"none" | "desc" | "asc">(
    "none",
  );

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
    fetchPublications("", 0, 0, "", "", 0, "none");

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
      if (injusticeTypeId && injusticeTypeId !== 0) {
        params.injusticeTypeId = String(injusticeTypeId);
      }
      if (dateFrom) params.dateFrom = dateFrom;
      if (dateTo) params.dateTo = dateTo;
      if (countryId && countryId !== 0) params.countryId = String(countryId);
      if (orderByVotes && orderByVotes !== "none") {
        params.orderByVotes = orderByVotes;
      }

      const response = await statsApi.get("/api/audits/publications", {
        params,
      });

      setRows(response.data.data);
    } catch (error) {
      console.error("Error fetching publications:", error);
    }
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
    <Container maxWidth={false} sx={QueriesStyles.Container(theme)}>
      <QueryNavegation />

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="outlined" onClick={clearFilters}>
          Clear Filters
        </Button>
      </Box>

      <Box sx={QueriesStyles.TableScroll()}>
        <Box sx={QueriesStyles.TableContent()}>
          <Box sx={QueriesStyles.FiltersContainer()}>
            <Box sx={QueriesStyles.FilterCell("14%")}>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.secondary.main }}
              >
                Author
              </Typography>

              <TextField
                fullWidth
                size="small"
                placeholder="Search by author..."
                value={authorInput}
                onChange={(e) => setAuthorInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    fetchPublications(
                      authorInput,
                      indictedId,
                      Category,
                      dateFrom,
                      dateTo,
                      countryId,
                      orderByVotes,
                    );
                  }
                }}
              />
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={QueriesStyles.VerticalDivider(theme)}
            />

            <Box sx={QueriesStyles.FilterCell("14%")}>
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
                  const value = Number(e.target.value);
                  setIndictedId(value);
                  fetchPublications(
                    authorInput,
                    value,
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
              sx={QueriesStyles.VerticalDivider(theme)}
            />

            <Box sx={QueriesStyles.FilterCell("14%")}>
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
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setCategory(value);
                  fetchPublications(
                    authorInput,
                    indictedId,
                    value,
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
                  <MenuItem
                    key={c.InjusticeTypeID}
                    value={c.InjusticeTypeID}
                  >
                    {c.InjusticeName}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={QueriesStyles.VerticalDivider(theme)}
            />

            <Box
              sx={{
                ...QueriesStyles.FilterCell("10%"),
                cursor: "pointer",
              }}
              onClick={cycleFilesOrder}
            >
              <Typography
                variant="body2"
                sx={{ color: theme.palette.secondary.main }}
              >
                Files{" "}
                {filesOrder === "none"
                  ? "↕"
                  : filesOrder === "desc"
                    ? "↓"
                    : "↑"}
              </Typography>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={QueriesStyles.VerticalDivider(theme)}
            />

            <Box sx={QueriesStyles.FilterCell("18%")}>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.secondary.main }}
              >
                Date
              </Typography>

              <Box sx={QueriesStyles.DateFields()}>
                <TextField
                  fullWidth
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
                  fullWidth
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
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={QueriesStyles.VerticalDivider(theme)}
            />

            <Box sx={QueriesStyles.FilterCell("14%")}>
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
                  const value = Number(e.target.value);
                  setCountryId(value);
                  fetchPublications(
                    authorInput,
                    indictedId,
                    Category,
                    dateFrom,
                    dateTo,
                    value,
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
              sx={QueriesStyles.VerticalDivider(theme)}
            />

            <Box sx={QueriesStyles.FilterCell("14%")}>
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
                  const value = e.target.value;
                  setOrderByVotes(value);
                  fetchPublications(
                    authorInput,
                    indictedId,
                    Category,
                    dateFrom,
                    dateTo,
                    countryId,
                    value,
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
                <MenuItem value="none">No order</MenuItem>
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
              sx={QueriesStyles.ResultRow(theme)}
              onClick={() => {
                setReport(row.injusticeCategory);
              }}
            >
              <Box sx={QueriesStyles.ResultCell("14%")}>
                <Avatar
                  src={getUserProfilePictureUrl(row.authorId)}
                  alt="Logo"
                  style={{ width: 30, height: 30 }}
                  sx={{ mr: 1, flexShrink: 0 }}
                />

                <Typography variant="body2" sx={QueriesStyles.CellText()}>
                  {row.author}
                </Typography>
              </Box>

              <Divider
                orientation="vertical"
                flexItem
                sx={QueriesStyles.VerticalDivider(theme)}
              />

              <Box sx={QueriesStyles.ResultCell("14%")}>
                <Avatar
                  src={getEntityPictureUrlByBoycottId(row.boycottId)}
                  alt="Logo"
                  style={{ width: 30, height: 30 }}
                  sx={{ mr: 1, flexShrink: 0 }}
                />

                <Typography variant="body2" sx={QueriesStyles.CellText()}>
                  {row.indicted}
                </Typography>
              </Box>

              <Divider
                orientation="vertical"
                flexItem
                sx={QueriesStyles.VerticalDivider(theme)}
              />

              <Box sx={QueriesStyles.ResultCell("14%")}>
                <Typography variant="body2" sx={QueriesStyles.CellText()}>
                  {row.injusticeCategory}
                </Typography>
              </Box>

              <Divider
                orientation="vertical"
                flexItem
                sx={QueriesStyles.VerticalDivider(theme)}
              />

              <Box
                sx={{
                  ...QueriesStyles.ResultCell("10%"),
                  justifyContent: "center",
                }}
              >
                <DescriptionIcon sx={{ mr: 1 }} />

                <Typography variant="body2">{row.filesCount}</Typography>
              </Box>

              <Divider
                orientation="vertical"
                flexItem
                sx={QueriesStyles.VerticalDivider(theme)}
              />

              <Box sx={QueriesStyles.ResultCell("18%")}>
                <Typography variant="body2" sx={QueriesStyles.CellText()}>
                  {new Date(row.date).toLocaleDateString("es-ES")}
                </Typography>
              </Box>

              <Divider
                orientation="vertical"
                flexItem
                sx={QueriesStyles.VerticalDivider(theme)}
              />

              <Box sx={QueriesStyles.ResultCell("14%")}>
                <Typography variant="body2" sx={QueriesStyles.CellText()}>
                  {row.country}
                </Typography>
              </Box>

              <Divider
                orientation="vertical"
                flexItem
                sx={QueriesStyles.VerticalDivider(theme)}
              />

              <Box sx={QueriesStyles.ResultCell("14%")}>
                <Typography variant="body2" sx={{ mr: 2, color: "green" }}>
                  {row.votesInFavor}
                </Typography>

                <Typography variant="body2" sx={{ color: "red" }}>
                  {row.votesAgainst}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}