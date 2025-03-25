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

const ITEMS_PER_PAGE = 9;

function App() {

  const authStatus = checkAuthStatus();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authStatus.isAuth);
  const [loading, setLoading] = useState<boolean>(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [hasMore, setHasMore] = useState(false); // Track if there are more recipes to load
  const [cursor, setCursor] = useState<string | null>(null); // Store the cursor for pagination
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Increment to trigger refresh
  const [user, setUser] = useState<string | null>(authStatus.username);


  const onRecipeAdded = () => {
    setRecipes([]);
    setCursor(null); // Reset cursor for pagination
    setHasMore(false); // Reset pagination state
    setRefreshTrigger((prev) => prev + 1); // Trigger re-fetch without clearing UI immediately
  };

  const hasMounted = useRef(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    clearLocalToken();
    onRecipeAdded();
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

      const { recipes } = response;
      if (response.cursor) {
        Log(`CURSOR IN RESPO: ${response.cursor}`);
        setCursor(response.cursor);
        setHasMore(true);
      } else {
        setCursor("");
        setHasMore(false);
      }
      Log(`Loaded ${recipes.length}`);

      // Append the new recipes to the existing ones
      setRecipes((prev) => [...prev, ...recipes]);
    } catch (error) {
      Log(`Error fetching recipes: ${error}`, 'error');
      throw error;
    }
    setLoading(false);
  };

  // Initial recipe fetch when authenticated
  useEffect(() => {
    Log("APP COMPONENT EFFECT!")
    const authStatus = checkAuthStatus();
  
    if (authStatus.isAuth !== isAuthenticated) {
      setIsAuthenticated(authStatus.isAuth);
    }
  
    setUser(authStatus.username);
  
    if (authStatus.isAuth) {
      if (!hasMounted.current || refreshTrigger) {
        hasMounted.current = true;
        setLoading(true);
        fetchRecipes().finally(() => setLoading(false));
      }
    } else {
      setLoading(false);
    }
  }, [refreshTrigger, isAuthenticated]);
  
  // Handle loading next page
  const handleLoadMore = () => {
    fetchRecipes(); // Fetch next page of recipes
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AppHeader handleLogout={handleLogout} user={user} isAuthenticated={isAuthenticated} onRecipeAdded={onRecipeAdded} />
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
