import { Container } from "@mui/material";
import PublicHeader from "../components/public/PublicHeader";
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from "react";
import AdminSideMenu from "../components/admin/AdminNormalSideMenu";
import AdminModeSideMenu from "../components/admin/AdminDashboardSideMenu";

export default function AdminLayout() {
    const [user, setUser] = useState(null);
    const [signedIn, setSignedIn] = useState(false);
    const [isDashboardMode, setIsDashboardMode] = useState(false);
    const navigate = useNavigate();

    // Función para cambiar el modo
    const toggleMode = () => {
        setIsDashboardMode(!isDashboardMode);
    };

    // Función para activar modo dashboard
    const enableDashboardMode = () => {
        navigate('admin/dashboard');
        setIsDashboardMode(true);
    };

    // Función para activar modo normal
    const enableNormalMode = () => {
        navigate('/');
        setIsDashboardMode(false);
    };

    return (
        <Container>
            <PublicHeader />
            <Container sx={
            {display:'flex', 
            flexDirection:'row', 
            height: 'calc(100vh - 90px)',
            overflow: 'hidden'
            }}>
                {isDashboardMode ? (
                    <AdminModeSideMenu 
                        onSwitchToNormalMode={enableNormalMode} 
                        currentMode="admin"
                    />
                ) : (
                    <AdminSideMenu 
                        onSwitchToDashboardMode={enableDashboardMode}
                        currentMode="user"
                    />
                )}
            <Outlet/>
            </Container>
        </Container>
    );
}