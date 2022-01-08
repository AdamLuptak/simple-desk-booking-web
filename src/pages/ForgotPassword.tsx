import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Copyright } from '../components/Copyright';
import axios from 'axios';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const theme = createTheme();

type IFormInputs = {
    email: string
}

const schema = yup.object().shape({
    email: yup.string().email().required(),
});

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const { handleSubmit, formState: { errors }, control } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        try {
            await axios({
                method: 'post',
                url: `api/auth/forgot-password`,
                data: {
                    "email": data.email
                },
                headers: {
                    "ContentType": 'application/json'
                }
            })
        } finally {
            navigate("/forgot-password-success");
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
                        Password Recovery
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    sx={{ mt: 1, minWidth: "100%" }}
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </form>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }}/>
            </Container>
        </ThemeProvider>
    );
}
