import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppHeader from './components/app-header';
import CardList from './components/card-list';
import Login from './components/login'; // Assuming you have a Login component
import PrivateRoute from './components/private-route';

const cards = [
  { title: "Shrimp and Chorizo Paella", description: "This impressive paella is a perfect party dish..." },
  { title: "Spaghetti Bolognese", description: "A classic Italian pasta dish with a rich meat sauce..." },
  // Add more cards as needed
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const navigate = useNavigate(); // Hook to navigate to other routes

  const handleLogout = () => {
    setIsAuthenticated(false);  // Clear authentication state
    sessionStorage.removeItem('isAuthenticated');  // Remove from sessionStorage
    navigate('/login');  // Redirect to login page
  };

  const handleLogin = (status: boolean) => {
    setIsAuthenticated(status); // Update authentication status
    sessionStorage.setItem('isAuthenticated', String(status)); // Store status in sessionStorage
  };

  useEffect(() => {
    // Check the authentication status in sessionStorage on mount
    const storedAuthStatus = sessionStorage.getItem('isAuthenticated');
    if (storedAuthStatus === 'true') {
      setIsAuthenticated(true); // Update state if already authenticated
    }
    setLoading(false); // Set loading to false after checking
  }, []); // Runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show a loading screen while checking auth status
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
              cards={cards}
            />
          }
        />
      </Routes>
      </>
  );
}

export default App;
