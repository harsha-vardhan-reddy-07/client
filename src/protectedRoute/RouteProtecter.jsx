import React from 'react';
import { Navigate} from 'react-router-dom';

const RouteProtector =  ({ children }) => {

  const token = localStorage.getItem('userToken');

  if (token === 'null'){
    return <Navigate to='/login' replace /> 
  }


  return children;
};

export default RouteProtector;
