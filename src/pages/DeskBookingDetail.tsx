import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader, Chip,
    Divider, FormControl, FormHelperText,
    Grid, InputLabel, MenuItem, Select,
    Snackbar,
    Stack,
    TextField, Typography
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '../auth/useAuth';
import axios from 'axios';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

interface IDeskBooking {
    id: number | null
    from: Date | null
    to: Date | null
    desk: number | null
    owner: string | null
}

interface IDesk {
    id: number | string
    uuid: string
}

const schema = yup.object().shape({
    id: yup.number().typeError('you must specify a Desk number').nullable(),
    from: yup.date().typeError('you must specify a Date from').required(),
    to: yup.date().typeError('you must specify a Date to').required(),
    desk: yup.number().required(),
    owner: yup.string().required(),
});

export const DeskBookingDetail = () => {
    const { id } = useParams();
    const isAddMode = !id;

    const navigate = useNavigate();
    const auth = useAuth();
    const [successSnackBar, setSuccessSnackBar] = useState(false);
    const [errorSnackBar, setErrorSnackBar] = useState(false);
    const [errorSnackBarMessage, setErrorSnackBarMessage] = useState<string>("");
    const [deskList, setDeskList] = useState<Array<IDesk>>([{ id: "Select different time window [From, To]", uuid: "sdf" }])

    const { handleSubmit, formState, control, reset, watch } = useForm<IDeskBooking>({
        resolver: yupResolver(schema),
        defaultValues: {
            desk: (isAddMode ? null : 0),
            id: null,
            from: null,
            to: null,
            owner: (isAddMode ? auth?.user?.email : ""),
        }
    });

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (value.from && value.to) {
                axios({
                    method: 'get',
                    url: `/api/desks/available`,
                    params: {
                        from: value.from,
                        to: value.to
                    },
                    headers: {
                        "ContentType": 'application/json',
                        "Authorization": `Bearer ${auth?.user?.jwt}`
                    },
                }).then(data => {
                    return data.data.data
                }).then(data => {
                    console.log(data)
                    if (data.length == 0) {
                        setDeskList([{ id: "Select different time window [From, To]", uuid: "sdf" }])
                    } else {
                        setDeskList(data)
                    }
                })
            }


        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const handleCloseSucess = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessSnackBar(false);
    };

    const handleCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorSnackBar(false);
    };
    React.useEffect(() => {
        console.log("touchedFields", formState.touchedFields);
    }, [formState]);

    useEffect(() => {
        if (!isAddMode) {
            console.log("sdfsdfs")
            axios({
                method: 'get',
                url: `/api/desk-bookings/${id}`,
                params: {
                    populate: 'owner,desk'
                },
                headers: {
                    "ContentType": 'application/json',
                    "Authorization": `Bearer ${auth?.user?.jwt}`
                },
            }).then(data => {
                return data.data.data
            }).then(data => {

                reset({
                    id: data.attributes.id,
                    from: data.attributes.from,
                    to: data.attributes.from,
                    desk: data.attributes.desk.data.id,
                    owner: data.attributes.owner.data.attributes.email
                })
            })
        }
    }, []);


    const onSubmit: SubmitHandler<IDeskBooking> = async (formData) => {
        try {
            const { data } = await axios({
                method: isAddMode ? 'post' : 'put',
                url: `/api/desk-bookings/${isAddMode ? '' : id}`,
                data: {
                    data: {
                        "desk": formData.desk,
                        "from": formData.from,
                        "to": formData.to,
                    }
                },
                headers: {
                    "ContentType": 'application/json',
                    "Authorization": `Bearer ${auth?.user?.jwt}`
                },
            });

            setSuccessSnackBar(true)
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                // Is this the correct way?
                setErrorSnackBarMessage((e.response?.data).error.message)
            }
            setErrorSnackBar(true)
        } finally {

        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Card>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <CardHeader
                            title="Desk booking">
                        </CardHeader>
                        <CardHeader
                            title={isAddMode ? <Chip label="New"/>
                                : <Chip label="Edit"/>}>

                        </CardHeader>

                    </Box>
                    <Divider/>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth error={!!formState.errors.desk}>
                                    <InputLabel id="demo-simple-select-label">First select time window [From,
                                        To]</InputLabel>
                                    <Controller
                                        name="desk"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                fullWidth
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Desk"
                                                name="desk"
                                            >
                                                {deskList.map((desk) => (
                                                    <MenuItem key={desk.id} value={desk.id}>
                                                        {desk.id}
                                                    </MenuItem>
                                                ))}

                                            </Select>
                                        )}
                                    />
                                    <FormHelperText>{formState.errors.desk ? formState.errors.desk?.message : ''}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Controller
                                    name="owner"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            fullWidth
                                            label="Owner"
                                            name="owner"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Controller
                                    name="from"
                                    control={control}

                                    render={({ field }) => (
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                {...field}
                                                label="From"
                                                renderInput={(params) => <TextField fullWidth
                                                                                    {...params}
                                                                                    error={!!formState.errors.from}
                                                                                    helperText={formState.errors.from ? formState.errors.from?.message : ''}
                                                />}
                                            />
                                        </LocalizationProvider>
                                    )}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Controller
                                    name="to"
                                    control={control}
                                    render={({ field }) => (
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                {...field}
                                                label="To"

                                                renderInput={(params) => <TextField fullWidth
                                                                                    {...params}
                                                                                    error={!!formState.errors.to}
                                                                                    helperText={formState.errors.to ? formState.errors.to?.message : ''}
                                                />}
                                            />
                                        </LocalizationProvider>
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider/>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={2}
                        sx={{ p: 2 }}
                    >
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </Button>

                        <Button
                            disabled={!formState.isDirty}
                            type="submit"
                            color="primary"
                            variant="contained"
                        >
                            Save details
                        </Button>
                    </Stack>
                </Card>
            </div>
            <Snackbar open={successSnackBar} autoHideDuration={6000} onClose={handleCloseSucess}>
                <Alert onClose={handleCloseSucess} severity="success" sx={{ width: '100%' }}>
                    Success desk booking store!
                </Alert>
            </Snackbar>
            <Snackbar open={errorSnackBar} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    Error something goes wrong! <br/>
                    {errorSnackBarMessage ?? ""}
                </Alert>
            </Snackbar>
        </form>
    );
}
