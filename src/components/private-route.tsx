import React from 'react';
import { Navigate } from 'react-router-dom';
import { Recipe } from '../types/recipe';

interface PrivateRouteProps {
  isAuthenticated: boolean;
  component: React.ComponentType<any>;
  cards: Recipe[]; // Add the cards prop
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, component: Component, cards }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;  // Redirect to login if not authenticated
  }

  return <Component cards={cards} />;  // Render the component if authenticated
};

export default PrivateRoute;
