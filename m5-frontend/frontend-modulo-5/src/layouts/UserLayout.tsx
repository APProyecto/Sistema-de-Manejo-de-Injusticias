import { Container } from "@mui/material";
import UserHeader from "../components/user/UserHeader";
import { Outlet } from 'react-router-dom';
import SideMenu from "../components/user/SideMenu";

export default function UserLayout() {
    return (
        <Container>
            <UserHeader />
            <Container sx={
            {display:'flex', 
            flexDirection:'row', 
            height: 'calc(100vh - 90px)',
            overflow: 'hidden'
            }}>
            <SideMenu />:
            <Outlet/>
            </Container>
        </Container>
    );
}