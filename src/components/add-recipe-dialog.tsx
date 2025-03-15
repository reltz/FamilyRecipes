import {
  Box,
  Button,
  Dialog,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { getPreSignedURL, PhotoURLs, saveRecipe } from "../services/api-service";
import { Log } from "../services/logging-service";
import { useTranslation } from 'react-i18next';

interface RecipeDialogProps {
  open: boolean;
  handleDialogClose: () => void;
}

function AddRecipeDialog({ open, handleDialogClose }: RecipeDialogProps) {

  const { t } = useTranslation();

  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [preparation, setPreparation] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");


  const handleSave = async () => {
    // upload file first!!
    let photoUrl: string | undefined;

    if (file) {
      let urls: PhotoURLs;
      urls = await getPreSignedURL();
      if (urls.preSignedURL) {
        //Upload photo to S3 using SDK here!!! TODO ROD
      }
      photoUrl = urls.photoURL;
    }

    try {
      await saveRecipe({
        name: recipeName,
        preparation,
        ingredients: ingredients,
        photoUrl
      });
      Log(`Recipe saved successfully ${recipeName}`, 'info');
    } catch (error) {
      Log(`Error saving recipe: ${error}`, 'error');
      throw error;
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
          {t('add-recipe')}
        </Typography>

        <Stack direction="column" spacing={2}>
          <TextField label="Nome da Receita" required sx={{ margin: 2 }} value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
          <TextField
            label={t('ingredients')}
            sx={{ margin: 2 }}
            multiline
            rows={5}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <TextField
            label={t('preparation')}
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
            }} />
          <label htmlFor="contained-button-file">
            <Button variant="outlined" component="span" fullWidth>
              {t('add-photo')}
            </Button>
            {fileName && <p>{t('selected-file')} {fileName}</p>}
          </label>

          <Stack direction="row" spacing={2}>
            <Box flexGrow={1}>
              <Button variant="contained" fullWidth onClick={handleSave}>
                {t('save')}
              </Button>
            </Box>
            <Box flexGrow={1}>
              <Button onClick={handleDialogClose} fullWidth>
                {t('close')}
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
}

export default AddRecipeDialog;
