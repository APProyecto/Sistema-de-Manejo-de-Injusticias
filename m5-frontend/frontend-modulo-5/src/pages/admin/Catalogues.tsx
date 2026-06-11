import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Input,
  useTheme,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import { CataloguesStyles } from "../styles/CataloguesStyles";

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
  getInjusticeTypes,
  createInjusticeType,
  updateInjusticeType,
  deleteInjusticeType,
} from "../../services/catalogueService";

type TabKey = "genders" | "countries" | "categories" | "injustices";

interface Row {
  id: number;
  name: string;
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
}

const TABS: { key: TabKey; label: string }[] = [
  { key: "genders", label: "Genders" },
  { key: "countries", label: "Countries" },
  { key: "categories", label: "Entity Categories" },
  { key: "injustices", label: "Injustice Types" },
];

const CONFIG: Record<TabKey, CatalogueConfig> = {
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

  countries: {
    label: "Countries",
    idField: "CountryID",
    nameField: "CountryName",
    bodyField: "countryName",
    getAll: getCountries,
    create: createCountry,
    update: updateCountry,
    remove: deleteCountry,
  },

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
    injustices: {
    label: "Injustice Types",
    idField: "InjusticeTypeID",
    nameField: "InjusticeName",
    bodyField: "injusticeName",
    getAll: getInjusticeTypes,
    create: createInjusticeType,
    update: updateInjusticeType,
    remove: deleteInjusticeType,
    },
};

function toRows(tab: TabKey, data: any[]): Row[] {
  const config = CONFIG[tab];

  return data.map((item) => ({
    id: Number(item[config.idField]),
    name: String(item[config.nameField] ?? ""),
  }));
}

export default function Catalogues() {
  const theme = useTheme();
  const s = CataloguesStyles;

  const [activeTab, setActiveTab] = useState<TabKey>("genders");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [newName, setNewName] = useState("");
  const [addError, setAddError] = useState("");
  const [adding, setAdding] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editError, setEditError] = useState("");

  const fetchRows = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await CONFIG[activeTab].getAll();
      setRows(toRows(activeTab, data));
    } catch (err: any) {
      const msg =
        err.response?.data?.error || "Error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const handleAdd = async () => {
    const trimmed = newName.trim();

    if (!trimmed) {
      setAddError("The name can't be empty");
      return;
    }

    setAddError("");
    setAdding(true);

    try {
      const body = {
        [CONFIG[activeTab].bodyField]: trimmed,
      };

      await CONFIG[activeTab].create(body);

      setNewName("");
      await fetchRows();
    } catch (err: any) {
      const msg = err.response?.data?.error || "Error creating the record";
      setAddError(msg);
    } finally {
      setAdding(false);
    }
  };

  const startEdit = (row: Row) => {
    setEditingId(row.id);
    setEditName(row.name);
    setEditError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditError("");
  };

  const handleSaveEdit = async (id: number) => {
    const trimmed = editName.trim();

    if (!trimmed) {
      setEditError("The name can't be empty");
      return;
    }

    setEditError("");

    try {
      const body = {
        [CONFIG[activeTab].bodyField]: trimmed,
      };

      await CONFIG[activeTab].update(id, body);

      setEditingId(null);
      setEditName("");
      await fetchRows();
    } catch (err: any) {
      const msg =
        err.response?.data?.error || "Error updating the record.";
      setEditError(msg);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await CONFIG[activeTab].remove(id);
      await fetchRows();
    } catch (err: any) {
      const msg =
        err.response?.data?.error || "Error deleting the record";
      setError(msg);
    }
  };

  const handleChangeTab = (tab: TabKey) => {
    setActiveTab(tab);
    setEditingId(null);
    setEditName("");
    setEditError("");
    setAddError("");
    setError("");
  };

  return (
    <Container sx={s.mainContainer(theme)}>
      <Typography variant="h2" sx={s.pageTitle(theme)}>
        Catálogos
      </Typography>

      <Box sx={s.tabsContainer(theme)}>
        {TABS.map((tab) => (
          <Button
            key={tab.key}
            sx={s.tabButton(theme, activeTab === tab.key)}
            onClick={() => handleChangeTab(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </Box>

      <Box sx={s.panel(theme)}>
        <Box sx={s.addRow(theme)}>
          <TextField
            placeholder={`New ${CONFIG[activeTab].label.toLowerCase()}`}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
            sx={s.addField(theme)}
            variant="outlined"
            size="small"
          />

          <Button
            sx={s.addButton(theme)}
            onClick={handleAdd}
            disabled={adding}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>

        {addError && (
          <Typography sx={s.errorText(theme)}>{addError}</Typography>
        )}

        <Box sx={s.tableHeader(theme)}>
          <Typography
            sx={{ ...s.headerText(theme), width: "48px", flexShrink: 0 }}
          >
            #
          </Typography>

          <Typography sx={{ ...s.headerText(theme), flex: 1 }}>
            Name
          </Typography>

          <Typography
            sx={{
              ...s.headerText(theme),
              width: "80px",
              textAlign: "right",
            }}
          >
            Actions
          </Typography>
        </Box>

        {loading && (
          <Typography sx={s.emptyText(theme)}>Loading...</Typography>
        )}

        {!loading && error && (
          <Typography sx={s.errorText(theme)}>{error}</Typography>
        )}

        {!loading && !error && rows.length === 0 && (
          <Typography sx={s.emptyText(theme)}>
            There is not registers
          </Typography>
        )}

        {!loading &&
          !error &&
          rows.map((row) => (
            <Box key={row.id} sx={s.tableRow(theme)}>
              <Typography sx={s.rowId(theme)}>{row.id}</Typography>

              {editingId === row.id ? (
                <>
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveEdit(row.id);
                      if (e.key === "Escape") cancelEdit();
                    }}
                    autoFocus
                    disableUnderline
                    sx={s.editField(theme)}
                  />

                  {editError && (
                    <Typography sx={s.errorText(theme)}>
                      {editError}
                    </Typography>
                  )}

                  <IconButton
                    sx={s.saveButton(theme)}
                    onClick={() => handleSaveEdit(row.id)}
                  >
                    <CheckIcon fontSize="small" />
                  </IconButton>

                  <IconButton sx={s.iconButton(theme)} onClick={cancelEdit}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography sx={s.rowName(theme)}>{row.name}</Typography>

                  <IconButton
                    sx={s.iconButton(theme)}
                    onClick={() => startEdit(row)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    sx={s.deleteButton(theme)}
                    onClick={() => handleDelete(row.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </>
              )}
            </Box>
          ))}

        {!loading && !error && rows.length > 0 && (
          <Typography sx={s.totalText(theme)}>Total: {rows.length}</Typography>
        )}
      </Box>
    </Container>
  );
}