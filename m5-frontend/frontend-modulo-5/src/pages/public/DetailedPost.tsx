import { Avatar, Box, Button, Container, Divider, TextField, Typography, useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReplyIcon from '@mui/icons-material/Reply';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReportIcon from '@mui/icons-material/ReportGmailerrorred';
import PDFLogo from '../../assets/PDFIcon.png';
import DefaultAvatar from '../../assets/pfpDefaultImage.png';
import { useMemo, useState } from 'react';
import { detailedPostStyles } from '../styles/DetailedPostStyles';
import { PostCardStyles } from '../../components/styles/PostCardStyles';


export default function DetailedPost() {
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const [comment, setComment] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<'New' | 'Old' | 'Most Relevant' | 'Less Relevant'>('New');

    const post = useMemo(() => ({
      id: id ?? '1',
      username: 'Justifier_12',
      userPicture: 'https://res.cloudinary.com/dewscucnp/image/upload/v1778781104/cool-profile-picture-87h46gcobjl5e4xu_bifpln.jpg',
      title: 'Starbucks supports Israel',
      createdAt: 'First posted: 10/04/2026',
      updatedAt: 'Last updated: 14/04/2026',
      description:
        'I\'m deeply troubled by reports suggesting Starbucks\' backing of Israel, especially given the ongoing genocide in Gaza. As patrons, our choices reflect our values, and it\'s disheartening to see a company seemingly prioritize political alignment over human rights. If these allegations hold true, it\'s imperative for Starbucks to address these concerns transparently. A clear statement clarifying their stance would empower consumers to make informed decisions about supporting their brand.',
      entity: 'Starbucks',
      entityIcon: 'https://res.cloudinary.com/dewscucnp/image/upload/v1778781215/images_11_objw2p.png',
      caseName: 'Genocide in Gaza',
      caseIcon: 'https://res.cloudinary.com/dewscucnp/image/upload/v1778781294/round-palestinian-flag-of-palestine-vector_fvtvtg.jpg',
      category: 'Corporate Ethics and Political Involvement',
      type: 'Political',
      country: 'USA',
      tags: ['Animal cruelty in sourcing', 'Environmental pollution', 'Over labor'],
    }), [id]);

    const attachments = [
      { icon: PDFLogo, name: 'EvidenceFile_01.pdf', extension: 'PDF', size: '20kb' },
      { icon: PDFLogo, name: 'PhotoProof_01.png', extension: 'JPG', size: '120kb' },
    ];

    const comments = [
      {
        id: 1,
        username: 'EcoWarrior7',
        avatar: DefaultAvatar,
        text: "I've heard that they donate to causes that don't align with my values. It's disappointing when a company's actions don't match their public image.",
        voteLabel: '21k',
      },
      {
        id: 2,
        username: 'Fairness4All',
        avatar: DefaultAvatar,
        text: "I've heard that they've been accused of union busting. It's a shame when companies don't support their employees' rights.",
        voteLabel: '21k',
      },
    ];

    const handleBack = () => navigate(-1);

    const handleSubmitComment = () => {
      setComment('');
    };

    const commentFilters: Array<'New' | 'Old' | 'Most Relevant' | 'Less Relevant'> = ['New', 'Old', 'Most Relevant', 'Less Relevant'];

  return (
    <Container sx={detailedPostStyles.container(theme)}>
      <Button sx={detailedPostStyles.backButton(theme)} onClick={handleBack}>
        <ArrowBackIcon />
        <Typography sx={detailedPostStyles.backTitle(theme)}>Post details</Typography>
      </Button>

      <Container sx={detailedPostStyles.pageGrid()}>
        <Container sx={detailedPostStyles.mainColumn()}>
          <Container sx={detailedPostStyles.postCard()}>
            <Container sx={detailedPostStyles.postHeader()}>
              <Avatar src={post.userPicture} alt={post.username} sx={PostCardStyles.profilePicture(theme)} />
              <Box sx={detailedPostStyles.authorMeta()}>
                <Typography sx={detailedPostStyles.authorName(theme)}>{post.username}</Typography>
                <Typography sx={detailedPostStyles.metaText(theme)}>{post.createdAt}</Typography>
                <Typography sx={detailedPostStyles.metaText(theme)}>{post.updatedAt}</Typography>
              </Box>
              <Box sx={{ flex: 1 }} />
            </Container>

            <Typography sx={detailedPostStyles.title(theme)}>{post.title}</Typography>

            <Typography sx={detailedPostStyles.bodyText(theme)}>
              Description...
              <br />
              {post.description}
            </Typography>

            <Typography sx={detailedPostStyles.attachmentsTitle(theme)}>Attachments</Typography>
            <Container sx={detailedPostStyles.attachmentList()}>
              {attachments.map((file) => (
                <Box key={file.name} sx={detailedPostStyles.attachmentRow(theme)}>
                  <Box sx={detailedPostStyles.attachmentLeft()}>
                    <img src={file.icon} alt={file.name} style={detailedPostStyles.attachmentIcon() as any} />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={detailedPostStyles.attachmentName(theme)} noWrap>
                        {file.name}
                      </Typography>
                      {file.extension ? (
                        <Typography sx={detailedPostStyles.attachmentMeta(theme)}>
                          {file.extension} - {file.size}
                        </Typography>
                      ) : null}
                    </Box>
                  </Box>
                  <ArrowDownwardIcon />
                </Box>
              ))}
            </Container>

            <Box sx={detailedPostStyles.postMetricsRow()}>
              <Box sx={detailedPostStyles.postMetricsLeft()}>
                <Box sx={detailedPostStyles.postMetricPill(theme)}>
                  <CheckCircleIcon sx={detailedPostStyles.postMetricIcon(theme)} />
                  <Typography variant="body2">21k</Typography>
                  <CancelIcon sx={detailedPostStyles.postMetricIcon(theme)} />
                </Box>

                <Box sx={detailedPostStyles.postMetricPill(theme)}>
                  <ReplyIcon sx={detailedPostStyles.postMetricIcon(theme)} />
                  <Typography variant="body2">25k</Typography>
                </Box>
              </Box>

              <Box sx={detailedPostStyles.postStatePill(theme)}>
                <Box sx={detailedPostStyles.postStateDot(theme)} />
                <Typography variant="body2">Open</Typography>
              </Box>
            </Box>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.35)' }} />

            <Box sx={detailedPostStyles.commentFilters()}>
              {commentFilters.map((filter) => (
                <Button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  sx={detailedPostStyles.commentFilterButton(theme, selectedFilter === filter)}
                >
                  {filter}
                </Button>
              ))}
            </Box>

            <Container sx={detailedPostStyles.commentComposer()}>
              <Box sx={detailedPostStyles.commentInputRow()}>
                <TextField
                  fullWidth
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  sx={detailedPostStyles.commentField(theme)}
                />
                <Button onClick={handleSubmitComment} sx={detailedPostStyles.sendButton(theme)}>
                  <ArrowForwardIcon sx={detailedPostStyles.sendButtonIcon(theme)} />
                </Button>
              </Box>
            </Container>

            <Container sx={detailedPostStyles.commentsStack()}>
              {comments.map((item) => (
                <Container key={item.id} sx={detailedPostStyles.commentCard()}>
                  <Box sx={detailedPostStyles.commentTopRow()}>
                    <Avatar src={item.avatar} alt={item.username} sx={detailedPostStyles.avatar()} />
                    <Typography sx={detailedPostStyles.authorName(theme)}>{item.username}</Typography>
                    <Box sx={{ flex: 1 }} />
                    <Button sx={{ minWidth: 'auto', color: theme.palette.text.primary, p: 0 }}>
                      <ReportIcon />
                    </Button>
                  </Box>

                  <Typography sx={detailedPostStyles.commentBody(theme)}>{item.text}</Typography>

                  <Box sx={detailedPostStyles.commentActions()}>
                    <Button
                      onClick={() => undefined}
                      sx={detailedPostStyles.commentActionButton(theme)}
                    >
                      <ReplyIcon sx={detailedPostStyles.commentActionIcon(theme)} />
                    </Button>

                    <Button
                      onClick={() => undefined}
                      sx={detailedPostStyles.commentActionButton(theme, true)}
                    >
                      <CheckCircleIcon sx={detailedPostStyles.commentActionIcon(theme)} />
                      <Typography variant="caption">{item.voteLabel}</Typography>
                      <CancelIcon sx={detailedPostStyles.commentActionIcon(theme)} />
                    </Button>
                  </Box>
                </Container>
              ))}
            </Container>
          </Container>
        </Container>

        <Container sx={detailedPostStyles.sideColumn()}>
          <Container sx={detailedPostStyles.sidebarCard()}>
            <Box sx={detailedPostStyles.companyBadge()}>
              <Avatar src={post.entityIcon} alt={post.entity} sx={{ width: 34, height: 34 }} />
              <Typography sx={detailedPostStyles.companyBadgeText(theme)}>{post.entity}</Typography>
            </Box>

            <Typography sx={detailedPostStyles.sidebarText(theme)}>
              Starbucks is a premier roaster and retailer of specialty coffee with locations in dozens of countries.
            </Typography>

            <Box>
              <Typography sx={detailedPostStyles.sidebarHeading(theme)}>Category:</Typography>
              <Typography sx={detailedPostStyles.sidebarText(theme)}>{post.category}</Typography>
            </Box>

            <Box>
              <Typography sx={detailedPostStyles.sidebarHeading(theme)}>Type of injustice:</Typography>
              <Typography sx={detailedPostStyles.sidebarText(theme)}>{post.type}</Typography>
            </Box>

            <Box>
              <Typography sx={detailedPostStyles.sidebarHeading(theme)}>Country:</Typography>
              <Typography sx={detailedPostStyles.sidebarText(theme)}>{post.country}</Typography>
            </Box>

            <Box>
              <Typography sx={detailedPostStyles.sidebarHeading(theme)}>Other company injustices</Typography>
              {post.tags.map((tag) => (
                <Typography key={tag} sx={detailedPostStyles.sidebarText(theme)} component="li">
                  {tag}
                </Typography>
              ))}
            </Box>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}