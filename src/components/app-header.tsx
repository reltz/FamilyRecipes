import { MouseEvent, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import AddRecipeDialog from "./add-recipe-dialog";
import { useTranslation } from "react-i18next";
import ChangePasswordDialog from "./change-password-dialog";

interface AppHeaderProps {
  handleLogout: () => void;
  isAuthenticated: boolean;
  onRecipeAdded: () => void;
  user: string | null;
}

function AppHeader(props: AppHeaderProps) {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [avatarAnchorEl, setAvatarAnchorEl] = useState<null | HTMLElement>(null);
  const [addRecipeDialogOpen, setAddRecipeDialogOpen] = useState(false);
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAvatarMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAvatarAnchorEl(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAvatarAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setAddRecipeDialogOpen(true);
  };

  const handleDialogClose = () => {
    setAddRecipeDialogOpen(false);
  };

  const handleChangePasswordDialogOpen = () => {
    setChangePasswordDialogOpen(true);
    handleAvatarMenuClose();
  }

  const handleChangePasswordDialogClose = () => {
    setChangePasswordDialogOpen(false);
  }

  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, ml: 2 }}
            onClick={handleMenuOpen}
            disabled={!props.isAuthenticated}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleDialogOpen}>
              <AddIcon /> {t("add-recipe")}
            </MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t("header-title")}
          </Typography>
          {props.isAuthenticated && props.user && (
            <div>
              <Tooltip title={props.user}>
                <Avatar
                  sx={{ bgcolor: theme.palette.success.main, marginRight: 2 }}
                  aria-label={t("user")}
                  onClick={handleAvatarMenuOpen}
                >
                  {props.user[0].toUpperCase()}
                </Avatar>
              </Tooltip>
              <Menu
                anchorEl={avatarAnchorEl}
                keepMounted
                open={Boolean(avatarAnchorEl)}
                onClose={handleAvatarMenuClose}
              >
                <MenuItem onClick={props.handleLogout}>{t("logout")}</MenuItem>
                <MenuItem onClick={handleChangePasswordDialogOpen}>
                  {t("change-password")}
                </MenuItem>
              </Menu>
              <ChangePasswordDialog
                open={changePasswordDialogOpen}
                handleClose={handleChangePasswordDialogClose}
                t={t}
              />  
            </div>
          )}
        </Toolbar>
      </AppBar>
      <AddRecipeDialog
        open={addRecipeDialogOpen}
        handleDialogClose={handleDialogClose}
        onRecipeAdded={props.onRecipeAdded}
      />
    </Box>
  );
}

export default AppHeader;
