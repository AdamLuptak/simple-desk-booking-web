import React from 'react';
import './App.css';
import { DeskBooking } from './pages/DeskBooking';
import { BrowserRouter as Router, Link, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Overview } from './pages/Overview';
import AuthProvider from './auth/AuthProvider';
import { NavBar } from './components/NavBar';
import UsePrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={UsePrivateRoute(<DeskBooking/>)}/>
                        <Route path="/overview" element={UsePrivateRoute(<Overview/>)}/>
                        <Route path="/profile" element={UsePrivateRoute(<Overview/>)}/>
                        <Route path="/desk-booking" element={UsePrivateRoute(<DeskBooking/>)}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
