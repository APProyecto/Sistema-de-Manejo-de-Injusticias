import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
  useTheme,
  Autocomplete,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { editProfileStyles } from "../styles/EditProfileStyles";
import DefaultAvatar from "../../assets/pfpDefaultImage.png";
import { countries } from "../../data/countries";
import { genders } from "../../data/genders";
import type { User } from "../../types";

import {
  postUserProfileModification,
  getUserProfilePictureUrl,
} from "../../services/userService";

export default function EditProfile() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [previewPicture, setPreviewPicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState(0);
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user) return;

    const currentUser = user as any;

    const userId = currentUser.appUserId ?? currentUser.userId;
    const usernameValue = currentUser.appUserName ?? currentUser.username ?? "";

    const pictureUrl = currentUser.picture
      ? currentUser.picture
      : userId
        ? getUserProfilePictureUrl(userId)
        : "";

    setUsername(usernameValue);
    setProfilePicture(pictureUrl);
    setPreviewPicture(pictureUrl || DefaultAvatar);
    setFirstName(currentUser.firstName ?? "");
    setLastName(currentUser.lastName ?? "");
    setEmail(currentUser.email ?? "");
    setGender(currentUser.gender ? Number(currentUser.gender) : 1);
    setCountry(currentUser.country ? Number(currentUser.country) : 1);
  }, [user]);

  const initials = useMemo(() => {
    if (!username) return "U";
    return username.slice(0, 1).toUpperCase();
  }, [username]);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const nextPicture = URL.createObjectURL(file);
    setProfilePicture(nextPicture);
    setPreviewPicture(nextPicture);

    event.target.value = "";
  };

  const handleSave = async () => {
    if (!user) return;

    const currentUser = user as any;
    const userId = currentUser.appUserId ?? currentUser.userId;

    const response = await postUserProfileModification(
      userId,
      {
        firstName,
        lastName,
        userName: username,
        genderId: gender,
        countryId: country,
      },
      selectedFile,
    );

    const finalPicture = response.picture
      ? getUserProfilePictureUrl(userId, response.picture.mongoFileId)
      : profilePicture;

    const updatedUser: User = {
      ...user,
      appUserId: userId,
      appUserName: username,
      firstName,
      lastName,
      email,
      gender: String(gender),
      country: String(country),
      picture: finalPicture,
    };

    await login(updatedUser);

    navigate("/my-votes");
  };

  return (
    <Container sx={editProfileStyles.container(theme)}>
      <Button onClick={handleBack} sx={editProfileStyles.backButton(theme)}>
        <ArrowBackIcon />
        <Typography sx={editProfileStyles.backTitle(theme)}>
          Edit User Profile
        </Typography>
      </Button>

      <Container sx={editProfileStyles.panel()}>
        <Box sx={editProfileStyles.topSection()}>
          <Box sx={editProfileStyles.avatarColumn()}>
            <Avatar
              src={previewPicture || DefaultAvatar}
              alt={username}
              sx={editProfileStyles.avatar()}
            >
              {initials}
            </Avatar>

            <Button
              component="label"
              sx={editProfileStyles.changePictureButton()}
            >
              <EditIcon />
              Change Picture
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
              />
            </Button>
          </Box>

          <Box sx={editProfileStyles.usernameColumn()}>
            <Box
              sx={{ position: "relative", width: "100%", maxWidth: "260px" }}
            >
              <TextField
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                sx={editProfileStyles.usernameField(theme)}
              />
              <EditIcon
                sx={{
                  ...editProfileStyles.usernameEditIcon(),
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={editProfileStyles.form()}>
          <Box sx={editProfileStyles.fieldGroup()}>
            <Typography sx={editProfileStyles.label(theme)}>
              Firstname
            </Typography>
            <TextField
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={editProfileStyles.textField(theme)}
            />
          </Box>

          <Box sx={editProfileStyles.fieldGroup()}>
            <Typography sx={editProfileStyles.label(theme)}>
              Last name
            </Typography>
            <TextField
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={editProfileStyles.textField(theme)}
            />
          </Box>

          <Box sx={editProfileStyles.fieldGroup()}>
            <Typography sx={editProfileStyles.label(theme)}>Gender</Typography>
            <TextField
              select
              value={gender}
              onChange={(e) => setGender(Number(e.target.value))}
              sx={editProfileStyles.textField(theme)}
              slotProps={{
                select: {
                  MenuProps: {
                    sx: {
                      "& .MuiMenuItem-root": {
                        color: "black !important",
                      },
                    },
                  },
                },
              }}
            >
              {genders.map((g) => (
                <MenuItem key={g.id} value={g.id}>
                  {g.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={editProfileStyles.fieldGroup()}>
            <Typography sx={editProfileStyles.label(theme)}>Email</Typography>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={editProfileStyles.textField(theme)}
              disabled
            />
          </Box>

          <Box sx={editProfileStyles.fieldGroup()}>
            <Typography sx={editProfileStyles.label(theme)}>Country</Typography>
            <Autocomplete
              value={countries.find((c) => c.id === country) ?? null}
              options={countries}
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => setCountry(value?.id ?? 0)}
              sx={{
                width: "100%",
                "& .MuiFilledInput-root": {
                  background: "white",
                  height: "50px",
                  color: theme.palette.background.default,
                  borderRadius: "8px !important",
                  "&:before": { borderBottom: "none" },
                  "&:after": { borderBottom: "none" },
                  "&:hover:not(.Mui-disabled):before": { borderBottom: "none" },
                },
                "& .MuiInputLabel-root": {
                  color: theme.palette.text.secondary,
                },
                "& .MuiFilledInput-root:hover": {
                  background: "white",
                },
                "& .MuiFilledInput-root.Mui-focused": {
                  background: theme.palette.background.paper,
                },
              }}
              renderInput={(params) => (
                <TextField {...params} variant="filled" hiddenLabel />
              )}
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: theme.palette.background.paper,
                    color: "black",
                    "& .MuiAutocomplete-option:hover": {
                      backgroundColor: theme.palette.grey[200],
                    },
                    '& .MuiAutocomplete-option[aria-selected="true"]': {
                      backgroundColor: theme.palette.grey[300],
                    },
                  },
                },
              }}
            />
          </Box>
        </Box>

        <Box sx={editProfileStyles.actions()}>
          <Button onClick={handleSave} sx={editProfileStyles.saveButton()}>
            Save
          </Button>
          <Button onClick={handleBack} sx={editProfileStyles.cancelButton()}>
            Cancel
          </Button>
        </Box>
      </Container>
    </Container>
  );
}
