import React, { useState } from "react";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem, TextField, ToggleButton, useTheme } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { OptionMenuStyles } from "../styles/OptionMenuStyles";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { reportBoycott, setFavorite } from "../../services/boycottService";
import { useAuth } from "../../context/authContext";

interface OptionMenuFeedProps {
  favorite: boolean;
  boycottId: number;
  onFavoriteChanged?: (isFavorite: boolean) => void;
}

export default function OptionMenuFeed({ favorite, boycottId, onFavoriteChanged }: Readonly<OptionMenuFeedProps>) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const { user, isAuthenticated } = useAuth();
  const resolvedUserId = user?.appUserId ?? (user as any)?.userId ?? (user as any)?.id;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClose = (_event: object, _reason: "backdropClick" | "escapeKeyDown") => {
    setAnchorEl(null);
  };

  const [isFavorite, setIsFavorite] = useState(!!favorite);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [isSendingReport, setIsSendingReport] = useState(false);

  const handleFavoriteClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    handleClose();

    if (!isAuthenticated) {
      globalThis.alert('Debes iniciar sesión para agregar a favoritos.');
      return;
    }

    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    setIsFavoriteLoading(true);

    try {
      await setFavorite(boycottId, newFavoriteState, resolvedUserId);
      onFavoriteChanged?.(newFavoriteState);
    } catch (error) {
      console.error('Error al actualizar favorito:', error);
      setIsFavorite(!newFavoriteState);
      globalThis.alert('No se pudo actualizar el favorito. Inténtalo de nuevo.');
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  const handleOpenReport = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleClose();

    if (!isAuthenticated) {
      globalThis.alert('Debes iniciar sesión para reportar.');
      return;
    }

    setIsReportOpen(true);
  };

  const handleCloseReport = () => {
    setIsReportOpen(false);
    setReportReason('');
  };

  const handleSendReport = async () => {
    if (!reportReason.trim()) {
      globalThis.alert('Escribe una razón para el reporte.');
      return;
    }

    setIsSendingReport(true);
    try {
      await reportBoycott(
        boycottId,
        { reason: reportReason.trim(), description: reportReason.trim() },
        resolvedUserId
      );
      handleCloseReport();
      globalThis.alert('Reporte enviado correctamente.');
    } catch (error) {
      console.error('Error al enviar reporte:', error);
      globalThis.alert('No se pudo enviar el reporte. Inténtalo de nuevo.');
    } finally {
      setIsSendingReport(false);
    }
  };

  return (
    <Container sx={OptionMenuStyles.container(theme)} onClick={(event) => event.stopPropagation()}>
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
        onClose={handleMenuClose}
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
          disabled={isFavoriteLoading}
          >
          {isFavorite? 
            <StarOutlinedIcon sx={OptionMenuStyles.listIcon(theme)}></StarOutlinedIcon>:
            <StarBorderIcon sx={OptionMenuStyles.listIcon(theme)}></StarBorderIcon>
          }
          Favorite
        </MenuItem>
        {/* Report */}
        <MenuItem 
          onClick={handleOpenReport}
          sx={OptionMenuStyles.menuItem(theme)}
        >
          <ErrorOutlineOutlinedIcon sx={OptionMenuStyles.listIcon(theme)}></ErrorOutlineOutlinedIcon>
          Report
        </MenuItem>
      </Menu>

      <Dialog open={isReportOpen} onClose={handleCloseReport} onKeyDown={(e) => {
    e.stopPropagation();
  }}>
        <DialogTitle>Reportar publicación</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Motivo"
            type="text"
            fullWidth
            value={reportReason}
            onChange={(event) => setReportReason(event.target.value)}
            multiline
            minRows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReport}>Cancelar</Button>
          <Button onClick={handleSendReport} disabled={isSendingReport}>Enviar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}