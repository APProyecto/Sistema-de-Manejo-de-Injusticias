import { Container, Typography, Card, CardContent, Button, Box, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import { detailedPostSyles } from '../styles/DetailedPostStyles';
import Entity from '../../components/common/Entity';
import type { DetailedPostData } from '../../types';


export default function DetailedPost() {
    const { id } = useParams();
    const theme = useTheme();

    let data : DetailedPostData = {
      id: 1,
      indicted: {
        id: 1,
        name: 'Starbucks',
        picture: 'https://res.cloudinary.com/dewscucnp/image/upload/v1778781215/images_11_objw2p.png',
        cases: ['animal testing', 'homophobia'],
        category: 'Food',
        description: 'Starbucks is a premier roaster and retailer of specialty coffee with locations in dozens of countries.',
      },
      type: 'Political',
      country: 'USA',
      case: 'War in Gazaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      case_picture: 'https://res.cloudinary.com/dewscucnp/image/upload/v1778781294/round-palestinian-flag-of-palestine-vector_fvtvtg.jpg',
      title: 'starbucks supports the genocide in gaza',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus maximus ante vitae dignissim elementum. Fusce fermentum velit vitae nulla sodales scelerisque. Cras et dolor metus. Vestibulum vitae ex nec lacus cursus volutpat a at mi. Maecenas hendrerit sodales lectus vitae scelerisque. Vivamus vehicula risus in euismod eleifend. Nulla et sapien vel eros bibendum sagittis. Cras pretium neque in mauris fringilla, vitae facilisis mi ornare. Donec semper tempor arcu id dignissim. Etiam sed ligula eu nibh sollicitudin semper. Cras quis porttitor dui. Nullam consectetur velit sit amet arcu auctor, sit amet auctor mauris tempus. nisl volutpat ac. Suspendisse accumsan dictum arcu eget tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus maximus ante vitae dignissim elementum. Fusce fermentum velit vitae nulla sodales scelerisque. Cras et dolor metus. Vestibulum vitae ex nec lacus cursus volutpat a at mi. Maecenas hendrerit sodales lectus vitae scelerisque. Vivamus vehicula risus in euismod eleifend. Nulla et sapien vel eros bibendum sagittis. Cras pretium neque in mauris fringilla, vitae facilisis mi ornare. Donec semper tempor arcu id dignissim. Etiam sed ligula eu nibh sollicitudin semper. Cras quis porttitor dui. Nullam consectetur velit sit amet arcu auctor, sit amet auctor mauris tempus. nisl volutpat ac. Suspendisse accumsan dictum arcu eget tempo',
      creation_date: '7h ago',
      is_favorite: false,
      votes: '23k',
      voted_by_user: true,
      comment_amount: '25k',
      evidences: [
        {
          id: 1,
          extension: 'pdf',
          name: 'this name',
          type: 'pdf',
          weight: '20kb'
        }
      ],
      comments: [
        {
          id: 1,
          content: 'this is a comment',
          creation_date: '12/08/2026',
          post_id: 1,
          user: {
            id: 1,
            profilePicture: 'https://res.cloudinary.com/dewscucnp/image/upload/v1778781294/round-palestinian-flag-of-palestine-vector_fvtvtg.jpg',
            username: 'auser',
          },
          voted_by_user: true,
          votes: '9',
        }
      ],
      last_updated: '20/02/2025',
      user: {
        id: 2,
        username: 'hii',
        profilePicture: 'https://res.cloudinary.com/dewscucnp/image/upload/v1778781294/round-palestinian-flag-of-palestine-vector_fvtvtg.jpg'
      },
      state: 'Active',
    }

  return (
    <Container sx={detailedPostSyles.mainContainer(theme)}>
     <Container sx={detailedPostSyles.centerContainer(theme)}>

     </Container>
     <Container sx={detailedPostSyles.rightContainer(theme)}>
      <Entity
          src={data.indicted.picture}
          name={data.indicted.name}
      ></Entity>

      {/*Description*/}
      <Typography
        sx={detailedPostSyles.text(theme)}
      >{data.indicted.description}
      </Typography>

      {/*Category*/}
      <Typography
        sx={detailedPostSyles.subtitle(theme)}
      >Category
      </Typography>
      <Typography sx={detailedPostSyles.text(theme)}>
        {data.indicted.category}
      </Typography>

      {/*Type of Injustice*/}
      <Typography
        sx={detailedPostSyles.subtitle(theme)}
      >Type of Injustice
      </Typography>
      <Typography sx={detailedPostSyles.text(theme)}>
        {data.type}
      </Typography>

      {/*Country*/}
      <Typography
        sx={detailedPostSyles.subtitle(theme)}
      >Country
      </Typography>
      <Typography sx={detailedPostSyles.text(theme)}>
        {data.country}
      </Typography>

      {/*Other company Cases*/}
      <Typography
        sx={detailedPostSyles.subtitle(theme)}
      >Other Company Cases
      </Typography>
      <Typography sx={detailedPostSyles.text(theme)}>
        {data.indicted.cases.map((item, index) => (
          <Container sx={detailedPostSyles.bulletItem(theme)}>
            <Typography sx={detailedPostSyles.bulletPoint(theme)}>{'\u2022'}</Typography>
            <Typography>{item}</Typography>
          </Container>
        ))}
      </Typography>

     </Container>
    </Container>
  );
}