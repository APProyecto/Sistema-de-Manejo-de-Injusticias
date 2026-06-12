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
} from "@mui/material";
import { useEffect, useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import { QueriesStyles } from "../styles/QueriesStyles";
import StarbucksLogo from "../../assets/StarbucksLogo.jpg";
import { Categories } from "../../data/Categories";
import { EntityType } from "../../data/EntityType";
import { statsApi } from "../../services/api";
import QueryNavegation from "./QueryNavigation";

import { getEntityPictureUrl } from "../../services/catalogueService";

interface followsQuery {
  ok: boolean;
  mostFollowed: [
    {
      entityname: string;
      EntityID: number;
      entityPicture: string;
      entityType: string;
      injusticeType: string;
      followers: number;
    },
  ];
}

export default function MostFollowedCases() {
  const theme = useTheme();
  const [followed, setFollowed] = useState<followsQuery[] | null>([]);
  const [Category, setCategory] = useState(0);
  const [caseSelected, setCase] = useState("None");
  const [EntityTypeSelected, setEntityTypeSelected] = useState(0);

  const [injusticeTypes, setInjusticeTypes] = useState<
    { InjusticeTypeID: number; InjusticeName: string }[]
  >([{ InjusticeTypeID: 0, InjusticeName: "Category" }]);

  const getFollows = async (entityid: number, catid: number) => {
    let entityname = "Category";
    let catname = "Category";
    if (entityid && entityid !== 0) {
      entityname =
        EntityType.find((item) => item.id === entityid)?.name ?? "Category";
    }
    if (catid && catid !== 0) {
      catname =
        injusticeTypes.find((item) => item.InjusticeTypeID === catid)
          ?.InjusticeName ?? "Category";
    }

    const parameters = new URLSearchParams({
      indictedFilter: entityname,
      injusticeFilter: catname,
    });
    try {
      const response = await fetch(
        `https://fair-boycott.sytes.net/api/tracking/getFollowers?${parameters.toString()}`,
      );
      const data = await response.json();

      if (Array.isArray(data)) {
        setFollowed(data);
      } else {
        setFollowed([data]);
      }
    } catch (error) {
      console.error("Error fetching user history:", error);
    }
  };

  useEffect(() => {
    getFollows(EntityTypeSelected, Category);
    statsApi.get("/api/audits/filter-options").then((res) => {
      setInjusticeTypes(res.data.data.injusticeTypes);
    });
  }, []);

  return (
    <Container sx={{ p: 5, backgroundColor: theme.palette.background.default }}>
      <QueryNavegation />

      <Box sx={{ display: "flex", alignItems: "center", mt: 5, mb: 0 }}>
        <Box sx={{ width: "25%" }}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.secondary.main }}
          >
            Indirected
          </Typography>
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
            Type of entity
          </Typography>
          <Select
            size="small"
            hiddenLabel
            value={EntityTypeSelected}
            onChange={(etc) => {
              setEntityTypeSelected(etc.target.value);
              getFollows(Number(etc.target.value), Category);
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
            {EntityType.map((et) => (
              <MenuItem key={et.id} value={et.id}>
                {et.name}
              </MenuItem>
            ))}
          </Select>
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
            Injustice
          </Typography>
          <Select
            size="small"
            hiddenLabel
            value={Category}
            onChange={(c) => {
              setCategory(c.target.value);
              getFollows(EntityTypeSelected, Number(c.target.value));
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
        <Box sx={{ width: "25%" }}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.secondary.main }}
          >
            Amount of followers
          </Typography>
        </Box>
      </Box>
      <Divider
        orientation="horizontal"
        flexItem
        sx={{ ...QueriesStyles.Divider(theme), m: 0 }}
      />

      {followed?.map((Case) =>
        Case.mostFollowed?.map((Query, index) => (
          <Box
            key={`${Query.injusticeType}-${index}`}
            sx={{
              "&:hover": { background: theme.palette.grey[100] },
              display: "flex",
            }}
            onClick={() => {
              setCase(Query.injusticeType);
            }}
          >
            <Box sx={{ width: "25%", display: "flex", my: 1 }}>
              <Avatar
                src={getEntityPictureUrl(Query.EntityID)}
                alt="Logo"
                style={{ width: 30, height: 30 }}
                sx={{ m: 1, my: "Auto" }}
              />
              <Typography variant="body2" sx={{ my: "Auto" }}>
                {Query.entityname}
              </Typography>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={QueriesStyles.Divider(theme)}
            />

            <Box sx={{ width: "25%", display: "flex", my: 1 }}>
              <Typography variant="body2" sx={{ m: "Auto" }}>
                {Query.entityType}
              </Typography>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={QueriesStyles.Divider(theme)}
            />

            <Box sx={{ width: "25%", display: "flex", my: 1 }}>
              <DescriptionIcon sx={{ my: "Auto", ml: "Auto" }} />
              <Typography variant="body2" sx={{ my: "Auto", mr: "Auto" }}>
                {Query.injusticeType}
              </Typography>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={QueriesStyles.Divider(theme)}
            />

            <Box sx={{ width: "25%", display: "flex", my: 1 }}>
              <Typography variant="body2" sx={{ m: "Auto" }}>
                {Query.followers}
              </Typography>
            </Box>
          </Box>
        )),
      )}
    </Container>
  );
}
