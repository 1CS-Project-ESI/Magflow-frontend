
import React from 'react';

const withAuth = (WrappedComponent, allowedRoles = []) => {
  const AuthComponent = (props) => {
    // const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const userRole = localStorage.getItem('role'); // Assuming you store the user's role in localStorage

    if (!accessToken) {
      window.location.href = 'login/';
      return null;
    }

    // Check if the user's role is included in the allowed roles
    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      return null;
    }

    // If the user has the required role or no roles are specified, render the component
    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;