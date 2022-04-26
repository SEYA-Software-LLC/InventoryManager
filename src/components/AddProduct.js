import { Button, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import {itemTypes, rarityTypes, ladderTypes} from "../constants";
import axios from 'axios';

function AddProduct() {
    const [itemType, setItemType] = useState(0);
    const [rarityType, setRarityType] = useState(0);
    const [ladderType, setLadderType] = useState(0);
    const [gameType, setGameType] = useState(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [sockets, setSockets] = useState(0);
    const [error, setError] = useState("");

    const handleItemTypeChange = (e) => {
        setItemType(e.target.value);
    }

    const handleRarityTypeChange = (e) => {
        setRarityType(e.target.value);
    }

    const handleLadderTypeChange = (e) => {
        setLadderType(e.target.value);
    }

    const resetForm = () => {
        setItemType(0);
        setRarityType(0);
        setLadderType(0);
        setGameType(0);
        setTitle("");
        setDescription("");
        setSockets(0);
    }

    const addProduct = async () => {
        if (title === "" || description === "") {
            setError("Please fill out title and description");
            return;
        }

        let body = {
            title: title,
            description: description,
            rarity: rarityType,
            gameType: gameType,
            itemType: itemType,
            ladderType: ladderType,
            sockets: parseInt(sockets)
        }

        await axios.post("http://localhost:3001/items", body, {}).then((resp) => {
            resetForm();
        })
    }
    
    return (
        <Box>
            <Grid container spacing={2} sx={{padding: "25px"}}>
                
                <Grid item xs={12}>
                    <Paper>
                        <Typography>Add Product</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <TextField label="Item Title" variant="outlined" required onChange={(e) => setTitle(e.target.value)} value={title}/>
                </Grid>

                <Grid item xs={12}>
                    <TextField label="Description" variant="outlined" required multiline rows={2} onChange={(e) => setDescription(e.target.value)} value={description}/>
                </Grid>

                <Grid item xs={12}>
                    <Select value={0} onChange={(e) => setGameType(e.target.value)} label="Age">
                        <MenuItem value={0}>Diablo 2: Ressurected</MenuItem>
                    </Select>
                </Grid>

                <Grid item xs={12}>
                    <Select value={itemType} onChange={handleItemTypeChange} label="Age">
                        {itemTypes.map((item) => (
                            <MenuItem value={itemTypes.indexOf(item)} key={itemTypes.indexOf(item)}>{item}</MenuItem>
                        ))}
                    </Select>
                </Grid>

                <Grid item xs={12}>
                    <Select value={rarityType} onChange={handleRarityTypeChange} label="Age">
                        {rarityTypes.map((item) => (
                            <MenuItem value={rarityTypes.indexOf(item)} key={rarityTypes.indexOf(item)}>{item}</MenuItem>
                        ))}
                    </Select>
                </Grid>

                <Grid item xs={12}>
                    <Select value={ladderType} onChange={handleLadderTypeChange} label="Age">
                        {ladderTypes.map((item) => (
                            <MenuItem value={ladderTypes.indexOf(item)} key={ladderTypes.indexOf(item)}>{item}</MenuItem>
                        ))}
                    </Select>
                </Grid>

                <Grid item xs={12}>
                    <TextField label="# of Sockets" variant="outlined" required type="number" onChange={(e) => setSockets(e.target.value)} value={sockets}/>
                </Grid>

                <Grid item xs={12}>
                    <Button onClick={addProduct}>Submit</Button> {error}
                </Grid>

            </Grid>
        </Box>
    )
}

export default AddProduct