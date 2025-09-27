// src/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { authToken } = useContext(AuthContext);

  if (!authToken) {
    // If the user is not authenticated, redirect them to the login page
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the component they are trying to access
  return children;
};

export default ProtectedRoute;