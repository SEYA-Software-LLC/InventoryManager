import React, {useEffect, useState} from 'react'
import { Button, Grid, Paper, Box, Drawer, List, ListItem, Typography, ListItemText, ListItemButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { itemTypes, rarityTypes, ladderTypes } from '../constants';


const inventoryHeaders = [
    {field: 'sku', headerName: 'SKU', width: 150},
    {field: 'title', headerName: 'Title', width: 250},
    {field: 'itemType', headerName: 'Type', width: 200},
    {field: 'rarity', headerName: 'Rarity', width: 100},
    {field: 'sockets', headerName: 'Sockets', width: 100},
    {field: 'ladderType', headerName: 'Ladder', width: 275},
]

function Inventory(props) {
    const [products, setProducts] = useState(null);

    // Keep track of selected item id's for reserving
    const [selection, setSelection] = useState([]);

    // Run on refresh
    useEffect(() => {
        console.log("oof")
        getInventory();
    }, [props.refresh])

    const getInventory = async () => {
        await axios.get('http://localhost:3001/items').then((resp) => {
            let items = resp.data.result;
            items.forEach((item) => {
                item.itemType = itemTypes[item.itemType];
                item.rarity = rarityTypes[item.rarity];
                item.ladderType = ladderTypes[item.ladderType];
            });

            setProducts(items);
        });
    }

    return (
        <Box sx={{height: "671px"}}>
            {products === null ? "" : <DataGrid rows={products} columns={inventoryHeaders} pageSize={25} rowsPerPageOptions={[5, 10, 25, 50]} getRowId={(row) => row._id} checkboxSelection onSelectionModelChange={(newSelection) => {
                setSelection(newSelection);
            }} />}  
        </Box>
    )
}

export default Inventory