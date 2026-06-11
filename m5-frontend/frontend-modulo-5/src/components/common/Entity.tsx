import { Avatar, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { EntityStyles } from "../styles/EntityStyles";
import { Container } from "@mui/material";

interface EntityPorps {
    src: string,
    name: string,
    onPressClick?: (id: number) => void;
}
export default function Entity ({src, name, onPressClick}: EntityPorps) {
    const theme = useTheme();

    return(
        <Button
            onClick = {() => onPressClick}
            sx={EntityStyles.container(theme)}
        >
            <Avatar
                src={src}
                alt={name}
                sx={EntityStyles.picture(theme)}
                >
            </Avatar>
            <Typography
                sx={EntityStyles.buttonText(theme)}
                noWrap  //pone los puntos al final en caso de que se pase del tamaño estabeclido
            >

                {name}
            </Typography>
        </Button>
    )
}