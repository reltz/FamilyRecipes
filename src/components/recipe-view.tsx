import { useLocation, useNavigate } from "react-router-dom";
import { Recipe } from "../types/recipe";
import { Box, Button, Card, CardContent, CardMedia, Typography, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";

const RecipeView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe as Recipe | undefined;

  const { t } = useTranslation();

  if (!recipe) {
    return <Typography variant="h6" color="error" sx={{ textAlign: "center", mt: 4 }}>
      {t("no-recipes-found")}
    </Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      <Button variant="contained" color="primary" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        {t("back")}
      </Button>

      <Card>
        <CardMedia
          component="img"
          height="250"
          image={recipe.photoUrl || "./generic_food.jpg"}
          alt={recipe.name}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {recipe.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            By {recipe.author}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            {t("ingredients")}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {recipe.ingredients || "Not specified"}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            {t("preparation")}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {recipe.preparation}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RecipeView;
