import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = () => {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   return false;
    // }

    // try {
    //   const payload = JSON.parse(atob(token.split('.')[1]));
    //   const now = new Date().getTime() / 1000;
    //   if (payload.exp < now) {
    //     return false;
    //   }
    //   return true;
    // } catch (e) {
    //   return false;
    // }
    return true ;
  };

  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
