import { Container } from "@mui/material";
import PublicHeader from "../components/public/PublicHeader";
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from "react";
import AdminSideMenu from "../components/admin/AdminNormalSideMenu";
import AdminModeSideMenu from "../components/admin/AdminDashboardSideMenu";
import UserHeader from "../components/user/UserHeader";

export default function AdminLayout() {
    const [user, setUser] = useState(null);
    const [signedIn, setSignedIn] = useState(false);
    const [isDashboardMode, setIsDashboardMode] = useState(false);
    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const navigate = useNavigate();

    
    const toggleMode = () => {
        setIsDashboardMode(!isDashboardMode);
    };

    
    const enableDashboardMode = () => {
        navigate('admin/dashboard');
        setIsDashboardMode(true);
    };

    
    const enableNormalMode = () => {
        navigate('/');
        setIsDashboardMode(false);
    };

    return (
        <Container>
            <UserHeader  onOpenSideMenu={() => setSideMenuOpen(true)}/>
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
            <Outlet/>
            </Container>
        </Container>
    );
}