import React from 'react';
import useAuth from '../auth/useAuth';
import { Navigate } from 'react-router-dom';

export const Logout = () => {
    const auth = useAuth();

    return (
        <>
            {auth?.logout()}
            <Navigate to="/login"/>;
        </>

    );
}
