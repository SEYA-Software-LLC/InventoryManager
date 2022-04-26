import { Button, Grid, Paper, Box, Drawer, List, ListItem, Typography, ListItemText, ListItemButton } from '@mui/material'
import React, {useState} from 'react'

// Components
import Inventory from '../components/Inventory'
import AddProduct from '../components/AddProduct';

function DashboardScreen() {
    const [refresh, setRefresh] = useState(false);

    const screens = ["Inventory", "AddProduct"];
    const [screen, setScreen] = useState(screens[1]);

    const renderInventory = () => {
        setScreen(screens[0]);

        setRefresh(prev => !prev)
    }

    const renderAddProduct = () => {
        setScreen(screens[1]);
    }

    return (
        <Box sx={{height: "100vh", width: "100vw", display: "flex"}}>

            {/* Side Bar */}
            <List sx={{width: "10%", height: "655px", background: "blue", textAlign: "center", justifyContent: "center", alignItems: "center"}}>
                <ListItem disablePadding>
                    <ListItemButton style={{textAlign: "center"}} onClick={renderInventory}>
                        <ListItemText primary="Inventory" />
                    </ListItemButton> 
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton style={{textAlign: "center"}} onClick={renderAddProduct}>
                        <ListItemText primary="Add Product" />
                    </ListItemButton> 
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton style={{textAlign: "center"}}>
                        <ListItemText primary="Reserved" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton style={{textAlign: "center", background: "white"}}>
                        <ListItemText primary="Refresh" />
                    </ListItemButton>
                </ListItem>
            </List>

            <Box sx={{width: "90%", height: "669px"}}>
                {console.log(screen)}
                {screen === screens[0] ? <Inventory refresh={refresh} /> : screen === screens[1] ? <AddProduct /> : ""}
            </Box>
        </Box>
    )
}

export default DashboardScreen