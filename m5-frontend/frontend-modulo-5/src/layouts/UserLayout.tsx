import { Container } from "@mui/material";
import UserHeader from "../components/user/UserHeader";
import { Outlet } from 'react-router-dom';
import SideMenu from "../components/user/SideMenu";
import {useState} from "react"

export default function UserLayout() {

    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    return (
        <Container>
            <UserHeader onOpenSideMenu={() => setSideMenuOpen(true)}/>
            <Container sx={
            {display:'flex', 
            flexDirection:'row', 
            height: {
            xs: "auto",
            sm: "calc(100vh - 90px)",
            },
            overflow: {
            xs: "visible",
            sm: "hidden",
            },
            }}>
            <SideMenu open={sideMenuOpen}
          onClose={() => setSideMenuOpen(false)}  />
            <Outlet/>
            </Container>
        </Container>
    );
}