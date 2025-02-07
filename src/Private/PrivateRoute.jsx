import React from 'react';
import { useAuth } from '../context/useAuth';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const { currentUser } = useAuth();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return currentUser || isAdmin ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
