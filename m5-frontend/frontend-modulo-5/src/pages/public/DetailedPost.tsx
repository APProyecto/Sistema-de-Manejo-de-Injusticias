import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Avatar, IconButton, Chip, Divider, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import { useParams, useNavigate } from 'react-router-dom';
import { detailedPostStyles } from '../styles/DetailedPostStyles';
import Entity from '../../components/common/Entity';
import type { Comment, DetailedPostData } from '../../types';
import VotesBox from '../../components/public/VotesBox';
import PostInteracionButton from '../../components/common/PostInteractionButton';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { PostCardStyles } from '../../components/styles/PostCardStyles';
import { Circle } from "@mui/icons-material";
import { getComments } from '../../services/commentsService';
import PublicComment from '../../components/public/PublicComment';
import { useAuth } from '../../context/authContext';
import UserComment from '../../components/user/UserComment';
import PostCommentBox from '../../components/user/PostCommentBox';
import { getBoycottById, voteBoycott } from '../../services/boycottService';
import { formatDate, formatNumber } from '../../utils/utils';

type CommentFilter = 'New' | 'Old' | 'Most Relevant' | 'Less Relevant';
const FILTERS: CommentFilter[] = ['New', 'Old', 'Most Relevant', 'Less Relevant'];

export default function DetailedPost() {
  
  const navigate = useNavigate();
  const theme = useTheme();
  const { isAuthenticated, user } = useAuth();
  const { id } = useParams();

  
  const [data, setData] = useState<DetailedPostData>();
  const [filterNumber, setFilterNumber] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeFilter, setActiveFilter] = useState<CommentFilter>('New');

  
  
  useEffect(() => {
    getBoycottById(Number(id), user?.id).then(setData);
  }, [id, user?.id]);

  //actualiza los comentarios cada vez que cambia el id o el número de filtro
  useEffect(() => {
    if (id) getComments(Number(id), filterNumber).then(setComments);
  }, [id, filterNumber]);

  if (!data) return <Box>Loading...</Box>

  const onCommentsClick = () => {

  }

  const handleFilterClick = (filter: CommentFilter) => {
    console.log('filter');
    setActiveFilter(filter);
    switch (filter) {
      case 'New': setFilterNumber(0); break;
      case 'Old': setFilterNumber(1); break;
      case 'Most Relevant': setFilterNumber(2); break;
      case 'Less Relevant': setFilterNumber(3); break;
    }
  }

  const handleStateColor = (state: string) => {
      if(state === 'Active'){
          return theme.palette.success.main;
      }else{
          return theme.palette.background.default;
      }
  }

  const handleVoteChange = async (newVote: boolean | null) => {
    if (!isAuthenticated) {
      globalThis.alert('Debes iniciar sesión para votar.');
      throw new Error('Not authenticated');
    }

    if (newVote === null || !id) {
      return;
    }

    await voteBoycott(Number(id), newVote, user?.appUserId);
  }

  const visibleEvidences = data.evidences.slice(0, 2);
  const extraEvidences = data.evidences.length - 2;

  return (
    <Container sx={detailedPostStyles.mainContainer(theme)}>
      {/* ── Center ── */}
      <Container sx={detailedPostStyles.centerContainer(theme)}>

        {/* Post header */}
        <Box sx={detailedPostStyles.postHeader(theme)}>
          <IconButton size="small" onClick={() => navigate(-1)} sx={detailedPostStyles.backButton(theme)}>
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <Avatar src={data.user.profilePicture} alt={data.user.username} sx={detailedPostStyles.avatar(theme)} />
          <Typography sx={detailedPostStyles.username(theme)}>{data.user.username}</Typography>
        </Box>

        <Typography sx={detailedPostStyles.dateText(theme)}>First posted: {formatDate(data.creation_date)}</Typography>
        <Typography sx={detailedPostStyles.dateText(theme)}>Last updated: {formatDate(data.last_updated)}</Typography>

        {/* Title + description */}
        <Typography sx={detailedPostStyles.postTitle(theme)}>{data.title}</Typography>
        <Typography sx={detailedPostStyles.text(theme)}>{data.description}</Typography>

        {/* Attachments */}
        <Typography sx={detailedPostStyles.subtitle(theme)}>Attachments</Typography>

        {/* Número de expediente */}
        {data.caseNumber ? 
          <Box sx={detailedPostStyles.caseNumberContainer(theme)}>
            <Typography sx={detailedPostStyles.caseNumberText(theme)}>
              Case number: {data.caseNumber} 
            </Typography>  
          </Box>
          :
          <Box></Box>
        }

        <Box sx={detailedPostStyles.attachmentsRow(theme)}>
          {visibleEvidences.map((ev) => (
            <Box key={ev.id} sx={detailedPostStyles.attachmentCard(theme)}>
              {ev.type === 'pdf'
                ? <PictureAsPdfIcon fontSize="small" sx={detailedPostStyles.attachmentIconPdf(theme)} />
                : <ImageIcon fontSize="small" sx={detailedPostStyles.attachmentIconImg(theme)} />}
              <Box sx={detailedPostStyles.attachmentInfo(theme)}>
                <Typography sx={detailedPostStyles.attachmentName(theme)} noWrap>{ev.name}</Typography>
                <Typography sx={detailedPostStyles.attachmentWeight(theme)}>{ev.weight}</Typography>
              </Box>
              <IconButton size="small" sx={detailedPostStyles.downloadButton(theme)}>
                <DownloadIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
          {extraEvidences > 0 && (
            <Box sx={detailedPostStyles.extraEvidences(theme)}>
              <Typography sx={detailedPostStyles.extraEvidencesText(theme)}>+{extraEvidences}</Typography>
            </Box>
          )}
        </Box>

        {/* Action bar */}
        <Box sx={detailedPostStyles.actionBar(theme)}>
          {/* Votes */}
          <VotesBox
              votes={formatNumber(data.votes)}
              initialVote={data.voted_by_user}
              onVoteChange={handleVoteChange}
              >
          </VotesBox>

          {/* Comments */}
          <PostInteracionButton
              text={data.comment_amount}
              icon={InsertCommentIcon}
              iconColor={theme.palette.text.primary}
              onPressClick={onCommentsClick}
              >
          </PostInteracionButton>

          <Container sx={PostCardStyles.filler(theme)}></Container>

          {/* State */}
          <PostInteracionButton
              text={data.state}
              icon={Circle}
              iconColor={handleStateColor(data.state)}
          >
          </PostInteracionButton>
        </Box>

        <Divider sx={detailedPostStyles.divider(theme)} />

        {/* Comment filters */}
        <Box sx={detailedPostStyles.filtersRow(theme)}>
          {FILTERS.map((f) => (
            <Chip
              key={f}
              label={f}
              size="small"
              onClick={() => handleFilterClick(f)}
              sx={detailedPostStyles.filterChip(theme, activeFilter === f)}
            />
          ))}
        </Box>



        {/* Comments */}
        <Box sx={detailedPostStyles.commentsList(theme)}>
          {isAuthenticated ? <PostCommentBox></PostCommentBox>:<Box></Box>}
            {comments.map((comment) => (
              isAuthenticated
              ? <UserComment key={comment.id} comment={comment} loggedInUserId={user?.id} />
              : <PublicComment key={comment.id} comment={comment} />
            ))}
        </Box>

      </Container>

      {/* ── Right sidebar ── */}
      <Container sx={detailedPostStyles.rightContainer(theme)}>
          <Box sx={detailedPostStyles.indictedContainer(theme)}>
            <Entity src={data.indicted.picture} name={data.indicted.name} />
          </Box>

        <Typography sx={detailedPostStyles.text(theme)}>{data.indicted.description}</Typography>

        <Typography sx={detailedPostStyles.subtitle(theme)}>Category</Typography>
        <Typography sx={detailedPostStyles.text(theme)}>{data.indicted.category}</Typography>

        <Typography sx={detailedPostStyles.subtitle(theme)}>Type of Injustice</Typography>
        <Typography sx={detailedPostStyles.text(theme)}>{data.type}</Typography>

        <Typography sx={detailedPostStyles.subtitle(theme)}>Country</Typography>
        <Typography sx={detailedPostStyles.text(theme)}>{data.country}</Typography>

        <Typography sx={detailedPostStyles.subtitle(theme)}>Other Company Cases</Typography>
        {data.indicted.cases.map((item) => (
          <Container key={item} sx={detailedPostStyles.bulletItem(theme)}>
            <Typography sx={detailedPostStyles.bulletPoint(theme)}>{'\u2022'}</Typography>
            <Typography sx={detailedPostStyles.text(theme)}>{item}</Typography>
          </Container>
        ))}
      </Container>

    </Container>
  );
}