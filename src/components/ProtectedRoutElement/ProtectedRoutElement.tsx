import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';

interface ProtectedRouteElementProps {
  element: React.ReactNode;
  onlyAuth?: boolean;
}

export const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({
  element,
  onlyAuth,
}) => {
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && onlyAuth) {
      navigate('/login', { replace: true });
    } else if (isAuthenticated && !onlyAuth) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, onlyAuth, navigate]);

  return <>{isAuthenticated && onlyAuth ? element : !isAuthenticated && !onlyAuth && element}</>;
};
