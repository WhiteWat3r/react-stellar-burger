import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, RouteProps, useNavigate } from 'react-router-dom';
import { RootState } from '../../services/reducers/index';


interface ProtectedRouteElementProps {
  element: React.ReactNode;
  onlyAuth?: boolean;
}


export const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({ element, onlyAuth }) => {


  const isAuthenticated = useSelector((store: RootState)  => store.auth.isAuthenticated)

  console.log(isAuthenticated);
  console.log(onlyAuth);


  const navigate = useNavigate();


  useEffect(() => {
    if (!isAuthenticated && onlyAuth) {
      navigate('/login', { replace: true });
    } else if (isAuthenticated && !onlyAuth) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, onlyAuth, navigate]);



  return <>{isAuthenticated && onlyAuth ? element : !isAuthenticated && !onlyAuth && element}</>;

} 



