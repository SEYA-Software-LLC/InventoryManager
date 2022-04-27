import { Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, {useEffect, useState} from 'react'
import {base_url} from '../constants';
import axios from 'axios';

function Analytics(props) {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        retrieveItemCount();
    }, [props.refresh])

    const retrieveItemCount = async () => {
        await axios.get(`${base_url}/items/${props.companyId}`).then((resp) => {
            setItemCount(resp.data.result.length)
        })
    }

    return (
        <Box>
            <Box sx={{height: "621px", padding: "10px"}}>
                <Grid container spacing={2}>

                    <Grid item xs={6}>
                        <Paper>
                            <Typography>Inventory Count</Typography>
                            <Typography>{itemCount}</Typography>
                        </Paper>
                    </Grid>

                </Grid>
            </Box>
        </Box>
    )
}

export default Analytics