import React from 'react';
import useAuth from '../auth/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
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
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const theme = createTheme();

type IFormInputs = {
    email: string
    password: string
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).max(20).required(),
});


export const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const { handleSubmit, formState: { errors }, control } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
    });
    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        try {
            await auth?.login(data.email, data.password)
            navigate("/overview");
        } catch (e) {
            console.log(e)
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
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <Controller
                            name="email"
                            control={control}
                            defaultValue="user1@sdb.com"
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    variant="outlined"
                                    error={!!errors.email}
                                    helperText={errors.email ? errors.email?.message : ''}
                                    fullWidth
                                    margin="normal"
                                    id="email"
                                    name="email"
                                    autoFocus
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue='g8K<a^v<$4-;`nj"'
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

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </form>

                    <Grid container justifyContent="center"
                          alignItems="center">
                        <Grid item>
                            <Link href="/forgot-password" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }}/>
            </Container>
        </ThemeProvider>
    );
}
