import { Container } from "@mui/material";
import PublicHeader from "../components/public/PublicHeader";
import { Outlet, useNavigate } from 'react-router-dom';
import SideMenu from "../components/user/SideMenu";
import SideMenuUnsigned from "../components/public/SideMenuUnsigned";
import { useState } from "react";
import type { User } from "../types";

export default function PublicLayout() {
    const [user, setUser] = useState<User | null>(null);
    const [signedIn, setSignedIn] = useState(false);
    const navigate = useNavigate();

    const onLoginSuccess=(userData: User) => {
        setUser(userData);
        setSignedIn(true);
        if (userData.rol === 'admin' || userData.rol === 'master') {
        navigate('/admin/dashboard');
        } else {
        navigate('/');
        }
    } 

    return (
        <Container>
            <PublicHeader onLoginSuccess={onLoginSuccess}/>
            <Container sx={
            {display:'flex', 
            flexDirection:'row', 
            height: 'calc(100vh - 90px)',
            overflow: 'hidden'
            }}>
                <SideMenuUnsigned onLoginSuccess={onLoginSuccess} />
            <Outlet/>
            </Container>
        </Container>
    );
}