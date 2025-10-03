import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { token, isAdmin } = useSelector((state) => state.auth);
    const location = useLocation();

    if (!token) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to. This allows us to send them along to that page after they login,
        // which is a nicer user experience than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminOnly && !isAdmin) {
        // If it's an admin-only route and the user is not an admin,
        // redirect them to the homepage or a "not authorized" page.
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;