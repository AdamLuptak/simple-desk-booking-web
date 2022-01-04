import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Copyright } from '../components/Copyright';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

const theme = createTheme();


export const ForgotPasswordSuccess = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xl">
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
                        Email sent
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <Typography>
                            It can take a few minutes to receive your password recovery link.
                        </Typography>
                        <Typography>
                            If you do not receive this link, please contact your administrator.
                        </Typography>
                    </Box>
                    <Grid container justifyContent="center"
                          sx={{ mt: 2 }}
                          alignItems="center">
                        <Grid item>
                            <Link href={"/login"} variant="body2">
                                Login
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <Copyright sx={{ mt: 3, mb: 4 }}/>
            </Container>
        </ThemeProvider>
    );
}
