import { Container, Typography, Button, Avatar, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../../context/authContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import {
  logout as logoutService,
  getUserProfilePictureUrl,
  getMyVotedPosts,
} from "../../services/userService";

import { myVotesStyles } from "../styles/MyVotesStyles";
import type { PostCardData } from "../../types";
import PostCard from "../../components/common/PostCard";
import DefaultAvatar from "../../assets/pfpDefaultImage.png";

export default function MyVotes() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [votedPosts, setVotedPosts] = useState<PostCardData[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  const { logout: auth0Logout, isAuthenticated: isAuth0Authenticated } =
    useAuth0();

  const handleLogout = async () => {
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
          returnTo: window.location.origin,
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
  if (!user) return null;

  const currentUser = user as any;

  const userId = currentUser.appUserId ?? currentUser.userId;

  const username = currentUser.appUserName ?? currentUser.username ?? "User";

  const profilePicture =
    currentUser.picture ??
    currentUser.profilePicture ??
    (userId ? getUserProfilePictureUrl(userId) : DefaultAvatar);

  useEffect(() => {
    const loadVotedPosts = async () => {
      if (!userId) return;

      try {
        setIsLoadingPosts(true);

        const posts = await getMyVotedPosts(userId);

        setVotedPosts(posts);
      } catch (error) {
        console.error("Error loading voted posts:", error);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    loadVotedPosts();
  }, [userId]);

  return (
    <Container sx={myVotesStyles.container(theme)}>
      <Container sx={myVotesStyles.topPanel()}>
        <Container sx={myVotesStyles.userBlock()}>
          <Avatar
            sx={myVotesStyles.profilePicture()}
            src={profilePicture || DefaultAvatar}
            alt={username}
          />
          <Typography sx={myVotesStyles.username(theme)}>{username}</Typography>
        </Container>

        <Container sx={myVotesStyles.actions()}>
          <Button sx={myVotesStyles.editButton(theme)} onClick={handleEdit}>
            <EditIcon />
            <Typography sx={myVotesStyles.editButtonText(theme)}>
              Edit User
            </Typography>
          </Button>

          <Button sx={myVotesStyles.logOutButton()} onClick={handleLogout}>
            <Logout sx={{ color: theme.palette.secondary.main }} />
            <Typography sx={myVotesStyles.logOutButtonText(theme)}>
              Log Out
            </Typography>
          </Button>
        </Container>
      </Container>

      <Typography sx={myVotesStyles.title(theme)}>My Votes</Typography>

      <Container sx={myVotesStyles.postsContainer()}>
        {isLoadingPosts && (
          <Typography sx={{ color: theme.palette.text.primary }}>
            Loading votes...
          </Typography>
        )}

        {!isLoadingPosts &&
          votedPosts.map((post) => (
            <PostCard key={post.id} data={post} inFeed={false} />
          ))}

        {!isLoadingPosts && votedPosts.length === 0 && (
          <Typography sx={{ color: theme.palette.text.primary }}>
            You have not voted on any posts yet.
          </Typography>
        )}
      </Container>
    </Container>
  );
}
