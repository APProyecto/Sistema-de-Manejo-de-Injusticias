import { Container, Typography, Button, Avatar, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../../context/authContext";
import { useAuth0 } from "@auth0/auth0-react";
import {
  logout as logoutService,
  getUserProfilePictureUrl,
} from "../../services/userService";
import { myVotesStyles } from "../styles/MyVotesStyles";
import type { PostCardData } from "../../types";
import PostCard from "../../components/common/PostCard";
import DefaultAvatar from "../../assets/pfpDefaultImage.png";

export default function MyVotes() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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
  const currentUser = user as any;

  const userId = currentUser.appUserId ?? currentUser.userId;

  const username = currentUser.appUserName ?? currentUser.username ?? "User";

  const profilePicture =
    currentUser.picture ??
    currentUser.profilePicture ??
    (userId ? getUserProfilePictureUrl(userId) : DefaultAvatar);

  const votedPosts: PostCardData[] = [
    {
      id: 1,
      username: "Justifier_12",
      user_picture: DefaultAvatar,
      indicted: "Starbucks",
      indicted_picture: DefaultAvatar,
      case: "Genocide in Gaza",
      case_picture: DefaultAvatar,
      title: "Starbucks supports Israel",
      description:
        "I'm deeply troubled by reports suggesting Starbucks' backing of Israel, especially given the ongoing genocide in Gaza. As patrons, our choices reflect our values.",
      creation_date: "15h ago",
      is_favorite: false,
      votes: "21k",
      voted_by_user: true,
      coments: "25k",
      evidences: "5",
      state: "Open",
    },
    {
      id: 2,
      username: "Justifier_12",
      user_picture: DefaultAvatar,
      indicted: "Alice",
      indicted_picture: DefaultAvatar,
      case: "Exploitation",
      case_picture: DefaultAvatar,
      title: "Alice exploits their workers",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus maximus ante vitae dignissim elementum.",
      creation_date: "2 days ago",
      is_favorite: false,
      votes: "1.4M",
      voted_by_user: true,
      coments: "18k",
      evidences: "12",
      state: "Active",
    },
  ];

  if (!user) return null;

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
        {votedPosts.map((post) => (
          <PostCard
            key={post.id}
            data={post}
            inFeed={false}
            voteSelection={post.voted_by_user ? "positive" : "negative"}
          />
        ))}
      </Container>
    </Container>
  );
}
