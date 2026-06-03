import { Container, Typography, Button, Avatar, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../../context/authContext';
import { logout as logoutService } from '../../services/uesrService';
import { myVotesStyles } from '../styles/MyVotesStyles';
import type { PostCardData } from '../../types';
import PostCard from '../../components/common/PostCard';
import DefaultAvatar from '../../assets/pfpDefaultImage.png';

export default function MyVotes() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logoutService();
    logout();
    navigate('/');
  };

  const handleEdit = () => {
    navigate('/edit-profile');
  };

  const votedPosts: PostCardData[] = [
    {
      id: 1,
      username: 'Justifier_12',
      user_picture: DefaultAvatar,
      indicted: 'Starbucks',
      indicted_picture: DefaultAvatar,
      case: 'Genocide in Gaza',
      case_picture: DefaultAvatar,
      title: 'Starbucks supports Israel',
      description:
        'I\'m deeply troubled by reports suggesting Starbucks\' backing of Israel, especially given the ongoing genocide in Gaza. As patrons, our choices reflect our values.',
      creation_date: '15h ago',
      is_favorite: false,
      votes: '21k',
      voted_by_user: true,
      coments: '25k',
      evidences: '5',
      state: 'Open',
    },
    {
      id: 2,
      username: 'Justifier_12',
      user_picture: DefaultAvatar,
      indicted: 'Alice',
      indicted_picture: DefaultAvatar,
      case: 'Exploitation',
      case_picture: DefaultAvatar,
      title: 'Alice exploits their workers',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus maximus ante vitae dignissim elementum.',
      creation_date: '2 days ago',
      is_favorite: false,
      votes: '1.4M',
      voted_by_user: true,
      coments: '18k',
      evidences: '12',
      state: 'Active',
    },
  ];

  if (!user) return null;

  return (
    <Container sx={myVotesStyles.container(theme)}>
      <Container sx={myVotesStyles.topPanel()}>
        <Container sx={myVotesStyles.userBlock()}>
        <Avatar
          sx={myVotesStyles.profilePicture()}
          src={user.profilePicture || DefaultAvatar}
          alt={user.username}
        />
          <Typography sx={myVotesStyles.username(theme)}>{user.username}</Typography>
        </Container>

        <Container sx={myVotesStyles.actions()}>
          <Button sx={myVotesStyles.editButton(theme)} onClick={handleEdit}>
            <EditIcon />
            <Typography sx={myVotesStyles.editButtonText(theme)}>Edit User</Typography>
          </Button>

          <Button sx={myVotesStyles.logOutButton()} onClick={handleLogout}>
            <Logout sx={{ color: theme.palette.secondary.main }} />
            <Typography sx={myVotesStyles.logOutButtonText(theme)}>Log Out</Typography>
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
            voteSelection={post.voted_by_user ? 'positive' : 'negative'}
          />
        ))}
      </Container>
    </Container>
  );
}