import React from "react";
import {Container, Menu, MenuItem, ToggleButton, useTheme } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { OptionMenuStyles } from "./OptionMenuStyles";
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';

export default function OptionMenuMyPosts() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        {/* Edit */}
        <MenuItem 
          onClick={handleClose}
          sx={OptionMenuStyles.menuItem(theme)}
          >
          <ModeIcon sx={OptionMenuStyles.listIcon(theme)}></ModeIcon>
          Edit
        </MenuItem>
        {/* Delete */}
        <MenuItem 
          onClick={handleClose}
          sx={OptionMenuStyles.menuItem(theme)}
        >
          <DeleteIcon sx={OptionMenuStyles.listIcon(theme)}></DeleteIcon>
          Delete
        </MenuItem>
      </Menu>
    </Container>
  );
}