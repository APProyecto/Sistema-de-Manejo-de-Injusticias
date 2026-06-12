import {
  Container,
  Typography,
  Button,
  useTheme,
  Avatar,
} from "@mui/material";
import {
  logout as logoutService,
  getUserProfilePictureUrl,
} from "../../services/uesrService";
import { useAuth } from "../../context/authContext";
import { profileStyles } from "../styles/ProfileStyles";
import EditIcon from "@mui/icons-material/Edit";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import type { PostCardData } from "../../types";
import PostCard from "../../components/common/PostCard";
import { useEffect, useState } from "react";
import { getMyBoycotts } from "../../services/boycottService";
import LoadingScreen from "../../components/common/LoadingScreen";

import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const [posts, setPosts] = useState<PostCardData[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const navigate = useNavigate();
  const theme = useTheme();

  const { user, logout } = useAuth();

  const { logout: auth0Logout, isAuthenticated: isAuth0Authenticated } =
    useAuth0();

  const handleLogout = async () => {
    console.log("Entró al logout", { isAuth0Authenticated });

    sessionStorage.setItem("auth0LoggingOut", "true");

    try {
      await logoutService();
    } catch (error) {
      console.error("Error en logoutService:", error);
    }

    logout();

    if (isAuth0Authenticated) {
      auth0Logout({
        logoutParams: {
          returnTo: globalThis.location.origin,
        },
      });
      return;
    }

    sessionStorage.removeItem("auth0LoggingOut");
    navigate("/");
  };

  const handleEdit = () => {
    navigate("/edit-profile");
  };
  const currentUser = user as any;
  const userId = currentUser?.appUserId ?? currentUser?.userId;

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (!userId) {
        setPosts([]);
        setLoadingPosts(false);
        return;
      }

      try {
        const result = await getMyBoycotts(Number(userId));
        setPosts(result);
      } catch (error) {
        console.error('Error loading profile posts:', error);
        setPosts([]);
      } finally {
        setLoadingPosts(false);
      }
    };

    void fetchMyPosts();
  }, [userId]);

  if (!user) return null;

  console.log("USUARIO", user);

  const username = currentUser.appUserName ?? currentUser.username ?? "User";

  const profilePicture =
    currentUser.picture ??
    currentUser.profilePicture ??
    (userId ? getUserProfilePictureUrl(userId) : undefined);

  if (loadingPosts) {
    return <LoadingScreen />;
  }

  return (
    <Container sx={profileStyles.container(theme)}>
      <Container sx={profileStyles.actionsPannelContainer(theme)}>
        <Avatar sx={profileStyles.profilePicture(theme)} src={profilePicture} />
        <Typography sx={profileStyles.username(theme)}>{username}</Typography>
        <Container sx={profileStyles.filler(theme)}></Container>

        {/*Edit Button*/}
        <Button sx={profileStyles.editButton(theme)} onClick={handleEdit}>
          <EditIcon
            className="edit-button-icon"
            sx={profileStyles.editButtonIcon(theme)}
          ></EditIcon>
          <Typography
            className="edit-button-text"
            sx={profileStyles.editButtonText(theme)}
          >
            Edit User
          </Typography>
        </Button>

        {/*Logut Button*/}
        <Button sx={profileStyles.logOutButton(theme)} onClick={handleLogout}>
          <Logout
            className="logout-button-icon"
            sx={profileStyles.logOutButtonIcon(theme)}
          ></Logout>
          <Typography
            className="logout-button-text"
            sx={profileStyles.logOutButtonText(theme)}
          >
            Log Out
          </Typography>
        </Button>
      </Container>
      <Typography sx={profileStyles.myVotesText(theme)}>My Votes</Typography>
      <Container sx={profileStyles.postsContainer(theme)}>
        {posts.map((data) => (
          <PostCard key={data.id} data={data} inFeed={true}></PostCard>
        ))}
      </Container>
    </Container>
  );
}
