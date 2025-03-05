import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from "@mui/material"
import { MoreVert }  from '@mui/icons-material';
import { red } from "@mui/material/colors";

export interface CardComponentProps {
    cardData: CardData
  }

  export interface CardData {
    title: string;
    description: string;
  }

function RecipeCard(props: CardComponentProps) {
    return (
        <Card sx={{ maxWidth: 345, marginTop: 9 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title={props.cardData.title}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image="mock_food.jpg"
          alt={props.cardData.title}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {props.cardData.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        </CardActions>
      </Card>
    )
}

export default RecipeCard
