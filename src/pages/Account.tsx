import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Typography } from '@mui/material';
import useAuth from '../auth/useAuth';

const states = [
    {
        value: 'alabama',
        label: 'Alabama'
    },
    {
        value: 'new-york',
        label: 'New York'
    },
    {
        value: 'san-francisco',
        label: 'San Francisco'
    }
];

export const Account: React.FC = (props) => {
    const auth = useAuth();

    const [values, setValues] = useState({
        firstName: 'Katarina',
        lastName: 'Smith',
        email: 'demo@devias.io',
        phone: '',
        state: 'Alabama',
        country: 'USA'
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleOnSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };
        console.log("submit")

    };

    return (
        <form
            autoComplete="off"
            noValidate
            onSubmit={handleOnSubmit}
            {...props}
        >
            <div>
                <Card>
                    <CardHeader
                        subheader="The information read only"
                        title="Account"
                    />
                    <Divider/>
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    helperText="Please specify the first name"
                                    label="First name"
                                    name="firstName"
                                    onChange={handleChange}
                                    required
                                    value={values.firstName}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Last name"
                                    name="lastName"
                                    onChange={handleChange}
                                    required
                                    value={values.lastName}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                    value={values.email}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Roles"
                                    name="Role"
                                    onChange={handleChange}
                                    required
                                    value={values.email}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider/>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: 2
                        }}
                    >
                        <TextField
                            fullWidth
                            label="password"
                            name="Role"
                            onChange={handleChange}
                            required
                            value={values.email}
                            variant="outlined"
                        />

                        <TextField
                            fullWidth
                            label="Roles"
                            name="Role"
                            onChange={handleChange}
                            required
                            value={values.email}
                            variant="outlined"
                        />

                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                        >
                            Save details
                        </Button>
                    </Box>
                </Card>
            </div>
        </form>
    );
}
