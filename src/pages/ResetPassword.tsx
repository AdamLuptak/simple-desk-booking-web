import React from 'react';
import useAuth from '../auth/useAuth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '../components/Copyright';
import axios from 'axios';

const theme = createTheme();

export const ResetPassword = () => {
    const navigate = useNavigate();
    const [error, setError] = React.useState(false);
    const { search } = useLocation();
    const query = React.useMemo(() => new URLSearchParams(search), [search]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(false)

        const code = query.get('code')
        const data = new FormData(event.currentTarget);
        const password = data.get('password')
        const confirmationPassword = data.get('confirmationPassword')
        if (password !== confirmationPassword) {
            setError(true)
            throw Error("Password not matched")
        }

        try {
            query.get("name")
            await axios({
                method: 'post',
                url: "/api/auth/reset-password",
                data: {
                    "code": code,
                    "password": password,
                    "passwordConfirmation": confirmationPassword,
                },
                headers: {
                    "ContentType": 'application/json'
                }
            })
            navigate("/login");
        } catch (e) {
            setError(true)
        }finally {
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            helperText={"Password must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number"}
                        />
                        <TextField
                            error={error}
                            margin="normal"
                            required
                            fullWidth
                            name="confirmationPassword"
                            label="Confirmation Password"
                            type="password"
                            id="confirmationPassword"
                            autoComplete="current-password"
                            helperText={error ? "Passwords not matched" : ""}

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Change password
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }}/>
            </Container>
        </ThemeProvider>
    );
}

