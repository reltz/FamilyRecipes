import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { red } from "@mui/material/colors";
import { Recipe } from "../types/recipe";
import { useNavigate } from "react-router-dom";

export interface CardComponentProps {
    cardData: Recipe
  }


function RecipeCard(props: CardComponentProps) {
  const navigate = useNavigate();
  const recipe = props.cardData;

  const handleClick = () => {
      navigate(`/recipe`, { state: { recipe: recipe } });
  };


    return (
        <Card sx={{ maxWidth: 345, marginTop: 2 }}
        onClick={handleClick}
        >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {recipe.author[0]}
            </Avatar>
          }
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVert />
          //   </IconButton>
          // }
          title={recipe.name}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          // image="mock_food.jpg"
          image={recipe.photoUrl ?? "mock_food.jpg"}
          alt={recipe.name}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {recipe.preparation}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        </CardActions>
      </Card>
    )
}

export default RecipeCard
