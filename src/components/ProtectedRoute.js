import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
  const storedRole = localStorage.getItem('role');

  if (!storedRole) {
    // No role stored (user not logged in) → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (storedRole !== role) {
    // Role mismatch → redirect to login
    return <Navigate to="/login" replace />;
  }

  // Role matches → allow access
  return children;
};

export default ProtectedRoute;
