import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../service/AuthProvider';

function useIsAuthenticated() {
    const auth = useAuth();
    console.log(auth);
    return !!(auth.user !== null);
    // return false;
}

const PrivateRoute = ({ element }) => {
    return useIsAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
