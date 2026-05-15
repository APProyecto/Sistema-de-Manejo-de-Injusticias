import React, { useState } from "react";
import {Button, Container, ListItemIcon, Menu, MenuItem, ToggleButton, useTheme } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { OptionMenuStyles } from "./OptionMenuStyles";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

interface OptionMenuFeedProps {
  favorite: boolean;
}

export default function OptionMenuFeed({favorite}: OptionMenuFeedProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isFavorite, setIsFavorite] = useState(!favorite);

  const handleFavoriteClick = () => {
    handleClose();
    setIsFavorite(!isFavorite);
  };

  return (
    <Container sx={OptionMenuStyles.container(theme)}>
      <ToggleButton 
          value={"checked"} 
          selected={open}
          onChange={handleClick}
          sx={OptionMenuStyles.optionsButton(theme)}
      >
        <MoreHorizIcon sx={OptionMenuStyles.optionsIcon(theme)}></MoreHorizIcon>
      </ToggleButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={OptionMenuStyles.menu(theme)}
      >
        {/* Favorite */}
        <MenuItem 
          onClick={handleFavoriteClick}
          sx={OptionMenuStyles.menuItem(theme)}
          >
          {isFavorite? 
            <StarBorderIcon sx={OptionMenuStyles.listIcon(theme)}></StarBorderIcon>:
            <StarOutlinedIcon sx={OptionMenuStyles.listIcon(theme)}></StarOutlinedIcon>
          }
          Favorite
        </MenuItem>
        {/* Report */}
        <MenuItem 
          onClick={handleClose}
          sx={OptionMenuStyles.menuItem(theme)}
        >
          <ErrorOutlineOutlinedIcon sx={OptionMenuStyles.listIcon(theme)}></ErrorOutlineOutlinedIcon>
          Report
        </MenuItem>
      </Menu>
    </Container>
  );
}