import { Box, TextField, Button, CircularProgress } from "@mui/material";
import RecipeCard from "./recipe-card";
import { Recipe } from "../types/recipe";
import { useState } from "react";

interface CardListProps {
    recipes: Recipe[];
    handleLoadMore: () => void;
    hasMore: boolean;
    loading: boolean;
}

function CardList({
  recipes,
  handleLoadMore,
  hasMore,
  loading
}: CardListProps) {
  const [search, setSearch] = useState("");


  // Filter recipes by search input
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 2 }}>
      {/* Search Bar */}
      <TextField
        label="Search Recipes"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2, maxWidth: 600, mx: "auto", display: "block" }} // Centered, but does not restrict cards
      />

      {/* Recipe List */}
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 2 }}>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => <RecipeCard key={index} cardData={recipe} />)
        ) : (
          <p>No recipes found.</p>
        )}
      </Box>

      {/* Load More Button */}
      {hasMore && !search && (
        <Box sx={{ textAlign: "center", mt: 2 }}>
          {loading ? ( // Only show the spinner if loading is true
            <CircularProgress />
          ) : (
            <Button variant="contained" onClick={handleLoadMore}>
              Load More
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}

export default CardList;
