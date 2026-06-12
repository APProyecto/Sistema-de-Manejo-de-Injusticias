import { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Tab,
  Tabs,
  Typography,
  useTheme,
  Chip,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { manageUsersStyles } from "../styles/ManageUsersStyles";
import { useAuth } from "../../context/authContext";

import {
  getAllNormalUsers,
  getAllAdmins,
  postConvertUserToAdmin,
  postConvertAdminToUser,
  getAllAccountStates,
  getUserProfilePictureUrl,
  postChangeUserState,
} from "../../services/userService";

import type { AccountState } from "../../services/userService";
import type { User } from "../../types";

interface ManageUserRow {
  id: number;
  name: string;
  username: string;
  email: string;
  picture?: string | null;
  role: "user" | "admin" | "master";
  statusId: number;
  status: string;
}

export default function ManageUsers() {
  const theme = useTheme();
  const { user: currentUser } = useAuth();

  const canManageRoles = Boolean(currentUser?.isSuperAdmin);

  const [tabIndex, setTabIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<ManageUserRow[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [accountStates, setAccountStates] = useState<AccountState[]>([]);
  const [changingRoleId, setChangingRoleId] = useState<number | null>(null);
  const [changingStatusId, setChangingStatusId] = useState<number | null>(null);

  const mapUserToManageRow = (
    user: User,
    states: AccountState[],
  ): ManageUserRow => {
    let role: ManageUserRow["role"] = "user";

    if (user.isSuperAdmin) {
      role = "master";
    } else if (user.isAdmin) {
      role = "admin";
    }

    const statusId = Number(user.accountStatus);

    const statusName =
      states.find((state) => state.AccountStateID === statusId)?.StateName ??
      "Unknown";

    const picture = getUserProfilePictureUrl(user.appUserId);

    return {
      id: user.appUserId,
      name: `${user.firstName} ${user.lastName}`.trim() || user.appUserName,
      username: `@${user.appUserName}`,
      email: user.email,
      picture: picture,
      role,
      statusId,
      status: statusName,
    };
  };
  const loadUsers = async () => {
    try {
      setIsLoadingUsers(true);

      const [normalUsers, adminUsers, states] = await Promise.all([
        getAllNormalUsers(),
        getAllAdmins(),
        getAllAccountStates(),
      ]);

      setAccountStates(states);

      const mappedNormalUsers = normalUsers.map((user) =>
        mapUserToManageRow(user, states),
      );

      const mappedAdminUsers = adminUsers.map((user) =>
        mapUserToManageRow(user, states),
      );

      setUsers([...mappedNormalUsers, ...mappedAdminUsers]);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesTab =
        tabIndex === 0 ? user.role === "user" : user.role !== "user";
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        user.name.toLowerCase().includes(searchLower) ||
        user.username.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower);
      return matchesTab && matchesSearch;
    });
  }, [users, searchTerm, tabIndex]);

  const handleRoleToggle = async (id: number) => {
    if (!canManageRoles) {
      console.warn("Only super admins can change user roles.");
      return;
    }

    const selectedUser = users.find((user) => user.id === id);

    if (!selectedUser) return;

    if (selectedUser.role === "master") {
      console.warn("Super admin role cannot be changed from this screen.");
      return;
    }

    try {
      setChangingRoleId(id);

      if (selectedUser.role === "user") {
        await postConvertUserToAdmin(id);
      } else {
        await postConvertAdminToUser(id);
      }

      await loadUsers();
    } catch (error) {
      console.error("Error changing user role:", error);
    } finally {
      setChangingRoleId(null);
    }
  };

  const handleStatusChange = async (id: number, statusId: number) => {
    const selectedState = accountStates.find(
      (state) => state.AccountStateID === statusId,
    );

    if (!selectedState) return;

    try {
      setChangingStatusId(id);

      await postChangeUserState(id, statusId);

      setUsers((current) =>
        current.map((user) =>
          user.id === id
            ? {
                ...user,
                statusId,
                status: selectedState.StateName,
              }
            : user,
        ),
      );

      await loadUsers();
    } catch (error) {
      console.error("Error changing user status:", error);
    } finally {
      setChangingStatusId(null);
    }
  };

  const statusBgColor = (status: string) => {
    const normalizedStatus = status.toLowerCase();

    if (
      normalizedStatus.includes("active") ||
      normalizedStatus.includes("activo")
    ) {
      return "#f6c44b";
    }

    if (normalizedStatus.includes("suspend")) {
      return "#f08a24";
    }

    if (
      normalizedStatus.includes("deactivated") ||
      normalizedStatus.includes("desactiv")
    ) {
      return "#b02525";
    }

    if (
      normalizedStatus.includes("pending") ||
      normalizedStatus.includes("pendiente")
    ) {
      return "#8a8f94";
    }

    return "#8a8f94";
  };
  return (
    <Container maxWidth="xl" sx={manageUsersStyles.container(theme)}>
      <Card sx={manageUsersStyles.card(theme)}>
        <Box sx={manageUsersStyles.innerPanel(theme)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Tabs
              value={tabIndex}
              onChange={(_, value) => setTabIndex(value)}
              textColor="primary"
              indicatorColor="primary"
              sx={{
                ...manageUsersStyles.tabs(theme),
                "& .MuiTabs-indicator": { backgroundColor: "#f6c44b" },
                "& .MuiTab-root.Mui-selected": { color: "#f6c44b" },
              }}
            >
              <Tab label="Registered users" sx={{ color: "#ffffff" }} />
              <Tab label="Administrators" sx={{ color: "#ffffff" }} />
            </Tabs>
            <Box sx={manageUsersStyles.totalBox(theme)}>
              <Avatar sx={{ bgcolor: "#f6c44b", color: "#000" }}>
                <PeopleAltOutlinedIcon />
              </Avatar>
              <Typography
                sx={{ fontWeight: 600, color: theme.palette.text.primary }}
              >
                Total: {users.length}
              </Typography>
            </Box>
            <Box sx={manageUsersStyles.toolbar(theme)}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Showing {filteredUsers.length}{" "}
                {tabIndex === 0 ? "regular users" : "administrators"}
              </Typography>
              <OutlinedInput
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search"
                size="small"
                sx={{
                  ...manageUsersStyles.search(theme),
                  boxShadow: "none",
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchOutlinedIcon color="action" />
                  </InputAdornment>
                }
              />
            </Box>

            <Box sx={manageUsersStyles.gridHeader(theme)}>
              <Typography
                variant="caption"
                sx={manageUsersStyles.headerCaption(theme)}
              >
                User
              </Typography>
              <Typography
                variant="caption"
                sx={manageUsersStyles.headerCaption(theme)}
              >
                Current Status
              </Typography>
              <Typography
                variant="caption"
                sx={manageUsersStyles.headerCaption(theme)}
              >
                Select New Status
              </Typography>
              <Typography
                variant="caption"
                sx={manageUsersStyles.headerCaption(theme)}
              >
                Change Role
              </Typography>
            </Box>

            <Box
              sx={{
                maxHeight: "calc(100vh - 460px)",
                overflowY: "auto",
                overflowX: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                pr: 1,

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
              {filteredUsers.map((user, index) => (
                <Box key={user.id} sx={manageUsersStyles.row(theme, index)}>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Avatar
                      src={user.picture || undefined}
                      sx={{
                        bgcolor: "#f6c44b",
                        width: 42,
                        height: 42,
                        color: "#000",
                      }}
                    >
                      {user.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography sx={manageUsersStyles.userName(theme)}>
                        {user.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={manageUsersStyles.userMeta(theme)}
                      >
                        {user.username} · {user.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Chip
                    label={user.status}
                    sx={{
                      backgroundColor: statusBgColor(user.status),
                      color: "#fff",
                      ...manageUsersStyles.statusChip(theme),
                    }}
                  />

                  <FormControl
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={manageUsersStyles.selectControl(theme)}
                  >
                    <Select
                      value={user.statusId}
                      disabled={changingStatusId === user.id}
                      onChange={(event) =>
                        handleStatusChange(user.id, Number(event.target.value))
                      }
                      sx={{ borderRadius: 2, color: "#000000b6" }}
                    >
                      {accountStates.map((state) => (
                        <MenuItem
                          key={state.AccountStateID}
                          value={state.AccountStateID}
                          sx={{ color: "#000000b6" }}
                        >
                          {state.StateName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button
                    variant={
                      user.role === "admin" || user.role === "master"
                        ? "contained"
                        : "outlined"
                    }
                    color={
                      user.role === "admin" || user.role === "master"
                        ? "primary"
                        : "inherit"
                    }
                    onClick={() => handleRoleToggle(user.id)}
                    disabled={
                      !canManageRoles ||
                      user.role === "master" ||
                      changingRoleId === user.id
                    }
                    sx={manageUsersStyles.adminButton(
                      theme,
                      user.role === "admin" || user.role === "master",
                    )}
                    startIcon={<AdminPanelSettingsOutlinedIcon />}
                  >
                    {!canManageRoles
                      ? "Only super admin"
                      : changingRoleId === user.id
                        ? "Updating..."
                        : user.role === "master"
                          ? "Master admin"
                          : user.role === "admin"
                            ? "Revoke admin"
                            : "Make admin"}
                  </Button>
                </Box>
              ))}

              {filteredUsers.length === 0 && (
                <Box sx={manageUsersStyles.emptyBox(theme)}>
                  <Typography sx={{ color: theme.palette.text.secondary }}>
                    No users found for this filter.
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
