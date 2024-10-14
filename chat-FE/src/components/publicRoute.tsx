import React from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
    children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const token = localStorage.getItem('access_token');

    return token ? <Navigate to="/chat" /> : children;
};

export default PublicRoute;
