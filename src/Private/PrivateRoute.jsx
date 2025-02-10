import React, { useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({ element }) => {
  const { currentUser } = useAuth();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const location = useLocation();

  useEffect(() => {
    if (!currentUser && !isAdmin) {
      toast.error('Please login first!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
      });
    }
  }, [currentUser, isAdmin]);

  if (!currentUser && !isAdmin) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;