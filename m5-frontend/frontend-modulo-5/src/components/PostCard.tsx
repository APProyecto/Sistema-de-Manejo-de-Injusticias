import { Avatar, Button, Container, ToggleButton, Typography } from "@mui/material";
import { PostCardStyles } from "./PostCardStyles";
import { useTheme } from "@mui/material";
import type { PostCardData, User } from "../types";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from "react";
import Entity from "./Entity";
import VotesBox from "./VotesBox";
import PostInteracionButton from "./PostInteractionButton";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import CircleIcon from '@mui/icons-material/Circle';
import { Circle } from "@mui/icons-material";

interface PostCardProps {
    data: PostCardData,
    onUsernameClick?: (id: number) => void;
    onPostClick?: (id: number) => void;
    onIndictedClick: (id: number) => void;
    onCaseClick: (id: number) => void;
}

export default function PostCard({ data, onUsernameClick, onPostClick, onIndictedClick, onCaseClick }: PostCardProps){
    const theme = useTheme();
    const [isOptionsSelected, setIsOptionsSelected] = useState(false);
    const handleStateColor = (state: string) => {
        if(state === 'Active'){
            return theme.palette.success.main;
        }else{
            return theme.palette.background.default;
        }
    }

    return(
        <Container sx={PostCardStyles.container(theme)}>
            <Container sx={PostCardStyles.topContainer(theme)}>

                {/* Profile Picture */}
                <Avatar
                    src= {data.user_picture}
                    alt= {data.username}
                    sx={PostCardStyles.profilePicture(theme)}
                />

                {/* Username */}
                <Button
                    sx={PostCardStyles.usernameButton(theme)}
                >
                    {data.username}
                </Button>

                {/* Creation Date */}
                <Typography variant="caption" align="left" >{data.creation_date}</Typography>

                {/* Options */}
                <ToggleButton 
                    value={"checked"} 
                    selected={isOptionsSelected}
                    onChange={() => setIsOptionsSelected(!isOptionsSelected)}
                    sx={PostCardStyles.optionsButton(theme)}
                >
                    <MoreHorizIcon sx={PostCardStyles.optionsIcon(theme)}></MoreHorizIcon>
                </ToggleButton>

            </Container>
            <Container sx={PostCardStyles.descriptionContainer(theme)}>
                <Container sx={PostCardStyles.entitiesContainer(theme)}>

                    {/*Indicted*/}
                    <Entity
                        src={data.indicted_picture}
                        name={data.indicted}
                    ></Entity>

                    {/*Case*/}
                    <Entity
                        src={data.case_picture}
                        name={data.case}
                    ></Entity>
                </Container>

                {/*Title*/}
                <Typography
                    sx={PostCardStyles.title(theme)}
                    noWrap  //pone los puntos al final en caso de que se pase del tamaño estabeclido                
                >{data.title}
                </Typography>

                {/* Description */}
                <Typography
                    sx={PostCardStyles.description(theme)}
                >{data.description}
                </Typography>
            </Container>

            {/*Bottom Container*/}
            <Container sx={PostCardStyles.bottomContainer(theme)} disableGutters>
                <Container sx={PostCardStyles.interactiveButtonsContainer(theme)} disableGutters>


                    {/* Votes */}
                    <VotesBox
                        votes={data.votes}
                        >
                    </VotesBox>

                    {/* Comments */}
                    <PostInteracionButton
                        text={data.coments}
                        icon={InsertCommentIcon}
                        iconColor={theme.palette.text.primary}
                        >
                    </PostInteracionButton>

                    {/* Evidences */}
                    <PostInteracionButton
                        text={data.evidences}
                        icon={DocumentScannerIcon}
                        iconColor={theme.palette.text.primary}
                        >
                    </PostInteracionButton>
                </Container>

                <Container sx={PostCardStyles.filler(theme)}></Container>

                {/* State */}
                <PostInteracionButton
                    text={data.state}
                    icon={Circle}
                    iconColor={handleStateColor(data.state)}
                >
                </PostInteracionButton>
            </Container>
        </Container>
    )
}