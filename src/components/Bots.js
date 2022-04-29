import { Box, Button, Grid, MenuItem, Modal, Select, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { base_url, botTypes } from '../constants';

const botHeaders = [
    {field: 'email', headerName: 'Username', width: 350},
    {field: 'password', headerName: 'Password', width: 350},
    {field: 'botType', headerName: 'Type', width: 250},
]

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

function Bots(props) {
    const [bots, setBots] = useState(null);
    const [open, setOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);

    // Add Bot
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [botType, setBotType] = useState(0);

    useEffect(() => {
        getBots();
    }, [refresh])

    const getBots = async () => {
        await axios.get(`${base_url}/bots/company/${props.companyId}`).then((resp) => {
            let bots = resp.data;
            bots.forEach((bot) => {
                bot.botType = botTypes[bot.botType];
            });

            setBots(bots);
        })
    }

    const addBot = async () => {
        let body = {
            companyId: props.companyId,
            email: email,
            password: password,
            botType: botType
        }

        await axios.post(`${base_url}/bots`, body, {}).then((r) => {
            setRefresh(prev => !prev);
        })
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleTypeChange = (e) => {
        setBotType(e.target.value);
    }

    return (
        <Box>
            <Box sx={{height: "42px"}}>
                <Button variant="contained" sx={{backgroundColor: "red", color: "white"}} onClick={handleOpen}>Add Bot</Button>
            </Box>

            <Box sx={{height: "621px"}}>
                {bots === null ? "" : <DataGrid rows={bots} columns={botHeaders} />}
            </Box>

            {/* Add Bot Modal */}
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Grid container spacing={2}>

                        <Grid item xs={4}>
                            <TextField variant='outlined' label="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField variant='outlined' label="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Grid>

                        <Grid item xs={4}>
                            <Select value={botType} onChange={handleTypeChange}>
                                {botTypes.map((type) => (
                                    <MenuItem value={botTypes.indexOf(type)} key={botTypes.indexOf(type)}>{type}</MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        <Grid item xs={12}>
                            <Button onClick={addBot} varient='outlined'>Submit</Button>
                        </Grid>

                    </Grid>

                </Box>
            </Modal>
        </Box>
    )
}

export default Bots