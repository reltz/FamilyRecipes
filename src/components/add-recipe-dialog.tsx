import {
  Box,
  Button,
  Dialog,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getPreSignedURL, PhotoURLs, saveRecipe, uploadImageS3Bucket } from "../services/api-service";
import { Log } from "../services/logging-service";
import { useTranslation } from 'react-i18next';
import loadImage from 'blueimp-load-image';

interface RecipeDialogProps {
  open: boolean;
  handleDialogClose: () => void;
  onRecipeAdded: () => void;
}

const MAX_SIZE_IMAGE = 1024;

function AddRecipeDialog({ open, handleDialogClose, onRecipeAdded }: RecipeDialogProps) {

  const { t } = useTranslation();

  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [preparation, setPreparation] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [requiredFields, setRequiredFields] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleCloseInternal = () => {
    setRecipeName("");
    setIngredients("");
    setPreparation("");
    setFile(null);
    setFileName("");
    setValidationError(false);
    setRequiredFields(false);

    handleDialogClose();
  }

  useEffect(() => {
    if (open) {
      setLoading(false);
      setRequestError(false);
      setFile(null);
      setFileName("")
    }
  }, [open]);

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);

    Log("saving recipe");
    let photoUrl: string | undefined;

    if (!recipeName || !preparation) {
      setRequiredFields(true);
      setLoading(false);
      return;
    } else {
      setRequiredFields(false);
    }

    if (file) {
      let urls: PhotoURLs;
      const extension = fileName.split('.')[1];
      if (!['jpg', 'jpeg', 'png'].includes(extension)) {
        setValidationError(true);
        setLoading(false);
      } else {
        setValidationError(false);
      }
      const fileNameForUpload = `${recipeName}.${extension}`;

      Log(`FileName: ${fileNameForUpload}`);
      urls = await getPreSignedURL(fileNameForUpload);

      if (!urls.uploadUrl) {
        alert("Upload da foto falhou, tente de novo ou salve a receita sem a foto!");
        setLoading(false);
        return;
      }

      const successUpload = await new Promise<boolean>((resolve) => {
        loadImage(
          file,
          function (canvasOrImg) {
            if (canvasOrImg instanceof HTMLCanvasElement) {
              canvasOrImg.toBlob(async function (blob) {
                if (blob) {
                  const fileFromBlob = new File([blob], file.name, { type: blob.type });
                  const uploadSuccess = await uploadImageS3Bucket(fileFromBlob, urls.uploadUrl);
                  resolve(uploadSuccess);
                } else {
                  Log('Failed to create blob from canvas', 'error');
                  setRequestError(true)
                  resolve(false);
                }
              }, file.type);
            } else {
              Log('Expected a canvas, but got an image element', 'error');
              setRequestError(true)
              resolve(false);
            }
          },
          {
            maxWidth: MAX_SIZE_IMAGE,
            maxHeight: MAX_SIZE_IMAGE,
            canvas: true,
          }
        );
      });

      if (successUpload) {
        photoUrl = urls.photoURL;
      }
    }

    if (!file && !photoUrl || file && photoUrl) {
      try {
        await saveRecipe({
          name: recipeName,
          preparation,
          ingredients: ingredients,
          photoUrl
        });
        Log(`Recipe saved successfully ${recipeName}`, 'info');
        onRecipeAdded();
        handleDialogClose();
      } catch (error) {
        Log(`Error saving recipe: ${error}`, 'error');
        setRequestError(true)
        throw error;
      }
    } else {
      setRequestError(true)
      setLoading(false)
    }
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
          <TextField  label={t('recipe-name')}  required sx={{ margin: 2 }} value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
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
          {validationError && (
            <Typography sx={{ color: "red", fontSize: "14px", mt: 1 }}>{t('invalid-image-format')}</Typography>
          )}
          {requestError && (
            <Typography sx={{ color: "red", fontSize: "14px", mt: 1 }}>{t('request-error-save')}</Typography>
          )}
          <label htmlFor="contained-button-file">
            <Button variant="outlined" component="span" fullWidth>
              {t('add-photo')}
            </Button>
            {fileName && <p>{t('selected-file')} {fileName}</p>}
          </label>
          {requiredFields && (
            <Typography sx={{ color: "red", fontSize: "14px", mt: 1 }}>{t('create-recipe-required')}</Typography>
          )}
          <Stack direction="row" spacing={2}>
            <Box flexGrow={1}>
              <Button variant="contained" fullWidth onClick={handleSave} disabled={loading}>
                {loading ? t('saving') : t('save')}
              </Button>
            </Box>
            <Box flexGrow={1}>
              <Button onClick={handleCloseInternal} fullWidth>
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
