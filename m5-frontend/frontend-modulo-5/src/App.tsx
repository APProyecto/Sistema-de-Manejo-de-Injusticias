import { ThemeProvider } from "@mui/system";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { darkTheme } from "./theme";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/authContext";
import { SearchProvider } from "./context/SearchContext";

import { useAuth } from "./context/authContext";
import { syncAuth0User } from "./services/userService";

const theme = darkTheme;

function Auth0Sync() {
  const {
    isAuthenticated,
    isLoading,
    user: auth0User,
    getAccessTokenSilently,
  } = useAuth0();

  const { login, user } = useAuth();

  useEffect(() => {
    let cancelled = false;

    const syncUser = async () => {
      try {
        if (isLoading) return;
        if (!isAuthenticated || !auth0User) return;

        if (sessionStorage.getItem("auth0LoggingOut") === "true") {
          return;
        }

        if (!auth0User.email) return;

        if (user?.email === auth0User.email) {
          return;
        }

        const token = await getAccessTokenSilently();

        const syncedUser = await syncAuth0User(
          token,
          auth0User.email,
          auth0User.name || "User",
        );

        if (!cancelled) {
          login(syncedUser);
        }
      } catch (error) {
        console.error("Auth0 sync error:", error);
      }
    };

    syncUser();

    return () => {
      cancelled = true;
    };
  }, [
    isLoading,
    isAuthenticated,
    auth0User,
    getAccessTokenSilently,
    login,
    user?.email,
  ]);

  return null;
}

function App() {
  return (
    <SearchProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Auth0Sync />
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </SearchProvider>
  );
}

export default App;
