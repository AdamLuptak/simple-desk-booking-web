import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from '../components/Copyright';
import axios from 'axios';
import * as yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const theme = createTheme();

type IFormInputs = {
    password: string
    confirmationPassword: string
}

const schema = yup.object().shape({
    password: yup.string().required('Password is required').matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
    confirmationPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});


export const ResetPassword = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const query = React.useMemo(() => new URLSearchParams(search), [search]);
    const { handleSubmit, formState: { errors }, control } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
    });
    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        try {
            const code = query.get('code') ?? (() => {
                throw new Error("No code provided")
            })();
            await axios({
                method: 'post',
                url: "/api/auth/reset-password",
                data: {
                    "code": code,
                    "password": data.password,
                    "passwordConfirmation": data.confirmationPassword,
                },
                headers: {
                    "ContentType": 'application/json'
                }
            })
            navigate("/login");
        } catch (e) {
            console.log(e)
        } finally {
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
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="password"
                                    label="Password"
                                    variant="outlined"
                                    error={!!errors.password}
                                    helperText={errors.password ? errors.password?.message : ''}
                                    fullWidth
                                    margin="normal"
                                    name="password"
                                    id="password"
                                />
                            )}
                        />
                        <Controller
                            name="confirmationPassword"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="password"
                                    label="Confirmation Password"
                                    variant="outlined"
                                    error={!!errors.confirmationPassword}
                                    helperText={errors.confirmationPassword ? errors.confirmationPassword?.message : ''}
                                    fullWidth
                                    margin="normal"
                                    name="confirmationPassword"
                                    id="confirmationPassword"
                                />
                            )}
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

