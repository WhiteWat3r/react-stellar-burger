import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export function ProtectedRouteElement({ element }) {



  const isAuthenticated = useSelector(store => store.auth.isAuthenticated)

    // const location = useLocation()
    // console.log(location);


    


  return isAuthenticated ? element : <Navigate to="/login" replace/>;
} 
