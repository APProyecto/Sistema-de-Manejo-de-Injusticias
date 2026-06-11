import { ThemeProvider } from "@mui/system";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { darkTheme } from "./theme";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/authContext";
import { SearchProvider } from "./context/SearchContext";
import { syncUser } from "./services/authService";

const theme = darkTheme;

function App() {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    async function syncAuthUser() {
      try {
        if (!isAuthenticated) return;

        const token = await getAccessTokenSilently();

        localStorage.setItem("token", token);

        await syncUser(token, user?.email || "", user?.name || "User");

        console.log("Usuario sincronizado:", user);
      } catch (error) {
        console.error(error);
      }
    }

    syncAuthUser();
  }, [isAuthenticated, getAccessTokenSilently, user]);

  return (
    <SearchProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <AppRoutes />
        </ThemeProvider>
      </AuthProvider>
    </SearchProvider>
  );
}

export default App;
