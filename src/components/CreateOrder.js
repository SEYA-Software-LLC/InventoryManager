import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { base_url } from '../constants';
import { Button, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const itemHeaders = [
    {field: 'sku', headerName: 'SKU', width: 120},
    {field: 'title', headerName: 'Title', width: 400},
    {field: 'price', headerName: 'Price', width: 275},
]

function CreateOrder(props) {
    let navigate = useNavigate();

    const [companyId] = useState(props.companyId);
    const [selection] = useState(props.selection);
    const [selectedItems, setSelectedItems] = useState(null);
    const [orderCount, setOrderCount] = useState(0);
    const [calculatedPrice, setCalculatedPrice] = useState(0);

    const [customerNote, setCustomerNote] = useState("");

    useEffect(() => {
        getSelectedItems();
        getCompanyOrderCount();
    }, [])

    const getCompanyOrderCount = async () => {
        await axios.get(`${base_url}/companies/${companyId}`).then((resp) => {
            let company = resp.data;
            setOrderCount(company.orderNumberCount + 1);
        })
    }

    const getSelectedItems = async () => {
        let body = {
            selectedItems: selection
        }

        await axios.put(`${base_url}/items`, body, {}).then((resp) => {
            let selectedItems = resp.data;
            setSelectedItems(selectedItems);

            let total = 0.0;
            selectedItems.forEach((item) => {
                total += item.price;
            })
            setCalculatedPrice(total);
        });
    }

    const submitOrder = async () => {
        let body = {
            items: selection,
            companyId: companyId,
            customerNote: customerNote
        }

        await axios.post(`${base_url}/orders`, body, {}).then((resp) => {
            console.log(resp.data);
        })
    }

    return (
        <Box>
            <Box sx={{height: "50px"}}>
                <Typography>Order: {orderCount === 0 ? "..." : orderCount}</Typography>
            </Box>
            <Box sx={{height: "450px"}}>
                {selectedItems === null ? "" : <DataGrid rows={selectedItems} columns={itemHeaders} pageSize={10} />}
            </Box>
            <Box sx={{height: "50px", paddingTop: "10px"}}>
                <Typography>Calculated Total: ${calculatedPrice}</Typography>
                <TextField varient="outlined" label="Customer Note" value={customerNote} onChange={(e) => setCustomerNote(e.target.value)}/>
                <Button varient="contained" sx={{backgroundColor: "green", color:"white"}} onClick={submitOrder}>Submit Order</Button>
            </Box>
        </Box>
    )
}

export default CreateOrder