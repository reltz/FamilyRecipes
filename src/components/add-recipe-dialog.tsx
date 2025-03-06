import { Button, Dialog, TextField } from "@mui/material";

interface RecipeDialogProps {
    open: boolean;
    handleDialogClose: () => void;
}


function AddRecipeDialog({open, handleDialogClose}: RecipeDialogProps) {
    return (
        <Dialog open={open} onClose={handleDialogClose}>
            <TextField label="Recipe Name" />
            {/* Add more fields as needed */}
            <Button onClick={handleDialogClose}>Close</Button>
        </Dialog>
    )
}


export default AddRecipeDialog;