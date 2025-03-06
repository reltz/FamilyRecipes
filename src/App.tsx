import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AppHeader from "./components/app-header";
import CardList from "./components/card-list";
import Login from "./components/login";
import PrivateRoute from "./components/private-route";
import { checkAuthStatus, clearLocalToken } from "./services/login-service";
import { listRecipes } from "./services/api-service";
import { Recipe } from "./types/recipe";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkAuthStatus());
  const [loading, setLoading] = useState<boolean>(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
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

  useEffect(() => {
    const authStatus = checkAuthStatus();
    setIsAuthenticated(authStatus)
    if (isAuthenticated) {
      listRecipes()
        .then((res) => setRecipes(res))
        .finally(() => setLoading(false)); // Ensure loading is set to false
    } else {
      setLoading(false); // If not authenticated, stop loading
    }
  }, [isAuthenticated]);

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
              cards={recipes}
            />
          }
        />
      </Routes>
    </>
  );
}


export default App;
