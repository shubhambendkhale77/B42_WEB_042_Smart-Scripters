import React from 'react';
import { useAuth } from '../context/useAuth';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const { currentUser } = useAuth();

  return currentUser ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
