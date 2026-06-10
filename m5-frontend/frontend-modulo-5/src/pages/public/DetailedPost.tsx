import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Avatar, IconButton, Chip, Divider, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/Chat';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
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

type CommentFilter = 'New' | 'Old' | 'Most Relevant' | 'Less Relevant';
const FILTERS: CommentFilter[] = ['New', 'Old', 'Most Relevant', 'Less Relevant'];

export default function DetailedPost() {

  const { isAuthenticated, user } = useAuth();
  const { id } = useParams();

  const [filterNumber, setFilterNumber] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);

  //actualiza los comentarios cada vez que cambia el id o el número de filtro
  useEffect(() => {
    if (id) getComments(Number(id), filterNumber).then(setComments);
  }, [id, filterNumber]);



  const navigate = useNavigate();
  const theme = useTheme();
  const [activeFilter, setActiveFilter] = useState<CommentFilter>('New');

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
  const data: DetailedPostData = {
    id: 1,
    indicted: {
      id: 1,
      name: 'Starbucks',
      picture: 'https://res.cloudinary.com/dewscucnp/image/upload/v1778781215/images_11_objw2p.png',
      cases: ['Animal cruelty in sourcing', 'Environmental pollution', 'Over labor'],
      category: 'Food',
      description: 'Starbucks is a premier roaster and retailer of specialty coffee with locations in dozens of countries.',
    },
    type: 'Political',
    country: 'USA',
    case: 'War in Gaza',
    case_picture: 'https://res.cloudinary.com/dewscucnp/image/upload/v1778781294/round-palestinian-flag-of-palestine-vector_fvtvtg.jpg',
    title: 'starbucks supports the genocide in gaza',
    description: "I'm deeply troubled by reports suggesting Starbucks' backing of Israel, especially given the ongoing genocide in Gaza. As patrons, our choices reflect our values, and it's disheartening to see a company seemingly prioritize political alignment over human rights.",
    creation_date: '10/04/2026',
    is_favorite: false,
    votes: '23k',
    voted_by_user: true,
    comment_amount: '25k',
    evidences: [
      { id: 1, extension: 'pdf', name: 'EvidenceFile_01.pdf', type: 'pdf', weight: '20kb' },
      { id: 2, extension: 'png', name: 'PhotoProof_01.png', type: 'image', weight: '1200kb' },
      { id: 3, extension: 'pdf', name: 'ExtraDoc.pdf', type: 'pdf', weight: '35kb' },
    ],
    comments: [
      {
        id: 1,
        content: "I've heard that they donate to causes that don't align with my values. It's disappointing when a company's actions don't match their public image.",
        creation_date: '12/08/2026',
        user: { id: 1, profilePicture: 'http://localhost:3001/api/files/appUser/1/picture', username: 'EcoWarrior7' },
        voted_by_user: true,
        votes: '9',
      },
      {
        id: 2,
        content: "I've heard that they've been accused of union busting. It's a shame when companies don't support their employees' rights.",
        creation_date: '13/08/2026',
        user: { id: 2, profilePicture: 'https://res.cloudinary.com/dewscucnp/image/upload/v1778781294/round-palestinian-flag-of-palestine-vector_fvtvtg.jpg', username: 'Fairness4All' },
        voted_by_user: false,
        votes: '5',
      },
      {
        id: 3,
        content: "I read that they've had some issues with fair trade practices. It makes me question whether they're truly committed to ethical sourcing.",
        creation_date: '14/08/2026',
        user: { id: 3, profilePicture: 'https://res.cloudinary.com/dewscucnp/image/upload/v1778781294/round-palestinian-flag-of-palestine-vector_fvtvtg.jpg', username: 'SourceMatters' },
        voted_by_user: false,
        votes: '3',
      },
    ],
    last_updated: '14/04/2026',
    user: { id: 2, username: 'Justifier_12', profilePicture: 'https://res.cloudinary.com/dewscucnp/image/upload/v1778781294/round-palestinian-flag-of-palestine-vector_fvtvtg.jpg' },
    state: 'Active',
  };

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

        <Typography sx={detailedPostStyles.dateText(theme)}>First posted: {data.creation_date}</Typography>
        <Typography sx={detailedPostStyles.dateText(theme)}>Last updated: {data.last_updated}</Typography>

        {/* Title + description */}
        <Typography sx={detailedPostStyles.postTitle(theme)}>{data.title}</Typography>
        <Typography sx={detailedPostStyles.text(theme)}>{data.description}</Typography>

        {/* Attachments */}
        <Typography sx={detailedPostStyles.subtitle(theme)}>Attachments</Typography>
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
              votes={data.votes}
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
            ? <UserComment comment={comment} loggedInUserId={user?.id}></UserComment>
            : <PublicComment comment={comment}></PublicComment>
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
        {data.indicted.cases.map((item, index) => (
          <Container key={index} sx={detailedPostStyles.bulletItem(theme)}>
            <Typography sx={detailedPostStyles.bulletPoint(theme)}>{'\u2022'}</Typography>
            <Typography sx={detailedPostStyles.text(theme)}>{item}</Typography>
          </Container>
        ))}
      </Container>

    </Container>
  );
}