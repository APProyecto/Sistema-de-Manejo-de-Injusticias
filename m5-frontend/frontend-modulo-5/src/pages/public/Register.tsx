import {
  Avatar,
  TextField,
  useTheme,
  IconButton,
  Autocomplete,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import { sideMenuStyles } from "../../components/styles/SideMenuStyles";
import pfpSrc from "../../assets/pfpDefaultImage.png";
import CreateIcon from "@mui/icons-material/Create";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Gender, Country } from "../../types";
import { getGenders, getCountries } from '../../services/catalogueService';

export default function Register() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryOptions, setCountryOptions] = useState<Country[]>([]);
  const [country, setCountry] = useState<Country | null>(null);
  const [gender, setGender] = useState(1);
  const [genderOptions, setGenderOptions] = useState<Gender[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    const loadGenders = async () => {
      try {
        const data = await getGenders();
        setGenderOptions(data);
      } catch (error) {
        setError("Error loading genders");
      }
    };

    loadGenders();
  }, []);

  useEffect(() => {
  const loadCountries = async () => {
    try {
      const data = await getCountries();
      setCountryOptions(data);
    } catch (error) {
      setError("Error loading countries");
    }
  };

  loadCountries();
}, []);

  const handleRegister = async () => {
    const registerResult = await fetch(
      `${import.meta.env.VITE_API_MODULE1}/api/users/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          username: userName,
          email,
          password,
          genderId: gender,
          countryId: country?.CountryID,
        }),
      },
    );
    const registerData = await registerResult.json();

    if (!registerResult.ok) {
      setError(registerData.error);
      return;
    }

    setSuccess("User registered successfully!");

    if (profilePicture) {
      const formData = new FormData();
      formData.append("file", profilePicture);

      await fetch(
        `${import.meta.env.VITE_API_MODULE1}/api/files/appUser/${registerData.appUserId}/picture`,
        {
          method: "PUT",
          body: formData,
        },
      );
    }

    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <Container
      sx={(theme) => ({
        background: theme.palette.background.default,
        height: "100vh",
        width: "100vw",
      })}
    >
      <Box
        sx={(theme) => ({
          background: theme.palette.background.default,
          height: "90%",
          width: "90%",
          display: "flex",
          pl: "5%",
          pr: "5%",
          pt: 5,
        })}
      >
        <Divider
          orientation="vertical"
          flexItem
          sx={(theme) => ({
            background: theme.palette.secondary.main,
            mr: "auto",
            border: 2,
            borderRadius: 5,
          })}
        />

        <Box
          sx={(theme) => ({
            background: theme.palette.background.default,
            height: "100%",
            width: "90%",
          })}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
            }}
          >
            <Button
              color="inherit"
              aria-label="like"
              sx={{
                borderRadius: 5,
                mb: 1,
                justifyContent: "flex-start",
              }}
              onClick={() => handleNavigation("/")}
            >
              <ArrowBackIcon />
              <Typography variant="h3">Register</Typography>
            </Button>
          </Box>

          <Card
            sx={(theme) => ({
              background: theme.palette.grey[100],
              height: "auto",
              borderRadius: 5,
            })}
          >
            <CardContent
              sx={{
                height: "100%",
                width: "100%",
                p: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  height: "100%",
                  width: "100%",
                  p: 0,
                  m: 0,
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: "30%",
                  }}
                >
                  <Avatar
                    src={
                      profilePicture
                        ? URL.createObjectURL(profilePicture)
                        : pfpSrc
                    }
                    alt="Logo"
                    style={{ width: 100, height: 100 }}
                    sx={{ ml: "auto", mr: "auto", mt: 3, mb: 3 }}
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setProfilePicture(e.target.files?.[0] ?? null)
                    }
                    style={{ display: "none" }}
                    id="pfp-input"
                  />
                  <label htmlFor="pfp-input">
                    <Button
                      component="span"
                      sx={sideMenuStyles.searchFileButton(theme)}
                    >
                      <CreateIcon />
                      <Typography sx={sideMenuStyles.buttonText(theme)}>
                        Change profile picture
                      </Typography>
                    </Button>
                  </label>
                </Box>

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={(theme) => ({
                    background: theme.palette.secondary.main,
                    mr: 1,
                    ml: 1,
                    border: 0.5,
                  })}
                />

                <Box
                  sx={{
                    width: "65%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                    sx={{
                      background: theme.palette.background.default,
                      width: "95%",
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: theme.palette.background.default,
                        borderRadius: 5,
                      },
                      borderRadius: 5,
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Grid container spacing={0}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ m: 0 }}>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  p: 1,
                  mt: 1,
                  mb: 1,
                }}
              >
                <Typography variant="h3" align="left" sx={{ ml: 3, mt: 0 }}>
                  First name
                </Typography>
                <TextField
                  placeholder="First name"
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={{
                    width: "95%",
                    color: theme.palette.background.default,
                    "& .MuiOutlinedInput-root": {
                      background: theme.palette.background.paper,
                      color: theme.palette.background.default,
                      borderRadius: 5,
                    },
                    borderRadius: 5,
                    m: 0,
                  }}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{ m: 0 }}>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  p: 1,
                  mt: 1,
                  mb: 1,
                }}
              >
                <Typography variant="h3" align="left" sx={{ ml: 3, mt: 0 }}>
                  Last name
                </Typography>
                <TextField
                  placeholder="Last name"
                  onChange={(e) => setLastName(e.target.value)}
                  sx={{
                    width: "95%",
                    color: theme.palette.background.default,
                    "& .MuiOutlinedInput-root": {
                      background: theme.palette.background.paper,
                      color: theme.palette.background.default,
                      borderRadius: 5,
                    },
                    borderRadius: 5,
                    m: 0,
                  }}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{ m: 0 }}>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  p: 1,
                  mt: 1,
                  mb: 1,
                }}
              >
                <Typography variant="h3" align="left" sx={{ ml: 3, mt: 0 }}>
                  Country
                </Typography>
                <Autocomplete
                  sx={{
                    width: "95%",
                    borderRadius: 5,
                    marginLeft: 1.6,
                    "& .MuiFilledInput-root": {
                      background: theme.palette.background.paper,
                      color: theme.palette.background.default,
                      borderRadius: 5,
                      "&:before": { borderBottom: "none" },
                      "&:after": { borderBottom: "none" },
                      "&:hover:not(.Mui-disabled):before": {
                        borderBottom: "none",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: theme.palette.text.secondary,
                    },
                    "& .MuiFilledInput-root:hover": {
                      background: theme.palette.background.paper,
                    },
                    "& .MuiFilledInput-root.Mui-focused": {
                      background: theme.palette.background.paper,
                    },
                  }}
                  options={countryOptions}
                  value={country}
                  getOptionLabel={(option) => option.CountryName}
                  isOptionEqualToValue={(option, value) =>
                    option.CountryID === value.CountryID
                  }
                  onChange={(_, newValue) => {
                    setCountry(newValue);
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
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{ m: 0 }}>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  p: 1,
                  mt: 1,
                  mb: 1,
                }}
              >
                <Typography variant="h3" align="left" sx={{ ml: 3, mt: 0 }}>
                  Gender
                </Typography>
                <Select
                  hiddenLabel
                  value={gender}
                  onChange={(e) => setGender(Number(e.target.value))}
                  disableUnderline
                  variant="filled"
                  MenuProps={{
                    sx: {
                      "& .MuiMenuItem-root": {
                        color: "black !important",
                      },
                    },
                  }}
                  sx={{
                    width: "95%",
                    background: theme.palette.background.paper,
                    color: "black",
                    borderRadius: 5,
                    textAlign: "left",
                    "&:before": { borderBottom: "none" },
                    "&:after": { borderBottom: "none" },
                    "&.Mui-focused": {
                      background: theme.palette.background.paper,
                    },
                    "& .MuiSelect-select:hover": {
                      background: theme.palette.background.paper,
                      borderRadius: 5,
                    },
                    "& .MuiFilledInput-root": {
                      transition: "none",
                    },
                  }}
                >
                  {genderOptions.map((g) => (
                    <MenuItem key={g.GenderID} value={g.GenderID}>
                      {g.GenderName}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{ m: 0 }}>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  p: 1,
                  mt: 1,
                  mb: 1,
                }}
              >
                <Typography variant="h3" align="left" sx={{ ml: 3, mt: 0 }}>
                  Email
                </Typography>
                <TextField
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    width: "95%",
                    color: theme.palette.background.default,
                    "& .MuiOutlinedInput-root": {
                      background: theme.palette.background.paper,
                      color: theme.palette.background.default,
                      borderRadius: 5,
                    },
                    borderRadius: 5,
                    mb: 7,
                  }}
                />
                <Typography variant="h3" align="left" sx={{ ml: 3, mt: 0 }}>
                  Password
                </Typography>
                <TextField
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    width: "95%",
                    color: theme.palette.background.default,
                    "& .MuiOutlinedInput-root": {
                      background: theme.palette.background.paper,
                      color: theme.palette.background.default,
                      borderRadius: 5,
                    },
                    borderRadius: 5,
                    m: 0,
                  }}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{ m: 0, width: "100%", p: 0 }}>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {success && (
                  <Alert
                    severity="success"
                    onClose={() => setSuccess("")}
                    sx={{
                      position: "fixed",
                      bottom: 20,
                      right: 20,
                      zIndex: 9999,
                    }}
                  >
                    {success}
                  </Alert>
                )}
                {error && (
                  <Alert
                    severity="error"
                    onClose={() => setError("")}
                    sx={{
                      position: "fixed",
                      bottom: 20,
                      right: 20,
                      zIndex: 9999,
                    }}
                  >
                    {error}
                  </Alert>
                )}
                <Button
                  sx={{
                    background: "#00740E",
                    height: "77%",
                    width: "45%",
                    mt: "8%",
                    mb: "5%",
                    borderRadius: 5,
                    ml: 3,
                  }}
                  onClick={handleRegister}
                >
                  <Typography variant="h2">Save</Typography>
                </Button>

                <Button
                  sx={{
                    background: "#740000",
                    height: "77%",
                    width: "45%",
                    mt: "8%",
                    mb: "5%",
                    borderRadius: 5,
                    mr: 1,
                  }}
                  onClick={() => handleNavigation("/")}
                >
                  <Typography variant="h2">Cancel</Typography>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={(theme) => ({
            background: theme.palette.secondary.main,
            ml: "auto",
            border: 2,
            borderRadius: 5,
          })}
        />
      </Box>
    </Container>
  );
}
