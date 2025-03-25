import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { Recipe } from "../types/recipe";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export interface CardComponentProps {
  cardData: Recipe;
}

function RecipeCard(props: CardComponentProps) {
  const navigate = useNavigate();
  const recipe = props.cardData;
  const { t } = useTranslation();

  const handleClick = () => {
    navigate(`/recipe`, { state: { recipe: recipe } });
  };

  const theme = useTheme();
  
  return (
    <Card sx={{ maxWidth: 345, marginTop: 2 }} onClick={handleClick}>
      <CardHeader
        avatar={
          <Tooltip title={recipe.author}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main }} aria-label={t("recipe")}>
              {recipe.author[0].toUpperCase()}
            </Avatar>
          </Tooltip>
        }
        title={recipe.name}
        subheader={new Date(recipe.createdAt).toLocaleDateString("pt-BR")}
      />
      <CardMedia
        component="img"
        height="194"
        image={recipe.photoUrl || "./generic_food.jpg"}
        alt={recipe.name}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {recipe.preparation}
        </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}

export default RecipeCard;
