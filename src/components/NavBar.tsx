import { Link } from 'react-router-dom';
import React from 'react';
import useAuth from '../auth/useAuth';


export const NavBar = () => {
    const auth = useAuth();
    return (
        <>
            {auth?.user &&
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/desk-booking">Desk booking</Link>
              </li>
              <li>
                <Link to="/overview">Overview</Link>
              </li>
              <li>
                <Link to="/" onClick={auth.logout}>Logout</Link>
              </li>
            </ul>
            }
        </>
    );
}
