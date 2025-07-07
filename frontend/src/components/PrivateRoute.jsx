import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem('access');
  const isStaff = localStorage.getItem('is_staff') === 'true';

  if (!token) return <Navigate to="/login" />;

  if (adminOnly && !isStaff) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;