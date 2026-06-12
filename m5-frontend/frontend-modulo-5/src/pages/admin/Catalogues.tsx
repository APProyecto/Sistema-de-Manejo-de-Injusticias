import { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
  CircularProgress,
  MenuItem,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import type {
  Gender,
  Country,
  CategoryEntity,
  InjusticeType,
  Entity,
  Sector,
  IndustryType,
} from "../../types";

import {
  getGenders,
  createGender,
  updateGender,
  deleteGender,
  getCountries,
  createCountry,
  updateCountry,
  deleteCountry,
  getCategoryEntities,
  createCategoryEntity,
  updateCategoryEntity,
  deleteCategoryEntity,
  getEntities,
  createEntity,
  updateEntity,
  deleteEntity,
  getEntityPictureUrl,
  uploadEntityPicture,
  getInjusticeTypes,
  createInjusticeType,
  updateInjusticeType,
  deleteInjusticeType,
  getInjusticeTypePictureUrl,
  uploadInjusticeTypePicture,
  getIndustryTypes,
  getSectors,
} from "../../services/catalogueService";

type TabKey =
  | "genders"
  | "countries"
  | "categories"
  | "entities"
  | "injustices";

interface CatalogueRow {
  id: number;
  name: string;
  raw: any;
}

interface CatalogueConfig {
  label: string;
  idField: string;
  nameField: string;
  bodyField: string;

  getAll: () => Promise<any[]>;
  create: (body: any) => Promise<any>;
  update: (id: number, body: any) => Promise<any>;
  remove: (id: number) => Promise<void>;

  hasPicture?: boolean;
  getPictureUrl?: (id: number, version?: string | number) => string;
  uploadPicture?: (id: number, file: File) => Promise<any>;

  buildCreateBody?: (name: string) => any;
  buildUpdateBody?: (name: string, row: CatalogueRow) => any;
}

const TABS: { key: TabKey; label: string }[] = [
  { key: "genders", label: "Genders" },
  { key: "countries", label: "Countries" },
  { key: "categories", label: "Entity Categories" },
  { key: "entities", label: "Entities" },
  { key: "injustices", label: "Injustice Types" },
];

const CONFIG: Record<TabKey, CatalogueConfig> = {
  /* Gender */
  genders: {
    label: "Genders",
    idField: "GenderID",
    nameField: "GenderName",
    bodyField: "genderName",
    getAll: getGenders,
    create: createGender,
    update: updateGender,
    remove: deleteGender,
  },

  /* Country */
  countries: {
    label: "Countries",
    idField: "CountryID",
    nameField: "CountryName",
    bodyField: "countryName",
    getAll: getCountries,
    create: createCountry,
    update: updateCountry,
    remove: deleteCountry,

    buildCreateBody: (name: string) => ({
      countryName: name,
      continentId: 1,
    }),

    buildUpdateBody: (name: string, row: CatalogueRow) => ({
      countryName: name,
      continentId: row.raw?.ContinentID ?? row.raw?.Continent?.ContinentID ?? 1,
    }),
  },

  /* CategoryEntity */
  categories: {
    label: "Entity Categories",
    idField: "CategoryEntityID",
    nameField: "CategoryName",
    bodyField: "categoryName",
    getAll: getCategoryEntities,
    create: createCategoryEntity,
    update: updateCategoryEntity,
    remove: deleteCategoryEntity,
  },

  /* Entity */
  entities: {
    label: "Entities",
    idField: "EntityID",
    nameField: "EntityName",
    bodyField: "entityName",
    getAll: getEntities,
    create: createEntity,
    update: updateEntity,
    remove: deleteEntity,
    hasPicture: true,
    getPictureUrl: getEntityPictureUrl,
    uploadPicture: uploadEntityPicture,

    // Al editar, intenta conservar categoría, industria y sector actuales.
    buildUpdateBody: (name: string, row: CatalogueRow) => ({
      entityName: name,
      description: row.raw?.Description ?? null,
      categoryEntityId:
        row.raw?.CategoryEntityID ??
        row.raw?.CategoryEntity?.CategoryEntityID ??
        1,
      industryTypeId:
        row.raw?.IndustryTypeID ?? row.raw?.IndustryType?.IndustryTypeID ?? 1,
      sectorId: row.raw?.SectorID ?? row.raw?.Sector?.SectorID ?? 1,
    }),
  },

  /* InjusticeType */
  injustices: {
    label: "Injustice Types",
    idField: "InjusticeTypeID",
    nameField: "InjusticeName",
    bodyField: "injusticeName",
    getAll: getInjusticeTypes,
    create: createInjusticeType,
    update: updateInjusticeType,
    remove: deleteInjusticeType,
    hasPicture: true,
    getPictureUrl: getInjusticeTypePictureUrl,
    uploadPicture: uploadInjusticeTypePicture,
  },
};

export default function Catalogues() {
  const theme = useTheme();

  const [activeTab, setActiveTab] = useState<TabKey>("genders");
  const [rows, setRows] = useState<CatalogueRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [newValue, setNewValue] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const [savingId, setSavingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [uploadingPictureId, setUploadingPictureId] = useState<number | null>(
    null,
  );

  const [entityDescription, setEntityDescription] = useState("");
  const [entityCategoryId, setEntityCategoryId] = useState<number | "">("");
  const [entityIndustryTypeId, setEntityIndustryTypeId] = useState<number | "">(
    "",
  );
  const [entitySectorId, setEntitySectorId] = useState<number | "">("");

  const [categoryOptions, setCategoryOptions] = useState<CategoryEntity[]>([]);
  const [industryOptions, setIndustryOptions] = useState<IndustryType[]>([]);
  const [sectorOptions, setSectorOptions] = useState<Sector[]>([]);

  const [pictureVersionById, setPictureVersionById] = useState<
    Record<number, string | number>
  >({});

  const config = CONFIG[activeTab];

  const inputSx = {
    "& .MuiInputBase-root": {
      backgroundColor: "#fff",
      borderRadius: 2,
      color: "#000",
    },
    "& .MuiInputBase-input": {
      color: "#000",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "rgba(0,0,0,0.55)",
      opacity: 1,
    },
    "& .MuiInputLabel-root": {
      color: "rgba(0,0,0,0.65)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "rgba(0,0,0,0.85)",
    },
    "& .MuiSvgIcon-root": {
      color: "rgba(0,0,0,0.65)",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(0,0,0,0.25)",
    },
  };

  const selectedTabIndex = useMemo(() => {
    return TABS.findIndex((tab) => tab.key === activeTab);
  }, [activeTab]);

  /* Load catalogue rows */
  const loadRows = async () => {
    try {
      setIsLoading(true);

      const data = await config.getAll();

      const mappedRows = data.map((item) => ({
        id: Number(item[config.idField]),
        name: String(item[config.nameField] ?? ""),
        raw: item,
      }));

      setRows(mappedRows);
    } catch (error) {
      console.error("Error loading catalogue:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRows();
  }, [activeTab]);

  /* Load Entity options */
  useEffect(() => {
    const loadEntityOptions = async () => {
      if (activeTab !== "entities") return;

      try {
        const [categories, industries, sectors] = await Promise.all([
          getCategoryEntities(),
          getIndustryTypes(),
          getSectors(),
        ]);

        setCategoryOptions(categories);
        setIndustryOptions(industries);
        setSectorOptions(sectors);
      } catch (error) {
        console.error("Error loading entity options:", error);
      }
    };

    loadEntityOptions();
  }, [activeTab]);

  /* Reset create form when changing tab */
  useEffect(() => {
    setNewValue("");
    setEntityDescription("");
    setEntityCategoryId("");
    setEntityIndustryTypeId("");
    setEntitySectorId("");
    setEditingId(null);
    setEditingValue("");
  }, [activeTab]);

  /* Create catalogue item */
  const handleCreate = async () => {
    const cleanValue = newValue.trim();

    if (!cleanValue) return;

    try {
      let body: any;

      if (activeTab === "entities") {
        if (!entityCategoryId || !entityIndustryTypeId || !entitySectorId) {
          console.warn("Entity category, industry and sector are required.");
          return;
        }

        body = {
          entityName: cleanValue,
          description: entityDescription.trim() || null,
          categoryEntityId: Number(entityCategoryId),
          industryTypeId: Number(entityIndustryTypeId),
          sectorId: Number(entitySectorId),
        };
      } else {
        body = config.buildCreateBody
          ? config.buildCreateBody(cleanValue)
          : {
              [config.bodyField]: cleanValue,
            };
      }

      await config.create(body);

      setNewValue("");
      setEntityDescription("");
      setEntityCategoryId("");
      setEntityIndustryTypeId("");
      setEntitySectorId("");

      await loadRows();
    } catch (error) {
      console.error("Error creating catalogue item:", error);
    }
  };

  /* Start editing */
  const handleStartEdit = (row: CatalogueRow) => {
    setEditingId(row.id);
    setEditingValue(row.name);
  };

  /* Cancel editing */
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingValue("");
  };

  /* Save edited catalogue item */
  const handleSaveEdit = async (row: CatalogueRow) => {
    const cleanValue = editingValue.trim();

    if (!cleanValue) return;

    try {
      setSavingId(row.id);

      const body = config.buildUpdateBody
        ? config.buildUpdateBody(cleanValue, row)
        : {
            [config.bodyField]: cleanValue,
          };

      await config.update(row.id, body);

      setEditingId(null);
      setEditingValue("");

      await loadRows();
    } catch (error) {
      console.error("Error updating catalogue item:", error);
    } finally {
      setSavingId(null);
    }
  };

  /* Delete catalogue item */
  const handleDelete = async (rowId: number) => {
    try {
      setDeletingId(rowId);

      await config.remove(rowId);

      await loadRows();
    } catch (error) {
      console.error("Error deleting catalogue item:", error);
    } finally {
      setDeletingId(null);
    }
  };

  /* Upload picture for Entity or InjusticeType */
  const handlePictureChange = async (rowId: number, file?: File | null) => {
    if (!file) return;

    if (!config.uploadPicture) return;

    try {
      setUploadingPictureId(rowId);

      const response = await config.uploadPicture(rowId, file);

      const version =
        response?.picture?.mongoFileId ?? response?.mongoFileId ?? Date.now();

      setPictureVersionById((current) => ({
        ...current,
        [rowId]: version,
      }));
    } catch (error) {
      console.error("Error uploading picture:", error);
    } finally {
      setUploadingPictureId(null);
    }
  };

  /* Get picture URL for Entity or InjusticeType */
  const getRowPictureUrl = (row: CatalogueRow): string | undefined => {
    if (!config.getPictureUrl) return undefined;

    return config.getPictureUrl(row.id, pictureVersionById[row.id]);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        color: theme.palette.text.primary,
      }}
    >
      <Card
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 3,
          }}
        >
          Catalogue Management
        </Typography>

        {/* Catalogue Tabs */}
        <Tabs
          value={selectedTabIndex}
          onChange={(_, value) => setActiveTab(TABS[value].key)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 3,
            "& .MuiTabs-indicator": {
              backgroundColor: "#f6c44b",
            },
            "& .MuiTab-root": {
              color: "#ffffff",
              textTransform: "none",
              fontWeight: 600,
            },
            "& .MuiTab-root.Mui-selected": {
              color: "#f6c44b",
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.key} label={tab.label} />
          ))}
        </Tabs>

        {/* Create new item */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: activeTab === "entities" ? 2 : 3,
          }}
        >
          <TextField
            fullWidth
            value={newValue}
            onChange={(event) => setNewValue(event.target.value)}
            placeholder={`New ${config.label}`}
            size="small"
            sx={inputSx}
          />

          <Button
            variant="contained"
            onClick={handleCreate}
            startIcon={<AddIcon />}
            sx={{
              minWidth: { xs: "100%", sm: 150 },
              backgroundColor: "#f6c44b",
              color: "#000",
              fontWeight: 700,
              "&:hover": {
                backgroundColor: "#d9a92f",
              },
            }}
          >
            Add
          </Button>
        </Box>

        {/* Extra Entity fields */}
        {activeTab === "entities" && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 2,
              mb: 3,
            }}
          >
            <TextField
              fullWidth
              multiline
              minRows={2}
              value={entityDescription}
              onChange={(event) => setEntityDescription(event.target.value)}
              placeholder="Entity description"
              size="small"
              sx={{
                ...inputSx,
                gridColumn: {
                  xs: "auto",
                  md: "1 / 4",
                },
              }}
            />

            <TextField
              select
              fullWidth
              value={entityCategoryId}
              onChange={(event) =>
                setEntityCategoryId(Number(event.target.value))
              }
              label="Category"
              size="small"
              sx={inputSx}
            >
              {categoryOptions.map((category) => (
                <MenuItem
                  key={category.CategoryEntityID}
                  value={category.CategoryEntityID}
                  sx={{ color: "#000" }}
                >
                  {category.CategoryName}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              value={entityIndustryTypeId}
              onChange={(event) =>
                setEntityIndustryTypeId(Number(event.target.value))
              }
              label="Industry"
              size="small"
              sx={inputSx}
            >
              {industryOptions.map((industry) => (
                <MenuItem
                  key={industry.IndustryTypeID}
                  value={industry.IndustryTypeID}
                  sx={{ color: "#000" }}
                >
                  {industry.IndustryName}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              value={entitySectorId}
              onChange={(event) =>
                setEntitySectorId(Number(event.target.value))
              }
              label="Sector"
              size="small"
              sx={inputSx}
            >
              {sectorOptions.map((sector) => (
                <MenuItem
                  key={sector.SectorID}
                  value={sector.SectorID}
                  sx={{ color: "#000" }}
                >
                  {sector.SectorName}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}

        {/* Catalogue list */}
        <Box
          sx={{
            maxHeight: {
              xs: "calc(100vh - 420px)",
              md:
                activeTab === "entities"
                  ? "calc(100vh - 500px)"
                  : "calc(100vh - 330px)",
            },
            overflowY: "auto",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            pr: 1,
            pb: 3,

            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "rgba(255,255,255,0.08)",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#f6c44b",
              borderRadius: "8px",
            },
          }}
        >
          {isLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 4,
              }}
            >
              <CircularProgress size={28} />
            </Box>
          )}

          {!isLoading &&
            rows.map((row) => (
              <Box
                key={row.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: config.hasPicture ? "auto 1fr auto" : "1fr auto",
                  },
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Picture section for Entity and InjusticeType */}
                {config.hasPicture && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Avatar
                      src={getRowPictureUrl(row)}
                      sx={{
                        width: 46,
                        height: 46,
                        bgcolor: "#f6c44b",
                        color: "#000",
                        fontWeight: 700,
                      }}
                    >
                      {row.name.charAt(0)}
                    </Avatar>

                    <IconButton
                      component="label"
                      disabled={uploadingPictureId === row.id}
                      sx={{
                        color: "#f6c44b",
                      }}
                    >
                      {uploadingPictureId === row.id ? (
                        <CircularProgress size={22} />
                      ) : (
                        <PhotoCameraIcon />
                      )}

                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          handlePictureChange(row.id, file);
                          event.target.value = "";
                        }}
                      />
                    </IconButton>
                  </Box>
                )}

                {/* Text section */}
                <Box sx={{ minWidth: 0 }}>
                  {editingId === row.id ? (
                    <TextField
                      fullWidth
                      value={editingValue}
                      onChange={(event) => setEditingValue(event.target.value)}
                      size="small"
                      sx={inputSx}
                    />
                  ) : (
                    <Typography
                      sx={{
                        fontWeight: 600,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: { xs: "normal", md: "nowrap" },
                        wordBreak: "break-word",
                      }}
                    >
                      {row.name}
                    </Typography>
                  )}

                  {activeTab === "entities" && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        mt: 0.5,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: { xs: "normal", md: "nowrap" },
                        wordBreak: "break-word",
                      }}
                    >
                      {row.raw?.Description || "No description"}
                    </Typography>
                  )}
                </Box>

                {/* Actions section */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: { xs: "flex-end", md: "center" },
                  }}
                >
                  {editingId === row.id ? (
                    <>
                      <IconButton
                        onClick={() => handleSaveEdit(row)}
                        disabled={savingId === row.id}
                        sx={{
                          color: "#f6c44b",
                        }}
                      >
                        {savingId === row.id ? (
                          <CircularProgress size={22} />
                        ) : (
                          <SaveIcon />
                        )}
                      </IconButton>

                      <IconButton
                        onClick={handleCancelEdit}
                        sx={{
                          color: "#ffffff",
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        onClick={() => handleStartEdit(row)}
                        sx={{
                          color: "#f6c44b",
                        }}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        onClick={() => handleDelete(row.id)}
                        disabled={deletingId === row.id}
                        sx={{
                          color: "#ff6b6b",
                        }}
                      >
                        {deletingId === row.id ? (
                          <CircularProgress size={22} />
                        ) : (
                          <DeleteIcon />
                        )}
                      </IconButton>
                    </>
                  )}
                </Box>
              </Box>
            ))}

          {!isLoading && rows.length === 0 && (
            <Box
              sx={{
                py: 4,
                textAlign: "center",
              }}
            >
              <Typography sx={{ color: theme.palette.text.secondary }}>
                No catalogue items found.
              </Typography>
            </Box>
          )}
        </Box>
      </Card>
    </Container>
  );
}
