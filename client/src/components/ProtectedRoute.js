import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

const ProtectedRoute = (props) => {
  const user = useSelector((state) => state.user);
  if (user) {
    return <Route {...props} />
  } else {
    return <Redirect to='/login' />
  }

}

export default ProtectedRoute
