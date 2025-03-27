import { Tooltip, IconButton } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useState, useEffect } from 'react';
import { likeRecipe } from "../services/api-service";
import { Log } from "../services/logging-service";

interface LikesProps {
  likes: { [username: string]: boolean };
  recipeId: string;
  username: string; // Add a username prop
}

function Likes(props: LikesProps) {
  const {likes, recipeId, username} = props;
  const [likesCount, setLikesCount] = useState(Object.values(likes || {}).filter(Boolean).length);
  const [userLiked, setUserLiked] = useState(!!likes[username]); // Determine if the user has liked the recipe
  const likedBy = Object.keys(likes || {}).join(", ");

  useEffect(() => {
    setLikesCount(Object.values(likes || {}).filter(Boolean).length);
    setUserLiked(!!likes[username]); // Update userLiked when likes change
  }, [likes]);

  const handleLike = async () => {
    try {
      const success = await likeRecipe(recipeId, 'like');
      if (success) { // Check if the request succeeded
        setLikesCount(likesCount + 1);
        setUserLiked(true);
      }
    } catch (error) {
      Log(`${JSON.stringify(error)}`, "error");
    }
  };

  const handleUnlike = async () => {
    try {
      const success = await likeRecipe(recipeId, 'unlike');
      if (success) { // Check if the request succeeded
        setLikesCount(likesCount - 1);
        setUserLiked(false);
      }
    } catch (error) {
      Log(`${JSON.stringify(error)}`, "error");
    }
  };

  return (
    <Tooltip title={likedBy}>
      <IconButton onClick={userLiked ? handleUnlike : handleLike}>
        <ThumbUpIcon color="secondary" /> {likesCount}
      </IconButton>
    </Tooltip>
  );
};

export default Likes;
