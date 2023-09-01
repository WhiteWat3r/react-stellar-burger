import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import Loader from '../loader/loader';

interface ProtectedRouteElementProps {
  element: React.ReactNode;
  onlyAuth?: boolean;
}

export const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({
  element,
  onlyAuth,
}) => {
  const location = useLocation();
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);
  const dataLoading = useAppSelector((store) => store.auth.dataLoading)
  
  console.log(dataLoading);
  if (dataLoading) {
    return <Loader />
  }


  const from = location.state?.from || '/';


  if (!onlyAuth && isAuthenticated) {
    return <Navigate to={ from } />;

  }

  if (onlyAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location}}/>;

  }

  return <>{element}</>;
};
