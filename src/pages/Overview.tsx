import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as qs from 'qs'
import useAuth from '../auth/useAuth';
import AddIcon from '@mui/icons-material/Add';

import {
    Box, CircularProgress, Fab,
    FormControlLabel,
    Paper, Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow
} from '@mui/material';
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;
import { useNavigate } from 'react-router-dom';


interface DeskBooking {
    id: number
    desk: number
    from: Date
    to: Date
    note: string
    owner: string
}

export const Overview = () => {
    const auth = useAuth()
    const pageSizes = [5, 10, 25];
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const options: DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const [deskBookings, setDeskBookings] = useState<Array<DeskBooking>>([])
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(-1);
    const [pageSize, setPageSize] = useState(pageSizes[0]);
    const navigate = useNavigate();

    const [dense, setDense] = React.useState(false);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(parseInt(event.target.value, 10))
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const handleClick = (event: React.MouseEvent<any>, id: number) => {
        event.preventDefault();
        navigate(`/desk-booking/${id}`)
    }

    useEffect(() => {
            setIsLoading(true)
            const query = qs.stringify({
                filters: {
                    owner: auth?.user?.id
                },
                populate: 'desk,owner',
                pagination: {
                    page: page + 1,
                    pageSize: pageSize,
                },
            }, {
                encodeValuesOnly: true,
            });

            axios({
                method: 'get',
                url: `/api/desk-bookings?${query}`,
                headers: {
                    "ContentType": 'application/json',
                    "Authorization": `Bearer ${auth?.user?.jwt}`
                },
            }).then(({ data }) => {
                const dbk: Array<DeskBooking> = data.data.map((entry: any) => ({
                    id: entry.id,
                    desk: entry.attributes.desk.data.id,
                    from: new Date(entry.attributes.from),
                    to: new Date(entry.attributes.to),
                    note: entry.attributes.note,
                    owner: entry.attributes.owner.data.attributes.email

                }));

                setDeskBookings(dbk)
                setCount(data.meta.pagination.total);
                setIsLoading(false)
            }).catch((e) => console.log(e))
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [page, pageSize]
    )
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                {isLoading ?
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress/>
                    </Box> :
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">DESK</TableCell>
                                    <TableCell align="left">FROM</TableCell>
                                    <TableCell align="left">TO</TableCell>
                                    <TableCell align="left">OWNER</TableCell>
                                    <TableCell align="left">NOTE</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {deskBookings.map((row) => (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">
                                            {row.desk}
                                        </TableCell>
                                        <TableCell
                                            align="left">{row.from.toLocaleDateString(undefined, options)}</TableCell>
                                        <TableCell
                                            align="left">{row.to.toLocaleDateString(undefined, options)}</TableCell>
                                        <TableCell align="left">{row.owner}</TableCell>
                                        <TableCell align="left">{row.note}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
                <TablePagination
                    rowsPerPageOptions={pageSizes}
                    component="div"
                    count={count}
                    rowsPerPage={pageSize}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense}/>}
                    label="Dense padding"
                />
                <FormControlLabel
                    control={
                        <Fab color="primary" aria-label="add" onClick={() => navigate('/desk-booking')}>
                            <AddIcon/>
                        </Fab>
                    }
                    label=""
                />
            </Box>
        </Box>
    );
}
