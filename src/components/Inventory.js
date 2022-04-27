import React, {useEffect, useState} from 'react'
import { Button, Grid, Paper, Box, Drawer, List, ListItem, Typography, ListItemText, ListItemButton, Modal } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { itemTypes, rarityTypes, ladderTypes, base_url } from '../constants';
import AddProduct from './AddProduct';


const inventoryHeaders = [
    {field: 'sku', headerName: 'SKU', width: 150},
    {field: 'title', headerName: 'Title', width: 250},
    {field: 'itemType', headerName: 'Type', width: 200},
    {field: 'rarity', headerName: 'Rarity', width: 100},
    {field: 'sockets', headerName: 'Sockets', width: 100},
    {field: 'ladderType', headerName: 'Ladder', width: 275},
]

const style = {position: 'absolute',
top: '50%',
left: '50%',
transform: 'translate(-50%, -50%)',
width: 800,
height: 600,
bgcolor: 'background.paper',
border: '2px solid #000',
boxShadow: 24,
p: 4,}

function Inventory(props) {
    const [products, setProducts] = useState(null);
    const [open, setOpen] = useState(false);

    // Viewing Item
    const [itemOpen, setItemOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Keep track of selected item id's for reserving
    const [selection, setSelection] = useState([]);

    // Run on refresh
    useEffect(() => {
        console.log("oof")
        getInventory();
    }, [props.refresh])

    const getInventory = async () => {
        await axios.get(`${base_url}/items/${props.companyId}`).then((resp) => {
            let items = resp.data.result;
            items.forEach((item) => {
                item.itemType = itemTypes[item.itemType];
                item.rarity = rarityTypes[item.rarity];
                item.ladderType = ladderTypes[item.ladderType];
            });

            setProducts(items);
        });
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleItemOpen = () => {
        setItemOpen(true);
    }

    const handleItemClose = () => {
        setItemOpen(false);
    }

    return (
        <Box>
            <Box sx={{height: "42px", textAlign: "left", marginLeft: "10px", marginTop: "7px"}}>
                <Button variant="contained" sx={{backgroundColor: "red"}} onClick={handleOpen} >Add Product</Button>
            </Box>
            <Box sx={{height: "621px"}}>
            {products === null ? "" : <DataGrid rows={products} columns={inventoryHeaders} pageSize={25} rowsPerPageOptions={[5, 10, 25, 50]} getRowId={(row) => row._id} onSelectionModelChange={(newSelection) => {
                setSelection(newSelection);
            }} onCellClick={(item) => {
                setSelectedItem(item.row);
                handleItemOpen();
            }}/>}
            </Box>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddProduct companyId={props.companyId} />
                </Box>
            </Modal>
            <Modal
            open={itemOpen}
            onClose={handleItemClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography>Title: {selectedItem === null ? "" : selectedItem.title}</Typography>
                    <Typography>Description: {selectedItem === null ? "" : selectedItem.description}</Typography>
                    <img src={`${selectedItem === null ? "" : selectedItem.imgUrl}`} alt="Image" loading="lazy" height="90%" width="100%"/>
                </Box>
            </Modal>
        </Box>
        
    )
}

export default Inventory