import { Container } from "@mui/material";
import PublicHeader from "../components/public/PublicHeader";
import { Outlet } from 'react-router-dom';
import SideMenu from "../components/user/SideMenu";
import SideMenuUnsigned from "../components/public/SideMenuUnsigned";
import { useState } from "react";

export default function PublicLayout() {
    const [user, setUser] = useState(null);
    const [signedIn, setSignedIn] = useState(false);

    return (
        <Container>
            <PublicHeader />
            <Container sx={
            {display:'flex', 
            flexDirection:'row', 
            height: 'calc(100vh - 90px)',
            overflow: 'hidden'
            }}>
                <SideMenuUnsigned onLoginSuccess={(userData) => {
                setUser(userData);
                setSignedIn(true);
                }} />
            <Outlet/>
            </Container>
        </Container>
    );
}