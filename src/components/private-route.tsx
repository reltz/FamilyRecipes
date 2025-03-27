import { Navigate } from "react-router-dom";
import { Recipe } from "../types/recipe";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  component: React.ComponentType<any>; // Allow any component
  handleLoadMore?: () => void;
  username: string;
  hasMore?: boolean;
  recipes?: Recipe[];
  loading?: boolean;
}

const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  handleLoadMore,
  hasMore,
  recipes,
  loading,
  username
}: PrivateRouteProps) => {
  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the given component with passed props
  return (
    <Component
      recipes={recipes}
      handleLoadMore={handleLoadMore}
      hasMore={hasMore}
      loading={loading}
      username={username}
    />
  );
};

export default PrivateRoute;
