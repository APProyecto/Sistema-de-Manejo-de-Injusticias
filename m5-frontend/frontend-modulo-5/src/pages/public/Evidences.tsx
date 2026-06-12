import { Container, Typography, Avatar, Button, Box, useTheme, Divider, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { PostCardStyles } from '../../components/styles/PostCardStyles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import PDFLogo from '../../assets/PDFIcon.png';
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useEffect, useState } from 'react';
import { downloadEvidenceFile, getBoycottAttachments, getBoycottById } from '../../services/boycottService';
import type { DetailedPostData } from '../../types';
import { useAuth } from '../../context/authContext';
import LoadingScreen from '../../components/common/LoadingScreen';

export default function Evidences() {
    const { id } = useParams();
    const { user } = useAuth();
    const resolvedUserId = user?.appUserId ?? (user as any)?.userId ?? (user as any)?.id;
    const [data, setData] = useState<DetailedPostData>();
    const [loading, setLoading] = useState(true);

    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;

        const loadData = async () => {
            if (!id) {
                if (mounted) {
                    setLoading(false);
                }
                return;
            }

            try {
                const response = await getBoycottById(Number(id), resolvedUserId);
                if (mounted) {
                    setData(response);
                }
            } catch (error) {
                console.error('Error loading evidences:', error);
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        void loadData();

        return () => {
            mounted = false;
        };
    }, [id, resolvedUserId]);

    const handleNavigation = () => {
        navigate(id ? `/detailed-post/${id}` : '/');
    };

    const handleDownload = async (fileId: string | number, fileName: string, evidenceIndex: number) => {
        try {
            console.log('📥 handleDownload called with:', { fileId, fileName, evidenceIndex, boycottId: id });
            let resolvedFileId = String(fileId);

            if (id && /^\d+$/.test(resolvedFileId)) {
                const attachments = await getBoycottAttachments(Number(id));
                const byName = attachments.find((item) => item.nombre === fileName);
                if (byName?.id) {
                    resolvedFileId = byName.id;
                } else if (attachments[evidenceIndex]?.id) {
                    resolvedFileId = attachments[evidenceIndex].id;
                }
            }

            const blob = await downloadEvidenceFile(resolvedFileId);

            const url = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = fileName || 'evidence-file';
            document.body.appendChild(anchor);
            anchor.click();
            anchor.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch (error) {
            console.error('Error downloading file:', error);
            globalThis.alert('No se pudo descargar el archivo. Intenta de nuevo.');
        }
    };

    if (loading) {
        return <LoadingScreen />;
    }

    const evidences = data?.evidences ?? [];

    const getIcon = (type: string) => {
        if (type === 'pdf') {
            return <img src={PDFLogo} alt="PDF" style={{ width: '30px', marginBottom: 15, marginRight: 15, paddingBottom: 2, objectFit: 'contain' }} />;
        }

        if (type === 'image') {
            return <ImageIcon sx={{ mb: 1.5, mr: 1.8 }} />;
        }

        return <InsertDriveFileIcon sx={{ mb: 1.5, mr: 1.8 }} />;
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
                    onClick={handleNavigation}>
                        <ArrowBackIcon/>
                    </Button>
                    
                    <Avatar
                        src={data?.user.profilePicture}
                        alt={data?.user.username ?? 'user'}
                        sx={PostCardStyles.profilePicture(theme)}
                    />
                    <Button
                        sx={PostCardStyles.usernameButton(theme)}
                    >
                        {data?.user.username ?? 'user'}
                    </Button>
                </Container>
                
                <Box sx={{ml:10, mr:10, mt:10}}>
                     {evidences.length === 0 && (
                        <Typography variant='h6' sx={{ color: theme.palette.text.primary }}>
                            This boycott has no evidences yet.
                        </Typography>
                     )}

                            {evidences.map((file, index) => (
                        <Box sx={{m:0,p:2,pb:0,'&:hover':{background:theme.palette.grey[100]}, borderRadius:5}} key={`${file.id}-${file.name}`}>
                            <Box sx={{width:'100%',display:'flex', alignItems: 'center'}}>
                                {getIcon(file.type)}
                                <Typography variant='h6' sx={{mb:1,ml:1,mr:'Auto'}}>{file.name}</Typography>
                                <Typography variant='body1' sx={{mt:1,mb:0,ml:'Auto',mr:1}}>{file.extension.toUpperCase()} - {file.weight}</Typography>
                                <IconButton
                                    color="inherit"
                                    aria-label={`Descargar ${file.name}`}
                                    size="small"
                                    sx={{ p: 0.5, mt: 0.5 }}
                                    onMouseDown={(event) => {
                                        console.log('🖱️ mouse down en boton descarga');
                                        event.preventDefault();
                                    }}
                                    onClick={(event) => {
                                        console.log('🔘 BOTÓN PRESIONADO');
                                        event.preventDefault();
                                        event.stopPropagation();
                                        void handleDownload(file.id, file.name, index);
                                    }}
                                >
                                    <DownloadIcon sx={{mt:1}}/>
                                </IconButton>
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