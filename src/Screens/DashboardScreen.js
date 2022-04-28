import { Button, Grid, Paper, Box, Drawer, List, ListItem, Typography, ListItemText, ListItemButton } from '@mui/material'
import React, {useState} from 'react'
import { useLocation } from 'react-router-dom';

// Components
import Inventory from '../components/Inventory'
import Analytics from '../components/Analytics';
import Orders from '../components/Orders';

function DashboardScreen() {
    const [refresh, setRefresh] = useState(false);
    let location = useLocation();

    const screens = ["Inventory", "Analytics", "Orders"];
    const [screen, setScreen] = useState(screens[2]);

    const renderInventory = () => {
        setScreen(screens[0]);

        setRefresh(prev => !prev)
    }

    const renderAnalytics = () => {
        setScreen(screens[1]);

        setRefresh(prev => !prev);
    }

    const renderOrders = () => {
        setScreen(screens[2]);

        setRefresh(prev => !prev);
    }

    return (
        <Box sx={{height: "100vh", width: "100vw", display: "flex"}}>

            {/* Side Bar */}
            <List sx={{width: "10%", height: "655px", background: "white", textAlign: "center", justifyContent: "center", alignItems: "center"}}>
                <ListItem disablePadding>
                    <ListItemButton style={{textAlign: "center"}} onClick={renderInventory}>
                        <ListItemText primary="Inventory" />
                    </ListItemButton> 
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton style={{textAlign: "center"}} onClick={renderOrders}>
                        <ListItemText primary="Orders" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton style={{textAlign: "center"}} onClick={renderAnalytics}>
                        <ListItemText primary="Analytics" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton style={{textAlign: "center", background: "white"}} onClick={() => setRefresh(prev => !prev)}>
                        <ListItemText primary="Refresh" />
                    </ListItemButton>
                </ListItem>
            </List>

            <Box sx={{width: "90%", height: "669px"}}>
                {console.log(screen)}
                {
                screen === screens[0] ? <Inventory refresh={refresh} companyId={location.state.companyId}/> : 
                screen === screens[1] ? <Analytics companyId={location.state.companyId} refresh={refresh} /> : 
                screen === screens[2] ? <Orders companyId={location.state.companyId} refresh={refresh} /> : ""
                }
            </Box>
        </Box>
    )
}

export default DashboardScreen