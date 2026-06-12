import { Container } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminSideMenu from "../components/admin/AdminNormalSideMenu";
import AdminModeSideMenu from "../components/admin/AdminDashboardSideMenu";
import UserHeader from "../components/user/UserHeader";

export default function AdminLayout() {
  const [isDashboardMode, setIsDashboardMode] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const navigate = useNavigate();

  const enableDashboardMode = () => {
    navigate("/admin/dashboard");
    setIsDashboardMode(true);
  };

  const enableNormalMode = () => {
    navigate("/");
    setIsDashboardMode(false);
  };

  return (
    <Container maxWidth={false} disableGutters>
      <UserHeader onOpenSideMenu={() => setSideMenuOpen(true)} />

      <Container
        maxWidth={false}
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "row",
          height: {
            xs: "auto",
            md: "calc(100vh - 90px)",
          },
          minHeight: {
            xs: "calc(100vh - 90px)",
            md: "calc(100vh - 90px)",
          },
          overflow: {
            xs: "visible",
            md: "hidden",
          },
        }}
      >
        {isDashboardMode ? (
          <AdminModeSideMenu
            onSwitchToNormalMode={enableNormalMode}
            currentMode="admin"
            open={sideMenuOpen}
            onClose={() => setSideMenuOpen(false)}
          />
        ) : (
          <AdminSideMenu
            onSwitchToDashboardMode={enableDashboardMode}
            currentMode="user"
            open={sideMenuOpen}
            onClose={() => setSideMenuOpen(false)}
          />
        )}

        <Outlet />
      </Container>
    </Container>
  );
}