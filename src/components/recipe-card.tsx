import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { red } from "@mui/material/colors";
import { Recipe } from "../types/recipe";

export interface CardComponentProps {
    cardData: Recipe
  }



function RecipeCard(props: CardComponentProps) {
    return (
        <Card sx={{ maxWidth: 345, marginTop: 2 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {props.cardData.author[0]}
            </Avatar>
          }
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVert />
          //   </IconButton>
          // }
          title={props.cardData.name}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image="mock_food.jpg"
          alt={props.cardData.name}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {props.cardData.preparation}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        </CardActions>
      </Card>
    )
}

export default RecipeCard
