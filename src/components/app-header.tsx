import  { MouseEvent, useState } from "react";
import { AppBar, Box, Button, Dialog, IconButton, Menu, MenuItem, TextField, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import AddRecipeDialog from "./add-recipe-dialog";

interface AppHeaderProps {
    handleLogout: () => void;
    isAuthenticated: boolean;
}

function AppHeader(props: AppHeaderProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

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
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleDialogOpen}><AddIcon /> Add Recipe</MenuItem>
                    </Menu>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Receitas da familia
                    </Typography>
                    {props.isAuthenticated && (
                        <Button color="inherit" onClick={props.handleLogout}>Logout</Button>
                    )}
                </Toolbar>
            </AppBar>
            <AddRecipeDialog open={open} handleDialogClose={handleDialogClose} />
        </Box>
    );
}

export default AppHeader;
