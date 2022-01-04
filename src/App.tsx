import React from 'react';
import './App.css';
import { DeskBooking } from './pages/DeskBooking';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Overview } from './pages/Overview';
import AuthProvider from './auth/AuthProvider';
import UsePrivateRoute from './components/PrivateRoute';
import { Account } from './pages/Account';
import CustomAppBar from './components/CustomAppBar';
import { Logout } from './pages/Logout';
import { Container } from '@mui/material';
import { ForgotPassword } from './pages/ForgotPassword';
import { ForgotPasswordSuccess } from './pages/ForgotPasswordSuccess';
import { ResetPassword } from './pages/ResetPassword';

function App() {
    return (
        <AuthProvider>
            <Router>
                <CustomAppBar/>
                <div>
                    <Container sx={{ py: 6 }} maxWidth={'lg'}>
                        <Routes>
                            <Route path="/" element={UsePrivateRoute(<DeskBooking/>)}/>
                            <Route path="/overview" element={UsePrivateRoute(<Overview/>)}/>
                            <Route path="/desk-booking" element={UsePrivateRoute(<DeskBooking/>)}/>
                            <Route path="/account" element={UsePrivateRoute(<Account/>)}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/forgot-password" element={<ForgotPassword/>}/>
                            <Route path="/logout" element={<Logout/>}/>
                            <Route path="/forgot-password-success" element={<ForgotPasswordSuccess/>}/>
                            <Route path="/reset-password" element={<ResetPassword/>}/>

                        </Routes>
                    </Container>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
