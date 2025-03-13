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
import { Log } from "./services/logging-service";

const ITEMS_PER_PAGE = 5;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkAuthStatus());
  const [loading, setLoading] = useState<boolean>(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [hasMore, setHasMore] = useState(true); // Track if there are more recipes to load
  const [cursor, setCursor] = useState<string | null>(null); // Store the cursor for pagination
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

  const fetchRecipes = async () => {
    setLoading(true);

    try {
      const requestCursor = cursor ?? "";
      const response = await listRecipes(ITEMS_PER_PAGE, requestCursor); // Fetch recipes and the total count
      
      const {recipes} = response;
      if(response.cursor) {
        setCursor(response.cursor);
      } else {
        setCursor("");
        setHasMore(false);
      }
      Log(`Loaded ${recipes.length}`);

      // Append the new recipes to the existing ones
      setRecipes((prev) => [...prev, ...recipes]);

      if(cursor != "") {
        setHasMore(true); // If loaded recipes count is less than total, there are more pages
      }

    } catch (error) {
        Log(`Error fetching recipes: ${error}`,'error');
        throw error;
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
      fetchRecipes(); // Fetch the first page of recipes
      }
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Handle loading next page
  const handleLoadMore = () => {
    fetchRecipes(); // Fetch next page of recipes
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
