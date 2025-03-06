import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";


interface AppHeaderProps {
    handleLogout: () => void;
    isAuthenticated: boolean
}

function AppHeader(props: AppHeaderProps) {
    return (
        <Box sx={{ flexGrow: 1, width: "100%" }}>
            <AppBar position="static" sx={{ width: "100%" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, ml: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Receitas da familia
                    </Typography>
                    {props.isAuthenticated && (
                        <Button color="inherit" onClick={props.handleLogout}>Logout</Button>
                    )}

                </Toolbar>
            </AppBar>
        </Box>
    )
};

export default AppHeader;