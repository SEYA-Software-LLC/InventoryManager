import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Box } from '@mui/system';
import { setRef, Typography } from '@mui/material';
import { base_url, itemTypes, rarityTypes, ladderTypes } from '../constants';
import { DataGrid } from '@mui/x-data-grid';

const itemHeaders = [
    {field: 'sku', headerName: 'SKU', width: 150},
    {field: 'title', headerName: 'Title', width: 250},
    {field: 'itemType', headerName: 'Type', width: 200},
    {field: 'rarity', headerName: 'Rarity', width: 100},
    {field: 'sockets', headerName: 'Sockets', width: 100},
    {field: 'price', headerName: 'Price ($)', width: 275, editable: true},
]

function ViewOrder(props) {
    const [selectedOrder] = useState(props.selectedOrder);
    const [items, setItems] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [total, setTotal] = useState(0.0);

    useEffect(() => {
        getOrderItems();
    }, [selectedOrder, refresh])

    const getOrderItems = async () => {
        let body = {
            selectedItems: selectedOrder.items
        }

        await axios.put(`${base_url}/items`, body, {}).then((resp) => {
            let items = resp.data;

            let tempTotal = 0.0;
            items.forEach((item) => {
                item.itemType = itemTypes[item.itemType];
                item.rarity = rarityTypes[item.rarity];
                item.ladderType = ladderTypes[item.ladderType];

                tempTotal += item.price;
            });

            setItems(resp.data);
            setTotal(tempTotal);
        })
    }

    const handleCommit = async (e) => {
        let itemId = e.id;
        let newPrice = e.value;

        let body = {
            newPrice: newPrice
        }

        await axios.put(`${base_url}/items/${itemId}`, body, {});
    }

    return (
        <Box>
            <Box sx={{height:"25px"}}>
                <Typography>Order: {selectedOrder.orderNumber}</Typography>
            </Box>
            <Box sx={{height: "500px"}}>
                {items === null ? "" : <DataGrid rows={items} columns={itemHeaders} onCellEditCommit={handleCommit}/>}
            </Box>
            <Box sx={{height: "50px"}}>
                <Typography>Total: ${total}</Typography>
            </Box>
        </Box>
    )
}

export default ViewOrder