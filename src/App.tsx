import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import AppHeader from "./components/app-header";
import CardList from "./components/card-list";
import Login from "./components/login";
import PrivateRoute from "./components/private-route";
import { checkAuthStatus, clearLocalToken } from "./services/login-service";
import { listRecipes } from "./services/api-service";
import { Recipe } from "./types/recipe";
import RecipeView from "./components/recipe-view";

const ITEMS_PER_PAGE = 5;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkAuthStatus());
  const [loading, setLoading] = useState<boolean>(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Track if there are more recipes to load
  const hasMounted = useRef(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    clearLocalToken();
    navigate("/login");
  };

  const handleLogin = (status: boolean) => {
    setIsAuthenticated(status);
    navigate("/");
  };

  const fetchRecipes = async (pageNumber: number) => {
    setLoading(true);

    try {
      const { recipes, total } = await listRecipes(pageNumber); // Fetch recipes and the total count
      console.log(`Loaded ${recipes.length} recipes, Total: ${total}`);

      // Append the new recipes to the existing ones
      setRecipes((prev) => [...prev, ...recipes]);

      // Set 'hasMore' based on the total count and the number of recipes already loaded
      const loadedRecipesCount = (pageNumber - 1) * ITEMS_PER_PAGE + recipes.length;
      setHasMore(loadedRecipesCount < total); // If loaded recipes count is less than total, there are more pages

    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
    setLoading(false);
  };

  // Initial recipe fetch when authenticated
  useEffect(() => {
    const authStatus = checkAuthStatus();
    setIsAuthenticated(authStatus);
    if (authStatus) {
      if (!hasMounted.current) {
        hasMounted.current = true;
      fetchRecipes(page); // Fetch the first page of recipes
      }
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Handle loading next page
  const handleLoadMore = () => {
    setPage((prev) => prev + 1); // Increment page
    fetchRecipes(page + 1); // Fetch next page of recipes
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AppHeader handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        
        {/* Private route */}
        <Route
          path="/"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={CardList}
              recipes={recipes}
              handleLoadMore={handleLoadMore}
              hasMore={hasMore}
              loading={loading}
            />
          }
        />
        <Route
          path="/recipe"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={RecipeView}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
