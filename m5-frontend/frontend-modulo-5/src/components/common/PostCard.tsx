import {
  Avatar,
  Button,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import { PostCardStyles } from "../styles/PostCardStyles";
import type { PostCardData } from "../../types";
import Entity from "./Entity";
import VotesBox from "../public/VotesBox";
import PostInteracionButton from "./PostInteractionButton";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { Circle } from "@mui/icons-material";
import OptionMenuFeed from "../user/OptionMenuFeed";
import OptionMenuMyPosts from "../user/OptionMenuMyPosts";
import { useNavigate } from "react-router-dom";
import { formatDate, formatNumber } from "../../utils/utils";
import { useAuth } from "../../context/authContext";
import { voteBoycott } from "../../services/boycottService";
import { useEffect, useState } from "react";
import { getEntityPictureUrl } from "../../services/uesrService";

interface PostCardProps {
  data: PostCardData;
  inFeed: boolean;
}

export default function PostCard({ data, inFeed }: Readonly<PostCardProps>) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const resolvedUserId = user?.appUserId ?? (user as any)?.userId ?? (user as any)?.id;
  
  // Local state for vote counter that updates independently of props
  const [voteCount, setVoteCount] = useState<string>(data.votes);
  
  useEffect(() => {
    setVoteCount(data.votes);
  }, [data.id, data.votes]);

  const onPostClick = () => {
    navigate(`/detailed-post/${data.id}`);
  };

  const onUsernameClick = () => {
    console.log("got to the user's page");
  };

  const onIndictedClick = () => {
    console.log("go to the indicted's page");
  };

  const onCaseClick = () => {
    console.log("go to the case's page");
  };

  const onEvidencesClick = () => {
    navigate(`/detailed-post/${data.id}/evidences`);
  };

  const onCommentsClick = () => {};

  const handleStateColor = (state: string) => {
    if (state === "Active") {
      return theme.palette.success.main;
    } else {
      return theme.palette.background.default;
    }
  };

  const handleVoteChange = async (
    newVote: boolean | null,
    previousVote: boolean | null,
  ) => {
    if (!isAuthenticated) {
      globalThis.alert("Debes iniciar sesión para votar.");
      throw new Error("Not authenticated");
    }

    if (!resolvedUserId) {
      globalThis.alert("No se pudo identificar tu usuario para registrar el voto.");
      throw new Error("Missing userId");
    }

    const voteToSend = newVote ?? previousVote;
    if (voteToSend === null) {
      return;
    }

    const result = await voteBoycott(data.id, voteToSend, resolvedUserId);
    
    // Update vote count with the values returned by backend
    if (result.votesInFavor !== undefined && result.votesAgainst !== undefined) {
      const newVotes = result.votesInFavor - result.votesAgainst;
      setVoteCount(String(newVotes));
    }
  };

  return (
    <Button sx={PostCardStyles.container(theme)} onClick={onPostClick}>
      <Container sx={PostCardStyles.topContainer(theme)}>
        {/* Profile Picture */}
        <Avatar
          src={data.user_picture}
          alt={data.username}
          sx={PostCardStyles.profilePicture(theme)}
        />

        {/* Username */}
        <Button
          onClick={onUsernameClick}
          sx={PostCardStyles.usernameButton(theme)}
        >
          {data.username}
        </Button>

        {/* Creation Date */}
        <Typography variant="caption" align="left">
          {formatDate(data.creation_date)}
        </Typography>

        <Container sx={{ display: "flex", flex: 1 }}></Container>

        {/* Options */}
        {inFeed ? (
          <OptionMenuFeed
            favorite={!data.is_favorite}
            boycottId={data.id}
          ></OptionMenuFeed>
        ) : (
          <OptionMenuMyPosts></OptionMenuMyPosts>
        )}
      </Container>
      <Container sx={PostCardStyles.descriptionContainer(theme)}>
        <Container sx={PostCardStyles.entitiesContainer(theme)}>
          {/*Indicted*/}
          <Entity
            src={getEntityPictureUrl(data.id)}
            name={data.indicted}
            onPressClick={onIndictedClick}
          ></Entity>

          {/*Case*/}
          <Entity
            src={data.case_picture}
            name={data.case}
            onPressClick={onCaseClick}
          ></Entity>
        </Container>

        {/*Title*/}
        <Typography
          sx={PostCardStyles.title(theme)}
          noWrap //pone los puntos al final en caso de que se pase del tamaño estabeclido
        >
          {data.title}
        </Typography>

        {/* Description */}
        <Typography sx={PostCardStyles.description(theme)}>
          {data.description}
        </Typography>
      </Container>

      {/*Bottom Container*/}
      <Container sx={PostCardStyles.bottomContainer(theme)} disableGutters>
        <Container
          sx={PostCardStyles.interactiveButtonsContainer(theme)}
          disableGutters
        >
          {/* Votes */}
          <VotesBox
            votes={formatNumber(voteCount)}
            initialVote={data.voted_by_user}
            onVoteChange={handleVoteChange}
          ></VotesBox>

          {/* Comments */}
          <PostInteracionButton
            text={data.coments}
            icon={InsertCommentIcon}
            iconColor={theme.palette.text.primary}
            onPressClick={onCommentsClick}
          ></PostInteracionButton>

          {/* Evidences */}
          <PostInteracionButton
            text={data.evidences}
            icon={DocumentScannerIcon}
            iconColor={theme.palette.text.primary}
            onPressClick={onEvidencesClick}
          ></PostInteracionButton>
        </Container>

        <Container sx={PostCardStyles.filler(theme)}></Container>

        {/* State */}
        <PostInteracionButton
          text={data.state}
          icon={Circle}
          iconColor={handleStateColor(data.state)}
        ></PostInteracionButton>
      </Container>
    </Button>
  );
}
