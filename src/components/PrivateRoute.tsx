import useAuth from '../auth/useAuth';
import { Navigate } from 'react-router-dom';
import React from 'react';

type Props = {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
    const auth = useAuth();
    return auth?.user ? <> {children} </> : <Navigate to="/login"/>;
}

const UsePrivateRoute = (deskBooking: JSX.Element) => {
    return <PrivateRoute> {deskBooking} </PrivateRoute>;
}

export default UsePrivateRoute;

