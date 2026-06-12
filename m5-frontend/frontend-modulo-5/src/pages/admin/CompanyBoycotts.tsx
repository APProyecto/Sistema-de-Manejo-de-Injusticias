import {
  Container,
  Button,
  Typography,
  Card,
  Grid,
  CardContent,
  Box,
  useTheme,
  Avatar,
  TextField,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import StarbucksLogo from "../../assets/StarbucksLogo.jpg";
import UserPFP from "../../assets/pfpDefaultImage.png";
import { useState, useEffect } from "react";
import QueryNavegation from "./QueryNavigation";
import { QueriesStyles } from "../styles/QueriesStyles";
import PostInteracionButton from "../../components/common/PostInteractionButton";
import { Circle } from "@mui/icons-material";
import { statsApi } from "../../services/api";
import { getEntityPictureUrlByBoycottId } from "../../services/userService";
import { getUserProfilePictureUrl } from "../../services/userService";

export default function CompanyBoycotts() {
  const [indictedInput, setIndictedInput] = useState("");

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [stateFilterId, setStateFilterId] = useState(0);
  const [entities, setEntities] = useState<
    { EntityID: number; EntityName: string }[]
  >([]);
  const [entityId, setEntityId] = useState(0);
  const [boycottStates, setBoycottStates] = useState<
    { BoycottStateID: number; StateName: string }[]
  >([]);

  const handleStateColor = (state: string) => {
    switch (state) {
      case "Active":
        return "#4caf50"; // verde
      case "Under Review":
        return "#ff9800"; // naranja
      case "Edited":
        return "#2196f3"; // azul
      case "Pending Approval":
        return "#9c27b0"; // morado
      case "Rejected":
        return "#f44336"; // rojo
      case "Deleted":
        return "#757575"; // gris
      default:
        return theme.palette.background.default;
    }
  };

  const fetchByEntity = async (
    entityId?: number,
    dateFrom?: string,
    dateTo?: string,
    status?: string | number,
  ) => {
    try {
      const params: Record<string, string> = {};
      if (entityId && entityId !== 0) params.entityId = String(entityId);
      if (dateFrom) params.dateFrom = dateFrom;
      if (dateTo) params.dateTo = dateTo;
      if (status && status !== 0) params.status = String(status);

      const response = await statsApi.get("/api/tracking/getByEntity", {
        params,
      });
      const data = response.data.data;
      setGroupedData(data);

      // Si hay entityId seleccionado, mostrar esa entidad automáticamente
      // Si no, mostrar la primera por defecto
      if (entityId && entityId !== 0) {
        setSelectedEntity(
          data.find((e: any) => e.entityId === entityId) ?? null,
        );
      } else {
        setSelectedEntity(null); // primera entidad por defecto
      }
    } catch (error) {
      console.error("Error fetching by entity:", error);
    }
  };

  const [groupedData, setGroupedData] = useState<
    {
      entityId: number;
      entityName: string;
      boycotts: {
        boycottId: number;
        title: string;
        author: string;
        authorId: number;
        date: string;
        status: string;
      }[];
    }[]
  >([]);

  const [selectedEntity, setSelectedEntity] = useState<{
    entityId: number;
    entityName: string;
    boycotts: {
      boycottId: number;
      title: string;
      author: string;
      authorId: number;
      date: string;
      status: string;
    }[];
  } | null>(null);

  const theme = useTheme();

  const clearFilters = () => {
    setEntityId(0);
    setDateFrom("");
    setDateTo("");
    setStateFilterId(0);
    setSelectedEntity(null);
    fetchByEntity();
  };

  useEffect(() => {
    fetchByEntity();
    statsApi.get("/api/audits/filter-options").then((res) => {
      setEntities(res.data.data.entities);
      setBoycottStates(res.data.data.boycottStates);
    });
  }, []);

  return (
    <Container
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
        overflowY: "auto",
      })}
    >
      <Box sx={{ margin: 5 }}>
        <QueryNavegation />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="outlined" onClick={clearFilters}>
            Clear Filters
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 5, mb: 0 }}>
          <Box
            sx={{
              width: "25%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: theme.palette.secondary.main }}
            >
              Indicted
            </Typography>
            <Select
              size="small"
              hiddenLabel
              value={entityId}
              onChange={(e) => {
                const newValue = Number(e.target.value);
                setEntityId(newValue);
                if (newValue === 0) setSelectedEntity(null);
                fetchByEntity(newValue, dateFrom, dateTo, stateFilterId);
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
          <Box sx={{ width: "50%", display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.secondary.main, ml: "Auto", mr: 1 }}
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
                fetchByEntity(entityId, dateFrom, dateTo, stateFilterId)
              }
              slotProps={{ inputLabel: { shrink: true } }}
            />
            {/* WIP : Onblur */}

            <TextField
              size="small"
              type="date"
              label="To"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              onBlur={() =>
                fetchByEntity(entityId, dateFrom, dateTo, stateFilterId)
              }
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ mr: "Auto" }}
            />
            {/* WIP : Onblur */}
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={QueriesStyles.Divider(theme)}
          />
          <Box sx={{ width: "25%" }}>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.secondary.main }}
            >
              State
            </Typography>
            <Select
              size="small"
              hiddenLabel
              value={stateFilterId}
              onChange={(c) => {
                const newValue = c.target.value;
                setStateFilterId(newValue as any);
                fetchByEntity(entityId, dateFrom, dateTo, newValue);
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
              {boycottStates.map((s) => (
                <MenuItem key={s.BoycottStateID} value={s.StateName}>
                  {s.StateName}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Divider
          orientation="horizontal"
          flexItem
          sx={QueriesStyles.Divider(theme)}
        />

        <Box sx={{ display: "flex" }}>
          {/* Panel izquierdo - empresas */}
          <Box sx={{ width: "25%", my: 0 }}>
            {(selectedEntity ? [selectedEntity] : groupedData).map((entity) => (
              <Box
                key={entity.entityId}
                onClick={() => {
                  setSelectedEntity(entity);
                  setEntityId(entity.entityId);
                }}
                sx={{
                  display: "flex",
                  cursor: "pointer",
                  "&:hover": { background: theme.palette.grey[100] },
                  p: 1,
                }}
              >
                <Avatar
                  src={getEntityPictureUrlByBoycottId(
                    entity.boycotts[0]?.boycottId,
                  )}
                  style={{ width: 50, height: 50 }}
                  sx={{ mx: 1, my: "Auto" }}
                />
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.secondary.main, my: "Auto" }}
                >
                  {entity.entityName}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={QueriesStyles.Divider(theme)}
          />

          {/* Panel derecho - boycotts de la empresa seleccionada */}
          <Box sx={{ ml: "Auto", mr: 2, width: "75%", p: 4 }}>
            {(selectedEntity ? [selectedEntity] : groupedData).flatMap(
              (entity) =>
                entity.boycotts.map((boycott) => (
                  <Box
                    key={boycott.boycottId}
                    sx={{
                      background: theme.palette.grey[100],
                      my: 2,
                      p: 2,
                      borderRadius: 5,
                    }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <Avatar
                        src={getUserProfilePictureUrl(boycott.authorId)}
                        style={{ width: 50, height: 50 }}
                        sx={{ mx: 1, my: "Auto" }}
                      />
                      <Typography variant="h6" sx={{ my: "Auto" }}>
                        {boycott.author}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", mx: "Auto", my: "Auto" }}
                      >
                        {boycott.title}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Box sx={{ display: "flex", width: "25%" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.grey[200],
                            fontWeight: "bold",
                            mx: "Auto",
                          }}
                        >
                          {new Date(boycott.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        mr: "0",
                        ml: "Auto",
                        alignContent: "right",
                        width: "20%",
                      }}
                    >
                      <PostInteracionButton
                        text={boycott.status}
                        icon={Circle}
                        iconColor={handleStateColor(boycott.status)}
                      />
                    </Box>
                  </Box>
                )),
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
