import { Box, Button, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { base_url } from '../constants';
import { DataGrid } from '@mui/x-data-grid';
import ViewOrder from './ViewOrder';

const orderHeaders = [
  {field: 'orderNumber', headerName: 'Order #', width: 150},
  {field: 'orderCreatedTime', headerName: 'Creation Time', width: 250},
  {field: 'customerNote', headerName: 'Note', width: 400},
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

function Orders(props) {
  const [orders, setOrders] = useState(null);

  // View/Edit Modal
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    getOrders();
  }, [props.refresh])

  const getOrders = async () => {
    await axios.get(`${base_url}/orders/${props.companyId}?isActive=true`).then((resp) => {
      setOrders(resp.data);
    })
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Box>

      <Box sx={{height: "42px"}}>
        <Button variant="contained" sx={{backgroundColor: "green", color: "white"}}>Fulfill Order</Button>
      </Box>

      <Box sx={{height: "621px"}}>
        {orders === null ? "" : <DataGrid rows={orders} columns={orderHeaders} pageSize={25} checkboxSelection getRowId={(row) => row.id} onCellDoubleClick={(order) => {
          setSelectedOrder(order.row);
          handleOpen();
        }}/>}
      </Box>

      {/* View/Edit Order Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <ViewOrder selectedOrder={selectedOrder} />
            </Box>
        </Modal>
      
    </Box>
  )
}

export default Orders