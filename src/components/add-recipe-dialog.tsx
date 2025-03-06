import {
  Box,
  Button,
  Dialog,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { saveRecipe } from "../services/api-service";

interface RecipeDialogProps {
  open: boolean;
  handleDialogClose: () => void;
}

function AddRecipeDialog({ open, handleDialogClose }: RecipeDialogProps) {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [preparation, setPreparation] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");


  const handleSave = async () => {
    const formData = new FormData();

    formData.append("name", recipeName);
    formData.append("preparation", preparation);
    if(ingredients){
        formData.append("ingredients", ingredients);
    }
    if (file) {
      formData.append("photo", file);
    }

    try {
      const savedRecipe = await saveRecipe(formData);
      console.log('Recipe saved successfully', savedRecipe);
    } catch (error) {
      console.log('Error saving recipe', error);
    }

    handleDialogClose();
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} fullWidth>
      <Box sx={{ padding: 3, display: "block" }}>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", color: "primary.main", marginBottom: 2 }}
        >
          Adicionar Receita
        </Typography>

        <Stack direction="column" spacing={2}>
          <TextField label="Nome da Receita" required sx={{ margin: 2 }}   value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
          <TextField
            label="Ingredientes"
            sx={{ margin: 2 }}
            multiline
            rows={5}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <TextField
            label="Instruções de Preparação"
            sx={{ margin: 2 }}
            required
            multiline
            rows={5}
            value={preparation}
            onChange={(e) => setPreparation(e.target.value)}
            
          />
          <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
                setFile(e.target.files?.[0] || null);
                setFileName(e.target.files?.[0]?.name || "");
              }}/>
          <label htmlFor="contained-button-file">
            <Button variant="outlined" component="span" fullWidth>
              Upload Photo
            </Button>
            {fileName && <p>Selected file: {fileName}</p>}
          </label>

          <Stack direction="row" spacing={2}>
            <Box flexGrow={1}>
              <Button variant="contained" fullWidth onClick={handleSave}>
                Save
              </Button>
            </Box>
            <Box flexGrow={1}>
              <Button onClick={handleDialogClose} fullWidth>
                Close
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
}

export default AddRecipeDialog;
