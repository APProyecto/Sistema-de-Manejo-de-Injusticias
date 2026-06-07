import { Container, Typography, Avatar, Button, Box, useTheme, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PostCardStyles } from '../../components/styles/PostCardStyles';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PDFLogo from '../../assets/PDFIcon.png';
import { useState } from 'react';

const Files = [
    {
        icon: PDFLogo,
        name: 'Archivo1.pdf',
        extension:'PDF',
        size:'20GB'
    },
    {
        icon: PDFLogo,
        name: 'Archivo2.pdf',
        extension:'PDF',
        size:'20GB'
    },
    {
        icon: PDFLogo,
        name: 'Archivo3.pdf',
        extension:'PDF',
        size:'20GB'
    },
    {
        icon: PDFLogo,
        name: 'Archivo4.pdf',
        extension:'PDF',
        size:'20GB'
    }
  ];

export default function Evidences() {

    const [selectedFile, setSelectedFile] = useState('None');

    const theme = useTheme();
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };
    
    return (
        <Container sx={(theme=>({
            background: theme.palette.background.paper,
            height:'110vh',
            width:'95vw'
        }))}>

            <Box sx={(theme)=>({
                background: theme.palette.background.default,
                height:'90%',
                width:'100%',
                pl:'2%',
                pr:'2%',
                pt:3,
                mt:0,
                mb:0
                })}>
                <Container sx={{...PostCardStyles.topContainer(theme), alignContent: 'top', alignItems: 'top', height:50, ml:5,mt:5,mr:5}}>
                    <Button color="inherit" aria-label="like" sx={{
                        borderRadius:5,
                        mr:2,
                        justifyContent:'flex-start',
                        alignContent:'center'
                    }}
                    onClick={() => handleNavigation('/')}>
                        <ArrowBackIcon/>
                    </Button>
                    
                    <Avatar
                        src= {'https://res.cloudinary.com/dewscucnp/image/upload/v1778781104/cool-profile-picture-87h46gcobjl5e4xu_bifpln.jpg'}
                        alt= {'myUsername'}
                        sx={PostCardStyles.profilePicture(theme)}
                    />
                    <Button
                        sx={PostCardStyles.usernameButton(theme)}
                    >
                        {'myUsername'}
                    </Button>
                </Container>
                
                <Box sx={{ml:10, mr:10, mt:10}}>
                     {Files.map((File) => (
                        <Box sx={{m:0,p:2,pb:0,'&:hover':{background:theme.palette.grey[100]}, borderRadius:5}} key={File.name}>
                            <Box sx={{width:'100%',display:'flex'}}>
                                <img
                                    src= {File.icon}
                                    alt= {'myUsername'}
                                    style={{ 
                                        width: '30px', 
                                        marginBottom:15,
                                        marginRight:15,
                                        paddingBottom:2,
                                        objectFit: 'contain'
                                    }} 
                                onClick={()=>{setSelectedFile(File.name);
                                    {/* WIP : Al dar click al archivo no pasa nada, los archivos aun no son reales */}
                                }}
                                />
                                <Typography variant='h6' sx={{mb:1,ml:1,mr:'Auto'}}>{File.name}</Typography>
                                <Typography variant='body1' sx={{mt:1,mb:0,ml:'Auto',mr:1}}>{File.extension}-{File.size}</Typography>
                                <ArrowDownwardIcon sx={{mt:1}}/>
                            </Box>
                            <Divider orientation='horizontal' flexItem sx={{background:theme.palette.background.paper,mb:2}}/>
                        </Box>
                        )
                    )}
                </Box>

            </Box>
        </Container>
    );
}