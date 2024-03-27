import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoutes = ({ children }) => {
  const { token } = useAuth(); 
  return token ? <>{children}</> : <Navigate to="/user/signIn" />;
}

export default PrivateRoutes;